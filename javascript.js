const HEIGHT = 6;
const WIDTH = 6;

// makes board
var BOARD = [];
for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (var j = 0; j < WIDTH; j++) {
        row.push(false);
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
            if (BOARD[i][j]) {
                html += '<img class="game-piece" src="./assets/domi.jpg">'
            }
            html += '</div>'
        }
        html += '</div>';
    }
    console.log('\n\nCurrent Board:\n' + BOARD.join('\n')); // draws the board model in the console
    document.getElementById('container').innerHTML = html;
}

// when dom is ready it will run this function
document.addEventListener("DOMContentLoaded", function () {
    BOARD[Math.floor(Math.random() * HEIGHT)][Math.floor(Math.random() * WIDTH)] = true; // randomly chooses a starting point
    drawGameBoard();
});
