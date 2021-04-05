var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

$('.btn').click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userChosenColor.length) - 1);
})

function playSound(randomChosenColor) {
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('.' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('.' + currentColor).removeClass('pressed');
    }, 100);
}

$(document).keypress(function () {
    if (started == false) {
        started = true;
        $("h1").text("Level 0");
        nextSequence();
    }
})


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else {
        console.log("Wrong");
        $('body').addClass('game-over');
        $('h1').text("Game Over!, Press any Key to Restart!");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 100);
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
    userClickedPattern = [];
}