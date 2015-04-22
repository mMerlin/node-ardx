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
var cfg = {
  id: 'Digital test',
  pin: 8,
  type: 'digital',
  range: [0, 1],
  freq: 9000
};
function dataCallback(err, val) {
  console.log('data callback for', this.id, 'with:', err, val);
}
myBoard.on('ready', function () {
  new five.Sensor(cfg).on('data', dataCallback);
});
