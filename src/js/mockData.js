// Mock user data for testing the user profile and list components
const mockUsers = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'Senior Frontend Developer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@company.com', 
    role: 'Security Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Elena Petrov',
    email: 'elena.petrov@company.com',
    role: 'Accessibility Specialist',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    role: 'DevOps Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
  },
  {
    id: 5,
    name: 'Maya Patel',
    email: 'maya.patel@company.com',
    role: 'UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
  },
  {
    id: 6,
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    role: 'Full Stack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg'
  }
];

// Get current user (defaults to first user)
function getCurrentUser() {
  return mockUsers[0];
}

// Get all users
function getAllUsers() {
  return mockUsers;
}

// Get user by ID
function getUserById(id) {
  return mockUsers.find(user => user.id === id);
}

// Get users by role
function getUsersByRole(role) {
  return mockUsers.filter(user => user.role.toLowerCase().includes(role.toLowerCase()));
}
