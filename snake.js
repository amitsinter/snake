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

  /* Horizontal velocity */
  let dx = 10;
  /* Vertical velocity */
  let dy = 0;

const snake_board = document.getElementById("snakeboard");
/* drawing into a 2D space */
const snake_board_x = snake_board.getContext("2d");

startGame();


function startGame()
{
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

function moveSnake()
{
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}


