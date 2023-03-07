module.exports = {
  description: 'Create a new feature',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What is the new feature's name?"
    }
  ],
  actions: [
    {
      type: 'add',
      path: '../src/features/{{pascalCase name}}/index.tsx',
      templateFile: './templates/features/feature.tsx.hbs'
    },
    {
      type: 'add',
      path: '../src/features/{{pascalCase name}}/connectors/index.ts',
      templateFile: './templates/features/connectors/connectorsIndex.ts.hbs'
    }
  ]
}
