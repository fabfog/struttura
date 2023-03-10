export default {
  description: 'Create a new Helper',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'How do you want to implement the new Helper?',
      choices: ['function', 'hook'] // TODO: class
    },
    {
      type: 'input',
      name: 'name',
      message: "What is the new Helper's name?"
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
        path: `../src/common/helpers/{{camelCase name}}/${filename}.ts`,
        templateFile: './templates/common/helpers/{{type}}.ts.hbs'
      },
      {
        type: 'add',
        path: `../src/common/helpers/{{camelCase name}}/${filename}.test.ts`,
        templateFile: './templates/common/helpers/{{type}}.test.ts.hbs'
      },
      {
        type: 'add',
        path: '../src/common/helpers/{{camelCase name}}/index.ts',
        template: 'export * from \'./{{camelCase name}}\'\n'
      },
      {
        path: '../src/common/helpers/index.ts',
        pattern: /(\/\/ PLOP-EXPORTS)/g,
        template: `export * from './${filename}'\n$1`,
        type: 'modify'
      }
    ]
  }
}
