import {expectType} from 'tsd'
import type {
  Heading,
  PhrasingContent,
  Root,
  RootContent,
  RowContent,
  TableCell,
  TableRow,
  Text
} from 'mdast'
import {findAfter} from './index.js'

const text: Text = {type: 'text', value: 'alpha'}
const heading: Heading = {type: 'heading', depth: 1, children: [text]}
const root: Root = {type: 'root', children: [heading]}
const cell: TableCell = {type: 'tableCell', children: [text]}
const row: TableRow = {type: 'tableRow', children: [cell]}

// @ts-expect-error: parent needed.
findAfter()

// @ts-expect-error: child or index needed.
findAfter(heading)

findAfter(
  // @ts-expect-error: parent needed.
  text,
  0
)

expectType<PhrasingContent | undefined>(findAfter(heading, text))

expectType<Text | undefined>(findAfter(heading, text, 'text'))

expectType<Text | undefined>(findAfter(heading, 0, 'text'))

expectType<RootContent | undefined>(findAfter(root, 0))

expectType<Text | undefined>(findAfter(root, 0, 'text'))

expectType<RowContent | undefined>(findAfter(row, 0))
