import pawnFunctions from './functions/pawn.js';

var currentPlayer = 'white';
var totalMoves = 0;

function createStructure() {
    var board = document.getElementById('board');
    var ChessTable = document.createElement('table');
    var colNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (var i = 0; i < 8; i++) {
        var tr = document.createElement('tr');
        tr.id = `${colNames[i]}`;
        for (var j = 0; j < 8; j++) {
            var td = document.createElement('td');
            if (j == 0) {
                var displayChar = document.createElement('span');
                displayChar.setAttribute('class', 'displayChar');
                displayChar.innerHTML = `${colNames[i]}`;
                td.appendChild(displayChar);
            }
            if (i == 7) {
                var displayNum = document.createElement('span');
                displayNum.setAttribute('class', 'displayNum');
                displayNum.innerHTML = `${j + 1}`;
                td.appendChild(displayNum);
            }
            td.id = `${colNames[i]}${j}`;
            if ((i + j) % 2 == 0) {
                td.setAttribute('class', 'cell whitecell');
                tr.appendChild(td);
            }
            else {
                td.setAttribute('class', 'cell blackcell');
                tr.appendChild(td);
            }
        }
        ChessTable.appendChild(tr);
    }
    board.appendChild(ChessTable);
    ChessTable.setAttribute('cellspacing', '0');
}

function newGame() {
    createStructure();
    for (var i = 0; i < 8; i++) {
        var blackpawn = pawnFunctions.createPawn("blackpawn", i);
        var putting = document.getElementById(`b${i}`);
        putting.appendChild(blackpawn);
    }
    for (var i = 0; i < 8; i++) {
        var whitepawn = pawnFunctions.createPawn("whitepawn", i);
        var putting = document.getElementById(`g${i}`);
        putting.appendChild(whitepawn);
    }
}
newGame();

function changePlayer() {
    if (currentPlayer === 'white') {
        currentPlayer = 'black';
    } else {
        currentPlayer = 'white';
    }
}
function getPlayer() {
    return currentPlayer;
}

function addTotalMoves() {
    totalMoves += 1;
}

function getMoves() {
    return totalMoves;
}

const chessExport = {
    addTotalMoves,
    changePlayer,
    getMoves,
    getPlayer
}

export default chessExport;

