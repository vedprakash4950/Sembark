<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard · Tfxadmin</title>

    <!-- Prevent flash of wrong theme before CSS loads -->
    <script>
        (function() {
            var t = localStorage.getItem('admin-theme') || 'light';
            document.documentElement.setAttribute('data-theme', t);
        })();
    </script>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">

    <!-- Bootstrap 5.3 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
    <!-- DataTables (Bootstrap 5 styling) -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css">
    <!-- Flatpickr -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    <!-- Theme CSS (modular, load order matters) -->
    <link rel="stylesheet" href="assets/css/variables.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="stylesheet" href="assets/css/sidebar.css">
    <link rel="stylesheet" href="assets/css/navbar.css">
    <link rel="stylesheet" href="assets/css/cards.css">
    <link rel="stylesheet" href="assets/css/theme.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
</head>

<body>

    <!-- =========================================================
       LOADING OVERLAY
       ========================================================= -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div class="app-wrapper">

        <!-- =========================================================
         SIDEBAR OVERLAY (mobile only)
         ========================================================= -->
        <div class="sidebar-overlay"></div>

        <!-- =========================================================
         SIDEBAR
         ========================================================= -->
        @include('admin.layouts.sidebar')
        <!-- =========================================================
         MAIN CONTENT
         ========================================================= -->
        <div class="main-content">

            <!-- ===== NAVBAR ===== -->
            @include('admin.layouts.header')
            <!-- ===== PAGE CONTENT ===== -->
            @yield('content')
            <!-- ===== FOOTER ===== -->
            @include('admin.layouts.footer')
        </div>
    </div>

    <!-- Scroll to top -->
    <button class="scroll-to-top" id="scrollToTopBtn" aria-label="Scroll to top">
        <i class="bi bi-arrow-up"></i>
    </button>

    <!-- ===== SEARCH OVERLAY MODAL (Ctrl+K) ===== -->
    <div class="modal fade" id="searchOverlayModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="p-3 border-bottom">
                        <div class="input-group">
                            <span class="input-group-text bg-transparent border-0"><i class="bi bi-search"></i></span>
                            <input type="text" class="form-control border-0" placeholder="Search pages, orders, customers..." autofocus>
                            <button class="btn-close me-2" data-bs-dismiss="modal"></button>
                        </div>
                    </div>
                    <div class="p-3">
                        <div class="text-xs text-muted text-uppercase fw-600 mb-2">Quick Links</div>
                        <a href="pages/orders.html" class="dropdown-item rounded mb-1"><i class="bi bi-receipt me-2"></i>Orders</a>
                        <a href="pages/customers.html" class="dropdown-item rounded mb-1"><i class="bi bi-people me-2"></i>Customers</a>
                        <a href="pages/products.html" class="dropdown-item rounded"><i class="bi bi-box-seam me-2"></i>Products</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ===== VENDOR JS ===== -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.49.1/dist/apexcharts.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- ===== APP JS (modular, load order matters) ===== -->
    <script src="assets/js/theme.js"></script>
    <script src="assets/js/sidebar.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="assets/js/charts.js"></script>
    <script src="assets/js/dashboard.js"></script>

    <script>
        // Date range picker for the dashboard header
        if (window.flatpickr) {
            flatpickr('.flatpickr-range', {
                mode: 'range',
                dateFormat: 'M j',
                defaultDate: ['2026-07-01', '2026-07-14']
            });
        }
    </script>
</body>

</html>