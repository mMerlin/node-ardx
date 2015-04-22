'use strict';

var five = require('johnny-five');
var myBoard = new five.Board();

/**
 * The code for the project, that will be run when the board is ready
 *
 * This is a 'callback' function that will be run by johnny-five after it has
 * finished all the behind the scenes setup.
 *
 * johnny-five makes the board that this is a callback for available in the
 * 'this' parameter / variable.  All methods / properties of the specific
 * board are available as properties of 'this'.
 */
function myProjectCode() {
  /* jshint validthis:true */
  // Project code goes here
}

// This is where the program actully starts running.  It is kept at the end,
// after the callback function myProjectCode has been created, so that the
// jslint program does not complain about using something before it was defined.
// The way javascript works, it is not a technical requirement.  Just good
// practice.
myBoard.on('ready', myProjectCode);
