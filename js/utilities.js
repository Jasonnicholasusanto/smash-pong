let timer = 5
let timerId

function decreaseTimer() {

    document.querySelector('#countDown').style.display = "flex"

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
    document.querySelector("#muteMusic").style.display = "inline-block";
    document.querySelector("#unmuteMusic").style.display = "none";
}


function pauseThemeSong() {
    document.querySelector("#click-audio").play();
    document.querySelector("#menu-theme-audio").pause();
    document.querySelector("#unmuteMusic").style.display = "inline-block";
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


function gameplayOption() {

    buttonClicked();

    document.querySelector("#landing").style.display = "none";

    document.querySelector("#landing-2").style.display = "block";

}

function pvpOption() {

    buttonClicked();

    document.querySelector("#scoreBoard").style.display = "block";
    document.querySelector("#landing-2").style.display = "none";
    document.querySelector("#menu-theme-audio").pause();

    decreaseTimer();
    game();

}

function pvrOption() {
    buttonClicked();

}

function rvrOption() {
    buttonClicked();
    
}

function backBtn() {
    buttonClicked();

    document.querySelector("#landing-2").style.display = "none";
    document.querySelector("#landing").style.display = "block";
}

function finishGameBtn() {

    buttonClicked();

    document.querySelector("#gameOver").style.display = "none";
    document.querySelector("#finishGameBtn").style.display = "none";
    
    endGame();
}

function endGame() {
    
    if(redPoints > bluePoints) {
        document.querySelector("#endGame").innerHTML = "RED WINS: " + redPoints + " to " + bluePoints;
    } else {
        document.querySelector("#endGame").innerHTML = "BLUE WINS: " + bluePoints + " to " + redPoints;
    }

    document.querySelector("#endGame").style.display = "flex";
    document.querySelector("#ending-page").style.display = "block";
}

function nextRound() {

    buttonClicked();

    document.querySelector("#gameOver").style.display = "none";
    document.querySelector("#next-round-btn").style.display = "none";

    timer = 5;
    decreaseTimer();
    game();
}

function backToMain() {
    buttonClicked(); 

    document.querySelector("#scoreBoard").style.display = "none";
    document.querySelector("#endGame").style.display = "none";
    document.querySelector("#ending-page").style.display = "none";

    window.location.reload();
}

function rematch() {
    buttonClicked();

    gameOver = false;
    startGame = false;

    document.querySelector("#endGame").style.display = "none";
    document.querySelector("#ending-page").style.display = "none";

    redPoints = 0;
    document.querySelector("#redScore").innerHTML = redPoints;

    bluePoints = 0;
    document.querySelector("#blueScore").innerHTML = bluePoints;

    timer = 5;
    decreaseTimer();
    game();
}

function buttonClicked() {
    document.querySelector("#click-audio").play();
}

