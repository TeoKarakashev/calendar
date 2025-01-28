let searchField = document.getElementById('search-field');
let allInterests = [];
let filteredInterests = [];
let userInterests = [];

window.addEventListener('DOMContentLoaded', loadInterests());
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-field').addEventListener('input', () => {
        let searchField = document.getElementById('search-field');
        const query = searchField.value.trim();
        if (query) {
            filteredInterests = allInterests.filter(currInterest => 
                currInterest.toLowerCase().includes(query.toLowerCase())
            );
            
            displayInterests(filteredInterests);
        } else {
            displayInterests(allInterests);
        }
    });
});

function loadInterests() {
    getData('../../server/controller/interests.php')
        .then(response => {
            allInterests = response['allInterests'];
            userInterests = response['userInterests'];

            displayInterests(allInterests);
        })
        .catch(err => {
            console.log(err);
        });
}

function displayInterests(interestsData) {
    let interestsContainer = document.getElementById('interest-container');
            
    interestsContainer.innerHTML = '';
    interestsContainer.className = '';

    if(interestsData.length > 0) {
        interestsData.forEach(currInterest => {
            const innerContainer = document.createElement('div');
            innerContainer.classList.add('inner-container');

            const interest = document.createElement('div');
            interest.classList.add('interest');
            interest.textContent = `${currInterest}`;
            innerContainer.appendChild(interest);

            if (userInterests.length > 0 && userInterests.includes(currInterest)) {
                const removeButton = document.createElement('button');
                removeButton.classList.add('update-button');
                removeButton.style.backgroundColor = "#dc3545";
                removeButton.textContent = "Премахни";
                removeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    userInterests = userInterests.filter(interest => interest !== currInterest);
                    updateInterests(userInterests);
                });
                innerContainer.appendChild(removeButton);
            } else {
                const addButton = document.createElement('button');
                addButton.classList.add("update-button");
                addButton.textContent = "Избери";
                addButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    userInterests.push(currInterest);
                    updateInterests(userInterests);
                });
                innerContainer.appendChild(addButton);
            }

            interestsContainer.appendChild(innerContainer);
        });
    }
}

function updateInterests(updatedInterests) {
    const user = {
        username: window.localStorage.getItem('username'),
        interests: updatedInterests
    };

    sendData('../../server/controller/update-interests.php', user)
        .then(response => {
            location.href = './interests.php';
        })
        .catch(err => {
            console.log(err);
        });
}

