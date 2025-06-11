// About Us page functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeTeamSection();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeLazyLoading();
});

function initializeNavigation() {
  const navigationContainer = document.getElementById('navigation-container');
  if (navigationContainer) {
    new Navigation('navigation-container', 'about');
  }
}

function initializeTeamSection() {
  const teamData = [
    {
      name: 'Alex Chen',
      role: 'Chief Executive Officer',
      bio: 'Visionary leader with 15+ years in enterprise software. Passionate about building tools that genuinely improve how teams work together.',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'alex.chen@testworkflow.com'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Head of Engineering',
      bio: 'Full-stack architect who believes in simple, elegant solutions. Leads our technical vision with focus on scalability and user experience.',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'sarah.rodriguez@testworkflow.com'
    },
    {
      name: 'Marcus Johnson',
      role: 'Senior Product Designer',
      bio: 'UX expert dedicated to creating intuitive interfaces. Champions accessibility and inclusive design in every product decision.',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      email: 'marcus.johnson@testworkflow.com'
    },
    {
      name: 'Emma Thompson',
      role: 'Customer Success Manager',
      bio: 'Bridge between users and product development. Ensures customer feedback drives meaningful improvements and feature development.',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      email: 'emma.thompson@testworkflow.com'
    }
  ];

  const teamGrid = document.getElementById('team-grid');
  if (teamGrid) {
    teamGrid.innerHTML = teamData.map(member => createTeamMemberCard(member)).join('');
  }
}

function createTeamMemberCard(member) {
  return `
    <div class="team-member">
      <div class="team-member-image-container">
        <img 
          src="${member.imageUrl}" 
          alt="Portrait of ${member.name}, ${member.role}"
          class="team-member-image"
          loading="lazy"
        >
      </div>
      <div class="team-member-content">
        <h3 class="team-member-name">${member.name}</h3>
        <p class="team-member-role">${member.role}</p>
        <p class="team-member-bio">${member.bio}</p>
        <a href="mailto:${member.email}" class="team-member-contact">
          Contact ${member.name.split(' ')[0]}
        </a>
      </div>
    </div>
  `;
}

function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', handleContactFormSubmission);

  // Real-time validation
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', () => validateFormField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function handleContactFormSubmission(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const formFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  // Validate all fields
  const isValid = validateContactForm(formFields);
  
  if (isValid) {
    // Simulate form submission
    showFormSuccessMessage();
    event.target.reset();
  }
}

function validateContactForm(fields) {
  let isValid = true;

  // Validate name
  if (!fields.name || fields.name.trim().length < 2) {
    showFieldError('contact-name', 'name-error', 'Please enter a valid name (at least 2 characters)');
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email || !emailRegex.test(fields.email)) {
    showFieldError('contact-email', 'email-error', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate message
  if (!fields.message || fields.message.trim().length < 10) {
    showFieldError('contact-message', 'message-error', 'Please enter a message (at least 10 characters)');
    isValid = false;
  }

  return isValid;
}

function validateFormField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();

  switch (fieldName) {
    case 'name':
      if (fieldValue.length > 0 && fieldValue.length < 2) {
        showFieldError(field.id, `${fieldName}-error`, 'Name must be at least 2 characters');
        return false;
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (fieldValue.length > 0 && !emailRegex.test(fieldValue)) {
        showFieldError(field.id, `${fieldName}-error`, 'Please enter a valid email address');
        return false;
      }
      break;
    case 'message':
      if (fieldValue.length > 0 && fieldValue.length < 10) {
        showFieldError(field.id, `${fieldName}-error`, 'Message must be at least 10 characters');
        return false;
      }
      break;
  }

  clearFieldError(field);
  return true;
}

function showFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(errorId);
  
  if (field && errorElement) {
    field.classList.add('form-input--error');
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearFieldError(field) {
  const errorElement = document.getElementById(`${field.name}-error`);
  
  field.classList.remove('form-input--error');
  field.setAttribute('aria-invalid', 'false');
  
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

function showFormSuccessMessage() {
  const submitButton = document.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Message Sent Successfully!';
  submitButton.style.backgroundColor = '#27ae60';
  submitButton.disabled = true;
  
  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.style.backgroundColor = '';
    submitButton.disabled = false;
  }, 3000);
}

function initializeSmoothScrolling() {
  // Add smooth scrolling for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initializeLazyLoading() {
  // Enhanced lazy loading for team member images
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.addEventListener('load', () => {
            image.classList.add('image-loaded');
          });
          observer.unobserve(image);
        }
      });
    });

    images.forEach(image => imageObserver.observe(image));
  }
}

// Utility function for responsive behavior
function handleResponsiveChanges() {
  const isMobile = window.innerWidth <= 768;
  
  // Adjust timeline layout for mobile
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    if (isMobile) {
      item.classList.add('timeline-item--mobile');
    } else {
      item.classList.remove('timeline-item--mobile');
    }
  });
}

// Initialize responsive behavior
window.addEventListener('resize', handleResponsiveChanges);
window.addEventListener('load', handleResponsiveChanges);