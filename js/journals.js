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
const journalTextArea = document.querySelector("#journal-textbox");
const jounralWordCount = document.querySelector("#character-amount");
const journalButton = document.querySelector(".voice-button");

journalTextArea.addEventListener("input", event => {
    const wordCount = journalTextArea.value.trim().split("").length;
    jounralWordCount.innerHTML = wordCount;
});

// Voice Speech to Text
document.addEventListener("DOMContentLoaded", function () {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        journalTextArea.value = transcript;
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error", event);
    };

    journalButton.onclick = function () {
        recognition.start();
    };
});
