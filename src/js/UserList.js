// UserList component - displays multiple users in a responsive grid/list
class UserList {
  constructor(containerId, users) {
    this.container = document.getElementById(containerId);
    this.users = users || [];
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
        </div>
        
        <div class="user-list__container">
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
    const { id, name, email, role, avatar } = user;
    
    return `
      <div class="user-list__item" data-user-id="${id}">
        <div class="user-list__avatar">
          <img 
            src="${avatar}" 
            alt="Profile picture for ${name}"
            class="user-list__avatar-img"
          />
        </div>
        
        <div class="user-list__info">
          <h3 class="user-list__name">${this.sanitizeText(name)}</h3>
          <p class="user-list__role">${this.sanitizeText(role)}</p>
          <a 
            href="mailto:${email}"
            class="user-list__email"
            aria-label="Send email to ${name}"
          >
            ${this.sanitizeText(email)}
          </a>
        </div>
        
        <div class="user-list__actions">
          <button 
            type="button"
            class="user-list__button user-list__button--primary"
            onclick="window.location.href='mailto:${email}'"
            aria-label="Contact ${name}"
          >
            Contact
          </button>
          <button 
            type="button"
            class="user-list__button user-list__button--secondary"
            onclick="alert('View profile functionality for ${name}')"
            aria-label="View ${name}'s profile"
          >
            View Profile
          </button>
        </div>
      </div>
    `;
  }

  sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  attachEventListeners() {
    // No view toggle listeners needed - simplified to list-only format
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