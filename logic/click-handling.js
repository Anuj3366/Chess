const allSquares = document.getElementsByClassName("square");
// console.log(allSquares);

for (const x of allSquares) {
  x.addEventListener("click", function () {
    const idOfElement = x.getAttribute("id");
    const innerHtmlOfElement = document.getElementById(idOfElement).innerHTML;
    // console.log(innerHtmlOfElement);
    if (
      innerHtmlOfElement.includes("black") ||
      innerHtmlOfElement.includes("white")
    ) {
      document.getElementById(idOfElement).style.backgroundColor = "yellow";
    }
  });
}
