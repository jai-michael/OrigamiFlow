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
            let unsetNextPrompt = this._prompts[i];
            console.log(unsetNextPrompt);
            if (!unsetNextPrompt._completed()) {
                // console.log("Running");
                this.nextPrompt = unsetNextPrompt;

                if (i - 1 < 0) {
                    this.currentPrompt = "Home";
                } else {
                    this.currentPrompt = this._prompts[i - 1];
                }

                break;
            }
        }
    }

    addOnClick() {
        this.buttonElement.onclick = function () {
            if (this.nextPrompt) {
                this.nextPage(this.nextPrompt.constructor.name);
            } else {
                console.log("Not Working");
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

                feelingsChips.forEach(function (chip, index) {
                    chip.innerHTML = prompt.feelings[index];
                });
            case "Emotions":
                currentPromptTitle.innerHTML = this.currentPrompt.title;
        }
    }

    nextPrompt() {
        // // Get the current Prompt Object before we go to the next
        // const currentPrompt = this.prompts[this.promptIndex];
        // // Increase the promptIndex by 1, if its outside the prompts array, start back at 0 (the beginning)
        // this.promptIndex = this.promptIndex + 1;
        // if (this.promptIndex >= this.prompts.length) {
        //     this.promptIndex = 0;
        // }
        // // Get the next Prompt Object (the prompt ahead of our current prompt)
        // // this.saveIndex();
        // const nextPrompt = this.prompts[this.promptIndex];
        // // If the next prompt is the same type, just change the page content,
        // // If it is a different type, change the page and the content.
        // if (currentPrompt.constructor.name == nextPrompt.constructor.name) {
        //     this.buttonElement.onclick = this.nextPrompt();
        // } else {
        //     this.nextPage(nextPrompt.constructor.name);
        // }
    }

    // previousPrompt() {
    //     this.promptIndex -= 1;
    //     if (this.promptIndex < 0) {
    //         this.promptIndex = prompts.length - 1;
    //     }
    // }

    async nextPage(page) {
        console.log(`Next page: ${page}`);
        // if (this.currentPrompt != "Home") {
        //     this.currentPrompt.markCompleted();
        // }
        // await sleep(5000)
        this.nextPrompt.markCompleted();
        console.log(this.nextPrompt);
        // await sleep(5000);
        switch (page) {
            case "Journal":
                console.log("NEXT JOURNAL PAGE FOUND");
                await sleep(10000);
                window.location.href = `${window.location.origin}/pages/journals.html`;
            case "Feelings":
                console.log("NEXT FEELINGS PAGE FOUND");
                await sleep(10000);
                window.location.href = `${window.location.origin}/pages/feelingSelector.html`;
            case "Emotions":
                console.log("NEXT EMOTIONS PAGE FOUND");
                await sleep(10000);
                window.location.href = `${window.location.origin}/pages/emotionSelector.html`;
            default:
                console.log("NOT WORKING");
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
const feelingsPrompt2 = new Feelings("How does your body feel today?", feelings2);

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
