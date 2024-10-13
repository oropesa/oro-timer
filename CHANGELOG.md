## 2.2.2 / 2024-10-13
- Update _dev_ libs:
  - `@babel/core` from `v7.25.2` to `v7.25.8`.
  - `@babel/preset-env` from `v7.25.4` to `v7.25.8`.
  - `@babel/preset-typescript` from `v7.24.7` to `v7.25.7`.
  - `@eslint/js` from `v9.11.0` to `v9.12.0`.
  - `eslint` from `v9.11.0` to `v9.12.0`.
  - `eslint-plugin-unicorn` from `v55.0.0` to `v56.0.0`.
  - `globals` from `v15.9.0` to `v15.11.0`.
  - `typescript-eslint` from `v8.6.0` to `v8.8.1`.

## 2.2.1 / 2024-09-23
- Update typescript _target_ to `ES2020`.
- Update _dev_ libs:
  - `@eslint/js` from `v9.10.0` to `v9.11.0`.
  - `@types/jest` from `v29.5.12` to `v29.5.13`.
  - `eslint` from `v9.10.0` to `v9.11.0`.
  - `husky` from `v9.1.5` to `v9.1.6`.
  - `nodemon` from `v3.1.4` to `v3.1.7`.
  - `tsup` from `v8.2.4` to `v8.3.0`.
  - `typescript-eslint` from `v8.4.0` to `v8.6.0`.

## 2.2.0 / 2024-09-07

- Add property `seconds` in `OTimerStep` to have declared the time as '0.00' seconds string format.
- Add property `total` in `OTimer` class to have always declared the total time in each step.
- Apply `prettier --write` in the whole project (with `endOfLine: 'lf'`).
- Update `eslint` _breakpoint version_ (v8 to v9).
- Update _dev_ libs:
  - `@babel/core` from `v7.24.7` to `v7.25.2`.
  - `@babel/preset-env` from `v7.24.7` to `v7.25.4`.
  - `@eslint/js` from `v9.6.0` to `v9.10.0`.
  - `eslint` from `v8.57.0` to `v9.10.0`.
  - `eslint-plugin-jest` from `v28.6.0` to `v28.8.3`.
  - `eslint-plugin-unicorn` from `v54.0.0` to `v55.0.0`.
  - `globals` from `v15.8.0` to `v15.9.0`.
  - `husky` from `v9.0.11` to `v9.1.5`.
  - `prettier` from `v3.3.2` to `v3.3.3`.
  - `tsup` from `v8.1.0` to `v8.2.4`.
  - `typescript` from `v5.5.3` to `v5.5.4`.
  - `typescript-eslint` from `v7.16.0` to `v8.4.0`.

## 2.1.1 / 2024-07-09

- Simplified _eslint_ config.
- Updated _dev_ libs:
  - `@babel/core` from `v7.24.5` to `v7.24.7`.
  - `@babel/preset-env` from `v7.24.5` to `v7.24.7`.
  - `@babel/preset-typescript` from `v7.24.1` to `v7.24.7`.
  - `@eslint/js` from `v9.2.0` to `v9.6.0`.
  - `eslint-plugin-jest` from `v28.5.0` to `v28.6.0`.
  - `eslint-plugin-unicorn` from `v53.0.0` to `v54.0.0`.
  - `globals` from `v15.2.0` to `v15.8.0`.
  - `nodemon` from `v3.1.0` to `v3.1.4`.
  - `prettier` from `v3.2.5` to `v3.3.2`.
  - `tsup` from `v8.0.2` to `v8.1.0`.
  - `typescript` from `v5.4.5` to `v5.5.3`.
  - `typescript-eslint` from `v7.9.0` to `v7.16.0`.

## 2.1.0 / 2024-05-13

- Improved _github cicd_ replacing `actions/--@v3` by `actions/--@v4`.
- Moved _tests_ inside `src` and simplified `*.test.js` to have only the _special-js_ cases.
- Added `label?: string` param in `OTimerGetTimesArgs`.
- Updated _eslint_ to flat `eslint.config.js`.
- Simplified `tsup.config.ts`.
- Re-init `package-lock.json`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.23.7` to `v7.24.5`.
  - `@babel/preset-env` from `v7.23.7` to `v7.24.5`.
  - `@babel/preset-typescript` from `v7.23.3` to `v7.24.1`.
  - `@types/jest` from `v29.5.11` to `v29.5.12`.
  - `eslint` from `v8.56.0` to `v8.57.0`.
  - `eslint-plugin-jest` from `v27.6.1` to `v28.5.0`.
  - `eslint-plugin-unicorn` from `v50.0.1` to `v53.0.0`.
  - `husky` from `v8.0.3` to `v9.0.11`.
  - `nodemon` from `v3.0.2` to `v3.1.0`.
  - `prettier` from `v3.1.1` to `v3.2.5`.
  - `tsup` from `v8.0.1` to `v8.0.2`.
  - `typescript` from `v5.3.3` to `v5.4.5`.
- Added _dev_ libs:
  - `@eslint/js` added `v9.2.0`.
  - `globals` added `v15.2.0`.
  - `typescript-eslint` added `v7.9.0`.
- Removed _dev_ libs:
  - `@typescript-eslint/eslint-plugin` removed.
  - `@typescript-eslint/parser` removed.
  - `eslint-config-alloy` removed.

## 2.0.6 / 2024-01-07

- Added _coverage_ for testing.
- Added _watcher_ for coding.
- Improved _github cicd_ replacing `npm install` to `npm ci`.
- Enhanced _linter_ adding some extensions.
- Enhanced _prettier_ adding import-sorter.
- Enhanced testing to achieve the 100% of coverage (yay!).
- Updated _dev_ libs:
  - `@babel/core` from `v7.23.3` to `v7.23.7`.
  - `@babel/preset-env` from `v7.23.3` to `v7.23.7`.
  - `@types/jest` from `v29.5.10` to `v29.5.11`.
  - `@typescript-eslint/eslint-plugin` from `v6.12.0` to `v6.18.0`.
  - `@typescript-eslint/parser` from `v6.12.0` to `v6.18.0`.
  - `eslint` from `v8.54.0` to `v^8.56.0`.
  - `eslint-plugin-unicorn` from `v49.0.0` to `v50.0.1`.
  - `prettier` from `v3.1.0` to `v3.1.1`.
  - `typescript` from `v5.2.2` to `v5.3.3`.
- Added _dev_ libs:
  - `@trivago/prettier-plugin-sort-imports`
  - `eslint-config-prettier`
  - `eslint-plugin-jest`
  - `nodemon`

## 2.0.5 / 2023-11-22

- Fixed _github action_ `npm_publish_on_pr_merge_to_master`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.23.2` to `v7.23.3`.
  - `@babel/preset-env` from `v7.23.2` to `v7.23.3`.
  - `@babel/preset-typescript` from `v7.23.2` to `v7.23.3`.
  - `@types/jest` from `v29.5.6` to `v29.5.10`.
  - `@typescript-eslint/eslint-plugin` from `v6.9.0` to `v6.12.0`.
  - `@typescript-eslint/parser` from `v6.9.0` to `v6.12.0`.
  - `eslint` from `v8.52.0` to `v8.54.0`.
  - `eslint-plugin-unicorn` from `v48.0.1` to `v49.0.0`.
  - `prettier` from `v3.0.3` to `v3.1.0`.
  - `tsup` from `v7.2.0` to `v8.0.1`.

## 2.0.4 / 2023-10-24

- Updated _dev_ libs:
  - `@babel/core` from `v7.23.0` to `v7.23.2`.
  - `@babel/preset-env` from `v7.22.20` to `v7.23.2`.
  - `@babel/preset-typescript` from `v7.23.0` to `v7.23.2`.
  - `@types/jest` from `v29.5.5` to `v29.5.6`.
  - `@typescript-eslint/eslint-plugin` from `v6.7.3` to `v6.9.0`.
  - `@typescript-eslint/parser` from `v6.7.3` to `v6.9.0`.
  - `eslint` from `v8.50.0` to `v8.52.0`.

## 2.0.3, 2.0.2, 2.0.1 / 2023-10-04

- Fixed _github actions_:
  - `validate_pr_to_master`
  - `npm_publish_on_pr_merge_to_master`.

## 2.0.0 / 2023-10-04

**NOTE:**<br>
⚠️ It's not valid anymore:<br>`const OTimer = require('oro-timer')`,<br>
✔️ use the following instead:<br>`const { OTimer } = require('oro-timer')`

- Refactored `./index.js` to `./src/index.ts`.
- Updated _package_ as `type: "module"`.
- Added `tsup` and now _package_ is compiled to `cjs` _(common)_ and `mjs` _(module)_.
- Added _github actions_:
  - `validate_pr_to_master`
  - `npm_publish_on_pr_merge_to_master`.
- Added `husky` (to ensure only valid commits).
- Added `eslint` (and applied it).
- Added `prettier` (and applied it).
- Updated _package description_
- Updated _dev_ libs:
  - `@babel/core` to `v7.23.0`.
  - `@babel/preset-env` to `v7.22.20`.
  - `@babel/preset-typescript` to `v7.23.0`.
  - `@types/jest` to `v29.5.5`.
  - `babel-jest` to `v29.7.0`.
  - `jest` to `v29.7.0`.

## 1.1.0 / 2023-04-29

- Added `TS` support.
- Added _ts tests_.
- Added `package-lock.json`.
- Improved _tests_.
- Improved _readme_.
- Improved _param type checks_ to avoid throwing errors.
- Updated lib-dev `jest` to `v29.5.0`.

## 1.0.1 / 2021-12-14

- Added `MIT License`.

## 1.0.0 / 2021-11-04

- Added changelog.
- Added _unit testing_ `Jest`.
- Added _package_ in `github.com` & `npmjs.com`.
