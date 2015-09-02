/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:find-after
 * @fileoverview Test suite for `unit-util-find-after`.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var findAfter = require('./');

/*
 * Methods.
 */

var equal = assert.strictEqual;

/*
 * Fixture.
 */

var ast = mdast.parse('Some *emphasis*, **strongness**, and `code`.');
var paragraph = ast.children[0];
var children = paragraph.children;

/*
 * Tests.
 */

describe('unist-util-find-after', function () {
    it('should fail without parent', function () {
        assert.throws(function () {
            findAfter();
        }, /Expected parent node/);
    });

    it('should fail without parent node', function () {
        assert.throws(function () {
            findAfter({
                'type': 'foo'
            });
        }, /Expected parent node/);
    });

    it('should fail without index', function () {
        assert.throws(function () {
            findAfter({
                'type': 'foo',
                'children': []
            });
        }, /Expected positive finite index or child node/);

        assert.throws(function () {
            findAfter({
                'type': 'foo',
                'children': []
            }, -1);
        }, /Expected positive finite index or child node/);

        assert.throws(function () {
            findAfter({
                'type': 'foo',
                'children': []
            }, {
                'type': 'bar'
            });
        }, /Expected positive finite index or child node/);
    });

    it('should fail for invalid `test`', function () {
        assert.throws(function () {
            findAfter({
                'type': 'foo',
                'children': []
            }, 0, false);
        }, /Expected function, string, or node as test/);

        assert.throws(function () {
            findAfter({
                'type': 'foo',
                'children': []
            }, 0, true);
        }, /Expected function, string, or node as test/);
    });

    it('should return the following node when without `test`', function () {
        equal(findAfter(paragraph, children[1]), children[2]);
        equal(findAfter(paragraph, 1), children[2]);
        equal(findAfter(paragraph, 7), null);
    });

    it('should return `node` when given a `node` and existing', function () {
        equal(findAfter(paragraph, 0, children[6]), children[6]);
        equal(findAfter(paragraph, children[0], children[1]), children[1]);
        equal(findAfter(paragraph, 0, children[1]), children[1]);
        equal(findAfter(paragraph, children[0], children[0]), null);
        equal(findAfter(paragraph, 0, children[0]), null);
        equal(findAfter(paragraph, 1, children[1]), null);
    });

    it('should return a child when given a `type` and existing', function () {
        equal(findAfter(paragraph, 0, 'strong'), children[3]);
        equal(findAfter(paragraph, 3, 'strong'), null);
        equal(findAfter(paragraph, children[0], 'strong'), children[3]);
        equal(findAfter(paragraph, children[3], 'strong'), null);
    });

    it('should return a child when given a `test` and existing', function () {
        /** Test */
        function test(node, n) {
            return n === 5;
        }

        equal(findAfter(paragraph, 0, test), children[5]);
        equal(findAfter(paragraph, 5, test), null);
        equal(findAfter(paragraph, children[4], test), children[5]);
        equal(findAfter(paragraph, children[6], test), null);
    });
});
