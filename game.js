var userClickedPattern = [];
var gamePattern = [];
var started = 'false';
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level"+level);

    var ranNumber = Math.random();
    ranNumber = ranNumber*4;
    ranNumber = Math.floor(ranNumber);
    var randomChosenColour = buttonColours[ranNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
    
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(
                nextSequence(),
                1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}