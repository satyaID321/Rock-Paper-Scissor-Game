const buttonEl = document.querySelectorAll("button");
const rockEl = document.getElementById("rock");
const paperEl = document.getElementById("paper");
const scissorEl = document.getElementById("scissor");
const resetEl = document.getElementById("reset");

/*using shorter way to rewrite json code uning default opertor*/
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
updateScore();

resetEl.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
  document.querySelector(".js-result").innerHTML = "";
  document.querySelector(".js-moves").innerHTML = "";
});

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = " ";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissor";
  }
  return computerMove;
}

rockEl.addEventListener("click", () => {
  playGame("rock");
});

paperEl.addEventListener("click", () => {
  playGame("paper");
});

scissorEl.addEventListener("click", () => {
  playGame("scissor");
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = " ";
  if (playerMove === "scissor") {
    if (computerMove === "rock") {
      result = "You Lose.";
    } else if (computerMove === "paper") {
      result = "You Win.";
    } else if (computerMove === "scissor") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissor") {
      result = "You Lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You Lose.";
    } else if (computerMove === "scissor") {
      result = "You Win.";
    }
  }
  if (result === "You Win.") {
    score.wins += 1;
  } else if (result === "You Lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  // localStorage.setItem('message','Hello');

  updateScore();

  document.querySelector(".js-result").innerHTML = `${result}`;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You picked ${playerMove} - Computer picked ${computerMove}`;

  //   alert(`you picked ${playerMove}. Computer picked ${computerMove}. ${result}
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties} `)
}