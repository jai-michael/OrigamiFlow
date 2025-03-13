/////////// JOURNAL LOGIC //////////////

/**
 * Stores the value of a journal input element in localStorage.
 * element: The CSS selector of the journal input field.
 */
function storeJournal(element) {
    element = document.querySelector(element); // Select the element using the given selector
    console.log(element); // Log the selected element for debugging

    // Store the element's value in localStorage using its ID as the key
    localStorage.setItem(element.id, element.value);

    // Log the stored value to verify
    console.log(localStorage.getItem(element.id));
}

/**
 * Retrieves stored journal data from localStorage.
 * data - The element whose class name is used as the key.
 * returns the stored data or null if not found.
 */
function readStorage(data) {
    const storedData = localStorage.getItem(data.className);
    return storedData; // Return the stored journal entry
}

// Journal Character Counter
const journalTextArea = document.querySelector("#journal-textbox");
const journalWordCount = document.querySelector("#character-amount"); // Fixed variable name typo
const journalButton = document.querySelector(".voice-button");

/**
 * Updates the displayed character count as the user types in the journal.
 */
journalTextArea.addEventListener("input", () => {
    // Count characters (excluding leading/trailing spaces)
    const wordCount = journalTextArea.value.trim().split("").length;
    journalWordCount.innerHTML = wordCount; // Update the UI with the character count
});

// Voice-to-Text (Speech Recognition)
document.addEventListener("DOMContentLoaded", function () {
    // Initialize speech recognition
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop recognition after a single phrase
    recognition.interimResults = false; // Only return final results
    recognition.lang = "en-US"; // Set language to English (US)

    /**
     * Event triggered when speech recognition captures a result.
     * Updates the journal textbox with the recognized speech.
     */
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript; // Extract recognized text
        journalTextArea.value = transcript; // Set the text in the journal textbox
    };

    /**
     * Handles errors that may occur during speech recognition.
     */
    recognition.onerror = function (event) {
        console.error("Speech recognition error", event);
    };

    /**
     * Starts speech recognition when the voice button is clicked.
     */
    journalButton.onclick = function () {
        recognition.start();
    };
});
