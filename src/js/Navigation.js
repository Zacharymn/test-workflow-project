class Navigation {
  constructor(containerId, currentPage = '') {
    this.container = document.getElementById(containerId);
    this.currentPage = currentPage;
    this.menuItems = [
      { label: 'Home', href: 'index.html', id: 'home' },
      { label: 'About Us', href: 'about-us.html', id: 'about' }
    ];
    this.render();
    this.attachEventListeners();
  }

  render() {
    const navigationHtml = `
      <nav class="main-navigation" role="navigation" aria-label="Main Navigation">
        <div class="nav-container">
          <div class="nav-brand">
            <h1 class="brand-title">Test Workflow</h1>
          </div>
          <button class="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          <ul class="nav-menu" role="menubar">
            ${this.renderMenuItems()}
          </ul>
        </div>
      </nav>
    `;
    
    this.container.innerHTML = navigationHtml;
  }

  renderMenuItems() {
    return this.menuItems
      .map(item => {
        const isActive = this.currentPage === item.id;
        const activeClass = isActive ? 'nav-item--active' : '';
        const ariaCurrent = isActive ? 'aria-current="page"' : '';
        
        return `
          <li class="nav-item ${activeClass}" role="menuitem">
            <a href="${item.href}" class="nav-link" ${ariaCurrent}>
              ${item.label}
            </a>
          </li>
        `;
      })
      .join('');
  }

  attachEventListeners() {
    const mobileToggle = this.container.querySelector('.mobile-menu-toggle');
    const navMenu = this.container.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        this.toggleMobileMenu(mobileToggle, navMenu);
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!this.container.contains(event.target)) {
          this.closeMobileMenu(mobileToggle, navMenu);
        }
      });

      // Handle escape key to close mobile menu
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          this.closeMobileMenu(mobileToggle, navMenu);
        }
      });
    }
  }

  toggleMobileMenu(toggleButton, menu) {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('nav-menu--open');
    toggleButton.classList.toggle('mobile-menu-toggle--active');
  }

  closeMobileMenu(toggleButton, menu) {
    toggleButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('nav-menu--open');
    toggleButton.classList.remove('mobile-menu-toggle--active');
  }

  updateCurrentPage(pageId) {
    this.currentPage = pageId;
    this.render();
    this.attachEventListeners();
  }
}