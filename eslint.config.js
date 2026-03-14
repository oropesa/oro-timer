import {
  DEFAULT_IGNORES,
  setEslintLanguageOptionsProject,
  setEslintLanguageOptionsRootAsNode,
  setEslintPluginJest,
  setEslintPluginJestDom,
  setEslintPluginPrettier,
  setEslintPluginTypescriptEslint,
  setEslintPluginUnicorn,
} from './eslint.config.utils.js';

const allowList = ['dev', 'Dev', 'obj', 'tmp', 'args', 'Args', 'utils', 'props'];

export default [
  { ignores: DEFAULT_IGNORES },
  setEslintLanguageOptionsProject(),
  setEslintLanguageOptionsRootAsNode(),
  setEslintPluginUnicorn({ allowList }),
  setEslintPluginJest(),
  setEslintPluginJestDom(),
  setEslintPluginPrettier(),
  ...setEslintPluginTypescriptEslint(),
];
