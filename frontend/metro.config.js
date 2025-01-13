const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

const workspaceRoot = path.resolve(projectRoot, '../');

const config = getDefaultConfig(projectRoot, {
  isCSSEnabled: true,
});

if (config && config.resolver) {
  config.watchFolders = [workspaceRoot];
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ];
  config.resolver.disableHierarchicalLookup = true;
}

module.exports = config;