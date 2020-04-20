/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextProperties,
  Platform,
  Linking,
} from 'react-native'
const remark = require('remark')
const ReactMarkdown = require('react-markdown')
const normalizeForReactNative = require('mdast-normalize-react-native')

const $ = createElement

const textProps: TextProperties = {
  selectable: true,
  textBreakStrategy: 'simple',
}

// Fix for remark
process.cwd = () => '/'

const BASE_TEXT_SIZE = 15
const LIST_INDENT = 16

const styles = StyleSheet.create({
  paragraph: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 7,
  },

  paragraphText: {
    flexWrap: 'wrap',
    overflow: 'visible',
    color: '#212529',
  },

  text: {
    fontSize: BASE_TEXT_SIZE,
    lineHeight: BASE_TEXT_SIZE * 1.4,
  },

  listItemText: {
    color: '#212529',
    flex: 1,
  },

  heading1: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: BASE_TEXT_SIZE * 1.125 * 1.125,
    color: '#212529',
  },

  heading2: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: BASE_TEXT_SIZE * 1.125,
    color: '#212529',
  },

  heading3: {
    fontWeight: 'bold',
    marginVertical: 7,
    fontSize: BASE_TEXT_SIZE,
    color: '#212529',
  },

  heading4: {
    fontWeight: 'bold',
    fontSize: BASE_TEXT_SIZE * 1.125,
    color: '#212529',
  },

  heading5: {
    fontWeight: 'bold',
    fontSize: BASE_TEXT_SIZE * 1.125 * 1.125,
    color: '#212529',
  },

  heading6: {
    fontWeight: 'bold',
    fontSize: BASE_TEXT_SIZE * 1.125 * 1.125 * 1.125,
    color: '#212529',
  },

  em: {
    fontStyle: 'italic',
  },

  strong: {
    fontWeight: 'bold',
  },

  link: {
    textDecorationLine: 'underline',
  },

  inlineCode: {
    backgroundColor: '#f1f3f5',
    color: '#495057',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 2,
    fontFamily: Platform.select({
      ios: 'Courier New',
      default: 'monospace',
    }),
  },

  strikethrough: {
    textDecorationLine: 'line-through',
  },

  blockquote: {
    backgroundColor: '#f1f3f5',
    borderLeftWidth: 3,
    borderLeftColor: '#adb5bd',
    paddingLeft: 7,
    paddingRight: 1,
  },

  codeBlock: {
    backgroundColor: '#f1f3f5',
    marginVertical: 2,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 2,
  },

  codeText: {
    color: '#495057',
    fontSize: BASE_TEXT_SIZE / 1.125,
    fontWeight: 'normal',
    fontFamily: Platform.select({
      ios: 'Courier New',
      default: 'monospace',
    }),
  },

  horizontalLine: {
    backgroundColor: '#dee2e6',
    height: 2,
    marginTop: 7,
    marginBottom: 7,
  },

  orderedBullet: {
    fontWeight: 'normal',
    width: BASE_TEXT_SIZE * 1.5,
  },
})

const renderers = {
  root: (props: { children: any }) => $(View, null, props.children),

  paragraph: (props: { children: any }) =>
    $(
      View,
      { style: styles.paragraph },
      $(Text, { ...textProps, style: styles.paragraphText }, props.children)
    ),

  text: (props: { children: any }) =>
    $(
      Text,
      { ...textProps, style: styles.text },
      props.children.split('\n').join(' ')
    ),

  heading: (props: { children: any; level: 1 | 2 | 3 | 4 | 5 | 6 }) =>
    $(
      Text,
      { ...textProps, style: styles['heading' + props.level] },
      props.children
    ),

  emphasis: (props: { children: any }) =>
    $(Text, { ...textProps, style: styles.em }, props.children),

  strong: (props: { children: any }) =>
    $(Text, { ...textProps, style: styles.strong }, props.children),

  link: (props: { children: any; href: string }) => {
    return $(
      Text,
      {
        ...textProps,
        style: styles.link,
        onPress: () => Linking.openURL(props.href),
      },
      props.children
    )
  },

  inlineCode: (props: { children: any }) =>
    $(Text, { ...textProps, style: styles.inlineCode }, props.children),

  delete: (props: { children: any }) =>
    $(Text, { ...textProps, style: styles.strikethrough }, props.children),

  blockquote: (props: { children: any }) =>
    $(View, { style: styles.blockquote }, props.children),

  code: (props: { value: string; language: string }) =>
    $(
      View,
      { style: styles.codeBlock },
      $(Text, { ...textProps, style: styles.codeText }, props.value)
    ),

  thematicBreak: () => $(View, { style: styles.horizontalLine }),

  list: (props: { children: any; depth: number; ordered: boolean }) =>
    $(
      View,
      {
        style: {
          paddingLeft: LIST_INDENT * props.depth + 5,
        },
      },
      props.children
    ),

  listItem: (props: { children: any; index: number; ordered: boolean }) => {
    return $(
      View,
      {
        style: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 5,
        },
      },
      [
        props.ordered
          ? $(
              Text,
              { style: [styles.text, styles.orderedBullet], key: 0 },
              `${props.index + 1}.`
            )
          : $(Text, null, '\u2022 '),
        $(
          Text,
          { ...textProps, style: styles.listItemText, key: 1 },
          props.children
        ),
      ]
    )
  },
}

function Markdown(markdownText: string): React.ReactElement {
  return $<any>(ReactMarkdown, {
    source: remark().processSync(markdownText).contents,
    astPlugins: [normalizeForReactNative()],
    allowedTypes: Object.keys(renderers),
    renderers,
  })
}

export default Markdown
