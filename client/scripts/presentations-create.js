let presentationTitle;
let presentationCreateButton;

window.addEventListener("DOMContentLoaded", () => {
    presentationTitleField = document.getElementById('presentation-title-field');
    presentationTitle = document.getElementById('presentation-title');
    presentationCreateButton = document.getElementById('create-presentation-btn');
    presentationTitleField.appendChild(presentationTitle);
    presentationTitleField.appendChild(presentationCreateButton);

    console.log(presentationTitle, presentationCreateButton);

    if (!presentationTitle || !presentationCreateButton) {
        console.error("Either input or button not found!");
        return;
    }

    presentationTitle.classList.add("presentation-title");
    let inputValue = presentationTitle.value.trim();

    presentationCreateButton.disabled = !inputValue;

    presentationCreateButton.textContent = "Добави презентация";
    presentationCreateButton.classList.add("create-presentation-btn");

    presentationCreateButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPresentation(presentationTitle.value);
    });

    presentationTitle.addEventListener("input", () => {
        presentationCreateButton.disabled = !presentationTitle.value.trim();
    });
});

function createPresentation(newTitle) {
    newTitle = newTitle.trim();
    console.log(newTitle);

    if (!newTitle) {
        return;
    }
    let requestData = {
        presentation: newTitle
    };

    sendData('../../server/controller/add_presentation.php', requestData)
        .then(response => {
            location.href = `./presentations-admin.php`;
        })
        .catch(err => {
            console.log(err);
        });
}
