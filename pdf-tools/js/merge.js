import { PDFDocument } from 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm';
import {
  $, wireDropzone, formatBytes, showStatus, clearStatus, setProgress,
  downloadBlob, readArrayBuffer
} from './lib.js';

const dz = $('#dropzone');
const list = $('#files');
const runBtn = $('#run');
const clearBtn = $('#clear');
const statusEl = $('#status');
const progressEl = $('#progress');

let files = [];

function render() {
  list.innerHTML = '';
  files.forEach((file, idx) => {
    const row = document.createElement('div');
    row.className = 'file-item';
    row.draggable = true;
    row.dataset.idx = idx;
    row.innerHTML = `
      <span class="meta">⋮⋮</span>
      <span class="name">${file.name}</span>
      <span class="meta">${formatBytes(file.size)}</span>
      <span class="actions">
        <button data-act="up" title="Move up">↑</button>
        <button data-act="down" title="Move down">↓</button>
        <button data-act="rm" class="danger" title="Remove">✕</button>
      </span>
    `;
    list.appendChild(row);
  });
  runBtn.disabled = files.length < 2;
  clearBtn.disabled = files.length === 0;
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const row = btn.closest('.file-item');
  const idx = +row.dataset.idx;
  if (btn.dataset.act === 'rm') files.splice(idx, 1);
  else if (btn.dataset.act === 'up' && idx > 0) {
    [files[idx - 1], files[idx]] = [files[idx], files[idx - 1]];
  } else if (btn.dataset.act === 'down' && idx < files.length - 1) {
    [files[idx + 1], files[idx]] = [files[idx], files[idx + 1]];
  }
  render();
});

// Drag-to-reorder
let dragIdx = null;
list.addEventListener('dragstart', (e) => {
  const row = e.target.closest('.file-item');
  if (!row) return;
  dragIdx = +row.dataset.idx;
  row.style.opacity = '0.5';
});
list.addEventListener('dragend', (e) => {
  const row = e.target.closest('.file-item');
  if (row) row.style.opacity = '';
  dragIdx = null;
});
list.addEventListener('dragover', (e) => e.preventDefault());
list.addEventListener('drop', (e) => {
  e.preventDefault();
  if (dragIdx == null) return;
  const row = e.target.closest('.file-item');
  if (!row) return;
  const dropIdx = +row.dataset.idx;
  const item = files.splice(dragIdx, 1)[0];
  files.splice(dropIdx, 0, item);
  render();
});

wireDropzone(dz, (incoming) => {
  files.push(...incoming);
  render();
}, { accept: '.pdf', multiple: true });

clearBtn.addEventListener('click', () => {
  files = [];
  render();
  clearStatus(statusEl);
});

runBtn.addEventListener('click', async () => {
  runBtn.disabled = true;
  clearBtn.disabled = true;
  showStatus(statusEl, 'Merging…', 'info');
  setProgress(progressEl, 0);
  try {
    const merged = await PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      const buf = await readArrayBuffer(files[i]);
      const src = await PDFDocument.load(buf);
      const indices = src.getPageIndices();
      const copied = await merged.copyPages(src, indices);
      copied.forEach((p) => merged.addPage(p));
      setProgress(progressEl, (i + 1) / files.length);
    }
    const bytes = await merged.save();
    downloadBlob(bytes, 'merged.pdf', 'application/pdf');
    showStatus(statusEl, `Merged ${files.length} PDFs · downloaded as merged.pdf`, 'success');
  } catch (err) {
    console.error(err);
    showStatus(statusEl, `Error: ${err.message}`, 'error');
  } finally {
    setProgress(progressEl, null);
    runBtn.disabled = files.length < 2;
    clearBtn.disabled = files.length === 0;
  }
});
