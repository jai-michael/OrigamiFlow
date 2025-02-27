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

let emotionSelector = 0;
let questionElement = document.querySelector(".question-section");
let emotionMessageElement = document.querySelector(".emotion-message");

function switchEmotion(direction) {
    console.log(emotionSelector);
    if (direction == "next") {
        emotionSelector += 1;
        if (emotionSelector > emotions.length - 1) {
            emotionSelector = 0;
        }
    } else if (direction == "back") {
        emotionSelector -= 1;
        if (emotionSelector < 0) {
            emotionSelector = emotions.length - 1;
        }
    }
    let currentEmotion = emotions[emotionSelector];

    questionElement.style.background = `var(${currentEmotion.cssColor})`;
    emotionMessageElement.innerHTML = currentEmotion.phrase;
}

function storeJournal(element) {
    element = document.querySelector(element);
    console.log(element);
    localStorage.setItem(element.id, element.value);
    console.log(localStorage.getItem(element.id));
}

function readStorage(data) {
    const storedData = localStorage.getItem(data.className);

    return storedData;
}
