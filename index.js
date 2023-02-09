const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-10;

let startGame = false;
let gameOver = false;
let gameOption = 'easy';
let smashCaptionStatus = false;

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const paddle1 = new Paddle({
    position: {
        x: 10, 
        y: canvas.height / 2 - 50},
    colour: 'red',
    speed: 6,
    gameOption: gameOption
    })

const paddle2 = new Paddle({
    position: {
        x: canvas.width - 10 * 2, 
        y: canvas.height / 2 - 50},
    colour: 'blue',
    speed: 6,
    gameOption: gameOption
})

const ball = new Ball({
    position: {
        x: canvas.width / 2 - 5,
        y: canvas.height / 2 - 5,
    },
    speed: 3
})

paddle1.draw()
paddle2.draw()

// function themeMusic() {
//     themeSong.autoplay = true;
//     themeSong.loop = true;
//     themeSong.play();
//     console.log("music");
// }

// themeMusic();

function animate() {

    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    paddle1.draw()
    paddle2.draw()


    if (startGame && !gameOver){
        document.querySelector("#game-theme-audio").play();
        paddle1.update()
        paddle2.update()
        ball.update()
    } else if (startGame) {
        paddle1.update()
        paddle2.update()
    }

    if (smashCaptionStatus) {
        document.querySelector("#smash").style.display = "flex";
    } else {
        document.querySelector("#smash").style.display = "none";
    }

}

ball.draw();

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    t: {
        pressed: false
    },

    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    Enter: {
        pressed: false
    }
}


addEventListener('keydown', (event) => {
    const speed = 6
    switch (event.key) {
        case 'w': 
            keys.w.pressed = true;
            paddle1.lastKey = 'w';
            break
        case 's':
            keys.s.pressed = true;
            paddle1.lastKey = 's';
            break
        case 't':
            paddle1.smash = true;
            break


        case 'ArrowUp': 
            keys.ArrowUp.pressed = true;
            paddle2.lastKey = 'ArrowUp';
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            paddle2.lastKey = 'ArrowDown';
            break
        case 'Enter':
            paddle2.smash = true;
            break
    }
})

addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w': 
            keys.w.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 't':
            paddle1.smash = false
            break

        case 'ArrowUp': 
            keys.ArrowUp.pressed = false;
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break
        case 'Enter':
            paddle2.smash = false
            break
    }
})
