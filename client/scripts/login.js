const form = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

form.onsubmit = (e) => {
  e.preventDefault();
}

loginBtn.onclick = () => {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  let user = {
    username,
    password
  };

  function showErrors(errorMessage) {
    var errors = document.getElementById('errors');
    errors.style.display = 'block';
    errors.style.color = 'red';
    errors.innerHTML = errorMessage;
}

  function load(response) {
    var errors = document.getElementById('errors');
    errors.innerHTML = '';
    errors.style.display = 'none';
}

  sendData('../../server/controller/login.php', user)
  .then(response => {
    load(response);
    location.href = './index.php';
  })
  .catch(err => {
    showErrors(err.message);
  });
}