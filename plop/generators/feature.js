export default {
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
      templateFile: './templates/features/connectors/index.ts.hbs'
    },
    {
      type: 'add',
      path: '../src/features/{{pascalCase name}}/connectors/components/index.ts',
      templateFile: './templates/features/connectors/components/index.ts.hbs'
    },
    {
      type: 'add',
      path: '../src/features/{{pascalCase name}}/connectors/hooks/index.ts',
      templateFile: './templates/features/connectors/hooks/index.ts.hbs'
    }
  ]
}
