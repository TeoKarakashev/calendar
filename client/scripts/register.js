const form = document.getElementById('register-form');
const registerBtn = document.getElementById('register-button');

form.onsubmit = (e) => {
  e.preventDefault();
}

registerBtn.addEventListener('click', () => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeat-password").value;

  const firstNameError = document.getElementById("first-name-error");
  const lastNameError = document.getElementById("last-name-error");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const repeatPasswordError = document.getElementById("repeat-password-error");

  let isValid = true;

  if (!firstName.trim()) {
    firstNameError.style.display = "block";
    isValid = false;
  } else {
    firstNameError.style.display = "none";
  }

  if (!lastName.trim()) {
    lastNameError.style.display = "block";
    isValid = false;
  } else {
    lastNameError.style.display = "none";
  }

  if (!username.trim()) {
    usernameError.style.display = "block";
    isValid = false;
  } else {
    usernameError.style.display = "none";
  }

  if (!password.trim()) {
    passwordError.style.display = "block";
    isValid = false;
  } else {
    passwordError.style.display = "none";
  }

  if (!repeatPassword.trim() || password.trim() !== repeatPassword.trim()) {
    repeatPasswordError.style.display = "block";
    isValid = false;
  } else {
    repeatPasswordError.style.display = "none";
  }

  let user = { firstName, lastName, username, password, confirmPassword: repeatPassword };

  sendData('../../server/controller/register.php', user)
  .then(async response => {
    load(response);
    const obj = (await getData('../../server/controller/index.php'));
    localStorage.setItem('username', obj.username);
    localStorage.setItem('role', obj.role);
    location.href = './index.php'
    })
  .catch(err => {
    console.log(err);
    //showErrors(err);
  });
});

function load() {
  const firstNameError = document.getElementById("first-name-error");
  const lastNameError = document.getElementById("last-name-error");
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const repeatPasswordError = document.getElementById("repeat-password-error");
  firstNameError.style.display = 'none';
  lastNameError.style.display = 'none';
  usernameError.style.display = 'none';
  passwordError.style.display = 'none';
  repeatPasswordError.style.display = 'none';
}

function handleError(error) {
  let errors = document.getElementById('repeat-password-error');

  errors.style.display = 'block';
  errors.style.color = 'red';

  errors.innerHTML = error && error.message;
}

function showErrors(errors) {
  console.log(errors);
  handleError(errors);
  setTimeout(() => {
    let errors = document.getElementById('errors');
    errors.style.display='none';
  }, 4000);
}
