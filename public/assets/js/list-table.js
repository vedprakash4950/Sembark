/* =========================================================
   LIST-TABLE.JS
   Generic engine that powers every simple entity list page
   (Customers, Employees, Products, Categories, Inventory,
   Invoices, Sales, Purchase, Suppliers, Users, Roles) with
   the same DataTable + filter + export + bulk-action pattern
   established on pages/orders.html.

   Usage: each page defines window.LIST_PAGE_CONFIG = {...}
   (see any pages/*.html <script> block for the shape) before
   this file loads, then calls initListTable() on DOM ready.
   ========================================================= */
(function ($) {
  'use strict';

  function cell(col, row) {
    const val = row[col.key];
    switch (col.type) {
      case 'avatarText':
        return `<img src="https://i.pravatar.cc/48?img=${row.avatar}" class="avatar avatar-sm me-2">${val}`;
      case 'image':
        return `<img src="${row.image}" class="avatar avatar-sm rounded me-2" style="object-fit:cover;">${val}`;
      case 'badge':
        return `<span class="badge ${row[col.classKey] || col.defaultClass || 'bg-primary-subtle-custom'}">${val}</span>`;
      case 'currency':
        return `$${Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'number':
        return Number(val).toLocaleString();
      case 'stock':
        { const low = Number(val) <= (col.lowThreshold || 10);
          return `${val} ${low ? '<span class="badge bg-danger-subtle-custom ms-1">Low</span>' : ''}`; }
      case 'actions':
        return `<div class="dropdown">
          <button class="btn btn-sm btn-icon btn-outline-light-custom" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>View</a></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Edit</a></li>
            <li><a class="dropdown-item text-danger row-delete-btn" href="#"><i class="bi bi-trash me-2"></i>Delete</a></li>
          </ul>
        </div>`;
      default:
        return val;
    }
  }

  function actionsCell() {
    return `<div class="dropdown">
      <button class="btn btn-sm btn-icon btn-outline-light-custom" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>View</a></li>
        <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Edit</a></li>
        <li><a class="dropdown-item text-danger row-delete-btn" href="#"><i class="bi bi-trash me-2"></i>Delete</a></li>
      </ul>
    </div>`;
  }

  function renderRow(columns, row) {
    const tds = columns.map(c => `<td>${cell(c, row)}</td>`).join('');
    return `<tr data-id="${row.id}">
      <td><input type="checkbox" class="form-check-input row-check"></td>
      ${tds}
      <td>${actionsCell()}</td>
    </tr>`;
  }

  function initListTable() {
    const cfg = window.LIST_PAGE_CONFIG;
    if (!cfg || !$.fn.DataTable) return;
    const $table = $('#' + cfg.tableId);
    if (!$table.length) return;

    $table.find('tbody').html(cfg.data.map(row => renderRow(cfg.columns, row)).join(''));

    // Column indices: 0 = checkbox, 1..N = data columns, N+1 = actions (both non-orderable)
    const actionsCol = cfg.columns.length + 1;
    const table = $table.DataTable({
      pageLength: 10,
      order: [[1, 'desc']],
      columnDefs: [{ orderable: false, targets: [0, actionsCol] }],
      dom: '<"d-flex justify-content-between align-items-center mb-2"lB>rt<"d-flex justify-content-between align-items-center mt-2"ip>',
      buttons: [
        { extend: 'copy', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-clipboard"></i> Copy' },
        { extend: 'csv', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-filetype-csv"></i> CSV' },
        { extend: 'excel', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-file-earmark-excel"></i> Excel' },
        { extend: 'print', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-printer"></i> Print' }
      ]
    });

    // ---- Status/category filter dropdown, if configured ----
    if (cfg.filterColumnIndex != null) {
      $('#statusFilter').on('change', function () {
        table.column(cfg.filterColumnIndex).search($(this).val() || '', false, false).draw();
      });
    }

    // ---- Select all / bulk bar ----
    function updateBulkBar() {
      const count = $table.find('.row-check:checked').length;
      $('#selectedCount').text(count);
      $('#bulkActionsWrap').toggle(count > 0);
    }
    $(document).on('change', '#selectAllRows', function () {
      $table.find('tbody .row-check:visible').prop('checked', this.checked);
      updateBulkBar();
    });
    $(document).on('change', '.row-check', updateBulkBar);

    $('#bulkDeleteBtn').on('click', function (e) {
      e.preventDefault();
      const count = $table.find('.row-check:checked').length;
      if (!count) return;
      Swal.fire({
        title: `Delete ${count} ${cfg.entityLabelPlural || 'record'}(s)?`,
        text: 'This action cannot be undone.',
        icon: 'warning', showCancelButton: true,
        confirmButtonText: 'Delete', confirmButtonColor: '#FF4D4F'
      }).then(function (result) {
        if (result.isConfirmed) {
          $table.find('.row-check:checked').closest('tr').each(function () { table.row(this).remove(); });
          table.draw();
          updateBulkBar();
          Swal.fire({ title: 'Deleted', icon: 'success', timer: 1200, showConfirmButton: false });
        }
      });
    });

    $('#bulkUpdateBtn').on('click', function (e) {
      e.preventDefault();
      if (!cfg.bulkUpdateOptions) return;
      Swal.fire({
        title: `Update ${cfg.bulkUpdateField || 'status'} to...`,
        input: 'select',
        inputOptions: cfg.bulkUpdateOptions,
        showCancelButton: true,
        confirmButtonText: 'Update'
      }).then(function (result) {
        if (result.isConfirmed && result.value) {
          Swal.fire({ title: 'Updated', icon: 'success', timer: 1200, showConfirmButton: false });
        }
      });
    });

    $(document).on('click', '.row-delete-btn', function (e) {
      e.preventDefault();
      const $row = $(this).closest('tr');
      Swal.fire({
        title: `Delete this ${cfg.entityLabel || 'record'}?`,
        text: 'This action cannot be undone.',
        icon: 'warning', showCancelButton: true,
        confirmButtonText: 'Delete', confirmButtonColor: '#FF4D4F'
      }).then(function (result) {
        if (result.isConfirmed) {
          table.row($row).remove().draw();
          Swal.fire({ title: 'Deleted', icon: 'success', timer: 1200, showConfirmButton: false });
        }
      });
    });

    if ($.fn.select2) $('.select2-basic').select2({ theme: 'bootstrap-5', width: '100%' });
    if (window.flatpickr) {
      flatpickr('.flatpickr-date', { dateFormat: 'Y-m-d' });
      flatpickr('.flatpickr-range', { mode: 'range', dateFormat: 'M j' });
    }
  }

  $(function () { initListTable(); });

})(jQuery);
