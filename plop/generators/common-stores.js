module.exports = {
  description: 'Create a new Store',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What is the new Store's name?"
    },
    {
      type: 'list',
      name: 'type',
      message: 'How do you want to implement the new Store?',
      choices: ['zustand'] // TODO: Redux...
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/common/stores/{{camelCase name}}/index.ts',
      template: 'export * from \'./{{camelCase name}}\'\n'
    },
    {
      type: 'add',
      path: '../src/common/stores/{{camelCase name}}/{{camelCase name}}.ts',
      templateFile: './templates/common/stores/{{type}}.ts.hbs'
    },
    {
      type: 'add',
      path: '../src/common/stores/{{camelCase name}}/{{camelCase name}}.test.ts',
      templateFile: './templates/common/stores/{{type}}.test.ts.hbs'
    },
    {
      path: '../src/common/stores/index.ts',
      pattern: /(\/\/ PLOP-EXPORTS)/g,
      template: 'export * from \'./{{camelCase name}}\'\n$1',
      type: 'modify'
    },
    {
      path: '../src/common/stores/index.ts',
      pattern: /export {}\n/g,
      template: '',
      type: 'modify'
    }
  ]
}
