'use babel'

const handleFontWeightChange = weight => {
  document.body.setAttribute('data-font', `firacode-${weight}`)
}

const getOrCreateStyleSheet = id => {
  let sheet = document.getElementById(id)

  if (sheet === null) {
    sheet = document.createElement('style')
    sheet.setAttribute('id', id)
    document.body.appendChild(sheet)
  }

  return sheet
}

scopeToCss = scope => {
  if (scope === '*') {
    return `atom-text-editor[data-grammar] {\n`
         + `    font-feature-settings: 'liga' on, 'calt' on;\n`
         + `}\n`
  }

  const shouldDisable = scope.startsWith('not:')
  const setting = shouldDisable ? 'off' : 'on'

  if (shouldDisable) {
    scope = scope.slice(4)
  }

  const isPrefix = scope.endsWith('.*')
  const selector = isPrefix ? '^=' : '='

  if (isPrefix) {
    scope = scope.slice(0, -2)
  }

  const dataGrammar = scope.split('.').join(' ')

  return `atom-text-editor[data-grammar${selector}'${dataGrammar}'] {\n`
       + `    font-feature-settings: 'liga' ${setting}, 'calt' ${setting};\n`
       + `}\n`
}

const handleScopesChange = scopes => {
  const styleSheet = getOrCreateStyleSheet('firacode')

  styleSheet.innerHTML = scopes
    .map(scopeToCss)
    .join('\n')
}

export const loadPackage = () => {
  atom.config.observe('firacode.fontWeight', handleFontWeightChange)
  atom.config.observe('firacode.scopes', handleScopesChange)
}
