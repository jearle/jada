
var _ = require('../vendor/lodash/lodash.custom');

var NotPlainObjectError = require('./errors/not-plain-object-error');

var privates = {};
var currentId = -1;

function Jada (data) {
  
  if (!verifyData(data) && data) {
    throw new NotPlainObjectError();
  } else if (!data) {
    data = {}; 
  }

  this.id = ++currentId;
  
  privates[this.id] = {
    kvStore: data,
    beforeListeners: {},
    afterListeners: {},
    allBeforeListeners: [],
    allAfterListeners: []
  };

}

function verifyData (data) {
  return _.isPlainObject(data);
}

function fireAllListeners (listeners, key, newValue, oldValue) {
  listeners.forEach(function (listener) {
    listener(key, oldValue, newValue);
  });
}

function addListener (listeners, callbackOrKey, callback) {
  var key;
  if (typeof callbackOrKey === 'function') {
    callback = callbackOrKey;
  } else {
    key = callbackOrKey;
  }

  if (!key) {
    listeners.push(callback);
  }
}

Jada.prototype = {

  get: function (key) {
    return privates[this.id].kvStore[key];
  },

  set: function (key, value) {
    
    var oldValue = this.get(key);
    fireAllListeners(privates[this.id].allBeforeListeners, key, value, oldValue);

    privates[this.id].kvStore[key] = value;

    fireAllListeners(privates[this.id].allAfterListeners, key, value, oldValue);
    return true;
  },

  remove: function (key) {
    delete privates[this.id].kvStore[key];
    return true;
  },
  
  dump: function () {
    return Object.create(privates[this.id].kvStore);
  },

  keys: function () {
    return Object.keys(privates[this.id].kvStore);
  },

  clear: function () {
    privates[this.id].kvStore = {};
    return true;
  },

  before: function (callbackOrKey, callback) {

    addListener(
      privates[this.id].allBeforeListeners, 
      callbackOrKey, 
      callback
    );

  },

  after: function (callbackOrKey, callback) {
    
    addListener(
      privates[this.id].allAfterListeners, 
      callbackOrKey, 
      callback
    );

  }

};

module.exports = Jada;