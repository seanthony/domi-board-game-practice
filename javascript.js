const HEIGHT = 6;
const WIDTH = 6;
var SCORE = 0;
// makes board
var BOARD = [];
for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
        row.push({
            "domi": false,
            "ball": false
        });
    }
    BOARD.push(row.slice());
}

function drawGameBoard() {
    let html = '';
    for (let i = 0; i < BOARD.length; i++) { // for every row
        html += '<div class="row">';
        for (let j = 0; j < BOARD[i].length; j++) { // for every block in the row
            let className = 'light';
            if ((i + j) % 2) { // alternates the colors by checking to see if the sum of the two numbers is odd or even
                className = 'dark';
            }
            html += `<div class="square ${className}">`;
            if (BOARD[i][j].domi) {
                html += '<img class="game-piece" src="./assets/domi.jpg">'
            } else if (BOARD[i][j].ball) {
                html += '<img class="game-piece" src="./assets/ball.jpeg">'
            }
            html += '</div>'
        }
        html += '</div>';
    }
    document.getElementById('container').innerHTML = html;
    document.getElementById('score').innerText = SCORE;
}

// when dom is ready it will run this function
document.addEventListener("DOMContentLoaded", function () {
    let randI = Math.floor(Math.random() * BOARD.length);
    let randJ = Math.floor(Math.random() * BOARD[0].length);
    BOARD[randI][randJ].domi = true; // randomly chooses a starting point for domi
    let ballI = randI;
    let ballJ = randJ;
    while (ballI == randI && ballJ == randJ) {
        ballI = Math.floor(Math.random() * BOARD.length);
        ballJ = Math.floor(Math.random() * BOARD[0].length);
    }
    BOARD[ballI][ballJ].ball = true; // randomly chooses a starting point for the ball
    drawGameBoard();
});

function getCurrentPosition(key) {
    for (let i = 0; i < BOARD.length; i++) {
        for (let j = 0; j < BOARD.length; j++) {
            if (BOARD[i][j][key]) {
                return { "i": i, "j": j };
            }
        }
    }
}

function movePlayer(event) {
    let key = event.key;
    let moves = {
        'ArrowUp': { "i": -1, "j": 0 },
        'ArrowDown': { "i": 1, "j": 0 },
        'ArrowRight': { "i": 0, "j": 1 },
        'ArrowLeft': { "i": 0, "j": -1 }
    }
    if (key in moves) {
        let move = moves[key];
        let pos = getCurrentPosition("domi");
        let newI = Math.max(0, Math.min(pos.i + move.i, BOARD.length - 1));
        let newJ = Math.max(0, Math.min(pos.j + move.j, BOARD[newI].length - 1));
        BOARD[pos.i][pos.j].domi = false;
        BOARD[newI][newJ].domi = true;
        console.log(`${key}: (${pos.i}, ${pos.j}) -> (${newI}, ${newJ})`);
        let ballPosition = getCurrentPosition("ball");
        if (ballPosition.i == newI && ballPosition.j == newJ) {
            SCORE++;
            let ballI = newI;
            let ballJ = newJ;
            while (ballI == newI && ballJ == newJ) {
                ballI = Math.floor(Math.random() * BOARD.length);
                ballJ = Math.floor(Math.random() * BOARD[0].length);
            }
            BOARD[ballPosition.i][ballPosition.j].ball = false;
            BOARD[ballI][ballJ].ball = true;
        }
        drawGameBoard();
    }
}

document.addEventListener('keydown', movePlayer);

