uniq = require('uniq');
var nums = [5,6,3,5,6,7,8,7,7];
console.log(uniq(nums));
module.exports = function (n) {
  return uniq(nums)
};
