var square = require('./src/square');

console.log(square(125));


// Try npm module underscore
var _ = require('underscore');

_.each([1, 2, 3], function (n) {
  console.log(n); //=> 1, 2, 3
});