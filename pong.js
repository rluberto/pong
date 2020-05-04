//Initialize the canvas
const canvas = document.getElementById("pongCanvas");
const game = canvas.getContext("2d");

//Initialize the dynamic coordinates for the game elements
let paddleX = 250;
let ballX = 300;
let ballY = 200;
let ballXChange = 0;
let ballYChange = 2;

init(); //Initialize the game
let gameLoop = setInterval(refreshCanvas, 1000/50); //Loop the game by refreshing the canvas 50 times per second

//Initialize the game
function init(){
    createRect(paddleX, 380, 100, 20, "black"); //Create the paddle in the initial position
    createCircle(ballX, ballY, 10, "brown"); //Create the ball in the initial position
}

//Refresh the canvas
function refreshCanvas(){
    clearCanvas();
    updateBall();
    createRect(paddleX, 380, 100, 20, "black");
}

//Updates the position of the ball automatically
function updateBall(){
    if(ballY >= 380 && ballX >= paddleX && ballX <= paddleX+100){ //If the ball hits the paddle change directions
        ballYChange = -2;
    }
    if(ballY > 410){ //If the ball goes outside of the canvas end the game
        gameOver();
    }
    ballX += ballXChange;
    ballY += ballYChange;
    createCircle(ballX, ballY, 10, "brown");
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

//Creates text
function createText(text, x, y, color){
    game.fillStyle = color;
    game.font = "75px fantasy";
    game.fillText(text, x, y);
}

function clearCanvas(){
    createRect(0, 0, 600, 400, "white");
}

document.onkeydown = function(event){
    if(event.keyCode == 37 && paddleX > 0){ //If the left key is pressed and not out of bounde
        paddleX-=8;
    }
    if(event.keyCode == 39 && paddleX < 500){ //If the right key is pressed and not out of bounds
        paddleX+=8;
    }
}