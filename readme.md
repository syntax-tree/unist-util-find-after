# unist-util-find-after [![Build Status](https://img.shields.io/travis/wooorm/unist-util-find-after.svg)](https://travis-ci.org/wooorm/unist-util-find-after) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/unist-util-find-after.svg)](https://codecov.io/github/wooorm/unist-util-find-after?branch=master)

[**Unist**](https://github.com/wooorm/unist) utility to find a node after
another node. Useful when working with [**mdast**](https://github.com/wooorm/mdast)
or [**retext**](https://github.com/wooorm/retext).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install unist-util-find-after
```

**unist-util-find-after** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](unist-util-find-after.js) and
[compressed](unist-util-find-after.min.js).

## Usage

```js
var mdast = require('mdast');
var findAfter = require('unist-util-find-after');
var inspect = require('unist-util-inspect');

function log(node) {
    console.log(node && inspect(node));
}

mdast.use(function () {
    return function (ast) {
        var paragraph = ast.children[0];
        var children = paragraph.children;

        log(findAfter(paragraph, 1));
        log(findAfter(paragraph, children[1]));
        log(findAfter(paragraph, children[1], 'strong'));
        log(findAfter(paragraph, children[1], children[0]));
        log(findAfter(paragraph, children[1], function (node, n) {
            return n === 5;
        }));
    };
}).process('Some *emphasis*, **strongness**, and `code`.');
```

Yields:

```text
text: ', '
text: ', '
strong[1]
└─ text: 'strongness'
null
inlineCode: 'code'
```

## API

### findAfter(parent, index|node\[, test])

Find the first child after `index` (or `node`), that passes `test` (when
given).

**Parameters**:

*   `parent` (`Node`) — Parent to search in;

*   `node` (`Node`)
    — [Node](https://github.com/wooorm/unist#unist-nodes) to search after;

*   `index` (`number`) — Position of child to search after;

*   `test` (`Function`, `string`, or `Node`; optional)
    — See [`is()`](https://github.com/wooorm/unist-util-is#istest-node-index-parent-context).

**Returns**: `node?`, when found. Child node of `parent` which passes `test`.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
