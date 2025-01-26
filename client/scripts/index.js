function loadSession() {
    getData('../../server/controller/index.php')
    .then(response => {
      window.localStorage.setItem('username', response.user);
    })
    .catch(err => {
      const content = document.querySelector('#content');
      content.innerHTML = '';
    });
  }
  