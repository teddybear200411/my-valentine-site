// Function to generate and display Sudoku board
function initializeSudoku(difficulty) {
    let solvedBoard = generateSolvedBoard();
    let puzzleBoard = generatePuzzle(solvedBoard, difficulty);
    
    displayBoard(puzzleBoard);
    
    // Store the solved board for checking answers
    window.sudokuSolution = solvedBoard;
}

// Function to generate a complete, solved Sudoku board
function generateSolvedBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));

    function isValid(num, row, col) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        let boxRow = Math.floor(row / 3) * 3, boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        return true;
    }

    function solve(row = 0, col = 0) {
        if (row === 9) return true;
        if (col === 9) return solve(row + 1, 0);
        if (board[row][col] !== 0) return solve(row, col + 1);

        let nums = [...Array(9)].map((_, i) => i + 1).sort(() => Math.random() - 0.5);
        for (let num of nums) {
            if (isValid(num, row, col)) {
                board[row][col] = num;
                if (solve(row, col + 1)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    solve();
    return board;
}

// Function to create a puzzle by removing numbers from the solved board
function generatePuzzle(solvedBoard, difficulty) {
    let puzzle = solvedBoard.map(row => [...row]);
    let attempts;
    
    // Set number of attempts based on difficulty level
    if (difficulty === 'easy') {
        attempts = 30; // Easier puzzles have fewer cells removed
    } else if (difficulty === 'medium') {
        attempts = 40; // Medium difficulty
    } else if (difficulty === 'hard') {
        attempts = 50; // Hard puzzles have more cells removed
    }

    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            attempts--;
        }
    }
    return puzzle;
}

// Function to display the board in the HTML
function displayBoard(board) {
    const boardContainer = document.getElementById("sudoku-board");
    boardContainer.innerHTML = ""; // Clear existing board
    boardContainer.style.display = "grid"; // Ensure it's visible
    boardContainer.style.gridTemplateColumns = "repeat(9, 40px)"; // 9 columns
    boardContainer.style.gridGap = "2px"; // Spacing between cells

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = 1;
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.classList.add("sudoku-cell");

            if (board[row][col] !== 0) {
                cell.value = board[row][col];
                cell.disabled = true;
            }

            boardContainer.appendChild(cell);
        }
    }
}

// Function to check if the user's solution is correct
function checkBoard() {
    let inputs = document.querySelectorAll("#sudoku-board input");
    let wrongCount = 0;

    for (let input of inputs) {
        let row = input.dataset.row;
        let col = input.dataset.col;
        let value = parseInt(input.value);

        if (value !== window.sudokuSolution[row][col]) {
            wrongCount++;
        }
    }

    alert(`You have ${wrongCount} incorrect answers!`);
    return wrongCount === 0;
}


