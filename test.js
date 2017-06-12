'use strict';

var assert = require('assert');
var test = require('tape');
var remark = require('remark');
var findAfter = require('./');

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.');
var paragraph = tree.children[0];
var children = paragraph.children;

test('unist-util-find-after', function (t) {
  t.throws(
    function () {
      findAfter();
    },
    /Expected parent node/,
    'should fail without parent'
  );

  t.throws(
    function () {
      findAfter({type: 'foo'});
    },
    /Expected parent node/,
    'should fail without parent node'
  );

  t.doesNotThrow(
    function () {
      assert.throws(
        function () {
          findAfter({type: 'foo', children: []});
        },
        /Expected positive finite index or child node/
      );

      assert.throws(
        function () {
          findAfter({type: 'foo', children: []}, -1);
        },
        /Expected positive finite index or child node/
      );

      assert.throws(
        function () {
          findAfter({type: 'foo', children: []}, {type: 'bar'});
        },
        /Expected positive finite index or child node/
      );
    },
    'should fail without index'
  );

  t.doesNotThrow(
    function () {
      assert.throws(
        function () {
          findAfter({
            type: 'foo',
            children: [{type: 'bar'}, {type: 'baz'}]
          }, 0, false);
        },
        /Expected function, string, or object as test/
      );

      assert.throws(
        function () {
          findAfter({
            type: 'foo',
            children: [{type: 'bar'}, {type: 'baz'}]
          }, 0, true);
        },
        /Expected function, string, or object as test/
      );
    },
    'should fail for invalid `test`'
  );

  t.doesNotThrow(
    function () {
      assert.strictEqual(findAfter(paragraph, children[1]), children[2]);
      assert.strictEqual(findAfter(paragraph, 1), children[2]);
      assert.strictEqual(findAfter(paragraph, 7), null);
    },
    'should return the following node when without `test`'
  );

  t.doesNotThrow(
    function () {
      assert.strictEqual(findAfter(paragraph, 0, children[6]), children[6]);
      assert.strictEqual(findAfter(paragraph, children[0], children[1]), children[1]);
      assert.strictEqual(findAfter(paragraph, 0, children[1]), children[1]);
      assert.strictEqual(findAfter(paragraph, children[0], children[0]), null);
      assert.strictEqual(findAfter(paragraph, 0, children[0]), null);
      assert.strictEqual(findAfter(paragraph, 1, children[1]), null);
    },
    'should return `node` when given a `node` and existing'
  );

  t.doesNotThrow(
    function () {
      assert.strictEqual(findAfter(paragraph, 0, 'strong'), children[3]);
      assert.strictEqual(findAfter(paragraph, 3, 'strong'), null);
      assert.strictEqual(findAfter(paragraph, children[0], 'strong'), children[3]);
      assert.strictEqual(findAfter(paragraph, children[3], 'strong'), null);
    },
    'should return a child when given a `type` and existing'
  );

  t.doesNotThrow(
    function () {
      assert.strictEqual(findAfter(paragraph, 0, test), children[5]);
      assert.strictEqual(findAfter(paragraph, 5, test), null);
      assert.strictEqual(findAfter(paragraph, children[4], test), children[5]);
      assert.strictEqual(findAfter(paragraph, children[6], test), null);

      function test(node, n) {
        return n === 5;
      }
    },
    'should return a child when given a `test` and existing'
  );

  t.end();
});
