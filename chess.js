let currentPlayer = 'white';

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

    // making for pawns only
    for (var i = 0; i < 8; i++) {
        var blackpawn = createPawn("blackpawn", i);
        var putting = document.getElementById(`b${i}`);
        putting.appendChild(blackpawn);
    }
    for (var i = 0; i < 8; i++) {
        var whitepawn = createPawn("whitepawn", i);
        var putting = document.getElementById(`g${i}`);
        putting.appendChild(whitepawn);
    }
}

function createPawn(className, i) {
    var pawn = document.createElement('i');
    pawn.className = `fas fa-chess-pawn ${className}`;
    pawn.id = `${className}${i}`;
    pawn.addEventListener('click', function () {
        console.log(`${pawn.id} clicked`);
        clickPawn(`${className}${i}`);
    });
    return pawn;
}

function clickPawn(pawnId) {
    clearAll();
    if (pawnId.charAt(0) === 'b' && currentPlayer === 'white') {
        alert('Not your turn');
        return;
    }
    if (pawnId.charAt(0) === 'w' && currentPlayer === 'black') {
        alert('Not your turn');
        return;
    }

    const pawn = document.getElementById(pawnId);
    const pawnCurrent = pawn.parentNode.id;
    const currentCol = parseInt(pawnCurrent.charAt(1));
    const currentRow = pawnCurrent.charAt(0);
    console.log(`Pawn ${pawnId} is in ${currentRow}${currentCol}`);

    let direction = 1;
    if ((currentRow === 'b' && currentPlayer === 'black') || (currentRow === 'g' && currentPlayer === 'white')) {
        direction += 1;
    }
    const cutingRow = (currentPlayer === 'white') ? -1 : 1;
    var idChar = String.fromCharCode(currentRow.charCodeAt(0) + cutingRow);
    var canCutId = `${idChar}${currentCol - 1}`;
    var cancut = document.getElementById(canCutId);
    if (currentCol - 1 < 0) cancut = null;
    var canCutId2 = `${idChar}${currentCol + 1}`;
    var cancut2 = document.getElementById(canCutId2);
    if (currentCol + 1 > 7) cancut2 = null;
    if ((cancut != null) && (cancut.querySelector('i') !== null)) {
        toCut(pawnId, canCutId);
    }
    if ((cancut2 != null) && (cancut2.querySelector('i') !== null)) {
        toCut(pawnId, canCutId2);
    }

    let tobreak = false;
    if (currentPlayer === 'white') {
        for (var i = 0; i < direction; i++) {
            let idChar = String.fromCharCode(currentRow.charCodeAt(0) - i - 1);
            const nextSquareId = `${idChar}${currentCol}`;
            const nextSquare = document.getElementById(nextSquareId);
            const hasChildIElement = nextSquare.querySelector('i') !== null;
            if (hasChildIElement) {
                console.log(`Cannot move to ${nextSquareId}, square is occupied.`);
                tobreak = true;
                break;
            }
            else {
                console.log(`Can move to ${nextSquareId}`);
                toMove(pawnId, nextSquareId);
            }
        }
    }
    else {
        for (var i = 0; i < direction; i++) {
            let idChar = String.fromCharCode(currentRow.charCodeAt(0) + i + 1);
            const nextSquareId = `${idChar}${currentCol}`;
            const nextSquare = document.getElementById(nextSquareId);
            const hasChildIElement = nextSquare.querySelector('i') !== null;
            if (hasChildIElement) {
                console.log(`Cannot move to ${nextSquareId}, square is occupied.`);
                tobreak = true;
                break;
            }
            else {
                console.log(`Can move to ${nextSquareId}`);
                toMove(pawnId, nextSquareId);
            }
        }
    }

    if (tobreak) {
        return;
    }
}


function toMove(current, towards) {
    const currentSquare = document.getElementById(current).parentNode.id;
    const toward = document.getElementById(towards);
    toward.classList.add('toMove');
    const clickListener = function () {
        console.log(`${current} move clicked`);
        move(currentSquare, towards);
        toward.removeEventListener('click', clickListener);
    };
    toward.addEventListener('click', clickListener);
}

function move(current, towards) {
    console.log(`Moving ${current} to ${towards}`);
    const currentSquare = document.getElementById(current);
    const currentPiece = currentSquare.querySelector('i');
    const toward = document.getElementById(towards);
    toward.appendChild(currentPiece);
    if (currentPlayer === 'white') {
        currentPlayer = 'black';
    } else {
        currentPlayer = 'white';
    }
    
    clearAll();
}



function toCut(current, towards) {
    const currentSquare = document.getElementById(current).parentNode.id;
    const toward = document.getElementById(towards);
    toward.classList.add('toCut');
    const clickListener = function () {
        console.log(`${current} cut clicked`);
        cut(currentSquare, towards);
        toward.removeEventListener('click', clickListener);
    };
    toward.addEventListener('click', clickListener);
}

function cut(current, towards) {
    console.log(`cutting from ${current} to ${towards}`);
    const currentSquare = document.getElementById(current);
    const currentPiece = currentSquare.querySelector('i');
    const toward = document.getElementById(towards);
    const pieceToRemove = toward.querySelector('i');
    if (pieceToRemove) {
        toward.removeChild(pieceToRemove);
    }
    toward.appendChild(currentPiece);

    if (currentPlayer === 'white') {
        currentPlayer = 'black';
    } else {
        currentPlayer = 'white';
    }
    clearAll();
}



function clearAll() {
    var allCells = document.getElementsByClassName('cell');
    for (var i = 0; i < allCells.length; i++) {
        allCells[i].classList.remove('toMove');
        allCells[i].classList.remove('toCut');
    }
}

newGame();
