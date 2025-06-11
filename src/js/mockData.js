// Mock user data for testing the user profile component
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
