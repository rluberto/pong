//Initialize the elements
const canvas = document.getElementById("pongCanvas");
const game = canvas.getContext("2d");
const welcome = document.getElementById("welcome");
const gameOverC = document.getElementById("gameOver");

//Initialize the dynamic coordinates for the game elements
let paddleX = 250;
let ballX = 300;
let ballY = 200;
let ballXChange = 0;
let ballYChange = 1;
let iteration = 0;

//Initialize the game
function init(){
    canvas.style.display = "block";
    canvas.style.opacity = 0;
    welcome.style.opacity = 0;
    gameOverC.style.opacity = 0;
    setTimeout(function(){
        createRect(paddleX, 380, 100, 20, "black"); //Create the paddle in the initial position
        createCircle(ballX, ballY, 10, "blue"); //Create the ball in the initial position
        canvas.style.opacity = 1;
        welcome.style.display = "none";
        gameOverC.style.display = "none";
    }, 1000);
    setTimeout(function() {
        let gameLoop = setInterval(refreshCanvas, 1000/50); //Loop the game by refreshing the canvas 50 times per second
    }, 2000);
}

//Refresh the canvas
function refreshCanvas(){
    clearCanvas();
    updateBall();
    createRect(paddleX, 380, 100, 20, "black");
}

//Updates the position of the ball automatically
function updateBall(){
    if(ballY >= 370 && ballX >= paddleX && ballX <= paddleX+100){ //If the ball hits the paddle change directions
        ballYChange = 0 - ballYChange;
        ballXChange = Math.floor(Math.random() * 2) - Math.floor(Math.random() + 1 * 2);
    }
    if(ballY < 10){ //If the ball hits the top change directions
        ballYChange = 0 - ballYChange;
        iterationCheck();
    }
    if(ballX > 590 || ballX < 10){
        ballXChange = 0 - ballXChange;
    }
    if(ballY > 410){ //If the ball hits the bottom of the canvas end the game
        gameOver();
    }
    ballX += ballXChange;
    ballY += ballYChange;
    createCircle(ballX, ballY, 10, "blue");
}

function iterationCheck(){
    iteration++;
    if(iteration % 2 == 0){
        if(ballXChange > 0){
            ballXChange = ballXChange + .3;
        }
        else{
            ballXChange = ballXChange - .3;
        }
        if(ballYChange > 0){
            ballYChange = ballYChange + .3;
        }
        else{
            ballYChange = ballYChange - .3;
        }
    }
}

//Creates a rectangle
function createRect(x, y, w, h, color){
    game.fillStyle = color;
    game.fillRect(x, y, w, h);
}

//Creates a circle
function createCircle(x, y, r, color){
    game.fillStyle = color;
    game.beginPath();
    game.arc(x, y, r, 0, Math.PI*2, false);
    game.closePath();
    game.fill();
}

//Create the white overlay
function clearCanvas(){
    createRect(0, 0, 600, 400, "white");
}

document.onkeydown = function(event){
    if(event.keyCode == 37 && paddleX > 0){ //If the left key is pressed and not out of bounde
        paddleX-=10;
    }
    if(event.keyCode == 39 && paddleX < 500){ //If the right key is pressed and not out of bounds
        paddleX+=10;
    }
}

//End the game
function gameOver(){
    gameLoop = null;
    canvas.style.opacity = 0;
    gameOverC.style.opacity = 0;
    gameOverC.style.display = "block";
    setTimeout(function(){
        gameOverC.style.opacity = 1;
        canvas.style.display = "none";
    }, 1000);
}