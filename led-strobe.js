'use strict';

var five = require('johnny-five');
var myBoard = new five.Board();

var strobe = {
  pin: 13,      // The pin number on the controller board
  speed: 1000   // milliseconds -- 1 second, smaller is faster
};

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
  /* jshint validthis:true */
  var myLed;

  myLed = new five.Led(strobe.pin);

  myLed.strobe(strobe.speed);

  // make myLed available as "led" in REPL

  this.repl.inject({
    led: myLed
  });

  // try "on", "off", "toogle", "strobe", "stop" (stops stobing)
  console.log("You can interact with the LED via the variable 'led' e.g. " +
    "led.on();\n Hit control-D to exit.\n >> "
    );
}

// This is where the program actully starts running.  It is kept at the end,
// after the callback function boardIsReady has been created, so that the
// jslint program does not complain about using something before it was defined.
// The way javascript works, it is not a technical requirement.  Just good
// practice.
myBoard.on('ready', boardIsReady);
