/* main.js — 公开主页的交互：主题切换、年份、滚动入场动画 */
(() => {
  'use strict';

  // 标记 JS 可用，启用 reveal 入场动画；禁用 JS 时内容默认可见
  document.documentElement.classList.add('js-enabled');

  // 年份
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 主题：仅在存在切换按钮时启用（当前首页无切换按钮，沿用 HTML 的 data-theme）
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    apply(initial);
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      apply(next);
    });
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // 滚动入场
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
