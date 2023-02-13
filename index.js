const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-10;

let startGame = false;
let gameOver = false;
let gameOption = 'easy';
let smashCaptionStatus = false;
let ballInitialSpeed = 3;
let winRound = 3;
let gameCount = 0;
let redPoints = 0;
let bluePoints = 0;
let mute = true;


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
    speed: ballInitialSpeed
})

paddle1.draw()
paddle2.draw()

function game() {

    if(bluePoints != winRound && redPoints != winRound) {
        gameCount += 1;
        gameOver = false;

        paddle1.position = {
            x: 10, 
            y: canvas.height / 2 - 50};

        paddle2.position = {
            x: canvas.width - 10 * 2, 
            y: canvas.height / 2 - 50};

        ball.position = {
            x: canvas.width / 2 - 5,
            y: canvas.height / 2 - 5,
        }

        ball.velocity = {
            x: Math.random() - 0.5 >= 0 ? -ballInitialSpeed : ballInitialSpeed,
            y: Math.random() - 0.5 >= 0 ? -ballInitialSpeed : ballInitialSpeed,
        } 

        animate();
        console.log("Game: " + gameCount);
    } else {
        endGame();
    }
}


function animate() {

    if (!gameOver) {
        requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)

        paddle1.draw()
        paddle2.draw()

        document.getElementById("menu-theme-audio").loop = true;
        document.getElementById("game-theme-audio").loop = true;


        if (startGame && !gameOver){
            if(!mute){
                document.querySelector("#game-theme-audio").play();
            } else {
                document.querySelector("#game-theme-audio").pause();
            }
        
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
    } else {

        if (bluePoints != winRound && redPoints != winRound) {


            if ((bluePoints == winRound - 1 || redPoints == winRound - 1) && 
                !(bluePoints == winRound - 1 && redPoints == winRound - 1)) {
                if (redPoints == winRound - 1) {
                    document.querySelector("#gameOver").innerHTML = "Game point for Red!";
                } else {
                    document.querySelector("#gameOver").innerHTML = "Game point for Blue!";
                }
            } else if (bluePoints == winRound - 1 && redPoints == winRound - 1) {
                document.querySelector("#next-round-btn").innerHTML = "Winning Round!";
            }

            document.querySelector("#next-round-btn").style.display = "block";
            startGame = false;
        } else {
            document.querySelector("#finishGameBtn").style.display = "block";
        }

    }


}

ball.draw();


/* Player controls */
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
