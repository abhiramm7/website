// scanify.js — port of the Python scanify pipeline to plain Canvas/JS.
//
// Pipeline (matches scanify_pdf.py):
//   1. Render PDF page to a canvas (caller's responsibility).
//   2. Convert to grayscale.
//   3. Estimate the paper's lighting field on a downsampled copy
//      (dilate to wipe out ink, heavy blur).
//   4. Divide the original by the lighting field to flatten lighting.
//   5. Per-tile percentile stretch (CLAHE-lite) so faint ink in lighter
//      regions snaps dark.
//   6. Tone curve LUT — paper to pure white, ink to solid black.
//   7. Cap brightness ≥ 235 -> 255 to kill JPEG haze.
//   8. Light unsharp mask to crisp text edges.

const TARGET_LONG = 600; // background estimate is computed at this resolution

// --- Grayscale --------------------------------------------------------------

function rgbaToGray(src, w, h) {
  const out = new Uint8ClampedArray(w * h);
  for (let i = 0, j = 0; i < src.length; i += 4, j++) {
    // Rec. 601 luminance.
    out[j] = (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114) | 0;
  }
  return out;
}

// --- Resampling -------------------------------------------------------------

// Box-filter downsample (good enough for the lighting estimate).
function downsample(src, sw, sh, dw, dh) {
  const out = new Uint8ClampedArray(dw * dh);
  const xRatio = sw / dw;
  const yRatio = sh / dh;
  for (let y = 0; y < dh; y++) {
    const sy0 = (y * yRatio) | 0;
    const sy1 = Math.min(sh, (((y + 1) * yRatio) | 0) + 1);
    for (let x = 0; x < dw; x++) {
      const sx0 = (x * xRatio) | 0;
      const sx1 = Math.min(sw, (((x + 1) * xRatio) | 0) + 1);
      let sum = 0, n = 0;
      for (let yy = sy0; yy < sy1; yy++) {
        const row = yy * sw;
        for (let xx = sx0; xx < sx1; xx++) {
          sum += src[row + xx];
          n++;
        }
      }
      out[y * dw + x] = (sum / n) | 0;
    }
  }
  return out;
}

// Bilinear upsample of a single-channel buffer.
function upsample(src, sw, sh, dw, dh) {
  const out = new Uint8ClampedArray(dw * dh);
  const xRatio = (sw - 1) / Math.max(1, dw - 1);
  const yRatio = (sh - 1) / Math.max(1, dh - 1);
  for (let y = 0; y < dh; y++) {
    const fy = y * yRatio;
    const y0 = fy | 0;
    const y1 = Math.min(sh - 1, y0 + 1);
    const wy = fy - y0;
    for (let x = 0; x < dw; x++) {
      const fx = x * xRatio;
      const x0 = fx | 0;
      const x1 = Math.min(sw - 1, x0 + 1);
      const wx = fx - x0;
      const a = src[y0 * sw + x0];
      const b = src[y0 * sw + x1];
      const c = src[y1 * sw + x0];
      const d = src[y1 * sw + x1];
      const top = a + (b - a) * wx;
      const bot = c + (d - c) * wx;
      out[y * dw + x] = (top + (bot - top) * wy) | 0;
    }
  }
  return out;
}

// --- Morphology --------------------------------------------------------------

// Square dilation (local max). Separable: horizontal then vertical.
function dilateSq(src, w, h, k) {
  const half = (k - 1) >> 1;
  const tmp = new Uint8ClampedArray(w * h);
  // Horizontal
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let mx = 0;
      const x0 = Math.max(0, x - half), x1 = Math.min(w - 1, x + half);
      for (let xx = x0; xx <= x1; xx++) {
        const v = src[row + xx];
        if (v > mx) mx = v;
      }
      tmp[row + x] = mx;
    }
  }
  // Vertical
  const out = new Uint8ClampedArray(w * h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let mx = 0;
      const y0 = Math.max(0, y - half), y1 = Math.min(h - 1, y + half);
      for (let yy = y0; yy <= y1; yy++) {
        const v = tmp[yy * w + x];
        if (v > mx) mx = v;
      }
      out[y * w + x] = mx;
    }
  }
  return out;
}

// --- Box blur (separable, multi-pass approx of Gaussian) --------------------

function boxBlur1D(src, w, h, radius, axis) {
  // axis=0 horizontal, 1 vertical.
  const out = new Uint8ClampedArray(w * h);
  const r = Math.max(1, radius | 0);
  const div = r * 2 + 1;
  if (axis === 0) {
    for (let y = 0; y < h; y++) {
      const row = y * w;
      let sum = 0;
      // initial window
      for (let i = -r; i <= r; i++) {
        const xx = Math.max(0, Math.min(w - 1, i));
        sum += src[row + xx];
      }
      for (let x = 0; x < w; x++) {
        out[row + x] = (sum / div) | 0;
        const xAdd = Math.max(0, Math.min(w - 1, x + r + 1));
        const xSub = Math.max(0, Math.min(w - 1, x - r));
        sum += src[row + xAdd] - src[row + xSub];
      }
    }
  } else {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let i = -r; i <= r; i++) {
        const yy = Math.max(0, Math.min(h - 1, i));
        sum += src[yy * w + x];
      }
      for (let y = 0; y < h; y++) {
        out[y * w + x] = (sum / div) | 0;
        const yAdd = Math.max(0, Math.min(h - 1, y + r + 1));
        const ySub = Math.max(0, Math.min(h - 1, y - r));
        sum += src[yAdd * w + x] - src[ySub * w + x];
      }
    }
  }
  return out;
}

// 3 box-blur passes ≈ Gaussian.
function gaussianApprox(src, w, h, sigma) {
  const passes = 3;
  // Box radius for desired sigma: see https://blog.ivank.net/fastest-gaussian-blur.html
  const idealW = Math.sqrt((12 * sigma * sigma) / passes + 1);
  let wl = Math.floor(idealW);
  if (wl % 2 === 0) wl--;
  const wu = wl + 2;
  const m = ((12 * sigma * sigma - passes * wl * wl - 4 * passes * wl - 3 * passes) /
             (-4 * wl - 4)) | 0;
  let buf = src;
  for (let p = 0; p < passes; p++) {
    const radius = ((p < m ? wl : wu) - 1) / 2;
    buf = boxBlur1D(buf, w, h, radius, 0);
    buf = boxBlur1D(buf, w, h, radius, 1);
  }
  return buf;
}

// --- CLAHE-lite: per-tile percentile stretch --------------------------------

function tileStretch(src, w, h, tileX, tileY, lowPct = 0.05, highPct = 0.95) {
  // For each tile, compute lo/hi percentiles and stretch [lo, hi] -> [0, 255].
  // Then bilinearly interpolate the LUTs across tiles to avoid blocky seams.
  //
  // Important guard: if a tile has no real ink (its dark percentile is still
  // bright, e.g. > 170), don't stretch — that would amplify scan noise on
  // the page margins into visible streaks. Pass it through identity.
  const tw = Math.ceil(w / tileX);
  const th = Math.ceil(h / tileY);
  const NO_INK_THRESHOLD = 170;
  // Build per-tile [lo, hi].
  const los = new Uint8ClampedArray(tileX * tileY);
  const his = new Uint8ClampedArray(tileX * tileY);
  for (let ty = 0; ty < tileY; ty++) {
    const y0 = ty * th;
    const y1 = Math.min(h, y0 + th);
    for (let tx = 0; tx < tileX; tx++) {
      const x0 = tx * tw;
      const x1 = Math.min(w, x0 + tw);
      const hist = new Int32Array(256);
      let n = 0;
      for (let y = y0; y < y1; y++) {
        const row = y * w;
        for (let x = x0; x < x1; x++) {
          hist[src[row + x]]++;
          n++;
        }
      }
      // Percentile cumulative.
      const lowCount = Math.floor(n * lowPct);
      const highCount = Math.floor(n * highPct);
      let lo = 0, hi = 255, c = 0;
      for (let i = 0; i < 256; i++) {
        c += hist[i];
        if (c >= lowCount) { lo = i; break; }
      }
      c = 0;
      for (let i = 0; i < 256; i++) {
        c += hist[i];
        if (c >= highCount) { hi = i; break; }
      }
      // Guard: if this tile has no real ink, treat it as identity so the
      // stretch doesn't amplify noise.
      if (lo > NO_INK_THRESHOLD) { lo = 0; hi = 255; }
      else if (hi - lo < 30) hi = Math.min(255, lo + 30);
      los[ty * tileX + tx] = lo;
      his[ty * tileX + tx] = hi;
    }
  }
  // Apply with bilinear interpolation of (lo, hi) across tile centers.
  const out = new Uint8ClampedArray(w * h);
  for (let y = 0; y < h; y++) {
    const fy = (y + 0.5) / th - 0.5;
    const ty0 = Math.max(0, Math.min(tileY - 1, fy | 0));
    const ty1 = Math.max(0, Math.min(tileY - 1, ty0 + 1));
    const wy = Math.max(0, Math.min(1, fy - ty0));
    for (let x = 0; x < w; x++) {
      const fx = (x + 0.5) / tw - 0.5;
      const tx0 = Math.max(0, Math.min(tileX - 1, fx | 0));
      const tx1 = Math.max(0, Math.min(tileX - 1, tx0 + 1));
      const wx = Math.max(0, Math.min(1, fx - tx0));
      const lo00 = los[ty0 * tileX + tx0], hi00 = his[ty0 * tileX + tx0];
      const lo01 = los[ty0 * tileX + tx1], hi01 = his[ty0 * tileX + tx1];
      const lo10 = los[ty1 * tileX + tx0], hi10 = his[ty1 * tileX + tx0];
      const lo11 = los[ty1 * tileX + tx1], hi11 = his[ty1 * tileX + tx1];
      const lo = (lo00 * (1 - wx) + lo01 * wx) * (1 - wy) +
                 (lo10 * (1 - wx) + lo11 * wx) * wy;
      const hi = (hi00 * (1 - wx) + hi01 * wx) * (1 - wy) +
                 (hi10 * (1 - wx) + hi11 * wx) * wy;
      const v = src[y * w + x];
      const span = Math.max(1, hi - lo);
      let s = ((v - lo) * 255) / span;
      if (s < 0) s = 0;
      if (s > 255) s = 255;
      out[y * w + x] = s | 0;
    }
  }
  return out;
}

// --- Pipeline ----------------------------------------------------------------

export function scanifyImageData(imgData, opts = {}) {
  // imgData: ImageData (RGBA). Returns ImageData with the cleaned grayscale
  // result written back as RGB.
  const { width: w, height: h } = imgData;
  const gray = rgbaToGray(imgData.data, w, h);

  // 1. Background estimate at small resolution.
  const scale = TARGET_LONG / Math.max(w, h);
  const sw = Math.max(1, Math.round(w * scale));
  const sh = Math.max(1, Math.round(h * scale));
  const small = downsample(gray, w, h, sw, sh);

  const dilateK = Math.max(5, Math.min(sw, sh) / 25 | 0) | 1;
  const paperSmall = dilateSq(small, sw, sh, dilateK);
  const sigmaSmall = Math.max(sw, sh) * 0.08;
  const bgSmall = gaussianApprox(paperSmall, sw, sh, sigmaSmall);
  const bg = upsample(bgSmall, sw, sh, w, h);

  // 2. Divide.
  const flat = new Uint8ClampedArray(w * h);
  for (let i = 0; i < flat.length; i++) {
    const v = (gray[i] * 255) / Math.max(1, bg[i]);
    flat[i] = v > 255 ? 255 : v < 0 ? 0 : v;
  }

  // 3. Per-tile percentile stretch (CLAHE-lite).
  const tile = Math.max(4, Math.min(16, Math.round(Math.min(w, h) / 200)));
  const boosted = tileStretch(flat, w, h, tile, tile);

  // 4. Tone curve.
  const lo = opts.toneLo ?? 130;
  const hi = opts.toneHi ?? 195;
  const lut = new Uint8ClampedArray(256);
  for (let i = 0; i < 256; i++) {
    if (i <= lo) lut[i] = 0;
    else if (i >= hi) lut[i] = 255;
    else lut[i] = (((i - lo) * 255) / (hi - lo)) | 0;
  }
  const curved = new Uint8ClampedArray(w * h);
  for (let i = 0; i < curved.length; i++) {
    const v = lut[boosted[i]];
    curved[i] = v > 235 ? 255 : v;
  }

  // 5. Light unsharp mask.
  const blur = gaussianApprox(curved, w, h, 1.0);
  const out = new Uint8ClampedArray(w * h);
  for (let i = 0; i < out.length; i++) {
    const v = curved[i] * 1.5 - blur[i] * 0.5;
    out[i] = v > 255 ? 255 : v < 0 ? 0 : v | 0;
  }

  // Pack back to RGBA.
  const rgba = new Uint8ClampedArray(w * h * 4);
  for (let i = 0, j = 0; i < out.length; i++, j += 4) {
    rgba[j] = rgba[j + 1] = rgba[j + 2] = out[i];
    rgba[j + 3] = 255;
  }
  return new ImageData(rgba, w, h);
}
