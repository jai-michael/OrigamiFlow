function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Page {
    constructor(prompts) {
        this._prompts = prompts; // Array
        this._promptIndex = 0; // Number
        this.buttonElement = document.querySelector(".submit"); // HTML Element <button.submit>
    }

    // Provided value must be between 0 and the length of the array
    set promptIndex(value) {
        if (typeof value === "number" && value >= 0 && value < this._prompts.length) {
            this._promptIndex = value;
        } else {
            console.error("Invalid prompt index");
        }
    }
    // Get the value of _promptIndex
    get promptIndex() {
        return this._promptIndex;
    }

    // Get the value of _prompts
    get prompts() {
        return this._prompts;
    }

    savePage() {
        console.log(`Page being saved: ${JSON.stringify(this)}`);
        localStorage.setItem("document-page", JSON.stringify(this));
    }

    addOnClick() {
        this.buttonElement.onclick = this.nextPrompt();
    }

    async nextPage(page) {
        console.log(`Next page: ${page}`);

        switch (page) {
            case "Journal":
                console.log("NEXT JOURNAL PAGE FOUND");
                this.savePage();
                await sleep(105000);
                window.location.href = "journals.html";
            case "Feelings":
                console.log("NEXT FEELINGS PAGE FOUND");
                this.savePage();
                await sleep(5000);

                window.location.href = "feelingSelector.html";
            case "Emotions":
                console.log("NEXT EMOTIONS PAGE FOUND");
                this.savePage();
                await sleep(5000);

                window.location.href = "emotionSelector.html";
            default:
                console.log("NOT WORKING");
        }
    }

    nextPrompt() {
        // Get the current Prompt Object before we go to the next
        const currentPrompt = this._prompts[this.promptIndex];

        console.log("Running Next Prompt...\n Current Prompt:");
        console.log(currentPrompt);
        console.log(this.promptIndex);
        // Increase the promptIndex by 1, if its outside the prompts array, start back at 0 (the beginning)
        this.promptIndex = this.promptIndex + 1;

        if (this.promptIndex >= this._prompts.length) {
            this.promptIndex = 0;
        }
        console.log(this.promptIndex);
        // Get the next Prompt Object (the prompt ahead of our current prompt)
        const nextPrompt = this._prompts[this.promptIndex];
        console.log(nextPrompt);

        // If the next prompt is the same type, just change the page content,
        // If it is a different type, change the page and the content.
        if (currentPrompt.constructor.name == nextPrompt.constructor.name) {
            console.log("Running Change Prompt");
            this.changePrompt(nextPrompt, nextPrompt.constructor.name);
            this.buttonElement.onclick = this.changePrompt();
        } else {
            console.log("Running Next Page");
            // console.log(nextPrompt.constructor.name);
            this.nextPage(nextPrompt.constructor.name);
        }
    }

    previousPrompt() {
        this.promptIndex -= 1;
        if (this.promptIndex < 0) {
            this.promptIndex = prompts.length - 1;
        }
    }

    changePrompt(prompt, promptType) {
        const promptTitleElement = document.querySelector(".title");

        switch (promptType) {
            // Change page contnet for journals.html
            case "Journal":
                const journalTextArea = document.querySelector("#journal-textbox");

                // Change Journal Prompt
                promptTitleElement.innerHTML = prompt.title;

                // Reset Journal's text area to blank
                journalTextArea.value = "";

            // Change page contnet for feelings.html
            case "Feelings":
                const feelingsChips = document.querySelectorAll(".feeling-btn");

                promptTitleElement.innerHTML = prompt.title;

                feelingsChips.forEach(function (chip, index) {
                    chip.innerHTML = prompt.feelings[index];
                });
        }
    }
}
/////////
class Prompt {
    constructor(title) {
        this.title = title;
    }
}

class Journal extends Prompt {
    constructor(title, note = null) {
        super(title);
        this.note = note;
    }
}

class Emotions extends Prompt {
    constructor(title, emotions) {
        super(title);
        this.emotions = emotions;
    }
}
class Emotion {
    constructor(name) {
        this.name = name;
        this.cssColor = `--${name.toLowerCase()}-color`;
        this.svgIcon = `face_${name}.svg`;
        this.phrase = `I'm feeling ${name}!`;
    }
}
class Feelings extends Prompt {
    constructor(title, feelings) {
        super(title);
        this.feelings = feelings;
    }
}

// EMOTION OBJECT VARIABLES
const happyEmotion = new Emotion("Happy");
const sadEmotion = new Emotion("Sad");
const angryEmotion = new Emotion("Angry");
const disgustEmotion = new Emotion("Disgust");
const fearEmotion = new Emotion("Afraid");

// EMOTION PROMPT OBJECT VARIABLE
const emotionPrompt = new Emotions("How are you feeling today?", [happyEmotion, sadEmotion, angryEmotion, disgustEmotion, fearEmotion]);

// JOURAL PROMPT OBJECT VARIABLES
const journalPrompt1 = new Journal("What is causing your emotions right now?");
const journalPrompt2 = new Journal("What would make your day better?");
const journalPrompt3 = new Journal("Release Through Writing", "Let yourself vent freely, even if it doesn't make sense.");
const journalPrompt4 = new Journal("Write a positive affirmation about yourself", "(e.g. “I am worthy of happiness.”)");

// FEELINGS PROMPT OBJECT VARIABLES
const feelings1 = ["Weak", "Stiff", "Numb", "Tense", "Relaxed", "Balanced", "Restless", "Anxious", "Energized", "Excited"];
const feelingsPrompt1 = new Feelings("How does your body feel today?", feelings1);

const feelings2 = ["Creatively", "Verbally", "Physically", "Quietly", "Logically", "Emotionally", "Culturally", "Socially", "Musically", "Playfully"];
const feelingsPrompt2 = new Feelings("How does your body feel today?", feelings2);

// ORDER OF PROMPTS/PAGES; Do NOT mutate this list with any methods/functions.
const PROMPT_ORDER = [emotionPrompt, journalPrompt1, feelingsPrompt1, feelingsPrompt2, journalPrompt2, journalPrompt3, journalPrompt4];

// Document Page Object variable; restored from user's cache even if pages change.
const fetchPage = function () {
    if (localStorage.getItem("document-page" !== null)) {
        return JSON.parse(localStorage.getItem("document-page"));
    } else return new Page(PROMPT_ORDER);
};
const documentPage = fetchPage();
// documentPage.savePage();
// documentPage.addOnClick();
//////////////////
