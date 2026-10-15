/* =========================================================
   THEME.JS
   Dark / light mode toggle. Persists choice in localStorage
   and applies it before paint via an inline snippet in <head>
   (see index.html) to avoid a flash of the wrong theme.
   ========================================================= */
(function ($) {
  'use strict';

  const STORAGE_KEY = 'admin-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    $('#themeToggleBtn i').attr('class', theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars');
    $('.theme-switch-input').prop('checked', theme === 'dark');
    // Let charts.js know it should redraw with theme-aware colors
    $(document).trigger('theme:changed', [theme]);
  }

  $(document).on('click', '#themeToggleBtn', function () {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  $(document).on('change', '.theme-switch-input', function () {
    const next = $(this).is(':checked') ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  $(function () {
    const saved = localStorage.getItem(STORAGE_KEY) || 'light';
    applyTheme(saved);
  });

})(jQuery);
