createStructure();


function createStructure() {
    let board = document.getElementById('board');
    let rowName = "abcdefgh";
    for (let i = 0; i < 8; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = `${rowName.charAt(i)}`;

        for (let j = 0; j < 8; j++) {
            let cell = document.createElement('div');
            if (i == 0) {
                let displayNum = document.createElement('span');
                displayNum.className = 'displayNum';
                displayNum.innerHTML = `${j}`;
                cell.appendChild(displayNum);
            }

            if ((i + j) % 2 === 0) {
                cell.className = 'cellblack';
            }
            else {
                cell.className = 'cell';
            }
            cell.id = `${j}${rowName.charAt(i)}`;
            row.appendChild(cell);

            if (j == 1) {
                cell.appendChild(whitepawn(cell.id));
    
            }
            if (j == 6) {
                cell.appendChild(blackpawn(cell.id));
            }

        }
        let displayChar = document.createElement('span');
        displayChar.className = 'displayChar';
        displayChar.innerHTML = `${rowName.charAt(i)}`;
        row.appendChild(displayChar);
        board.appendChild(row);
    }
}

function blackpawn(i) {
    let pawn = document.createElement('i');
    pawn.className = 'fas fa-chess-pawn';
    pawn.className += ' blackpawn';
    pawn.id = `${i}`;
    return pawn;
}
function whitepawn(i) {
    let pawn = document.createElement('i');
    pawn.className = 'fas fa-chess-pawn';
    pawn.className += ' whitepawn';
    pawn.id = `${i}`;
    return pawn;
}
function black_pawn_move(id) {
    console.log('black pawn move called');
    let tomove = document.getElementById(`${id.charAt(0) - 1}`);
    tomove.className += 'darkcell';
    tomove.EventListener('click', function () {
        console.log('click to move');
        tomove2.className -= 'darkcell';
        tomove.className -= 'darkcell';
        move(id.charAt(0), tomove.id);

    });
    if (id.charAt(0) == 6) {
        let tomove2 = document.getElementById(`${id.charAt(0) - 2}`);
        tomove2.className += 'darkcell';
        tomove2.EventListener('click', function () {
            console.log('click to move');
            tomove2.className -= 'darkcell';
            tomove.className -= 'darkcell';
            move(id.charAt(0), tomove2.id);
        });
    }
    document.EventListener('click', function () {
        console.log('elseware clicked');
        tomove.className -= 'darkcell';
        if (id.charAt(0) == 6) {
            tomove2.className -= 'darkcell';
        }
    });
}
function white_pawn_move(id) {
    console.log('white pawn move called');
    let tomove = document.getElementById(`${id.charAt(0) + 1}`);
    tomove.className += 'darkcell';
    tomove.EventListener('click', function () {
        console.log('click to move');
        tomove2.className -= 'darkcell';
        tomove.className -= 'darkcell';
        move(id.charAt(0), tomove.id);

    });
    if (id.charAt(0) == 6) {
        let tomove2 = document.getElementById(`${id.charAt(0) + 2}`);
        tomove2.className += 'darkcell';
        tomove2.EventListener('click', function () {
            console.log('click to move');
            tomove2.className -= 'darkcell';
            tomove.className -= 'darkcell';
            move(id.charAt(0), tomove2.id);
        });
    }
    document.EventListener('click', function () {
        console.log('elseware clicked');
        tomove.className -= 'darkcell';
        if (id.charAt(0) == 6) {
            tomove2.className -= 'darkcell';
        }
    });
}


var pawns = document.querySelectorAll('.pawn');
pawns.EventListener('click', function () {
    console.log('pawn clicked');
    black_pawn_move(pawns.id);
});








function move(i, j) {
    let cell = document.getElementById(`${i}`);
    let cell2 = document.getElementById(`${j}`);
    cell2.appendChild(cell.innerHTML);
    cell.innerHTML = '';
}
