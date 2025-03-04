class Emotion {
    constructor(title) {
        this.title = title;
        this.cssColor = `--${title.toLowerCase()}-color`;
        this.svgIcon = `${title}_face.svg`;
        this.phrase = `I'm feeling ${title}!`;
    }
}
let happyEmotion = new Emotion("Happy");
let sadEmotion = new Emotion("Sad");
let angryEmotion = new Emotion("Angry");
let disgustEmotion = new Emotion("Disgust");
let fearEmotion = new Emotion("Afraid");

let emotions = [happyEmotion, sadEmotion, angryEmotion, disgustEmotion, fearEmotion];

let questionElement = document.querySelector(".question-section");
let emotionMessageElement = document.querySelector(".emotion-message");

let emotionIndex = -1;
function switchEmotion(direction) {
    console.log(emotionIndex);
    if (direction == "next") {
        emotionIndex += 1;
        if (emotionIndex > emotions.length - 1) {
            emotionIndex = 0;
        }
    } else if (direction == "back") {
        emotionIndex -= 1;
        if (emotionIndex < 0) {
            emotionIndex = emotions.length - 1;
        }
    }

    let currentEmotion = emotions[emotionIndex];

    questionElement.style.background = `var(${currentEmotion.cssColor})`;
    emotionMessageElement.innerHTML = currentEmotion.phrase;
}

// Store journal entry
function storeJournal(element) {
    element = document.querySelector(element);
    console.log(element);
    localStorage.setItem(element.id, element.value);
    console.log(localStorage.getItem(element.id));
}
// Fetch jounral entry (incomplete)
function readStorage(data) {
    const storedData = localStorage.getItem(data.className);

    return storedData;
}

// Journal Character counter
journalTextArea = document.querySelector("#journal-textbox");
jounralWordCount = document.querySelector("#character-amount");
journalTextArea.addEventListener("input", event => {
    const wordCount = journalTextArea.value.trim().split("").length;
    jounralWordCount.innerHTML = wordCount;
});
