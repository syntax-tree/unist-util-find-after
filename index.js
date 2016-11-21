'use strict';

var is = require('unist-util-is');

module.exports = findAfter;

/* Find a node after `index` in `parent` which passes
 * `test`. */
function findAfter(parent, index, test) {
  var children;
  var child;
  var length;

  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node');
  }

  children = parent.children;
  length = children.length;

  if (index && index.type) {
    index = children.indexOf(index);
  }

  if (isNaN(index) || index < 0 || index === Infinity) {
    throw new Error('Expected positive finite index or child node');
  }

  while (++index < length) {
    child = children[index];

    if (is(test, child, index, parent)) {
      return child;
    }
  }

  return null;
}
