/* eslint-disable no-global-assign */
if (typeof document === 'undefined') {
  document = require('domino').createWindow().document
}

const parseNodeAsString = node => (typeof node === 'number' ||
                                   typeof node === 'boolean' ||
                                   typeof node === 'function' ||
                                   node instanceof Date ||
                                   node instanceof RegExp) ? node.toString() : node

const isNotWhitespace = node => !(typeof node === 'string' && /^[\n\r\s]+$/.test(node))

const appendChild = (element, childs) => {
  if (!Array.isArray(childs)) return
  childs
    .map(parseNodeAsString)
    .filter(isNotWhitespace)
    .forEach((node) => {
      if (Array.isArray(node)) {
        appendChild(element, node)
        return
      }

      if (typeof node === 'string') {
        if (element.lastChild && element.lastChild.nodeName === '#text') {
          element.lastChild.nodeValue += node
          return
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        element.appendChild(node)
      }
    })
}

module.exports = appendChild
