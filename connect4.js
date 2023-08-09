"use strict";

/**
 * what HTML would be useful for the game board itself?
  Have a div for each of the boxes within one big game board
  Separate classes for red / yellow toggling
how could you represent a played-piece in the HTML board?
  add classes
in the JavaScript, what would be a good structure for the in-memory game board?
  Use nested Arrays to track the game board for rows / columns matrix
  Can use indeces for the played game piece
what might the flow of the game be?
  Player 1
  Add piece to board by changing class
  Check if win - if no win, then go to player 2


Function names / Descriptions

  function createGameBoard
    possibly use button

  function addGamePiece
    place red or yellow piece
    maybe have separate function for each player?

  function checkForWinner
    Checks for 4 of the same color piece in a row.
 */



/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

let rowLine =[];
for (let c = 0; c < HEIGHT;c++ ){

  for (let r = 0; r < WIDTH; r++){
    rowLine.push(null);
  }
  board.push(rowLine);
  rowLine = [];
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // creates top tr element and assigns id and column-top attributes
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // creates cells of top row with id, top-number attributes, and eventlisteners
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    const gameRow = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const gameCell = document.createElement("td");

      // add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
      gameCell.setAttribute("id", `c-${y}-${x}`);

      // append the table cell to the table row
      gameRow.append(gameCell);

    }
    // append the row to the html board
    htmlBoard.append(gameRow);

  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement('div');
  gamePiece.classList.add('piece',`p${currPlayer}`);


  const cell = document.getElementById(`c-${y}-${x}`);
  debugger;
  cell.append(gamePiece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id; // Possibly change to const or let

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x); //Possibly change to const
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every((cell) => {
    cell !== null}))
    {
    return endGame('Tie Game');
  }
  // switch players
  if (currPlayer === 1){
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
