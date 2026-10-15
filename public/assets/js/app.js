/* =========================================================
   APP.JS
   Global, page-agnostic initializers. Include on every page.
   ========================================================= */
(function ($) {
  'use strict';

  $(function () {
    // ---- Bootstrap tooltips ----
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
      new bootstrap.Tooltip(el);
    });

    // ---- Bootstrap popovers ----
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(function (el) {
      new bootstrap.Popover(el);
    });

    // ---- Loading overlay: hide once the page is fully ready ----
    setTimeout(function () {
      $('#loadingOverlay').addClass('hidden');
    }, 250);

    // ---- Scroll to top button ----
    const $scrollBtn = $('#scrollToTopBtn');
    $(window).on('scroll', function () {
      $scrollBtn.toggleClass('show', $(window).scrollTop() > 300);
    });
    $scrollBtn.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 350);
    });

    // ---- Fullscreen toggle ----
    $('#fullscreenToggleBtn').on('click', function () {
      const icon = $(this).find('i');
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function () {});
        icon.attr('class', 'bi bi-fullscreen-exit');
      } else {
        document.exitFullscreen();
        icon.attr('class', 'bi bi-arrows-fullscreen');
      }
    });

    // ---- Generic "toast trigger" helper: any element with
    // data-toast-target="#myToast" shows that toast on click ----
    $(document).on('click', '[data-toast-target]', function () {
      const target = $(this).data('toast-target');
      const toastEl = document.querySelector(target);
      if (toastEl) new bootstrap.Toast(toastEl).show();
    });

    // ---- Sidebar search overlay (navbar global search, Ctrl+K) ----
    $(document).on('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const modalEl = document.getElementById('searchOverlayModal');
        if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });

  });

})(jQuery);
