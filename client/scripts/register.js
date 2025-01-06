const form = document.getElementById('register-form');
const registerBtn = document.getElementById('sign-in-btn');

form.onsubmit = (e) => {
  e.preventDefault();
}

registerBtn.onclick = () => {
  let firstName = document.getElementById('first-name').value;
  let lastName = document.getElementById('last-name').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('repeat-password').value;

  
  let user = { firstName, lastName, username, password, confirmPassword };

  
  sendData('../../server/controller/register.php', user)
  .then(response => {
    load(response);
    location.href = './index.php';
  })
  .catch(err => {
    showErrors(err);
  });
}

function load(response) {
  let errors = document.getElementById('errors');
  errors.innerHTML = '';
  errors.style.display = 'none';
}

function handleError(error) {
  let errors = document.getElementById('errors');

  errors.style.display = 'block';
  errors.style.color = 'red';

  errors.innerHTML = error['message'];
}

function showErrors(errors) {
  console.log(errors);
  handleError(errors);
  setTimeout(() => {
    let errors = document.getElementById('errors');
    errors.style.display='none';
  }, 4000);
}
