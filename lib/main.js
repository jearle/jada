
var Jada = require('./jada');

var pack = {};

pack.create = function () {
  return new Jada();
};

module.exports = pack;