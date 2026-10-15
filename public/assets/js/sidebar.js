/* =========================================================
   SIDEBAR.JS
   Handles: desktop collapse/expand, mobile drawer open/close,
   multi-level submenu active state, sidebar quick search.
   Depends on jQuery + Bootstrap JS (for collapse) being loaded.
   ========================================================= */
(function ($) {
  'use strict';

  const $wrapper = $('.app-wrapper');
  const STORAGE_KEY = 'admin-sidebar-collapsed';

  function initCollapseState() {
    const collapsed = localStorage.getItem(STORAGE_KEY) === '1';
    if (collapsed && window.innerWidth > 991) {
      $wrapper.addClass('sidebar-collapsed');
    }
  }

  // Desktop collapse/expand toggle (button inside sidebar footer)
  $(document).on('click', '#sidebarCollapseBtn', function () {
    $wrapper.toggleClass('sidebar-collapsed');
    localStorage.setItem(STORAGE_KEY, $wrapper.hasClass('sidebar-collapsed') ? '1' : '0');
  });

  // Mobile hamburger toggle (navbar button) opens the off-canvas drawer
  $(document).on('click', '#sidebarMobileToggle', function () {
    $wrapper.addClass('sidebar-mobile-open');
  });

  // Close drawer via overlay click or explicit close button
  $(document).on('click', '.sidebar-overlay, #sidebarMobileClose', function () {
    $wrapper.removeClass('sidebar-mobile-open');
  });

  // Close mobile drawer automatically if resized back to desktop
  $(window).on('resize', function () {
    if (window.innerWidth > 991) {
      $wrapper.removeClass('sidebar-mobile-open');
    }
  });

  // Auto-detect which sidebar link points at the current page (by file
  // name, ignoring folders) and mark it + its parent trail as active.
  // This means individual pages never need to hardcode "active" classes.
  function markActiveTrail() {
    const currentFile = (location.pathname.split('/').pop() || 'index.html');

    $('.sidebar-nav-link[href]').each(function () {
      const href = $(this).attr('href');
      if (!href || href.charAt(0) === '#') return;
      const linkFile = href.split('/').pop();
      if (linkFile === currentFile) {
        $(this).addClass('active-link');
      }
    });

    $('.sidebar-nav-link.active-link').each(function () {
      $(this).closest('.nav-item').addClass('active');
      const $parentCollapse = $(this).closest('.collapse');
      if ($parentCollapse.length) {
        $parentCollapse.addClass('show');
        $parentCollapse.prev('.sidebar-nav-link').attr('aria-expanded', 'true');
        $parentCollapse.closest('.nav-item').addClass('active');
      }
    });
  }

  // Sidebar quick search: filters nav-item labels by text match
  $(document).on('input', '#sidebarSearchInput', function () {
    const term = $(this).val().toLowerCase().trim();
    $('.sidebar-nav > .nav-item').each(function () {
      const $item = $(this);
      const text = $item.text().toLowerCase();
      const matches = term === '' || text.includes(term);
      $item.toggle(matches);
    });
  });

  // Only one top-level submenu open at a time (accordion behavior)
  $(document).on('show.bs.collapse', '.sidebar-nav .collapse', function () {
    $(this).closest('.sidebar-nav')
      .find('.collapse.show')
      .not(this)
      .collapse('hide');
  });

  $(function () {
    initCollapseState();
    markActiveTrail();
  });

})(jQuery);
