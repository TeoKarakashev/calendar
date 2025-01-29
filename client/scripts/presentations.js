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

            let allPresentations = response['all'];
            
            allPresentationsData = orderPresentations(allPresentations, recommendedPresentations);
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
                        assignButton.textContent = "Избери";
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

async function updatePresentation(selectedPresentation) {
    const data = {
        username: window.localStorage.getItem('username'), 
        presentation: selectedPresentation 
    };

    const userPresentation = (await getData('../../server/controller/load-user.php')).presentation;

    const deleteEventData = {
        presenter: window.localStorage.getItem('username'), 
        presentationTitle: userPresentation 
    };

    sendData('../../server/controller/update-presentation.php', data)
        .then(() => {
            return sendData('../../server/controller/delete_event.php', deleteEventData)
        })
        .then(() => {
            location.href = './presentations.php';
        })
        .catch(err => {
            console.log(err);
        });
}

function orderPresentations(all, recommended) {
    const username = localStorage.getItem('username');
    let reservedPresentations = all.filter(presentation => presentation.is_taken);

    let userPresentation = reservedPresentations
        .filter(presentation => presentation.username === username);

    let recommendedData = all.filter(presentation => recommended.includes(presentation.title));
    recommendedData = recommendedData.filter(presentation => !userPresentation.includes(presentation));

    let rest = all.filter(presentation => !recommendedData.includes(presentation));
    rest = rest.filter(presentation =>  !userPresentation.includes(presentation));

    let result = [...userPresentation, ...recommendedData, ...rest];
    return result;
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
