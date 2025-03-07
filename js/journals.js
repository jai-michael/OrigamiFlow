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
