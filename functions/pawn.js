import globalFunctions from './main.js';
import chessExport from "../chess.js";


function clickPawn(pawnId) {
    globalFunctions.clearAll();
    if (pawnId.charAt(0) === 'b' && chessExport.getPlayer() === 'white') {
        console.log('Not your turn');
        return;
    }
    if (pawnId.charAt(0) === 'w' && chessExport.getPlayer() === 'black') {
        console.log('Not your turn');
        return;
    }

    const pawn = document.getElementById(pawnId);
    const pawnCurrent = pawn.parentNode.id;
    const currentCol = parseInt(pawnCurrent.charAt(1));
    const currentRow = pawnCurrent.charAt(0);
    console.log(`Pawn ${pawnId} is in ${currentRow}${currentCol}`);

    let direction = 1;
    if ((currentRow === 'b' && chessExport.getPlayer() === 'black') || (currentRow === 'g' && chessExport.getPlayer() === 'white')) {
        direction += 1;
    }
    const cutingRow = (chessExport.getPlayer() === 'white') ? -1 : 1;
    var idChar = String.fromCharCode(currentRow.charCodeAt(0) + cutingRow);
    var canCutId = `${idChar}${currentCol - 1}`;
    var cancut = document.getElementById(canCutId);
    if (currentCol - 1 < 0) cancut = null;
    var canCutId2 = `${idChar}${currentCol + 1}`;
    var cancut2 = document.getElementById(canCutId2);
    if (currentCol + 1 > 7) cancut2 = null;
    if ((cancut != null) && (cancut.querySelector('i') !== null)) {
        globalFunctions.toCut(pawnId, canCutId);
    }
    if ((cancut2 != null) && (cancut2.querySelector('i') !== null)) {
        globalFunctions.toCut(pawnId, canCutId2);
    }

    let tobreak = false;
    if (chessExport.getPlayer() === 'white') {
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
                globalFunctions.toMove(pawnId, nextSquareId);
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
                globalFunctions.toMove(pawnId, nextSquareId);
            }
        }
    }

    if (tobreak) {
        return;
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

const pawnFunctions = {
    createPawn,
    clickPawn
};


export default pawnFunctions;