const commonBusinessLogicsGenerator = require('./generators/common-business-logics')
const commonHelperGenerator = require('./generators/common-helpers')
const commonStoreGenerator = require('./generators/common-stores')
const commonUIGenerator = require('./generators/common-ui')
const featureGenerator = require('./generators/feature')

module.exports = function (plop) {
  plop.setGenerator('common/business-logics', commonBusinessLogicsGenerator)
  plop.setGenerator('common/helpers', commonHelperGenerator)
  plop.setGenerator('common/stores', commonStoreGenerator)
  plop.setGenerator('common/ui', commonUIGenerator)
  plop.setGenerator('feature', featureGenerator)
}
