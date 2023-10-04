newGame();


function createStructure() {
    var board = document.getElementById('board');
    var ChessTable = document.createElement('table');
    var rowNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (var i = 0; i < 8; i++) {
        var tr = document.createElement('tr');
        tr.id = `${rowNames[i]}`;
        for (var j = 0; j < 8; j++) {
            var td = document.createElement('td');
            if (j == 0) {
                var displayChar = document.createElement('span');
                displayChar.setAttribute('class', 'displayChar');
                displayChar.innerHTML = `${rowNames[i]}`;
                td.appendChild(displayChar);
            }
            if (i == 7) {
                var displayNum = document.createElement('span');
                displayNum.setAttribute('class', 'displayNum');
                displayNum.innerHTML = `${j + 1}`;
                td.appendChild(displayNum);
            }
            td.id = `${rowNames[i]}${j}`;
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
        var blackpawn = blackpawn(i);
        var putting = document.getElementById(`b${i}`);
        putting.appendChild(blackpawn);
    }
    for (var i = 0; i < 8; i++) {
        var whilepawn = whilepawn(i);
        var putting = document.getElementById(`b${i}`);
        putting.appendChild(whilepawn);
    }
}

function blackpawn(i) {
    var pawn = document.createElement('i');
    pawn.className = ' fa-solid fa-chess-pawn';
    pawn.className += ' ';
    pawn.id = `b${i}`;
    pawn.addEventListener('click', function () {
        console.log('blackpawns clicked');
        black_pawn_move(pawn.id);
    });
    return pawn;
}

// function black_pawn_move(id) {
//     console.log('black pawn move called', id.charAt(0) + (parseInt(id.charAt(1))) + id.charAt(2));
//     var current = document.getElementById(`${id.charAt(1)}${id.charAt(2)}`);
//     var tomove = document.getElementById(`${id.charAt(1)}${parseInt(id.charAt(2)) - 1}`);
//     tomove.className += ' clickcell';
//     click_clickcell(current, tomove);
//     if (id.charAt(2) == 6) {
//         console.log("is at 6 so going up 2");
//         var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) - 2}${id.charAt(2)}`);
//         tomove2.className += ' clickcell';
//         click_clickcell(current, tomove2);
//     }
// }


function whitepawn(i) {
    var pawn = document.createElement('i');
    pawn.className = ' fas fa-chess-pawn';
    pawn.className += ' whitepawn';
    pawn.id = `w${i}`;
    pawn.addEventListener('click', function () {
        console.log('whitepawns clicked');
        white_pawn_move(pawn.id);
    });
    return pawn;
}

// var whitepawns = document.querySelectorAll('.whitepawn');
// whitepawns.forEach(function (pawn) {

// });


// function white_pawn_move(id) {
//     console.log('white pawn move called', id.charAt(0) + (parseInt(id.charAt(1))) + id.charAt(2));
//     var tomove = document.getElementById(`${parseInt(id.charAt(1)) + 1}${id.charAt(2)}`);
//     tomove.className = ' clickcell';
//     tomove.addEventListener('click', function () {
//         console.log('click to move');
//         tomove.className -= ' clickcell';
//         move(id.charAt(0), tomove.id);

//     });
//     if (id.charAt(0) == 6) {
//         var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) + 2}${id.charAt(2)}`);
//         tomove2.className += ' clickcell';
//         tomove2.addEventListener('click', function () {
//             console.log('click to move');
//             tomove2.className -= ' clickcell';
//             tomove.className -= ' clickcell';
//             move(id.charAt(0), tomove2.id);
//         });
//     }
//     document.addEventListener('click', function () {
//         console.log('elsewhere clicked');
//         tomove.className -= ' clickcell';
//         if (id.charAt(0) == 6) {
//             var tomove2 = document.getElementById(`${parseInt(id.charAt(1)) + 2}${id.charAt(2)}`);
//             tomove2.className -= ' clickcell';
//         }
//     });
// }

// function click_clickcell(current, tomove) {
//     tomove.addEventListener('click', function () {
//         console.log('click to move');
//         tomove.className -= ' clickcell';
//         move(current, tomove.id);
//     });
//     document.addEventListener('click', function () {
//         console.log('elsewhere clicked');
//         tomove.className -= ' clickcell';
//     });
// }




// function move(i, j) {
//     var cell = document.getElementById(`${i}`);
//     var cell2 = document.getElementById(`${j}`);
//     cell2.appendChild(cell.innerHTML);
//     cell.innerHTML = '';
// }
