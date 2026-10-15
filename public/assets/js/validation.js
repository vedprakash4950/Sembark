/* =========================================================
   VALIDATION.JS
   1) Standard Bootstrap "was-validated" handling for any
      <form class="needs-validation">.
   2) Multi-step Form Wizard: next/prev navigation, per-step
      validation, progress indicator, success screen.
   ========================================================= */
(function ($) {
  'use strict';

  // ---- Standard Bootstrap validation ----
  document.querySelectorAll('form.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else if (!form.classList.contains('wizard-form')) {
        e.preventDefault(); // demo only, no real backend
        if (window.Swal) {
          Swal.fire({ icon: 'success', title: 'Saved!', text: 'Your changes have been saved.', confirmButtonColor: '#5B6EF5' });
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

  // ---- Form Wizard ----
  $(function () {
    const $wizard = $('#formWizard');
    if (!$wizard.length) return;

    const $steps = $wizard.find('.wizard-pane');
    const $indicators = $wizard.find('.wizard-step-indicator');
    let current = 0;

    function showStep(index) {
      $steps.removeClass('active').eq(index).addClass('active');
      $indicators.each(function (i) {
        $(this).toggleClass('active', i === index);
        $(this).toggleClass('completed', i < index);
      });
      $wizard.find('.wizard-prev-btn').prop('disabled', index === 0);
      $wizard.find('.wizard-next-btn').toggleClass('d-none', index === $steps.length - 1);
      $wizard.find('.wizard-submit-btn').toggleClass('d-none', index !== $steps.length - 1);
      current = index;
    }

    function validateStep(index) {
      const $pane = $steps.eq(index);
      let valid = true;
      $pane.find('input, select, textarea').each(function () {
        if (!this.checkValidity()) { valid = false; }
      });
      $pane.addClass('was-validated');
      return valid;
    }

    $wizard.on('click', '.wizard-next-btn', function () {
      if (validateStep(current) && current < $steps.length - 1) {
        showStep(current + 1);
      }
    });

    $wizard.on('click', '.wizard-prev-btn', function () {
      if (current > 0) showStep(current - 1);
    });

    $wizard.on('click', '.wizard-submit-btn', function () {
      if (validateStep(current)) {
        $wizard.find('.wizard-body').hide();
        $wizard.find('.wizard-progress').hide();
        $wizard.find('.wizard-success-screen').removeClass('d-none');
      }
    });

    $wizard.on('click', '.wizard-restart-btn', function () {
      $wizard.find('.wizard-success-screen').addClass('d-none');
      $wizard.find('.wizard-body').show();
      $wizard.find('.wizard-progress').show();
      $steps.removeClass('was-validated');
      $wizard.find('form')[0] && $wizard.find('form')[0].reset();
      showStep(0);
    });

    showStep(0);
  });

})(jQuery);
