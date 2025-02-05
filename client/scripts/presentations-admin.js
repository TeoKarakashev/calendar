let searchField = document.getElementById('search-field');
let allPresentationsData = [];
let filteredPresentations = [];
let presentationInterests = [];
let recommendedPresentations = [];
let events = [];

window.addEventListener('DOMContentLoaded', loadPresentations());
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-field').addEventListener('input', () => {
        let searchField = document.getElementById('search-field');
        const query = searchField.value.trim();
        if (query) {
            filteredPresentations = allPresentationsData.filter(presentation =>
                presentation.title.toLowerCase().includes(query.toLowerCase())
            );
            displayPresentations(filteredPresentations);
        } else {
            displayPresentations(allPresentationsData);
        }
    });
});

function loadPresentations() {
    getData('../../server/controller/presentation.php')
        .then(async response => {
            presentationInterests = (await getData('../../server/controller/get_presentationInterests.php')).data;
            events = (await getData('../../server/controller/get_events.php')).data;
            recommendedPresentations = response['recommended'];

            let presentationDiv = document.getElementById('presentations');

            allPresentationsData = response['all'];
            displayPresentations(allPresentationsData);
        })
        .catch(err => {
            console.log(err);
        });

}

function displayPresentations(presentationsData) {
    let presentationDiv = document.getElementById('presentations');

    presentationDiv.innerHTML = '';
    presentationDiv.className = '';

    if (presentationsData.length > 0) {
        presentationsData.forEach(presentation => {
            const details = document.createElement('div');
            details.classList.add("presentation");

            const name = document.createElement('div');
            name.textContent = `${presentation.title}`;
            name.classList.add("name");
            details.appendChild(name);

            const currPresentationInterests = presentationInterests
                .filter(presentationInterest => presentationInterest.title === presentation.title)
                .map(presentationInterest => presentationInterest.interest);

            const interests = document.createElement('div');
            interests.textContent = `${currPresentationInterests.join(', ')}`;
            interests.classList.add('interests');
            details.appendChild(interests);

            const editButton = document.createElement('button');
            editButton.classList.add("edit-button");
            editButton.textContent = "Редактирай";
            editButton.addEventListener('click', (e) => {
                e.preventDefault();
                updatePresentation(presentation.title);
            });
            details.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Изтрий";
            deleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                deletePresentation(presentation.title);
            });
            details.appendChild(deleteButton);

            presentationDiv.appendChild(details);
        });
    }
}

async function updatePresentation(selectedPresentation) {
    window.location.href = `presentations-update.php?key=${selectedPresentation}`;
}

async function deletePresentation(selectedPresentation) {
    await sendData('../../server/controller/delete_presentation.php',
        {
            presentation: selectedPresentation
        })
        .catch(err => console.log(err));
        location.reload();
}
