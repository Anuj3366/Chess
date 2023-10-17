let currentPlayer = "white";
let displayPlayer = document.getElementById("displayPlayer");
let runningEventListener = [];
let clickEventListener = [];
rExcuteAllEvents();
mapping();
displayPlayer.innerHTML = currentPlayer;
//change player and rerun all events again and remove all event listeners
function changePlayer() {
  if (currentPlayer === "white") {
    currentPlayer = "black";
  }
  else {
    currentPlayer = "white";
  }
  rExcuteAllEvents();
  removeEventListener();
  displayPlayer.innerHTML = currentPlayer;
}

//excute all events again
function rExcuteAllEvents() {
  rclickEventListener();
  pawnEvent();
  allYellowUI();
}

//remove all event Listeners
function removeAllEventListeners() {
  for (const { element, event, handler } of runningEventListener) {
    element.removeEventListener(event, handler);
  }
  runningEventListener = [];
}

//remove click listener
function rclickEventListener() {
  for (const { element, event, handler } of clickEventListener) {
    element.removeEventListener(event, handler);
    element.removeAttribute("mayCut");
    element.removeAttribute("mayMove");
  }
  clickEventListener = [];
}

//mapping the board
function mapping() {
  const arrayOfFiles = document.querySelectorAll(".files");
  const filesNameArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let fileNumber = 0;
  for (const i of arrayOfFiles) {
    let counter = 1;
    for (const j of i.children) {
      j.setAttribute("id", filesNameArray[fileNumber] + counter);
      counter++;
    }
    fileNumber++;
  }
}

//reload the page
function reset() {
  rExcuteAllEvents();
  location.reload();
}

// UI for all yellow background squares
function allYellowUI() {
  const allSquares = document.getElementsByClassName("square");
  const clickedElement = [];

  for (const x of allSquares) {
    x.addEventListener("click", function () {
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
    });

    runningEventListener.push({
      element: x,
      event: "click",
      listener: function () {
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
    });
  }
}

//move and cut functions
function move(square, peice) {
  if (square.querySelector('img')) {
    square.classList.remove("mayMove");
    square.classList.remove("mayCut");
    square.querySelector('img').remove();
    square.appendChild(peice);
  }
  else {
    square.appendChild(peice);
  }
  changePlayer();
};




let addEvent = [];
function addEvents() {
  for (const { element, event, handler } of runningEventListener) {
    element.addEventListener(event, handler);
  }
  addEvent = [];
}


//All pawns events
function pawnEvent() {
  let allPawns = document.querySelectorAll("img[src*='pawn']");
  allPawns.forEach((pawn) => {
    if (pawn.src.includes(currentPlayer)) {
      pawn.addEventListener("click", pawnClickHandler);
      runningEventListener.push({ element: pawn, event: "click", handler: () => pawnClickHandler });
    }
  });
}
function pawnClickHandler(event) {
  rclickEventListener();
  const pawn = event.target;
  const parentId = pawn.parentElement.getAttribute("id");
  const direction = currentPlayer === "white" ? -1 : 1;
  const id1 = parentId.charAt(0) + (parseInt(parentId.charAt(1)) + direction);
  console.log(id1);
  const element1 = document.getElementById(id1);

  if (element1.querySelector('img') === null) {
    element1.classList.add("mayMove");
    addEvent.push({ element: element1, event: "click", handler: () => () => move(element1, pawn) });
    clickEventListener.push({ element: element1, event: "click", handler: () => () => move(element1, pawn) });
  }

  if (
    ((parseInt(parentId.charAt(1)) === 2 && currentPlayer == "black") || ((parseInt(parentId.charAt(1)) === 7) && currentPlayer == "white")) &&
    !element1.querySelector('img')
  ) {
    const id2 = id1.charAt(0) + (parseInt(id1.charAt(1)) + direction);
    const element2 = document.getElementById(id2);
    if (!element2.querySelector('img')) {
      element2.classList.add("mayMove");
      addEvent.push({ element: element2, event: "click", handler: () => move(element2, pawn) });
      clickEventListener.push({ element: element2, event: "click", handler: () => move(element2, pawn) });
    }
  }

  const leftSquareId = String.fromCharCode(parentId.charCodeAt(0) - 1) + id1;
  const rightSquareId = String.fromCharCode(parentId.charCodeAt(0) + 1) + id1;
  const leftSquare = document.getElementById(leftSquareId);
  const rightSquare = document.getElementById(rightSquareId);

  if (
    leftSquare &&
    leftSquare.querySelector('img') &&
    !leftSquare.querySelector('img').src.includes(currentPlayer)
  ) {
    leftSquare.classList.add("mayCut");
    addEvent.push({ element: leftSquare, event: "click", handler: () => move(leftSquare, pawn) });
    clickEventListener.push({ element: leftSquare, event: "click", handler: () => move(leftSquare, pawn) });
  }

  if (
    rightSquare &&
    rightSquare.querySelector('img') &&
    !rightSquare.querySelector('img').src.includes(currentPlayer)
  ) {
    rightSquare.classList.add("mayCut");
    addEvent.push({ element: rightSquare, event: "click", handler: () => move(rightSquare, pawn) });
    clickEventListener.push({ element: rightSquare, event: "click", handler: () => move(rightSquare, pawn) });
  }
  addEvents();
}







