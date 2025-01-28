window.addEventListener('DOMContentLoaded', loadPresentations());
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-field').addEventListener('input', () => {
        let searchField = document.getElementById('search-field');
        const query = searchField.value.trim();
        if (query) {
            console.log(query);
            filteredPresentations = allPresentationsData.filter(presentation =>
                presentation.title.toLowerCase().includes(query.toLowerCase())
            );
            console.log(filteredPresentations);
            displayPresentations(filteredPresentations);
        } else {
            displayPresentations(allPresentationsData);
        }
    });
});

let searchField = document.getElementById('search-field');
let allPresentationsData = [];
let filteredPresentations = [];

function loadPresentations() {
    getData('../../server/controller/presentation.php')
        .then(response => {
            let presentationDiv = document.getElementById('presentations'); 
            let current = document.getElementById('current');

            console.log(response['current']);
            current.textContent = `Текуща избрана презентация: ${response['current']}`;

            allPresentationsData = response['all'];
            displayPresentations(allPresentationsData);
        })
        .catch(err => {
            console.log(err);
        });
}

function displayPresentations(presentationsData) {
            //const recommendedPresentationsData = response['recommended'];
            let presentationDiv = document.getElementById('presentations'); 
            
            presentationDiv.innerHTML = '';
            presentationDiv.className = '';

            if (presentationsData.length > 0) {
                presentationsData.forEach(presentation => {
                    console.log(presentation);

                    const details = document.createElement('div');
                    details.classList.add("presentation");

                    const name = document.createElement('div');
                    name.textContent = `Name: ${presentation.title}`;
                    name.classList.add("name");
                    details.appendChild(name);

                    if (presentation.is_taken) {

                        const presenter = document.createElement('div');
                        presenter.textContent = `Presenter: ${presentation.username}`;
                        presenter.classList.add("presenter");
                        details.appendChild(presenter);
                    }                    

                    const date = document.createElement("div");
                    date.textContent = `Date: `;
                    date.classList.add("date");
                    details.appendChild(date);

                    if (!presentation.is_taken) {
                        const assignButton = document.createElement('button');
                        assignButton.classList.add("assign-button");
                        assignButton.textContent = "Assign";
                        assignButton.addEventListener('click', (e) => {
                                e.preventDefault();
                                updatePresentation(presentation.title);
                            });
                        details.appendChild(assignButton);
                    }

                    presentationDiv.appendChild(details);
                });
            }
}

function updatePresentation(selectedPresentation) {
    console.log(selectedPresentation);

    const data = {
        username: window.localStorage.getItem('username'), 
        presentation: selectedPresentation 
    };

    sendData('../../server/controller/update-presentation.php', data)
        .then(response => {
            location.href = './presentations.php';
        })
        .catch(err => {
            console.log(err);
        });
}

