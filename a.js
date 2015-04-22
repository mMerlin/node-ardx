'use strict';
var five = require('johnny-five');
var myBoard = new five.Board();
var cfg = {
  id: 'Analog test',
  pin: 'A5',
  type: 'analog',
  range: [0, 1023],
  freq: 9000
};
function dataCallback(err, val) {
  /* jshint validthis: true */
  console.log('data callback for', this.id, 'with:', err, val);
}
myBoard.on('ready', function () {
  var tst = new five.Sensor(cfg);
  tst.on('data', dataCallback);
});
