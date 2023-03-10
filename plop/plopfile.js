import commonBusinessLogicsGenerator from './generators/common-business-logics.js'
import commonHelperGenerator from './generators/common-helpers.js'
import commonStoreGenerator from './generators/common-stores.js'
import commonUIGenerator from './generators/common-ui.js'
import connectorGenerator from './generators/connector.js'
import featureGenerator from './generators/feature.js'

export default function (plop) {
  plop.setGenerator('common/business-logics', commonBusinessLogicsGenerator)
  plop.setGenerator('common/helpers', commonHelperGenerator)
  plop.setGenerator('common/stores', commonStoreGenerator)
  plop.setGenerator('common/ui', commonUIGenerator)
  plop.setGenerator('feature', featureGenerator)
  plop.setGenerator('connector', connectorGenerator)
}
