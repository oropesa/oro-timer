## 2.0.1 / 2023-10-04
* Fixed _github action_ `npm_publish_on_pr_merge_to_master`.

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
