export default {
  description: 'Create a new UI component',
  prompts: [
    {
      type: 'list',
      name: 'componentType',
      message: 'What category does the new component belong to?',
      choices: ['atoms', 'molecules', 'organisms', 'templates'],
    },
    {
      type: 'input',
      name: 'name',
      message: "What is the new component's name?",
    },
  ],
  actions: ({ name, path }) => {
    if (!name) throw new Error('name is mandatory');

    return [
      {
        type: 'add',
        path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: './templates/common/ui/component.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/index.ts',
        template: "export * from './{{pascalCase name}}'\n",
      },
      {
        type: 'add',
        path: '../src/common/ui/{{componentType}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: './templates/common/ui/test.tsx.hbs',
      },
    ];
  },
};
