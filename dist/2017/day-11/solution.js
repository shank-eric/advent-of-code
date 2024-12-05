"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tile =
/*#__PURE__*/
function () {
  function Tile(circle, position, grid) {
    _classCallCheck(this, Tile);

    this.circle = circle;
    this.position = position; // this.grid = grid;

    this.relatedTiles = {};
    this.buildRelatedTiles(grid);
  }

  _createClass(Tile, [{
    key: "buildRelatedTiles",
    value: function buildRelatedTiles(grid) {
      // let side = this.position % 6;
      // console.log(side);
      if (this.circle > 0) {
        var currCircle = grid[this.circle];
        var prevCircle = grid[this.circle - 1];

        if (this.position === 0) {
          this.spot = 'top'; //same position in prev circle is S

          this.relatedTiles.s = prevCircle[this.position];
          prevCircle[this.position].relatedTiles.n = this;
        } else if (0 < this.position && this.position < this.circle) {
          this.spot = 'top-right-side'; //same position in prev circle is S

          this.relatedTiles.s = prevCircle[this.position];
          prevCircle[this.position].relatedTiles.n = this; //previous tile in the circle is NW

          this.relatedTiles.nw = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.se = this; //previous tile in the previous circle is SW

          this.relatedTiles.sw = prevCircle[this.position - 1];
          prevCircle[this.position - 1].relatedTiles.ne = this;
        } else if (this.position === this.circle) {
          this.spot = 'top-right-corner'; //top right corner
          //previous tile in the circle is NW

          this.relatedTiles.nw = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.se = this; //previous tile in the previous circle is SW

          this.relatedTiles.sw = prevCircle[this.position - 1];
          prevCircle[this.position - 1].relatedTiles.ne = this;
        } else if (this.circle < this.position && this.position < this.circle * 2) {
          this.spot = 'right-side'; //previous tile in the circle is N

          this.relatedTiles.n = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.s = this; //2 previous tile in the previous circle is NW

          this.relatedTiles.nw = prevCircle[this.position - 2];
          prevCircle[this.position - 2].relatedTiles.se = this; //previous tile in the previous circle is SW

          this.relatedTiles.sw = prevCircle[this.position - 1];
          prevCircle[this.position - 1].relatedTiles.ne = this;
        } else if (this.position === this.circle * 2) {
          this.spot = 'bottom-right-corner'; //previous tile in the circle is N

          this.relatedTiles.n = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.s = this; //2 previous tile in the previous circle is NW

          this.relatedTiles.nw = prevCircle[this.position - 2];
          prevCircle[this.position - 2].relatedTiles.se = this;
        } else if (this.circle * 2 < this.position && this.position < this.circle * 3) {
          this.spot = 'bottom-right-side'; //previous tile in the circle is NE

          this.relatedTiles.ne = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.sw = this; //2 previous tile in the previous circle is NW

          this.relatedTiles.nw = prevCircle[this.position - 2];
          prevCircle[this.position - 2].relatedTiles.se = this; //3 previous tile in the previous circle is N

          this.relatedTiles.n = prevCircle[this.position - 3];
          prevCircle[this.position - 3].relatedTiles.s = this;
        } else if (this.position === this.circle * 3) {
          this.spot = 'bottom'; //previous tile in the circle is NE

          this.relatedTiles.ne = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.sw = this; //3 previous tile in the previous circle is N

          this.relatedTiles.n = prevCircle[this.position - 3];
          prevCircle[this.position - 3].relatedTiles.s = this;
        } else if (this.circle * 3 < this.position && this.position < this.circle * 4) {
          this.spot = 'bottom-left-side'; //previous tile in the circle is SE

          this.relatedTiles.se = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.nw = this; //3 previous tile in the previous circle is N

          this.relatedTiles.n = prevCircle[this.position - 3];
          prevCircle[this.position - 3].relatedTiles.s = this; //4 previous tile in the previous circle is NE

          this.relatedTiles.ne = prevCircle[this.position - 4];
          prevCircle[this.position - 4].relatedTiles.sw = this;
        } else if (this.position === this.circle * 4) {
          this.spot = 'bottom-left-corner'; //previous tile in the circle is SE

          this.relatedTiles.se = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.nw = this; //4 previous tile in the previous circle is NE

          this.relatedTiles.ne = prevCircle[this.position - 4];
          prevCircle[this.position - 4].relatedTiles.sw = this;
        } else if (this.circle * 4 < this.position && this.position < this.circle * 5) {
          this.spot = 'left-side'; //previous tile in the circle is SE

          this.relatedTiles.s = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.n = this; //4 previous tile in the previous circle is NE

          this.relatedTiles.ne = prevCircle[this.position - 4];
          prevCircle[this.position - 4].relatedTiles.sw = this; //5 previous tile in the previous circle is SE

          this.relatedTiles.se = prevCircle[this.position - 5];
          prevCircle[this.position - 5].relatedTiles.nw = this;
        } else if (this.position === this.circle * 5) {
          this.spot = 'top-left-corner'; //previous tile in the circle is SE

          this.relatedTiles.s = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.n = this; //5 previous tile in the previous circle is SE

          this.relatedTiles.se = prevCircle[this.position - 5];
          prevCircle[this.position - 5].relatedTiles.nw = this;
        } else if (this.circle * 5 < this.position && this.position < this.circle * 6) {
          this.spot = 'top-left-side'; // previous tile in the circle is SW

          this.relatedTiles.sw = currCircle[this.position - 1];
          currCircle[this.position - 1].relatedTiles.ne = this;

          if (this.position - 5 === (this.circle - 1) * 6) {
            this.relatedTiles.ne = currCircle[0];
            currCircle[0].relatedTiles.sw = this;
          } //5 previous tile in the previous circle is SE


          var prevTilePosition = this.position - 5 === (this.circle - 1) * 6 ? 0 : this.position - 5;
          this.relatedTiles.se = prevCircle[prevTilePosition];
          prevCircle[prevTilePosition].relatedTiles.nw = this; //6 previous tile in the previous circle is S

          this.relatedTiles.s = prevCircle[this.position - 6];
          prevCircle[this.position - 6].relatedTiles.n = this;
        }
      }
    }
  }, {
    key: "goHome",
    value: function goHome() {
      if (this.circle === 0) {
        return this;
      } else {
        switch (this.spot) {
          case 'top':
            return this.relatedTiles.s;
            break;

          case 'top-right-side':
            return this.relatedTiles.sw;
            break;

          case 'top-right-corner':
            return this.relatedTiles.sw;
            break;

          case 'right-side':
            if (this.position - this.circle > this.circle / 2) {
              return this.relatedTiles.sw;
            } else {
              return this.relatedTiles.nw;
            }

            break;

          case 'bottom-right-corner':
            return this.relatedTiles.nw;
            break;

          case 'bottom-right-side':
            return this.relatedTiles.nw;
            break;

          case 'bottom':
            return this.relatedTiles.n;
            break;

          case 'bottom-left-side':
            return this.relatedTiles.ne;
            break;

          case 'bottom-left-corner':
            return this.relatedTiles.ne;
            break;

          case 'left-side':
            if (this.position - this.circle * 4 > this.circle / 2) {
              return this.relatedTiles.se;
            } else {
              return this.relatedTiles.ne;
            }

            break;

          case 'top-left-corner':
            return this.relatedTiles.se;
            break;

          case 'top-left-side':
            return this.relatedTiles.se;
            break;
        }
      }
    }
  }, {
    key: "adjacentTile",
    value: function adjacentTile(step) {
      // if (!this.relatedTiles[step]){
      //   console.log(`can't step "${step}"; relatedTiles = ${util.inspect(this.relatedTiles)}`)
      // }
      return this.relatedTiles[step];
    }
  }]);

  return Tile;
}();

var solution_1 = function solution_1(input) {
  var steps = input.split(',');
  var currentCircle = 0;
  var currentPosition = 0;
  var grid = {};
  var currentTile = new Tile(0, 0, grid); // console.log(currentTile);

  grid[0] = [currentTile];
  steps.forEach(function (step) {
    // console.log(step);
    if (currentTile.adjacentTile(step)) {
      currentTile = currentTile.adjacentTile(step);
    } else {
      var circle = currentTile.circle + 1;
      grid[circle] = [];

      for (var i = 0; i < circle * 6; i++) {
        grid[circle].push(new Tile(circle, i, grid));
      }

      console.log("built circle #".concat(circle)); // console.log(util.inspect(grid[circle], { depth: 3 }));

      var newTile = currentTile.adjacentTile(step);

      if (!newTile) {
        console.log("can't step ".concat(step, " from ").concat(_util.default.inspect(currentTile)));
      }

      currentTile = newTile;
    }
  });
  var stepsBack = 0;

  while (currentTile.circle !== 0) {
    var newTile = currentTile.goHome();

    if (!newTile) {
      console.log("can't goHome from ".concat(_util.default.inspect(currentTile)));
    }

    currentTile = newTile;
    stepsBack++;
  } // console.log(currentTile);


  return stepsBack;
};

var solution = function solution(input) {
  var steps = input.split(',');
  var currentCircle = 0;
  var currentPosition = 0;
  var grid = {};
  var currentTile = new Tile(0, 0, grid); // console.log(currentTile);

  grid[0] = [currentTile];
  var maxStepsAway = 0;
  steps.forEach(function (step) {
    // console.log(step);
    if (currentTile.adjacentTile(step)) {
      currentTile = currentTile.adjacentTile(step);
    } else {
      var circle = currentTile.circle + 1;
      grid[circle] = [];

      for (var i = 0; i < circle * 6; i++) {
        grid[circle].push(new Tile(circle, i, grid));
      } // console.log(`built circle #${circle}`);


      var newTile = currentTile.adjacentTile(step);

      if (!newTile) {
        console.log("can't step ".concat(step, " from ").concat(_util.default.inspect(currentTile)));
      }

      var stepsBack = 0;
      var returnTile = newTile;

      while (returnTile.circle !== 0) {
        returnTile = returnTile.goHome();
        stepsBack++;
      }

      if (stepsBack > maxStepsAway) {
        maxStepsAway = stepsBack;
      }

      currentTile = newTile;
    }
  });
  return maxStepsAway;
};

var _default = solution;
exports.default = _default;