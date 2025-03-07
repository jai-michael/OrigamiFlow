const emotions = [happyEmotion, sadEmotion, angryEmotion, disgustEmotion, fearEmotion];

let emotionIndex = 0;

const questionElement = document.querySelector(".question-section");
const emotionMessageElement = document.querySelector(".emotion-message");
const emotionIconElement = document.querySelector(".emotion-face");

////// EMOTION SELECTOR LOGIC //////////
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
