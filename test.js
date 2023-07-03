/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAfter} from './index.js'

const tree = fromMarkdown('Some _emphasis_, **importance**, and `code`.')
const paragraph = /** @type {Parent} */ (tree.children[0])
const children = paragraph.children

test('findAfter', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'findAfter'
    ])
  })

  await t.test('should fail without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that a runtime error is thrown.
      findAfter()
    }, /Expected parent node/)
  })

  await t.test('should fail without parent node', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that a runtime error is thrown.
      findAfter({type: 'foo'})
    }, /Expected parent node/)
  })

  await t.test('should fail without index (#1)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that a runtime error is thrown.
      findAfter({type: 'foo', children: []})
    }, /Expected child node or index/)
  })

  await t.test('should fail without index (#2)', async function () {
    assert.throws(function () {
      findAfter({type: 'foo', children: []}, -1)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail without index (#3)', async function () {
    assert.throws(function () {
      findAfter({type: 'foo', children: []}, {type: 'bar'})
    }, /Expected child node or index/)
  })

  await t.test('should fail for invalid `test` (#1)', async function () {
    assert.throws(function () {
      findAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error: check that a runtime error is thrown.
        false
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test('should fail for invalid `test` (#2)', async function () {
    assert.throws(function () {
      findAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error: check that a runtime error is thrown.
        true
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, children[1]), children[2])
    }
  )

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 1), children[2])
    }
  )

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 7), undefined)
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 0, children[6]), children[6])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#2)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, children[0], children[1]),
        children[1]
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#3)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 0, children[1]), children[1])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#4)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, children[0], children[0]),
        undefined
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#5)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 0, children[0]), undefined)
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#6)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 1, children[1]), undefined)
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 0, 'strong'), children[3])
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#2)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 3, 'strong'), undefined)
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#3)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, children[0], 'strong'),
        children[3]
      )
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#4)',
    async function () {
      assert.strictEqual(findAfter(paragraph, children[3], 'strong'), undefined)
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 0, check), children[5])
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#2)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 5, check), undefined)
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#3)',
    async function () {
      assert.strictEqual(findAfter(paragraph, children[4], check), children[5])
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#4)',
    async function () {
      assert.strictEqual(findAfter(paragraph, children[6], check), undefined)
    }
  )
})

/**
 * @param {Node} _
 * @param {number | null | undefined} n
 */
function check(_, n) {
  return n === 5
}
