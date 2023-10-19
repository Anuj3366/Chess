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
rExcuteAllEvents();

//anouncement hover event
currentPlayerAnnounce.addEventListener("mouseover", () => {
  currentPlayerAnnounce.style.backgroundColor = "gold";
});
currentPlayerAnnounce.addEventListener("mouseout", () => {
  currentPlayerAnnounce.style.backgroundColor = "initial";
});

//change player and rerun all events again and remove all event listeners
function changePlayer() {
  currentPlayerAnnounce.style.color = currentPlayer;
  if (currentPlayer === "white") {
    currentPlayer = "black";
    currentPlayerAnnounce.style.backgroundColor = "black";
  } else {
    currentPlayer = "white";
    currentPlayerAnnounce.style.backgroundColor = "white";
  }
  rExcuteAllEvents();
  displayPlayer.innerHTML = currentPlayer;
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
  kingEvent();//problem
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

// function removeSpecificEventListener(ele) {
//   // console.log("removeSpecificEventListener");
//   for (let { element ,event, handler } of runningEventListener) {
//     if(element === ele)
//     ele.removeEventListener(event, handler);
//   }
//   runningEventListener = runningEventListener.filter((x) => x.element !== element);
// }

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
  rExcuteAllEvents();
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

    if (!element1.hasChildNodes() || !element1.querySelector("img")) {
      element1.classList.add("mayMove");
      let moveHandler = () => move(element1, pawn);
      element1.addEventListener("click", moveHandler);
      clickEventListener.push({ element: element1, event: "click", handler: moveHandler });
    }

    if (
      ((parseInt(parentId.charAt(1)) === 2 && currentPlayer == "black") ||
        (parseInt(parentId.charAt(1)) === 7 && currentPlayer == "white")
      )) {
      let id2 = id1.charAt(0) + (parseInt(id1.charAt(1)) + direction);
      let element2 = document.getElementById(id2);
      if (!element2.hasChildNodes() || !element2.querySelector("img")) {
        // console.log("can move ahead ", element2);
        element2.classList.add("mayMove");
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

    if (leftSquare && leftSquare.hasChildNodes() && !leftSquare.querySelector('img').src.includes(currentPlayer)) {
      // console.log("can cut ", leftSquare);
      leftSquare.classList.add("mayCut");
      let moveHandler = () => move(leftSquare, pawn);
      leftSquare.addEventListener("click", moveHandler);
      clickEventListener.push({ element: leftSquare, event: "click", handler: moveHandler });
    }

    if (rightSquare && rightSquare.hasChildNodes() && !rightSquare.querySelector('img').src.includes(currentPlayer)) {
      // console.log("can cut ", rightSquare);
      rightSquare.classList.add("mayCut");
      let moveHandler = () => move(rightSquare, pawn);
      rightSquare.addEventListener("click", moveHandler);
      clickEventListener.push({ element: rightSquare, event: "click", handler: moveHandler });
    }
  };
  allPawns.forEach((pawn) => {
    if (pawn.src.includes(currentPlayer)) {
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

    if (!square.hasChildNodes() || !square.querySelector("img")) {
      square.classList.add("mayMove");
      let moveHandler = () => move(square, piece);
      square.addEventListener("click", moveHandler);
      clickEventListener.push({ element: square, event: "click", handler: moveHandler });
    } else {
      if (square.querySelector("img").src.includes(currentPlayer)) {
        break;
      } else {
        square.classList.add("mayCut");
        let moveHandler = () => move(square, piece);
        square.addEventListener("click", moveHandler);
        clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        break;
      }
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

        if (!square.hasChildNodes() || !square.querySelector("img")) {
          square.classList.add("mayMove");
          let moveHandler = () => move(square, knight);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        }
        else {
          if (!square.querySelector("img").src.includes(currentPlayer)) {
            square.classList.add("mayCut");
            let moveHandler = () => move(square, knight);
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

        if (!square.hasChildNodes() || !square.querySelector("img")) {
          square.classList.add("mayMove");
          let moveHandler = () => move(square, knight);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        }
        else {
          if (!square.querySelector("img").src.includes(currentPlayer)) {
            square.classList.add("mayCut");
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
    checkAndAddSquares(parentId, -2, 1);
    checkAndAddSquares(parentId, 1, 2);
    checkAndAddSquares(parentId, 1, -2);
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

      const id = String.fromCharCode(col) + row;
      const square = document.getElementById(id);
      // console.log("id:square", id,":" ,square);s
      if ((row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0))) {
        if (!square.hasChildNodes() || !square.querySelector("img")) {
          square.classList.add("mayMove");
          let moveHandler = () => move(square, king);
          square.addEventListener("click", moveHandler);
          clickEventListener.push({ element: square, event: "click", handler: moveHandler });
        } else if (!square.querySelector("img").src.includes(currentPlayer)) {
          square.classList.add("mayCut");
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
    if (king.src.includes(currentPlayer) && checkSystem(king)) {
      // console.log("add click event on king", king);
      king.addEventListener("click", kingClickHandler);
      runningEventListener.push({ element: king, event: "click", handler: kingClickHandler });
    }
  });
}

function checkSystem(king) {
  rclickEventListener();
  // console.log("running checkSystem function")
  let parentId = king.parentElement.getAttribute("id");
  const checkAndAddSquares = (parentId, xOffset, yOffset, find) => {
    let row = parseInt(parentId.charAt(1)) + yOffset;
    let col = parentId.charCodeAt(0) + xOffset;

    while (row >= 1 && row <= 8 && col >= 'a'.charCodeAt(0) && col <= 'h'.charCodeAt(0)) {
      const id = String.fromCharCode(col) + row;
      const square = document.getElementById(id);
      if (square.querySelector("img").src.includes(find)) {
        return false;
      }
      else if (square.querySelector("img") || square.hasChildNodes() || find == "knight" || find == "pawn"){
        break;
      }

      row += yOffset;
      col += xOffset;
    }
    return true;
  };
  let check = true;
  // console.log("check before rook done",check)
  check = check || checkAndAddSquares(parentId, 1, 0, "rook");
  check = check || checkAndAddSquares(parentId, -1, 0, "rook");
  check = check || checkAndAddSquares(parentId, 0, 1, "rook");
  check = check || checkAndAddSquares(parentId, 0, -1, "rook");
  // console.log("check after rook done",check);
  check = check || checkAndAddSquares(parentId, 1, 1, "bishop");
  check = check || checkAndAddSquares(parentId, 1, -1, "bishop");
  check = check || checkAndAddSquares(parentId, -1, 1, "bishop");
  check = check || checkAndAddSquares(parentId, -1, -1, "bishop");
  // console.log("check after bishop done",check);
  check = check || checkAndAddSquares(parentId, 2, 1, "knight");
  check = check || checkAndAddSquares(parentId, -2, 1, "knight");
  check = check || checkAndAddSquares(parentId, 1, 2, "knight");
  check = check || checkAndAddSquares(parentId, 1, -2, "knight");
  check = check || checkAndAddSquares(parentId, 2, -1, "knight");
  check = check || checkAndAddSquares(parentId, -2, -1, "knight");
  check = check || checkAndAddSquares(parentId, -1, 2, "knight");
  check = check || checkAndAddSquares(parentId, -1, -2, "knight");
  // console.log("check after knight done",check);
  check = check || checkAndAddSquares(parentId, 1, 0, "queen");
  check = check || checkAndAddSquares(parentId, -1, 0, "queen");
  check = check || checkAndAddSquares(parentId, 0, 1, "queen");
  check = check || checkAndAddSquares(parentId, 0, -1, "queen");
  check = check || checkAndAddSquares(parentId, 1, 1, "queen");
  check = check || checkAndAddSquares(parentId, 1, -1, "queen");
  check = check || checkAndAddSquares(parentId, -1, 1, "queen");
  check = check || checkAndAddSquares(parentId, -1, -1, "queen");
  // console.log("check after queen done",check);
  check = check || checkAndAddSquares(parentId, 1, 1,"pawn");
  check = check || checkAndAddSquares(parentId, -1, -1,"pawn");
  // console.log("check after pawn done",check);
  console.log("returning check value")
  return check;
}