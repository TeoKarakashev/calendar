let allInterests = [];
let userInterests = [];
let currentPresentationTitle;
let presentationTitleUpdateButton;

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.addEventListener('DOMContentLoaded', loadInterests);
function loadInterests() {
    getData('../../server/controller/interests.php')
        .then(response => {
            allInterests = response['allInterests'];

            loadCurrentPresentation();
            displayInterests(allInterests);
        })
        .catch(err => {
            console.log(err);
        });
}

window.addEventListener('load', () => {
    document.getElementById('presentation-title').addEventListener('input', () => {
        let presentationTitle = document.getElementById('presentation-title');
        let presentationTitleUpdateButton = document.getElementById('update-title-btn');

        if(presentationTitle.value === '') {
            presentationTitleUpdateButton.disabled = true;
        }
        else {
            presentationTitleUpdateButton.disabled = false;
        }
        
    });
});

function loadCurrentPresentation() {
    currentPresentationTitle = getQueryParameter('key');

    let presentationTitleField = document.getElementById('presentation-title-field');

    let presentationTitle = document.getElementById('presentation-title');
    presentationTitle.classList.add("presentation-title");
    presentationTitle.placeholder = currentPresentationTitle;

    presentationTitleField.appendChild(presentationTitle);

    let inputValue = presentationTitleField.value;

    presentationTitleUpdateButton = document.getElementById('update-title-btn');
    presentationTitleUpdateButton.textContent = "Редактирай";
    presentationTitleUpdateButton.classList.add("update-title-btn");
    presentationTitleUpdateButton.addEventListener('click', (e) => {
        e.preventDefault();
        updatePresentationTitle(presentationTitle.value);
    });

    if (!inputValue) {
        presentationTitleUpdateButton.setAttribute('disabled', true);
    }

    presentationTitleField.appendChild(presentationTitleUpdateButton);
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

            // if (userInterests.length > 0 && userInterests.includes(currInterest)) {
            //     const removeButton = document.createElement('button');
            //     removeButton.classList.add('update-button');
            //     removeButton.style.backgroundColor = "#dc3545";
            //     removeButton.textContent = "Премахни";
            //     removeButton.addEventListener('click', (e) => {
            //         e.preventDefault();
            //         userInterests = userInterests.filter(interest => interest !== currInterest);
            //         updateInterests(userInterests);
            //     });
            //     innerContainer.appendChild(removeButton);
            // } else {
            //     const addButton = document.createElement('button');
            //     addButton.classList.add("update-button");
            //     addButton.textContent = "Избери";
            //     addButton.addEventListener('click', (e) => {
            //         e.preventDefault();
            //         userInterests.push(currInterest);
            //         updateInterests(userInterests);
            //     });
            //     innerContainer.appendChild(addButton);
            // }

            interestsContainer.appendChild(innerContainer);
        });
    }
}

function updatePresentationTitle(newTitle) {
    newTitle = newTitle.trim();

    if (!newTitle) {
        return;
    }
    let requestData = {
        presentation: currentPresentationTitle,
        title: newTitle
    };

    sendData('../../server/controller/update-presentation-title.php', requestData)
        .then(response => {
            location.href = './presentations-admin.php';
        })
        .catch(err => {
            console.log(err);
        });
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
