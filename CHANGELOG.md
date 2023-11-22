## 2.0.5 / 2023-11-22
* Fixed _github action_ `npm_publish_on_pr_merge_to_master`.
* Updated _dev_ libs:
  * `@babel/core` from `v7.23.2` to `v7.23.3`.
  * `@babel/preset-env` from `v7.23.2` to `v7.23.3`.
  * `@babel/preset-typescript` from `v7.23.2` to `v7.23.3`.
  * `@types/jest` from `v29.5.6` to `v29.5.10`.
  * `@typescript-eslint/eslint-plugin` from `v6.9.0` to `v6.12.0`.
  * `@typescript-eslint/parser` from `v6.9.0` to `v6.12.0`.
  * `eslint` from `v8.52.0` to `v8.54.0`.
  * `eslint-plugin-unicorn` from `v48.0.1` to `v49.0.0`.
  * `prettier` from `v3.0.3` to `v3.1.0`.
  * `tsup` from `v7.2.0` to `v8.0.1`.
  
## 2.0.4 / 2023-10-24
* Updated _dev_ libs:
  * `@babel/core` from `v7.23.0` to `v7.23.2`.
  * `@babel/preset-env` from `v7.22.20` to `v7.23.2`.
  * `@babel/preset-typescript` from `v7.23.0` to `v7.23.2`.
  * `@types/jest` from `v29.5.5` to `v29.5.6`.
  * `@typescript-eslint/eslint-plugin` from `v6.7.3` to `v6.9.0`.
  * `@typescript-eslint/parser` from `v6.7.3` to `v6.9.0`.
  * `eslint` from `v8.50.0` to `v8.52.0`.
  
## 2.0.3, 2.0.2, 2.0.1 / 2023-10-04
* Fixed _github actions_:
  * `validate_pr_to_master`
  * `npm_publish_on_pr_merge_to_master`.

## 2.0.0 / 2023-10-04

**NOTE:**<br>
⚠️ It's not valid anymore:<br>`const OTimer = require('oro-timer')`,<br>
✔️ use the following instead:<br>`const { OTimer } = require('oro-timer')`

* Refactored `./index.js` to `./src/index.ts`.
* Updated _package_ as `type: "module"`.
* Added `tsup` and now _package_ is compiled to `cjs` _(common)_ and `mjs` _(module)_.
* Added _github actions_:
  * `validate_pr_to_master`
  * `npm_publish_on_pr_merge_to_master`.
* Added `husky` (to ensure only valid commits).
* Added `eslint` (and applied it).
* Added `prettier` (and applied it).
* Updated _package description_
* Updated _dev_ libs:
  * `@babel/core` to `v7.23.0`.
  * `@babel/preset-env` to `v7.22.20`.
  * `@babel/preset-typescript` to `v7.23.0`.
  * `@types/jest` to `v29.5.5`.
  * `babel-jest` to `v29.7.0`.
  * `jest` to `v29.7.0`.

## 1.1.0 / 2023-04-29
* Added `TS` support.
* Added _ts tests_.
* Added `package-lock.json`.
* Improved _tests_.
* Improved _readme_.
* Improved _param type checks_ to avoid throwing errors.
* Updated lib-dev `jest` to `v29.5.0`.

## 1.0.1 / 2021-12-14
* Added `MIT License`.

## 1.0.0 / 2021-11-04
* Added changelog.
* Added _unit testing_ `Jest`.
* Added _package_ in `github.com` & `npmjs.com`.
