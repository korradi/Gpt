"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || (!storedTheme && userPrefersDark)) {
    html.classList.add('dark');
}
themeToggle?.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
    else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});
