var Jada = require('../lib/main');

var datastore = Jada.create();

function listenerFired (label, key, oldValue, newValue) {
  var currentValue = datastore.get(key);

  console.log(label);
  console.log('=============')
  console.log('          Key: ' + key);
  console.log('Current Value: ' + currentValue);
  console.log('    Old Value: ' + oldValue);
  console.log('    New Value: ' + newValue);
  console.log('');
}

// Fires twice,
// once before setting 'my-key' and
// once before setting 'my-other-key'
// 
// This callback will fire before any key is set.
datastore.before(function (key, oldValue, newValue) {
  listenerFired('Before All', key, oldValue, newValue);
});

// Fires twice,
// once after setting 'my-key' and
// once after setting 'my-other-key'
// 
// This callback will fire after any key is set.
datastore.after(function (key, oldValue, newValue) {
  listenerFired('After All', key, oldValue, newValue);
});

// Fires once,
// once before setting 'my-key'
// 
// This callback will fire once before the specified key is set.
datastore.before('my-key', function (key, oldValue, newValue) {
  listenerFired('Before my-key', key, oldValue, newValue);
});

// Fires once,
// once after setting 'my-key'
// 
// This callback will fire once after the specified key is set.
datastore.after('my-key', function (key, oldValue, newValue) {
  listenerFired('After my-key', key, oldValue, newValue);
});

// Sets 'my-key' to the value 'Hello, world!'
datastore.set('my-key', 'Hello, World!');

// Sets 'my-other-key' to the value 'Goodbye, Bob!'
datastore.set('my-other-key', 'Goodbye, Bob!');

// This will log the value 'Hello, World!'
// for the key 'my-key'.
console.log(datastore.get('my-key'));

// This will log the value 'Goodbye, Bob!'
// for the key 'my-other-key'.
console.log(datastore.get('my-other-key'));