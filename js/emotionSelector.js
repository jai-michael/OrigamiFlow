// Retrieve the array of emotions from the emotionPrompt object
const emotions = emotionPrompt.emotions;

// Initialize the emotion index, which keeps track of the current emotion
let emotionIndex = 0;

// Select DOM elements related to the emotion display
const questionElement = document.querySelector(".question-section"); // Question container
const emotionMessageElement = document.querySelector(".emotion-message"); // Displays emotion message
const emotionIconElement = document.querySelector(".emotion-face"); // Displays emotion icon

////// EMOTION SELECTOR LOGIC ////////
/**
 * Updates the displayed emotion based on a direct selection.
 * This function is used when clicking on a color button in the UI.
 * target: The index of the selected emotion in the emotions array.
 */
function switchEmotion(target) {
    console.log(`emotionIndex: ${emotionIndex}`); // Logs the current index before change

    // Update the index to match the target emotion
    emotionIndex += target - emotionIndex;

    // Apply the new emotion to the UI
    changeEmotionHTML(emotions[emotionIndex]);
}

/**
 * Moves to the next or previous emotion based on the direction parameter.
 * direction: Either 1 (next emotion) or -1 (previous emotion).
 */
function nextEmotion(direction) {
    // Adjust the index in a circular manner to loop through the emotions array
    emotionIndex = (emotionIndex + direction + emotions.length) % emotions.length;

    console.log(emotionIndex); // Logs the updated index

    // Apply the new emotion to the UI
    changeEmotionHTML(emotions[emotionIndex]);
}

/**
 * Updates the UI elements to reflect the selected emotion.
 * targetEmotion: The emotion object containing its css/html properties.
 */
function changeEmotionHTML(targetEmotion) {
    // Change the background color based on the emotion's associated CSS variable
    questionElement.style.background = `var(${targetEmotion.cssColor})`;

    // Update the message displayed for the selected emotion
    emotionMessageElement.innerHTML = targetEmotion.phrase;

    // Update the displayed emotion icon
    emotionIconElement.src = `../assets/icons/faces/${targetEmotion.svgIcon}`;
}
