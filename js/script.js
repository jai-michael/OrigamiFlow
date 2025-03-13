// Page class manages the navigation and prompt handling
class Page {
    constructor(prompts) {
        this._prompts = prompts; // Array of prompt objects
        this.buttonElement = document.querySelector(".submit"); // Submit button element

        // All the following properties start out as undefined as to not be read until the starting functions set each value manually.
        this.nextPrompt = undefined;
        this.currentPrompt = undefined;
        this.promptIndex = undefined;

        this.findPosition(); // Determine the current prompt position
        this.addOnClick(); // Add event listener for button click
        this.setPrompt(); // Initialize the prompt display
    }

    get prompts() {
        return this._prompts;
    }

    set prompts(val) {
        this._prompts = val;
    }

    // Finds the first unfinished prompt in the list and sets it as the current prompt.
    findPosition() {
        for (let i = 0; i < this._prompts.length; i++) {
            // Determine the next prompt or mark it as "End" if none are left
            if (i + 1 >= this._prompts.length) {
                this.nextPrompt = "End";
            } else {
                this.nextPrompt = this._prompts[i + 1];
            }

            console.log(this.nextPrompt);

            // Check if the prompt is not completed, then set it as the current prompt
            if (!this._prompts[i]._completed()) {
                this.currentPrompt = this._prompts[i];
                this.promptIndex = i;
                break;
            }
        }
    }

    // Adds a click event listener to the submit button to navigate to the next page.
    addOnClick() {
        this.buttonElement.onclick = function () {
            if (this.nextPrompt != "End") {
                this.nextPage(this.nextPrompt.constructor.name);
            } else {
                this.nextPage("End");
            }
        }.bind(this);
    }

    // Updates the UI based on the current prompt type.
    setPrompt() {
        const currentPromptTitle = document.querySelector(".title");
        const progressTrackerStep = document.querySelector(`.progress-tracker div:nth-child(${this.promptIndex + 1})`);
        const currentPromptType = this.currentPrompt.constructor.name;

        progressTrackerStep.setAttribute("data-current", "");

        switch (currentPromptType) {
            case "Journal":
                const journalTextArea = document.querySelector("#journal-textbox");
                currentPromptTitle.innerHTML = this.currentPrompt.title;
                journalTextArea.value = ""; // Reset journal input
                break;

            case "Feelings":
                const feelingsChips = document.querySelectorAll(".feeling-btn");
                currentPromptTitle.innerHTML = this.currentPrompt.title;

                feelingsChips.forEach(
                    function (chip, index) {
                        chip.innerHTML = this.currentPrompt.feelings[index];
                    }.bind(this)
                );
                break;

            case "Emotions":
                currentPromptTitle.innerHTML = this.currentPrompt.title;
                break;
        }
    }

    // Navigates to the appropriate page based on the next prompt type.
    nextPage(page) {
        console.log(`Next page: ${page}`);
        this.currentPrompt.markCompleted();

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

// Base Prompt class
class Prompt {
    constructor(title) {
        this.title = title;
        this.slug = title // SessionStorage key name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");

        // Check if prompt is completed (stored in sessionStorage)
        this._completed = function () {
            return sessionStorage.getItem(`${this.slug}-completed`) === "true";
        };
    }

    /**
     * Marks the prompt as completed in sessionStorage.
     */
    markCompleted() {
        console.log("Marking Prompt Complete");
        sessionStorage.setItem(`${this.slug}-completed`, true);
    }
}

// Journal class extends Prompt
class Journal extends Prompt {
    constructor(title, note = null) {
        super(title);
        this.note = note;
    }
}

// Emotions class extends Prompt
class Emotions extends Prompt {
    constructor(title, emotions) {
        super(title);
        this.emotions = emotions;
    }
}

// Emotion object class. These objects sit within an Emotions object as an array
class Emotion {
    constructor(name) {
        this.name = name;
        this.cssColor = `--${name.toLowerCase()}-color`; // CSS variable for emotion color
        this.svgIcon = `face_${name}.svg`; // Icon filename
        this.phrase = `I'm feeling ${name}!`; // Display phrase
    }
}

// Feelings class extends Prompt
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

// JOURNAL PROMPT OBJECT VARIABLES
const journalPrompt1 = new Journal("What is causing your emotions right now?");
const journalPrompt2 = new Journal("What would make your day better?");
const journalPrompt3 = new Journal("Whats on your mind right now ");
const journalPrompt4 = new Journal("Write a positive affirmation about yourself");

// FEELINGS PROMPT OBJECT VARIABLES
const feelings1 = ["Weak", "Stiff", "Numb", "Tense", "Relaxed", "Balanced", "Restless", "Anxious", "Energized", "Excited"];
const feelingsPrompt1 = new Feelings("How does your body feel today?", feelings1);

const feelings2 = ["Creatively", "Verbally", "Physically", "Quietly", "Logically", "Emotionally", "Culturally", "Socially", "Musically", "Playfully"];
const feelingsPrompt2 = new Feelings("How do you want to express yourself right now?", feelings2);

// ORDER OF PROMPTS/PAGES; Do NOT mutate this list with any methods/functions.
const PROMPT_ORDER = [emotionPrompt, journalPrompt1, feelingsPrompt1, feelingsPrompt2, journalPrompt2, journalPrompt3, journalPrompt4];

// Initialize the document page
const documentPage = new Page(PROMPT_ORDER);
