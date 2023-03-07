module.exports = {
  description: 'Create a new Helper',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What is the new Helper's name?"
    },
    {
      type: 'list',
      name: 'type',
      message: 'How do you want to implement the new Helper?',
      choices: ['function', 'hook'] // TODO: class
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/common/helpers/{{camelCase name}}/index.ts',
      templateFile: './templates/common/helpers/{{type}}.ts.hbs'
    },
    {
      path: '../src/common/helpers/index.ts',
      pattern: /(\/\/ PLOP-EXPORTS)/g,
      template: 'export * from \'./{{camelCase name}}\'\n$1',
      type: 'modify'
    },
    {
      path: '../src/common/helpers/index.ts',
      pattern: /export {}\n/g,
      template: '',
      type: 'modify'
    }
  ]
}
