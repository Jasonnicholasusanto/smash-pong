class Paddle {
    constructor({position, colour, speed, gameOption}) {
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
        this.gameOption = gameOption;
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

            document.querySelector("#hit-bat-audio").play();

            if(paddle1.smash){
                document.querySelector("#smash-audio").play();
                this.velocity.x = -this.velocity.x * this.incrementSpeed;
                timer2 = 2;
                smashTimer();
            } else {
                this.velocity.x = -this.velocity.x;
            }

            paddle1.smash = false;

       } 

        // Paddle 2 collision
        if ((rightSide >= paddle2.position.x  && 
             bottomSide >= paddle2.position.y && 
             topSide <= paddle2.position.y + paddle2.height)){

            document.querySelector("#hit-bat-audio").play();
            
            if(paddle2.smash){
                document.querySelector("#smash-audio").play();
                this.velocity.x = -this.velocity.x * this.incrementSpeed;
                timer2 = 2;
                smashTimer();
            } else {
                this.velocity.x = -this.velocity.x;
            }
            
            paddle2.smash = false;
       } 
        

        // Check collisions with the top and bottom margins of screen
        if (this.position.y + this.height + this.velocity.y >= canvas.height
            || this.position.y + this.velocity.y <= 0){
            this.velocity.y = -this.velocity.y;
            document.querySelector("#wall-audio").play();
        }

        // Check collisions with the left and right margins of screen
        if (this.position.x >= canvas.width) {
            redPoints += 1;
            document.querySelector("#redScore").innerHTML = redPoints;
            document.querySelector("#gameOver").style.display = "flex";
            document.querySelector("#gameOver").innerHTML = "Red Point!";
            document.querySelector("#point-audio").play();
            gameOver = true;
        } 

        if (this.position.x + this.width <= 0) {
            bluePoints += 1;
            document.querySelector("#blueScore").innerHTML = bluePoints;
            document.querySelector("#gameOver").style.display = "flex";
            document.querySelector("#gameOver").innerHTML = "Blue Point!";
            document.querySelector("#point-audio").play();
            gameOver = true;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class BeginnerAI extends Paddle {
    constructor(params) {
        
    }
}