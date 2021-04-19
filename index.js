import {convert} from 'unist-util-is'

export function findAfter(parent, index, test) {
  var is = convert(test)

  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node')
  }

  if (typeof index === 'number') {
    if (index < 0 || index === Number.POSITIVE_INFINITY) {
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
