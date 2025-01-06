const logout = (e) => {
  e.preventDefault();
    
  getData('../../server/controller/logout.php')
  .then(response => {
    localStorage.clear();
    location.href = './index.php';
  })
  .catch(err => {
    console.log(err);
  });
};