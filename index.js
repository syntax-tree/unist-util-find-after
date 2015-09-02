/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:find-after
 * @fileoverview Utility to find a node after another node.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var is = require('unist-util-is');

/**
 * Find a node after `index` in `parent` which passes
 * `test`.
 *
 * @param {Node} parent - Parent to search in.
 * @param {number|Node} index - (Position of) node to
 *   search after.
 * @param {*} test - See `wooorm/unist-util-is`.
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

    while (++index < length) {
        child = children[index];

        if (is(test, child, index, parent)) {
            return child;
        }
    }

    return null;
}

/*
 * Expose.
 */

module.exports = findAfter;
