const { firefox } = require('playwright');
const path = require('path');

(async () => {
  const browser = await firefox.launch({
    headless: false // Change to true if you want to see what's happening.
  })
  const context = await browser.newContext()

  // Open new page
  const page = await context.newPage()

  // Find absolute path to index.html
  const filePath = path.resolve('./stopword/demo/index.html')
  console.log(filePath)

  // Go to stopword file
  await page.goto('file://' + filePath)
  await page.screenshot({ path: 'screenshot-01.png' })

  // Enlighs - Type character by character in #text input field
  await page.type('#text', 'important a string of text with some nice and interesting words')
  const enStopped = await page.textContent('#stopwordsRemoved')
  console.log(enStopped)
  await page.screenshot({ path: 'screenshot-02.png' })

  // Select Arabic standard language
  await page.selectOption('select', 'ar')

  // Select all text in input field so it clears when typing next text
  await page.click('#text', { clickCount: 3 })

  // Arabic - Type character by character in #text input box
  await page.type('#text', 'ورغم أن الحملة توقفت بقينا نتسلق سلّم الأمل نظن أن الحكومة تسبقنا نحو القمة لكننا صعقنا بتوقف الحملة عند أسماء بعينها وكأن الفساد اقتصر على شفيق جراية ومن معه من مهربين؛ لكن الأفظع هو أن ملف شفيق جراية ليس ملف فساد بل ملف تآمر وهو ما يعني أنّ الحكومة غالطت الجميع وجندت التونسيين لحرب واهية تجاهلت فيها الفساد الحقيقي الذي ظهر على شخصيات كثيرة في مقدمتها الأمين العام لحركة مشروع تونس محسن مرزوق ')
  const arStopped = await page.textContent('#stopwordsRemoved')
  console.log(arStopped)

  await page.screenshot({ path: 'screenshot-03.png' })
  // ---------------------
  await context.close()
  await browser.close()
})()
