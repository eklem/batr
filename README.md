# batr
**B**undle **A**nd **T**est ... and **R**epeat

![batr-logo](https://user-images.githubusercontent.com/236656/115827172-3757dd00-a40c-11eb-9687-70bb6e623d2b.png)

Bundle and test CommonJS and ESM in NodeJS and UMD in the browser with Rollup, AvaJS and Playwright. And repeat with GitHub Actions workflow.

I'm using AvaJS since I want a simple enough test framework and don't want to be too smart about assertions. The needs are not that big. For UI tests it's good to be a little repetitive. If you want to test a sequence of interactions A, B, C and D, then test them all synchronously in one go. You'll get to test the transition between the interactions and that the result of interaction A, doesn't screw up interaction B and so on.

[![NPM version](http://img.shields.io/npm/v/batr.svg?style=flat)](https://npmjs.org/package/batr)
[![NPM downloads](http://img.shields.io/npm/dm/batr.svg?style=flat)](https://npmjs.org/package/batr) 
[![Build Status](https://github.com/eklem/batr/actions/workflows/tests.yml/badge.svg)](https://github.com/eklem/batr/actions/workflows/tests.yml) 
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Example setup
For an actual working example, check out [batr-example](http://github.com/eklem/batr-example) on how to use batr. It's an example library with minimal of functions and user-interface to show-case how to set up `batr`. The examples here are lifted from that library.

## Libraries used:
* [AvaJS](https://github.com/avajs/ava)
* [Playwright](https://playwright.dev/docs/intro)
* [Rollup](https://rollupjs.org/guide/en/) + plugins `@rollup/plugin-commonjs`, `@rollup/plugin-json` and `@rollup/plugin-node-resolve`
* [StandardJS](https://standardjs.com/)

**Integrations**
* Using [GitHub Actions workflow](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions) for continuous integration.

## Get started

### Add batr devDependency
All the dependencies in one. Security updates and version bumps done mostly at the start of every month, so less GitHub dependabot noise.

```javaScript
  "devDependencies": {
    "batr": "^1.0.5"
  }
```
The underlying libraries are used (required and imported) as normal.

### Define main, module and browser
* `main` - CJS - CommonJS
* `module` - ESM - ES Modules
* `browser` - UMD - Universal Module Definitions

```javaScript
  "main": "./dist/batr-example.cjs.js",
  "module": "./dist/batr-example.esm.mjs",
  "browser": "./dist/batr-example.umd.js",
```

Makes pointers to which files are used for what. Used i.e. when bundling correct distribution files with Rollup and to use the correct file when doing `const moduleName = require('moduleName')` or `import moduleName from "moduleName"`.

### Tests

#### Build/bundle and tests from package.json

```javaScript
  "scripts": {
    "build": "rollup --config",
    "test": "standard './*.js' && npm run build  && npx ava ./test/test.cjs.js && npx ava ./test/test.esm.mjs && npx ava ./test/ui-test.js"
  }
```

#### Rollup config for bundling CJS, ESM and UMD

```javaScript
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: './src/index.js',
    output: [
      { name: 'math', file: pkg.browser, format: 'umd', exports: 'named' },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json() // for Rollup to be able to read content from package.json
    ]
  }
]
```

#### Actual test scripts

##### Main - ./dist/batr-example.cjs.js
```javaScript
const test = require('ava')
const { add, subtract, multiply, divide } = require('../dist/batr-example.cjs.js')

test('addition a + b', (t) => {
  const expected = 31
  const addition = add(7, 24)
  t.deepEqual(addition, expected)
})

test('subtraction a - b', (t) => {
  const expected = -17
  const subtraction = subtract(7, 24)
  t.deepEqual(subtraction, expected)
})

test('multiplication a * b', (t) => {
  const expected = 168
  const multiplication = multiply(7, 24)
  t.deepEqual(multiplication, expected)
})

test('division a * b', (t) => {
  const expected = 0.2916666666666667
  const division = divide(7, 24)
  t.deepEqual(division, expected)
})
```

##### Module - ./dist/batr-example.esm.mjs
Same tests as for `Main`, just using `import` instead of `require`.
```javaScript
import test from 'ava'
import { add, subtract, multiply, divide } from '../dist/batr-example.esm.mjs'

// Tests are identical to Main/CJS tests
})
```

##### Browser - ./dist/ui-test.js
Similar tests, but done through recorded user interactions in a browser. You recorded with `playwright codegen`. Create your prototype and do something like this:
```console
npx playwright codegen -o javascript index.html
```

[Playwright has good documentation on how to record](https://playwright.dev/docs/codegen#generate-tests) user interactions and generating test-code for different programming languages. I'm guessing it's good practice to swap some of the HTML references with a little more solid CSS selectors so that the tests won't fail becuase of small HTML changes.

To see more of what's going on you can set `healess: false` and slow it down with `sloMo: 500`, but it will fail if you try it on i.e. a server, since there it's running headless.

Also, you can test with different browsers or more than one browser, and emulate devices like an Iphone.

```javaScript
const { chromium } = require('playwright')
const test = require('ava')
const browserPromise = chromium.launch({
  headless: true
  // slowMo: 500
})

const path = require('path')
async function pageMacro (t, callback) {
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.setViewportSize({ width: 640, height: 480 })
  try {
    await callback(t, page)
  } finally {
    await page.close()
  }
}

test('Add numbers 4 and 7, subtract 7 from 4, multiply 4 and finally divide 4 by 7', pageMacro, async (t, page) => {
  // t.plan(4)
  const filePath = await path.resolve('./demo/index.html')
  const url = 'file://' + filePath

  // Go to ./index.html
  await page.goto(url)

  // Click first number input field and delete
  await page.click('#firstNumber')
  await page.keyboard.press('Backspace')

  // Type number
  await page.keyboard.type('4')

  // Press Tab twice to get to next number
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')

  // Fill #secondNumber
  await page.keyboard.type('7')

  // Press Tab with modifiers
  await page.press('#secondNumber', 'Shift+Tab')

  // screenshot, 1st task
  await page.screenshot({ path: './screenshots/screenshot-01.png' })

  // Test that 4 + 7 gives 11
  t.deepEqual(await page.textContent('#result span'), '11')

  // Select subtract
  await page.selectOption('select[name="calculation"]', 'subtract')

  // screenshot, 2nd task
  await page.screenshot({ path: './screenshots/screenshot-02.png' })

  // Test that 4 - 7 gives -3
  t.deepEqual(await page.textContent('#result span'), '-3')

  // Select multiply
  await page.selectOption('select[name="calculation"]', 'multiply')

  // screenshot, 3rd task
  await page.screenshot({ path: './screenshots/screenshot-03.png' })

  // Test that 3 * 11 gives 28
  t.deepEqual(await page.textContent('#result span'), '28')

  // Select divide
  await page.selectOption('select[name="calculation"]', 'divide')

  // screenshot, 4th task
  await page.screenshot({ path: './screenshots/screenshot-04.png' })

  // Test that 4 / 7 gives 0.5714285714285714
  t.deepEqual(await page.textContent('#result span'), '0.5714285714285714')
})
```

#### Continuous integration with GitHub Actions workflow
`ubuntu-latest` is easy going, but you can test OSX and Windows too. Check [GitHubs runs-on documentiation](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on).
`.github/workflows/tests.yml`:
```yml
name: tests
on:
  - push
  - pull_request
jobs:
  run-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x, 14.x, 16.x]
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: sudo apt-get install xvfb
      - run: xvfb-run --auto-servernum npm test
```

## Background and goal
* Use less time on updating the same bundle and test framework code in different libraries.
* Quicker bundling and test setup when creating new libraries.
* As few dependencies as possible, or a good balance between dependencies and function, to not have minor updates all the time.
* New NPM release every month, meaning less noise from Dependabot. Batr + dependencies will only be devDependencies, and security issues will not be a big problem.

### Easy setup of
* Ava tests in Node.js
* Possibly duplicat Ava tests in browser
* User-like interaction tests in browser, supported by Ava
* Bundling & buildin  g for the browser, CommonJS and ESM

