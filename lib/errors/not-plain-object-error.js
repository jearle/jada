
function NotPlainObjectError (message) {
  this.name = 'NotPlainObjectError';
  this.message = message || 'The supplied variable is not a plain object.';
}

NotPlainObjectError.prototype = new Error();
NotPlainObjectError.prototype.constructor = NotPlainObjectError;

module.exports = NotPlainObjectError;