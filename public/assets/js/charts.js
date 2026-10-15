/* =========================================================
   CHARTS.JS
   ApexCharts instances used on the dashboard page.
   Colors are read from CSS variables so charts stay in sync
   with the active theme (light/dark) automatically.
   ========================================================= */
(function ($) {
  'use strict';

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  let chartInstances = [];

  function destroyAll() {
    chartInstances.forEach(function (c) { c.destroy(); });
    chartInstances = [];
  }

  function renderCharts() {
    const primary = cssVar('--bs-primary');
    const success = cssVar('--bs-success');
    const warning = cssVar('--bs-warning');
    const danger = cssVar('--bs-danger');
    const info = cssVar('--bs-info');
    const textMuted = cssVar('--text-secondary');
    const borderColor = cssVar('--border-color');
    const fontFamily = "Inter, sans-serif";

    // ---- 1. Revenue Area Chart (main dashboard chart) ----
    if (document.querySelector('#revenueAreaChart')) {
      const revenueChart = new ApexCharts(document.querySelector('#revenueAreaChart'), {
        chart: { type: 'area', height: 300, toolbar: { show: false }, fontFamily, sparkline: { enabled: false } },
        series: [
          { name: 'Revenue', data: [31, 40, 28, 51, 42, 65, 59, 70, 61, 84, 78, 95] },
          { name: 'Expenses', data: [18, 22, 20, 30, 26, 34, 30, 38, 33, 40, 36, 44] }
        ],
        xaxis: {
          categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          labels: { style: { colors: textMuted, fontSize: '11px' } },
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: { labels: { style: { colors: textMuted, fontSize: '11px' } } },
        colors: [primary, warning],
        stroke: { curve: 'smooth', width: 2.5 },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 90] } },
        grid: { borderColor: borderColor, strokeDashArray: 4 },
        legend: { position: 'top', horizontalAlign: 'right', labels: { colors: textMuted }, markers: { radius: 4 } },
        dataLabels: { enabled: false },
        tooltip: { theme: 'light' }
      });
      revenueChart.render();
      chartInstances.push(revenueChart);
    }

    // ---- 2. Sales by Category - Donut ----
    if (document.querySelector('#salesDonutChart')) {
      const donutChart = new ApexCharts(document.querySelector('#salesDonutChart'), {
        chart: { type: 'donut', height: 260, fontFamily },
        series: [42, 26, 18, 14],
        labels: ['Electronics', 'Fashion', 'Grocery', 'Others'],
        colors: [primary, success, warning, info],
        legend: { position: 'bottom', labels: { colors: textMuted }, markers: { radius: 4 } },
        dataLabels: { enabled: true, style: { fontSize: '11px' } },
        plotOptions: { pie: { donut: { size: '70%', labels: {
          show: true,
          total: { show: true, label: 'Total Orders', color: textMuted, fontSize: '12px' }
        } } } },
        stroke: { width: 0 }
      });
      donutChart.render();
      chartInstances.push(donutChart);
    }

    // ---- 3. Weekly Visitors - Bar ----
    if (document.querySelector('#visitorsBarChart')) {
      const barChart = new ApexCharts(document.querySelector('#visitorsBarChart'), {
        chart: { type: 'bar', height: 260, toolbar: { show: false }, fontFamily },
        series: [{ name: 'Visitors', data: [120, 200, 150, 260, 210, 300, 240] }],
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          labels: { style: { colors: textMuted, fontSize: '11px' } },
          axisBorder: { show: false }, axisTicks: { show: false }
        },
        yaxis: { labels: { style: { colors: textMuted, fontSize: '11px' } } },
        plotOptions: { bar: { borderRadius: 6, columnWidth: '45%', distributed: false } },
        colors: [primary],
        dataLabels: { enabled: false },
        grid: { borderColor: borderColor, strokeDashArray: 4 },
        tooltip: { theme: 'light' }
      });
      barChart.render();
      chartInstances.push(barChart);
    }

    // ---- 4. Sparkline mini-charts inside stat cards ----
    document.querySelectorAll('.sparkline-chart').forEach(function (el) {
      const data = JSON.parse(el.getAttribute('data-series') || '[]');
      const color = el.getAttribute('data-color') || primary;
      const spark = new ApexCharts(el, {
        chart: { type: 'area', height: 50, sparkline: { enabled: true } },
        series: [{ data: data }],
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
        colors: [color],
        tooltip: { enabled: false }
      });
      spark.render();
      chartInstances.push(spark);
    });

    // ---- 5. Radial (goal progress) ----
    if (document.querySelector('#goalRadialChart')) {
      const radial = new ApexCharts(document.querySelector('#goalRadialChart'), {
        chart: { type: 'radialBar', height: 220, fontFamily },
        series: [72],
        labels: ['Monthly Goal'],
        colors: [success],
        plotOptions: {
          radialBar: {
            hollow: { size: '65%' },
            dataLabels: {
              value: { fontSize: '20px', fontWeight: 700, color: cssVar('--text-primary') },
              name: { fontSize: '12px', color: textMuted }
            }
          }
        }
      });
      radial.render();
      chartInstances.push(radial);
    }
  }

  $(function () { renderCharts(); });

  // Redraw with fresh CSS-variable colors whenever the theme changes
  $(document).on('theme:changed', function () {
    destroyAll();
    setTimeout(renderCharts, 50);
  });

})(jQuery);
