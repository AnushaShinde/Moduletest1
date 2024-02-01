// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const humanScoreElement = document.getElementById("human-score");
const computerScoreElement = document.getElementById("computer-score");

const nextButton = document.getElementById("next-btn");

let humanScore = parseInt(localStorage.getItem("humanScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

// Update score display
updateScoreDisplay();

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win";
      resultDivs[0].classList.toggle("winner");
      humanScore++;
      localStorage.setItem("humanScore", humanScore);

      // Display the "Next" button when human wins
      nextButton.style.display = "block";
    } else if (aiWins) {
      resultText.innerText = "You lose";
      resultDivs[1].classList.toggle("winner");
      computerScore++;
      localStorage.setItem("computerScore", computerScore);

      // Hide the "Next" button when human loses
      nextButton.style.display = "none";
    } else {
      resultText.innerText = "Draw";

      // Hide the "Next" button in case of a draw
      nextButton.style.display = "none";
    }

    // Explicitly show the "Play Again" button
    playAgainBtn.style.display = "block";

    updateScoreDisplay();
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScoreDisplay() {
  humanScoreElement.textContent = humanScore;
  computerScoreElement.textContent = computerScore;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

// Event listener for "Next" button (if it leads to a new game step/screen)
nextButton.addEventListener("click", () => {
  // Check if the current page is index.html and human wins
  if (window.location.pathname.includes("index.html") && isWinner([CHOICES])) {
    // Handle "Next" button logic here
    // For example, move to the next game step or screen

    // Increment the score
    humanScore++;
    localStorage.setItem("humanScore", humanScore);

    // Navigate to win.html
    window.location.href = "win.html";
  }
});

// Function to redirect to win.html
function redirectToWinPage() {
  window.location.href = "win.html";
}
