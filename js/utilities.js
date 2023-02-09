let timer = 5
let timerId

function decreaseTimer() {

    if(timer>0){
        // This line creates the loop
        timerId = setTimeout(decreaseTimer, 1000)

        timer -= 1
        // This line of code changes the value/items in the HTML div into the provided value.
        document.querySelector('#countDown').innerHTML = timer - 1

        if(timer-2 >= 0){
            document.querySelector("#countdown-audio").play();
        }

        if (timer == 1) {
            document.querySelector("#countDown").innerHTML = "LET'S PONG!"
            document.querySelector("#countdown-start-audio").play();
        }
    }

    if(timer==0){
        document.querySelector("#countDown").style.display = "none"
        startGame = true;
    }

}

function playThemeSong() {
    document.querySelector("#click-audio").play();
    document.querySelector("#menu-theme-audio").play();
    document.querySelector("#muteMusic").style.display = "flex";
    document.querySelector("#unmuteMusic").style.display = "none";
}

function pauseThemeSong() {
    document.querySelector("#click-audio").play();
    document.querySelector("#menu-theme-audio").pause();
    document.querySelector("#unmuteMusic").style.display = "flex";
    document.querySelector("#muteMusic").style.display = "none";
}



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

    buttonClicked();

    document.querySelector("#startButton").style.display = "none";
    document.querySelector("#landing").style.display = "none";

    document.querySelector("#menu-theme-audio").pause();

    decreaseTimer();
    animate();
}

function buttonClicked() {
    document.querySelector("#click-audio").play();
}