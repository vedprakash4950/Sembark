/* =========================================================
   DASHBOARD.JS
   Page-specific script for index.html (dashboard) only:
   Recent Orders DataTable + Upcoming Tasks checkbox behavior.
   ========================================================= */
(function ($) {
  'use strict';

  $(function () {
    // ---- Recent Orders table: lightweight DataTable ----
    if ($.fn.DataTable && $('#recentOrdersTable').length) {
      $('#recentOrdersTable').DataTable({
        pageLength: 5,
        lengthChange: false,
        info: false,
        searching: false,
        order: [[0, 'desc']],
        columnDefs: [{ orderable: false, targets: -1 }],
        language: {
          paginate: { previous: '‹', next: '›' }
        }
      });
    }

    // ---- Upcoming Tasks: strike-through label when checked ----
    $(document).on('change', '.task-check-input', function () {
      $(this).closest('.list-widget-item').find('.item-title')
        .toggleClass('text-decoration-line-through text-muted', this.checked);
    });
  });

})(jQuery);
