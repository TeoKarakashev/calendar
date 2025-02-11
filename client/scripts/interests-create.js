let interestName;
let interestNameField;
let interestCreateButton;

window.addEventListener("DOMContentLoaded", () => {
    interestNameField = document.getElementById('interest-name-field');
    interestName = document.getElementById('interest-name');
    interestCreateButton = document.getElementById('create-interest-btn');
    interestNameField.appendChild(interestName);
    interestNameField.appendChild(interestCreateButton);

    console.log(interestName, interestCreateButton);

    if (!interestName || !interestCreateButton) {
        console.error("Either input or button not found!");
        return;
    }

    interestName.classList.add("interest-name");
    let inputValue = interestName.value.trim();

    interestCreateButton.disabled = !inputValue;

    interestCreateButton.textContent = "Добави интерес";
    interestCreateButton.classList.add("create-interest-btn");

    interestCreateButton.addEventListener("click", (e) => {
        e.preventDefault();
        createInterest(interestName.value);
    });

    interestName.addEventListener("input", () => {
        interestCreateButton.disabled = !interestName.value.trim();
    });
});

function createInterest(newName) {
    newName = newName.trim();
    console.log(newName);

    if (!newName) {
        return;
    }
    let requestData = {
        interest: newName
    };
    
    sendData('../../server/controller/add_interest.php', requestData)
        .then(response => {
            location.href = `./interests-admin.php`;
        })
        .catch(err => {
            console.log(err);
        });
}
