function loadPresentations() {
    getData('../../server/controller/presentation.php')
        .then(response => {
            let presentationDiv = document.getElementById('presentations'); 
            let current = document.getElementById('current');

            console.log(response['current']);
            current.textContent = `Текуща избрана презентация: ${response['current']}`;

            //const recommendedPresentationsData = response['recommended'];
            const allPresentationsData = response['all'];

            
            presentationDiv.innerHTML = '';
            presentationDiv.className = '';
            // let allPresentations = document.createElement('div');
            // allPresentations.textContent = 'Всички теми';
            // allPresentations.disabled = false;
            // presentationDiv.appendChild(allPresentations);

            if (allPresentationsData.length > 0) {
                allPresentationsData.forEach(presentation => {
                    console.log(presentation);

                    // const card = document.createElement('div');
                    // presentationDiv.classList.add("presentation");
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

            // let recommendedPresentations = document.createElement('option');
            // recommendedPresentations.textContent = 'Препоръчани теми';
            // recommendedPresentations.disabled = true; 
            // presentationSelect.appendChild(recommendedPresentations);

            // if (recommendedPresentationsData.length > 0) {
            //     recommendedPresentationsData.forEach(presentation => {
            //         let option = document.createElement('option');
            //         option.value = presentation;
            //         option.textContent = presentation;
            //         presentationSelect.appendChild(option);
            //     });
            // }

            // let remainingOption = document.createElement('option');
            // remainingOption.textContent = 'останали презентации';
            // remainingOption.disabled = true; 
            // presentationSelect.appendChild(remainingOption);

            // const filteredPresentations = allPresentationsData.filter(presentation => 
            //     !recommendedPresentationsData.includes(presentation)
            // );

            // if (filteredPresentations.length > 0) {
            //     filteredPresentations.forEach(presentation => {
            //         let option = document.createElement('option');
            //         option.value = presentation;
            //         option.textContent = presentation;
            //         presentationSelect.appendChild(option);
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
        });
}


function updatePresentation(selectedPresentation) {
    // const select = document.getElementById('presentations');
    
    // const selectedPresentation = select.value;
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

