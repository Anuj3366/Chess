import chessExport from "../chess.js";

function clearAll() {
    let allCells = document.getElementsByClassName('cell');
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].classList.remove('toMove');
        allCells[i].classList.remove('toCut');
    }
}




function move(current, towards, currentMoves) {
    if (currentMoves === chessExport.getMoves()) {
        chessExport.addTotalMoves();
        console.log(`this move is ${chessExport.getMoves()}`);
        console.log(`Moving ${current} to ${towards}`);
        const currentSquare = document.getElementById(current);
        const toward = document.getElementById(towards);
        toward.appendChild(currentSquare);
        chessExport.changePlayer();
    }
    else {
        console.log(`this is a waste event listener , Removing it`);
    }
    clearAll();
}

const moveClickListener = function (current, towards) {
    return function (event) {
        console.log(`${current} move clicked`);
        move(current, towards, chessExport.getMoves());
        const toward = document.getElementById(towards);
        toward.removeEventListener('click', moveClickListener(current, towards));
    };
};

function toMove(current, towards) {
    const toward = document.getElementById(towards);
    toward.classList.add('toMove');
    const moveListener = moveClickListener(current, towards);
    toward.addEventListener('click', moveListener);
}





function cut(current, towards, currentMoves) {
    if (chessExport.getMoves() === currentMoves) {
        chessExport.addTotalMoves();
        console.log(`this move is ${chessExport.getMoves()}`);
        console.log(`cutting from ${current} to ${towards}`);
        const currentSquare = document.getElementById(current);
        const toward = document.getElementById(towards);
        const pieceToRemove = toward.querySelector('i');
        if (pieceToRemove) {
            toward.removeChild(pieceToRemove);
        }
        toward.appendChild(currentSquare);
        chessExport.changePlayer();
    }
    else {
        console.log(`this is a waste event listener , Removing it`);
    }
    clearAll();
}

const cutClickListener = function (current, towards) {
    return function () {
        console.log(`${current} cut clicked`);
        cut(current, towards, chessExport.getMoves());
        const toward = document.getElementById(towards);
        toward.removeEventListener('click', cutClickListener(current, towards));
    };
};


function toCut(current, towards) {
    const toward = document.getElementById(towards);
    const towardPiece = toward.querySelector('i');
    if (!towardPiece.className.includes(chessExport.getPlayer())) {
        console.log(`toward: ${towards} and current: ${current}`);
        toward.classList.add('toCut');
        toward.addEventListener('click', cutClickListener(current, towards));
    }
}



const globalFunctions = {
    toMove,
    toCut,
    clearAll
};


export default globalFunctions;