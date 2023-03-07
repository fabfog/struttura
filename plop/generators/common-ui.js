module.exports = {
  description: 'Create a new UI component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What is the new component's name?"
    },
    {
      type: 'list',
      name: 'componentType',
      message: 'What category does the new component belong to?',
      choices: ['atoms', 'molecules', 'organisms', 'templates']
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/index.tsx',
      templateFile: './templates/common/ui.tsx.hbs'
    },
    {
      path: '../src/common/ui/{{componentType}}/index.ts',
      pattern: /(\/\/ PLOP-EXPORTS)/g,
      template: 'export * from \'./{{pascalCase name}}\'\n$1',
      type: 'modify'
    },
    {
      path: '../src/common/ui/{{componentType}}/index.ts',
      pattern: /export {}\n/g,
      template: '',
      type: 'modify'
    }
  ]
}
