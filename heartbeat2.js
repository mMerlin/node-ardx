/*jslint browser: false, node: true, devel: true, todo: false, indent: 2, maxlen: 82 */
/* jshint bitwise: true, curly: true, eqeqeq: true, es3: false,
   forin: true, freeze: true, futurehostile: true, latedef: true,
   maxcomplexity: 8, maxstatements: 35, noarg: true, nocomma: true,
   noempty: true, nonew: true, singleGroups: true, undef: true, unused: true,
   plusplus: true, strict: true, browser: true, devel: true
*/
'use strict';

/* Exploration to use a sensor object for heartbeat processing.  Works when the
 * sensor uses an analog pin, but that is a scarce resource.  Trying to get to
 * work using a digital pin.
 *
 * The documentation https://github.com/rwaldron/johnny-five/wiki/Sensor for a
 * Sensor (object) says the pin can be "Any pin on board", and the sample values
 * include (apparently) digital pin numbers, but?
 */

var five = require('johnny-five');
var myBoard = new five.Board();

var heartConfig = {
  id: 'Sensor Heartbeat',
  // pin: 'A5',
  // type: 'analog',
  // range: [0, 1023],
  pin: 8,
  type: 'digital',
  range: [0, 1],
  freq: 9000          //milliseconds (9 seconds)
};

/***
 * Handle heartbeat processing, when a new (timed) value is read from the sensor
 *
 * @param {Object} err        error object
 * @param {integer} val       The just read sensor value
 * @return {undefined}
 */
function heartData(err, val) {
  /* jshint validthis:true */
  console.log('heartData start');//trace
  // console.log('data:', this);//The sensor instance
  console.log('err', err);//null//DEBUG
  console.log('val', val);//259//DEBUG
  console.log('heartData end');//trace
}

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
function boardIsReady() {
  var hSensor = new five.Sensor(heartConfig);
  console.log('Sensor:', hSensor);
  hSensor.on('data', heartData);
  console.log('data callback configured');

  this.repl.inject({
    heart: hSensor
  });
  console.log('heart injected to repl');
  // process.exit();
}// ./function boardIsReady()

// This is where the program actully starts running.  It is kept at the end,
// after the callback function boardIsReady has been created, so that the
// jslint program does not complain about using something before it was defined.
// The way javascript works, it is not a technical requirement.  Just good
// practice.
myBoard.on('ready', boardIsReady);
