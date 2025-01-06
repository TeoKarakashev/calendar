document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('update-btn').addEventListener('click', (e) => {
        e.preventDefault();
        updatePresentation();
    });
});

function loadPresentations() {
    getData('../../server/controller/presentation.php')
        .then(response => {
            let presentationSelect = document.getElementById('presentations'); 
            let current = document.getElementById('current');

            current.textContent = `Текуща избрана презентация: ${response['current']}`;

            const recommendedPresentationsData = response['recommended'];
            const allPresentationsData = response['all'];

            presentationSelect.innerHTML = '';
            let recommendedPresentations = document.createElement('option');
            recommendedPresentations.textContent = 'Препоръчани теми';
            recommendedPresentations.disabled = true; 
            presentationSelect.appendChild(recommendedPresentations);

            if (recommendedPresentationsData.length > 0) {
                recommendedPresentationsData.forEach(presentation => {
                    let option = document.createElement('option');
                    option.value = presentation;
                    option.textContent = presentation;
                    presentationSelect.appendChild(option);
                });
            }

            let remainingOption = document.createElement('option');
            remainingOption.textContent = 'останали презентации';
            remainingOption.disabled = true; 
            presentationSelect.appendChild(remainingOption);

            const filteredPresentations = allPresentationsData.filter(presentation => 
                !recommendedPresentationsData.includes(presentation)
            );

            if (filteredPresentations.length > 0) {
                filteredPresentations.forEach(presentation => {
                    let option = document.createElement('option');
                    option.value = presentation;
                    option.textContent = presentation;
                    presentationSelect.appendChild(option);
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}


function updatePresentation() {
    const select = document.getElementById('presentations');
    
    const selectedPresentation = select.value;
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

