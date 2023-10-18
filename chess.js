mapping();
let currentPlayer = "white";
let displayPlayer = document.getElementById("displayPlayer");
let runningEventListener = [];
let clickEventListener = [];
displayPlayer.innerHTML = currentPlayer;
rExcuteAllEvents();


//change player and rerun all events again and remove all event listeners
function changePlayer() {
  // console.log("change player");
  if (currentPlayer === "white") {
    currentPlayer = "black";
  }
  else {
    currentPlayer = "white";
  }
  rExcuteAllEvents();
  displayPlayer.innerHTML = currentPlayer;
}

//excute all events again
function rExcuteAllEvents() {
  // console.log("rExcuteAllEvents");
  removeAllEventListeners();
  rclickEventListener();
  pawnEvent();
  allYellowUI();
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
          alert("Not your turn");
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
  rclickEventListener();
  console.log("moving from ", peice.parentElement, " to ", square)
  if (square.querySelector('img')) {
    square.classList.remove("mayMove");
    square.classList.remove("mayCut");
    square.querySelector('img').remove();
    square.appendChild(peice);
    changePlayer();
  }
  else {
    square.appendChild(peice);
    changePlayer();
  }
};


//All pawns events
function pawnEvent() {
  console.log("Running pawnEvent for", currentPlayer, " pawns");
  let allPawns = document.querySelectorAll("img[src*='pawn']");
  allPawns.forEach((pawn) => {
    if (pawn.src.includes(currentPlayer)) {
      pawn.addEventListener("click", pawnClickHandler);
      runningEventListener.push({ element: pawn, event: "click", handler: pawnClickHandler });
    }
  });
}
function pawnClickHandler(event) {
  rclickEventListener();
  console.log("You click on pawn on ", event.target, " square");
  let pawn = event.target;
  let parentId = pawn.parentElement.getAttribute("id");
  let direction = currentPlayer === "white" ? -1 : 1;
  let id1 = parentId.charAt(0) + (parseInt(parentId.charAt(1)) + direction);
  let element1 = document.getElementById(id1);

  if (!element1.hasChildNodes()) {
    // console.log("can move ahead ", element1);
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
    if (!element2.hasChildNodes()) {
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
    console.log("can cut ", leftSquare);
    leftSquare.classList.add("mayCut");
    let moveHandler = () => move(leftSquare, pawn);
    leftSquare.addEventListener("click", moveHandler);
    clickEventListener.push({ element: leftSquare, event: "click", handler: moveHandler });
  }

  if (rightSquare && rightSquare.hasChildNodes() && !rightSquare.querySelector('img').src.includes(currentPlayer)) {
    console.log("can cut ", rightSquare);
    rightSquare.classList.add("mayCut");
    let moveHandler = () => move(rightSquare, pawn);
    rightSquare.addEventListener("click", moveHandler);
    clickEventListener.push({ element: rightSquare, event: "click", handler: moveHandler });
  }
}




