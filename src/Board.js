// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    //time complexity is linear;
    hasRowConflictAt: function(rowIndex) {
      var counter = 0;
      var boardRow = this.get(rowIndex);

      for (var i = 0; i < boardRow.length; i++) {
        if (boardRow[i] === 1) {
          counter++;
        }
        if (counter >= 2) {
          return true;
        }
      }

      return false;
    },

    // test if any rows on this board contain conflicts
    // time cpmplexity quadratic
    hasAnyRowConflicts: function() {

      var counter = 0;
      var boardRows = this.rows();

      for (var i = 0; i < boardRows.length; i++) {

        for (var x = 0; x < boardRows[i].length; x++) {
          if (boardRows[i][x] === 1) {
            counter++;
          }
          if (counter >= 2) {
            return true;
          }
          if (x === boardRows[i].length-1) {
            counter = 0;
          }
        }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // time complexity - linear;
    hasColConflictAt: function(colIndex) {

      var counter = 0;
      var boardRows = this.rows();

      for (var i = 0; i < boardRows.length; i++) {
        if (boardRows[i][colIndex] === 1) {
          counter++;
        }
        if (counter >= 2) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    // time complexity - quadratic
    hasAnyColConflicts: function() {

      var boardRows = this.rows();

      for (var i = 0; i < boardRows.length; i++) {
        if (this.hasColConflictAt([i])) {
          return true;
        }
      }

      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // time complexity - linear
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {


      var position = majorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      var boardRows = this.rows();
      var index = Math.abs(position);


      if (position < 0) {

        for (var i = 0; i < boardRows.length - Math.abs(position); i ++) {
          if (boardRows[index][i] === 1) {
            counter++;
          }
          index++;

        }
      } else {
        for (var i = 0; i < boardRows.length; i++) {
          if (boardRows[i][position] === 1) {
            counter++;
          }

          position++;
        }

      }

      if (counter >= 2) {
        return true;
      }

      return false;
    },


    // test if any major diagonals on this board contain conflicts
    // time complexity - quadratic
    hasAnyMajorDiagonalConflicts: function() {

      var boardRows = this.rows();
      var size = boardRows.length;

      for (var i = -(size - 1); i < size; i ++) {
          if (this.hasMajorDiagonalConflictAt(i)) {
            return true;
          }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // time complexity - linear
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // increase row and decrease column- starting from top right
      var boardRows = this.rows();
      var counter = 0;
      var position = minorDiagonalColumnIndexAtFirstRow;

      // var numOfDiagonals = ((boardRows.length - 1) * 2) + 1;


      for (var i = 0; i < boardRows.length; i++) { // going from right from left
        if (position > boardRows.length -1) {
          i = position - (boardRows.length-1);
          position = boardRows.length -1;

        }
          if (boardRows[i][position] === 1) {
            counter++;

          }
        position--;
      }

      if (counter >= 2) {
        return true;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    // time complexity - quadratic
    hasAnyMinorDiagonalConflicts: function() {

      var boardRows = this.rows();
      var size = boardRows.length;
      var numOfDiagonals = ((boardRows.length - 1) * 2) + 1;

      for (var i = 0; i < numOfDiagonals; i++) {
          if (this.hasMinorDiagonalConflictAt(i)) {
            return true;
          }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
