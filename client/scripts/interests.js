document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('update-btn').addEventListener('click', (e) => {
        e.preventDefault();
        updateInterests();
    });
});

function loadInterests() {
    getData('../../server/controller/interests.php')
        .then(response => {
            let interestsContainer = document.getElementById('interest-container');
            
            interestsContainer.innerHTML = '';
            interestsContainer.className = '';

            let allInterests = response['allInterests'];
            let userInterests = response['userInterests'];
            console.log(userInterests);

            if(allInterests.length > 0) {
                allInterests.forEach(currInterest => {
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
                            console.log(userInterests);
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
        })
        .catch(err => {
            console.log(err);
        });
}

// function loadInterests() {
//     getData('../../server/controller/interests.php')
//         .then(response => {
//             let interestForm = document.getElementById('interests-form');

//             if (Array.isArray(response['allInterests'])) {
//                 const allInterests = response['allInterests'];
//                 const userInterests = response['userInterests'];
        
//                 let checkboxList = '';
//                 allInterests.forEach(interest => {
//                     const isChecked = userInterests.includes(interest);
//                     checkboxList += `
//                         <label>
//                             <input type="checkbox" name="interests" value="${interest}" ${isChecked ? 'checked' : ''}>
//                             ${interest}
//                         </label><br>
//                     `;
//                 });
//                 interestForm.innerHTML += checkboxList;

//             } else {
//                 content.innerHTML += `<p>No interests available.</p>`;
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

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

