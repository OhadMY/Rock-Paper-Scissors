let compscore = 0;
let playerscore = 0;
let gameOver = false;

const cscore = document.getElementById("cscore");
const pscore = document.getElementById("pscore");

const chooseRock = document.querySelector("#Rock");
const choosePaper = document.querySelector("#Paper");
const chooseScissors = document.querySelector("#Scissors");
const restartGame = document.querySelector(".botbox");

const topbox = document.querySelector(".topbox");
const botbox = document.querySelector(".botbox");
const midbox = document.querySelector(".midbox");

chooseRock.addEventListener("click", function () {
  mainGame(Rock.id);
});
choosePaper.addEventListener("click", function () {
  mainGame(Paper.id);
});
chooseScissors.addEventListener("click", function () {
  mainGame(Scissors.id);
});
restartGame.addEventListener("click", resetGame);

function mainGame(choice) {
  let winner = "";
  if (!gameOver) {
    topbox.textContent = "You chose: " + choice;
    let computer = computerChoice();
    botbox.textContent = "Computer chose: " + computer;
    winner = whoWon(choice, computer);
    calculateScore(winner);
  }

  if (compscore === 10 || playerscore === 10) {
    gameOver = true;
    topbox.textContent = "Game Ended";
    botbox.textContent = "Restart";
    botbox.style.cursor = "pointer";
  }
}

function whoWon(choice, computer) {
  let result = "";
  if (choice === computer) {
    result = "draw";
  } else if (choice === "Rock") {
    if (computer === "Scissors") result = "won";
    else result = "lost";
  } else if (choice === "Scissors") {
    if (computer === "Paper") {
      result = "won";
    } else result = "lost";
  } else if (choice === "Paper") {
    if (computer === "Rock") result = "won";
    else result = "lost";
  }

  return result;
}

function calculateScore(result) {
  if (result === "won") {
    setResultStyles("green");
    midbox.innerText = "You Won! :)";
    pscore.innerText = ++playerscore;
  } else if (result === "lost") {
    setResultStyles("red");
    midbox.innerText = "You Lost! :(";
    cscore.innerText = ++compscore;
  } else {
    setResultStyles("orange");
    midbox.innerText = "Draw! :|";
  }
}

function setResultStyles(color) {
  midbox.style.color = color;
}

function computerChoice() {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function resetGame() {
  if (gameOver) {
    compscore = 0;
    playerscore = 0;
    pscore.textContent = 0;
    cscore.textContent = 0;
    topbox.textContent = "Let the game begin";
    setResultStyles("white");
    midbox.textContent = "First one to get 10 points wins!";
    botbox.textContent = "Player choose your move:";
    gameOver = false;
    botbox.style.cursor = "auto";
    changepname.textContent = "Player";
  }
}

// Get elements
const body = document.body;
const mainMenu = document.querySelector(".main");
const edit = document.querySelector("#edit");
const shambles = document.querySelector("#shambles");
const reset = document.querySelector("#reset");
const exit = document.querySelector("#exit");
const changepname = document.querySelector(".changepname");

// // Set context-menu
// const contextElement = document.createElement("div");
// contextElement.id = "context-menu";

// Set new element
const rageMenu = document.createElement("div");
rageMenu.id = "main";
rageMenu.innerHTML = `
      <div class="top">
        <h1>Rock, Paper, Scissors</h1>
      </div>
      <div class="mid">
        <h1>Tap to Play !</h1>
      </div>
`;

// Opening context-menu
mainMenu.addEventListener("contextmenu", function (e) {
  // Disable deafault action
  e.preventDefault();
  // Grab menu from html
  const contextElement = document.getElementById("context-menu");
  // Position the menu
  console.log(e);
  contextElement.style.display = "block";
  contextElement.style.top = e.clientY + "px";
  contextElement.style.left = e.clientX + "px";
});

// Close context-menu
window.addEventListener("click", function (e) {
  document.getElementById("context-menu").style.display = "none";
});

// Close game menu
exit.addEventListener("click", function (e) {
  mainMenu.style.display = "none";
  body.appendChild(rageMenu);
});

// Open game menu
rageMenu.addEventListener("click", function (e) {
  mainMenu.style.display = "grid";
  body.removeChild(rageMenu);
  gameOver = true;
  resetGame();
});

// Reset score from context-menu
reset.addEventListener("click", function () {
  gameOver = true;
  resetGame();
});

// Edit player name
edit.addEventListener("click", function (e) {
  let textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = "";
  textInput.style.top = e.clientY + "px";
  textInput.style.left = e.clientX + "px";
  mainMenu.appendChild(textInput);

  // Change name from user text value
  textInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      changepname.textContent = textInput.value;
      mainMenu.removeChild(textInput);
    }
  });
});

// Shambles scores
shambles.addEventListener("click", function (e) {
  if (!gameOver) {
    let swap = playerscore;
    playerscore = compscore;
    compscore = swap;
    console.log(compscore);
    console.log(playerscore);
    document.getElementById("cscore").innerText = compscore;
    document.getElementById("pscore").innerText = playerscore;
  }
});
