function createAdmin() {
    fetch('../../server/controller/create_admin.php', {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
        }
    })
    .catch(err => {
        console.error("Error:", err);
    });
}
