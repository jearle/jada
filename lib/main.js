
var Jada = require('./jada');

var pack = {};

pack.create = function (data) {
  return new Jada(data);
};

module.exports = pack;