/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:find-after
 * @fileoverview Utility to find a node after another node.
 */

'use strict';

/* eslint-env commonjs */

/**
 * Test.
 *
 * @typedef {Function} findAfter~test
 * @param {Node} node - Node to test.
 * @param {number} index - Position of `node` in `parent`.
 * @param {Node} parent - Parent of `node`.
 * @return {boolean?} - Whether this iteration passes.
 */

/**
 * Utility to return true for the first node.
 *
 * @type {findAfter~test}
 */
function first() {
    return true;
}

/**
 * Utility to convert a string into a function which checks
 * a given node’s type for said string.
 *
 * @param {string} test - Node type to test.
 * @return {findAfter~test} - Tester.
 */
function typeFactory(test) {
    return function (node) {
        return Boolean(node && node.type === test);
    }
}

/**
 * Utility to convert a node into a function which checks
 * a given node for strict equality.
 *
 * @param {Node} test - Node to test.
 * @return {findAfter~test} - Tester.
 */
function nodeFactory(test) {
    return function (node) {
        return Boolean(node && node === test);
    }
}

/**
 * Find a node after `index` in `parent` which passes
 * `test`.
 *
 * @param {Node} parent - Parent to search in.
 * @param {number|Node} index - (Position of) node to
 *   search after.
 * @param {string|Node|findAfter~test} test - Tester.
 * @return {Node?} - A child node of `parent` which passes
 *   `test`.
 */
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

    if (typeof test === 'string') {
        test = typeFactory(test);
    } else if (test && test.type) {
        test = nodeFactory(test);
    } else if (test === null || test === undefined) {
        test = first;
    } else if (typeof test !== 'function') {
        throw new Error('Expected function, string, or node as test');
    }

    while (++index < length) {
        child = children[index];

        if (test(child, index, parent)) {
            return child;
        }
    }

    return null;
}

/*
 * Expose.
 */

module.exports = findAfter;
