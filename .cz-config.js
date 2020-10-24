module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    {
      value: 'refactor',
      name:
        'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    { value: 'test', name: 'test:     Adding missing tests' },
    {
      value: 'style',
      name:
        'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'cleanup',
      name:
        'cleanup:  A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'chore',
      name: "chore:    Other changes that don't modify src or test files",
    },
    { value: 'revert', name: 'revert:   Reverts' },
    { value: 'wip', name: 'wip:      Work in progress' },
    { value: 'ci', name: 'ci:       Continuous integration' },
  ],

  scopes: [
    { name: 'nx-a11y', description: 'anything a11y scope' },
    {
      name: 'nx-feat',
      description: 'anything feat specific',
    },
    { name: 'nx-fire', description: 'anything fire scope' },
    { name: 'nx-seek', description: 'anything seek specific' },
    { name: 'nx-util', description: 'anything util specific' },
    { name: 'nx-core', description: 'anything core specific' },
    {
      name: 'test',
      description: 'anything test specific (e.g., jest, cypress or util-mock)',
    },
    {
      name: 'repo',
      description: 'anything related to managing the repo itself',
    },
    { name: 'misc', description: 'misc stuff' },
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' },
    ],
  },
  // override the messages, defaults are as follows
  messages: {
    type: 'Selecione o tipo de alteração que você está enviando:',
    scope: '\nIndique o ESCOPO desta alteração (opcional):',
    // used if allowCustomScopes is true
    customScope: 'Indique o escopo desta alteração:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
    body:
      'Descrição detalhada das alterações (optional). Use "|" para quebras de linha:\n',
    breaking: 'Listar quaisquer BREAKING CHANGES (opcional):\n',
    footer:
      'Tivemos alguma issue resolvida por esta alteração? (opcional). Ex.: #31, #34:\n',
    confirmCommit:
      'Por favor, confira se está tudo certo para continuar com o commit',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
