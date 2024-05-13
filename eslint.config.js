import {
  setEslintLanguageOptionsBrowser,
  setEslintPluginJest,
  setEslintPluginPrettier,
  setEslintPluginTypescripEslint,
  setEslintPluginUnicorn,
} from './eslint.config.utils.js';

const ignores = ['coverage/*', 'dist/*', 'tmp.js', '**/*.test.js', '**/*.cjs'];

const allowList = ['obj', 'tmp', 'args', 'props', 'OTimerGetTimesArgs'];

export default [
  setEslintLanguageOptionsBrowser(),
  setEslintPluginUnicorn({ ignores, allowList }),
  setEslintPluginJest({ ignores }),
  setEslintPluginPrettier({ ignores }),
  ...setEslintPluginTypescripEslint({ ignores }),
];
