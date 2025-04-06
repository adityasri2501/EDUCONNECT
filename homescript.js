document.addEventListener('DOMContentLoaded', function () {
  const profileButton = document.getElementById('profile-button');
  const chatbotButton = document.getElementById('chatbot-button');
  const connectionsButton = document.getElementById('connections-button');
  const historyButton = document.getElementById('history-button');
  const homeButton = document.getElementById('home-button');
  const gameButton = document.getElementById('game-button');
  const profilePage = document.getElementById('profile-page');
  const mainContent = document.getElementById('main-content');
  const searchInput = document.getElementById('search-input');
  const profilePictureUpload = document.getElementById('profile-picture-upload');
  const profilePictureDisplay = document.getElementById('profile-picture-display');
  const saveProfileButton = document.getElementById('save-profile-button');
  const profileIcon = document.getElementById('profile-icon');
  const languageSelect = document.getElementById('language-select');

  loadProfileData();

  // Navigation Buttons
  profileButton.addEventListener('click', function (event) {
    event.preventDefault();
    mainContent.style.display = 'none';
    profilePage.style.display = 'block';
  });

  homeButton.addEventListener('click', function () {
    profilePage.style.display = 'none';
    mainContent.style.display = 'block';
  });

  connectionsButton?.addEventListener('click', function () {
    window.location.href = 'connect.html';
  });

  historyButton.addEventListener('click', function () {
    window.location.href = 'history.html';
  });

  gameButton.addEventListener('click', function () {
    window.location.href = 'game.html';
  });

  // ✅ Chatbot redirect instead of popup
  chatbotButton.addEventListener('click', function () {
    window.location.href = 'index.html'; // go to chatbot page
  });

  // Search functionality
  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const searchQuery = searchInput.value;
      console.log('Searching for:', searchQuery);
    }
  });

  // Profile Picture Upload
  profilePictureUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePictureDisplay.src = e.target.result;
        profileIcon.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Save Profile
  saveProfileButton.addEventListener('click', function () {
    saveProfileData();
    alert('Profile saved!');
    profilePage.style.display = 'none';
    mainContent.style.display = 'block';
  });

  // Language Selection
  languageSelect.addEventListener('change', function () {
    const selectedLanguage = languageSelect.value;
    console.log('Selected language:', selectedLanguage);
  });

  // Utility Functions
  function saveProfileData() {
    const fullName = document.getElementById('full-name').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const dob = document.getElementById('date-of-birth').value;
    const address = document.getElementById('address').value;
    const resume = document.getElementById('resume').value;
    const contactDetails = document.getElementById('contact-details').value;
    const profilePicture = profilePictureDisplay.src;

    localStorage.setItem('fullName', fullName);
    localStorage.setItem('education', education);
    localStorage.setItem('skills', skills);
    localStorage.setItem('dob', dob);
    localStorage.setItem('address', address);
    localStorage.setItem('resume', resume);
    localStorage.setItem('contactDetails', contactDetails);
    localStorage.setItem('profilePicture', profilePicture);
  }

  function loadProfileData() {
    const savedFullName = localStorage.getItem('fullName');
    const savedEducation = localStorage.getItem('education');
    const savedSkills = localStorage.getItem('skills');
    const savedDob = localStorage.getItem('dob');
    const savedAddress = localStorage.getItem('address');
    const savedResume = localStorage.getItem('resume');
    const savedContactDetails = localStorage.getItem('contactDetails');
    const savedProfilePicture = localStorage.getItem('profilePicture');

    if (savedFullName) document.getElementById('full-name').value = savedFullName;
    if (savedEducation) document.getElementById('education').value = savedEducation;
    if (savedSkills) document.getElementById('skills').value = savedSkills;
    if (savedDob) document.getElementById('date-of-birth').value = savedDob;
    if (savedAddress) document.getElementById('address').value = savedAddress;
    if (savedResume) document.getElementById('resume').value = savedResume;
    if (savedContactDetails) document.getElementById('contact-details').value = savedContactDetails;
    if (savedProfilePicture) {
      profilePictureDisplay.src = savedProfilePicture;
      profileIcon.src = savedProfilePicture;
    }
  }
});

const profileButton = document.getElementById("profile-button");
const profileContainer = document.getElementById("profile-container");
const mainContent = document.getElementById("main-content");

profileButton.addEventListener("click", () => {
    const isVisible = profileContainer.style.display === "block";
    profileContainer.style.display = isVisible ? "none" : "block";
    mainContent.style.display = isVisible ? "block" : "none";
});
