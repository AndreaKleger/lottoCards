let nrOfRows = 3;
let nrOfColumns = 10;
let card = new Array(nrOfRows * nrOfColumns).fill(0);

let nrOfCards = 3;

function createCards(playerId) {
  let html = "";
  for (let i = 0; i < nrOfCards; i++) {
    html = html + createOneCard(playerId, "card" + i);
  }
  document.getElementById(playerId).innerHTML = html;
  let fields = document.querySelectorAll("td");
  for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("click", function (event) {
      event.stopPropagation();
      if (fields[i].classList.contains("marked")) {
        fields[i].classList.remove("marked");
      } else {
        fields[i].classList.add("marked");
      }
    });
  }
}
function createOneCard(playerId, cardId) {
  card = new Array(nrOfRows * nrOfColumns).fill(0);
  defineIfHasNumberOrNot();
  setNumbers();
  let html = createOneHtmlCard(playerId, cardId, 3, 10);
  return html;
}

function defineIfHasNumberOrNotInOneRow(row) {
  let firstIndex = (row - 1) * 10;
  let lastIndex = firstIndex + 9;

  let sumRow = 0;

  for (let i = firstIndex; i < lastIndex + 1; i++) {
    sumRow = sumUpArrayValues(firstIndex, lastIndex);

    if (sumRow < 5) {
      card[i] = randomWholeNumberInRange(0, 1);
    }
  }
  sumRow = sumUpArrayValues(firstIndex, lastIndex);

  if (sumRow !== 5) {
    setArrayValuesToZero(firstIndex, lastIndex);

    defineIfHasNumberOrNot(row);
  }
}
function setNumbers() {
  for (let i = 0; i < nrOfColumns; i++) {
    setNumbersInOneColumn(i);
  }
}

function defineIfHasNumberOrNot() {
  for (let i = 0; i < nrOfRows; i++) {
    defineIfHasNumberOrNotInOneRow(i + 1);
  }
}
function setNumbersInOneColumn(column) {
  //index 0, 10, 20 --> 0<x<10
  //index 1, 11, 21 --> 10<x<20
  //index 2, 12, 22 --> 20<x<30
  //index 3, 13, 23 --> 30<x<40
  //index 4, 14, 24 --> 40<x<50
  //index 5, 15, 25 --> 50<x<60
  //index 6, 16, 26 --> 60<x<70
  //index 7, 17, 27 --> 70<x<80
  //index 8, 18, 28 --> 80<x<90
  //index 9, 19, 29 --> 90<x<100
  let numberOne = 0;
  let numberTwo = 0;
  let numberThree = 0;
  if (card[column] > 0) {
    card[column] = randomWholeNumberInRange(column * 10, column * 10 + 9);
  } else {
    card[column] = "";
  }
  if (card[column + 10] > 0) {
    card[column + 10] = randomWholeNumberInRange(column * 10, column * 10 + 9);
  } else {
    card[column + 10] = "";
  }
  if (card[column + 20] > 0) {
    card[column + 20] = randomWholeNumberInRange(column * 10, column * 10 + 9);
  } else {
    card[column + 20] = "";
  }

  if (card[column] === 0) {
    card[column] = 1;
  }
  if (card[column + 10] === 0) {
    card[column + 10] = 1;
  }
  if (card[column + 20] === 0) {
    card[column + 20] = 1;
  }

  if (card[column] > 0 && card[column + 10] > 0 && card[column + 20] > 0) {
    if (
      card[column] === card[column + 10] ||
      card[column] === card[column + 20] ||
      card[column + 10] === card[column + 20]
    ) {
      setNumbersInOneColumn(column);
    }
  } else if (
    card[column] > 0 &&
    card[column + 10] > 0 &&
    card[column + 20] === ""
  ) {
    if (card[column] === card[column + 10]) {
      setNumbersInOneColumn(column);
    }
  } else if (
    card[column] > 0 &&
    card[column + 10] === "" &&
    card[column + 20] > 0
  ) {
    if (card[column] === card[column + 20]) {
      setNumbersInOneColumn(column);
    }
  } else if (
    card[column] === "" &&
    card[column + 10] > 0 &&
    card[column + 20] > 0
  ) {
    if (card[column + 10] === card[column + 20]) {
      setNumbersInOneColumn(column);
    }
  }

  let sortArray = [];
  if (card[column] > 0) {
    sortArray.push(card[column]);
  }
  if (card[column + 10] > 0) {
    sortArray.push(card[column + 10]);
  }
  if (card[column + 20] > 0) {
    sortArray.push(card[column + 20]);
  }

  sortArray.sort(function (a, b) {
    return a - b;
  });

  if (card[column] > 0) {
    card[column] = sortArray[0];
    sortArray.shift();
  }
  if (card[column + 10] > 0) {
    card[column + 10] = sortArray[0];
    sortArray.shift();
  }
  if (card[column + 20] > 0) {
    card[column + 20] = sortArray[0];
    sortArray.shift();
  }
}

function sumUpArrayValues(startIndex, endIndex) {
  let sum = 0;
  for (let i = startIndex; i <= endIndex; i++) {
    sum = sum + card[i];
  }
  return sum;
}
function setArrayValuesToZero(startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    card[i] = 0;
  }
}

function createOneHtmlCard(playerId, cardId, rows, columns) {
  html = "<table id='" + playerId + "-" + cardId + "'>";
  index = 0;
  for (let i = 0; i < rows; i++) {
    html = html + "<tr>";
    for (let j = 0; j < columns; j++) {
      html =
        html +
        "<td id='" +
        playerId +
        "-" +
        cardId +
        "-field-" +
        index +
        "'>" +
        card[index] +
        "</td>";
      index++;
    }
    html = html + "</tr>";
  }
  html = html + "</table>";
  return html;
}

function randomNumberInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomWholeNumberInRange(min, max) {
  let random = Math.round(randomNumberInRange(min, max));
  return random;
}
