// Get elements
const profileManagementBtn = document.getElementById('profileManagementBtn');
const profileDropdown = document.getElementById('profileDropdown');
const uploadMediaBtn = document.getElementById('uploadMediaBtn');

// Toggle Profile Dropdown
profileManagementBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent click from propagating to the document
  profileDropdown.classList.toggle('hidden');
});



// Upload Media Button Action (Example)
uploadMediaBtn.addEventListener('click', () => {
  alert('Upload Media functionality coming soon!');
});