/**
 * UI-label patch: Rename HANI2 -> Angel Mode (labels only)
 * Safe by design: ไม่แตะชื่อตัวแปร/ฟังก์ชัน; เน้นเฉพาะข้อความที่ผู้ใช้เห็นเท่านั้น
 */
const fs = require('fs');
const path = require('path');

const exts = ['.tsx', '.ts', '.jsx', '.js', '.html', '.mdx'];
const roots = ['src', 'index.html']; // ปกติ Vite อยู่ใต้ src + index.html

const rules = [
  // เปลี่ยน label แบบเฉพาะจุดก่อน (ปลอดภัยสุด)
  [/HANI2 Color/g, 'Angel Mode'],
  [/HANI Status/g, 'Angel Mode'],
  [/HANI2 Signal/g, 'Angel Mode'],

  [/Auto set HANI2/g, 'Auto set Angel Mode'],
  [/=\s*HANI2/g, '= Angel Mode'], // e.g. "… = HANI2"
  [/>HANI2</g, '>Angel Mode<'], // e.g. JSX text node

  // กันหลุดจุดที่เป็นข้อความโดด ๆ
  [/"HANI2"/g, '"Angel Mode"'],
  [/'HANI2'/g, "'Angel Mode'"],
  [/`HANI2`/g, '`Angel Mode`'],

  // เว้นวรรครอบคำ (ลดโอกาสโดนตัวแปร)
  [/ HANI2 /g, ' Angel Mode '],
];

// เดินไฟล์ทั้งโปรเจกต์
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const stat = fs.statSync(dir);
  if (stat.isFile()) return out.concat(dir);
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function shouldTouch(file) {
  return exts.includes(path.extname(file));
}

function patchFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [re, to] of rules) {
    const next = src.replace(re, to);
    if (next !== src) {
      src = next;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, src, 'utf8');
    console.log('✔ patched:', file);
  }
}

(function main() {
  console.log('== Angel Mode label patch ==');
  const files = [];
  for (const r of roots) {
    if (fs.existsSync(r)) {
      if (fs.statSync(r).isFile()) files.push(r);
      else walk(r, files);
    }
  }
  const targets = files.filter(shouldTouch);
  targets.forEach(patchFile);
  console.log(
    'Done. ตรวจหน้า /forecast ทุกจุดที่มี HANI2 ว่ากลายเป็น Angel Mode แล้ว'
  );
})();
