import fs from 'fs'
import { resolve } from 'path'

export const pathMultilineMessage = `What is the path to the parent feature?
  - it's mandatory
  - it's case sensitive
  - must be a relative path (relative to src/features)
  - must not contain leading and trailing /
  - refers to the root of the feature, not to the connectors folder (i.e. "FeatureA/FeatureB", not "FeatureA/FeatureB/connectors")
`

export default {
  description: 'Create a new connector inside a feature',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: pathMultilineMessage
    },
    {
      type: 'list',
      name: 'type',
      message: 'What do you want to connect?',
      choices: ['components', 'hooks']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the connector?'
    }
  ],
  actions: ({ type, path, name }) => {
    if (!name) throw new Error('name is mandatory')
    if (!path) throw new Error('path is mandatory')
    const absolutePath = resolve(`src/features/${path}`)
    if (!fs.existsSync(absolutePath)) throw new Error(`Incorrect path: ${absolutePath}`)

    const filenamePrefix = type === 'hooks'
      ? 'use'
      : ''
    const extension = type === 'hooks'
      ? 'ts'
      : 'tsx'

    return [
      {
        type: 'add',
        path: `${absolutePath}/connectors/{{type}}/${filenamePrefix}{{pascalCase name}}.${extension}`,
        templateFile: `./templates/features/connectors/{{type}}/connector.${extension}.hbs`
      },
      {
        type: 'add',
        path: `${absolutePath}/connectors/{{type}}/${filenamePrefix}{{pascalCase name}}.test.${extension}`,
        templateFile: `./templates/features/connectors/{{type}}/connector.test.${extension}.hbs`
      }
    ]
  }
}
