// Wait until the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select all buttons that represent different feelings
    const feelingButtons = document.querySelectorAll(".feeling-btn");

    /**
     * Adds click event listeners to each feeling button.
     * Clicking toggles the button's "selected" state visually and in the dataset.
     */
    feelingButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isSelected = button.dataset.selected === "true"; // Check if button is already selected

            if (isSelected) {
                // If selected, remove the 'selected' class and update the dataset
                button.classList.remove("selected");
                button.dataset.selected = "false";
            } else {
                // If not selected, add the 'selected' class and update the dataset
                button.classList.add("selected");
                button.dataset.selected = "true";
            }
        });
    });

    // Select the submit button for finalizing mood selection
    const submitButton = document.getElementById("submit-mood");

    /**
     * Adds event listener to the submit button.
     * Prevents default form submission, collects selected feelings, and logs them.
     */
    submitButton.addEventListener("click", event => {
        event.preventDefault(); // Prevent default form submission behavior

        // Gather selected feelings by filtering buttons that have dataset.selected === 'true'
        const selectedFeelings = Array.from(feelingButtons)
            .filter(button => button.dataset.selected === "true") // Keep only selected buttons
            .map(button => button.textContent); // Extract the text content of each selected button

        console.log("Selected Feelings:", selectedFeelings); // Log selected feelings to console
    });
});
