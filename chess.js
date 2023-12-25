mapping();
let currentPlayer = "white";
let displayPlayer = document.getElementById("displayPlayer");
let runningEventListener = [];
let clickEventListener = [];
const currentPlayerAnnounce = document.getElementById("currentPlayer_Announce");
displayPlayer.innerHTML = currentPlayer;
let whiteCapturedPieces = [];
let blackCapturedPieces = [];
let whiteCheck = false;
let blackCheck = false;
let callingFunction = [];
let moves = 0;//number of moves can move , if 0 and check then checkmate
rExcuteAllEvents();


//UI
function toggleStack() {
  const stackElements = document.getElementsByClassName("stack");
  stackElements[0].classList.toggle("stackToggle");
  stackElements[1].classList.toggle("stackToggle");
}

//anouncement hover event
currentPlayerAnnounce.style.transition = "all 0.3s ease-in-out";
currentPlayerAnnounce.addEventListener("mouseover", () => {
  currentPlayerAnnounce.style.boxShadow = "0px 0px 10px 2px gold";
  currentPlayerAnnounce.style.transform = "scale(1.1)";
  currentPlayerAnnounce.style.textShadow = "0px 0px 5px gold";
});

currentPlayerAnnounce.addEventListener("mouseout", () => {
  currentPlayerAnnounce.style.boxShadow = "none";
  currentPlayerAnnounce.style.transform = "scale(1)";
  currentPlayerAnnounce.style.textShadow = "none";
});


//change player and rerun all events again and remove all event listeners
function changePlayer() {
  currentPlayerAnnounce.style.color = currentPlayer;
  console.log("WoW there are ", moves, " moves and u chose this move");
  if (currentPlayer === "white") {
    currentPlayer = "black";
    currentPlayerAnnounce.style.backgroundColor = "black";
  } else {
    currentPlayer = "white";
    currentPlayerAnnounce.style.backgroundColor = "white";
  }
  rExcuteAllEvents();
  displayPlayer.innerHTML = currentPlayer;
  moves = 0;
}

//change captured pieces stack
function changeCapturedPiecesStack() {
  let whiteCapturedPiecesStack = document.getElementById("whiteCapturedPiecesStack");
  let blackCapturedPiecesStack = document.getElementById("blackCapturedPiecesStack");
  // console.log("no problem before rendering");
  for (let piece of whiteCapturedPieces) {
    whiteCapturedPiecesStack.appendChild(piece);
  }
  for (let piece of blackCapturedPieces) {
    blackCapturedPiecesStack.appendChild(piece);
  }
  // console.log("no problem after rendering");
  whiteCapturedPieces = [];
  blackCapturedPieces = [];
}

//excute all events again
function rExcuteAllEvents() {
  removeAllEventListeners();
  rclickEventListener();
  allYellowUI();
  pawnEvent();
  rookEvent();
  knightEvent();
  bishopEvent();
  queenEvent();
  kingEvent();
  if (moves == 0) {
    console.log("moves are 0");
    if (currentPlayer === "white") {
      whiteCheck = checkSystem(document.querySelector(`img[src*='white/king.png']`).parentElement.getAttribute("id", "king"));
      if (whiteCheck) {
        console.log("white is in check");
      }
    } else {
      blackCheck = checkSystem(document.querySelector(`img[src*='black/king.png']`).parentElement.getAttribute("id", "king"));
      if (blackCheck) {
        console.log("black is in check");
      }
    }
  }
  // console.log("All functions reexecuted");
}

//remove all event Listeners
function removeAllEventListeners() {
  // console.log("removeAllEventListeners");
  for (let { element, event, handler } of runningEventListener) {
    element.removeEventListener(event, handler);
  }
  runningEventListener = [];
}

//remove click listener
function rclickEventListener() {
  // console.log("rclickEventListener");
  for (let { element, event, handler } of clickEventListener) {
    element.removeEventListener(event, handler);
    element.classList.remove("mayCut");
    element.classList.remove("mayMove");
  }
  clickEventListener = [];
}

//mapping the board
function mapping() {
  // console.log("mapping");
  let arrayOfFiles = document.querySelectorAll(".files");
  let filesNameArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let fileNumber = 0;
  for (let i of arrayOfFiles) {
    let counter = 1;
    for (let j of i.children) {
      j.setAttribute("id", filesNameArray[fileNumber] + counter);
      counter++;
    }
    fileNumber++;
  }
}

//reload the page
function reset() {
  // console.log("reset");
  location.reload();
}

// UI for all yellow background squares
let clickedElement = [];
function allYellowUI() {
  // console.log("allYellowUI");
  const allSquares = document.querySelectorAll(".square");
  for (let x of allSquares) {
    // console.log("adding event listener to ", x);
    let adding = function () {
      const idOfElement = x.getAttribute("id");
      const innerHtmlOfElement = document.getElementById(idOfElement).innerHTML;

      if (clickedElement.length > 0) {
        clickedElement[0].removeAttribute("style");
        clickedElement.pop();
      }

      if (innerHtmlOfElement.includes("black") || innerHtmlOfElement.includes("white")) {
        if (innerHtmlOfElement.includes(currentPlayer)) {
          document.getElementById(idOfElement).style.backgroundColor = "yellow";
          clickedElement.push(x);
        } else {
          console.log("Not your turn");
        }
      }
    }
    x.addEventListener("click", adding);
    runningEventListener.push({ element: x, event: "click", handler: adding });
  }
}

//move and cut functions
function move(square, peice) {
  // console.log("used rclickEventListener to check if its really removing")
  // console.log("moving from ", peice.parentElement, " to ", square)
  rclickEventListener();
  if (square.querySelector('img')) {
    // debugger;
    square.classList.remove("mayMove");
    square.classList.remove("mayCut");
    const pieceColor = square.children[0].src.includes("white") ? "white" : "black";
    if (pieceColor === "white") {
      whiteCapturedPieces.push(square.children[0]);
    } else {
      blackCapturedPieces.push(square.children[0]);
    }
    square.querySelector('img').remove();
    square.appendChild(peice);
    changeCapturedPiecesStack();
  }
  else {
    square.appendChild(peice);
  }
  changePlayer();
  // console.log("hi there changeCapturedPiecesStack is exiting");
};


//All pawns events
const changePawnImage = function (id, newPiece, cp) {
  let pawn = document.getElementById(id);
  pawn.src = `./images/pieces/${cp}/${newPiece}.png`;
  document.getElementById("pawnMorf").style.display = "none";
  console.log("Morph to", newPiece, "done");
  document.body.style.pointerEvents = "auto";
};

const pawnMorfEvent = function (pawn) {
  let cp = currentPlayer;
  let popup = document.getElementById("pawnMorf");
  popup.innerHTML = `
    <img src="./images/pieces/${cp}/rook.png" alt="" onclick="changePawnImage('${pawn}', 'rook', '${cp}')" />
    <img src="./images/pieces/${cp}/knight.png" alt="" onclick="changePawnImage('${pawn}', 'knight', '${cp}')" />
    <img src="./images/pieces/${cp}/bishop.png" alt="" onclick="changePawnImage('${pawn}', 'bishop', '${cp}')" />
    <img src="./images/pieces/${cp}/queen.png" alt="" onclick="changePawnImage('${pawn}', 'queen', '${cp}')" />`;
  popup.style.display = "flex";
  document.body.style.pointerEvents = "none";
  popup.style.pointerEvents = "auto";
};
function pawnEvent() {
  // console.log("Running pawnEvent for", currentPlayer, " pawns");
  let allPawns = document.querySelectorAll("img[src*='pawn']");
  const pawnClickHandler = function (event) {
    rclickEventListener();
    // console.log("You click on pawn on ", event.target, " square");
    let pawn = event.target;
    let parentId = pawn.parentElement.getAttribute("id");
    let direction = currentPlayer === "white" ? -1 : 1;
    let id1 = parentId.charAt(0) + (parseInt(parentId.charAt(1)) + direction);
    let element1 = document.getElementById(id1);
    // console.log(element1.hasChildNodes()? ("has child nodes" , element1) : "no child nodes");

    if ((!element1.hasChildNodes() || !element1.querySelector("img")) && isValidMove(element1)) {
      element1.classList.add("mayMove");
      let moveHandler = () => {
        if (element1.id.charAt(1) == 1 || element1.id.charAt(1) == 8) {
          pawn.id = "pawnChange";
          pawnMorfEvent(pawn.id);
        }
        moves++;
        move(element1, pawn);
      };
      element1.addEventListener("click", moveHandler);
      clickEventListener.push({ element: element1, event: "click", handler: moveHandler });
    }

    if (
      ((parseInt(parentId.charAt(1)) === 2 && currentPlayer == "black") ||
        (parseInt(parentId.charAt(1)) === 7 && currentPlayer == "white")
      )) {
      let id2 = id1.charAt(0) + (parseInt(id1.charAt(1)) + direction);
      let element2 = document.getElementById(id2);
      if (((!element2.hasChildNodes() || !element2.querySelector("img")) && (!element1.hasChildNodes() || !element1.querySelector("img"))) && isValidMove(element2)) {
        // console.log("can move ahead ", element2);
        element2.classList.add("mayMove");
        moves++;
        let moveHandler = () => move(element2, pawn);
        element2.addEventListener("click", moveHandler);
        clickEventListener.push({ element: element2, event: "click", handler: moveHandler });
      }
    }

    let leftSquareId = String.fromCharCode(parentId.charCodeAt(0) - 1) + id1.charAt(1);
    let rightSquareId = String.fromCharCode(parentId.charCodeAt(0) + 1) + id1.charAt(1);
    let leftSquare = document.getElementById(leftSquareId);
    let rightSquare = document.getElementById(rightSquareId);
    // console.log("leftSquareId", leftSquareId);
    // console.log("rightSquareId", rightSquareId);
    // console.log("leftSquare", leftSquare);
    // console.log("rightSquare", rightSquare);
    let leftImg;
    if (leftSquare) {
      leftImg = leftSquare.querySelector('img');
    }
    if (leftSquare && leftSquare.hasChildNodes() && leftImg && !leftImg.src.includes(currentPlayer) && !leftImg.src.includes("king") && isValidMove(leftSquare)) {
      // console.log("can cut ", leftSquare);
      leftSquare.classList.add("mayCut");
      let moveHandler = () => {
        if (leftSquare.id.charAt(1) == 1 || leftSquare.id.charAt(1) == 8) {
          pawn.id = "pawnChange";
          pawnMorfEvent(pawn.id);
        }
        moves++;
        move(leftSquare, pawn);
      };
      leftSquare.addEventListener("click", moveHandler);
      clickEventListener.push({ element: leftSquare, event: "click", handler: moveHandler });
    }
    let rightImg;
    if (rightSquare) {
      rightImg = rightSquare.querySelector('img');
    }

    if (rightSquare && rightSquare.hasChildNodes() && rightImg && !rightImg.src.includes(currentPlayer) && !rightImg.src.includes("king") && isValidMove(rightSquare)) {
      // console.log("can cut ", rightSquare);
      rightSquare.classList.add("mayCut");
      let moveHandler = () => {
        if (rightSquare.id.charAt(1) == 1 || rightSquare.id.charAt(1) == 8) {
          pawn.id = "pawnChange";
          pawnMorfEvent(pawn.id);
        }
        moves++;
        move(rightSquare, pawn);
      };
      rightSquare.addEventListener("click", moveHandler);
      clickEventListener.push({ element: rightSquare, event: "click", handler: moveHandler });
    }
  };
  allPawns.forEach((pawn) => {
    if (pawn.src.includes(currentPlayer)) {//&& checkSystem(pawn.parentElement,"none")
      pawn.addEventListener("click", pawnClickHandler);
      runningEventListener.push({ element: pawn, event: "click", handler: pawnClickHandler });
    }
  });
}

//common in rook and bishop and queen
const checkAndAddSquares = (parentId, xOffset, yOffset, piece) => {
  let row = parseInt(parentId.charAt(1)) + yOffset;
  let col = parentId.charCodeAt(0) + xOffset;

  while (row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0)) {
    const id = String.fromCharCode(col) + row;
    const square = document.getElementById(id);
    const squareImg = square.querySelector("img");
    if ((!square.hasChildNodes() || !squareImg) && isValidMove(square)) {
      moves++;
      square.classList.add("mayMove");
      let moveHandler = () => move(square, piece);
      square.addEventListener("click", moveHandler);
      clickEventListener.push({ element: square, event: "click", handler: moveHandler });
    } else if ((squareImg && squareImg.src.includes(currentPlayer)) || (squareImg && squareImg.src.includes("king")) || !isValidMove(square)) {
      break;
    }
    else {
      square.classList.add("mayCut");
      let moveHandler = () => move(square, piece);
      moves++;
      square.addEventListener("click", moveHandler);
      clickEventListener.push({ element: square, event: "click", handler: moveHandler });
      break;
    }

    row += yOffset;
    col += xOffset;
  }
};


//All rooks events
function rookEvent() {
  // console.log("Running rookEvent for", currentPlayer, " rook");
  let allRooks = document.querySelectorAll("img[src*='rook']");
  const rookClickHandler = function (event) {
    rclickEventListener();
    let rook = event.target;
    let parentId = rook.parentElement.getAttribute("id");
    checkAndAddSquares(parentId, 1, 0, rook);
    checkAndAddSquares(parentId, 0, 1, rook);
    checkAndAddSquares(parentId, -1, 0, rook);
    checkAndAddSquares(parentId, 0, -1, rook);
  }
  allRooks.forEach((rook) => {
    if (rook.src.includes(currentPlayer)) {
      // console.log("add click event on rook", rook);
      rook.addEventListener("click", rookClickHandler);
      runningEventListener.push({ element: rook, event: "click", handler: rookClickHandler });
    }
  });
}

//All knight events
function knightEvent() {
  let allKnight = document.querySelectorAll("img[src*='knight']");

  const knightClickHandler = function (event) {
    rclickEventListener();
    const checkAndAddSquares = (parentId, xDirection, yDirection) => {
      let row = parseInt(parentId.charAt(1)) + yDirection;
      let col = parentId.charCodeAt(0) + xDirection;
      if (row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0)) {
        const id = String.fromCharCode(col) + row;
        const square = document.getElementById(id);
        const squareImg = square.querySelector("img");
        if ((!square.hasChildNodes() || !squareImg) && isValidMove(square)) {
          square.classList.add("mayMove");
          moves++;
          let moveHandler = () => move(square, knight);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        }
        else {
          if (squareImg && !squareImg.src.includes(currentPlayer) && !squareImg.src.includes("king") && isValidMove(square)) {
            square.classList.add("mayCut");
            let moveHandler = () => move(square, knight);
            moves++;
            square.addEventListener("click", moveHandler);
            clickEventListener.push({ element: square, event: "click", handler: moveHandler });
          }
        }
      }
      row = parseInt(parentId.charAt(1)) - yDirection;
      col = parentId.charCodeAt(0) - xDirection;
      if (row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0)) {
        const id = String.fromCharCode(col) + row;
        const square = document.getElementById(id);
        const squareImg = square.querySelector("img");
        if ((!square.hasChildNodes() || !squareImg) && isValidMove(square)) {
          square.classList.add("mayMove");
          moves++;
          let moveHandler = () => move(square, knight);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        }
        else {
          if ((squareImg && !squareImg.src.includes(currentPlayer)) && isValidMove(square)) {
            square.classList.add("mayCut");
            moves++;
            let moveHandler = () => move(square, knight);
            square.addEventListener("click", moveHandler);
            clickEventListener.push({ element: square, event: "click", handler: moveHandler });
          }
        }
      }
    };

    let knight = event.target;
    let parentId = knight.parentElement.getAttribute("id");

    checkAndAddSquares(parentId, 2, 1);
    checkAndAddSquares(parentId, 2, -1);
    checkAndAddSquares(parentId, 1, 2);
    checkAndAddSquares(parentId, -1, 2);
  }

  allKnight.forEach((knight) => {
    if (knight.src.includes(currentPlayer)) {
      // console.log("add click event on knight", knight);
      knight.addEventListener("click", knightClickHandler);
      runningEventListener.push({ element: knight, event: "click", handler: knightClickHandler });
    }
  });
}

//All bishop events
function bishopEvent() {
  let allBishops = document.querySelectorAll("img[src*='bishop']");

  const bishopClickHandler = function (event) {
    rclickEventListener();

    let bishop = event.target;
    let parentId = bishop.parentElement.getAttribute("id");

    checkAndAddSquares(parentId, 1, 1, bishop);
    checkAndAddSquares(parentId, 1, -1, bishop);
    checkAndAddSquares(parentId, -1, 1, bishop);
    checkAndAddSquares(parentId, -1, -1, bishop);
  }

  allBishops.forEach((bishop) => {
    if (bishop.src.includes(currentPlayer)) {
      // console.log("add click event on bishop", bishop);
      bishop.addEventListener("click", bishopClickHandler);
      runningEventListener.push({ element: bishop, event: "click", handler: bishopClickHandler });
    }
  });
}

//All queen events
function queenEvent() {
  let allQueens = document.querySelectorAll("img[src*='queen']");

  const queenClickHandler = function (event) {
    rclickEventListener();
    let queen = event.target;
    let parentId = queen.parentElement.getAttribute("id");
    checkAndAddSquares(parentId, 1, 0, queen);
    checkAndAddSquares(parentId, 0, 1, queen);
    checkAndAddSquares(parentId, -1, 0, queen);
    checkAndAddSquares(parentId, 0, -1, queen);
    checkAndAddSquares(parentId, 1, 1, queen);
    checkAndAddSquares(parentId, 1, -1, queen);
    checkAndAddSquares(parentId, -1, 1, queen);
    checkAndAddSquares(parentId, -1, -1, queen);
  }

  allQueens.forEach((queen) => {
    if (queen.src.includes(currentPlayer)) {
      // console.log("add click event on queen", queen);
      queen.addEventListener("click", queenClickHandler);
      runningEventListener.push({ element: queen, event: "click", handler: queenClickHandler });
    }
  });
}


//king events
function kingEvent() {
  let bothKings = document.querySelectorAll("img[src*='king']");

  const kingClickHandler = function (event) {
    rclickEventListener();
    let king = event.target;
    let parentId = king.parentElement.getAttribute("id");
    const checkAndAddSquares = (parentId, xOffset, yOffset) => {
      let row = parseInt(parentId.charAt(1)) + yOffset;
      let col = parentId.charCodeAt(0) + xOffset;

      // console.log("id:square", id,":" ,square);
      if ((row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0))) {
        const id = String.fromCharCode(col) + row;
        const square = document.getElementById(id);
        const squareImg = square.querySelector("img");
        if ((!square.hasChildNodes() || !squareImg) && !checkSystem(id, "king")) {
          square.classList.add("mayMove");
          moves++;
          let moveHandler = () => move(square, king);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        } else if (squareImg && !squareImg.src.includes(currentPlayer) && !squareImg.src.includes("king") && !checkSystem(id, "king")) {
          square.classList.add("mayCut");
          moves++;
          let moveHandler = () => move(square, king);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        }
      }
    };
    checkAndAddSquares(parentId, 1, 0);
    checkAndAddSquares(parentId, -1, 0);
    checkAndAddSquares(parentId, 0, 1);
    checkAndAddSquares(parentId, 0, -1);
    checkAndAddSquares(parentId, 1, -1);
    checkAndAddSquares(parentId, -1, 1);
    checkAndAddSquares(parentId, 1, 1);
    checkAndAddSquares(parentId, -1, -1);
  }

  bothKings.forEach((king) => {
    if (king.src.includes(currentPlayer)) {
      if (checkSystem(king.parentElement.getAttribute("id", "king"))) {
        if (currentPlayer === "white") {
          whiteCheck = true;
        } else {
          blackCheck = true;
        }
      }
      else {
        whiteCheck = false;
        blackCheck = false;
      }
      // console.log("add click event on king", king);
      king.addEventListener("click", kingClickHandler);
      runningEventListener.push({ element: king, event: "click", handler: kingClickHandler });
    }
  });
}

function checkSystem(king, toChk) {
  // console.log("running checkSystem function")
  let parentId = king;
  const checking = (parentId, xOffset, yOffset, find) => {
    // console.log("parentId :", parentId, " xOffset :", xOffset, " yOffset :", yOffset, " find :", find);
    let row = parseInt(parentId.charAt(1)) + yOffset;
    let col = parentId.charCodeAt(0) + xOffset;
    // console.log("row :", row, ", col :", String.fromCharCode(col) , " ,find :", find , " parentid :", parentId);


    while (row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0)) {
      const id = String.fromCharCode(col) + row;
      const square = document.getElementById(id);
      const quertSelect = square.querySelector("img");
      if (square.hasChildNodes() && quertSelect && quertSelect.src.includes(find) && !quertSelect.src.includes(currentPlayer) && !square.classList.contains("dummy")) {
        return true;
      }
      else if ((quertSelect && square.hasChildNodes()) || (square.classList.contains("dummy") && toChk != "king") || find === "knight" || find === "pawn") {
        break;
      }
      row += yOffset;
      col += xOffset;
    }
    return false;
  };
  let check = false;

  // console.log("check before rook done",check)
  check = check || checking(parentId, 1, 0, "rook");
  check = check || checking(parentId, -1, 0, "rook");
  check = check || checking(parentId, 0, 1, "rook");
  check = check || checking(parentId, 0, -1, "rook");
  // console.log("check after rook done",check);.
  check = check || checking(parentId, 1, 1, "bishop");
  check = check || checking(parentId, -1, -1, "bishop");
  check = check || checking(parentId, -1, 1, "bishop");
  check = check || checking(parentId, 1, -1, "bishop");
  // console.log("check after bishop done", check);
  check = check || checking(parentId, 2, 1, "knight");
  check = check || checking(parentId, -2, 1, "knight");
  check = check || checking(parentId, 1, 2, "knight");
  check = check || checking(parentId, 1, -2, "knight");
  check = check || checking(parentId, 2, -1, "knight");
  check = check || checking(parentId, -2, -1, "knight");
  check = check || checking(parentId, -1, 2, "knight");
  check = check || checking(parentId, -1, -2, "knight");
  // console.log("check after knight done",check);
  check = check || checking(parentId, 1, 0, "queen");
  check = check || checking(parentId, -1, 0, "queen");
  check = check || checking(parentId, 0, 1, "queen");
  check = check || checking(parentId, 0, -1, "queen");
  check = check || checking(parentId, 1, 1, "queen");
  check = check || checking(parentId, 1, -1, "queen");
  check = check || checking(parentId, -1, 1, "queen");
  check = check || checking(parentId, -1, -1, "queen");
  // console.log("check after queen done",check);
  const direction = currentPlayer === "white" ? -1 : 1;
  check = check || checking(parentId, direction, direction, "pawn");
  check = check || checking(parentId, -direction, direction, "pawn");
  // console.log("check after pawn done",check);
  // console.log("returning check value",check);
  return check;
}

function isValidMove(box) {
  // console.log("no check");
  if (whiteCheck && currentPlayer == "black") {
    console.log("its either illegal move or black wins")
    return false;
  }
  else if (blackCheck && currentPlayer == "white") {
    console.log("its either illegal move or white wins")
    return false;
  }

  // console.log("running isValidMove function")//here i am check wheather king is in check or not after that move to square
  let parentId = box;
  // if there is a img here then checking if king is in check or not , i am putting my peice here so including cutting as well
  parentId.classList.add("dummy");
  //getting king which is in check
  let king = document.querySelector(`img[src*='${currentPlayer}/king.png']`);
  // console.log("king is ", king);
  if (checkSystem(king.parentElement.getAttribute("id", "other"))) {
    parentId.classList.remove("dummy");
    return false;
  }
  parentId.classList.remove("dummy");
  return true;
}


// function checkMate() {
//   let allPeice = document.querySelectorAll("img[src*='${currentPlayer}']");
//   //there are things saved in runningEventListener use it and running for all possible moves
//   //if no possible moves and check then checkmate
//   //if no possible moves and no check then stalemate
//   //if possible moves then no checkmate




// }