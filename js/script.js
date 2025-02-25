class Emotion {
    constructor(title) {
        this.title = title;
        this.cssColor = `--${title.toLowerCase()}-color`;
        this.svgIcon = `${title}_face.svg`;
        this.phrase = `I'm feeling ${title}!`;
    }
}
let happyEmotion = new Emotion("Happy");
