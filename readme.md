# unist-util-find-after [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**Unist**][unist] utility to find a node after another node.

## Installation

[npm][]:

```bash
npm install unist-util-find-after
```

## Usage

```js
var remark = require('remark');
var findAfter = require('unist-util-find-after');

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.');
var paragraph = tree.children[0];

console.log(findAfter(paragraph, 1, 'strong'));
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

*   `parent` ([`Node`][node]) — Context node;
*   `node` ([`Node`][node]) — Node in `parent`;
*   `index` (`number`, optional) — Position of a `node` in `parent`;
*   `test` (`Function`, `string`, or `Node`, optional)
    — See [`unist-util-is`][is].

###### Returns

[`Node?`][node] — Child node of `parent` passing `test`.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/unist-util-find-after.svg

[travis]: https://travis-ci.org/wooorm/unist-util-find-after

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/unist-util-find-after.svg

[codecov]: https://codecov.io/github/wooorm/unist-util-find-after

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[unist]: https://github.com/wooorm/unist

[node]: https://github.com/wooorm/unist#node

[is]: https://github.com/wooorm/unist-util-is
