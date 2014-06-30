# Jada

Jada is a simple, lightweight library for storing data.  It does not update localStorage, nor does it provide hooks for syncing data to a server.  It simply gets and sets data, and provides hooks for listening to when data has been set both before and after.

## Size

Jada is __2.6kb__ in size when minified.

## Example

```js
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

Hello, World!
Goodbye, Bob!
```

## API

The Jada API consists of a very simple set of verbs for manipulating and listening to the data within your store.

- - -
### Jada Singleton
- - -

#### create(*[data]*)

Create is the sole method on the `Jada` object.  It is used to create a datastore instance.

__Usage__

Creating a datastore with no predefined values.

```js
var datastore = Jada.create();
```

Creating a datastore with predefined values.

```js
var datastore = Jada.create({ 'my-key': 'Hello, World!'});

console.log(datastore.get('my-key')); // outputs 'Hello, World!'
```

- - -
### Datastore Instance
- - -

#### get(*key*)

Get the current value associated with the specified key.

__Usage__

```js
var datastore = Jada.create({ 'key': [1, 2, 3] });

var val = datastore.get('key');

console.log(val); // outputs [ 1, 2, 3 ]
```

#### set(*key*, *value*)

Sets a key to the specified value.

__Usage__

```js
var datastore = Jada.create();

datastore.set('my-key', { name: 'Jesse' });

var val = datastore.get('my-key');

console.log(val); // outputs { name: 'Jesse' }
```

#### remove(*key*)

description

__Usage__

#### dump()

description

__Usage__

#### keys()

description

__Usage__

#### clear()

description

__Usage__

#### before(*[key]*, *callback*)

description

__Usage__

#### after(*[key]*, *callback*)

description

__Usage__