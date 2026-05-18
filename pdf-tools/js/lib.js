// Shared helpers for all tool pages.

export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export function showStatus(el, message, kind = 'info') {
  el.textContent = message;
  el.className = `status show ${kind}`;
}

export function clearStatus(el) {
  el.className = 'status';
}

export function setProgress(el, ratio) {
  const bar = el.querySelector('.progress-bar');
  if (ratio == null) {
    el.classList.remove('show');
  } else {
    el.classList.add('show');
    bar.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
  }
}

// Trigger a download from a Uint8Array / Blob / ArrayBuffer.
export function downloadBlob(data, filename, type = 'application/octet-stream') {
  const blob = data instanceof Blob
    ? data
    : new Blob([data instanceof ArrayBuffer ? data : new Uint8Array(data)], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Wire up a dropzone element. Calls onFiles(File[]).
// Optional: { accept: 'application/pdf', multiple: true }
export function wireDropzone(zoneEl, onFiles, opts = {}) {
  const input = zoneEl.querySelector('input[type="file"]');
  if (input) {
    if (opts.accept) input.accept = opts.accept;
    if (opts.multiple) input.multiple = true;
    input.addEventListener('change', (e) => {
      if (e.target.files.length) onFiles([...e.target.files]);
      input.value = '';
    });
  }

  zoneEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') return;
    input?.click();
  });

  zoneEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    zoneEl.classList.add('dragover');
  });
  zoneEl.addEventListener('dragleave', () => zoneEl.classList.remove('dragover'));
  zoneEl.addEventListener('drop', (e) => {
    e.preventDefault();
    zoneEl.classList.remove('dragover');
    const files = [...e.dataTransfer.files];
    if (opts.accept) {
      const accepts = opts.accept.split(',').map(s => s.trim());
      const matches = files.filter(f => accepts.some(a => {
        if (a.endsWith('/*')) return f.type.startsWith(a.slice(0, -1));
        if (a.startsWith('.')) return f.name.toLowerCase().endsWith(a);
        return f.type === a;
      }));
      onFiles(matches);
    } else {
      onFiles(files);
    }
  });
}

// Read a File into an ArrayBuffer.
export function readArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// Parse "1-3, 5, 7-9" into a sorted unique list of 0-based page indices.
export function parsePageRanges(input, pageCount) {
  const result = new Set();
  const parts = input.split(/[,\s]+/).filter(Boolean);
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) throw new Error(`Bad range: "${part}"`);
    const start = parseInt(m[1], 10);
    const end = m[2] ? parseInt(m[2], 10) : start;
    if (start < 1 || end > pageCount || start > end) {
      throw new Error(`Range "${part}" out of bounds (1–${pageCount})`);
    }
    for (let p = start; p <= end; p++) result.add(p - 1);
  }
  return [...result].sort((a, b) => a - b);
}

// Strip extension from a filename.
export function baseName(name) {
  return name.replace(/\.[^/.]+$/, '');
}
