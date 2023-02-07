const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let startGame = false;
let gameOver = false;
let gameOption = 'easy';
let smashCaptionStatus = false;

class Paddle {
    constructor({position, colour, speed}) {
        this.position = position;
        this.colour = colour;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = 10;
        this.height = 100;
        this.lastKey;
        this.smash = false;
        this.speed = speed;
    }

    draw() {
        c.fillStyle = this.colour;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();

        if (this.position.y + this.velocity.y > 0 && this.position.y + this.height +this.velocity.y < canvas.height){
            movement();
            this.position.y += this.velocity.y;
        }

        if (gameOption != 'hard'){
            this.velocity.y = 0;
        }
    }
}

class Ball {
    constructor({position, speed}) {
       this.position = position;
       this.speed = speed;
       this.incrementSpeed = 1.5;

       const direction = {
        x: Math.random() - 0.5 >= 0 ? -speed : speed,
        y: Math.random() - 0.5 >= 0 ? -speed : speed,
       }
       this.velocity = {
        x: direction.x,
        y: direction.y,
       } 

       this.width = 10;
       this.height = 10;
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        const rightSide = this.position.x + this.width + this.velocity.x;
        const leftSide = this.position.x + this.velocity.x;
        const bottomSide = this.position.y + this.height;
        const topSide = this.position.y 

        // Paddle 1 collision
        if ((leftSide <= paddle1.position.x + paddle1.width && 
            bottomSide >= paddle1.position.y && 
            topSide <= paddle1.position.y + paddle1.height)){

            if(paddle1.smash){
                this.velocity.x = -this.velocity.x * this.incrementSpeed;
                timer2 = 2;
                smashTimer();
            } else {
                this.velocity.x = -this.velocity.x;
            }

            console.log(paddle1.smash);

            paddle1.smash = false;

       } 

        // Paddle 2 collision
        if ((rightSide >= paddle2.position.x  && 
             bottomSide >= paddle2.position.y && 
             topSide <= paddle2.position.y + paddle2.height)){
            
            if(paddle2.smash){
                this.velocity.x = -this.velocity.x * this.incrementSpeed;
                timer2 = 2;
                smashTimer();
            } else {
                this.velocity.x = -this.velocity.x;
            }

            console.log(paddle2.smash);
            
            paddle2.smash = false;
       } 
        

        // Check collisions with the top and bottom margins of screen
        if (this.position.y + this.height + this.velocity.y >= canvas.height
            || this.position.y + this.velocity.y <= 0){
            this.velocity.y = -this.velocity.y;
        }

        if (this.position.x >= canvas.width) {
            document.querySelector("#gameOver").style.display = "flex"
            document.querySelector("#gameOver").innerHTML = "Red wins"
            gameOver = true;
        } 
        if (this.position.x + this.width <= 0) {
            document.querySelector("#gameOver").style.display = "flex"
            document.querySelector("#gameOver").innerHTML = "Blue wins"
            gameOver = true;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const paddle1 = new Paddle({
    position: {
        x: 10, 
        y: canvas.height / 2 - 50},
    colour: 'red',
    speed: 6
    })

const paddle2 = new Paddle({
    position: {
        x: canvas.width - 10 * 2, 
        y: canvas.height / 2 - 50},
    colour: 'blue',
    speed: 6
})

const ball = new Ball({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2 - 5,
    },
    speed: 3
})

paddle1.draw()
paddle2.draw()

let timer = 5
let timerId

function decreaseTimer() {

    if(timer>0){
        // This line creates the loop
        timerId = setTimeout(decreaseTimer, 1000)

        timer -= 1
        // This line of code changes the value/items in the HTML div into the provided value.
        document.querySelector('#countDown').innerHTML = timer - 1

        if (timer == 1) {
            document.querySelector("#countDown").innerHTML = "LET'S PONG!"
        }
    }

    if(timer==0){
        document.querySelector("#countDown").style.display = "none"
        startGame = true;
    }

}

decreaseTimer();

let timer2 = 2;

function smashTimer() {

    if(timer2>0){
        timerId = setTimeout(smashTimer, 1000)
        timer2 -= 1;
        smashCaptionStatus = true;
    }

    if (timer2 == 0){
        smashCaptionStatus = false;
    }
}


function movement() {

    if(paddle1.lastKey == 'w' && keys.w.pressed){
        paddle1.velocity.y = -paddle1.speed
    } else if (paddle1.lastKey == 's' && keys.s.pressed){
        paddle1.velocity.y = paddle1.speed
    }

    if(paddle2.lastKey == 'ArrowUp' && keys.ArrowUp.pressed){
        paddle2.velocity.y = -paddle2.speed
    } else if (paddle2.lastKey == 'ArrowDown' && keys.ArrowDown.pressed){
        paddle2.velocity.y = paddle2.speed
    }
}


function animate() {

    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    paddle1.draw()
    paddle2.draw()

    if (startGame && !gameOver){
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
animate();

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

// addEventListener('keydown', (event) => {
//     const speed = 6
//     switch (event.key) {
//       case 'w':
//         // go up
//         paddle1.velocity.y = -speed
//         break
//       case 's':
//         // go down
//         paddle1.velocity.y = speed
//         break

//       case 'ArrowUp':
//         // go up
//         paddle2.velocity.y = -speed
//         break
//       case 'ArrowDown':
//         // go down
//         paddle2.velocity.y = speed
//         break
//     }
// })

// addEventListener('keyup', (event) => {
//     const speed = 0
//     switch (event.key) {
//       case 'w':
//         // go up
//         paddle1.velocity.y = -speed
//         break
//       case 's':
//         // go down
//         paddle1.velocity.y = speed
//         break

//       case 'ArrowUp':
//         // go up
//         paddle2.velocity.y = -speed
//         break
//       case 'ArrowDown':
//         // go down
//         paddle2.velocity.y = speed
//         break
//     }
// })


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
