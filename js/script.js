function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Page {
    constructor(prompts) {
        this._prompts = prompts; // Array
        // this.promptIndex = undefined; // Number
        this.buttonElement = document.querySelector(".submit");
        // HTML Element <button.submit>
        this.nextPrompt = undefined;
        this.currentPrompt = undefined;
        this.promptIndex = undefined;
        this.findPosition();
        this.addOnClick();
        this.setPrompt();
    }

    get prompts() {
        return this._prompts;
    }

    set prompts(val) {
        this._prompts = val;
    }

    findPosition() {
        for (let i = 0; i < this._prompts.length; i++) {
            if (i + 1 >= this._prompts.length) {
                this.nextPrompt = "End";
            } else this.nextPrompt = this._prompts[i + 1];

            console.log(this.nextPrompt);

            if (!this._prompts[i]._completed()) {
                // console.log("Running");
                this.currentPrompt = this._prompts[i];

                break;
            }
        }
    }

    addOnClick() {
        this.buttonElement.onclick = function () {
            if (this.nextPrompt != "End") {
                this.nextPage(this.nextPrompt.constructor.name);
            } else {
                this.nextPage("End");
            }
        }.bind(this);
    }
    setPrompt() {
        const currentPromptTitle = document.querySelector(".title");

        const currentPromptType = this.currentPrompt.constructor.name;
        console.log(currentPromptTitle);
        switch (currentPromptType) {
            // Change page contnet for journals.html
            case "Journal":
                const journalTextArea = document.querySelector("#journal-textbox");

                // Change Journal Prompt
                currentPromptTitle.innerHTML = this.currentPrompt.title;

                // Reset Journal's text area to blank
                journalTextArea.value = "";

            // Change page contnet for feelings.html
            case "Feelings":
                const feelingsChips = document.querySelectorAll(".feeling-btn");

                currentPromptTitle.innerHTML = this.currentPrompt.title;

                feelingsChips.forEach(
                    function (chip, index) {
                        chip.innerHTML = this.currentPrompt.feelings[index];
                    }.bind(this)
                );

            case "Emotions":
                currentPromptTitle.innerHTML = this.currentPrompt.title;
        }
    }

    nextPage(page) {
        console.log(`Next page: ${page}`);

        this.currentPrompt.markCompleted();

        // console.log(this.nextPrompt);

        switch (page) {
            case "Journal":
                console.log("NEXT JOURNAL PAGE FOUND");
                window.location.href = `${window.location.origin}/pages/journals.html`;
                break;
            case "Feelings":
                console.log("NEXT FEELINGS PAGE FOUND");
                window.location.href = `${window.location.origin}/pages/feelingSelector.html`;
                break;
            case "Emotions":
                console.log("NEXT EMOTIONS PAGE FOUND");
                window.location.href = `${window.location.origin}/pages/emotionSelector.html`;
                break;
            case "End":
                window.location.href = `${window.location.origin}/pages/finalpage.html`;
                break;
            default:
                console.log("NOT WORKING");
                break;
        }
    }
}
/////////
class Prompt {
    constructor(title) {
        this.title = title;
        this.slug = title // Removes spaces and special characters, replaces spaces with dashes
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");

        this._completed = function () {
            // A function to check the storage and see if it has been marked completed
            const completed = sessionStorage.getItem(`${this.slug}-completed`);
            if (completed == "true") {
                return true;
            } else return false;
        };
    }
    markCompleted() {
        // A function that marks the promp completed in storage
        console.log("Marking Prompt Complete");
        // this._completed = bool;
        sessionStorage.setItem(`${this.slug}-completed`, true);
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
const feelingsPrompt2 = new Feelings("How do you want to express yourself right now?", feelings2);

// ORDER OF PROMPTS/PAGES; Do NOT mutate this list with any methods/functions.
const PROMPT_ORDER = [emotionPrompt, journalPrompt1, feelingsPrompt1, feelingsPrompt2, journalPrompt2, journalPrompt3, journalPrompt4];

// Document Page Object variable; restored from user's cache even if pages change.
const fetchPage = function () {
    if (sessionStorage.getItem("document-page") !== null) {
        console.log("---- FOUND PREVIOUS PAGE OBJECT ----");
        const previousPage = JSON.parse(sessionStorage.getItem("document-page"));
        return new Page(PROMPT_ORDER, previousPage._promptIndex);
    } else return new Page(PROMPT_ORDER, 0);
};
const documentPage = new Page(PROMPT_ORDER);
// documentPage.savePage();
// documentPage.addOnClick();
//////////////////
