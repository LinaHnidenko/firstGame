const content = document.querySelector(".js-content");
const wins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let player = "X";
let historyX = [];
let historyO = [];

function createMarkup() {
  let markup = "";
  for (let i = 1; i < 10; i += 1) {
    markup += `<div class="item js-item" data-id="${i}"></div>`;
  }

  content.innerHTML = markup;
}
createMarkup();
content.addEventListener("click", handleClick);

function handleClick(evt) {
  const { target } = evt;
  if (!target.classList.contains("js-item") || target.textContent) {
    return;
  }

  // const endGame = historyO.length + historyX.length === 9;
  let result = "false";
  const id = Number(target.dataset.id);

  if (player === "X") {
    historyX.push(id);
    result = isWinner(historyX);
  } else {
    historyO.push(id);
    result = isWinner(historyO);
  }

  target.textContent = player;

  if (result) {
    setTimeout(function () {
      alert(`🥳 Winner ${player} 🥰`);
    }, 300);
    setTimeout(function () {
      resetGame();
    }, 400);

    return;
  } else if (historyO.length + historyX.length === 9) {
    setTimeout(function () {
      alert(`Good attempt, but try again 🤗`);
    }, 300);
    setTimeout(function () {
      resetGame();
    }, 400);
  }
  player = player === "X" ? "0" : "X";
}

function isWinner(arr) {
  return wins.some((item) => item.every((id) => arr.includes(id)));
}

function resetGame() {
  createMarkup();
  historyX = [];
  historyO = [];
  player = "X";
}
