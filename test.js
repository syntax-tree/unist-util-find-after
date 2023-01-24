/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAfter} from './index.js'
import * as mod from './index.js'

const tree = fromMarkdown('Some _emphasis_, **importance**, and `code`.')
const paragraph = /** @type {Parent} */ (tree.children[0])
const children = paragraph.children

test('findAfter', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['findAfter'],
    'should expose the public api'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAfter()
    },
    /Expected parent node/,
    'should fail without parent'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAfter({type: 'foo'})
    },
    /Expected parent node/,
    'should fail without parent node'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAfter({type: 'foo', children: []})
    },
    /Expected child node or index/,
    'should fail without index (#1)'
  )

  assert.throws(
    () => {
      findAfter({type: 'foo', children: []}, -1)
    },
    /Expected positive finite number as index/,
    'should fail without index (#2)'
  )

  assert.throws(
    () => {
      findAfter({type: 'foo', children: []}, {type: 'bar'})
    },
    /Expected child node or index/,
    'should fail without index (#3)'
  )

  assert.throws(
    () => {
      findAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error runtime.
        false
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#1)'
  )

  assert.throws(
    () => {
      findAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error runtime.
        true
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#2)'
  )

  assert.strictEqual(
    findAfter(paragraph, children[1]),
    children[2],
    'should return the following node when without `test` (#1)'
  )
  assert.strictEqual(
    findAfter(paragraph, 1),
    children[2],
    'should return the following node when without `test` (#1)'
  )
  assert.strictEqual(
    findAfter(paragraph, 7),
    null,
    'should return the following node when without `test` (#1)'
  )

  assert.strictEqual(
    findAfter(paragraph, 0, children[6]),
    children[6],
    'should return `node` when given a `node` and existing (#1)'
  )
  assert.strictEqual(
    findAfter(paragraph, children[0], children[1]),
    children[1],
    'should return `node` when given a `node` and existing (#2)'
  )
  assert.strictEqual(
    findAfter(paragraph, 0, children[1]),
    children[1],
    'should return `node` when given a `node` and existing (#3)'
  )
  assert.strictEqual(
    findAfter(paragraph, children[0], children[0]),
    null,
    'should return `node` when given a `node` and existing (#4)'
  )
  assert.strictEqual(
    findAfter(paragraph, 0, children[0]),
    null,
    'should return `node` when given a `node` and existing (#5)'
  )
  assert.strictEqual(
    findAfter(paragraph, 1, children[1]),
    null,
    'should return `node` when given a `node` and existing (#6)'
  )

  assert.strictEqual(
    findAfter(paragraph, 0, 'strong'),
    children[3],
    'should return a child when given a `type` and existing (#1)'
  )
  assert.strictEqual(
    findAfter(paragraph, 3, 'strong'),
    null,
    'should return a child when given a `type` and existing (#2)'
  )
  assert.strictEqual(
    findAfter(paragraph, children[0], 'strong'),
    children[3],
    'should return a child when given a `type` and existing (#3)'
  )
  assert.strictEqual(
    findAfter(paragraph, children[3], 'strong'),
    null,
    'should return a child when given a `type` and existing (#4)'
  )

  assert.strictEqual(
    findAfter(paragraph, 0, check),
    children[5],
    'should return a child when given a `test` and existing (#1)'
  )
  assert.strictEqual(
    findAfter(paragraph, 5, check),
    null,
    'should return a child when given a `test` and existing (#2)'
  )
  assert.strictEqual(
    findAfter(paragraph, children[4], check),
    children[5],
    'should return a child when given a `test` and existing (#3)'
  )
  assert.strictEqual(
    findAfter(paragraph, children[6], check),
    null,
    'should return a child when given a `test` and existing (#4)'
  )

  /**
   * @param {Node} _
   * @param {number | null | undefined} n
   */
  function check(_, n) {
    return n === 5
  }
})
