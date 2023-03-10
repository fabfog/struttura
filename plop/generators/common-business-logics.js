export default {
  description: 'Create a new Business Logic',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'How do you want to implement the new Business Logic?',
      choices: ['function', 'hook'] // TODO: class
    },
    {
      type: 'input',
      name: 'name',
      message: "What is the new Business Logic's name?"
    }
  ],
  actions: ({ type, name }) => {
    if (!name) throw new Error('name is mandatory')

    const filename = type === 'hook'
      ? 'use{{pascalCase name}}'
      : '{{camelCase name}}'

    return [
      {
        type: 'add',
        path: `../src/common/business-logics/{{camelCase name}}/${filename}.ts`,
        templateFile: './templates/common/business-logics/{{type}}.ts.hbs'
      },
      {
        type: 'add',
        path: `../src/common/business-logics/{{camelCase name}}/${filename}.test.ts`,
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
        template: `export * from './${filename}'\n$1`,
        type: 'modify'
      }
    ]
  }
}
