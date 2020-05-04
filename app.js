class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./allSounds/kick-classic.wav"
        this.currentSnare = "./allSounds/snare-acoustic01.wav"
        this.currentHihat = "./allSounds/kick-acoustic01.wav"
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
    }

    activePad() {
        this.classList.toggle("active");
    }

    // Repeater function to check over the pad
    repeat() {
        // When reach at step will be 0
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads
        activeBars.forEach(bar => {
            // Add animation 
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            // Check if pads are active
            if (bar.classList.contains('active')) {
                // Check each sound
                if (bar.classList.contains('kick-pad')) {
                    // Play audio from the start
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }

    start() {
        // Beats per min in millisecond
        const interval = (60 / this.bpm) * 1000;
        // setInterval gives an id of that interval
        // Check if it is playing
        if (this.isPlaying) {
            // Clear Interval i.e stop playing 
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                // Arrow function is used to refer to the same "this"
                this.repeat();
            }, interval);
        }
    }
    updateBtn() {
        console.log("updateBtn")
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active")
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active")
        }
    }
    changeSound(e) {
        console.log(e);
        // Gives name of select
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    // mute(e) {
    //     const muteIndex = e.target.getAttribute("data-track");
    //     e.target.classList.toggle("active");
    //     console.log(muteIndex);
    // }
}

const drumkit = new Drumkit();

// Event Listners

drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    // Remove pad animation
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    })
})

// Play sound
drumkit.playBtn.addEventListener("click", function () {
    drumkit.updateBtn();
    drumkit.start();
});

drumkit.selects.forEach(select => {
    select.addEventListener("change", function (e) {
        drumkit.changeSound(e);
    })
});

// drumkit.muteBtn.forEach(btn => {
//     btn.addEventListener('click', function (e) {
//         drumkit.mute(e);
//     })
// })