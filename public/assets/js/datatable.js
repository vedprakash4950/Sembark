/* =========================================================
   DATATABLE.JS
   Advanced DataTable behavior used on pages/orders.html:
   - column filter row (per-column search)
   - "select all" checkbox + row selection + bulk action bar
   - export buttons (CSV / Print) via native browser APIs
   - row action dropdown (view / edit / delete with SweetAlert2)
   ========================================================= */
(function ($) {
  'use strict';

  $(function () {
    const $table = $('#ordersTable');
    if (!$table.length || !$.fn.DataTable) return;

    const table = $table.DataTable({
      pageLength: 8,
      order: [[1, 'desc']],
      columnDefs: [{ orderable: false, targets: [0, -1] }],
      language: { paginate: { previous: '‹', next: '›' } }
    });

    // ---- Per-column filter inputs (row injected below header) ----
    $('#ordersTable thead .column-filter-row input, #ordersTable thead .column-filter-row select').on('keyup change', function () {
      const colIndex = $(this).closest('th').index();
      table.column(colIndex).search(this.value).draw();
    });

    // ---- Row checkbox selection + bulk action bar ----
    const $bulkBar = $('#bulkActionBar');
    const $selectAll = $('#selectAllOrders');

    function updateBulkBar() {
      const count = $table.find('tbody .row-check:checked').length;
      $bulkBar.toggleClass('show', count > 0);
      $bulkBar.find('.selected-count').text(count);
      $table.find('tbody tr').each(function () {
        $(this).toggleClass('row-selected', $(this).find('.row-check').is(':checked'));
      });
    }

    $(document).on('change', '#ordersTable .row-check', updateBulkBar);

    $selectAll.on('change', function () {
      $table.find('tbody .row-check').prop('checked', this.checked);
      updateBulkBar();
    });

    $(document).on('click', '#bulkDeleteBtn', function () {
      const count = $table.find('tbody .row-check:checked').length;
      if (window.Swal) {
        Swal.fire({
          icon: 'warning', title: 'Delete selected orders?',
          text: count + ' order(s) will be permanently removed.',
          showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#FF4D4F'
        }).then(function (res) {
          if (res.isConfirmed) {
            table.rows(function (idx, data, node) { return $(node).find('.row-check').is(':checked'); }).remove().draw();
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1200, showConfirmButton: false });
            $bulkBar.removeClass('show');
          }
        });
      }
    });

    $(document).on('click', '#bulkUpdateBtn', function () {
      const modalEl = document.getElementById('bulkUpdateModal');
      if (modalEl) bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });

    // ---- Row delete (single) ----
    $(document).on('click', '.row-delete-btn', function () {
      const $row = $(this).closest('tr');
      if (window.Swal) {
        Swal.fire({
          icon: 'warning', title: 'Delete this order?', showCancelButton: true,
          confirmButtonText: 'Delete', confirmButtonColor: '#FF4D4F'
        }).then(function (res) {
          if (res.isConfirmed) {
            table.row($row).remove().draw();
            Swal.fire({ icon: 'success', title: 'Deleted', timer: 1000, showConfirmButton: false });
          }
        });
      }
    });

    // ---- Export: CSV ----
    $(document).on('click', '#exportCsvBtn', function () {
      let csv = [];
      table.rows({ search: 'applied' }).every(function () {
        const data = this.data();
        // Skip checkbox (0) and actions (last) columns
        csv.push(data.slice(1, data.length - 1).map(function (d) { return '"' + $('<div>').html(d).text().replace(/"/g, '""') + '"'; }).join(','));
      });
      const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'orders-export.csv';
      link.click();
    });

    // ---- Export: Print ----
    $(document).on('click', '#exportPrintBtn', function () {
      window.print();
    });

    updateBulkBar();
  });

})(jQuery);
