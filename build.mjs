// 装配发布产物 dist/：只收官方题型目录下的题目 HTML + 首页源文件。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist');

// LeetCode 热题 100 官方 17 类，新增题目直接放进对应目录即可被收录
const CATEGORIES = [
  '哈希', '双指针', '滑动窗口', '子串', '普通数组', '矩阵',
  '链表', '二叉树', '图论', '回溯', '二分查找', '栈', '堆',
  '贪心算法', '动态规划', '多维动态规划', '技巧', '数据库'
];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let pages = 0;
for (const cat of CATEGORIES) {
  const dir = path.join(ROOT, cat);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.html')) {
      console.warn(`跳过非 HTML：${cat}/${f}`);
      continue;
    }
    fs.mkdirSync(path.join(OUT, cat), { recursive: true });
    fs.copyFileSync(path.join(dir, f), path.join(OUT, cat, f));
    pages++;
  }
}

fs.copyFileSync(path.join(ROOT, 'site', 'index.html'), path.join(OUT, 'index.html'));

const strays = fs.readdirSync(OUT, { recursive: true, withFileTypes: true })
  .filter(e => e.isFile() && !e.name.endsWith('.html'))
  .map(e => path.join(e.parentPath || OUT, e.name).slice(OUT.length + 1));
if (strays.length) {
  console.error('dist 内出现非 HTML 产物：', strays);
  process.exit(1);
}
console.log(`dist 装配完成：${pages} 个题目页 + 1 个首页`);
