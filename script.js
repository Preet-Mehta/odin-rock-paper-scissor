const inputs = ["rock", "paper", "scissors"];

function getInputString() {
  return inputs.join(" ");
}

function getComputerChoice() {
  return inputs[(Math.random() * inputs.length) << 0];
}

function playRound(playerSelection, computerSelection) {
  const returnObj = { error: true, pWon: false, tie: false, message: "" };

  const pSelection = playerSelection.toLowerCase();
  const cSelection = computerSelection.toLowerCase();

  if (!inputs.includes(pSelection)) {
    returnObj.message = `Incorrect input found. Choice must be from: ${getInputString()}`;
    return returnObj;
  }

  returnObj.error = false;

  if (pSelection === cSelection) {
    returnObj.message = "Tied! Nothing won, nothing lost.";
    returnObj.tie = true;
    return returnObj;
  }

  if (
    (pSelection === "rock" && cSelection === "scissors") ||
    (pSelection === "paper" && cSelection === "rock") ||
    (pSelection === "scissors" && cSelection === "paper")
  ) {
    returnObj.pWon = true;
    returnObj.message = `You win! ${pSelection} beats ${cSelection}.`;
    return returnObj;
  }

  returnObj.message = `You lose! ${cSelection} beats ${pSelection}.`;
  return returnObj;
}

function generateResult(pScore, cScore) {
  if (pScore === cScore) {
    console.log(`Match tied! Both won ${pScore} rounds.`);
  } else if (pScore > cScore) {
    console.log(`You won! Rounds won: ${pScore}. Rounds lost: ${cScore}. Rounds tied: ${5 - pScore - cScore}`);
  } else {
    console.log(`You lost! Rounds won: ${pScore}. Rounds lost: ${cScore}. Rounds tied: ${5 - pScore - cScore}`);
  }
}

function game() {
  let pScore = 0;
  let cScore = 0;
  let retries = 0;
  let rounds = 0;

  while (rounds < 5) {
    const playerSelection = prompt(`What's your choice: ${getInputString()}`);
    const computerSelection = getComputerChoice();

    const roundStatus = playRound(playerSelection, computerSelection);

    if (roundStatus.error) {
      console.log(roundStatus.message);
      if (retries === 2) {
        break;
      }

      console.log(`${3 - ++retries} attempt(s) remaining before the game will quit.`);
      continue;
    }

    rounds++;

    if (roundStatus.tie) {
      console.log(roundStatus.message);
      continue;
    }

    console.log(roundStatus.message);
    if (roundStatus.pWon) {
      pScore++;
    } else {
      cScore++;
    }
  }

  if (retries < 2) {
    generateResult(pScore, cScore);
  } else {
    console.log("Too many incorrect attempts recorded.");
  }
}

game();
