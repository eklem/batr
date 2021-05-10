const { chromium } = require('playwright')
const test = require('ava').default
const browserPromise = chromium.launch({
  headless: true
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

test('removing English stopwords', pageMacro, async (t, page) => {
  const filePath = await path.resolve('./test/stopword/demo/index.html')
  const url = 'file://' + filePath
  await page.goto(url)
  await page.type('#text', 'a really Interesting string with some words')
  // await page.screenshot({ path: 'screenshot-01.png' })
  t.deepEqual(await page.textContent('#stopwordsRemoved'), 'really Interesting string words')
})

test('removing first English stopwords, then Arabic stopwords', pageMacro, async (t, page) => {
  const filePath = await path.resolve('./test/stopword/demo/index.html')
  const url = 'file://' + filePath
  await page.goto(url)
  await page.type('#text', 'a really Interesting string with some words')
  t.deepEqual(await page.textContent('#stopwordsRemoved'), 'really Interesting string words')

  // Select Arabic standard language
  await page.selectOption('select', 'ar')
  // Select all text in input field so it clears when typing next text
  await page.click('#text', { clickCount: 3 })
  await page.type('#text', 'ورغم أن الحملة توقفت بقينا نتسلق سلّم الأمل نظن أن الحكومة تسبقنا نحو القمة لكننا صعقنا بتوقف الحملة عند أسماء بعينها وكأن الفساد اقتصر على شفيق جراية ومن معه من مهربين؛ لكن الأفظع هو أن ملف شفيق جراية ليس ملف فساد بل ملف تآمر وهو ما يعني أنّ الحكومة غالطت الجميع وجندت التونسيين لحرب واهية تجاهلت فيها الفساد الحقيقي الذي ظهر على شخصيات كثيرة في مقدمتها الأمين العام لحركة مشروع تونس محسن مرزوق ')
  // await page.screenshot({ path: 'screenshot-02.png' })
  t.deepEqual(await page.textContent('#stopwordsRemoved'), 'ورغم الحملة توقفت بقينا نتسلق سلّم الأمل نظن الحكومة تسبقنا القمة لكننا صعقنا بتوقف الحملة أسماء بعينها وكأن الفساد اقتصر شفيق جراية معه مهربين؛ الأفظع ملف شفيق جراية ليس ملف فساد ملف تآمر يعني أنّ الحكومة غالطت الجميع وجندت التونسيين لحرب واهية تجاهلت الفساد الحقيقي ظهر شخصيات كثيرة مقدمتها الأمين العام لحركة مشروع تونس محسن مرزوق ')
})
