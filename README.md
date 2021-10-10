# batr
**B**undle **A**nd **T**est ... and **R**epeat

![batr-logo](https://user-images.githubusercontent.com/236656/115827172-3757dd00-a40c-11eb-9687-70bb6e623d2b.png)

Bundle and test CommonJS and ESM in NodeJS and UMD in the browser with Rollup, AvaJS and Playwright. And repeat with Travis-CI.

I'm using AvaJS since I want a simple enough test framework and don't want to be too smart about assertions. The needs are not that big. For UI tests it's good to be a little repetitive. If you want to test a sequence of interactions A, B, C and D, then test A first. Then test A and B after each other. You'll get to test the transition between the interactions and that the result of interaction A, doesn't screw up interaction B. Then you do A, B and C and then A, B, C and D.

## Libraries used:
* [AvaJS](https://github.com/avajs/ava)
* [Playwright](https://playwright.dev/docs/intro)
* [Rollup](https://rollupjs.org/guide/en/) + plugins `@rollup/plugin-commonjs`, `@rollup/plugin-json` and `@rollup/plugin-node-resolve`
* [StandardJS](https://standardjs.com/)

**Integrations**
* [Travis-CI](https://travis-ci.com/) for continuous integration.

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
const math = require('../dist/batr-example.cjs.js')

test('addition a + b', (t) => {
  const expected = 31
  const addition = math.add(7, 24)
  t.deepEqual(addition, expected)
})

test('subtraction a - b', (t) => {
  const expected = -17
  const subtraction = math.subtract(7, 24)
  t.deepEqual(subtraction, expected)
})

test('multiplication a * b', (t) => {
  const expected = 168
  const multiplication = math.multiply(7, 24)
  t.deepEqual(multiplication, expected)
})

test('division a * b', (t) => {
  const expected = 0.2916666666666667
  const division = math.divide(7, 24)
  t.deepEqual(division, expected)
})
```

##### Module - ./dist/batr-example.esm.mjs
Same tests as for `Main`, just using `import` instead of `require`.
```javaScript
import test from 'ava'
import math from '../dist/batr-example.esm.mjs'

// Tests are identical to Main/CJS tests
})
```

##### Browser - ./dist/ui-test.js
Similar tests, but done through recorded user interactions in a browser. You recorded with `playwright codegen`. Create your prototype and do something like this:
```console
npx playwright codegen -o javascript index.html
```

[Playwright has good documentation on how to record](https://playwright.dev/docs/codegen#generate-tests) user interactions and generating test-code for different programming languages. I'm guessing it's good practice to swap some of the HTML references with a little more solid CSS selectors so that the tests won't fail becuase of small HTML changes.

To see more of what's going on you can set `healess: false` and slow it down with `sloMo: 500`, but it will fail if you try it on i.e. Travis CI, since there it's running headless.

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

test('Add numbers 4 and 7', pageMacro, async (t, page) => {
  const filePath = await path.resolve('./demo/index.html')
  const url = 'file://' + filePath

  // Go to ./index.html
  await page.goto(url)

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Fill input[type="number"]
  await page.fill('input[type="number"]', '4')

  // Press Tab
  await page.press('input[type="number"]', 'Tab')

  // Press Tab
  await page.press('select[name="calculation"]', 'Tab')

  // Fill #secondNumber
  await page.fill('#secondNumber', '7')

  // Press Tab with modifiers
  await page.press('#secondNumber', 'Shift+Tab')

  // screenshot, 1st task
  await page.screenshot({ path: './screenshots/screenshot-01.png' })

  // Click text=11
  t.deepEqual(await page.textContent('#result span'), '11')
  // await page.click('text=11')
})

test('Subtract number 7 from 4', pageMacro, async (t, page) => {
  const filePath = await path.resolve('./demo/index.html')
  const url = 'file://' + filePath

  // Go to ./index.html
  await page.goto(url)

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Fill input[type="number"]
  await page.fill('input[type="number"]', '4')

  // Press Tab
  await page.press('input[type="number"]', 'Tab')

  // Press Tab
  await page.press('select[name="calculation"]', 'Tab')

  // Fill #secondNumber
  await page.fill('#secondNumber', '7')

  // Press Tab with modifiers
  await page.press('#secondNumber', 'Shift+Tab')

  // Select subtract
  await page.selectOption('select[name="calculation"]', 'subtract')

  // screenshot, 2nd task
  await page.screenshot({ path: './screenshots/screenshot-02.png' })

  // Click text=-3
  t.deepEqual(await page.textContent('#result span'), '-3')
  // await page.click('text=-3')
})

// More test examples to be found at batr-example
})
```

#### Continuous integration with Travis-CI
Linux is the cheapest to run your tests on, but you can test on OSX and Windows to.
`.travis.yml`:
```yml
language: node_js
os: linux
dist: xenial
notifications:
  email: true
node_js:
  - '12'
  - '14'
  - '16'
before_script:
  - npm prune
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

## Howto set up
For an actual working example, check out [batr-example](http://github.com/eklem/batr-example) on how to use batr. It's an example library with minimal of functions and user-interface to show-case how to set up `batr`. The examples here are lifted from that library.