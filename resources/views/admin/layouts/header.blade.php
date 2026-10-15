<nav class="app-navbar">
    <div class="navbar-left">
        <button class="navbar-toggler-custom d-lg-none" id="sidebarMobileToggle" type="button" aria-label="Open menu">
            <i class="bi bi-list"></i>
        </button>
        <div class="navbar-search">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control" placeholder="Search anything... (Ctrl+K)" data-bs-toggle="modal" data-bs-target="#searchOverlayModal" readonly>
        </div>
    </div>

    <div class="navbar-right">
        <!-- Fullscreen -->
        <button class="navbar-icon-btn d-none d-md-flex" id="fullscreenToggleBtn" type="button" data-bs-toggle="tooltip" title="Fullscreen">
            <i class="bi bi-arrows-fullscreen"></i>
        </button>

        <!-- Theme switcher -->
        <button class="navbar-icon-btn" id="themeToggleBtn" type="button" data-bs-toggle="tooltip" title="Toggle theme">
            <i class="bi bi-moon-stars"></i>
        </button>

        <!-- User profile dropdown -->
        <div class="dropdown">
            <button class="navbar-user-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="position-relative">
                    <img src="https://i.pravatar.cc/72?img=68" class="avatar" alt="User avatar">
                    <span class="status-dot"></span>
                </div>
                <div class="user-meta d-none d-sm-block">
                    <div class="user-name">{{auth()->user()->name}}</div>
                    <div class="user-role">Administrator</div>
                </div>
                <i class="bi bi-chevron-down text-muted text-xs d-none d-sm-inline"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="{{route('profile.edit')}}"><i class="bi bi-person me-2"></i>My Profile</a></li>
                <li><a class="dropdown-item text-danger" href="{{route('logout')}}"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
            </ul>
        </div>
    </div>
</nav>