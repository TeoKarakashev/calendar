document.addEventListener('DOMContentLoaded', async () => {
let username = localStorage.getItem('username');
const logoutBtn = document.getElementById('logout-btn');
const interestsBtn = document.getElementById('interests-btn');
const myProfileBtn = document.getElementById('my-profile-btn');
const presentationBtn = document.getElementById('presentation-btn');
const loginBtn = document.getElementById('sign-up-btn');
const registerBtn = document.getElementById('sign-in-btn');

if (username) {
  logoutBtn.style.display = 'inline-block';
  interestsBtn.style.display = 'inline-block';
  myProfileBtn.style.display = 'inline-block';
  presentationBtn.style.display = 'inline-block';
  loginBtn.style.display = 'none';
  registerBtn.style.display = 'none';
} else {
  logoutBtn.style.display = 'none';
  interestsBtn.style.display = 'none';
  myProfileBtn.style.display = 'none';
  presentationBtn.style.display = 'none';
  loginBtn.style.display = 'inline-block';
  registerBtn.style.display = 'inline-block';
}
})