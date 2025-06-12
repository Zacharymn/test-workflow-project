// UserList component - displays multiple users in a responsive grid/list
class UserList {
  constructor(containerId, users) {
    this.container = document.getElementById(containerId);
    this.users = users || [];
    this.viewMode = 'grid'; // 'grid' or 'list'
    this.init();
  }

  init() {
    if (!this.container) {
      console.error('UserList: Container element not found');
      return;
    }
    this.render();
  }

  render() {
    const listHtml = this.createListHtml();
    this.container.innerHTML = listHtml;
    this.attachEventListeners();
    this.initializeUserProfiles();
  }

  createListHtml() {
    return `
      <div class="user-list">
        <div class="user-list__header">
          <h2 class="user-list__title">Team Members</h2>
          <div class="user-list__controls">
            <button 
              type="button" 
              class="user-list__view-toggle ${this.viewMode === 'grid' ? 'user-list__view-toggle--active' : ''}" 
              data-view="grid"
              aria-label="Switch to grid view"
            >
              Grid
            </button>
            <button 
              type="button" 
              class="user-list__view-toggle ${this.viewMode === 'list' ? 'user-list__view-toggle--active' : ''}" 
              data-view="list"
              aria-label="Switch to list view"
            >
              List
            </button>
          </div>
        </div>
        
        <div class="user-list__container user-list__container--${this.viewMode}">
          ${this.users.map(user => this.createUserItemHtml(user)).join('')}
        </div>
        
        <div class="user-list__footer">
          <p class="user-list__count">
            Showing ${this.users.length} team member${this.users.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    `;
  }

  createUserItemHtml(user) {
    return `
      <div class="user-list__item" data-user-id="${user.id}">
        <div id="user-profile-${user.id}" class="user-list__profile-container">
          <!-- UserProfile component will be rendered here -->
        </div>
      </div>
    `;
  }

  initializeUserProfiles() {
    this.users.forEach(user => {
      const containerId = `user-profile-${user.id}`;
      new UserProfile(containerId, user);
    });
  }

  attachEventListeners() {
    const viewButtons = this.container.querySelectorAll('.user-list__view-toggle');
    viewButtons.forEach(button => {
      button.addEventListener('click', (event) => this.handleViewToggle(event));
    });
  }

  handleViewToggle(event) {
    const newView = event.target.getAttribute('data-view');
    if (newView !== this.viewMode) {
      this.viewMode = newView;
      this.updateViewMode();
    }
  }

  updateViewMode() {
    const container = this.container.querySelector('.user-list__container');
    container.className = `user-list__container user-list__container--${this.viewMode}`;
    
    // Update button states
    const buttons = this.container.querySelectorAll('.user-list__view-toggle');
    buttons.forEach(button => {
      const view = button.getAttribute('data-view');
      button.classList.toggle('user-list__view-toggle--active', view === this.viewMode);
    });
  }

  addUser(userData) {
    this.users.push(userData);
    this.render();
  }

  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
    this.render();
  }

  updateUserList(newUsers) {
    this.users = newUsers;
    this.render();
  }
}

// Utility function to create a user list instance
function createUserList(containerId, users) {
  return new UserList(containerId, users);
}