
var MAIN = 'lib/main.js';
var DEV = 'dev.js';
var PROD = 'prod.js';
var TEST_BUILD = 'test.js';
var BUILD = 'build';
var TEST = 'test/*';

var pack = {};

pack.getMain = function () {
  return MAIN;
};

pack.getTest = function () {
  return TEST;
};

pack.getBuild = function () {
  return BUILD;
};

pack.getDev = function () {
  return DEV;
};

pack.getProd = function () {
  return PROD;
};

pack.getTestBuild = function () {
  return TEST_BUILD;
};

module.exports = pack;