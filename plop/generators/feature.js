import fs from 'fs';
import { resolve } from 'path';

const pathMultilineMessage = `What is the path to the parent feature?
  - it's optional (default folder is src/features)
  - it's case sensitive
  - must be a relative path (relative to src/features)
  - must not contain leading and trailing /
`;

export default {
  description: 'Create a new feature',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: pathMultilineMessage,
    },
    {
      type: 'input',
      name: 'name',
      message: "What is the new feature's name? (will be converted to PascalCase)",
    },
  ],
  actions: ({ name, path }) => {
    if (!fs.existsSync(resolve('src/features'))) fs.mkdirSync('src/features');
    const absolutePath = resolve(`src/features/${path}`);

    if (!name) throw new Error('name is mandatory');
    if (!fs.existsSync(absolutePath)) throw new Error(`Incorrect path: ${absolutePath}`);

    return [
      {
        type: 'add',
        path: `${absolutePath}/{{pascalCase name}}/index.tsx`,
        templateFile: './templates/features/index.tsx.hbs',
      },
    ];
  },
};
