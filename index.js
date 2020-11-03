'use strict'

var convert = require('unist-util-is/convert')

module.exports = findAfter

function findAfter(parent, index, test) {
  var is = convert(test)

  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node')
  }

  if (typeof index === 'number') {
    if (index < 0 || index === Infinity) {
      throw new Error('Expected positive finite number as index')
    }
  } else {
    index = parent.children.indexOf(index)

    if (index < 0) {
      throw new Error('Expected child node or index')
    }
  }

  while (++index < parent.children.length) {
    if (is(parent.children[index], index, parent)) {
      return parent.children[index]
    }
  }

  return null
}
