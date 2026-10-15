/* =========================================================
   SETTINGS.JS
   Page-specific script for pages/settings.html
   ========================================================= */
(function ($) {
  'use strict';

  $(function () {
    $('.settings-save-btn').on('click', function (e) {
      e.preventDefault();
      Swal.fire({ title: 'Settings saved', icon: 'success', timer: 1300, showConfirmButton: false });
    });

    $('.session-revoke-btn').on('click', function () {
      const $item = $(this).closest('.list-widget-item');
      Swal.fire({
        title: 'Revoke this session?',
        text: 'That device will be signed out immediately.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Revoke',
        confirmButtonColor: '#FF4D4F'
      }).then(function (result) {
        if (result.isConfirmed) {
          $item.fadeOut(200, function () { $(this).remove(); });
        }
      });
    });
  });

})(jQuery);
