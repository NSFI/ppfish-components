import { Quill } from "../../../quill";

const Container = Quill.import('blots/container')
const Scroll = Quill.import('blots/scroll')

const ATTRIBUTES = [
  'data-embed-source',
  'data-type',
  'data-src',
  'data-size',
  'style'
]
const Parchment = Quill.import('parchment')
const Embed = Quill.import('blots/block/embed')

class EmbedPlaceholder extends Embed {
  static create (value) {
    const node = super.create()
    if (typeof value === 'string') {
      node.setAttribute(ATTRIBUTES[0], value)
    } else {
      for (const key in value) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) continue
        node.setAttribute(key, value[key])
      }
    }

    node.setAttribute('contenteditable', false)
    node.setAttribute('unselectable', 'on')
    // node.setAttribute('title', node.textContent);
    return node
  }

  static formats (domNode) {
    if (domNode.__handling && domNode.__formats) {
      return domNode.__formats
    }

    const attrList = ATTRIBUTES.slice(3)
    return attrList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  static value (domNode) {
    const attrs = ATTRIBUTES.slice(0, 3)

    const result = {}

    attrs.forEach(attr => {
      let res = ''
      if (domNode.hasAttribute(attr)) {
        res = domNode.getAttribute(attr)
      } else {
        switch (attr) {
          case ATTRIBUTES[0]:
            res = encodeURIComponent(domNode.outerHTML)
            break
          case ATTRIBUTES[1]:
            res = domNode.tagName
            break
          case ATTRIBUTES[2]:
            res = domNode.getAttribute('src')
            break
          case 'style':
            res = domNode.style.cssText
            break
          default:
            res = domNode[attr] || ''
        }
      }

      if (res) result[attr] = res
    })

    return result
  }

  format (name, value) {
    if (name === 'style') {
      this.domNode.style.cssText = value
      return
    }
    if (ATTRIBUTES.indexOf(name) === -1) {
      super.format(name, value)
      return
    }

    if (value) {
      this.domNode.setAttribute(name, value)
    } else {
      this.domNode.removeAttribute(name)
    }
  }

  handling (handling) {
    this.domNode.__formats = this.constructor.formats(this.domNode)
    this.domNode.__handling = handling
  }
}
EmbedPlaceholder.blotName = 'embed-placeholder'
EmbedPlaceholder.tagName = 'span'
EmbedPlaceholder.scope = Parchment.Scope.INLINE_BLOT

// Container.allowedChildren.push(EmbedPlaceholder)
Scroll.allowedChildren.push(EmbedPlaceholder)

class TagPlaceholder extends EmbedPlaceholder {}
TagPlaceholder.tagName = ['video', 'iframe']

class ClassNamePlaceholder extends EmbedPlaceholder {}
ClassNamePlaceholder.className = 'ql-embed-placeholder'

const tagReg = /<([\w-]+)((?:\s+[\w-:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*>([^<]*?)<\/\1>/g
const attrReg = /([\w-:.]+)(?:\s*=\s*(?:"((?:\\.|[^"])*)"|'((?:\\.|[^'])*)'))?/g
function convertPlaceholderHTML (html = '') {
  if (!html) return ''

  const matchReg = new RegExp(
    `class\\s*=\\s*(?:"[^"]*\\b(${ClassNamePlaceholder.className})\\b[^"]*"|'[^']*\\b(${ClassNamePlaceholder.className})\\b[^']*')`
  )
  return html.replace(tagReg, (m, tag, attrs = '') => {
    if (
      !tag ||
      tag.toLowerCase() !== EmbedPlaceholder.tagName ||
      !matchReg.test(attrs)
    ) {
      return m
    }

    const attributes = getAttributes(attrs)
    const source = decodeURIComponent(attributes[ATTRIBUTES[0]])
    // if (!attributes.style) return source

    return replaceHTMLAttr(source, {
      style: attributes.style,
      'data-size': attributes['data-size']
    })
  })
}

function getAttributes (str) {
  const attributes = {}
  str.replace(attrReg, (m, name, attr1, attr2) => {
    const attr = (attr1 || attr2 || '').trim()
    attributes[name] = attr
  })

  return attributes
}

const sourceTagReg = /<([\w-]+)((?:\s+[\w-:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*>/
function replaceHTMLAttr (html = '', attrs = {}) {
  return html.replace(sourceTagReg, (m, tag, attr = '') => {
    const attributes = getAttributes(attr)
    Object.assign(attributes, attrs)

    const attrsStr = Object.keys(attributes).reduce((str, key) => {
      const val = attributes[key]
      if (val == null) return str
      str += val === '' ? ` ${key}` : ` ${key}="${val}"`
      return str
    }, '')

    return `<${tag}${attrsStr}>`
  })
}

export default function register (formats = [TagPlaceholder]) {
  if (!Array.isArray(formats)) formats = [formats]
  formats.push(ClassNamePlaceholder)
  formats.forEach(fmt => {
    Quill.register(fmt, true)
    fmt.tagName = EmbedPlaceholder.tagName
    fmt.className = ClassNamePlaceholder.className
  })
}

export {
  EmbedPlaceholder,
  TagPlaceholder,
  ClassNamePlaceholder,
  convertPlaceholderHTML
}
