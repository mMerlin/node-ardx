'use strict';
var five = require('johnny-five');
var myBoard = new five.Board();
var period = 5000;
var cfg = {
  id: 'Analog test',
  pin: 'A5',
  type: 'analog',
  range: [0, 1023],
  freq: 9000
};
function doHeartbeat() {
  /* jshint validthis: true */
  console.log('heartbeat callback');
}
function dataCallback(err, val) {
  /* jshint validthis: true */
  console.log(this.id, 'data callback with:', err, val);
}
myBoard.on('ready', function () {
  /* jshint validthis: true */
  new five.Sensor(cfg).on('data', dataCallback);
  this.loop(period, doHeartbeat);
});
