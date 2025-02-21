class Emotion {
    constructor(title) {
        this.title = title;
        this.cssColor = `--${title.toLowerCase()}-color`;
        this.svgIcon = `${title}_face.svg`;
        this.phrase = `I'm feeling ${title}!`;
    }
}
let happyEmotion = {
    title: "Happy",
    color: "--happy-color",
    icon: "happy_face.svg",
};

let sadEmotion = {
    title: "Sad",
    color: "--sad-color",
    icon: "sad_face.svg",
};

let afraidEmotion = {
    title: "Afraid",
    color: "--afraid-color",
    icon: "afraid_face.svg",
};

let angryEmotion = {
    title: "Angry",
    color: "--angry-color",
    icon: "angry_face.svg",
};

let disgustedEmotion = {
    title: "Disgusted",
    color: "--disgusted-color",
    icon: "disgusted_face.svg",
};
