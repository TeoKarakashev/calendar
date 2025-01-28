function loadSessionMyProfile() {
    getData('../../server/controller/load-user.php')
        .then(response => {
            let name = document.getElementById('name');
            let username = document.getElementById('username');
            let interests = document.getElementById('interests');
            let presentation = document.getElementById('presentation');

            name.textContent = `${response['firstName']} ${response['lastName']}`;
            username.textContent = `${response['username']}`;
            presentation.textContent = `Избрана презентация: ${response['presentation']}`;

            // Изчистваме съществуващите интереси
            interests.innerHTML = "Интереси:";
            
            if (Array.isArray(response['interests'])) {
                // Създаваме списък
                let ul = document.createElement('ul');
                response['interests'].forEach(interest => {
                    let li = document.createElement('li');
                    li.textContent = `${interest}`;
                    ul.appendChild(li);
                });
                interests.appendChild(ul);
            } else {
                interests.textContent = `Интереси: --> ${response['interests']}`;
            }
        })
        .catch(err => {
            console.log(err);
        });
}
