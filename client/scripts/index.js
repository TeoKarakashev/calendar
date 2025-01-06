function loadSession() {
    getData('../../server/controller/index.php')
    .then(response => {
      window.localStorage.setItem('username', response.user);
      setAuthorizedUserNavButtons();
     // setAuthorizedHomePage(response.user);
    })
    .catch(err => {
      if (err) {
        setUnathorizedUserButtons();
        setUnauthorizedHome();
      }
    });
  }
  
  function setAuthorizedUserNavButtons() {
    let signInBtn = document.getElementById('sign-in-btn');
    let signUpBtn = document.getElementById('sign-up-btn');
    let myProfileBtn = document.getElementById('my-profile-btn');
    let interestsBtn = document.getElementById('interests-btn');
    let logoutBtn = document.getElementById('logout-btn');
    let presentationBtn = document.getElementById('presentation-btn');
  
    signInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    signInBtn.parentElement.style.margin = 0;
    signUpBtn.parentElement.style.margin = 0;
    myProfileBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'inline-block';
    interestsBtn.style.display = 'inline-block';
    presentationBtn.style.display = 'inline-block';
  }
  
  function setUnathorizedUserButtons() {
    let signInBtn = document.getElementById('sign-in-btn');
    let signUpBtn = document.getElementById('sign-up-btn');
    let myProfileBtn = document.getElementById('my-profile-btn');
    let interestsBtn = document.getElementById('interests-btn');
    let logoutBtn = document.getElementById('logout-btn');
    let presentationBtn = document.getElementById('presentation-btn');
  
    signInBtn.style.display = 'inline-block';
    signUpBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    myProfileBtn.style.display = 'none';
    interestsBtn.style.display = 'none';
    presentationBtn.style.display = 'none';
  }
  
  function setUnauthorizedHome() {
    const content = document.getElementById('content');
  
    content.innerHTML = ` <h1>Welcome to Calendar</h1>`;
  }