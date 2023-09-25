createStructure();


function createStructure() {
    var board = document.getElementById('board');
    var rowName = "abcdefgh";
    for (var i = 0; i < 8; i++) {
        var row = document.createElement('div');
        row.className = 'row';
        row.id = `${rowName.charAt(i)}`;

        for (var j = 0; j < 8; j++) {
            var cell = document.createElement('div');
            if (i == 0) {
                var displayNum = document.createElement('span');
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
        }
        var displayChar = document.createElement('span');
        displayChar.className = 'displayChar';
        displayChar.innerHTML = `${rowName.charAt(i)}`;
        row.appendChild(displayChar);


        board.appendChild(row);
    }
}

function blackpawn(i) {
    var pawn = document.createElement('img');
    pawn.src = "images/blackpawn.png";
    pawn.className = 'pawn';
    pawn.id = `${i}`;
    return pawn;
}
function whitepawn(i) {
    var pawn = document.createElement('img');
    pawn.src = "images/whitepawn.png";
    pawn.className = 'pawn';
    pawn.id = `${i}`;
    return pawn;
}
function black_pawn_move(i) {
    console.log('pawn move called');
    var pawn = document.querySelector('.pawn');
    var id = pawn.id;
    var tomove = document.getElementById(`${id.charAt(0) - 1}`);
    tomove.className += 'darkcell';
    if (id.charAt(0) == 6) {
        var tomove2 = document.getElementById(`${id.charAt(0) - 2}`);
        tomove2.className += 'darkcell';
        tomove2.EventListener('click', function () {
            console.log('click to move');
            tomove2.className -= 'darkcell';
            tomove.className -= 'darkcell';

        });
    }
    document.EventListener('click', function () {
        console.log('elseware clicked');
        tomove.className -= 'darkcell';
        if(id.charAt(0) == 6){
            tomove2.className -= 'darkcell';
        }
    });

}


var pawns = document.querySelectorAll('.pawn');
pawns.EventListener('click', function () {
    console.log('pawn clicked');
    black_pawn_move(pawns.id);
});


function move(i,j){
    var cell = document.getElementById(`${i}`);
    var cell2 = document.getElementById(`${j}`);
    cell2.appendChild(cell);
}
