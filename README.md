# Jada

Jada is a simple, lightweight library for storing data.  It does not update localStorage, nor does it provide hooks for syncing data to a server.  It simply gets and sets data, and provides hooks for listening to when data has been set both before and after.

## Example

```js

var datastore = Jada.create();

datastore.before(function (key, oldValue, newValue) {
  var currentValue = datastore.get(key);

  console.log('Before All');
  console.log('=============')
  console.log('          Key: ' + key);
  console.log('Current Value: ' + currentValue);
  console.log('    Old Value: ' + oldValue);
  console.log('    New Value: ' + newValue);
  console.log('');
});

datastore.after(function (key, oldValue, newValue) {
  var currentValue = datastore.get(key);

  console.log('After All');
  console.log('=============')
  console.log('          Key: ' + key);
  console.log('Current Value: ' + currentValue);
  console.log('    Old Value: ' + oldValue);
  console.log('    New Value: ' + newValue);
  console.log('');
});

datastore.before('my-key', function (key, oldValue, newValue) {
  var currentValue = datastore.get(key);

  console.log('Before my-key');
  console.log('=============')
  console.log('          Key: ' + key);
  console.log('Current Value: ' + currentValue);
  console.log('    Old Value: ' + oldValue);
  console.log('    New Value: ' + newValue);
  console.log('');
});

datastore.after('my-key', function (key, oldValue, newValue) {
  var currentValue = datastore.get(key);

  console.log('After my-key');
  console.log('=============')
  console.log('          Key: ' + key);
  console.log('Current Value: ' + currentValue);
  console.log('    Old Value: ' + oldValue);
  console.log('    New Value: ' + newValue);
  console.log('');
});

datastore.set('my-key', 'Hello, World!');
datastore.set('my-other-key', 'Goodbye, Bob!');

```

The above will output the following log:

```
Before All
=============
          Key: my-key
Current Value: undefined
    Old Value: undefined
    New Value: Hello, World!

Before my-key
=============
          Key: my-key
Current Value: undefined
    Old Value: undefined
    New Value: Hello, World!

After All
=============
          Key: my-key
Current Value: Hello, World!
    Old Value: undefined
    New Value: Hello, World!

After my-key
=============
          Key: my-key
Current Value: Hello, World!
    Old Value: undefined
    New Value: Hello, World!

Before All
=============
          Key: my-other-key
Current Value: undefined
    Old Value: undefined
    New Value: Goodbye, Bob!

After All
=============
          Key: my-other-key
Current Value: Goodbye, Bob!
    Old Value: undefined
    New Value: Goodbye, Bob!
```