let interestName;
let interestNameField;
let interestUpdateButton;
let currentInterestName = "";

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.addEventListener("DOMContentLoaded", () => {
    currentInterestName = getQueryParameter("key");
    
    interestNameField = document.getElementById('interest-name-field');
    interestName = document.getElementById('interest-name');

    interestName.placeholder = currentInterestName;
    interestUpdateButton = document.getElementById('update-interest-btn');

    interestNameField.appendChild(interestName);
    interestNameField.appendChild(interestUpdateButton);

    if (!interestName || !interestUpdateButton) {
        console.error("Either input or button not found!");
        return;
    }

    interestName.classList.add("interest-name");
    let inputValue = interestName.value.trim();

    interestUpdateButton.disabled = !inputValue;

    interestUpdateButton.textContent = "Редактирай интерес";
    interestUpdateButton.classList.add("update-interest-btn");

    interestUpdateButton.addEventListener("click", (e) => {
        e.preventDefault();
        updateInterest(interestName.value);
    });

    interestName.addEventListener("input", () => {
        interestUpdateButton.disabled = !interestName.value.trim();
    });
});

function updateInterest(newName) {
    newName = newName.trim();
    console.log(newName);

    if (!newName) {
        return;
    }
    let requestData = {
        interest: currentInterestName,
        newInterestName: newName
    };
    
    sendData('../../server/controller/update_interest.php', requestData)
        .then(response => {
            location.href = `./interests-admin.php`;
        })
        .catch(err => {
            console.log(err);
        });
}
