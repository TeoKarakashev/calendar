function loadSessionMyProfile() {
  
  getData('../../server/controller/load-user.php')
      .then(response => {
          let firstName = document.getElementById('first-name');
          let lastName = document.getElementById('last-name');
          let username = document.getElementById('username');
          let interests = document.getElementById('interests');
          let presentation = document.getElementById('presentation');

          firstName.textContent = `First Name: ${response['firstName']}`;
          lastName.textContent = `Last Name: ${response['lastName']}`;
          username.textContent = `Username: ${response['username']}`;
          presentation.textContent = `Presentation: ${response['presentation']}`;

          if (Array.isArray(response['interests'])) {
              interests.textContent = `Interests: ${response['interests'].join(', ')}`;
          } else {
              interests.textContent = `Interests: ${response['interests']}`;
          }
      })
      .catch(err => {
          console.log(err);
      });
}
