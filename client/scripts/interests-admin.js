let searchField = document.getElementById('search-field');
let allInterests = [];
let filteredInterests = [];

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

            interestsContainer.appendChild(innerContainer);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("create-button").addEventListener("click", function() {
        window.location.href =  'interests-create.php';
    });
});
