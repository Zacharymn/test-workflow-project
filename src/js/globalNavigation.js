// Global navigation functions available across all pages
window.globalNavigation = {
  showUserList: function() {
    // Check if we're on the main page with the showUserList function
    if (typeof window.showUserList === 'function') {
      window.showUserList();
    } else {
      // If on another page, navigate to index.html with user list view
      window.location.href = 'index.html#users';
    }
  },

  navigateToHome: function() {
    window.location.href = 'index.html';
  },

  navigateToAbout: function() {
    window.location.href = 'about-us.html';
  }
};

// Make showUserList globally available for navigation
window.showUserListGlobal = window.globalNavigation.showUserList;