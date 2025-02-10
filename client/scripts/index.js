function loadSession() {
    getData('../../server/controller/index.php')
    .then(response => {
      window.localStorage.setItem('username', response.user);

      window.localStorage.setItem('role', response.role);
      if(window.localStorage.getItem('role') === null){
          setTimeout(() => {
            loadSession();
          }, 100);  
      }
     
    })
    .catch(err => {
      const content = document.querySelector('#content');
      content.innerHTML = '';
    });
  }
  