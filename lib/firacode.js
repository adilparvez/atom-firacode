const FIRACODE_STYLESHEET_ID = 'firacode-stylesheet'

function onFiracodeWeightChange(weight) {
    document.body.setAttribute('firacode-font', `firacode-${weight}`)
}

function onEnabledScopesChange(scopes) {
    let sheet = document.getElementById(FIRACODE_STYLESHEET_ID)
    if (sheet == null) {
        sheet = document.createElement('style')
        sheet.setAttribute('id', FIRACODE_STYLESHEET_ID)
        document.body.appendChild(sheet)
    }

    sheet.innerHTML = scopes.map((scope) => {
        let dataGrammar = scope.split('.').join(' ')
        return `atom-text-editor[data-grammar='${dataGrammar}'] {\n`
             + `    font-feature-settings: 'liga' on, 'calt' on;\n`
             + `}\n`
    }).join('\n')
}

function load() {
    atom.config.observe('firacode.firacodeWeight', onFiracodeWeightChange)
    atom.config.observe('firacode.enabledScopes', onEnabledScopesChange)
}

module.exports.load = load
