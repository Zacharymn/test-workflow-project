// UserProfile component - creates and manages user profile display
class UserProfile {
  constructor(containerId, userData) {
    this.container = document.getElementById(containerId);
    this.userData = userData;
    this.init();
  }

  init() {
    if (!this.container) {
      console.error('UserProfile: Container element not found');
      return;
    }
    this.render();
  }

  render() {
    const profileHtml = this.createProfileHtml();
    this.container.innerHTML = profileHtml;
    this.attachEventListeners();
  }

  createProfileHtml() {
    const { name, email, role, avatar } = this.userData;
    
    return `
      <div class="user-profile">
        <div class="user-profile__avatar-container">
          <img 
            class="user-profile__avatar" 
            src="${avatar}" 
            alt="Profile picture for ${name}"
          />
        </div>
        
        <div class="user-profile__info">
          <h2 class="user-profile__name">${this.sanitizeText(name)}</h2>
          <p class="user-profile__role">${this.sanitizeText(role)}</p>
          <a 
            class="user-profile__email" 
            href="mailto:${email}"
            aria-label="Send email to ${name}"
          >
            ${this.sanitizeText(email)}
          </a>
        </div>
        
        <div class="user-profile__actions">
          <button 
            class="user-profile__button user-profile__button--primary"
            type="button"
            data-action="contact"
            data-email="${email}"
          >
            Contact
          </button>
          <button 
            class="user-profile__button user-profile__button--secondary"
            type="button"
            data-action="view-profile"
            data-user-id="${this.userData.id}"
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
    // Add button event listeners
    const buttons = this.container.querySelectorAll('.user-profile__button');
    buttons.forEach(button => {
      button.addEventListener('focus', this.handleButtonFocus);
      button.addEventListener('blur', this.handleButtonBlur);
      button.addEventListener('click', (event) => this.handleButtonClick(event));
    });
  }

  handleButtonClick(event) {
    const button = event.target;
    const action = button.getAttribute('data-action');
    
    if (action === 'contact') {
      const email = button.getAttribute('data-email');
      this.handleContactClick(email);
    } else if (action === 'view-profile') {
      const userId = button.getAttribute('data-user-id');
      this.handleViewProfileClick(userId);
    }
  }

  handleButtonFocus(event) {
    event.target.classList.add('user-profile__button--focused');
  }

  handleButtonBlur(event) {
    event.target.classList.remove('user-profile__button--focused');
  }

  handleContactClick(email) {
    window.location.href = `mailto:${email}`;
  }

  handleViewProfileClick(userId) {
    console.log(`Viewing profile for user ID: ${userId}`);
    // In a real app, this would navigate to user detail page
    alert(`View profile functionality would navigate to user ${userId} details`);
  }

  updateUserData(newUserData) {
    this.userData = newUserData;
    this.render();
  }
}

// Utility function to create a user profile instance
function createUserProfile(containerId, userData) {
  return new UserProfile(containerId, userData);
}
