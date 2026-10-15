/* =========================================================
   CHARTS-PAGE.JS
   Extra ApexCharts examples used only on pages/charts.html
   ========================================================= */
(function ($) {
  'use strict';

  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

  function render() {
    const primary = cssVar('--bs-primary'), success = cssVar('--bs-success'),
      warning = cssVar('--bs-warning'), danger = cssVar('--bs-danger'), info = cssVar('--bs-info'),
      textMuted = cssVar('--text-secondary'), borderColor = cssVar('--border-color'),
      fontFamily = 'Inter, sans-serif';

    if (document.querySelector('#lineChart')) {
      new ApexCharts(document.querySelector('#lineChart'), {
        chart: { type: 'line', height: 300, toolbar: { show: false }, fontFamily },
        series: [{ name: 'Response (ms)', data: [220, 180, 240, 190, 260, 210, 175, 205, 230, 190] }],
        xaxis: { categories: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00'], labels: { style: { colors: textMuted, fontSize: '11px' } } },
        yaxis: { labels: { style: { colors: textMuted, fontSize: '11px' } } },
        colors: [info], stroke: { curve: 'smooth', width: 3 },
        grid: { borderColor, strokeDashArray: 4 }, dataLabels: { enabled: false },
        markers: { size: 4 }
      }).render();
    }

    if (document.querySelector('#hbarChart')) {
      new ApexCharts(document.querySelector('#hbarChart'), {
        chart: { type: 'bar', height: 300, toolbar: { show: false }, fontFamily },
        series: [{ name: 'Revenue', data: [44000, 38000, 29000, 24000, 18000] }],
        xaxis: { categories: ['North America','Europe','Asia Pacific','Latin America','Middle East'], labels: { style: { colors: textMuted, fontSize: '11px' } } },
        plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '55%' } },
        colors: [primary], dataLabels: { enabled: false },
        grid: { borderColor, strokeDashArray: 4 }
      }).render();
    }

    if (document.querySelector('#mixedChart')) {
      new ApexCharts(document.querySelector('#mixedChart'), {
        chart: { height: 300, toolbar: { show: false }, fontFamily },
        series: [
          { name: 'Sales', type: 'column', data: [30, 40, 35, 50, 49, 60, 70, 91] },
          { name: 'Growth %', type: 'line', data: [12, 18, 15, 22, 20, 28, 32, 38] }
        ],
        stroke: { width: [0, 3], curve: 'smooth' },
        xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'], labels: { style: { colors: textMuted, fontSize: '11px' } } },
        yaxis: [
          { labels: { style: { colors: textMuted, fontSize: '11px' } } },
          { opposite: true, labels: { style: { colors: textMuted, fontSize: '11px' } } }
        ],
        colors: [primary, warning],
        plotOptions: { bar: { borderRadius: 5, columnWidth: '45%' } },
        grid: { borderColor, strokeDashArray: 4 },
        legend: { labels: { colors: textMuted } }
      }).render();
    }

    if (document.querySelector('#heatmapChart')) {
      const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      const series = ['0-4h','4-8h','8-12h','12-16h','16-20h','20-24h'].map(name => ({
        name, data: days.map(d => ({ x: d, y: Math.floor(Math.random() * 90) + 10 }))
      }));
      new ApexCharts(document.querySelector('#heatmapChart'), {
        chart: { type: 'heatmap', height: 300, toolbar: { show: false }, fontFamily },
        series,
        colors: [primary],
        dataLabels: { enabled: false },
        xaxis: { labels: { style: { colors: textMuted, fontSize: '11px' } } },
        yaxis: { labels: { style: { colors: textMuted, fontSize: '11px' } } }
      }).render();
    }

    if (document.querySelector('#radarChart')) {
      new ApexCharts(document.querySelector('#radarChart'), {
        chart: { type: 'radar', height: 280, fontFamily },
        series: [{ name: 'Team', data: [80, 65, 90, 70, 60, 85] }],
        labels: ['Design', 'Dev', 'Marketing', 'Sales', 'Support', 'Ops'],
        colors: [success],
        xaxis: { labels: { style: { colors: [textMuted] } } }
      }).render();
    }

    if (document.querySelector('#polarChart')) {
      new ApexCharts(document.querySelector('#polarChart'), {
        chart: { type: 'polarArea', height: 280, fontFamily },
        series: [42, 28, 18, 12],
        labels: ['Organic', 'Referral', 'Social', 'Direct'],
        colors: [primary, success, warning, info],
        legend: { position: 'bottom', labels: { colors: textMuted } }
      }).render();
    }

    if (document.querySelector('#pieChart')) {
      new ApexCharts(document.querySelector('#pieChart'), {
        chart: { type: 'pie', height: 280, fontFamily },
        series: [55, 30, 15],
        labels: ['Mobile', 'Desktop', 'Tablet'],
        colors: [primary, info, warning],
        legend: { position: 'bottom', labels: { colors: textMuted } }
      }).render();
    }
  }

  $(function () { render(); });
  $(document).on('theme:changed', function () {
    document.querySelectorAll('#lineChart,#hbarChart,#mixedChart,#heatmapChart,#radarChart,#polarChart,#pieChart')
      .forEach(el => { el.innerHTML = ''; });
    setTimeout(render, 50);
  });

})(jQuery);
