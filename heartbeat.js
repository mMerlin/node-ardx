/*jslint browser: false, node: true, devel: true, todo: false, indent: 2, maxlen: 82 */
/* jshint bitwise: true, curly: true, eqeqeq: true, es3: false,
   forin: true, freeze: true, futurehostile: true, latedef: true,
   maxcomplexity: 8, maxstatements: 35, noarg: true, nocomma: true,
   noempty: true, nonew: true, singleGroups: true, undef: true, unused: true,
   plusplus: true, strict: true, browser: true, devel: true
*/
'use strict';

var five = require('johnny-five');
var myBoard = new five.Board();

var pinConfig = {
  id: 'Heartbeat',
  pin: 4,
  freq: 2000,//milliseconds (2 seconds)
  // mode: five.Pin.INPUT,
  // type: 'digital'
};

function heartData(a, b, c) {
  /* jshint validthis:true */
  console.log('heartData start');//trace
  console.log('data:', this);
  console.log('a', a);
  console.log('b', b);
  console.log('c', c);
  console.log('heartData end');//trace
}

/***
 * process result of reading pin
 *
 * @param {Object} err    error object
 * @param {integer} value The latest value read from the pint
 * @return {undefined}
 */
function heartRead(err, value) {
  /* jshint validthis:true */
  console.log('heartRead start');//trace
  console.log('heart error:', err);
  console.log('heart value:', value);
  console.log('heart this:', this);
  console.log('heartRead end');//trace
}// ./function heartRead(err, value)

/**
 * Report pin state information
 *
 * [To be] executed as a callback for the .query method of a Pin instanced
 *
 * @param {Object} state      State information objectg for a Pin
 * @return {undefined}
 */
function showPinState(state) {
  console.log('heart state', state);
  // console.log(this);//undefined//DEBUG, explore calling context
}// ./function showPinState(state)

/**
 * The code for the project, that will be run when the board is ready
 *
 * This is a 'callback' function that will be run by johnny-five after it has
 * finished all the behind the scenes setup.
 *data type
 * johnny-five makes the board that this is a callback for available in the
 * 'this' parameter / variable.  All methods / properties of the specific
 * board are available as properties of 'this'.
 */
function myProjectCode() {
  var heartPin = new five.Pin(pinConfig);
  // console.log('Pin:', heartPin);
  heartPin.query(showPinState);
  console.log('query callback configured');
  // heartPin.mode = five.Pin.INPUT;//not linked to state
  heartPin.read(heartRead);
  console.log('read callback configured');
  heartPin.on('data', heartData);
  console.log('data callback configured');

  this.repl.inject({
    heart: heartPin
  });
  console.log('heart injected to repl');
  // process.exit();
}// ./function myProjectCode()

// This is where the program actully starts running.  It is kept at the end,
// after the callback function myProjectCode has been created, so that the
// jslint program does not complain about using something before it was defined.
// The way javascript works, it is not a technical requirement.  Just good
// practice.
myBoard.on('ready', myProjectCode);
