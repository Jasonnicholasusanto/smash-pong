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

// decreaseTimer();


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


function startGameBtn() {

    document.querySelector("#startButton").style.display = "none";
    document.querySelector("#landing").style.display = "none";

    decreaseTimer();
    animate();
}