const canvas = document.getElementById('snake');
const contex = canvas.getContext("2d");
const box = 25;

//Background
contex.fillStyle = "#3f3f44";
contex.fillRect(0,0,600,3*box);

contex.fillStyle = "#8ccbbe";
contex.fillRect(0,3*box,600,box);
contex.fillRect(0,575,600,box);
contex.fillRect(0,3*box,box,600);
contex.fillRect(575,3*box,box,600);

//Image
const appleImage = new Image();
appleImage.src = "img/apple.png"

const bgImage = new Image();
bgImage.src = "img/BG.png"

const headerImg = new Image();
headerImg.src = "img/3.png"


//Snake
let snake = [];
snake[0] = {
    x : 11 * box,
    y : 13 * box
}

//Apple
let apple = {
    x : Math.floor(Math.random()*22 + 1) * box,
    y : Math.floor(Math.random()*19 + 4) * box
}

//Score
let score = 0;

//Audio
const eatApple = new Audio();
eatApple.src ="audio/apple.mp3"

const dead = new Audio();
dead.src ="audio/dead.flac"

const theme = new Audio();
theme.src ="audio/home.mp3"


//Snake Movement
document.addEventListener("keydown",direction);

let snakeDirection;

function direction (event) {
    if (event.keyCode === 37 && snakeDirection !== "RIGHT") {
        snakeDirection = "LEFT"
    } else if (event.keyCode === 38 && snakeDirection !== "DOWN") {
        snakeDirection = "UP"
    } else if (event.keyCode === 39 && snakeDirection !== "LEFT") {
        snakeDirection = "RIGHT"
    } else if (event.keyCode === 40 && snakeDirection !== "UP") {
        snakeDirection = "DOWN"
    } 
}

//Check snake crash to body/not
function crash (head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        } 
    }
    return false;
}

//Draw the snake
function draw () {
    theme.play();
    contex.drawImage(bgImage, box, 4*box);
    contex.drawImage(headerImg, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        
        if (i === 0) {
            contex.fillStyle = "black"; 
        } else {
            contex.fillStyle = "green"; 
        }
        contex.fillRect(snake[i].x, snake[i].y, box, box);
    }

    contex.drawImage(appleImage, apple.x, apple.y);

    //Snake head before
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //Snake direction
    if (snakeDirection === "LEFT") {
        snakeX -= box;
    } else if (snakeDirection === "UP") {
        snakeY -= box;
    } else if (snakeDirection === "RIGHT") {
        snakeX += box;
    } else if (snakeDirection === "DOWN") {
        snakeY += box;
    }

    //Snake eats the apple
    if (snakeX === apple.x && snakeY === apple.y) {
        score++;
        eatApple.play();
        //Make new food
        apple = {
            x : Math.floor(Math.random()*22 + 1) * box,
            y : Math.floor(Math.random()*19 + 4) * box
        } 
    } else {
        //Remove tail
        snake.pop();
    }
    
    //Snake head after
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    //Gameover
    if (snakeX < box || snakeX > 22 * box || snakeY < 4 * box || snakeY > 22 * box || crash(newHead, snake)) {
        clearInterval(refreshGame);
        theme.pause();
        dead.play();
        alert(`GAME OVER! Your Score is ${score}!`);
    }

    snake.unshift(newHead);

    //Score board
    contex.fillStyle = "white";
    contex.font = "40px arial";
    contex.fillText(score, 6*box, 2.1*box)
}

//Game speed
let refreshGame = setInterval(draw, 100);