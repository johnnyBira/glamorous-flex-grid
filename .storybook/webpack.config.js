const merge = require('webpack-merge');
const commonConfig = require('../webpack.config.common')
const developConfig = require('../webpack.config.develop')
const productionConfig = require('../webpack.config.production')

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, environment) => {
  // environemnt has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // if (environment === 'PRODUCTION') {
  //   return merge(storybookBaseConfig, commonConfig, productionConfig);
  // }
  // return merge(storybookBaseConfig, commonConfig, developConfig);
  // console.log(config);
  return merge(storybookBaseConfig, commonConfig);
};
