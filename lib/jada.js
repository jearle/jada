
var privates = {};
var currentId = -1;

function Jada (data) {
  
  if (!data) {
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

function addToAllListener (when, id, callback) {
  
  var allListeners = getAllListeners(when, id);
  allListeners.push(callback);

}

function determineListenerArgs (callbackOrKey, callback) {
  var key;
  if (typeof callbackOrKey === 'function') {
    callback = callbackOrKey;
  } else {
    key = callbackOrKey;
  }

  return {
    key: key,
    callback: callback
  };
}

function verifyLegalListenerTime (when) {
  if (when !== 'before' &&
      when !== 'after') {
    throw new Error('illegal value ' + when + ' sent to getAllListenerse');
  }
}

function getPrivates (id) {
  return privates[id];
}

function initializeKeyListeners (listeners, key) {
  if (!listeners[key]) {
    listeners[key] = [];
  }
}

function getKeyListeners (when, id, key) {
  var privates = getPrivates(id);
  
  verifyLegalListenerTime(when);
  
  if (when === 'before') {
    initializeKeyListeners(privates.beforeListeners, key);
    return privates.beforeListeners[key];
  }

  initializeKeyListeners(privates.afterListeners, key);
  return privates.afterListeners[key];

}

function getAllListeners (when, id) {
  
  verifyLegalListenerTime(when);

  if (when === 'before') {
    return privates[id].allBeforeListeners;
  }

  return privates[id].allAfterListeners;

}

function addToKeyListener (when, id, key, callback) {
  var listeners = getKeyListeners(when, id, key);
  listeners.push(callback);
}

function addToListeners (when, id, callbackOrKey, callback) {
  var listenerArgs = determineListenerArgs(callbackOrKey, callback);
    
  if (!listenerArgs.key) {
    addToAllListener(when, id, listenerArgs.callback);
  } else {
    addToKeyListener(when, id, listenerArgs.key, listenerArgs.callback);
  }
}

Jada.prototype = {

  get: function (key) {
    return privates[this.id].kvStore[key];
  },

  set: function (key, value) {
    var privates = getPrivates(this.id);
    
    var oldValue = this.get(key);

    var beforeKeyListeners = privates.beforeListeners[key];
    var afterKeyListeners = privates.afterListeners[key];

    fireAllListeners(privates.allBeforeListeners, key, value, oldValue);

    if (beforeKeyListeners) {
      fireAllListeners(beforeKeyListeners, key, value, oldValue);
    }

    privates.kvStore[key] = value;

    fireAllListeners(privates.allAfterListeners, key, value, oldValue);
    
    if (afterKeyListeners) {
      fireAllListeners(afterKeyListeners, key, value, oldValue);
    }

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
    var privates = getPrivates(this.id);
    privates.kvStore = {};
    privates.beforeListeners = {};
    privates.afterListeners = {};
    privates.allBeforeListeners = [];
    privates.allAfterListeners = [];
    return true;
  },

  before: function (callbackOrKey, callback) {
    addToListeners('before', this.id, callbackOrKey, callback);
  },

  after: function (callbackOrKey, callback) {
    addToListeners('after', this.id, callbackOrKey, callback);
  }

};

module.exports = Jada;