export default {
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
      path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
      templateFile: './templates/common/ui/component.tsx.hbs'
    },
    {
      type: 'add',
      path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/index.ts',
      template: 'export * from \'./{{pascalCase name}}\'\n'
    },
    {
      type: 'add',
      path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
      templateFile: './templates/common/ui/test.tsx.hbs'
    },
    {
      path: '../src/common/ui/{{componentType}}/index.ts',
      pattern: /(\/\/ PLOP-EXPORTS)/g,
      template: 'export * from \'./{{pascalCase name}}\'\n$1',
      type: 'modify'
    }
  ]
}
