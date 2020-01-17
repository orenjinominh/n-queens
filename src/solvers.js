/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  var countOfRooks = 0;
  // hasAnyRooksConflicts will return if there is row or column conflict
  // use togglePiece to put piece on or take off
  // input is n (n*n board and number of rooks)
  // output - an array of arrays [[1, 0, 0, 0], [0, 1, 0,0] etc...]
  // create a variable holding a new Board
  // create a variable countOfRooks to count how many rooks have been placed so far
  // use recursive function inside to togglePiece and see if conflict happens
  // if there's no conflict, then togglePiece, call function again and increase countOfRooks to place next rook until we have n rooks on board
  // base case is when countOfRooks === n, return board
  // keep running recursive function, if there's a conflict, then untoggle it (and decrease countOfRooks?)

  // recursive function:
  var addRook = function(colIndex, rowIndex) {
    // base case:
    if (countOfRooks === n) {
      return solution;
    }

    // when do we recurse?
    solution.togglePiece(colIndex, rowIndex);

    if (solution.hasAnyRooksConflicts()){
      solution.togglePiece(colIndex, rowIndex);
    } else {
      countOfRooks++;
      colIndex++;
      rowIndex++;
      addRook(colIndex, rowIndex);
    }

  }

  addRook(0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});
  var countOfRooks = 0;

  var addRook = function(row) {

  // base case is when we are on last row, we increment solutionCount and exit out
  // there must be one rook on each row, but we keep track of Rooks by a counter variable
    if (countOfRooks === n) {
      solutionCount++;
    } else {
      // loops through column
      // togglePiece for each column index
      // if there's no column conflict, run addRook again on next row ( ie row + 1) until board is filled
      // untoggle if there's column conflict and try next column

      for (var col = 0; col < n; col++) { // loops thru column on that row
        board.togglePiece(row, col); // toggles Rook
        countOfRooks++; // increase countOfRooks with each rook placed
        if (!board.hasColConflictAt(col)) { // if there's no column conflict, place the next rook
          addRook(row + 1); // place next rook on the next row
        }
        board.togglePiece(row, col); // if there's a column conflict, untoggle
        countOfRooks--; // decrease countOfRooks and try again on next column
      }
    }
  }

  addRook(0); // start search at 0th row

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // use hasAnyQueensConflicts() to check if there's conflict
  var board = new Board({'n': n});
  var solution = board.rows();
  var count = 0;
  // var countOfQueens = 0;

  // recursive function
  // base case is when countOfQueens === n, return solution
  // otherwise, loop thru each column
  // board.togglePiece(row, col)
  // increase countOfQueens
  // if (!board.hasAnyQueensConflicts()) then run addQueen(row + 1)
  var addQueen = function(col, row) {
    //debugger;
    if (n === 0 || n === 2 || n === 3) {
      return [];
    }

    if (count === n) {
      solution = board.rows();
      return;
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(row, col);
        count++;
        // countOfQueens++;
        if (!board.hasAnyQueensConflicts()) {
          addQueen(row + 1);
        } else {
        board.togglePiece(row, col);
        count--;
        }

          // countOfQueens--;
      }
    }
  }

  addQueen(1, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var solution = new Board({'n': n});
  var countOfQueens = 0;


  // recursive function
  // base case is when countOfQueens === n, return solution
  // otherwise, loop thru each column
  // board.togglePiece(row, col)
  // increase countOfQueens
  // if (!board.hasAnyQueensConflicts()) then run addQueen(row + 1)

  var addQueen = function(col) {
    if (countOfQueens === n) {
      solutionCount++;
    } else {

      for (var row = 0; row < n; row ++) {
        solution.togglePiece(row, col);
        countOfQueens++;
        if (!solution.hasAnyQueensConflicts()) {
          addQueen(col + 1);
        } else {
          solution.togglePiece(row, col);
          countOfQueens--;
        }
      }
    }
  }

  addQueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
