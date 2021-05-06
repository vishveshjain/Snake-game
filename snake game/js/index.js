//Sounds
// const bgSound = new Audio('bgsound.mp3');
// const moveSound = new Audio('directionChange.mp3');
// const foodSound = new Audio('directionChange.mp3');
// const gameOverSound = new Audio('gameover.mp3');

let snakeVelocity = { x: 0, y: 0 }
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    { x: 15, y: 15 }
]
let food = { x: 10, y: 10 };
let score = 0;

function main(ctime) {
    let frameId = window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    // 1: updating the snake array & food
    if (isCollide(snakeArr)) {
        window.cancelAnimationFrame(main);
        // gameOverSound.play();
        // bgSound.pause();
        snakeVelocity = { X: 0, y: 0 };
        alert("Game Over");
        snakeArr = [{ x: 15, y: 15 }]
        score = 0;
    }

    // If snake has eaten the food, increment the scor and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        // foodSound.play();
        score += 1;
        if(score > highScore){
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue))
            highScoreBox.innerHTML = "High Score : " + score;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + snakeVelocity.x, y: snakeArr[0].y + snakeVelocity.y });
        let min = 2;
        let max = 16;
        food = {x: Math.round(Math.random() * (max - min) + min), y: Math.round(Math.random() * (max - min) + min)}
    }

    //Moving the snake;
    for(let i = snakeArr.length - 2; i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;

    // 2: display the snake.
    board.innerHTML = "";
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Dislplay the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function isCollide(snake) {
    //If bump into itself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if (snake[0].x <= 0 || snake[0].x >=20 || snake[0].y < 0 || snake[0].y >=20) {
    return true;
    }
}

//Game flow start from here.
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue))
}else{
    highScoreValue = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score : " + highScore;
}
window.requestAnimationFrame(main);
window.requestAnimationFrame(() => {
    // bgSound.play()
    // bgSound.volume = 0.2;
});

window.addEventListener('keydown', (e) => {
    // moveSound.play();
    snakeVelocity = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            console.log("Up");
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;
        case "ArrowDown":
            console.log("Down");
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;
        case "ArrowLeft":
            console.log("Left");
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;
        case "ArrowRight":
            console.log("Rights");
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
    }

});