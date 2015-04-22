'use strict';
var five = require('johnny-five');
var myBoard = new five.Board();
var period = 9000;
var aCfg = {
  id: 'Analog test',
  pin: 'A5',
  type: 'analog',
  range: [0, 1023],
  freq: period
};
var dCfg = {
  id: 'Digital test',
  pin: 8,
  type: 'digital',
  range: [0, 1],
  freq: period
};
function dataCallback(err, val) {
  /* jshint validthis: true */
  console.log('data callback for', this.id, 'with:', err, val);
}
myBoard.on('ready', function () {
  /* jshint validthis: true */
  var a, d;
  a = new five.Sensor(aCfg);
  d = new five.Sensor(dCfg);
  a.on('data', dataCallback);
  d.on('data', dataCallback);
});
