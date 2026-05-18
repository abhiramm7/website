import { PDFDocument } from 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm';
import {
  $, wireDropzone, showStatus, clearStatus, setProgress,
  downloadBlob, readArrayBuffer, baseName
} from './lib.js';
import { scanifyImageData } from './scanify.js';

const dz = $('#dropzone');
const config = $('#config');
const info = $('#info');
const dpiSel = $('#dpi');
const toneSel = $('#tone');
const runBtn = $('#run');
const previewBtn = $('#preview-btn');
const clearBtn = $('#clear');
const statusEl = $('#status');
const progressEl = $('#progress');
const previewWrap = $('#preview');
const beforeCanvas = $('#before');
const afterCanvas = $('#after');

let file = null;
let pageCount = 0;
let pdfBuffer = null;

function toneParams() {
  switch (toneSel.value) {
    case 'soft':       return { toneLo: 100, toneHi: 215 };
    case 'aggressive': return { toneLo: 145, toneHi: 185 };
    default:           return { toneLo: 130, toneHi: 195 };
  }
}

async function renderPdfPageToCanvas(pdf, pageNum, dpi, canvas) {
  const page = await pdf.getPage(pageNum);
  const scale = dpi / 72;
  const viewport = page.getViewport({ scale });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

wireDropzone(dz, async ([f]) => {
  if (!f) return;
  file = f;
  try {
    pdfBuffer = await readArrayBuffer(f);
    const pdf = await window.pdfjsLib.getDocument({ data: pdfBuffer.slice(0) }).promise;
    pageCount = pdf.numPages;
    info.textContent = `${f.name} · ${pageCount} page${pageCount === 1 ? '' : 's'}`;
    config.style.display = 'block';
    previewWrap.classList.remove('show');
    clearStatus(statusEl);
  } catch (err) {
    showStatus(statusEl, `Could not read PDF: ${err.message}`, 'error');
  }
}, { accept: '.pdf' });

clearBtn.addEventListener('click', () => {
  file = null;
  pageCount = 0;
  pdfBuffer = null;
  config.style.display = 'none';
  previewWrap.classList.remove('show');
  clearStatus(statusEl);
});

previewBtn.addEventListener('click', async () => {
  if (!pdfBuffer) return;
  previewBtn.disabled = true;
  showStatus(statusEl, 'Rendering preview…', 'info');
  try {
    const pdf = await window.pdfjsLib.getDocument({ data: pdfBuffer.slice(0) }).promise;
    const dpi = +dpiSel.value;
    await renderPdfPageToCanvas(pdf, 1, dpi, beforeCanvas);
    const ctx = beforeCanvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, beforeCanvas.width, beforeCanvas.height);
    const cleaned = scanifyImageData(imgData, toneParams());
    afterCanvas.width = cleaned.width;
    afterCanvas.height = cleaned.height;
    afterCanvas.getContext('2d').putImageData(cleaned, 0, 0);
    previewWrap.classList.add('show');
    clearStatus(statusEl);
  } catch (err) {
    console.error(err);
    showStatus(statusEl, `Preview failed: ${err.message}`, 'error');
  } finally {
    previewBtn.disabled = false;
  }
});

runBtn.addEventListener('click', async () => {
  if (!pdfBuffer) return;
  runBtn.disabled = true;
  previewBtn.disabled = true;
  clearBtn.disabled = true;
  showStatus(statusEl, 'Enhancing…', 'info');
  setProgress(progressEl, 0);

  // Off-screen canvas for rendering each PDF page.
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  try {
    const pdf = await window.pdfjsLib.getDocument({ data: pdfBuffer.slice(0) }).promise;
    const dpi = +dpiSel.value;
    const out = await PDFDocument.create();
    const params = toneParams();

    for (let i = 1; i <= pdf.numPages; i++) {
      await renderPdfPageToCanvas(pdf, i, dpi, canvas);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const cleaned = scanifyImageData(imgData, params);
      ctx.putImageData(cleaned, 0, 0);
      // Encode as JPEG (much smaller than PNG for scans, still visually clean).
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const jpgBytes = Uint8Array.from(atob(dataUrl.split(',')[1]), c => c.charCodeAt(0));
      const img = await out.embedJpg(jpgBytes);
      // Keep page size in points (1pt = 1/72 in). Image is at `dpi` DPI.
      const widthPt = (canvas.width / dpi) * 72;
      const heightPt = (canvas.height / dpi) * 72;
      const page = out.addPage([widthPt, heightPt]);
      page.drawImage(img, { x: 0, y: 0, width: widthPt, height: heightPt });
      setProgress(progressEl, i / pdf.numPages);
      // yield to UI
      await new Promise(r => setTimeout(r, 0));
    }
    const bytes = await out.save();
    downloadBlob(bytes, `${baseName(file.name)} - enhanced.pdf`, 'application/pdf');
    showStatus(statusEl, `Enhanced ${pdf.numPages} page${pdf.numPages === 1 ? '' : 's'}`, 'success');
  } catch (err) {
    console.error(err);
    showStatus(statusEl, `Error: ${err.message}`, 'error');
  } finally {
    setProgress(progressEl, null);
    runBtn.disabled = false;
    previewBtn.disabled = false;
    clearBtn.disabled = false;
  }
});
