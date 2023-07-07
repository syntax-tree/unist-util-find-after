/**
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('unist').Node} UnistNode
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAfter} from 'unist-util-find-after'

test('findAfter', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('unist-util-find-after')).sort(),
      ['findAfter']
    )
  })

  const tree = fromMarkdown('Some *emphasis*, **importance**, and `code`.')

  assert(tree.type === 'root')
  const paragraph = tree.children[0]
  assert(paragraph.type === 'paragraph')
  const head = paragraph.children[0]
  assert(head.type === 'text')
  const next = paragraph.children[1]
  assert(next.type === 'emphasis')

  /** @type {Emphasis} */
  const emphasis = {type: 'emphasis', children: []}
  /** @type {InlineCode} */
  const inlineCode = {type: 'inlineCode', value: 'a'}

  await t.test('should fail without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that a runtime error is thrown.
      findAfter()
    }, /Expected parent node/)
  })

  await t.test('should fail without parent node', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that a runtime error is thrown.
      findAfter(inlineCode)
    }, /Expected parent node/)
  })

  await t.test('should fail without index (#1)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that a runtime error is thrown.
      findAfter(emphasis)
    }, /Expected child node or index/)
  })

  await t.test('should fail without index (#2)', async function () {
    assert.throws(function () {
      findAfter(emphasis, -1)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail without index (#3)', async function () {
    assert.throws(function () {
      findAfter(emphasis, inlineCode)
    }, /Expected child node or index/)
  })

  await t.test('should fail for invalid `test` (#1)', async function () {
    assert.throws(function () {
      findAfter(
        emphasis,
        0,
        // @ts-expect-error: check that a runtime error is thrown.
        false
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test('should fail for invalid `test` (#2)', async function () {
    assert.throws(function () {
      findAfter(
        emphasis,
        0,
        // @ts-expect-error: check that a runtime error is thrown.
        true
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, paragraph.children[1]),
        paragraph.children[2]
      )
    }
  )

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 1), paragraph.children[2])
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
      assert.strictEqual(
        findAfter(paragraph, 0, paragraph.children[6]),
        paragraph.children[6]
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#2)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, paragraph.children[0], paragraph.children[1]),
        paragraph.children[1]
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#3)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, 0, paragraph.children[1]),
        paragraph.children[1]
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#4)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, paragraph.children[0], paragraph.children[0]),
        undefined
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#5)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, 0, paragraph.children[0]),
        undefined
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#6)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, 1, paragraph.children[1]),
        undefined
      )
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#1)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, 0, 'strong'),
        paragraph.children[3]
      )
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
        findAfter(paragraph, paragraph.children[0], 'strong'),
        paragraph.children[3]
      )
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#4)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, paragraph.children[3], 'strong'),
        undefined
      )
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#1)',
    async function () {
      assert.strictEqual(findAfter(paragraph, 0, check), paragraph.children[5])
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
      assert.strictEqual(
        findAfter(paragraph, paragraph.children[4], check),
        paragraph.children[5]
      )
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#4)',
    async function () {
      assert.strictEqual(
        findAfter(paragraph, paragraph.children[6], check),
        undefined
      )
    }
  )
})

/**
 * @param {UnistNode} _
 * @param {number | null | undefined} n
 */
function check(_, n) {
  return n === 5
}
