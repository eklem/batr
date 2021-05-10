// a list of commonly used words that have little meaning and can be excluded
// from analysis.
var words = [
  'အပေါ်', 'အနက်', 'အမြဲတမ်း', 'အတွင်းတွင်', 'မကြာမီ', 'မတိုင်မီ', 'ဒါ့အပြင်', 'အောက်မှာ', 'အထဲမှာ', 'ဘယ်တော့မျှ', 'မကြာခဏ',
  'တော်တော်လေး', 'စဉ်တွင်', 'နှင့်အတူ', 'နှင့်', 'နှင့်တကွ', 'ကျွန်တော်', 'ကျွန်မ', 'ငါ', 'ကျုပ်', 'ကျွနု်ပ်', 'ကျနော်', 'ကျမ', 'သူ',
  'သူမ', 'ထိုဟာ', 'ထိုအရာ', 'ဤအရာ', 'ထို', '၄င်း', 'ကျွန်တော်တို့', 'ကျွန်မတို့', 'ငါတို့', 'ကျုပ်တို့', 'ကျွနု်ပ်တို့', 'ကျနော်တို့',
  'ကျမတို့', 'သင်', 'သင်တို့', 'နင်တို့', 'မင်း', 'မင်းတို့', 'သူတို့', 'ကျွန်တော်အား', 'ကျွန်တော်ကို', 'ကျွန်မကို', 'ငါကို', 'ကျုပ်ကို',
  'ကျွနု်ပ်ကို', 'သူ့ကို', 'သူမကို', 'ထိုအရာကို', 'သင့်ကို', 'သင်တို့ကို', 'နင်တို့ကို', 'မင်းကို', 'မင်းတို့ကို', 'ငါတို့ကို', 'ကျုပ်တို့ကို',
  'ကျွနု်ပ်တို့ကို', 'မိမိကိုယ်တိုင်', 'မိမိဘာသာ', 'မင်းကိုယ်တိုင်', 'မင်းဘာသာ', 'မင်းတို့ကိုယ်တိုင်', 'မင်းတို့ဘာသာ', 'သူကိုယ်တိုင်',
  'ကိုယ်တိုင်', 'သူမကိုယ်တိုင်', 'သူ့ဘာသာ', 'သူ့ကိုယ်ကို', 'ကိုယ့်ကိုယ်ကို', 'မိမိကိုယ်ကို', '၄င်းပင်', 'ထိုအရာပင်', 'သည့်', 'မည့်',
  'တဲ့', 'ကျွနု်ပ်၏', 'ကျွန်တော်၏', 'ကျွန်မ၏', 'ကျနော်၏', 'ကျမ၏', 'သူ၏', 'သူမ၏', 'ထိုအရာ၏', 'ထိုဟာ၏', 'ကျွနု်ပ်တို့၏',
  'ငါတို့၏', 'ကျွန်တော်တို့၏', 'ကျွန်မတို့၏', 'ကျနော်တို့၏', 'ကျမတို့၏', 'သင်၏', 'သင်တို့၏', 'မင်း၏', 'မင်းတို့၏', 'သူတို့၏',
  'ကျွန်တော့်ဟာ', 'ကျွန်မဟာ', 'ကျနော်၏ဟာ', 'ကျမ၏ဟာ', 'ကျမဟာ', 'ကျနော်ဟာ', 'သူဟာ', 'သူမဟာ', 'သူ့ဟာ', 'ကျွနု်ပ်တို့ဟာ',
  'ကျွန်တော်တို့ဟာ', 'ကျွန်မတို့ဟာ', 'သင်တို့ဟာ', 'မင်းတို့ဟာ', 'သူတို့ဟာ', 'သူမတို့ဟာ', 'ဤအရာ', 'ဟောဒါ', 'ဟောဒီ', 'ဟောဒီဟာ',
  'ဒီဟာ', 'ဒါ', 'ထိုအရာ', '၄င်းအရာ', 'ယင်းအရာ', 'အဲဒါ', 'ဟိုဟာ', 'အချို့', 'တစ်ခုခု', 'အဘယ်မဆို', 'ဘယ်အရာမဆို',
  'အဘယ်မည်သော', 'အကြင်', 'အရာရာတိုင်း', 'စိုးစဉ်မျှ', 'စိုးစဉ်းမျှ', 'ဘယ်လောက်မဆို', 'တစ်စုံတစ်ရာ', 'တစုံတရာ', 'အလျဉ်းမဟုတ်',
  'မည်သည့်နည်းနှင့်မျှမဟုတ်', 'အလျဉ်းမရှိသော', 'အခြားဖြစ်သော', 'အခြားသော', 'အခြားတစ်ခု', 'အခြားတစ်ယောက်', 'အားလုံး',
  'အရာရာတိုင်း', 'အကုန်လုံး', 'အလုံးစုံ', 'အရာခပ်သိမ်း', 'တစ်ခုစီ', 'အသီးသီး', 'တစ်ဦးဦး', 'တစ်ခုခု', 'ကိုယ်စီကိုယ်ငှ', 'ကိုယ်စီ',
  'တစ်ဦးစီ', 'တစ်ယောက်စီ', 'တစ်ခုစီ', 'အကုန်', 'အပြည့်အစုံ', 'လုံးလုံး', 'နှစ်ခုလုံး', 'နှစ်ယောက်လုံး', 'နှစ်ဘက်လုံး', 'တစ်စုံတစ်ရာ',
  'တစ်စုံတစ်ခု', 'တစုံတခု', 'တစ်စုံတစ်ယောက်', 'တစုံတယောက်', 'တစ်ယောက်ယောက်', 'မည်သူမဆို', 'ဘာမျှမရှိ', 'ဘာမှမရှိ',
  'အဘယ်အရာမျှမရှိ', 'လူတိုင်း', 'လူတကာ', 'နှင့်', 'ပြီးလျှင်', '၄င်းနောက်', 'သို့မဟုတ်', 'သို့တည်းမဟုတ်', 'သို့မဟုတ်လျှင်',
  'ဒါမှမဟုတ်', 'ဖြစ်စေ', 'သို့စေကာမူ', 'ဒါပေမယ့်', 'ဒါပေမဲ့', 'မှတစ်ပါး', 'မှလွဲလျှင်', 'အဘယ်ကြောင့်ဆိုသော်', 'သောကြောင့်', 'သဖြင့်',
  '၍', 'သည့်အတွက်ကြောင့်', 'လျှင်', 'ပါက', 'အကယ်၍', 'သော်ငြားလည်း', 'စေကာမူ', 'နည်းတူ', 'ပေမယ့်', 'ပေမဲ့', 'ထိုနည်းတူစွာ',
  'ထိုနည်းတူ', 'ကဲ့သို့', 'သကဲ့သို့', 'ယင်းကဲ့သို့', 'ထိုကဲ့သို့', 'နှင့်စပ်လျဉ်း၍', 'ဤမျှ', 'ဤမျှလောက်', 'ဤကဲ့သို့', 'အခုလောက်ထိ',
  'ဒါကတော့', 'အဘယ်ကဲ့သလို့', 'မည်ကဲ့သို့', 'မည်သည့်နည်းနှင့်', 'မည်သည့်နည်းဖြင့်', 'မည်သည့်နည့်နှင့်မဆို', 'မည်သည့်နည်းဖြင့်မဆို',
  'မည်သို့', 'ဘယ်လိုလဲ', 'သို့ပေတည့်', 'သို့ပေမည့်', 'ဘယ်နည်းနှင့်', 'မည်ရွေ့မည်မျှ', 'အဘယ်မျှလောက်', 'ဘယ်လောက်', 'မည်သူ',
  'ဘယ်သူ', 'မည်သည့်အကြောင်းကြောင့်', 'ဘာအတွက်ကြောင့်', 'အဘယ်ကြောင့်', 'မည်သည့်အတွက်ကြောင့်', 'ဘာကြောင့်',
  'ဘာအတွက်နဲ့လဲ', 'မည်သည်', 'ဘာလဲ', 'အဘယ်အရာနည်း', 'မည်သည့်အရပ်မှာ', 'ဘယ်နေရာတွင်', 'မည်သည့်နေရာတွင်',
  'မည်သည့်နေရာသို့', 'ဘယ်နေရာသို့', 'ဘယ်နေရာမှာ', 'ဘယ်သူ၏', 'မည်သည့်အရာ၏', 'မည်သည့်အခါ', 'ဘယ်အချိန်', 'ဘယ်အခါ',
  'မည်သည့်အချိန်', 'ဘယ်တော့', 'မည်သူကို', 'မည်သူက', 'ဘယ်သူ့ကို', 'မည်သူမည်ဝါ', 'မည်သည့်အရာ', 'ဘယ်အရာ',
  'မည်သို့ပင်ဖြစ်စေ', 'ဘယ်လိုပဲဖြစ်ဖြစ်', 'မည်ရွေ့မည်မျှဖြစ်စေ', 'မည်သည့်နည်းနှင့်မဆို', 'ဘယ်နည်းနဲ့ဖြစ်ဖြစ်', 'မည်သူမဆို',
  'ဘယ်သူမဆို', 'အဘယ်သူမဆို', 'မည်သည့်အရာမဆို', 'ဘာဖြစ်ဖြစ်', 'မည်သည့်အရာဖြစ်ဖြစ်', 'မည်သည့်အရပ်၌မဆို',
  'မည်သည့်နေရာမဆို', 'ဘယ်အခါမဆို', 'ဘယ်အချိန်မဆို', 'ဘယ်အခါဖြစ်ဖြစ်', 'အချိန်အခါမရွေး'
]
// tell the world about the noise words.
exports.words = words