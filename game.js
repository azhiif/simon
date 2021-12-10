var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(nextSequence);

function nextSequence() {
  if (!started) {

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    userClickedPattern = [];
    level++;

  }
}

$(".btn").click(function() {
  var buttonClicked = this.id;
  userClickedPattern.push(buttonClicked);

  playSound(buttonClicked);
  animatePress(buttonClicked);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(buttonClicked) {
  var audio = new Audio("sounds/" + buttonClicked + ".mp3");
  audio.play();
}

function animatePress(buttonClicked) {


  $("#" + buttonClicked).addClass("pressed");


  setTimeout(function() {


    $("#" + buttonClicked).removeClass("pressed");

  }, 100);
}


function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {


      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {


    errorMusic();

    changeBackground();

    startOver();
  }

}

function errorMusic() {

  var errorMusic = new Audio("sounds/wrong.mp3");

  errorMusic.play();
}


function changeBackground() {

  $("body").addClass("game-over");

  setTimeout(function() {

    $("body").removeClass("game-over");

  }, 200);
}



function startOver() {

  $("#level-title").html('<h1 id="level-title">Game Over <br><br> Press Any Key to Restart </h1>');

  gamePattern = [];

  level = 0;

  started = false;

}
