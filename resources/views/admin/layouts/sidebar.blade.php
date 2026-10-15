<aside class="sidebar">
    <div class="sidebar-brand">
        <div class="brand-logo">N</div>
        <span class="brand-text">Tfxadmin</span>
    </div>

    <div class="sidebar-search">
        <div class="sidebar-search-wrap">
            <i class="bi bi-search"></i>
            <input type="text" id="sidebarSearchInput" class="form-control" placeholder="Search menu...">
        </div>
    </div>

    <div class="sidebar-nav-scroll">
        <div class="nav-section-title">Main</div>
        <ul class="sidebar-nav">

            <li class="nav-item active">
                <a href="index.html" class="sidebar-nav-link active-link">
                    <i class="bi bi-grid-1x2-fill link-icon"></i>
                    <span class="link-text">Dashboard</span>
                </button></form>
            </li>
        </ul>

        <div class="nav-section-title">Account</div>
        <ul class="sidebar-nav">
            <li class="nav-item">
                <a href="{{route('profile.edit')}}" class="sidebar-nav-link">
                    <i class="bi bi-person-circle link-icon"></i>
                    <span class="link-text">Profile</span>
                </a>
            </li>
            <li class="nav-item">
                <form method="POST" action="{{ route('logout') }}">@csrf<button type="submit" class="sidebar-nav-link border-0 bg-transparent w-100 text-start">
                    <i class="bi bi-box-arrow-right link-icon"></i>
                    <span class="link-text">Logout</span>
                </button></form>
            </li>
        </ul>
    </div>

    <div class="sidebar-footer">
        <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" type="button" aria-label="Collapse sidebar">
            <i class="bi bi-layout-sidebar-inset"></i>
        </button>
    </div>
</aside>