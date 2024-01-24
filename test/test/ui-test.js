const { chromium } = require('playwright')
const test = require('ava')
const browserPromise = chromium.launch({
  headless: false
  // slowMo: 350
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
  t.timeout(60000)
  const filePath = await path.resolve(__dirname, '../demo/index.html')
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
