// Existing elements
const profilePic = document.getElementById('profilePic');
const profilePicUpload = document.getElementById('profilePicUpload');
const profileForm = document.getElementById('profileForm');
const saveButton = document.getElementById('saveButton'); // Get save button

// New Modal Elements
const authModal = document.getElementById('authModal');
const modalOverlay = document.getElementById('modalOverlay');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const modalMessage = document.getElementById('modalMessage');

// --- Modal Functions ---

function openModal() {
    modalMessage.textContent = ''; // Clear previous messages
    modalMessage.className = 'modal-message'; // Reset message class
    usernameInput.value = ''; // Clear fields
    passwordInput.value = '';
    authModal.classList.add('modal-active');
    modalOverlay.classList.add('modal-active');
    document.body.classList.add('modal-open'); // Add class to body for background blur/disable
}

function closeModal() {
    authModal.classList.remove('modal-active');
    modalOverlay.classList.remove('modal-active');
    document.body.classList.remove('modal-open');
}

function showModalMessage(message, isSuccess = false) {
    modalMessage.textContent = message;
    modalMessage.className = isSuccess ? 'modal-message success' : 'modal-message error';
}

// --- Authentication Simulation (INSECURE DEMO) ---

function handleSignup() {
    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (!user || !pass) {
        showModalMessage('Please enter both username and password.');
        return;
    }

    // *** EXTREMELY INSECURE - FOR DEMO ONLY ***
    // In a real app, send this to a secure backend server for hashing and storage.
    localStorage.setItem('demoUser', user);
    localStorage.setItem('demoPass', pass); // Storing plain text password is very bad!

    showModalMessage('Signup successful! You can now log in.', true);
}

function handleLogin() {
    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (!user || !pass) {
        showModalMessage('Please enter both username and password.');
        return;
    }

    // *** EXTREMELY INSECURE - FOR DEMO ONLY ***
    // Retrieve the (insecurely) stored credentials
    const storedUser = localStorage.getItem('demoUser');
    const storedPass = localStorage.getItem('demoPass');

    if (user === storedUser && pass === storedPass) {
        showModalMessage('Login successful!', true);
        localStorage.setItem('isLoggedIn', 'true'); // Set login flag
        setTimeout(() => { // Give user time to see success message
             closeModal();
             enableProfileEditing();
             loadProfileData(); // Load data after successful login
        }, 1000); // 1 second delay
    } else {
        showModalMessage('Invalid username or password.');
    }
}

// --- Profile Form Enabling/Disabling ---

function enableProfileEditing() {
    const formElements = profileForm.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }
    profilePic.style.pointerEvents = 'auto'; // Enable profile pic click
    profilePic.style.opacity = '1';
    profilePicUpload.disabled = false;
    saveButton.disabled = false; // Enable save button
}

function disableProfileEditing() {
     const formElements = profileForm.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }
     profilePic.style.pointerEvents = 'none'; // Disable profile pic click
     profilePic.style.opacity = '0.6';
     profilePicUpload.disabled = true;
     saveButton.disabled = true; // Disable save button
}


// --- Existing Profile Functions ---

profilePic.addEventListener('click', () => {
    // Only trigger upload if not disabled
    if (!profilePicUpload.disabled) {
         profilePicUpload.click();
    }
});

profilePicUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
            // Optionally save picture immediately after selection if desired
             // localStorage.setItem('profilePicture', e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

function saveProfile() {
    // Check if logged in before saving (optional, but good practice)
     if (localStorage.getItem('isLoggedIn') !== 'true') {
         alert("Please log in to save your profile.");
         openModal(); // Re-open modal if somehow they got here without login
         return;
     }

    // Get form data
    const fullName = document.getElementById('fullName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const address = document.getElementById('address').value;
    const pronouns = document.getElementById('pronouns').value;
    const gender = document.getElementById('gender').value;
    const fatherName = document.getElementById('fatherName').value;
    const motherName = document.getElementById('motherName').value;
    const education = document.getElementById('education').value;
    const collegeSchool = document.getElementById('collegeSchool').value;
    const skills = document.getElementById('skills').value;
    const about = document.getElementById('about').value;
    const profilePicture = profilePic.src; // Get current picture source
    const resumeFile = document.getElementById('resume').files[0]; // Get the resume file

    // Store in Local Storage
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('dateOfBirth', dateOfBirth);
    localStorage.setItem('address', address);
    localStorage.setItem('pronouns', pronouns);
    localStorage.setItem('gender', gender);
    localStorage.setItem('fatherName', fatherName);
    localStorage.setItem('motherName', motherName);
    localStorage.setItem('education', education);
    localStorage.setItem('collegeSchool', collegeSchool);
    localStorage.setItem('skills', skills);
    localStorage.setItem('about', about);
    // Only update profile pic in storage if it's not the default one OR if it's a data URL
    if (profilePicture && !profilePicture.endsWith('default_profile.png')) {
         localStorage.setItem('profilePicture', profilePicture);
    }


    alert('Profile saved! Resume not actually saved locally.'); //Informative alert

    // *IMPORTANT Reminder: Resume file upload requires a server.*
}


//Load Profile Data function (separated for clarity)
function loadProfileData() {
     // Check if data exists (can use any field, fullName is fine)
    if(localStorage.getItem('fullName')){
        document.getElementById('fullName').value = localStorage.getItem('fullName');
        document.getElementById('dateOfBirth').value = localStorage.getItem('dateOfBirth');
        document.getElementById('address').value = localStorage.getItem('address');
        document.getElementById('pronouns').value = localStorage.getItem('pronouns');
        document.getElementById('gender').value = localStorage.getItem('gender');
        document.getElementById('fatherName').value = localStorage.getItem('fatherName');
        document.getElementById('motherName').value = localStorage.getItem('motherName');
        document.getElementById('education').value = localStorage.getItem('education');
        document.getElementById('collegeSchool').value = localStorage.getItem('collegeSchool');
        document.getElementById('skills').value = localStorage.getItem('skills');
        document.getElementById('about').value = localStorage.getItem('about');
        // Load profile picture, fall back to default if not set or invalid
        const storedPic = localStorage.getItem('profilePicture');
        profilePic.src = storedPic && storedPic !== 'null' ? storedPic : "default_profile.png";
    } else {
         // Optional: Set profile pic to default if no data is loaded at all
         profilePic.src = "default_profile.png";
    }
}

// --- Initial Page Load Logic ---
window.onload = function() {
    // Check if user is already logged in (using our flag)
    if (localStorage.getItem('isLoggedIn') === 'true') {
        enableProfileEditing();
        loadProfileData(); // Load data if logged in
    } else {
        disableProfileEditing(); // Ensure form is disabled initially
        openModal(); // Show login modal if not logged in
    }
};