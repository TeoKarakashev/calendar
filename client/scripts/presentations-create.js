let presentationTitle;
let presentationCreateButton;

window.addEventListener("DOMContentLoaded", () => {
    presentationTitle = document.getElementById('presentation-title');
    presentationCreateButton = document.getElementById('create-presentation-btn');

    // Log the elements to see if they are found correctly
    console.log(presentationTitle, presentationCreateButton);

    // Check if both elements exist
    if (!presentationTitle || !presentationCreateButton) {
        console.error("Either input or button not found!");
        return; // Stop execution if elements are not found
    }

    presentationTitle.classList.add("presentation-title");
    let inputValue = presentationTitle.value.trim();

    // Initially disable the button if the input is empty
    presentationCreateButton.disabled = !inputValue; // Disabled if empty

    presentationCreateButton.textContent = "Добави презентация";
    presentationCreateButton.classList.add("create-presentation-btn");

    // Handle the button click event
    presentationCreateButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPresentation(presentationTitle.value);
    });

    // Listen to input changes to enable/disable the button
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
