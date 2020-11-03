'use strict'

var test = require('tape')
var remark = require('remark')
var findAfter = require('.')

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.')
var paragraph = tree.children[0]
var children = paragraph.children

test('unist-util-find-after', function (t) {
  t.throws(
    function () {
      findAfter()
    },
    /Expected parent node/,
    'should fail without parent'
  )

  t.throws(
    function () {
      findAfter({type: 'foo'})
    },
    /Expected parent node/,
    'should fail without parent node'
  )

  t.throws(
    function () {
      findAfter({type: 'foo', children: []})
    },
    /Expected child node or index/,
    'should fail without index (#1)'
  )

  t.throws(
    function () {
      findAfter({type: 'foo', children: []}, -1)
    },
    /Expected positive finite number as index/,
    'should fail without index (#2)'
  )

  t.throws(
    function () {
      findAfter({type: 'foo', children: []}, {type: 'bar'})
    },
    /Expected child node or index/,
    'should fail without index (#3)'
  )

  t.throws(
    function () {
      findAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        false
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#1)'
  )

  t.throws(
    function () {
      findAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        true
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#2)'
  )

  t.strictEqual(
    findAfter(paragraph, children[1]),
    children[2],
    'should return the following node when without `test` (#1)'
  )
  t.strictEqual(
    findAfter(paragraph, 1),
    children[2],
    'should return the following node when without `test` (#1)'
  )
  t.strictEqual(
    findAfter(paragraph, 7),
    null,
    'should return the following node when without `test` (#1)'
  )

  t.strictEqual(
    findAfter(paragraph, 0, children[6]),
    children[6],
    'should return `node` when given a `node` and existing (#1)'
  )
  t.strictEqual(
    findAfter(paragraph, children[0], children[1]),
    children[1],
    'should return `node` when given a `node` and existing (#2)'
  )
  t.strictEqual(
    findAfter(paragraph, 0, children[1]),
    children[1],
    'should return `node` when given a `node` and existing (#3)'
  )
  t.strictEqual(
    findAfter(paragraph, children[0], children[0]),
    null,
    'should return `node` when given a `node` and existing (#4)'
  )
  t.strictEqual(
    findAfter(paragraph, 0, children[0]),
    null,
    'should return `node` when given a `node` and existing (#5)'
  )
  t.strictEqual(
    findAfter(paragraph, 1, children[1]),
    null,
    'should return `node` when given a `node` and existing (#6)'
  )

  t.strictEqual(
    findAfter(paragraph, 0, 'strong'),
    children[3],
    'should return a child when given a `type` and existing (#1)'
  )
  t.strictEqual(
    findAfter(paragraph, 3, 'strong'),
    null,
    'should return a child when given a `type` and existing (#2)'
  )
  t.strictEqual(
    findAfter(paragraph, children[0], 'strong'),
    children[3],
    'should return a child when given a `type` and existing (#3)'
  )
  t.strictEqual(
    findAfter(paragraph, children[3], 'strong'),
    null,
    'should return a child when given a `type` and existing (#4)'
  )

  t.strictEqual(
    findAfter(paragraph, 0, test),
    children[5],
    'should return a child when given a `test` and existing (#1)'
  )
  t.strictEqual(
    findAfter(paragraph, 5, test),
    null,
    'should return a child when given a `test` and existing (#2)'
  )
  t.strictEqual(
    findAfter(paragraph, children[4], test),
    children[5],
    'should return a child when given a `test` and existing (#3)'
  )
  t.strictEqual(
    findAfter(paragraph, children[6], test),
    null,
    'should return a child when given a `test` and existing (#4)'
  )

  function test(node, n) {
    return n === 5
  }

  t.end()
})
