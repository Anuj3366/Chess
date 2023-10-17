let currentPlayer = "white";
let displayPlayer = document.getElementById("displayPlayer");
let runningEventListener = [];
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
  allYellowUI();
  pawnEvent();
}

//remove all event Listeners
function removeAllEventListeners() {
  for (const { element, event, handler } of runningEventListener) {
    element.removeEventListener(event, handler);
  }
  runningEventListener = [];
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


//All pawns events
function pawnEvent() {
  let allPawns = document.querySelectorAll("img[src*='pawn']");
  allPawns.forEach((pawn) => {
    if (pawn.src.includes(currentPlayer)) {
      pawn.addEventListener("click", pawnClickHandler);
      runningEventListener.push({ element: pawn, event: "click", handler: pawnClickHandler });
    }
  });
}
function pawnClickHandler(event) {
  const pawn = event.target;
  const pawnId = pawn.parentElement.getAttribute("id");
  let id = pawn.parentElement.getAttribute("id");
  let direction = currentPlayer === "white" ? -1 : 1;
  let id1 = id.charAt(0) + (parseInt(id.charAt(1)) + direction);
  let element1 = document.getElementById(id1);

  // Check if element1 contains an IMG element
  if (!element1.querySelector('img')) {
    console.log("Adding 'mayMove' class to Element1");
    element1.classList.add("mayMove");
  }

  if (parseInt(pawnId.charAt(1)) === 2) {
    let id2 = id1.charAt(0) + (parseInt(id1.charAt(1)) + direction);
    let element2 = document.getElementById(id2);

    // Check if element1 and element2 both don't contain IMG elements
    if (!element1.querySelector('img') && !element2.querySelector('img')) {
      console.log("Adding 'mayMove' class to Element2");
      element2.classList.add("mayMove");
    }
  }
}




