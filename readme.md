# unist-util-find-after

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[**Unist**][unist] utility to find a node after another node.

## Installation

[npm][]:

```bash
npm install unist-util-find-after
```

## Usage

```js
var remark = require('remark')
var findAfter = require('unist-util-find-after')

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.')
var paragraph = tree.children[0]

console.log(findAfter(paragraph, 1, 'strong'))
```

Yields:

```js
{ type: 'strong',
  children: [ { type: 'text', value: 'importance' } ] }
```

## API

### `findAfter(parent, node|index[, test])`

Find the first child after `index` (or `node`) in `parent`, that passes `test`
(when given).

###### Parameters

*   `parent` ([`Node`][node]) — Context node
*   `node` ([`Node`][node]) — Node in `parent`
*   `index` (`number`, optional) — Position of a `node` in `parent`
*   `test` (`Function`, `string`, or `Node`, optional)
    — See [`unist-util-is`][is]

###### Returns

[`Node?`][node] — Child node of `parent` passing `test`.

## Related

*   [`unist-util-find-before`](https://github.com/syntax-tree/unist-util-find-before)
    — Find a node before another node
*   [`unist-util-find-all-after`](https://github.com/syntax-tree/unist-util-find-all-after)
    — Find all nodes after another node
*   [`unist-util-find-all-before`](https://github.com/syntax-tree/unist-util-find-all-before)
    — Find all nodes before another node
*   [`unist-util-find-all-between`](https://github.com/mrzmmr/unist-util-find-all-between)
    — Find all nodes between two nodes
*   [`unist-util-find`](https://github.com/blahah/unist-util-find)
    — Find nodes matching a predicate

## Contribute

See [`contributing.md` in `syntax-tree/unist`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-find-after.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-find-after

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-find-after.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-find-after

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-find-after.svg

[downloads]: https://www.npmjs.com/package/unist-util-find-after

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-find-after.svg

[size]: https://bundlephobia.com/result?p=unist-util-find-after

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[is]: https://github.com/syntax-tree/unist-util-is

[contributing]: https://github.com/syntax-tree/unist/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/unist/blob/master/code-of-conduct.md
