let searchField = document.getElementById('search-field');
let allPresentationsData = [];
let filteredPresentations = [];
let presentationInterests = [];
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

            let presentationDiv = document.getElementById('presentations'); 
            let current = document.getElementById('current');

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
                    const details = document.createElement('div');
                    details.classList.add("presentation");

                    const name = document.createElement('div');
                    name.textContent = `Name: ${presentation.title}`;
                    name.classList.add("name");
                    details.appendChild(name);

                    const currPresentationInterests = presentationInterests
                        .filter(presentationInterest => presentationInterest.title === presentation.title)
                        .map(presentationInterest => presentationInterest.interest);

                    const interests = document.createElement('div');
                    interests.textContent = `${currPresentationInterests.join(', ')}`;
                    interests.classList.add('interests');
                    details.appendChild(interests);

                    if (presentation.is_taken) {
                        const presenter = document.createElement('div');
                        presenter.textContent = `Presenter: ${presentation.username}`;
                        presenter.classList.add("presenter");
                        details.appendChild(presenter);
                    }                    

                    if (presentation.is_taken) {
                        let currPresentationDate = events
                            .filter(event => 
                            event.presentation_title === presentation.title 
                                && event.presenter === presentation.username)
                            .map(event => event.date);

                        if(currPresentationDate.length !== 0) {
                            const date = document.createElement("div");
                            date.textContent = `Date: ${formatDate(new Date(currPresentationDate))}`;
                            date.classList.add("date");
                            details.appendChild(date);
                        }
                    }

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

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
