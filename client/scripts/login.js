const form = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

form.onsubmit = (e) => {
  e.preventDefault();
}

loginBtn.onclick = () => {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

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

  let user = {
    username,
    password
  };

  function showErrors(errorMessage) {
    var errors = document.getElementById('password-error');
    errors.style.display = 'block';
    errors.style.color = 'red';
    errors.innerHTML = errorMessage;
  }

  function load() {
    var errors = document.getElementById('password-error');
    errors.innerHTML = '';
    errors.style.display = 'none';
  }

  sendData('../../server/controller/login.php', user)
    .then(async response => {
      load(response);
      const username = (await getData('../../server/controller/index.php')).user;
      localStorage.setItem('username', username);
      location.href = './index.php';
    })
    .catch(err => {
      if (err) {
        console.log(err);
        showErrors(err.message);
      }
    });
}