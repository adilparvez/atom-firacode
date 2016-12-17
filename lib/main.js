firacode = require('./firacode')

module.exports = {
    config: {
        firacodeWeight: {
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
            ],
            order: 1
        },
        enabledScopes: {
            type: 'array',
            title: 'Enabled scopes',
            description: 'Scopes to enable ligatures for. These can be found by looking in the language-x package for language x. Note that for some syntaxes some ligatures might not work due to the tokeniser (e.g. the JavaScript tokeniser breaks -> into two symbols).',
            default: ['source.haskell', 'source.purescript', 'source.elm'],
            order: 2
        }
    },
    activate: (state) => atom.packages.onDidActivateInitialPackages(firacode.load)
}
