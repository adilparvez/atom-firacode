'use babel'

import { loadPackage } from './firacode'

const scopesDescription = `
Scopes to enable ligatures for. These can be found by looking in the language-x
package for language x. Note that for some syntaxes some ligatures might not
work due to the tokeniser (e.g. the JavaScript tokeniser breaks "-&gt;" into two
symbols). These rules cascade left to right, for example "&#42;,
not:source.&#42;, source.js.&#42;" will enable ligatures for all scopes
excluding those under source, and will enable ligatures for those scopes under
source.js.
`

export default {
  config: {
    fontWeight: {
      order: 1,
      type: 'string',
      title: 'Font weight',
      description: 'How "bold" the font is.',
      default: 'retina',
      enum: [
        'light',
        'regular',
        'retina',
        'medium',
        'bold'
      ]
    },
    scopes: {
      order: 2,
      type: 'array',
      title: 'Scopes',
      description: scopesDescription,
      default: ['*', 'not:text.*']
    }
  },
  activate: () => {
    atom.packages.onDidActivateInitialPackages(loadPackage)
  }
}
