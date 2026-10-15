/* =========================================================
   ORDERS.JS
   Page-specific script for pages/orders.html:
   DataTable w/ export buttons, status filter, date filter,
   row selection + bulk update/delete, row action confirmations.
   ========================================================= */
(function ($) {
  'use strict';

  const STATUS_CLASS = {
    Delivered: 'bg-success-subtle-custom',
    Processing: 'bg-warning-subtle-custom',
    Shipped: 'bg-info-subtle-custom',
    Cancelled: 'bg-danger-subtle-custom'
  };

  const CUSTOMERS = [
    ['Daniel Kim', 5], ['Amelia Ross', 9], ['Noah Patel', 15], ['Sophia Turner', 20],
    ['Liam Chen', 25], ['Isabella Wood', 31], ['Ethan Brooks', 40], ['Mia Sanders', 48]
  ];
  const PRODUCTS = ['Wireless Headset', '4K Monitor', 'Mechanical Keyboard', 'Office Chair', 'USB-C Hub', 'Standing Desk', 'Webcam Pro', 'Laptop Stand'];
  const STATUSES = ['Delivered', 'Processing', 'Shipped', 'Cancelled'];

  function buildRows(n) {
    const rows = [];
    for (let i = 0; i < n; i++) {
      const cust = CUSTOMERS[i % CUSTOMERS.length];
      const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
      const day = 1 + (i % 28);
      rows.push({
        id: 10300 - i,
        customer: cust[0],
        avatar: cust[1],
        product: PRODUCTS[i % PRODUCTS.length],
        date: `2026-07-${String(day).padStart(2, '0')}`,
        amount: (Math.random() * 450 + 30).toFixed(2),
        status
      });
    }
    return rows;
  }

  const ORDERS = buildRows(42);

  function renderRow(o) {
    return `<tr data-id="${o.id}" data-status="${o.status}" data-date="${o.date}">
      <td><input type="checkbox" class="form-check-input row-check"></td>
      <td>#${o.id}</td>
      <td><img src="https://i.pravatar.cc/48?img=${o.avatar}" class="avatar avatar-sm me-2">${o.customer}</td>
      <td>${o.product}</td>
      <td>${o.date}</td>
      <td>$${o.amount}</td>
      <td><span class="badge ${STATUS_CLASS[o.status]}">${o.status}</span></td>
      <td>
        <div class="dropdown">
          <button class="btn btn-sm btn-icon btn-outline-light-custom" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>View</a></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Edit</a></li>
            <li><a class="dropdown-item text-danger row-delete-btn" href="#"><i class="bi bi-trash me-2"></i>Delete</a></li>
          </ul>
        </div>
      </td>
    </tr>`;
  }

  $(function () {
    if (!$.fn.DataTable || !$('#ordersTable').length) return;

    $('#ordersTable tbody').html(ORDERS.map(renderRow).join(''));

    const table = $('#ordersTable').DataTable({
      pageLength: 10,
      order: [[1, 'desc']],
      columnDefs: [{ orderable: false, targets: [0, 7] }],
      dom: '<"d-flex justify-content-between align-items-center mb-2"lB>rt<"d-flex justify-content-between align-items-center mt-2"ip>',
      buttons: [
        { extend: 'copy', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-clipboard"></i> Copy' },
        { extend: 'csv', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-filetype-csv"></i> CSV' },
        { extend: 'excel', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-file-earmark-excel"></i> Excel' },
        { extend: 'print', className: 'btn btn-sm btn-outline-light-custom', text: '<i class="bi bi-printer"></i> Print' }
      ]
    });

    // ---- Status filter (custom search) ----
    $('#statusFilter').on('change', function () {
      const val = $(this).val();
      table.column(6).search(val ? val : '', false, false).draw();
    });

    // ---- Select all / row checkboxes → bulk actions bar ----
    function updateBulkBar() {
      const count = $('.row-check:checked').length;
      $('#selectedCount').text(count);
      $('#bulkActionsWrap').toggle(count > 0);
    }

    $(document).on('change', '#selectAllOrders', function () {
      $('#ordersTable tbody .row-check:visible').prop('checked', this.checked);
      updateBulkBar();
    });

    $(document).on('change', '.row-check', updateBulkBar);

    // ---- Bulk delete ----
    $('#bulkDeleteBtn').on('click', function (e) {
      e.preventDefault();
      const count = $('.row-check:checked').length;
      if (!count) return;
      Swal.fire({
        title: `Delete ${count} order(s)?`,
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#FF4D4F'
      }).then(function (result) {
        if (result.isConfirmed) {
          $('.row-check:checked').closest('tr').each(function () { table.row(this).remove(); });
          table.draw();
          updateBulkBar();
          Swal.fire({ title: 'Deleted', icon: 'success', timer: 1200, showConfirmButton: false });
        }
      });
    });

    // ---- Bulk status update ----
    $('#bulkUpdateBtn').on('click', function (e) {
      e.preventDefault();
      Swal.fire({
        title: 'Update status to...',
        input: 'select',
        inputOptions: { Delivered: 'Delivered', Processing: 'Processing', Shipped: 'Shipped', Cancelled: 'Cancelled' },
        showCancelButton: true,
        confirmButtonText: 'Update'
      }).then(function (result) {
        if (result.isConfirmed && result.value) {
          $('.row-check:checked').closest('tr').each(function () {
            $(this).attr('data-status', result.value);
            $(this).find('td:eq(6)').html(`<span class="badge ${STATUS_CLASS[result.value]}">${result.value}</span>`);
          });
          Swal.fire({ title: 'Updated', icon: 'success', timer: 1200, showConfirmButton: false });
        }
      });
    });

    // ---- Single row delete ----
    $(document).on('click', '.row-delete-btn', function (e) {
      e.preventDefault();
      const $row = $(this).closest('tr');
      Swal.fire({
        title: 'Delete this order?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#FF4D4F'
      }).then(function (result) {
        if (result.isConfirmed) {
          table.row($row).remove().draw();
          Swal.fire({ title: 'Deleted', icon: 'success', timer: 1200, showConfirmButton: false });
        }
      });
    });

    // ---- Save new order (modal) ----
    $('#saveOrderBtn').on('click', function () {
      bootstrap.Modal.getInstance(document.getElementById('addOrderModal')).hide();
      Swal.fire({ title: 'Order created', icon: 'success', timer: 1300, showConfirmButton: false });
    });

    // ---- Select2 + Flatpickr inside the modal ----
    if ($.fn.select2) $('.select2-basic').select2({ theme: 'bootstrap-5', width: '100%' });
    if (window.flatpickr) {
      flatpickr('.flatpickr-date', { dateFormat: 'Y-m-d' });
      flatpickr('.flatpickr-range', { mode: 'range', dateFormat: 'M j' });
    }
  });

})(jQuery);
