const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;

let snake = [
    { x: 200, y: 200 }
];

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let score = 0;

// Управление
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }

    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

// Проверка столкновения
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Главная функция игры
function draw() {

    // Очистить поле
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Нарисовать змейку
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i === 0) ? "lime" : "green";

        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Нарисовать еду
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Координаты головы
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Движение
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Съедание еды
    if (snakeX === food.x && snakeY === food.y) {

        score++;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } else {

        snake.pop();

    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Конец игры
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvasSize ||
        snakeY >= canvasSize ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Игра окончена!\nОчки: " + score);
        return;
    }

    snake.unshift(newHead);

    // Очки
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Очки: " + score, 10, 25);
}

// Скорость игры
let game = setInterval(draw, 120);