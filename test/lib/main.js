
var chai = require('chai');

chai.should();

var main = require('lib/main');
var Jada = require('lib/jada');

describe('lib/main', function () {
  
  describe('#create', function () {

    it('should create an instance of Jada', function () {
      main.create().should.be.instanceof(Jada);
    });

    it('should create an instance of Jada with default values', function () {
      var ds = main.create({'key': 'value'});

      ds.get('key').should.equal('value');
    })
  
  });

});