let allInterests = [];
let currPresentationInterests = [];
let currentPresentationTitle = "";
let presentationTitleUpdateButton;

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
    currentPresentationTitle = getQueryParameter("key");
    loadInterests();
    loadCurrentPresentation();
    getPresentationInterests();
});

function loadInterests() {
    getData('../../server/controller/interests.php')
        .then(async response => {
            allInterests = response['allInterests'];
            displayInterests(allInterests);
        })
        .catch(err => console.log(err));
}

function getPresentationInterests() {
    if (!currentPresentationTitle) {
        return;
    }

    fetch(`../../server/controller/get_interests_per_presentation.php?presentation=${currentPresentationTitle}`)
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                currPresentationInterests = data.interests;
            }
        })
        .catch(error => console.log(error));
}

window.addEventListener("load", () => {
    let presentationTitle = document.getElementById('presentation-title');
    let presentationTitleUpdateButton = document.getElementById('update-title-btn');

    presentationTitle?.addEventListener("input", () => {
        presentationTitleUpdateButton.disabled = !presentationTitle.value.trim();
    });
});

function loadCurrentPresentation() {
    let presentationTitleField = document.getElementById('presentation-title-field');

    let presentationTitle = document.getElementById('presentation-title');
    presentationTitle.classList.add("presentation-title");
    presentationTitle.placeholder = currentPresentationTitle;

    presentationTitleField.appendChild(presentationTitle);

    let inputValue = presentationTitle.value.trim();

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

            if (currPresentationInterests.length > 0 && currPresentationInterests.includes(currInterest)) {
                const removeButton = document.createElement('button');
                removeButton.classList.add('update-button');
                removeButton.style.backgroundColor = "#dc3545";
                removeButton.textContent = "Премахни";
                removeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    deletePresentationInterest(currInterest);
                });
                innerContainer.appendChild(removeButton);
            } else {
                const addButton = document.createElement('button');
                addButton.classList.add("update-button");
                addButton.textContent = "Избери";
                addButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    addPresentationInterest(currInterest);
                });
                innerContainer.appendChild(addButton);
            }

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

function addPresentationInterest(interest) {
    if (!currentPresentationTitle) {
        return;
    }
    
    let requestData = {
        presentation: currentPresentationTitle,
        interest: interest
    };

    sendData('../../server/controller/add_presentation_interest.php', requestData)
        .then(response => {
            location.href = `./presentations-update.php?key=${currentPresentationTitle}`;
        })
        .catch(err => {
            console.log(err);
        });
}

function deletePresentationInterest(interest) {
    if (!currentPresentationTitle) {
        return;
    }
    
    let requestData = {
        presentation: currentPresentationTitle,
        interest: interest
    };

    sendData('../../server/controller/delete_presentation_interest.php', requestData)
        .then(response => {
            location.href = `./presentations-update.php?key=${currentPresentationTitle}`;
        })
        .catch(err => {
            console.log(err);
        });
}
