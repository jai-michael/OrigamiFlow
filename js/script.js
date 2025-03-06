class Emotion {
    constructor(title) {
        this.title = title;
        this.cssColor = `--${title.toLowerCase()}-color`;
        this.svgIcon = `face_${title}.svg`;
        this.phrase = `I'm feeling ${title}!`;
    }
}
const happyEmotion = new Emotion("Happy");
const sadEmotion = new Emotion("Sad");
const angryEmotion = new Emotion("Angry");
const disgustEmotion = new Emotion("Disgust");
const fearEmotion = new Emotion("Afraid");

const emotions = [happyEmotion, sadEmotion, angryEmotion, disgustEmotion, fearEmotion];

let emotionIndex = 0;

const questionElement = document.querySelector(".question-section");
const emotionMessageElement = document.querySelector(".emotion-message");
const emotionIconElement = document.querySelector(".emotion-face");

function switchEmotion(target) {
    // lastElement = emotions.pop();
    // shiftedEmotions = emotions.unshift(lastElement);
    // // console.log(shiftedEmotions);
    // emotionIndex = (emotionIndex + index) % emotions.length;
    console.log(`emotionIndex: ${emotionIndex}`);
    emotionIndex += target - emotionIndex;

    changeEmotionHTML(emotions[emotionIndex]);
}

function nextEmotion(direction) {
    emotionIndex = Math.abs((emotionIndex + direction) % emotions.length);
    console.log(emotionIndex);
    // if (emotionIndex < 0) {
    //     emotionIndex *= -1;
    // }
    changeEmotionHTML(emotions[emotionIndex]);
}

function changeEmotionHTML(targetEmotion) {
    questionElement.style.background = `var(${targetEmotion.cssColor})`;
    emotionMessageElement.innerHTML = targetEmotion.phrase;
    emotionIconElement.src = `../assets/icons/faces/${targetEmotion.svgIcon}`;
}

/////////// JOURNAL LOGIC //////////////
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

// Journal Character counter
journalTextArea = document.querySelector("#journal-textbox");
jounralWordCount = document.querySelector("#character-amount");
journalTextArea.addEventListener("input", event => {
    const wordCount = journalTextArea.value.trim().split("").length;
    jounralWordCount.innerHTML = wordCount;
});
