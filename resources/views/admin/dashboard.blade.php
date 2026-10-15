@extends('admin.layouts.app')
@section('content')
<main class="page-content">

    <div class="page-header">
        <div>
            <div class="page-title">Dashboard</div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
        </div>
        <div class="d-flex gap-2">
            <input type="text" class="form-control flatpickr-range" placeholder="Select date range" style="width:220px;">
            <button class="btn btn-primary"><i class="bi bi-download me-1"></i> Export Report</button>
        </div>
    </div>

    <!-- ===== STAT CARDS ===== -->
    <div class="row g-3 mb-3">
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="stat-card">
                    <div>
                        <div class="stat-label">Total Revenue</div>
                        <div class="stat-value">$128,940</div>
                        <span class="stat-trend up"><i class="bi bi-arrow-up-short"></i> 12.4% vs last month</span>
                    </div>
                    <div class="icon-box bg-primary-subtle-custom"><i class="bi bi-cash-stack"></i></div>
                </div>
                <div class="sparkline-chart" data-color="#5B6EF5" data-series="[28,32,29,38,34,42,40,48]" style="height:50px;"></div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="stat-card">
                    <div>
                        <div class="stat-label">Total Sales</div>
                        <div class="stat-value">4,762</div>
                        <span class="stat-trend up"><i class="bi bi-arrow-up-short"></i> 8.1% vs last month</span>
                    </div>
                    <div class="icon-box bg-success-subtle-custom"><i class="bi bi-bag-check-fill"></i></div>
                </div>
                <div class="sparkline-chart" data-color="#17C666" data-series="[12,18,14,20,17,25,22,29]" style="height:50px;"></div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="stat-card">
                    <div>
                        <div class="stat-label">Net Profit</div>
                        <div class="stat-value">$42,318</div>
                        <span class="stat-trend down"><i class="bi bi-arrow-down-short"></i> 2.3% vs last month</span>
                    </div>
                    <div class="icon-box bg-warning-subtle-custom"><i class="bi bi-graph-up-arrow"></i></div>
                </div>
                <div class="sparkline-chart" data-color="#FFB400" data-series="[30,26,28,22,25,20,23,19]" style="height:50px;"></div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="stat-card">
                    <div>
                        <div class="stat-label">Pending Orders</div>
                        <div class="stat-value">186</div>
                        <span class="stat-trend up"><i class="bi bi-arrow-up-short"></i> 5.6% vs last month</span>
                    </div>
                    <div class="icon-box bg-danger-subtle-custom"><i class="bi bi-hourglass-split"></i></div>
                </div>
                <div class="sparkline-chart" data-color="#FF4D4F" data-series="[8,14,10,16,12,18,15,20]" style="height:50px;"></div>
            </div>
        </div>
    </div>

    <!-- ===== SECONDARY STAT ROW ===== -->
    <div class="row g-3 mb-3">
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="card-body d-flex align-items-center gap-3">
                    <div class="icon-box bg-info-subtle-custom"><i class="bi bi-eye-fill"></i></div>
                    <div>
                        <div class="stat-label mb-1">Today's Visitors</div>
                        <div class="fw-700 fs-5">3,482</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="card-body d-flex align-items-center gap-3">
                    <div class="icon-box bg-primary-subtle-custom"><i class="bi bi-person-plus-fill"></i></div>
                    <div>
                        <div class="stat-label mb-1">New Customers</div>
                        <div class="fw-700 fs-5">217</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="card-body d-flex align-items-center gap-3">
                    <div class="icon-box bg-warning-subtle-custom"><i class="bi bi-box-seam"></i></div>
                    <div>
                        <div class="stat-label mb-1">Low Stock Items</div>
                        <div class="fw-700 fs-5">14</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card h-100">
                <div class="card-body d-flex align-items-center gap-3">
                    <div class="icon-box bg-success-subtle-custom"><i class="bi bi-cart-check-fill"></i></div>
                    <div>
                        <div class="stat-label mb-1">Today's Sales</div>
                        <div class="fw-700 fs-5">$8,942</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== CHARTS ROW ===== -->
    <div class="row g-3 mb-3">
        <div class="col-xl-8">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Revenue vs Expenses</h6>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-light-custom active">Yearly</button>
                        <button class="btn btn-outline-light-custom">Monthly</button>
                        <button class="btn btn-outline-light-custom">Weekly</button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="revenueAreaChart"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Sales by Category</h6>
                </div>
                <div class="card-body">
                    <div id="salesDonutChart"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-3 mb-3">
        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Weekly Visitors</h6>
                </div>
                <div class="card-body">
                    <div id="visitorsBarChart"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Monthly Goal</h6>
                </div>
                <div class="card-body">
                    <div id="goalRadialChart"></div>
                    <p class="text-center text-sm text-secondary mb-0">$72,000 of $100,000 target reached</p>
                </div>
            </div>
        </div>
        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Quick Actions</h6>
                </div>
                <div class="card-body">
                    <div class="row g-2">
                        <div class="col-6">
                            <a href="pages/products.html" class="quick-action-tile text-decoration-none d-flex">
                                <i class="bi bi-plus-circle fs-4"></i> Add Product
                            </a>
                        </div>
                        <div class="col-6">
                            <a href="pages/orders.html" class="quick-action-tile text-decoration-none d-flex">
                                <i class="bi bi-receipt-cutoff fs-4"></i> New Order
                            </a>
                        </div>
                        <div class="col-6">
                            <a href="pages/customers.html" class="quick-action-tile text-decoration-none d-flex">
                                <i class="bi bi-person-plus fs-4"></i> Add Customer
                            </a>
                        </div>
                        <div class="col-6">
                            <a href="pages/invoices.html" class="quick-action-tile text-decoration-none d-flex">
                                <i class="bi bi-file-earmark-text fs-4"></i> Create Invoice
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== RECENT ORDERS + TOP PRODUCTS ===== -->
    <div class="row g-3 mb-3">
        <div class="col-xl-8">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Recent Orders</h6>
                    <a href="pages/orders.html" class="text-sm fw-600 text-decoration-none">View All</a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle" id="recentOrdersTable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#10248</td>
                                    <td><img src="https://i.pravatar.cc/48?img=5" class="avatar avatar-sm me-2">Daniel Kim</td>
                                    <td>Wireless Headset</td>
                                    <td>$142.00</td>
                                    <td><span class="badge bg-success-subtle-custom">Delivered</span></td>
                                    <td><button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-three-dots"></i></button></td>
                                </tr>
                                <tr>
                                    <td>#10247</td>
                                    <td><img src="https://i.pravatar.cc/48?img=9" class="avatar avatar-sm me-2">Amelia Ross</td>
                                    <td>4K Monitor</td>
                                    <td>$389.00</td>
                                    <td><span class="badge bg-warning-subtle-custom">Processing</span></td>
                                    <td><button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-three-dots"></i></button></td>
                                </tr>
                                <tr>
                                    <td>#10246</td>
                                    <td><img src="https://i.pravatar.cc/48?img=15" class="avatar avatar-sm me-2">Noah Patel</td>
                                    <td>Mechanical Keyboard</td>
                                    <td>$96.50</td>
                                    <td><span class="badge bg-danger-subtle-custom">Cancelled</span></td>
                                    <td><button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-three-dots"></i></button></td>
                                </tr>
                                <tr>
                                    <td>#10245</td>
                                    <td><img src="https://i.pravatar.cc/48?img=20" class="avatar avatar-sm me-2">Sophia Turner</td>
                                    <td>Office Chair</td>
                                    <td>$210.00</td>
                                    <td><span class="badge bg-success-subtle-custom">Delivered</span></td>
                                    <td><button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-three-dots"></i></button></td>
                                </tr>
                                <tr>
                                    <td>#10244</td>
                                    <td><img src="https://i.pravatar.cc/48?img=25" class="avatar avatar-sm me-2">Liam Chen</td>
                                    <td>USB-C Hub</td>
                                    <td>$54.00</td>
                                    <td><span class="badge bg-info-subtle-custom">Shipped</span></td>
                                    <td><button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-three-dots"></i></button></td>
                                </tr>
                                <tr>
                                    <td>#10243</td>
                                    <td><img src="https://i.pravatar.cc/48?img=31" class="avatar avatar-sm me-2">Isabella Wood</td>
                                    <td>Standing Desk</td>
                                    <td>$460.00</td>
                                    <td><span class="badge bg-warning-subtle-custom">Processing</span></td>
                                    <td><button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-three-dots"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Top Selling Products</h6>
                </div>
                <div class="card-body">
                    <div class="list-widget-item">
                        <img src="https://i.pravatar.cc/64?img=60" class="avatar" alt="">
                        <div class="flex-grow-1">
                            <div class="item-title">Wireless Headset Pro</div>
                            <div class="item-sub">842 sold · $92 each</div>
                        </div>
                        <span class="fw-600 text-success">+18%</span>
                    </div>
                    <div class="list-widget-item">
                        <img src="https://i.pravatar.cc/64?img=61" class="avatar" alt="">
                        <div class="flex-grow-1">
                            <div class="item-title">Ergo Office Chair</div>
                            <div class="item-sub">610 sold · $210 each</div>
                        </div>
                        <span class="fw-600 text-success">+9%</span>
                    </div>
                    <div class="list-widget-item">
                        <img src="https://i.pravatar.cc/64?img=62" class="avatar" alt="">
                        <div class="flex-grow-1">
                            <div class="item-title">4K UHD Monitor</div>
                            <div class="item-sub">402 sold · $389 each</div>
                        </div>
                        <span class="fw-600 text-danger">-3%</span>
                    </div>
                    <div class="list-widget-item">
                        <img src="https://i.pravatar.cc/64?img=63" class="avatar" alt="">
                        <div class="flex-grow-1">
                            <div class="item-title">Mechanical Keyboard</div>
                            <div class="item-sub">356 sold · $96 each</div>
                        </div>
                        <span class="fw-600 text-success">+21%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ACTIVITY / TASKS / CALENDAR ===== -->
    <div class="row g-3">
        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Recent Activity</h6>
                </div>
                <div class="card-body">
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-time">10 mins ago</div>
                            <div class="timeline-title">New order #10248 placed</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-time">42 mins ago</div>
                            <div class="timeline-title">Invoice INV-2291 marked as paid</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-time">1 hour ago</div>
                            <div class="timeline-title">Priya Nair updated supplier details</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-time">3 hours ago</div>
                            <div class="timeline-title">Low stock alert triggered for SKU-2291</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-time">Yesterday</div>
                            <div class="timeline-title">Monthly sales report generated</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">Upcoming Tasks</h6>
                    <span class="badge bg-primary rounded-pill">5</span>
                </div>
                <div class="card-body">
                    <div class="list-widget-item">
                        <input type="checkbox" class="form-check-input task-check-input" checked>
                        <div class="flex-grow-1">
                            <div class="item-title">Prepare Q3 investor deck</div>
                            <div class="item-sub">Due today</div>
                        </div>
                    </div>
                    <div class="list-widget-item">
                        <input type="checkbox" class="form-check-input task-check-input">
                        <div class="flex-grow-1">
                            <div class="item-title">Review supplier contracts</div>
                            <div class="item-sub">Due tomorrow</div>
                        </div>
                    </div>
                    <div class="list-widget-item">
                        <input type="checkbox" class="form-check-input task-check-input">
                        <div class="flex-grow-1">
                            <div class="item-title">Approve marketing budget</div>
                            <div class="item-sub">Due in 2 days</div>
                        </div>
                    </div>
                    <div class="list-widget-item">
                        <input type="checkbox" class="form-check-input task-check-input">
                        <div class="flex-grow-1">
                            <div class="item-title">Onboard new employees</div>
                            <div class="item-sub">Due in 3 days</div>
                        </div>
                    </div>
                    <div class="list-widget-item">
                        <input type="checkbox" class="form-check-input task-check-input">
                        <div class="flex-grow-1">
                            <div class="item-title">Restock low-inventory SKUs</div>
                            <div class="item-sub">Due in 4 days</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <div class="card h-100">
                <div class="card-header">
                    <h6 class="card-title">July 2026</h6>
                    <div>
                        <button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-chevron-left"></i></button>
                        <button class="btn btn-sm btn-icon btn-outline-light-custom"><i class="bi bi-chevron-right"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row row-cols-7 g-1 text-center text-xs text-muted mb-1">
                        <div class="col">Su</div>
                        <div class="col">Mo</div>
                        <div class="col">Tu</div>
                        <div class="col">We</div>
                        <div class="col">Th</div>
                        <div class="col">Fr</div>
                        <div class="col">Sa</div>
                    </div>
                    <div class="row row-cols-7 g-1">
                        <div class="col"></div>
                        <div class="col"></div>
                        <div class="col"></div>
                        <div class="col">
                            <div class="mini-calendar-day">1</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">2</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">3</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">4</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">5</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">6</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">7</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">8</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">9</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">10</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">11</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">12</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">13</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day today">14</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day has-event">15</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">16</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">17</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day has-event">18</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">19</div>
                        </div>
                        <div class="col">
                            <div class="mini-calendar-day">20</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</main>
@endsection