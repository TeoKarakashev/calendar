document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('update-btn').addEventListener('click', (e) => {
        e.preventDefault();
        updateInterests();
    });
});

function loadInterests() {
    getData('../../server/controller/interests.php')
        .then(response => {
            let interestForm = document.getElementById('interests-form');

            if (Array.isArray(response['allInterests'])) {
                const allInterests = response['allInterests'];
                const userInterests = response['userInterests'];
        
                let checkboxList = '';
                allInterests.forEach(interest => {
                    const isChecked = userInterests.includes(interest);
                    checkboxList += `
                        <label>
                            <input type="checkbox" name="interests" value="${interest}" ${isChecked ? 'checked' : ''}>
                            ${interest}
                        </label><br>
                    `;
                });
                interestForm.innerHTML += checkboxList;

            } else {
                content.innerHTML += `<p>No interests available.</p>`;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function updateInterests() {
    const form = document.getElementById('interests-form');
    const interests = form.querySelectorAll('input[name="interests"]:checked');
    const selectedInterests = Array.from(interests).map(interest => interest.value);
    const user = {
        username: window.localStorage.getItem('username'),
        interests: selectedInterests
    };

    sendData('../../server/controller/update-interests.php', user)
        .then(response => {
            location.href = './interests.php';
        })
        .catch(err => {
            console.log(err);
        });
}

