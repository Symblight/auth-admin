const path = require('path');
const fs = require('fs');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  src: resolveApp('src'),
  components: resolveApp('src/components'),
  containers: resolveApp('src/containers'),
  mocks: resolveApp('src/mocks'),
  features: resolveApp('src/features'),
  publicPath: '/static/',
  libs: resolveApp('src/libs'),
  pages: resolveApp('src/pages'),
  stores: resolveApp('src/stores'),
};

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcShared,
  paths.src,
  'node_modules',
];

module.exports = paths;
