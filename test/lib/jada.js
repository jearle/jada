
var chai = require('chai');
chai.should();

var Jada = require('lib/jada');

var NotPlainObjectError = require('lib/errors/not-plain-object-error');

function beforeAfterHelper (method) {
  var count = 0;
  var data = {
    'key': 'val',
    'key2': 'val'
  };
  var jada = new Jada(data);
  jada[method](function () {
    count++;
  });
  jada.set('key', 'newValue');
  jada.set('key2', 'newValue');
  (count).should.equal(2);
}

describe('lib/jada', function () {

  describe('#constructor', function () {
    
    it('should create an instance of Jada', function () {
      
      var jada = new Jada();
      jada.should.be.instanceof(Jada);
    
    });

    it('should throw a NotPlainObjectError', function () {

      (function () {
        var jada;
        jada = new Jada([1]);
      }).should.throw(new NotPlainObjectError().message);

    });

  });

  describe('#get', function () {

    it('should get the a the proper value', function () {

      var data = {'key': 'value'};
      var jada = new Jada(data);
      jada.get('key').should.equal('value');

    });

  });

  describe('#set', function () {

    it('should set the value', function () {

      var data = {'key': 'value'};
      var jada = new Jada(data);
      jada.set('key', 'newValue');
      jada.get('key').should.equal('newValue');

    });

  });

  describe('#remove', function () {

    it('should delete the key', function () {

      var data = {'key': 'value'};
      var jada = new Jada(data);
      jada.remove('key');
      jada.dump().should.eql({});

    });

  });

  describe('#dump', function () {

    it('dump should equal data passed to constructor', function () {

      var data = {'key': 'value'};
      var jada = new Jada(data);
      jada.dump().should.eql(data);

    });

  });

  describe('#keys', function () {

    it('should return the same keys as data', function () {

      var data = {'key': 'value'};
      var jada = new Jada(data);
      jada.keys().should.eql(Object.keys(data));

    });

  });

  describe('#clear', function () {

    it('should clear the data store of all values', function () {

      var data = {'key': 'value'};
      var jada = new Jada(data);
      jada.clear();
      jada.dump().should.eql({});

    });

  });

  describe('#before', function () {

    it('should fire twice when no key is supplied', function () {
      beforeAfterHelper('before');
    });

  });

  describe('#after', function () {
    it('should fire twice when no key is supplied', function () {
      beforeAfterHelper('after');
    });
  });

});