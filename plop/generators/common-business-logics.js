module.exports = {
  description: 'Create a new Business Logics function',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What is the new Business Logic's name?"
    },
    {
      type: 'list',
      name: 'type',
      message: 'How do you want to implement the new Business Logic?',
      choices: ['function', 'hook'] // TODO: class
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/common/business-logics/{{camelCase name}}/{{camelCase name}}.ts',
      templateFile: './templates/common/business-logics/{{type}}.ts.hbs'
    },
    {
      type: 'add',
      path: '../src/common/business-logics/{{camelCase name}}/{{camelCase name}}.test.ts',
      templateFile: './templates/common/business-logics/{{type}}.test.ts.hbs'
    },
    {
      type: 'add',
      path: '../src/common/business-logics/{{camelCase name}}/index.ts',
      template: 'export * from \'./{{camelCase name}}\'\n'
    },
    {
      path: '../src/common/business-logics/index.ts',
      pattern: /(\/\/ PLOP-EXPORTS)/g,
      template: 'export * from \'./{{camelCase name}}\'\n$1',
      type: 'modify'
    },
    {
      path: '../src/common/business-logics/index.ts',
      pattern: /export {}\n/g,
      template: '',
      type: 'modify'
    }
  ]
}
