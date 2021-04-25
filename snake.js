const board_border = 'black';
const board_background = "white";
const snake_color = 'lightblue';
const snake_border = 'darkblue';


/* creating the snake 
 * the first coordinate represent the head of the snake
 * the x coordinate is at decrements 0f 10 to re present different parts of the snake body
 * the y coordinate for all parts always 200
 */

let snake = [ 
    {x: 200, y:200},
    {x: 190, y:200},
    {x: 180, y:200},
    {x: 170, y:200},
    {x: 160, y:200}
];
let changing_direction = false;
  /* Horizontal velocity */
  let dx = 10;
  /* Vertical velocity */
  let dy = 0;

const snake_board = document.getElementById("snakeboard");
/* drawing into a 2D space */
const snake_board_x = snake_board.getContext("2d");

startGame();

document.addEventListener("keydown",direction);

function startGame()
{
    if(ifGameEnded())
        return;
        changing_direction = false;
    setTimeout(function onTick()
    {
        clearBoard();
        moveSnake();
        drawSnake();
        startGame();
    },100)
}

/* drawing a border around the canvas */
function clearBoard()
{
    snake_board_x.fillStyle = board_background;
    snake_board_x.strokestyle = board_border;
    snake_board_x.fillRect(0,0,snake_board.width,snake_board.height);
    snake_board_x.strokeRect(0,0,snake_board.width,snake_board.height);
}

/* draqing the snake on the canvas */
function drawSnake()
{
    snake.forEach(drawSnakeParts);
}

/* drawing the snake parts */
function drawSnakeParts(snake_part)
{
    snake_board_x.fillStyle = snake_color;
    snake_board_x.strokestyle = snake_border;
    snake_board_x.fillRect(snake_part.x,snake_part.y,10,10);
    snake_board_x.strokeRect(snake_part.x,snake_part.y,10,10);
}

/* preventing the snake from moving infinitely */
function ifGameEnded()
{
    /* checking if the heaf of the snake collied with any of the body parts. */
    for(let i=4; i<snake.length; i++)
    {
        const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if(collided)
        {
            return true;
        }
    }
    /* checking the boundry walls */
        const hit_left_wall = snake[0].x < 0;
        const hit_top_wall = snake[0].y < 0;
        const hit_right_wall = snake[0].x > snake_board.width -10;
        const hit_bottom_wall = snake[0].y > snake_board.height -10;
        return hit_left_wall || hit_top_wall || hit_right_wall || hit_bottom_wall;
    
}




/* when pressing on the arrows to change the directions of the snake */
function direction(event)
{
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    //const PAUSE_KEY = 37;
    if(changing_direction)
        return;
    changing_direction = true;
    const key_pressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if(key_pressed === LEFT_KEY && !goingRight)
    {
        dx = -10;
        dy = 0;
    }
    if(key_pressed === UP_KEY && !goingDown)
    {
        dx = 0;
        dy = -10;
    }

    if(key_pressed === RIGHT_KEY && !goingLeft)
    {
        dx = 10;
        dy = 0;
    }
    if(key_pressed === DOWN_KEY && !goingUp)
    {
        dx = 0;
        dy = 10;
    }
}



function moveSnake()
{
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}








