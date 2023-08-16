const inputs = ["rock", "paper", "scissors"];
let pScore = 0;
let cScore = 0;
let ties = 0;

function disableButton(button) {
  button.disabled = true;
  button.style.cursor = "no-drop";
}

function enableButton(button) {
  button.disabled = false;
  button.style.cursor = "pointer";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getInputString() {
  return inputs.join(" ");
}

function getComputerChoice() {
  return inputs[(Math.random() * inputs.length) << 0];
}

function playRound(playerSelection, computerSelection) {
  const returnObj = { pWon: false, tie: false, message: "" };

  if (playerSelection === computerSelection) {
    returnObj.message = "Tied! Nothing won, nothing lost.";
    returnObj.tie = true;
    return returnObj;
  }

  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    returnObj.pWon = true;
    returnObj.message = `You win! ${capitalizeFirstLetter(playerSelection)} beats ${capitalizeFirstLetter(
      computerSelection
    )}.`;
    return returnObj;
  }

  returnObj.message = `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${capitalizeFirstLetter(
    playerSelection
  )}.`;
  return returnObj;
}

function generateResult(pScore, cScore) {
  disableButton(rockButton);
  disableButton(paperButton);
  disableButton(scissorsButton);

  if (pScore === cScore) {
    finalStatusMsg.textContent = `Match tied! Both won ${pScore} rounds.`;
    finalStatusMsg.style.color = "blue";
  } else if (pScore > cScore) {
    finalStatusMsg.textContent = `You won! Rounds won: ${pScore}. Rounds lost: ${cScore}. Rounds tied: ${ties}`;
    finalStatusMsg.style.color = "green";
  } else {
    finalStatusMsg.textContent = `You lost! Rounds won: ${pScore}. Rounds lost: ${cScore}. Rounds tied: ${ties}`;
    finalStatusMsg.style.color = "red";
  }

  playAgainButton.style.display = "";
}

function game(e) {
  const computerSelection = getComputerChoice();
  const playerSelection = e.target.classList[0];

  const roundStatus = playRound(playerSelection, computerSelection);
  roundStatusMsg.textContent = roundStatus.message;

  if (roundStatus.tie) {
    roundStatusMsg.style.color = "blue";
    ties++;
    return;
  }

  if (roundStatus.pWon) {
    roundStatusMsg.style.color = "green";
    pScore++;
  } else {
    roundStatusMsg.style.color = "red";
    cScore++;
  }

  pScoreElement.textContent = pScore;
  cScoreElement.textContent = cScore;

  if (cScore === 5 || pScore === 5) {
    generateResult(pScore, cScore);
  }
}

function resetGame() {
  // Reset buttons.
  playAgainButton.style.display = "none";
  enableButton(rockButton);
  enableButton(paperButton);
  enableButton(scissorsButton);

  // Reset scores.
  cScore = 0;
  pScore = 0;
  ties = 0;

  pScoreElement.textContent = pScore;
  cScoreElement.textContent = cScore;

  // Reset messages.
  roundStatusMsg.textContent = "";
  finalStatusMsg.textContent = "";
}

// Target HTML Elements
const rockButton = document.querySelector(".rock");
const paperButton = document.querySelector(".paper");
const scissorsButton = document.querySelector(".scissors");
const playAgainButton = document.querySelector("#play-again");

const pScoreElement = document.querySelector("#player-score");
const cScoreElement = document.querySelector("#comp-score");

const roundStatusMsg = document.querySelector(".round-status");
const finalStatusMsg = document.querySelector(".final-status");

// Event Listeners
rockButton.addEventListener("click", game);
paperButton.addEventListener("click", game);
scissorsButton.addEventListener("click", game);
playAgainButton.addEventListener("click", resetGame);

// Initial state.
resetGame();
