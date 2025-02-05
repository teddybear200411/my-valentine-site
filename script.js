document.addEventListener("DOMContentLoaded", function () {
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const sudokuSection = document.getElementById("sudoku-section");
    const difficultySection = document.getElementById("difficulty-selector");
    const playMusicButton = document.getElementById("play-music");
    const backgroundMusic = document.getElementById("background-music");

    let hasPlayed = false;
    let selectedDifficulty = 'medium';

    // Move the "No Thanks" button when hovered
    noButton.addEventListener("mouseover", function () {
        const maxX = window.innerWidth - noButton.offsetWidth - 20;
        const maxY = window.innerHeight - noButton.offsetHeight - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.position = "absolute";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    });

    // Show difficulty selection when clicking "Yes" (or "New Game")
    yesButton.addEventListener("click", function () {
        document.querySelector('h1').textContent = "i hope you enjoy, i love you so much!";
        difficultySection.style.display = "block";
        sudokuSection.style.display = "none";

        // Remove "No Thanks" permanently once "Absolutely Yes" is clicked
        if (noButton) {
            noButton.remove();
        }

        if (hasPlayed) {
            yesButton.textContent = "new game";
        }
    });

    // Difficulty selection logic
    document.getElementById('difficulty').addEventListener('change', () => {
        selectedDifficulty = document.getElementById('difficulty').value;
        startSudokuGame(selectedDifficulty);
    });

    function startSudokuGame(difficulty) {
        difficultySection.style.display = "none";
        sudokuSection.style.display = "block";

        if (typeof initializeSudoku === "function") {
            initializeSudoku(difficulty);
        } else {
            console.error("initializeSudoku function is missing or not defined!");
        }

        hasPlayed = true;
        yesButton.textContent = "new game";
    }

    // Play background music on click
    playMusicButton.addEventListener("click", function () {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playMusicButton.innerHTML = "Pause Music";
        } else {
            backgroundMusic.pause();
            playMusicButton.innerHTML = "<3";
        }
    });
   
    function provideHint() {
        const boardInputs = document.querySelectorAll("#sudoku-board input");
        const emptyCells = Array.from(boardInputs).filter(input => input.value === "");
    
        if (emptyCells.length === 0) {
            alert("no empty cells left for hints!");
            return;
        }
    
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const row = randomCell.dataset.row;
        const col = randomCell.dataset.col;
    
        randomCell.value = window.sudokuSolution[row][col];
        randomCell.disabled = true; // Make the hinted cell uneditable
    }    

    // Check answers button logic
    document.getElementById("check-answers").addEventListener("click", function () {
        const isCorrect = checkBoard();
        if (isCorrect) {
            alert("YAYYY!! you got it, baby!! im so proud of you :)");
        } else {
            alert("keep trying, my love!! you got this!");
        }
    });
    
    // New event listener for the hint button
    document.getElementById("get-hint").addEventListener("click", function () {
        provideHint();
    });
    
});
