createStructure();


function createStructure() {
    var board = document.getElementById('board');
    var rowName = "abcdefgh";
    for (var i = 0; i < 8; i++) {
        var row = document.createElement('div');
        row.className = ' row';
        row.id = `${rowName.charAt(i)}`;

        for (var j = 0; j < 8; j++) {
            var cell = document.createElement('div');
            if (i == 0) {
                var displayNum = document.createElement('span');
                displayNum.className = ' displayNum';
                displayNum.innerHTML = `${j}`;
                cell.appendChild(displayNum);
            }

            if ((i + j) % 2 === 0) {
                cell.className = ' cellblack';
            }
            else {
                cell.className = ' cell';
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
        var displayChar = document.createElement('span');
        displayChar.className = ' displayChar';
        displayChar.innerHTML = `${rowName.charAt(i)}`;
        row.appendChild(displayChar);
        board.appendChild(row);
    }
}

function whitepawn(i) {
    var pawn = document.createElement('i');
    pawn.className = ' fas fa-chess-pawn';
    pawn.className += ' whitepawn';
    pawn.id = `w${i}`;
    return pawn;
}

function blackpawn(i) {
    var pawn = document.createElement('i');
    pawn.className = ' fa-solid fa-chess-pawn';
    pawn.className += ' blackpawn';
    pawn.id = `b${i}`;
    return pawn;
}

function black_pawn_move(id) {
    console.log('black pawn move called', id.charAt(0) + (parseInt(id.charAt(1))) + id.charAt(2));
    var tomove = document.getElementById(`${parseInt(id.charAt(1)) - 1}${id.charAt(2)}`);
    tomove.className += ' darkcell';
    tomove.addEventListener('click', function () {
        console.log('click to move');
        tomove.className -= ' darkcell';
        move(id.charAt(0), tomove.id);

    });
    if (id.charAt(0) == 6) {
        var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) - 2}${id.charAt(2)}`);
        tomove2.className += ' darkcell';
        tomove2.addEventListener('click', function () {
            console.log('click to move');
            tomove2.className -= ' darkcell';
            tomove.className -= ' darkcell';
            move(id.charAt(0), tomove2.id);
        });
    }
    document.addEventListener('click', function () {
        console.log('elsewhere clicked');
        tomove.className -= ' darkcell';
        if (id.charAt(0) == 6) {
            var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) - 2}${id.charAt(2)}`);
            tomove2.className -= ' darkcell';
        }
    });
}

function white_pawn_move(id) {
    console.log('white pawn move called', id.charAt(0) + (parseInt(id.charAt(1))) + id.charAt(2));
    var tomove = document.getElementById(`${parseInt(id.charAt(1)) + 1}${id.charAt(2)}`);
    tomove.className = ' darkcell';
    tomove.addEventListener('click', function () {
        console.log('click to move');
        tomove.className -= ' darkcell';
        move(id.charAt(0), tomove.id);

    });
    if (id.charAt(0) == 6) {
        var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) + 2}${id.charAt(2)}`);
        tomove2.className += ' darkcell';
        tomove2.addEventListener('click', function () {
            console.log('click to move');
            tomove2.className -= ' darkcell';
            tomove.className -= ' darkcell';
            move(id.charAt(0), tomove2.id);
        });
    }
    document.addEventListener('click', function () {
        console.log('elsewhere clicked');
        tomove.className -= ' darkcell';
        if (id.charAt(0) == 6) {
            var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) + 2}${id.charAt(2)}`);
            tomove2.className -= ' darkcell';
        }
    });
}


var blackpawns = document.querySelectorAll('.blackpawn');
blackpawns.forEach(function (pawn) {
    pawn.addEventListener('click', function () {
        console.log('blackpawns clicked');
        black_pawn_move(pawn.id);
    });
});
var whitepawns = document.querySelectorAll('.whitepawn');
whitepawns.forEach(function (pawn) {
    pawn.addEventListener('click', function () {
        console.log('whitepawns clicked');
        white_pawn_move(pawn.id);
    });
});






function move(i, j) {
    var cell = document.getElementById(`${i}`);
    var cell2 = document.getElementById(`${j}`);
    cell2.appendChild(cell.innerHTML);
    cell.innerHTML = '';
}
