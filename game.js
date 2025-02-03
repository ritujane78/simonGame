
let buttonColours = ["red","blue", "green","yellow"];
let gamePattern = [];
let userClickedPattern=[];
let gameStarted=false;
let level = 0;
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+ currentColour).removeClass("pressed");
    },100);
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}` );
    let randomVariable = Math.floor(Math.random()*4);
    let randomColour = buttonColours[randomVariable];
    gamePattern.push(randomColour);

    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    
}
function restartGame(){
    gamePattern = [];
    gameStarted = false;
    level = 0;
    setTimeout(()=>{
        $("body").removeClass("game-over");
    }, 200);

}
function checkAnswer(currentLevel) {
    console.log(currentLevel);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over. Press any key to restart!")
        restartGame();
    }
}
$(document).keypress(event => {
    if(!gameStarted){
        $("h1").text(`Level ${level}` );
        nextSequence();
        gameStarted=true;
    }
})


$(".btn").click(function(){
    let userChosenValue= $(this).attr("id");
    userClickedPattern.push(userChosenValue);
    animatePress(userChosenValue);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenValue);

})