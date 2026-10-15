/* =========================================================
   FORM.JS
   Initializes rich form controls used on pages/forms.html:
   Select2, tags input, color swatches, range slider label,
   drag-and-drop file upload with image preview.
   ========================================================= */
(function ($) {
  'use strict';

  $(function () {
    // ---- Select2 ----
    if ($.fn.select2) {
      $('.select2-single').select2({ theme: 'bootstrap-5', width: '100%' });
      $('.select2-multiple').select2({ theme: 'bootstrap-5', width: '100%', placeholder: 'Select options...' });
    }

    // ---- Flatpickr: date / time / datetime ----
    if (window.flatpickr) {
      flatpickr('.flatpickr-date', { dateFormat: 'Y-m-d' });
      flatpickr('.flatpickr-time', { enableTime: true, noCalendar: true, dateFormat: 'H:i' });
      flatpickr('.flatpickr-datetime', { enableTime: true, dateFormat: 'Y-m-d H:i' });
    }

    // ---- Range slider live value ----
    $('.form-range').on('input', function () {
      $(this).siblings('.range-value-label').text(this.value);
    });

    // ---- Color swatches ----
    $(document).on('click', '.color-swatch', function () {
      $(this).siblings('.color-swatch').removeClass('selected');
      $(this).addClass('selected');
      const hex = $(this).data('color');
      $(this).closest('.color-swatch-group').siblings('input[type="hidden"]').val(hex);
    });

    // ---- Tags input ----
    $('.tags-input-wrap').each(function () {
      const $wrap = $(this);
      const $field = $wrap.find('.tags-input-field');

      function addTag(text) {
        text = text.trim().replace(/,$/, '');
        if (!text) return;
        const $pill = $('<span class="tag-pill"></span>')
          .append($('<span></span>').text(text))
          .append('<span class="tag-remove"><i class="bi bi-x"></i></span>');
        $pill.insertBefore($field);
      }

      $field.on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          addTag($field.val());
          $field.val('');
        } else if (e.key === 'Backspace' && $field.val() === '') {
          $wrap.find('.tag-pill').last().remove();
        }
      });

      $wrap.on('click', function () { $field.trigger('focus'); });
      $wrap.on('click', '.tag-remove', function (e) {
        e.stopPropagation();
        $(this).closest('.tag-pill').remove();
      });
    });

    // ---- File drop-zone with image preview ----
    $('.file-drop-zone').each(function () {
      const $zone = $(this);
      const $input = $zone.find('input[type="file"]');
      const $previewRow = $($zone.data('preview-target') || '');

      $zone.on('click', function () { $input.trigger('click'); });
      $zone.on('dragover', function (e) { e.preventDefault(); $zone.addClass('dragover'); });
      $zone.on('dragleave', function () { $zone.removeClass('dragover'); });
      $zone.on('drop', function (e) {
        e.preventDefault();
        $zone.removeClass('dragover');
        handleFiles(e.originalEvent.dataTransfer.files);
      });
      $input.on('change', function () { handleFiles(this.files); });

      function handleFiles(files) {
        if (!$previewRow.length) return;
        Array.from(files).forEach(function (file) {
          if (!file.type.startsWith('image/')) return;
          const reader = new FileReader();
          reader.onload = function (e) {
            const $thumb = $(
              '<div class="file-preview-thumb"><img src="' + e.target.result + '" alt=""><span class="remove-thumb"><i class="bi bi-x"></i></span></div>'
            );
            $thumb.find('.remove-thumb').on('click', function () { $thumb.remove(); });
            $previewRow.append($thumb);
          };
          reader.readAsDataURL(file);
        });
      }
    });
  });

})(jQuery);
