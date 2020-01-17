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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
