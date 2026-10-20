"use strict";
/* ---------- constants ---------- */
const COLORS=[
 ['white','Білий','White','#F7F6F1'],['cream','Кремовий','Cream','#EADBB8'],['peach','Персиковий','Peach','#F2B48E'],
 ['lightpink','Світло-рожевий','Light pink','#F3C1D0'],['pink','Рожевий','Pink','#DE4F86'],['red','Червоний','Red','#B11E2D'],
 ['burgundy','Бордовий','Burgundy','#5C1228'],['orange','Помаранчевий','Orange','#E6762C'],['yellow','Жовтий','Yellow','#F1CA33'],
 ['lavender','Лавандовий','Lavender','#B5A1D8'],['purple','Фіолетовий','Purple','#6B3D93'],['blue','Синій','Blue','#3D6DB3'],
 ['green','Зелений','Green','#6C9350'],['mixed','Мікс','Mixed','mix']];
const CMAP=Object.fromEntries(COLORS.map((c,i)=>[c[0],{i,uk:c[1],en:c[2],hex:c[3]}]));
const GROUPS=[
 ['rose','Троянда','Rose',20],['garden_rose','Садова троянда','Garden rose',12],['spray_rose','Кущова троянда','Spray rose',10],
 ['tulip','Тюльпан','Tulip',50],['hydrangea','Гортензія','Hydrangea',10],['peony','Півонія','Peony',10],
 ['ranunculus','Ранункулюс','Ranunculus',10],['lisianthus','Лізіантус','Lisianthus',20],['chrysanthemum','Хризантема','Chrysanthemum',20],
 ['dahlia','Жоржина','Dahlia',30],['lily','Лілія','Lily',40],['calla','Калла','Calla',10],['alstroemeria','Альстромерія','Alstroemeria',50],
 ['amaryllis','Амариліс','Amaryllis',10],['anemone','Анемона','Anemone',10],['anthurium','Антуріум','Anthurium',12],
 ['gerbera','Гербера','Gerbera',50],['delphinium','Дельфініум','Delphinium',10],['gypsophila','Гіпсофіла','Gypsophila',25],
 ['eucalyptus','Евкаліпт','Eucalyptus',10],['ruscus','Рускус','Ruscus',10],['pistacia','Фісташка','Pistachio',10],
 ['sunflower','Соняшник','Sunflower',40],['carnation','Гвоздика','Carnation',20],['stock','Матіола','Stock',10],
 ['snapdragon','Левиний зів','Snapdragon',10],['freesia','Фрезія','Freesia',10],['scabiosa','Скабіоза','Scabiosa',10],
 ['protea','Протея','Protea',5],['orchid','Орхідея','Orchid',10],['allium','Аліум','Allium',50],['bupleurum','Буплерум','Bupleurum',50],
 ['carthamus','Сафлор','Safflower',40],['hypericum','Звіробій','Hypericum',25],['moluccella','Молюцела','Bells of Ireland',20],
 ['ornithogalum','Птахомлечник','Chincherinchee',50],['solidago','Золотарник','Solidago',100],['veronica','Вероніка','Veronica',25],
 ['panicum','Декоративна трава','Ornamental grass',1],['cucurbita','Декоративний гарбуз','Ornamental pumpkin',15],['limonium','Лімоніум','Statice',25],
 ['matricaria','Матрикарія','Feverfew',10],['other','Інше','Other',10]];
const GMAP=Object.fromEntries(GROUPS.map(g=>[g[0],{uk:g[1],en:g[2],bunch:g[3]}]));
const LENGTHS=[30,40,50,55,60,70,80,90];
const CONDS=['fresh','usable','sell','bad'];
const REASONS=['wilted','broken','botrytis','overblown','arrival','cold','other'];

/* ---------- i18n ---------- */
const T={uk:{
 home:'Головна',stock:'Склад',reports:'Звіти',invoicesTab:'Рахунки',dropHere:'Перетягніть PDF рахунку сюди',dropOr:'або натисніть, щоб вибрати файл – PDF чи фото',dropActive:'Відпустіть, щоб завантажити рахунок',
 nextBuy:'Наступна закупівля',openList:'Відкрити список',positions:'позицій',countCard:'Підрахунок у кінці тижня',countStart:'Почати підрахунок',countContinue:'Продовжити підрахунок',countDoneCard:'Збережено – залишки перейшли в тиждень {w}',countNone:'Ще не почато',countDraft:'{n} квітів пораховано',
 needsAttention:'Потребує уваги',linesToReview:'Рядки рахунків на перевірку: {n}',flowersUnv:'Неперевірені квіти: {n}',flowersNoPrice:'Куплені квіти без ціни продажу: {n}',allGood:'Усе в порядку.',thisWeek:'Цей тиждень',lastWeekWaste:'Списання, тиждень {w}',
 importTitle:'Рахунок прочитано',importSum:'{m} рядків зіставлено з вашими квітами · {n} нових',importNewHint:'Нові квіти буде створено з даних рахунку. Перевірте колір – решту заповнено автоматично, все можна змінити пізніше.',
 absorbN:'Внести на склад ({n})',newCount:'Нові',asNew:'Нова квітка',skip:'Пропустити',sameAs:'Це: {x}',later:'Пізніше',absorbed:'Внесено на склад: {n} рядків',allMatched:'Усі рядки зіставлено й внесено на склад.',matchedLines:'Зіставлено',feesLines:'Тара та збори (не входять у вартість квітів)',
 openInvoice:'Відкрити рахунок',recentInv:'Останні рахунки',listView:'Список',pricesView:'Ціни продажу',settingsT:'Налаштування',done:'Готово',readingPdf:'Читаю PDF…',noLines:'У файлі не знайдено рядків з квітами.',
 sub:'Склад квітів',week:'Тиждень',flowers:'Квіти',buying:'Закупівля',count:'Підрахунок',insights:'Огляд',more:'Ще',
 luxury:'Люкс',regular:'Звичайні',search:'Пошук: сорт, група, постачальник…',allGroups:'Усі групи',allColors:'Усі кольори',allLengths:'Уся довжина',
 unverified:'Не перевірено',verified:'Перевірено',inStock:'на складі',stems:'шт',add:'+ Додати квітку',addFlower:'Додати квітку',editFlower:'Редагувати квітку',
 tier:'Рівень',group:'Група',variety:'Сорт',color:'Колір',length:'Довжина (см)',supplier:'Постачальник',bunch:'Стебел у пачці',
 sellPrice:'Ціна продажу за стебло (DKK)',spot:'Місце в холодильнику',spotHint:'напр. «Полиця 2» – порожньо = за кольором',
 confirmed:'Перевірено нами',save:'Зберегти',saveNext:'Зберегти й додати ще',cancel:'Скасувати',delete:'Видалити',tapAgain:'Натисніть ще раз, щоб видалити',
 noFlowers:'Тут ще немає квітів',noFlowersHint:'Додайте першу кнопкою внизу.',noMatch:'Немає квітів за цим пошуком.',
 day:'День',invoices:'Рахунки',have:'Є',need:'Потрібно',order:'Замовити',price:'Ціна/шт',estTotal:'Орієнтовно',bundles:'пач',
 noPrice:'ціни ще немає',why:'Чому?',reset:'Скинути до пропозиції',showAll:'Показати всі квіти',showSuggested:'Лише пропозиції',
 lowConf:'Низька точність',lowConfText:'Пропозиції базуються на {n} тиж. підрахунків. Менше 8 тижнів – це грубий розрахунок, коригуйте його.',
 okConf:'Дані за {n} тиж.',noData:'Підрахунків ще немає – пропозиції з’являться після першого збереженого тижневого підрахунку.',
 seasonNote:'Сезонність з’явиться лише після повного року даних ({n}/52 тиж.).',
 est:'оцінка',pdf:'A4 PDF',csv:'CSV',totalStems:'Стебел',totalCost:'Орієнтовна сума',missingPrice:'без ціни',
 noRows:'На цей день нічого не запропоновано.',rsNone:'Історії ще немає – вкажіть кількість самі.',
 rs:'Звичайна витрата {typ} шт/тиж. (середнє за {n} тиж.{s}) − {left} придатних залишків = {net} шт → {b} × {bunch} = {stems} шт. Розподіл: день 1 – {d1}, день 2 – {d2} ({src}).',
 rsHist:'за минулими закупівлями',rsSet:'за налаштуваннями',
 upload:'Завантажити рахунок',uploadHint:'PDF або фото. Рядки зчитуються й зіставляються автоматично.',reading:'Читаю рахунок…',uploading:'Зберігаю оригінал…',
 review:'На перевірку',reviewEmpty:'Усе зіставлено.',matched:'зіставлено',ignored:'пропущено',toReview:'на перевірку',
 original:'Відкрити оригінал',noOriginal:'Оригінал не прикріплено',attach:'Прикріпити оригінал',invDate:'Дата рахунку',assign:'Належить до',flowersTotal:'Квіти',fees:'Тара/збори',
 matchLine:'Зіставити рядок',chooseFlower:'Оберіть квітку',ignore:'Пропустити рядок',newFromLine:'Створити нову квітку',stemsBought:'Куплено стебел',ppStem:'Ціна за стебло (DKK)',
 lineText:'Текст рядка',addLine:'+ Додати рядок',manualInv:'Покупка без рахунку',deleteInv:'Видалити рахунок',invRead:'{m} зіставлено · {r} на перевірку',
 cantRead:'Не вдалося прочитати рядки автоматично. Додайте їх вручну.',
 countTitle:'Підрахунок, тиждень {w}',bunches:'Пачки',loose:'Окремі стебла',fresh:'Свіжі',usable:'Придатні',sell:'Продати першими',bad:'Непридатні',
 wilted:'Зів’яли',broken:'Зламані',botrytis:'Сіра гниль',overblown:'Перецвіли',arrival:'Пошкоджені при доставці',cold:'Пошкоджені холодом',other:'Інше',
 reasonReq:'Оберіть причину списання',split:'+ Розділити (інший стан)',removeEntry:'Прибрати',
 expected:'Очікується',filterStock:'На складі',filterAll:'Усі',saveCount:'Зберегти підрахунок',savedCount:'Збережено · переходить у тиждень {w}',draft:'Чернетка – зберігається автоматично',
 missingReasons:'{n} списань без причини',countSaved:'Підрахунок збережено. Залишки стали стартовим запасом тижня {w}.',
 bought:'Куплено',used:'Використано',left:'Залишок',waste:'Списання',cps:'Ціна/шт',income:'Дохід без ПДВ',cost:'Витрати',open:'Старт',
 notCounted:'Тиждень ще не пораховано. Використання й списання з’являться після збереження підрахунку.',byTier:'За рівнем',byColor:'За кольором',byFlower:'За квіткою',
 nextOrder:'Пропозиція на наступний тиждень',toBuying:'Відкрити списки закупівлі',addSell:'додайте ціну продажу',
 settings:'Налаштування',buyDays:'Дні закупівлі',weekday:'День тижня',time:'Час',share:'Частка тижневої закупівлі в день 1 (коли немає історії)',
 language:'Мова',templates:'Шаблони для друку (A4)',buySheet:'Список закупівлі',coolerSheet:'Аркуш підрахунку для холодильника',summary:'Тижневий звіт',
 export:'Експорт (CSV)',exFlowers:'Квіти',exPurch:'Закупівлі',exLines:'Рядки рахунків',exCounts:'Підрахунки',exStats:'Тижневі показники',
 demo:'Демо-дані',demoText:'Тиждень 41 – демонстраційний (кількості вигадані, ціни з рахунку Verdel 295427). Видаліть його, коли будете готові.',removeDemo:'Видалити демо-тиждень',demoGone:'Демо-дані видалено.',
 connecting:'Підключення…',offline:'Немає зв’язку з базою. Перевірте інтернет і оновіть сторінку.',
 readOnly:'Немає доступу на запис.',saved:'Збережено',dlNo:'Завантаження недоступне.',dlOk:'Файл готовий',
 aiNo:'Автоматичне читання ще не налаштоване. Додайте рядки вручну.',days:['пн','вт','ср','чт','пт','сб','нд'],
 starterNote:'{n} квітів ще не перевірено (колір, рівень і розмір пачки – припущення). Натисніть, щоб переглянути.',
 prices:'Ціни',pricesTitle:'Ціни продажу',pricesHint:'Вводьте кінцеву ціну за стебло з ПДВ – ту, що платить клієнт. Ціна без ПДВ, ціна пачки, націнка й маржа рахуються автоматично. Базова націнка: собівартість × 3 (з ПДВ).',vat:'ПДВ (moms), %',rounding:'Округлення, DKK',markup:'Націнка ×',applyMarkup:'Застосувати націнку',toEmpty:'лише де немає ціни',toAll:'до всіх у списку',applied:'Ціни оновлено: {n}',noCostHint:'без закупівельної ціни – введіть вручну',allTiers:'Усі',onlyNoPrice:'Лише без ціни',costStem:'Собівартість/шт',sellStem:'Ціна продажу/шт з ПДВ',exclVat:'без ПДВ',sellShortCol:'Ціна/шт',inclVat:'з ПДВ',perBunch:'Пачка',margin:'Маржа',priceList:'Прайс-лист',plCustomer:'Для клієнтів (PDF)',plInternal:'Внутрішній з собівартістю (PDF)',plCsv:'Прайс CSV',plShow:'Показувати в прайсі',plIncl:'Ціни з ПДВ',plExcl:'Ціни без ПДВ',plBoth:'Обидві',plTitle:'Прайс-лист',plValid:'Ціни дійсні на {d}. Залежать від сезону та наявності.',plNone:'Ще немає квітів із ціною продажу.',sellShort:'продаж',withPrice:'з ціною',
 starter:'Стартовий список',fromInv:'З рахунку',reasonsT:'Причини',none:'—',stockTip:'старт + куплено за тиждень',
 dupFile:'Цей рахунок уже завантажено.',dupNo:'Рахунок {no} уже є.',pdfPriceNote:'ціна з останнього рахунку; «-» = ціни ще немає',coolerNote:'Впишіть кількість і поставте позначку. Кожне списання потребує причини.',reasonCol:'Причина',
 signIn:'Увійти',signUp:'Створити акаунт',email:'Email',password:'Пароль',signOut:'Вийти',signInTitle:'Склад квітів Florén',signInHint:'Увійдіть акаунтом команди.',
 haveAcc:'Вже є акаунт? Увійти',noAcc:'Немає акаунта? Створити',checkEmail:'Перевірте пошту й підтвердьте адресу, потім увійдіть.',
 notMember:'Цей акаунт ще не в команді. Попросіть когось із команди додати {e} у розділі «Ще → Команда».',
 team:'Команда',teamHint:'Лише ці адреси бачать і змінюють дані. Людина створює акаунт з цією ж адресою.',addMember:'Додати',removeMember:'Прибрати',you:'ви',
 signedInAs:'Ви увійшли як {e}',wrongLogin:'Неправильний email або пароль.'
},
en:{
 sub:'Flower stock',
 home:'Home',stock:'Stock',reports:'Reports',invoicesTab:'Invoices',dropHere:'Drop a supplier invoice PDF here',dropOr:'or tap to choose a file – PDF or photo',dropActive:'Release to upload the invoice',
 nextBuy:'Next buying day',openList:'Open list',positions:'items',countCard:'End-of-week count',countStart:'Start count',countContinue:'Continue count',countDoneCard:'Saved – leftovers moved into week {w}',countNone:'Not started',countDraft:'{n} flowers counted',
 needsAttention:'Needs attention',linesToReview:'{n} invoice lines waiting for review',flowersUnv:'{n} flowers not verified',flowersNoPrice:'{n} bought flowers without a selling price',allGood:'All good.',thisWeek:'This week',lastWeekWaste:'Waste, week {w}',
 importTitle:'Invoice read',importSum:'{m} lines matched to your flowers · {n} new',importNewHint:'New flowers are created from the invoice. Check the colour – the rest is filled in automatically and can be changed later.',
 absorbN:'Add to stock ({n})',newCount:'New',asNew:'New flower',skip:'Skip',sameAs:'Same as: {x}',later:'Later',absorbed:'Added to stock: {n} lines',allMatched:'All lines matched and added to stock.',matchedLines:'Matched',feesLines:'Packaging and fees (not in flower cost)',
 openInvoice:'Open invoice',recentInv:'Recent invoices',listView:'List',pricesView:'Selling prices',settingsT:'Settings',done:'Done',readingPdf:'Reading PDF…',noLines:'No flower lines found in the file.',
 attach:'Attach original',dupFile:'This invoice is already uploaded.',dupNo:'Invoice {no} already exists.',pdfPriceNote:'latest invoice price; "-" = no price yet',coolerNote:'Write counts and tick. Every discard needs a reason.',reasonCol:'Reason',
 signIn:'Sign in',signUp:'Create account',email:'Email',password:'Password',signOut:'Sign out',signInTitle:'Florén flower stock',signInHint:'Sign in with your team account.',
 haveAcc:'Already have an account? Sign in',noAcc:'No account? Create one',checkEmail:'Check your email and confirm the address, then sign in.',
 notMember:'This account is not on the team yet. Ask a team member to add {e} under More → Team.',
 team:'Team',teamHint:'Only these addresses can see and change data. The person creates an account with the same address.',addMember:'Add',removeMember:'Remove',you:'you',
 signedInAs:'Signed in as {e}',wrongLogin:'Wrong email or password.',
week:'Week',flowers:'Flowers',buying:'Buying',count:'Count',insights:'Insights',more:'More',
 luxury:'Luxury',regular:'Regular',search:'Search variety, group, supplier…',allGroups:'All groups',allColors:'All colours',allLengths:'All lengths',
 unverified:'Unverified',verified:'Verified',inStock:'in stock',stems:'stems',add:'+ Add flower',addFlower:'Add flower',editFlower:'Edit flower',
 tier:'Tier',group:'Group',variety:'Variety',color:'Colour',length:'Length (cm)',supplier:'Supplier',bunch:'Stems per bunch',
 sellPrice:'Selling price per stem (DKK)',spot:'Cooler spot',spotHint:'e.g. "Shelf 2" – empty = sorted by colour',
 confirmed:'Confirmed by us',save:'Save',saveNext:'Save and add next',cancel:'Cancel',delete:'Delete',tapAgain:'Tap again to delete',
 noFlowers:'No flowers here yet',noFlowersHint:'Add the first one with the button below.',noMatch:'No flowers match the search.',
 day:'Day',invoices:'Invoices',have:'Have',need:'Need',order:'Order',price:'Price/stem',estTotal:'Estimate',bundles:'bn',
 noPrice:'no price yet',why:'Why?',reset:'Reset to suggestion',showAll:'Show all flowers',showSuggested:'Show suggested only',
 lowConf:'Low confidence',lowConfText:'Suggestions are based on {n} week(s) of counts. Under 8 weeks they are a rough estimate – adjust them.',
 okConf:'{n} weeks of data',noData:'No counts yet – suggestions start after the first saved weekly count.',
 seasonNote:'Seasonal patterns appear only after a full year of data ({n}/52 weeks).',
 est:'est.',pdf:'A4 PDF',csv:'CSV',totalStems:'Stems',totalCost:'Estimated cost',missingPrice:'without price',
 noRows:'Nothing suggested for this day.',rsNone:'No history yet – set the quantity yourself.',
 rs:'Typical use {typ} stems/week (avg of {n} week{s}) − {left} usable leftovers = {net} stems → {b} × {bunch} = {stems} stems. Split: day 1 {d1}, day 2 {d2} ({src}).',
 rsHist:'from past buying',rsSet:'from settings',
 upload:'Upload invoice',uploadHint:'PDF or photo. Lines are read and matched automatically.',reading:'Reading invoice…',uploading:'Saving original…',
 review:'To review',reviewEmpty:'Everything is matched.',matched:'matched',ignored:'ignored',toReview:'to review',
 original:'Open original',noOriginal:'No original attached',invDate:'Invoice date',assign:'Belongs to',flowersTotal:'Flowers',fees:'Packaging/fees',
 matchLine:'Match line',chooseFlower:'Choose flower',ignore:'Ignore line',newFromLine:'Create new flower',stemsBought:'Stems bought',ppStem:'Price per stem (DKK)',
 lineText:'Line text',addLine:'+ Add line',manualInv:'Purchase without invoice',deleteInv:'Delete invoice',invRead:'{m} matched · {r} to review',
 cantRead:'Could not read lines automatically. Add them by hand.',
 countTitle:'Count week {w}',bunches:'Bunches',loose:'Loose stems',fresh:'Fresh',usable:'Usable',sell:'Sell first',bad:'Not usable',
 wilted:'Wilted',broken:'Broken',botrytis:'Botrytis',overblown:'Overblown',arrival:'Damaged on arrival',cold:'Cold damage',other:'Other',
 reasonReq:'Pick a reason for the discard',split:'+ Split (another condition)',removeEntry:'Remove',
 expected:'Expected',filterStock:'In stock',filterAll:'All',saveCount:'Save count',savedCount:'Saved · carries into week {w}',draft:'Draft – saved as you go',
 missingReasons:'{n} discard(s) missing a reason',countSaved:'Count saved. Leftovers are now opening stock for week {w}.',
 bought:'Bought',used:'Used',left:'Left',waste:'Waste',cps:'Cost/stem',income:'Income excl. VAT',cost:'Cost',open:'Opening',
 notCounted:'This week is not counted yet. Used and waste appear once the count is saved.',byTier:'By tier',byColor:'By colour',byFlower:'By flower',
 nextOrder:'Suggested for next week',toBuying:'Open buying sheets',addSell:'add selling price',
 settings:'Settings',buyDays:'Buying days',weekday:'Weekday',time:'Time',share:'Share of the week’s order on day 1 (when there is no history)',
 language:'Language',templates:'Print templates (A4)',buySheet:'Buying sheet',coolerSheet:'Cooler count sheet',summary:'Weekly summary',
 export:'Export (CSV)',exFlowers:'Flowers',exPurch:'Purchases',exLines:'Invoice lines',exCounts:'Counts',exStats:'Weekly figures',
 demo:'Demo data',demoText:'Week 41 is a demo week (quantities are made up, prices are from Verdel invoice 295427). Remove it when you are ready.',removeDemo:'Remove demo week',demoGone:'Demo data removed.',
 connecting:'Connecting…',offline:'Can’t reach the database. Check the connection and reload.',
 readOnly:'You can view but not save.',saved:'Saved',dlNo:'Download isn’t available here.',dlOk:'File ready',
 aiNo:'Automatic reading isn’t available. Add lines by hand.',days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
 prices:'Prices',pricesTitle:'Selling prices',pricesHint:'Enter the final price per stem including VAT – what the customer pays. Price excl. VAT, pack price, markup and margin are calculated. Base markup: cost × 3 (incl. VAT).',vat:'VAT (moms), %',rounding:'Rounding, DKK',markup:'Markup ×',applyMarkup:'Apply markup',toEmpty:'only where there is no price',toAll:'to everything in the list',applied:'Prices updated: {n}',noCostHint:'no purchase price – enter by hand',allTiers:'All',onlyNoPrice:'Only without price',costStem:'Cost/stem',sellStem:'Selling price/stem incl. VAT',exclVat:'excl. VAT',sellShortCol:'Price/stem',inclVat:'incl. VAT',perBunch:'Bunch',margin:'Margin',priceList:'Price list',plCustomer:'For customers (PDF)',plInternal:'Internal with cost (PDF)',plCsv:'Price list CSV',plShow:'Show in price list',plIncl:'Prices incl. VAT',plExcl:'Prices excl. VAT',plBoth:'Both',plTitle:'Price list',plValid:'Prices valid on {d}. Subject to season and availability.',plNone:'No flowers with a selling price yet.',sellShort:'sell',withPrice:'with price',
 starterNote:'{n} flowers are not confirmed yet (colour, tier and bunch size are guesses). Tap to review.',
 starter:'Starter list',fromInv:'From invoice',reasonsT:'Reasons',none:'—',stockTip:'opening + bought this week'
}};
let LANG='uk'; try{const l=localStorage.getItem('fl_lang');LANG=(l==='en'||l==='uk')?l:'uk'}catch(e){}
const t=(k,v)=>{let s=(T[LANG][k]??T.en[k]??k);if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s};
const loc=()=>LANG==='uk'?'uk-UA':'en-GB';
const gname=g=>GMAP[g]?GMAP[g][LANG]:(g||'');
const cname=c=>CMAP[c]?CMAP[c][LANG]:(c||'');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const swatch=(c,lg)=>{const h=CMAP[c]?.hex||'#ccc';const bg=h==='mix'?'conic-gradient(#DE4F86,#F1CA33,#E6762C,#6B3D93,#6C9350,#DE4F86)':h;return `<span class="sw${lg?' lg':''}" style="background:${bg}" aria-hidden="true"></span>`};
const nf=(n,d=0)=>n==null||isNaN(n)?'—':new Intl.NumberFormat(loc(),{minimumFractionDigits:d,maximumFractionDigits:d}).format(n);
const dkk=(n,d=0)=>n==null||isNaN(n)?'—':new Intl.NumberFormat(loc(),{style:'currency',currency:'DKK',minimumFractionDigits:d,maximumFractionDigits:d}).format(n);
const pct=n=>n==null||isNaN(n)?'—':nf(n*100,1)+' %';

/* ---------- weeks ---------- */
function isoKey(dt){const d=new Date(Date.UTC(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate()));const wd=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-wd);const y=d.getUTCFullYear();const w=Math.ceil(((d-Date.UTC(y,0,1))/864e5+1)/7);return y+'-W'+String(w).padStart(2,'0')}
function monday(key){const [y,w]=key.split('-W').map(Number);const j=new Date(Date.UTC(y,0,4));const wd=j.getUTCDay()||7;const m=new Date(j);m.setUTCDate(j.getUTCDate()-wd+1+(w-1)*7);return m}
function addW(key,n){const m=monday(key);m.setUTCDate(m.getUTCDate()+7*n);return isoKey(m)}
const wnum=k=>Number(k.split('-W')[1]);
function dayDate(wk,wd){const m=monday(wk);m.setUTCDate(m.getUTCDate()+wd-1);return m}
const fdate=(d,o)=>new Intl.DateTimeFormat(loc(),Object.assign({timeZone:'UTC'},o)).format(d);
const today=new Date();const TODAY_WK=isoKey(new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())));
const MIN_WK=addW(TODAY_WK,-16);

/* ---------- state ---------- */
const S={tab:'home',ftab:'list',tier:'luxury',week:TODAY_WK,q:'',fg:'',fc:'',fl:'',onlyUnv:false,bday:1,showAll:false,why:{},cntFilter:'stock',
 flowers:{},settings:null,purch:{},cl:{},cm:{},orders:{},invoices:{},conn:'wait',canWrite:true,auth:'wait',user:null,team:[],loginMode:'in',modal:null,confirm:null,upload:null,ver:0};
let db=null,sampler=null,assets=null,dls=null,sb=null;
const local={};const pend={};const inflight={};
const settings=()=>Object.assign({days:[{wd:2,time:'06:00'},{wd:5,time:'06:00'}],share1:0.5,prices:{vat:25,round:0.5,markup:3,show:'incl'}},S.settings||{},(typeof local!=='undefined'&&local['settings/main'])||{});
try{const h=location.hash.slice(1);if(['home','flowers','invoices','buying','count','insights','more'].includes(h))S.tab=h;if(h==='prices'){S.tab='flowers';S.ftab='prices'}}catch(e){}

/* ---------- toast ---------- */
let toastT;function toast(m){const el=document.getElementById('toast');el.textContent=m;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,3200)}
const errMsg=e=>e?.code==='not_granted'?t('readOnly'):(e?.message||String(e));

/* ---------- db helpers ---------- */
function queueSet(path,data,ms=600){local[path]=data;clearTimeout(pend[path]);pend[path]=setTimeout(()=>flush(path),ms);bump()}
async function flush(path){if(!db){return}if(inflight[path]){await inflight[path].catch(()=>{});}const data=local[path];if(data===undefined)return;
 const p=(data===null?db.doc(path).delete():db.doc(path).set(data));inflight[path]=p;
 try{await p}catch(e){toast(errMsg(e))}finally{delete inflight[path];setTimeout(()=>{if(local[path]===data){delete local[path];bump()}},1500)}}
async function put(path,data){if(!db){toast(t('offline'));return false}try{await db.doc(path).set(data);return true}catch(e){toast(errMsg(e));return false}}
async function upd(path,data){if(!db){toast(t('offline'));return false}try{await db.doc(path).update(data);return true}catch(e){toast(errMsg(e));return false}}
async function del(path){if(!db)return false;try{await db.doc(path).delete();return true}catch(e){toast(errMsg(e));return false}}
function getCL(id){const k='countlines/'+id;return k in local?local[k]:S.cl[id]}
function getOrder(id){const k='orders/'+id;return k in local?local[k]:S.orders[id]}
let raf=0;function bump(){S.ver++;if(!raf)raf=requestAnimationFrame(()=>{raf=0;render()})}

/* ---------- derived data ---------- */
const memo={};function cached(key,fn){const m=memo[key];if(m&&m.v===S.ver)return m.r;const r=fn();memo[key]={v:S.ver,r};return r}
const F=id=>S.flowers[id];
const bunchOf=fid=>Math.max(1,Number(F(fid)?.bunch)||1);
const eStems=(e,fid)=>(Number(e.b)||0)*bunchOf(fid)+(Number(e.l)||0);
function allCL(){const o=Object.assign({},S.cl);for(const k in local)if(k.startsWith('countlines/')){const id=k.slice(11);if(local[k]===null)delete o[id];else o[id]=local[k]}return o}
function weekData(wk){return cached('wd'+wk,()=>{
 const m={};const g=f=>m[f]||(m[f]={open:0,openSell:0,bought:0,b1:0,b2:0,cost:0,costStems:0,left:0,bad:0,usableLeft:0,sellLeft:0,reasons:{},counted:false});
 const prev=addW(wk,-1);const cls=allCL();
 if(S.cm[prev]?.saved)for(const id in cls){const c=cls[id];if(c.wk!==prev)continue;for(const e of c.entries||[]){if(e.c==='bad')continue;const s=eStems(e,c.fid);g(c.fid).open+=s;if(e.c==='sell')g(c.fid).openSell+=s}}
 for(const id in S.purch){const p=S.purch[id];if(p.wk!==wk||!p.fid)continue;const r=g(p.fid);const s=Number(p.stems)||0;r.bought+=s;if(p.day===2)r.b2+=s;else r.b1+=s;if(p.ppStem!=null){r.cost+=s*p.ppStem;r.costStems+=s}}
 const counted=!!S.cm[wk]?.saved;
 for(const id in cls){const c=cls[id];if(c.wk!==wk)continue;const r=g(c.fid);r.counted=true;for(const e of c.entries||[]){const s=eStems(e,c.fid);r.left+=s;if(e.c==='bad'){r.bad+=s;const k=e.r||'other';r.reasons[k]=(r.reasons[k]||0)+s}else{r.usableLeft+=s;if(e.c==='sell')r.sellLeft+=s}}}
 for(const f in m){const r=m[f];r.used=counted?Math.max(0,r.open+r.bought-r.left):null;r.wastePct=counted&&(r.open+r.bought)>0?r.bad/(r.open+r.bought):null;r.cps=r.costStems?r.cost/r.costStems:null;
  const sp=F(f)?.sell;r.income=counted&&sp!=null&&sp!==''?r.used*Number(sp)/(1+(Number(settings().prices?.vat??25))/100):null}
 return {rows:m,counted}})}
function savedWeeksBefore(wk){return Object.keys(S.cm).filter(w=>S.cm[w]?.saved&&w<wk).sort()}
function hist(wk){return cached('h'+wk,()=>{const weeks=[];for(let i=1;i<=12;i++){const w=addW(wk,-i);if(S.cm[w]?.saved)weeks.push(w)}
 const per={};for(const w of weeks){const wd=weekData(w);for(const f in wd.rows){const r=wd.rows[f];if(r.open+r.bought<=0)continue;const h=per[f]||(per[f]={uses:[],d1:0,tot:0});h.uses.push(r.used);h.d1+=r.b1;h.tot+=r.bought}}
 return {weeks,per,dataWeeks:savedWeeksBefore(wk).length}})}
function lastPrice(fid){return cached('lp'+fid,()=>{let best=null;for(const id in S.purch){const p=S.purch[id];if(p.fid!==fid||p.ppStem==null)continue;if(!best||p.wk>best.wk||(p.wk===best.wk&&(p.day||1)>(best.day||1)))best=p}return best?best.ppStem:null})}
function suggest(wk,fid){const h=hist(wk).per[fid];const f=F(fid);const bunch=bunchOf(fid);const wd=weekData(wk).rows[fid]||{open:0,openSell:0};
 const st=settings();if(!h||!h.uses.length)return {none:true,left:wd.open,d1:0,d2:0,b:0,typ:0,bunch};
 const typ=h.uses.reduce((a,b)=>a+b,0)/h.uses.length;const net=Math.max(0,Math.ceil(typ-wd.open));const b=Math.ceil(net/bunch);
 const share=h.tot>0?h.d1/h.tot:st.share1;const d1=Math.round(b*share);const d2=b-d1;
 return {typ,n:h.uses.length,left:wd.open,sellLeft:wd.openSell,net,b,bunch,stems:b*bunch,d1,d2,share,src:h.tot>0?'hist':'set'}}

/* ---------- connect ---------- */
/* ---------- Supabase: auth, data, files, invoice reader ---------- */
const CFG=window.FLOREN_CONFIG;
let subs=[];
function startData(){
 const onErr=e=>{if(e?.code&&e.code!=='unavailable')toast(errMsg(e))};
 subs.forEach(u=>{try{u()}catch(e){}});subs=[];
 subs.push(db.collection('flowers').onSnapshot(q=>{const o={};q.docs.forEach(d=>o[d.id]=d.data());S.flowers=o;S.conn='on';bump()},e=>{S.conn='off';onErr(e);bump()}));
 subs.push(db.doc('settings/main').onSnapshot(d=>{S.settings=d.exists?d.data():null;bump()},onErr));
 subs.push(db.collection('purchases').where('wk','>=',MIN_WK).onSnapshot(q=>{for(const k in S.purch)if(S.purch[k].wk>=MIN_WK)delete S.purch[k];q.docs.forEach(d=>S.purch[d.id]=d.data());bump()},onErr));
 subs.push(db.collection('countlines').where('wk','>=',MIN_WK).onSnapshot(q=>{for(const k in S.cl)if(S.cl[k].wk>=MIN_WK)delete S.cl[k];q.docs.forEach(d=>S.cl[d.id]=d.data());bump()},onErr));
 subs.push(db.collection('countmeta').onSnapshot(q=>{const o={};q.docs.forEach(d=>o[d.id]=d.data());S.cm=o;bump()},onErr));
 subs.push(db.collection('orders').where('wk','>=',addW(TODAY_WK,-4)).onSnapshot(q=>{const o={};q.docs.forEach(d=>o[d.id]=d.data());S.orders=o;bump()},onErr));
 subs.push(db.collection('invoices').orderBy('created','desc').limit(300).onSnapshot(q=>{const o={};q.docs.forEach(d=>o[d.id]=d.data());S.invoices=o;bump()},onErr));
 loadTeam();
}
async function loadTeam(){try{const {data,error}=await sb.from('team').select('email,name').order('email');if(!error){S.team=data||[];bump()}}catch(e){}}
async function afterAuth(session){
 S.user=session?.user||null;
 if(!S.user){S.auth='out';subs.forEach(u=>{try{u()}catch(e){}});subs=[];bump();return}
 S.auth='checking';bump();
 const {data,error}=await sb.rpc('is_member');
 if(error){S.auth='in';S.conn='off';toast(errMsg(error));bump();return}
 if(!data){S.auth='notmember';bump();return}
 S.auth='in';db=window.makeDb(sb);startData();bump()}
async function connect(){
 if(!window.supabase||!CFG){S.conn='off';S.auth='out';bump();return}
 sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseKey,{auth:{persistSession:true,autoRefreshToken:true}});
 assets={async upload(file){const path=`${new Date().toISOString().slice(0,10)}/${Date.now().toString(36)}_${slug(file.name.replace(/\.[^.]+$/,''))}${(file.name.match(/\.[a-z0-9]+$/i)||[''])[0].toLowerCase()}`;
  const {error}=await sb.storage.from(CFG.invoiceBucket).upload(path,file,{contentType:file.type||undefined,upsert:false});if(error)throw error;return {path}}};
 dls={async save({filename,data}){const blob=data instanceof Blob?data:new Blob([data]);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);return {status:'saved'}}};
 sampler={async json(prompt,opts={}){const images=[];for(const b of (opts.images||[]))images.push(await blobToB64(b));
  const {data,error}=await sb.functions.invoke(CFG.readInvoiceFunction,{body:{prompt,images}});
  if(error){let msg=error.message;try{const j=await error.context.json();if(j?.error==='not_configured')msg=t('aiNo');else if(j?.error)msg=j.error}catch(e){}throw new Error(msg)}
  return data.result}};
 sb.auth.onAuthStateChange((ev,session)=>{if(ev==='INITIAL_SESSION'||ev==='SIGNED_IN'||ev==='SIGNED_OUT')afterAuth(session)});
}
function blobToB64(b){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(b)})}
async function openOriginal(id){const inv=S.invoices[id];if(!inv?.asset?.path)return;const w=window.open('','_blank');
 const {data,error}=await sb.storage.from(CFG.invoiceBucket).createSignedUrl(inv.asset.path,600);if(error){if(w)w.close();toast(errMsg(error));return}if(w)w.location=data.signedUrl;else location.href=data.signedUrl}
async function attachOriginal(id,file){if(!file)return;try{const r=await assets.upload(file);await upd('invoices/'+id,{asset:{path:r.path,name:file.name,type:file.type||''},fileName:S.invoices[id]?.fileName||file.name});toast(t('saved'))}catch(e){toast(errMsg(e))}}
/* ---------- login ---------- */
function vLogin(){const up=S.loginMode==='up';
 return `<div class="login"><h1>${t('signInTitle')}</h1><p class="muted">${S.auth==='notmember'?esc(t('notMember',{e:S.user?.email||''})):t('signInHint')}</p>
 ${S.auth==='notmember'?`<button class="btn" data-act="signOut">${t('signOut')}</button>`:`<form id="loginForm" class="stack" novalidate>
 <div class="field"><label for="li_email">${t('email')}</label><input id="li_email" type="email" autocomplete="email" required value="${esc(S.loginEmail||'')}"></div>
 <div class="field"><label for="li_pw">${t('password')}</label><input id="li_pw" type="password" autocomplete="${up?'new-password':'current-password'}" required minlength="6"></div>
 ${S.loginMsg?`<p class="small" style="color:var(--${S.loginErr?'bad':'accent'})">${esc(S.loginMsg)}</p>`:''}
 <button class="btn primary" type="submit" ${S.loginBusy?'disabled':''}>${up?t('signUp'):t('signIn')}</button>
 <button class="btn ghost" type="button" data-act="loginMode">${up?t('haveAcc'):t('noAcc')}</button></form>`}
 <div class="row" style="margin-top:20px;justify-content:center"><button class="lang" data-act="lang">${LANG==='uk'?'English':'Українська'}</button></div></div>`}
async function doLogin(form){const email=form.querySelector('#li_email').value.trim().toLowerCase(),pw=form.querySelector('#li_pw').value;S.loginEmail=email;S.loginBusy=true;S.loginMsg='';S.loginErr=false;render();
 try{if(S.loginMode==='up'){const {data,error}=await sb.auth.signUp({email,password:pw,options:{emailRedirectTo:location.origin}});if(error)throw error;if(!data.session){S.loginMsg=t('checkEmail');S.loginMode='in'}}
  else{const {error}=await sb.auth.signInWithPassword({email,password:pw});if(error){S.loginErr=true;S.loginMsg=/invalid/i.test(error.message)?t('wrongLogin'):error.message}}}
 catch(e){S.loginErr=true;S.loginMsg=e.message||String(e)}finally{S.loginBusy=false;render()}}
const loadedWeeks=new Set();
async function ensureWeek(wk){if(!db||wk>=MIN_WK)return;const need=[wk,addW(wk,-1)].filter(w=>w<MIN_WK&&!loadedWeeks.has(w));for(const w of need){loadedWeeks.add(w);
 try{const[p,c]=await Promise.all([db.collection('purchases').where('wk','==',w).get(),db.collection('countlines').where('wk','==',w).get()]);p.docs.forEach(d=>S.purch[d.id]=d.data());c.docs.forEach(d=>S.cl[d.id]=d.data());bump()}catch(e){}}}

/* ---------- render ---------- */
const ICON={
 flowers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="2.4"/><path d="M12 5.6c0-2 2.6-3 3.6-1.4s-.6 3.4-1.6 3.8M12 5.6c0-2-2.6-3-3.6-1.4s.6 3.4 1.6 3.8M14.3 8.7c1.9.6 2.4 3.3.6 4s-3.2-1.2-3-2.3M9.7 8.7c-1.9.6-2.4 3.3-.6 4s3.2-1.2 3-2.3M12 10.5V21M12 17c-2-2.5-4.5-2.5-6-2 1 2.5 3.5 3 6 2zM12 15.5c2-2 4-2 5.5-1.5-1 2-3 2.5-5.5 1.5z"/></svg>',
 buying:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h10l1 4H6l1-4zM5 7h14l-1.2 13H6.2L5 7z"/><path d="M9 11h6M9 15h6"/></svg>',
 count:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M8 6h2M8 12h2M8 18h2"/></svg>',
 insights:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
 invoices:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7M12 8v-.01"/></svg>',
 prices:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
 more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>'};
function reviewCount(){let n=0;for(const id in S.invoices)for(const l of S.invoices[id].lines||[])if(l.status==='review')n++;return n}
function renderTop(){const m=monday(S.week);const sun=new Date(m);sun.setUTCDate(m.getUTCDate()+6);
 document.getElementById('top').innerHTML=`<div class="brand">Florén<small>${t('sub')}</small></div>
 <div class="weeknav"><button data-act="wk" data-d="-1" aria-label="previous week">‹</button><div class="wk"><b class="${S.week===TODAY_WK?'now':''}">${t('week')} ${wnum(S.week)}</b><span>${fdate(m,{day:'numeric',month:'short'})} – ${fdate(sun,{day:'numeric',month:'short'})}</span></div><button data-act="wk" data-d="1" aria-label="next week">›</button></div>
 <button class="lang" data-act="lang" aria-label="language">${LANG==='uk'?'EN':'UA'}</button><button class="iconbtn ${S.tab==='more'?'on':''}" data-act="tab" data-k="more" aria-label="${esc(t('settingsT'))}" title="${esc(t('settingsT'))}">${ICON.more}</button>`}
function renderDock(){const rc=reviewCount();document.getElementById('dock').innerHTML='<div class="in">'+[['home','home'],['flowers','stock'],['invoices','invoicesTab'],['buying','buying'],['count','count'],['insights','reports']].map(([k,l])=>`<button data-act="tab" data-k="${k}" ${S.tab===k?'aria-current="page"':''}>${ICON[k]}<span>${t(l)}</span>${k==='invoices'&&rc?`<i class="dot">${rc}</i>`:''}</button>`).join('')+'</div>'}
function connNote(){if(S.auth!=='in')return '';if(S.conn==='wait')return `<p class="conn muted">${t('connecting')}</p>`;if(S.conn==='off')return `<div class="note">${t('offline')}</div>`;if(!S.canWrite)return `<div class="note">${t('readOnly')}</div>`;return ''}
function render(){
 const ae=document.activeElement;const fid=ae&&ae.id;let ss=null,se=null;try{ss=ae.selectionStart;se=ae.selectionEnd}catch(e){}
 document.documentElement.lang=LANG==='uk'?'uk':'en';document.title=LANG==='uk'?'Florén Склад квітів':'Florén Flower Stock';
 const v=document.getElementById('view');
 const gate=S.auth!=='in';document.getElementById('top').hidden=gate;document.getElementById('dock').hidden=gate;
 if(gate){v.innerHTML=S.auth==='wait'||S.auth==='checking'?`<p class="conn muted" style="text-align:center;padding-top:30vh">${t('connecting')}</p>`:vLogin();document.getElementById('modal').innerHTML='';
  if(fid){const el=document.getElementById(fid);if(el)el.focus({preventScroll:true})}return}
 renderTop();renderDock();const dov=document.getElementById('dropov');if(dov)dov.textContent=t('dropActive');
 v.innerHTML=connNote()+({flowers:vFlowers,buying:vBuying,count:vCount,insights:vInsights,prices:vPrices,more:vMore,home:vHome,invoices:vInvoicesTab}[S.tab])();
 renderModal();
 if(fid){const el=document.getElementById(fid);if(el&&el!==document.activeElement){el.focus({preventScroll:true});try{if(ss!=null)el.setSelectionRange(ss,se)}catch(e){}}}
}

/* ---------- flowers view ---------- */
function flowerList(){return Object.entries(S.flowers).filter(([,f])=>f.active!==false)}
function stockOf(fid){const r=weekData(S.week).rows[fid];return r?r.open+r.bought:0}
function sortFlowers(arr){return arr.sort((a,b)=>{const A=a[1],B=b[1];return (CMAP[A.color]?.i??99)-(CMAP[B.color]?.i??99)||gname(A.group).localeCompare(gname(B.group),loc())||(A.variety||'').localeCompare(B.variety||'',loc())||(A.length||0)-(B.length||0)})}
function vFlowers(){
 const segFP=`<div class="seg seg-sm" role="group"><button data-act="ftab" data-k="list" aria-pressed="${S.ftab!=='prices'}">${t('listView')}</button><button data-act="ftab" data-k="prices" aria-pressed="${S.ftab==='prices'}">${t('pricesView')}</button></div>`;
 if(S.ftab==='prices')return segFP+vPrices();
 return segFP+vFlowersList()}
function vFlowersList(){
 const all=flowerList();const cnt={luxury:0,regular:0};all.forEach(([,f])=>cnt[f.tier==='luxury'?'luxury':'regular']++);
 const unv=all.filter(([,f])=>!f.verified).length;
 const q=S.q.trim().toLowerCase();
 let list=all.filter(([,f])=>(f.tier==='luxury'?'luxury':'regular')===S.tier);
 const groupsHere=[...new Set(list.map(([,f])=>f.group))].sort((a,b)=>gname(a).localeCompare(gname(b),loc()));
 const lensHere=[...new Set(list.map(([,f])=>f.length).filter(Boolean))].sort((a,b)=>a-b);
 const colsHere=[...new Set(list.map(([,f])=>f.color))].sort((a,b)=>(CMAP[a]?.i??99)-(CMAP[b]?.i??99));
 if(q)list=list.filter(([,f])=>[f.variety,gname(f.group),f.group,f.supplier,cname(f.color),String(f.length||'')].join(' ').toLowerCase().includes(q));
 if(S.fg)list=list.filter(([,f])=>f.group===S.fg);if(S.fc)list=list.filter(([,f])=>f.color===S.fc);if(S.fl)list=list.filter(([,f])=>String(f.length)===S.fl);
 if(S.onlyUnv)list=list.filter(([,f])=>!f.verified);
 sortFlowers(list);
 let h=`<div class="seg" role="group"><button class="lux" data-act="tier" data-k="luxury" aria-pressed="${S.tier==='luxury'}">${t('luxury')} <small>${cnt.luxury}</small></button><button data-act="tier" data-k="regular" aria-pressed="${S.tier==='regular'}">${t('regular')} <small>${cnt.regular}</small></button></div>`;
 if(unv)h+=`<button class="note" style="width:100%;text-align:left" data-act="onlyUnv">${S.onlyUnv?'✓ ':''}${t('starterNote',{n:unv})}</button>`;
 h+=`<input class="search" id="q" type="search" placeholder="${esc(t('search'))}" value="${esc(S.q)}" data-bind="q" autocomplete="off">
 <div class="filters"><select id="fg" data-bind="fg" aria-label="${t('group')}"><option value="">${t('allGroups')}</option>${groupsHere.map(g=>`<option value="${esc(g)}" ${S.fg===g?'selected':''}>${esc(gname(g))}</option>`).join('')}</select>
 <select id="fc" data-bind="fc" aria-label="${t('color')}"><option value="">${t('allColors')}</option>${colsHere.map(c=>`<option value="${c}" ${S.fc===c?'selected':''}>${esc(cname(c))}</option>`).join('')}</select>
 <select id="fl" data-bind="fl" aria-label="${t('length')}"><option value="">${t('allLengths')}</option>${lensHere.map(l=>`<option value="${l}" ${S.fl===String(l)?'selected':''}>${l} cm</option>`).join('')}</select></div>`;
 if(!all.length&&S.conn==='on')return h+`<div class="empty"><h3>${t('noFlowers')}</h3><p>${t('noFlowersHint')}</p></div>`+`<button class="fab" data-act="addFlower">${t('add')}</button>`;
 if(!list.length)h+=`<div class="empty"><p>${S.conn==='on'?t('noMatch'):''}</p></div>`;
 let cur=null,curG=null,buf='';
 const byColor={};list.forEach(e=>(byColor[e[1].color]=byColor[e[1].color]||[]).push(e));
 for(const c of Object.keys(byColor).sort((a,b)=>(CMAP[a]?.i??99)-(CMAP[b]?.i??99))){
  const items=byColor[c];buf+=`<section class="colorsec"><div class="colorhead">${swatch(c,1)}<h3>${esc(cname(c))}</h3><span class="cnt">${items.length}</span></div>`;curG=null;
  for(const [id,f] of items){if(f.group!==curG){curG=f.group;buf+=`<div class="grp">${esc(gname(f.group))}</div>`}
   const st=stockOf(id);
   buf+=`<button class="frow" data-act="editFlower" data-id="${id}"><div><div class="n">${esc(f.variety||gname(f.group))} <span class="len">${f.length?f.length+' cm':''}</span></div>
   <div class="s">${esc(f.supplier||'—')} · ${bunchOf(id)}/${t('bundles')}${sellOf(id)!=null?` · ${t('sellShort')} <b class="num">${dkk(sellOf(id),2)}</b>`:''}${f.verified?'':` <span class="badge b-unv">${t('unverified')}</span>`}${f.demo?` <span class="badge b-demo">demo</span>`:''}</div></div>
   <div class="stock" title="${esc(t('stockTip'))}"><b>${st?nf(st):'·'}</b><span>${st?t('stems'):''}</span></div></button>`}
  buf+='</section>'}
 return h+`<div class="flist">${buf}</div>`+`<button class="fab" data-act="addFlower">${t('add')}</button>`}

/* ---------- flower sheet ---------- */
function openFlower(id,preset){const f=id?Object.assign({},F(id)):Object.assign({tier:S.tier,group:'',variety:'',color:'',length:null,supplier:lastSupplier(),bunch:null,verified:true,sell:null,spot:'',active:true},preset||{});S.modal={type:'flower',id,d:f};S.confirm=null;render()}
function lastSupplier(){const s=suppliers();return s[0]||''}
function suppliers(){const c={};flowerList().forEach(([,f])=>{if(f.supplier)c[f.supplier]=(c[f.supplier]||0)+1});return Object.keys(c).sort((a,b)=>c[b]-c[a])}
function mFlower(){const m=S.modal,d=m.d;
 const usedGroups=[...new Set(flowerList().map(([,f])=>f.group))];const topG=[...new Set([...usedGroups,'rose','tulip','hydrangea','peony','ranunculus','lisianthus'])];
 const groupOpts=GROUPS.map(g=>g[0]);
 const vars=[...new Set(flowerList().filter(([,f])=>f.group===d.group).map(([,f])=>f.variety).filter(Boolean))];
 return `<button class="close" data-act="closeModal" aria-label="close">×</button><h2>${m.id?t('editFlower'):t('addFlower')}</h2>
 <div class="stack">
 <div class="seg" role="group" style="margin:0"><button class="lux" data-act="fset" data-f="tier" data-v="luxury" aria-pressed="${d.tier==='luxury'}">${t('luxury')}</button><button data-act="fset" data-f="tier" data-v="regular" aria-pressed="${d.tier!=='luxury'}">${t('regular')}</button></div>
 <div class="field"><span class="lbl">${t('group')}</span><div class="chips">${topG.slice(0,14).map(g=>`<button class="chip" data-act="fset" data-f="group" data-v="${esc(g)}" aria-pressed="${d.group===g}">${esc(gname(g))}</button>`).join('')}</div>
 <select id="mf_group" data-fbind="group"><option value="">…</option>${groupOpts.map(g=>`<option value="${g}" ${d.group===g?'selected':''}>${esc(gname(g))}</option>`).join('')}${d.group&&!GMAP[d.group]?`<option selected>${esc(d.group)}</option>`:''}</select></div>
 <div class="field"><label for="mf_variety">${t('variety')}</label><input id="mf_variety" type="text" list="dl_var" data-fbind="variety" value="${esc(d.variety)}" autocomplete="off"><datalist id="dl_var">${vars.map(v=>`<option value="${esc(v)}">`).join('')}</datalist></div>
 <div class="field"><span class="lbl">${t('color')}</span><div class="chips">${COLORS.map(c=>`<button class="chip" data-act="fset" data-f="color" data-v="${c[0]}" aria-pressed="${d.color===c[0]}">${swatch(c[0])}${esc(cname(c[0]))}</button>`).join('')}</div></div>
 <div class="field"><span class="lbl">${t('length')}</span><div class="chips">${LENGTHS.map(l=>`<button class="chip num" data-act="fset" data-f="length" data-v="${l}" aria-pressed="${Number(d.length)===l}">${l}</button>`).join('')}<input id="mf_length" type="number" inputmode="numeric" style="width:90px" data-fbind="length" value="${d.length??''}" aria-label="${t('length')}"></div></div>
 <div class="field"><label for="mf_supplier">${t('supplier')}</label><div class="chips">${suppliers().slice(0,6).map(s=>`<button class="chip" data-act="fset" data-f="supplier" data-v="${esc(s)}" aria-pressed="${d.supplier===s}">${esc(s)}</button>`).join('')}</div><input id="mf_supplier" type="text" data-fbind="supplier" value="${esc(d.supplier)}"></div>
 <div class="row" style="align-items:flex-end"><div class="field" style="flex:1"><label for="mf_bunch">${t('bunch')}</label><input id="mf_bunch" type="number" inputmode="numeric" data-fbind="bunch" value="${d.bunch??''}" placeholder="${GMAP[d.group]?.bunch||10}"></div>
 <div class="field" style="flex:1"><label for="mf_sell">${t('sellPrice')}</label><input id="mf_sell" type="number" step="0.01" inputmode="decimal" data-fbind="sell" value="${d.sell??''}"></div></div>
 ${m.id?`<div class="field"><label for="mf_spot">${t('spot')}</label><input id="mf_spot" type="text" data-fbind="spot" value="${esc(d.spot||'')}" placeholder="${esc(t('spotHint'))}"></div>
 <label class="row" style="gap:10px"><input id="mf_ver" type="checkbox" data-fbind="verified" ${d.verified?'checked':''} style="width:24px;height:24px"> <span>${t('confirmed')}${d.src?` <span class="muted small">· ${esc(d.src==='starter'?t('starter'):t('fromInv')+' '+d.src)}</span>`:''}</span></label>
 ${lastPrice(m.id)!=null?`<p class="muted small">${t('price')}: ${dkk(lastPrice(m.id),2)}</p>`:''}`:''}
 </div>
 <div class="foot">${m.id?`<button class="btn danger" data-act="delFlower">${S.confirm==='delf'?t('tapAgain'):t('delete')}</button>`:`<button class="btn" data-act="saveFlower" data-next="1" ${canSaveF(d)?'':'disabled'}>${t('saveNext')}</button>`}<button class="btn primary" data-act="saveFlower" ${canSaveF(d)?'':'disabled'}>${t('save')}</button></div>`}
const canSaveF=d=>!!(d.group&&d.color);
function slug(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/æ/g,'ae').replace(/ø/g,'o').replace(/å/g,'a').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'').slice(0,60)}
async function saveFlower(next){const m=S.modal,d=Object.assign({},m.d);
 d.length=d.length===''||d.length==null?null:Number(d.length);d.bunch=Number(d.bunch)||GMAP[d.group]?.bunch||10;d.sell=d.sell===''||d.sell==null?null:Number(d.sell);d.active=true;
 let id=m.id;if(!id){d.created=Date.now();d.verified=true;d.src=d.src||'manual';id='f_'+slug(`${d.group}_${d.variety}_${d.length||''}`)+'_'+Math.random().toString(36).slice(2,6)}
 const ok=await put('flowers/'+id,d);if(!ok)return;toast(t('saved'));
 if(S.pendingMatch){const pm=S.pendingMatch;S.pendingMatch=null;await matchLine(pm.inv,pm.idx,id,pm.stems,pm.pp);return}
 if(next){S.modal={type:'flower',d:{tier:d.tier,group:d.group,variety:'',color:'',length:d.length,supplier:d.supplier,bunch:null,verified:true,sell:null,spot:'',active:true}};render();setTimeout(()=>document.getElementById('mf_variety')?.focus(),30)}
 else{S.modal=null;render()}}

/* ---------- buying view ---------- */
function dayLabel(n){const st=settings();const d=st.days[n-1]||{wd:n===1?2:5,time:'06:00'};const dt=dayDate(S.week,d.wd);return {top:`${t('day')} ${n} · ${t('days')[d.wd-1]} ${fdate(dt,{day:'numeric',month:'numeric'})}`,time:d.time,date:dt,wd:d.wd}}
function sheetRows(wk,day){return cached(`sr${wk}_${day}_${S.showAll}`,()=>{const ord=getOrder(`${wk}_d${day}`)?.items||{};const out=[];const st=settings();
 for(const [id,f] of flowerList()){const s=suggest(wk,id);const wd=weekData(wk).rows[id]||{open:0,b1:0};const sug=day===1?s.d1:s.d2;const ov=ord[id];
  const order=ov!=null?ov:sug;const share=s.none?st.share1:(day===1?s.share:1-s.share);
  let have,haveEst=false;if(day===1)have=s.left||0;else{have=Math.max(0,Math.round((s.left||0)+(wd.b1||0)-(s.typ||0)*(s.none?st.share1:s.share)));haveEst=true}
  const need=s.none?null:Math.round(s.typ*share);
  if(!S.showAll&&!(order>0||ov!=null||(day===1&&s.left>0)))continue;
  const pp=lastPrice(id);out.push({id,f,s,order,ov:ov!=null,have,haveEst,need,pp,stems:order*s.bunch,cost:pp!=null?order*s.bunch*pp:null})}
 out.sort((a,b)=>(a.f.supplier||'~').localeCompare(b.f.supplier||'~',loc())||(a.f.tier==='luxury'?0:1)-(b.f.tier==='luxury'?0:1)||(CMAP[a.f.color]?.i??99)-(CMAP[b.f.color]?.i??99)||gname(a.f.group).localeCompare(gname(b.f.group),loc())||(a.f.variety||'').localeCompare(b.f.variety||''));
 return out})}
function confBanner(wk){const h=hist(wk);const n=h.dataWeeks;let s='';
 if(!n)s=`<div class="note">${t('noData')}</div>`;else if(n<8)s=`<div class="note"><span class="badge b-low">${t('lowConf')}</span> ${t('lowConfText',{n})}</div>`;else s=`<p class="small"><span class="badge b-ok">${t('okConf',{n})}</span></p>`;
 if(n<52&&n>=1)s+=`<p class="small muted">${t('seasonNote',{n})}</p>`;return s}
function reasonText(r){const s=r.s;if(s.none)return t('rsNone');return t('rs',{typ:nf(s.typ),n:s.n,s:LANG==='uk'?'':(s.n===1?'':'s'),left:nf(s.left),net:nf(s.net),b:s.b,bunch:s.bunch,stems:nf(s.stems),d1:s.d1,d2:s.d2,src:s.src==='hist'?t('rsHist'):t('rsSet')})+(s.sellLeft?` · ${nf(s.sellLeft)} ${t('stems')} ${t('sell').toLowerCase()}`:'')}
function vBuying(){const d1=dayLabel(1),d2=dayLabel(2);const rc=reviewCount();
 let h=`<div class="seg" role="group"><button data-act="bday" data-k="1" aria-pressed="${S.bday===1}">${esc(d1.top)}<small>${esc(d1.time)}</small></button><button data-act="bday" data-k="2" aria-pressed="${S.bday===2}">${esc(d2.top)}<small>${esc(d2.time)}</small></button></div>`;
 if(S.bday===3)S.bday=1;
 const day=S.bday;h+=confBanner(S.week);
 const rows=sheetRows(S.week,day);
 h+=`<div class="row" style="justify-content:space-between"><button class="btn ghost" data-act="showAll">${S.showAll?t('showSuggested'):t('showAll')}</button></div>`;
 if(!rows.length)h+=`<div class="empty"><p>${t('noRows')}</p></div>`;
 let sup=null,tier=null;
 for(const r of rows){const sp=r.f.supplier||'—';if(sp!==sup){sup=sp;tier=null;const n=rows.filter(x=>(x.f.supplier||'—')===sp);h+=`<div class="sup">${esc(sp)}<span>${n.reduce((a,x)=>a+x.stems,0)} ${t('stems')} · ${dkk(n.reduce((a,x)=>a+(x.cost||0),0))}</span></div>`}
  const tr=r.f.tier==='luxury'?'luxury':'regular';if(tr!==tier){tier=tr;h+=`<div class="tierh ${tr==='luxury'?'lux':''}">${t(tr)}</div>`}
  h+=`<div class="brow"><div class="nm">${swatch(r.f.color)}<div><b>${esc(r.f.variety||gname(r.f.group))}</b> <span class="muted">${r.f.length?r.f.length+' cm':''}</span><div class="small muted">${esc(gname(r.f.group))} · ${r.s.bunch}/${t('bundles')}</div></div></div>
  <div class="step ${r.ov?'edited':''}"><button data-act="ord" data-id="${r.id}" data-d="-1" aria-label="minus">−</button><div class="v">${r.order}<small>${t('bundles')}</small></div><button data-act="ord" data-id="${r.id}" data-d="1" aria-label="plus">+</button></div>
  <div class="facts"><span>${t('have')} <b>${nf(r.have)}</b>${r.haveEst?' '+t('est'):''}</span><span>${t('need')} <b>${r.need==null?'—':nf(r.need)}</b></span><span>= <b>${nf(r.stems)}</b> ${t('stems')}</span><span>${r.pp!=null?`<b>${dkk(r.pp,2)}</b> → <b>${dkk(r.cost)}</b>`:t('noPrice')}</span><button class="btn ghost small" style="min-height:0;padding:0" data-act="why" data-id="${r.id}">${t('why')}</button>${r.ov?`<button class="btn ghost small" style="min-height:0;padding:0" data-act="ordReset" data-id="${r.id}">${t('reset')}</button>`:''}</div>
  ${S.why[r.id]?`<div class="why">${esc(reasonText(r))}</div>`:''}</div>`}
 const tot=rows.reduce((a,r)=>a+r.stems,0),cost=rows.reduce((a,r)=>a+(r.cost||0),0),miss=rows.filter(r=>r.order>0&&r.pp==null).length;
 h+=`<div class="totals"><div class="t"><b>${nf(tot)}</b><span>${t('totalStems')}</span></div><div class="t"><b>${dkk(cost)}</b><span>${t('totalCost')}${miss?` · ${miss} ${t('missingPrice')}`:''}</span></div><div class="act"><button class="btn" data-act="pdfBuy" data-day="${day}">${t('pdf')}</button></div></div>`;
 return h}
function setOrder(id,delta){const key=`${S.week}_d${S.bday}`;const cur=Object.assign({},getOrder(key)?.items||{});const r=sheetRows(S.week,S.bday).find(x=>x.id===id);const base=cur[id]!=null?cur[id]:(r?r.order:0);
 cur[id]=Math.max(0,base+delta);queueSet('orders/'+key,{wk:S.week,day:S.bday,items:cur,at:Date.now()})}
function resetOrder(id){const key=`${S.week}_d${S.bday}`;const cur=Object.assign({},getOrder(key)?.items||{});delete cur[id];queueSet('orders/'+key,{wk:S.week,day:S.bday,items:cur,at:Date.now()},50)}

/* ---------- invoices ---------- */
/* ---------- home ---------- */
function nextBuy(){const st=settings();const now=new Date();
 for(const wk of [TODAY_WK,addW(TODAY_WK,1)])for(const day of [1,2]){const d=st.days[day-1];if(!d)continue;const dt=dayDate(wk,d.wd);const [hh,mm]=(d.time||'06:00').split(':').map(Number);
  const local=new Date(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate(),hh||0,mm||0);if(local.getTime()+2*3600e3>=now.getTime())return {wk,day,dt,time:d.time,wd:d.wd}}
 return {wk:addW(TODAY_WK,1),day:1,dt:dayDate(addW(TODAY_WK,1),st.days[0].wd),time:st.days[0].time,wd:st.days[0].wd}}
function dropZone(id){return `<label class="drop ${S.upload?'busy':''}" for="${id}">${ICON.invoices}<b>${t('dropHere')}</b><span>${t('dropOr')}</span><input id="${id}" type="file" accept="application/pdf,image/*" data-act-change="invFile"></label>
 ${S.upload?`<div class="card upl"><b>${esc(S.upload.name)}</b><p class="small muted">${S.upload.stage==='upload'?t('uploading'):t('reading')}</p><div class="progress"><i></i></div></div>`:''}`}
function vHome(){const nb=nextBuy();const rows=sheetRows(nb.wk,nb.day).filter(r=>r.order>0);const cost=rows.reduce((a,r)=>a+(r.cost||0),0);
 const wd=weekData(TODAY_WK);const tot=agg(weekRowsList(TODAY_WK),()=>'a').a;const prev=addW(TODAY_WK,-1);const pw=weekData(prev);const ptot=pw.counted?agg(weekRowsList(prev),()=>'a').a:null;
 const meta=S.cm[TODAY_WK];const counted=Object.values(allCL()).filter(c=>c.wk===TODAY_WK).length;
 const rc=reviewCount();const unv=flowerList().filter(([,f])=>!f.verified).length;const boughtIds=new Set(Object.values(S.purch).map(p=>p.fid));const noPrice=flowerList().filter(([id])=>boughtIds.has(id)&&sellOf(id)==null).length;
 const dname=t('days')[nb.wd-1];
 let h=`<div class="hello"><h1>${t('week')} ${wnum(TODAY_WK)}</h1><p class="muted">${fdate(new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())),{weekday:'long',day:'numeric',month:'long'})}</p></div>
 <div class="homegrid"><div class="hcol">${dropZone('homefile')}</div>
 <div class="hcol">
  <button class="tile" data-act="goBuy" data-wk="${nb.wk}" data-day="${nb.day}"><span class="lbl">${t('nextBuy')}</span><b>${esc(dname)} ${fdate(nb.dt,{day:'numeric',month:'short'})} · ${esc(nb.time)}</b><span class="muted">${rows.length} ${t('positions')} · ≈ ${dkk(cost)}</span><span class="go">${t('openList')} →</span></button>
  <button class="tile" data-act="goCount"><span class="lbl">${t('countCard')}</span><b>${meta?.saved?'✓ '+t('countDoneCard',{w:wnum(addW(TODAY_WK,1))}):counted?t('countDraft',{n:counted}):t('countNone')}</b><span class="go">${counted?t('countContinue'):t('countStart')} →</span></button>
 </div></div>
 <div class="kpis kpis4"><div class="kpi"><span>${t('thisWeek')} · ${t('bought')}</span><b>${nf(tot?.bought||0)}</b><small>${t('stems')} · ${dkk(tot?.cost||0)}</small></div>
 <div class="kpi"><span>${t('cps')}</span><b>${dkk(tot?.cps,2)}</b><small>${t('thisWeek').toLowerCase()}</small></div>
 <div class="kpi"><span>${t('lastWeekWaste',{w:wnum(prev)})}</span><b>${ptot?pct(ptot.wastePct):'—'}</b><small>${ptot?nf(ptot.bad)+' '+t('stems'):t('notCounted').split('.')[0]}</small></div>
 <div class="kpi"><span>${t('invoicesTab')}</span><b>${Object.values(S.invoices).filter(i=>i.wk===TODAY_WK).length}</b><small>${t('thisWeek').toLowerCase()}</small></div></div>
 <h3 class="secth">${t('needsAttention')}</h3><div class="alerts">`;
 const al=[];if(rc)al.push(['invoices',t('linesToReview',{n:rc}),'bad']);if(noPrice)al.push(['prices',t('flowersNoPrice',{n:noPrice}),'warn']);if(unv)al.push(['unv',t('flowersUnv',{n:unv}),'warn']);
 h+=al.length?al.map(([k,txt,c])=>`<button class="alert ${c}" data-act="alert" data-k="${k}"><span>${esc(txt)}</span><span>→</span></button>`).join(''):`<p class="muted">${t('allGood')}</p>`;
 return h+'</div>'}
function vInvoicesTab(){return `<h2 class="secth" style="margin-top:14px">${t('invoicesTab')}</h2>`+dropZone('invfile')+vInvoices()}
/* ---------- import (absorb) ---------- */
const GKEY=[['garden_rose',/\b(gar(den)?|ec gar|david austin)\b/i],['spray_rose',/\b(spray|tros)\b/i],['rose',/^(rosa|ros)\b/i],['tulip',/^tulip/i],['hydrangea',/^hydr/i],['peony',/^(paeon|peon)/i],['ranunculus',/^ranun/i],['lisianthus',/^(eust|lisian)/i],['chrysanthemum',/^chrys/i],['dahlia',/^dahl/i],['lily',/^lil/i],['calla',/^(zant|calla)/i],['alstroemeria',/^alstr/i],['amaryllis',/^(amar|hippe)/i],['anemone',/^anem/i],['anthurium',/^anth/i],['gerbera',/^(gerb|germini)/i],['delphinium',/^delph/i],['gypsophila',/^gyps/i],['eucalyptus',/^euca/i],['ruscus',/^rusc/i],['pistacia',/^pist/i],['sunflower',/^helian/i],['carnation',/^dian/i],['stock',/^matth/i],['snapdragon',/^antirr/i],['freesia',/^frees/i],['scabiosa',/^scab/i],['protea',/^prot/i],['orchid',/^(phal|cymb|orch|vanda)/i],['allium',/^allium/i],['bupleurum',/^bupl/i],['carthamus',/^carth/i],['hypericum',/^hyper/i],['moluccella',/^moluc/i],['ornithogalum',/^ornit/i],['solidago',/^soli/i],['veronica',/^veron/i],['panicum',/^panic/i],['cucurbita',/^cuc/i],['limonium',/^limon/i],['matricaria',/^matric/i]];
const CKEY=[['white',/\b(white|wh|hvid|wit|blanc\w*|avalanche|snow)\b/i],['cream',/\b(cream|creme|ivory|vanil\w*)\b/i],['peach',/\b(peach|apricot|salmon|fersken|coral)\b/i],['lightpink',/\b(light ?pink|lyser\w*|blush|pastel)\b/i],['pink',/\b(pink|rose|roze|rosa|fuchsia)\b/i],['red',/\b(red|rød|rood|rouge)\b/i],['burgundy',/\b(burgundy|bordeaux|wine|dark red)\b/i],['orange',/\b(orange|oranje|mandarin|bronze)\b/i],['yellow',/\b(yellow|gul|geel|gold\w*)\b/i],['lavender',/\b(lavender|lilac|lila|blues)\b/i],['purple',/\b(purple|lilla|paars|violet)\b/i],['blue',/\b(blue|blå|blauw)\b/i],['green',/\b(green|grøn|groen)\b/i],['mixed',/\b(mix|blandet|gemengd|assorted)\b/i]];
function guessFlower(l,sup){const name=(l.name||l.text||'').replace(/[!*]+/g,'').trim();let group='other';for(const [g,re] of GKEY)if(re.test(name)){group=g;break}
 let color='mixed',cg=false;for(const [c,re] of CKEY)if(re.test(name)){color=c;cg=true;break}
 const variety=name.replace(/^(Rosa|Ros|Tulipa|Hydr\.?|Lilium|Chrys|Dahlia|Eust|Alstr|Amar|Anthu|Delph|Gyps|Euca|Helian|Hyper|Soli|Veron|Ornit|Zanted|Germini|Carth|Cuc|Panicum)\s+((Ec|Gr|Du|En|Or|La|Fl|G|San|A|P|T|An|Pa|Cr|Hg|Gar)\s+)*/i,'').replace(/\s+/g,' ').trim()||name;
 const pp=l.ppStem??(l.total&&l.stems?l.total/l.stems:null);
 return {mode:'new',group,variety,color,colorGuessed:cg,tier:pp!=null&&pp>=12?'luxury':'regular',length:l.length??null,bunch:l.spu||GMAP[group]?.bunch||10,supplier:sup||''}}
function importDrafts(inv){const d={};(inv.lines||[]).forEach((l,i)=>{if(l.status!=='review')return;const g=guessFlower(l,inv.supplier);if(l.suggest&&F(l.suggest)&&(l.conf||0)>=.7)g.mode=l.suggest;d[i]=g});return d}
function openImport(id,inv){if(inv&&!S.invoices[id])S.invoices[id]=inv;S.modal={type:'import',id,d:S.invoices[id]?importDrafts(S.invoices[id]):null};render()}
function mImport(){const id=S.modal.id,inv=S.invoices[id];if(!inv)return `<button class="close" data-act="closeModal">×</button><p>${t('readingPdf')}</p>`;if(!S.modal.d)S.modal.d=importDrafts(inv);const ls=inv.lines||[];const d=S.modal.d;
 const m=ls.filter(l=>l.status==='matched'),rv=ls.map((l,i)=>[l,i]).filter(([l])=>l.status==='review'),fe=ls.filter(l=>l.kind==='fee');const n=rv.filter(([,i])=>d[i]&&d[i].mode!=='skip').length;
 let h=`<button class="close" data-act="closeModal" aria-label="close">×</button><h2>${t('importTitle')}</h2>
 <p class="lead"><b>${esc(inv.supplier||'—')}</b> ${inv.no?'· '+esc(inv.no):''} · ${inv.date?fdate(new Date(inv.date+'T00:00:00Z'),{day:'numeric',month:'short'}):''} · ${t('week')} ${wnum(inv.wk)} ${t('day').toLowerCase()} ${inv.day}</p>
 <div class="isum"><div><b class="num">${m.length}</b><span>${t('matchedLines')}</span></div><div><b class="num">${rv.length}</b><span>${t('newCount')}</span></div><div><b class="num">${dkk(inv.flowersTotal,0)}</b><span>${t('flowersTotal')}</span></div></div>`;
 if(rv.length){h+=`<p class="small muted">${t('importNewHint')}</p><div class="newlist">`;
  for(const [l,i] of rv){const g=d[i]||guessFlower(l,inv.supplier);const sug=l.suggest&&F(l.suggest);
   h+=`<div class="nl ${g.mode==='skip'?'skipped':''}"><div class="nlh"><code>${esc(l.text)}</code><select id="im_mode_${i}" data-imp="${i}" data-f="mode"><option value="new" ${g.mode==='new'?'selected':''}>${t('asNew')}</option>${sug?`<option value="${l.suggest}" ${g.mode===l.suggest?'selected':''}>${esc(t('sameAs',{x:(sug.variety||gname(sug.group))+' '+(sug.length||'')}))}</option>`:''}<option value="skip" ${g.mode==='skip'?'selected':''}>${t('skip')}</option></select></div>
   ${g.mode==='new'?`<div class="nlb"><input id="im_var_${i}" type="text" value="${esc(g.variety)}" data-imp="${i}" data-f="variety" aria-label="${t('variety')}">
    <select id="im_grp_${i}" data-imp="${i}" data-f="group" aria-label="${t('group')}">${GROUPS.map(x=>`<option value="${x[0]}" ${g.group===x[0]?'selected':''}>${esc(gname(x[0]))}</option>`).join('')}</select>
    <div class="sws" role="group" aria-label="${t('color')}">${COLORS.map(c=>`<button class="swb ${g.color===c[0]?'on':''}" data-act="impColor" data-i="${i}" data-k="${c[0]}" title="${esc(cname(c[0]))}" aria-label="${esc(cname(c[0]))}" aria-pressed="${g.color===c[0]}">${swatch(c[0])}</button>`).join('')}</div>
    <div class="small muted">${esc(cname(g.color))}${g.colorGuessed?'':' ?'} · ${g.length?g.length+' cm · ':''}${g.bunch}/${t('bundles')} · ${l.stems??'—'} ${t('stems')} · ${l.ppStem!=null?dkk(l.ppStem,2):t('noPrice')} · <button class="linkbtn" data-act="impTier" data-i="${i}">${t(g.tier)}</button></div></div>`:''}</div>`}
  h+='</div>'}
 else h+=`<p class="okmsg">✓ ${t('allMatched')}</p>`;
 if(fe.length)h+=`<p class="small muted">${t('feesLines')}: ${fe.length} · ${dkk(fe.reduce((a,l)=>a+(l.total||0),0))}</p>`;
 return h+`<div class="foot">${rv.length?`<button class="btn" data-act="closeModal">${t('later')}</button><button class="btn primary" data-act="absorb" ${n?'':'disabled'}>${t('absorbN',{n})}</button>`:`<button class="btn" data-act="openInv" data-id="${id}">${t('openInvoice')}</button><button class="btn primary" data-act="closeModal">${t('done')}</button>`}</div>`}
async function absorb(){const id=S.modal.id,inv=S.invoices[id];const d=S.modal.d||{};const lines=(inv.lines||[]).map(l=>Object.assign({},l));let n=0;S.busy=true;render();
 for(let i=0;i<lines.length;i++){const l=lines[i],g=d[i];if(l.status!=='review'||!g||g.mode==='skip')continue;let fid=g.mode==='new'?null:g.mode;
  if(!fid){fid='f_'+slug(`${g.group}_${g.variety}_${g.length||''}`)+'_'+Math.random().toString(36).slice(2,5);
   const ok=await put('flowers/'+fid,{tier:g.tier,group:g.group,variety:g.variety,color:g.color,length:g.length?Number(g.length):null,supplier:g.supplier||inv.supplier||'',bunch:Number(g.bunch)||10,verified:false,sell:null,spot:'',active:true,src:`${inv.supplier||''} ${inv.no||''}`.trim(),alias:l.name?[l.name]:[],created:Date.now()});if(!ok)continue}
  else{const f=F(fid);const al=Array.isArray(f?.alias)?f.alias.slice():[];if(l.name&&!al.includes(l.name)){al.push(l.name);upd('flowers/'+fid,{alias:al})}}
  const stems=l.stems??(l.qty&&l.spu?l.qty*l.spu:null);const pp=l.ppStem??(l.total&&stems?Math.round(l.total/stems*100)/100:null);const pid=`${id}_${i}`;
  Object.assign(l,{fid,status:'matched',pid,stems,ppStem:pp});
  if(stems)await put('purchases/'+pid,{wk:inv.wk,day:inv.day||1,fid,stems,bunches:l.qty||Math.ceil(stems/(Number(g.bunch)||1)),ppStem:pp,total:l.total??null,inv:id,line:i,supplier:inv.supplier||'',demo:!!inv.demo});n++}
 await upd('invoices/'+id,{lines});S.busy=false;S.modal=null;toast(t('absorbed',{n}));render()}
function vInvoices(){
 let h='';
 h+=`<div class="row" style="margin-top:8px"><button class="btn ghost" data-act="manualInv">${t('manualInv')}</button></div>`;
 const rev=[];for(const [id,inv] of Object.entries(S.invoices))(inv.lines||[]).forEach((l,i)=>{if(l.status==='review')rev.push([id,inv,l,i])});
 h+=`<h3 class="secth">${t('review')} <span class="muted small">${rev.length||''}</span></h3>`;
 if(!rev.length)h+=`<p class="muted">${t('reviewEmpty')}</p>`;else h+='<div class="card" style="padding:4px 12px">'+rev.map(([id,inv,l,i])=>`<button class="lline" data-act="openLine" data-inv="${id}" data-i="${i}"><div><b>${esc(l.name||l.text)}</b><div><code>${esc(l.text)}</code></div><div class="small muted">${esc(inv.supplier||'')} ${esc(inv.no||'')}${l.suggest&&F(l.suggest)?` · ≈ ${esc(F(l.suggest).variety||'')}`:''}</div></div><span class="badge b-low">${t('toReview')}</span></button>`).join('')+'</div>';
 h+=`<h3 class="secth">${t('invoices')}</h3>`;
 const invs=Object.entries(S.invoices).sort((a,b)=>(b[1].date||'').localeCompare(a[1].date||'')||(b[1].created||0)-(a[1].created||0));
 if(!invs.length)h+=`<p class="muted">—</p>`;
 for(const [id,inv] of invs){const ls=inv.lines||[];const m=ls.filter(l=>l.status==='matched').length,r=ls.filter(l=>l.status==='review').length;
  h+=`<button class="inv" data-act="openInv" data-id="${id}"><div><h4>${esc(inv.supplier||'—')} ${inv.no?'· '+esc(inv.no):''} ${inv.demo?'<span class="badge b-demo">demo</span>':''}</h4><div class="small muted">${inv.date?fdate(new Date(inv.date+'T00:00:00Z'),{day:'numeric',month:'short',year:'numeric'}):''} · ${t('week')} ${wnum(inv.wk||TODAY_WK)} ${t('day').toLowerCase()} ${inv.day||1}</div><div class="small">${t('invRead',{m,r})}</div></div><div style="text-align:right"><b class="num">${dkk(inv.flowersTotal??ls.reduce((a,l)=>a+(l.kind==='flower'?(l.total||0):0),0))}</b>${r?`<div><span class="badge b-low">${r}</span></div>`:''}</div></button>`}
 return h}
function invTotals(inv){const ls=inv.lines||[];return {fl:ls.filter(l=>l.kind!=='fee').reduce((a,l)=>a+(Number(l.total)||0),0),fee:ls.filter(l=>l.kind==='fee').reduce((a,l)=>a+(Number(l.total)||0),0)}}
function mInvoice(){const id=S.modal.id,inv=S.invoices[id];if(!inv)return `<button class="close" data-act="closeModal">×</button><p>—</p>`;const tt=invTotals(inv);
 const weeks=[];for(let i=-6;i<=2;i++)weeks.push(addW(inv.wk||TODAY_WK,i));
 return `<button class="close" data-act="closeModal" aria-label="close">×</button><h2>${esc(inv.supplier||'—')} ${inv.no?'· '+esc(inv.no):''}</h2>
 <div class="stack"><div class="row small"><span>${t('invDate')}: <b>${inv.date?fdate(new Date(inv.date+'T00:00:00Z'),{day:'numeric',month:'long',year:'numeric'}):'—'}</b></span>
 ${inv.asset?.path?`<button class="btn" data-act="openOrig" data-id="${id}">${t('original')}</button>`:`<label class="btn" for="attach_${id}">${t('attach')}<input id="attach_${id}" type="file" accept="application/pdf,image/*" data-attach="${id}" style="position:absolute;width:1px;height:1px;opacity:0"></label>`}</div>
 <div class="row"><span class="lbl">${t('assign')}</span><select id="inv_wk" data-invbind="wk" style="width:auto">${weeks.map(w=>`<option value="${w}" ${w===inv.wk?'selected':''}>${t('week')} ${wnum(w)}</option>`).join('')}</select>
 <select id="inv_day" data-invbind="day" style="width:auto"><option value="1" ${inv.day!==2?'selected':''}>${t('day')} 1</option><option value="2" ${inv.day===2?'selected':''}>${t('day')} 2</option></select></div>
 <div class="row small"><span>${t('flowersTotal')}: <b class="num">${dkk(tt.fl,2)}</b></span><span>${t('fees')}: <b class="num">${dkk(tt.fee,2)}</b></span></div></div>
 <div style="margin-top:10px">${(inv.lines||[]).map((l,i)=>{const f=l.fid&&F(l.fid);return `<button class="lline" data-act="openLine" data-inv="${id}" data-i="${i}"><div>${f?`<b>${swatch(f.color)} ${esc(f.variety||gname(f.group))} ${f.length?f.length+' cm':''}</b>`:`<b>${esc(l.name||l.text)}</b>`}<div><code>${esc(l.text)}</code></div></div>
 <div style="text-align:right"><div class="num">${l.stems!=null?nf(l.stems)+' '+t('stems'):''}</div><div class="num small">${l.ppStem!=null?dkk(l.ppStem,2):''}</div><span class="badge ${l.status==='matched'?'b-ok':l.status==='review'?'b-low':'b-demo'}">${t(l.status==='matched'?'matched':l.status==='review'?'toReview':'ignored')}</span></div></button>`}).join('')}</div>
 <div class="foot"><button class="btn danger" data-act="delInv">${S.confirm==='deli'?t('tapAgain'):t('deleteInv')}</button><button class="btn" data-act="addLine">${t('addLine')}</button></div>`}
function mLine(){const {inv:id,i}=S.modal;const inv=S.invoices[id];const l=i==null?{text:'',stems:null,ppStem:null}:(inv?.lines||[])[i]||{};const d=S.modal.d;
 const q=(S.modal.q||'').toLowerCase();let list=sortFlowers(flowerList());
 if(q)list=list.filter(([,f])=>[f.variety,gname(f.group),cname(f.color),f.length].join(' ').toLowerCase().includes(q));
 const sug=l.suggest&&F(l.suggest)?[[l.suggest,F(l.suggest)]]:[];
 return `<button class="close" data-act="closeModal" aria-label="close">×</button><h2>${t('matchLine')}</h2>
 <div class="stack">${i==null?`<div class="field"><label for="ml_text">${t('lineText')}</label><input id="ml_text" type="text" data-lbind="text" value="${esc(d.text||'')}"></div>`:`<code class="small" style="font-family:var(--f-num);overflow-wrap:anywhere">${esc(l.text)}</code>`}
 <div class="row"><div class="field" style="flex:1"><label for="ml_stems">${t('stemsBought')}</label><input id="ml_stems" type="number" inputmode="numeric" data-lbind="stems" value="${d.stems??''}"></div>
 <div class="field" style="flex:1"><label for="ml_pp">${t('ppStem')}</label><input id="ml_pp" type="number" step="0.01" inputmode="decimal" data-lbind="pp" value="${d.pp??''}"></div></div>
 <span class="lbl">${t('chooseFlower')}</span><input id="ml_q" type="search" data-lbind="q" value="${esc(S.modal.q||'')}" placeholder="${esc(t('search'))}">
 <div style="max-height:40vh;overflow:auto;border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:0 10px">
 ${[...sug,...list.filter(([fid])=>fid!==l.suggest)].slice(0,80).map(([fid,f])=>`<button class="frow" data-act="pickFlower" data-id="${fid}" ${fid===l.fid?'style="background:var(--accent-soft)"':''}><div><div class="n">${swatch(f.color)} ${esc(f.variety||gname(f.group))} <span class="len">${f.length?f.length+' cm':''}</span></div><div class="s">${esc(gname(f.group))} · ${esc(f.supplier||'—')}${fid===l.suggest?' · ≈':''}</div></div><span class="badge ${f.tier==='luxury'?'b-lux':'b-ok'}">${t(f.tier==='luxury'?'luxury':'regular')}</span></button>`).join('')}</div></div>
 <div class="foot">${i!=null?`<button class="btn" data-act="ignoreLine">${t('ignore')}</button>`:''}<button class="btn" data-act="newFromLine">${t('newFromLine')}</button></div>`}
async function matchLine(invId,idx,fid,stems,pp){const inv=S.invoices[invId];if(!inv)return;const lines=(inv.lines||[]).slice();
 const f=F(fid);stems=stems===''||stems==null||isNaN(stems)?null:Number(stems);pp=pp===''||pp==null||isNaN(pp)?null:Number(pp);
 let l;if(idx==null){l={text:S.modal?.d?.text||(f?(f.variety||gname(f.group)):''),qty:null,unit:'stem',spu:null,kind:'flower',manual:true};idx=lines.length;lines.push(l)}else l=Object.assign({},lines[idx]);
 if(stems==null&&l.qty&&l.unit==='bunch')stems=l.qty*bunchOf(fid);
 if(pp==null&&l.total&&stems)pp=Math.round(l.total/stems*100)/100;
 const pid=`${invId}_${idx}`;Object.assign(l,{fid,status:'matched',pid,stems,ppStem:pp,total:l.total??(stems!=null&&pp!=null?Math.round(stems*pp*100)/100:null),kind:'flower'});lines[idx]=l;
 const ok=await upd('invoices/'+invId,{lines});if(!ok)return;
 if(stems)await put('purchases/'+pid,{wk:inv.wk,day:inv.day||1,fid,stems,bunches:Math.ceil(stems/bunchOf(fid)),ppStem:pp,total:l.total,inv:invId,line:idx,supplier:inv.supplier||'',demo:!!inv.demo});
 const nm=(l.name||'').trim();if(nm&&f){const al=Array.isArray(f.alias)?f.alias.slice():[];if(!al.includes(nm)){al.push(nm);upd('flowers/'+fid,{alias:al})}}
 toast(t('saved'));S.modal={type:'invoice',id:invId};render()}
async function ignoreLine(invId,idx){const inv=S.invoices[invId];const lines=(inv.lines||[]).slice();const l=Object.assign({},lines[idx]);if(l.pid)await del('purchases/'+l.pid);Object.assign(l,{status:'ignored',fid:null,pid:null});lines[idx]=l;await upd('invoices/'+invId,{lines});S.modal={type:'invoice',id:invId};render()}

/* ---- invoice reading ---- */
const CDN={pdf:'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',pdfw:'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
 jspdf:'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',auto:'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'};
const loaded={};function loadScript(u){return loaded[u]||(loaded[u]=new Promise((res,rej)=>{const s=document.createElement('script');s.src=u;s.onload=res;s.onerror=()=>{delete loaded[u];rej(new Error('load '+u))};document.head.appendChild(s)}))}
let pdfjs=null;async function pdfLib(){if(!pdfjs){pdfjs=await import(new URL('vendor/pdfjs/pdf.min.mjs',location.href).href);pdfjs.GlobalWorkerOptions.workerSrc=new URL('vendor/pdfjs/pdf.worker.min.mjs',location.href).href}return pdfjs}
async function pdfLines(file){const lib=await pdfLib();
 const pdf=await lib.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;const out=[];const pages=[];
 for(let p=1;p<=Math.min(pdf.numPages,8);p++){const page=await pdf.getPage(p);pages.push(page);const tc=await page.getTextContent();const rows={};
  const items=tc.items.filter(it=>it.str&&it.str.trim()).map(it=>({x:it.transform[4],y:it.transform[5],w:it.width||0,s:it.str})).sort((a,b)=>b.y-a.y);
  const groups=[];for(const it of items){const g=groups.find(g=>Math.abs(g.y-it.y)<2.6);if(g)g.items.push(it);else groups.push({y:it.y,items:[it]})}
  groups.sort((a,b)=>b.y-a.y).forEach(g=>{const its=g.items.sort((a,b)=>a.x-b.x);let line='',end=null;for(const it of its){if(end!=null)line+=(it.x-end>6?'   ':(it.x-end>1?' ':''));line+=it.s;end=it.x+it.w}out.push(line)})}
 return {lines:out,pages}}
async function pdfImages(pages){const imgs=[];for(const page of pages.slice(0,4)){const vp=page.getViewport({scale:1.6});const c=document.createElement('canvas');c.width=vp.width;c.height=vp.height;await page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;imgs.push(await new Promise(r=>c.toBlob(r,'image/jpeg',.85)))}return imgs}
async function shrink(file){try{const bm=await createImageBitmap(file);const k=Math.min(1,2000/Math.max(bm.width,bm.height));const c=document.createElement('canvas');c.width=Math.round(bm.width*k);c.height=Math.round(bm.height*k);c.getContext('2d').drawImage(bm,0,0,c.width,c.height);return await new Promise(r=>c.toBlob(r,'image/jpeg',.85))}catch(e){return file}}
const pnum=s=>{if(s==null)return null;s=String(s).trim();if(/^\d{1,3}(\.\d{3})*,\d+$/.test(s)||/^\d+,\d+$/.test(s))return Number(s.replace(/\./g,'').replace(',','.'));const n=Number(s.replace(',','.'));return isNaN(n)?null:n};
function parseAuctionStyle(lines){ // Dutch exporter layout: 2x 25 50 Name ... grade length ... price total
 const out=[];for(const raw of lines){const m=raw.match(/^\s*(\d+)\s*x\s+(\d+)\s+(\d+)\s+(.+?)\s{2,}(.*)$/);if(!m)continue;const toks=m[5].trim().split(/\s+/);if(toks.length<2)continue;
  const total=pnum(toks[toks.length-1]),price=pnum(toks[toks.length-2]);if(price==null||total==null)continue;let len=null;
  for(const tk of toks.slice(0,-2)){if(/^\d{2,3}$/.test(tk)&&Number(tk)>=20&&Number(tk)<=150&&len==null)len=Number(tk)}
  out.push({name:m[4].trim(),qty:Number(m[1]),unit:'pack',spu:Number(m[2]),stems:Number(m[3]),length:len,ppStem:price,total,text:raw.trim().replace(/\s{2,}/g,'  '),kind:'flower'})}
 return out}
function parseFees(lines){const out=[];for(const raw of lines){const m=raw.match(/^\s*(\d+)\s*x\s+(\S+)\s+(.*?container.*?|.*?Forlænger.*?|.*?trolley.*?)\s{2,}([\d.,]+)\s+([\d.,]+)\s*$/i);if(m)out.push({name:m[3].trim(),qty:Number(m[1]),unit:'other',text:raw.trim().replace(/\s{2,}/g,'  '),total:pnum(m[5]),kind:'fee',status:'ignored'})}return out}
function headerInfo(lines){const txt=lines.join('\n');const no=(txt.match(/Faktura\s*nummer\s*:?\s*(\S+)/i)||txt.match(/Invoice\s*(?:no|number)\.?\s*:?\s*(\S+)/i)||[])[1]||'';
 const dm=txt.match(/Faktura(?:dato(?:en)?)\s*:?\s*(\d{1,2})[-.\/](\d{1,2})[-.\/](\d{4})/i)||txt.match(/(?:Invoice date|Date)\s*:?\s*(\d{1,2})[-.\/](\d{1,2})[-.\/](\d{4})/i);
 const date=dm?`${dm[3]}-${dm[2].padStart(2,'0')}-${dm[1].padStart(2,'0')}`:'';let supplier='';const first=lines.slice(0,6).join(' ');
 for(const s of suppliers())if(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(txt)){supplier=s;break}
 if(!supplier){const mm=first.match(/([A-ZÆØÅ][\w&.\- ]{2,40}?(?:B\.V\.|BV|ApS|A\/S|GmbH|Ltd))/);if(mm)supplier=mm[1].replace(/\s*(B\.V\.|BV)$/,'').replace(/Bloemenexport/i,'').trim()}
 return {no,date,supplier}}
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function matchFlower(line,supplier){const nm=norm(line.name);let best=null,bs=0;
 for(const [id,f] of flowerList()){const al=(f.alias||[]).map(norm);const lenOk=line.length==null||f.length==null||Number(f.length)===Number(line.length);
  if(al.includes(nm)&&lenOk)return {fid:id,conf:1};
  const toks=norm(f.variety).split(' ').filter(x=>x.length>2);if(!toks.length)continue;const hit=toks.filter(x=>nm.includes(x)).length/toks.length;
  let sc=hit*(lenOk?1:.6)*(supplier&&f.supplier&&norm(f.supplier)!==norm(supplier)?.8:1);if(al.includes(nm))sc=Math.max(sc,.7);if(sc>bs){bs=sc;best=id}}
 return {fid:null,suggest:bs>=.5?best:null,conf:bs}}
function assignDay(date){const st=settings();if(!date)return {wk:S.week,day:1};const d=new Date(date+'T00:00:00Z');const wk=isoKey(d);const wd=d.getUTCDay()||7;
 const days=st.days.map(x=>x.wd);if(wd<=days[0])return {wk,day:1};if(wd<=days[1])return {wk,day:2};return {wk:addW(wk,1),day:1}}
async function aiRead(text,images){if(!sampler)throw new Error(t('aiNo'));
 const flist=flowerList().map(([id,f])=>`${id} | ${gname(f.group)} | ${f.variety||''} | ${f.color} | ${f.length||''}cm | ${f.supplier||''}`).join('\n');
 const prompt=`You read flower wholesale invoices for a florist in Copenhagen. Extract every line. Rules:
- Return JSON only: {"supplier":string,"invoiceNo":string,"invoiceDate":"YYYY-MM-DD"|null,"lines":[{"text":exact line text,"name":product name as printed,"qty":number|null,"unit":"stem"|"bunch"|"pack"|"other","stemsPerUnit":number|null,"stems":number|null,"length":number|null,"pricePerStem":number|null,"lineTotal":number|null,"kind":"flower"|"fee","flowerId":id from list or null}]}
- Packaging, containers, trolleys, freight, fees are kind "fee".
- Never guess or invent a price or quantity: use null when it is not printed. Danish/Dutch numbers use comma decimals.
- Typical Dutch layout: "2x 25 50 Rosa Red Naomi S 60 9,69 484,50" = 2 packs x 25 stems = 50 stems, grade S, length 60 cm, 9,69 per stem, total.
- flowerId only when you are confident it is the same variety and length; else null.
Known flowers (id | group | variety | colour | length | supplier):
${flist}
${text?'\nINVOICE TEXT:\n'+text.slice(0,60000):'\nThe invoice is in the attached image(s).'}`;
 const opts={cache:false,modelTier:'complex'};if(images&&images.length)opts.images=images;
 return await sampler.json(prompt,opts)}
async function handleInvoiceFile(file){if(!file)return;if(!db){toast(t('offline'));return}if(Object.values(S.invoices).some(i=>i.fileName===file.name&&!i.manual)){const ex=Object.entries(S.invoices).find(([,i])=>i.fileName===file.name);toast(t('dupFile'));S.modal={type:'invoice',id:ex[0]};bump();return}
 S.upload={name:file.name,stage:'upload'};bump();let asset=null;
 try{if(assets){const r=await assets.upload(file);asset={path:r.path,name:file.name,type:file.type||''}}}catch(e){toast(errMsg(e))}
 S.upload.stage='read';bump();
 let lines=[],fees=[],hdr={no:'',date:'',supplier:''};const isPdf=/pdf/i.test(file.type)||/\.pdf$/i.test(file.name);
 try{let text='',images=[];
  if(isPdf){const r=await pdfLines(file);hdr=headerInfo(r.lines);lines=parseAuctionStyle(r.lines);fees=parseFees(r.lines);text=r.lines.join('\n');if(!lines.length&&text.replace(/\s/g,'').length<80)images=await pdfImages(r.pages)}
  else images=[await shrink(file)];
  if(!lines.length){const res=await aiRead(text,images);hdr={no:res.invoiceNo||hdr.no,date:res.invoiceDate||hdr.date,supplier:res.supplier||hdr.supplier};
   for(const l of res.lines||[]){const o={name:l.name||l.text,text:l.text||l.name||'',qty:l.qty??null,unit:l.unit||'other',spu:l.stemsPerUnit??null,stems:l.stems??(l.qty&&l.stemsPerUnit?l.qty*l.stemsPerUnit:null),length:l.length??null,ppStem:l.pricePerStem??(l.lineTotal&&l.stems?Math.round(l.lineTotal/l.stems*100)/100:null),total:l.lineTotal??null,kind:l.kind==='fee'?'fee':'flower',ai:l.flowerId&&F(l.flowerId)?l.flowerId:null};
    if(o.kind==='fee'){o.status='ignored';fees.push(o)}else lines.push(o)}}
 }catch(e){toast(e.message||t('cantRead'))}
 const sup=hdr.supplier||'';const out=[];
 for(const l of lines){const m=matchFlower(l,sup);let fid=m.fid||l.ai||null;const sugg=m.suggest||l.ai||null;
  out.push(Object.assign({},l,{fid:fid||null,status:fid?'matched':'review',suggest:fid?null:sugg,conf:m.conf}))}
 out.push(...fees.map(f=>Object.assign({fid:null,status:'ignored'},f)));
 if(hdr.no&&Object.values(S.invoices).some(i=>i.no===hdr.no&&(i.supplier||'')===sup)){S.upload=null;toast(t('dupNo',{no:hdr.no}));bump();return}
 const {wk,day}=assignDay(hdr.date);const id='inv_'+slug((sup||'x')+'_'+(hdr.no||Date.now()))+'_'+Math.random().toString(36).slice(2,5);
 out.forEach((l,i)=>{if(l.status==='matched')l.pid=`${id}_${i}`;delete l.ai});
 const fl=out.filter(l=>l.kind!=='fee').reduce((a,l)=>a+(l.total||0),0),fe=out.filter(l=>l.kind==='fee').reduce((a,l)=>a+(l.total||0),0);
 const inv={supplier:sup,no:hdr.no,date:hdr.date||new Date().toISOString().slice(0,10),wk,day,asset,fileName:file.name,created:Date.now(),lines:out,flowersTotal:Math.round(fl*100)/100,feesTotal:Math.round(fe*100)/100,demo:false};
 const ok=await put('invoices/'+id,inv);
 if(ok)for(const l of out)if(l.status==='matched'&&l.stems)await put('purchases/'+l.pid,{wk,day,fid:l.fid,stems:l.stems,bunches:l.qty||Math.ceil(l.stems/bunchOf(l.fid)),ppStem:l.ppStem??null,total:l.total??null,inv:id,line:out.indexOf(l),supplier:sup,demo:false});
 S.upload=null;if(ok){if(!out.length){toast(t('noLines'));S.modal={type:'invoice',id}}else openImport(id,inv)}bump()}
async function newManualInv(){const id='inv_manual_'+Date.now().toString(36);const ok=await put('invoices/'+id,{supplier:lastSupplier(),no:'',date:new Date().toISOString().slice(0,10),wk:S.week,day:S.bday===2?2:1,asset:null,created:Date.now(),lines:[],flowersTotal:0,feesTotal:0,manual:true,demo:false});if(ok){S.modal={type:'invoice',id};render()}}
async function setInvField(id,field,val){const inv=S.invoices[id];if(!inv)return;const patch={};patch[field]=field==='day'?Number(val):val;await upd('invoices/'+id,patch);
 for(const l of inv.lines||[])if(l.pid)await upd('purchases/'+l.pid,patch)}
async function deleteInvoice(id){const inv=S.invoices[id];if(!inv)return;for(const l of inv.lines||[])if(l.pid)await del('purchases/'+l.pid);await del('invoices/'+id);S.modal=null;render()}

/* ---------- count view ---------- */
function vCount(){const wk=S.week;const wd=weekData(wk);const meta=S.cm[wk];const next=addW(wk,1);const cls=allCL();
 let list=sortFlowers(flowerList());if(S.cntFilter==='stock')list=list.filter(([id])=>{const r=wd.rows[id];return (r&&(r.open+r.bought>0))||cls[`${wk}_${id}`]});
 let h=`<h2 class="secth" style="margin-top:14px">${t('countTitle',{w:wnum(wk)})}</h2>
 <p class="small">${meta?.saved?`<span class="badge b-ok">${t('savedCount',{w:wnum(next)})}</span>`:`<span class="badge b-demo">${t('draft')}</span>`} ${meta?.demo?'<span class="badge b-demo">demo</span>':''}</p>
 <div class="seg" role="group"><button data-act="cntf" data-k="stock" aria-pressed="${S.cntFilter==='stock'}">${t('filterStock')}</button><button data-act="cntf" data-k="all" aria-pressed="${S.cntFilter==='all'}">${t('filterAll')}</button></div>`;
 if(!list.length)return h+`<div class="empty"><p>${S.conn==='on'?t('noMatch'):''}</p></div>`;
 const zones={};const order=[];
 for(const e of list){const f=e[1];const z=f.spot?f.spot:`${t(f.tier==='luxury'?'luxury':'regular')} · ${cname(f.color)}`;const key=(f.spot?'0':'1'+(f.tier==='luxury'?'0':'1')+String(CMAP[f.color]?.i??99).padStart(2,'0'))+z;if(!zones[key]){zones[key]={name:z,items:[]};order.push(key)}zones[key].items.push(e)}
 let missing=0;
 for(const key of order.sort()){const z=zones[key];h+=`<section class="zone"><div class="zonehead">${z.items[0]&&!z.items[0][1].spot?swatch(z.items[0][1].color):''} ${esc(z.name)}<span class="cnt">${z.items.length}</span></div><div class="shelf">`;
  for(const [id,f] of z.items){const cid=`${wk}_${id}`;const c=cls[cid];const entries=c?.entries?.length?c.entries:[{b:0,l:0,c:'fresh'}];const r=wd.rows[id]||{open:0,bought:0};
   const need=c&&entries.some(e=>e.c==='bad'&&eStems(e,id)>0&&!e.r);if(need)missing++;
   h+=`<div class="ccard ${c?'done':''} ${need?'needreason':''}"><div class="hd">${swatch(f.color)}<div><b>${esc(f.variety||gname(f.group))}</b> <span class="muted">${f.length?f.length+' cm':''}</span><div class="small muted">${esc(gname(f.group))} · ${bunchOf(id)}/${t('bundles')}</div></div><div class="exp">${t('expected')}<br><b class="num">${nf(r.open+r.bought)}</b> ${t('stems')}</div></div>`;
   entries.forEach((e,i)=>{h+=`<div class="entry"><div class="cnts">${bigStep(id,i,'b',e.b,t('bunches'))}${bigStep(id,i,'l',e.l,t('loose'))}</div>
    <div class="cond">${CONDS.map(k=>`<button class="${k}" data-act="cond" data-id="${id}" data-i="${i}" data-k="${k}" aria-pressed="${e.c===k}">${t(k)}</button>`).join('')}</div>
    ${e.c==='bad'?`<div class="reasons" role="group" aria-label="${t('reasonsT')}">${REASONS.map(k=>`<button class="chip" data-act="reason" data-id="${id}" data-i="${i}" data-k="${k}" aria-pressed="${e.r===k}">${t(k)}</button>`).join('')}</div>${e.r==='other'?`<input id="rt_${id}_${i}" type="text" placeholder="${t('other')}…" value="${esc(e.rt||'')}" data-rt="${id}" data-i="${i}">`:''}${!e.r?`<p class="small" style="color:var(--bad);margin:0">${t('reasonReq')}</p>`:''}`:''}
    <div class="row small"><span class="muted">= <b class="num">${nf(eStems(e,id))}</b> ${t('stems')}</span>${entries.length>1?`<button class="btn ghost small" style="min-height:0;padding:4px" data-act="rmEntry" data-id="${id}" data-i="${i}">${t('removeEntry')}</button>`:''}</div></div>`});
   h+=`<button class="btn ghost small" style="min-height:36px;padding:4px 0" data-act="split" data-id="${id}">${t('split')}</button></div>`}
  h+='</div></section>'}
 const total=Object.values(cls).filter(c=>c.wk===wk).reduce((a,c)=>a+(c.entries||[]).reduce((s,e)=>s+eStems(e,c.fid),0),0);
 h+=`<div class="savebar"><div><b class="num">${nf(total)}</b> ${t('stems')}${missing?`<div class="small" style="color:var(--bad)">${t('missingReasons',{n:missing})}</div>`:''}</div><button class="btn" data-act="pdfCooler">${t('pdf')}</button><button class="btn primary" data-act="saveCount" ${missing?'disabled':''}>${t('saveCount')}</button></div>`;
 return h}
function bigStep(id,i,fld,v,lab){return `<div class="big"><button data-act="cnt" data-id="${id}" data-i="${i}" data-f="${fld}" data-d="-1" aria-label="minus ${lab}">−</button><div class="mid"><input id="c_${id}_${i}_${fld}" type="number" inputmode="numeric" min="0" value="${Number(v)||0}" data-cnt="${id}" data-i="${i}" data-f="${fld}" aria-label="${lab}"><span>${lab}</span></div><button data-act="cnt" data-id="${id}" data-i="${i}" data-f="${fld}" data-d="1" aria-label="plus ${lab}">+</button></div>`}
function editEntries(id,fn){const wk=S.week;const cid=`${wk}_${id}`;const c=getCL(cid);const entries=(c?.entries?.length?c.entries:[{b:0,l:0,c:'fresh'}]).map(e=>Object.assign({},e));fn(entries);
 queueSet('countlines/'+cid,{wk,fid:id,entries,at:Date.now()})}
async function saveCount(){const wk=S.week;for(const k of Object.keys(pend))if(k.startsWith('countlines/')){clearTimeout(pend[k]);await flush(k)}
 const ok=await put('countmeta/'+wk,{saved:true,at:Date.now()});if(ok)toast(t('countSaved',{w:wnum(addW(wk,1))}))}

/* ---------- insights ---------- */
function agg(rows,keyFn){const o={};for(const [fid,r] of rows){const k=keyFn(fid);const a=o[k]||(o[k]={open:0,bought:0,used:0,left:0,bad:0,cost:0,costStems:0,income:0,hasInc:false});
 a.open+=r.open;a.bought+=r.bought;a.used+=r.used||0;a.left+=r.left;a.bad+=r.bad;a.cost+=r.cost;a.costStems+=r.costStems;if(r.income!=null){a.income+=r.income;a.hasInc=true}}
 for(const k in o){const a=o[k];a.wastePct=(a.open+a.bought)?a.bad/(a.open+a.bought):null;a.cps=a.costStems?a.cost/a.costStems:null}return o}
function statTable(title,obj,labelFn,counted){const keys=Object.keys(obj);if(!keys.length)return '';
 return `<h3 class="secth">${title}</h3><div class="tblwrap"><table><thead><tr><th></th><th>${t('open')}</th><th>${t('bought')}</th><th>${t('used')}</th><th>${t('left')}</th><th>${t('waste')}</th><th>${t('cost')}</th><th>${t('cps')}</th><th>${t('income')}</th></tr></thead><tbody>
 ${keys.map(k=>{const a=obj[k];return `<tr><td>${labelFn(k)}</td><td class="num">${nf(a.open)}</td><td class="num">${nf(a.bought)}</td><td class="num">${counted?nf(a.used):'—'}</td><td class="num">${counted?nf(a.left):'—'}</td><td class="num">${counted?pct(a.wastePct):'—'}${counted&&a.wastePct?`<span class="wastebar" style="width:${Math.min(40,Math.round(a.wastePct*120))}px"></span>`:''}</td><td class="num">${dkk(a.cost)}</td><td class="num">${dkk(a.cps,2)}</td><td class="num">${a.hasInc?dkk(a.income):'—'}</td></tr>`}).join('')}</tbody></table></div>`}
function weekRowsList(wk){const wd=weekData(wk);return Object.entries(wd.rows).filter(([fid,r])=>F(fid)&&(r.open||r.bought||r.left))}
function vInsights(){const wk=S.week;const wd=weekData(wk);const rows=weekRowsList(wk);const tot=agg(rows,()=>'all').all;const counted=wd.counted;
 let h=`<h2 class="secth" style="margin-top:14px">${t('week')} ${wnum(wk)}</h2>`;
 if(!rows.length)return h+`<div class="empty"><p>${S.conn==='on'?'—':''}</p></div>`+nextSugg(wk);
 if(!counted)h+=`<div class="note info">${t('notCounted')}</div>`;
 const sellMissing=rows.some(([fid])=>F(fid).sell==null);
 h+=`<div class="kpis"><div class="kpi"><span>${t('bought')}</span><b>${nf(tot.bought)}</b><small>${dkk(tot.cost)}</small></div><div class="kpi"><span>${t('used')}</span><b>${counted?nf(tot.used):'—'}</b><small>${t('open')} ${nf(tot.open)}</small></div><div class="kpi"><span>${t('left')}</span><b>${counted?nf(tot.left):'—'}</b><small>${counted?nf(tot.left-tot.bad)+' '+t('usable').toLowerCase():''}</small></div>
 <div class="kpi"><span>${t('waste')}</span><b style="color:${counted&&tot.wastePct>.1?'var(--bad)':'inherit'}">${counted?pct(tot.wastePct):'—'}</b><small>${counted?nf(tot.bad)+' '+t('stems'):''}</small></div><div class="kpi"><span>${t('cps')}</span><b>${dkk(tot.cps,2)}</b><small>${t('bought').toLowerCase()}</small></div><div class="kpi"><span>${t('income')}</span><b>${tot.hasInc?dkk(tot.income):'—'}</b><small>${sellMissing?t('addSell'):''}</small></div></div>`;
 h+=statTable(t('byTier'),agg(rows,f=>F(f).tier==='luxury'?'luxury':'regular'),k=>`<span class="badge ${k==='luxury'?'b-lux':'b-ok'}">${t(k)}</span>`,counted);
 const byC=agg(rows,f=>F(f).color);const sortedC=Object.fromEntries(Object.entries(byC).sort((a,b)=>(CMAP[a[0]]?.i??99)-(CMAP[b[0]]?.i??99)));
 h+=statTable(t('byColor'),sortedC,k=>`${swatch(k)} ${esc(cname(k))}`,counted);
 const byF=agg(sortFlowers(rows.map(([fid,r])=>[fid,F(fid),r])).map(([fid])=>[fid,wd.rows[fid]]),f=>f);
 h+=statTable(t('byFlower'),byF,fid=>{const f=F(fid);return `${swatch(f.color)} ${esc(f.variety||gname(f.group))} <span class="muted">${f.length||''}</span>`},counted);
 if(counted){const rs={};rows.forEach(([,r])=>{for(const k in r.reasons)rs[k]=(rs[k]||0)+r.reasons[k]});const ks=Object.keys(rs);if(ks.length)h+=`<div class="card"><h3>${t('reasonsT')}</h3><div class="chips">${ks.sort((a,b)=>rs[b]-rs[a]).map(k=>`<span class="chip">${t(k)} <b class="num">${nf(rs[k])}</b></span>`).join('')}</div></div>`}
 h+=nextSugg(wk);
 h+=`<div class="row" style="margin-top:16px"><button class="btn" data-act="pdfSum">${t('summary')} · ${t('pdf')}</button><button class="btn" data-act="csv" data-k="stats">${t('exStats')} · CSV</button></div>`;
 return h}
function nextSugg(wk){const nx=addW(wk,1);const items=flowerList().map(([id,f])=>[id,f,suggest(nx,id)]).filter(x=>x[2].b>0);
 let h=`<div class="card"><h3>${t('nextOrder')} · ${t('week')} ${wnum(nx)}</h3>${confBanner(nx)}`;
 if(!items.length)h+=`<p class="muted">—</p>`;else h+=`<div class="tblwrap" style="border:0"><table><thead><tr><th></th><th>${t('need')}</th><th>${t('left')}</th><th>${t('day')} 1</th><th>${t('day')} 2</th></tr></thead><tbody>${sortFlowers(items.map(x=>[x[0],x[1],x[2]])).slice(0,40).map(([id,f,s])=>`<tr><td>${swatch(f.color)} ${esc(f.variety||gname(f.group))}</td><td class="num">${nf(s.typ)}</td><td class="num">${nf(s.left)}</td><td class="num">${s.d1} ${t('bundles')}</td><td class="num">${s.d2} ${t('bundles')}</td></tr>`).join('')}</tbody></table></div>`;
 return h+`<button class="btn ghost" data-act="goBuying" data-wk="${nx}">${t('toBuying')} →</button></div>`}

/* ---------- more ---------- */
/* ---------- prices ---------- */
const sellDraft={};const sellT={};
function sellOf(id){if(id in sellDraft){const v=sellDraft[id];return v===''||v==null||isNaN(Number(v))?null:Number(v)}const s=F(id)?.sell;return s==null||s===''?null:Number(s)}
function pset(){return Object.assign({vat:25,round:0.5,markup:3,show:'incl'},settings().prices||{})}
const exVat=v=>v==null?null:v/(1+pset().vat/100);
function roundUp(v){const r=Number(pset().round)||0;return r>0?Math.ceil(v/r-1e-9)*r:Math.round(v*100)/100}
function setSell(id,val){sellDraft[id]=val;clearTimeout(sellT[id]);sellT[id]=setTimeout(async()=>{const v=sellDraft[id];const n=v===''||v==null||isNaN(Number(v))?null:Math.round(Number(v)*100)/100;
 const ok=await upd('flowers/'+id,{sell:n});if(ok)setTimeout(()=>{if(sellDraft[id]===v){delete sellDraft[id];bump()}},1500)},700);bump()}
function priceRows(){const q=(S.pq||'').trim().toLowerCase();let list=sortFlowers(flowerList());
 if(S.ptier)list=list.filter(([,f])=>(f.tier==='luxury'?'luxury':'regular')===S.ptier);
 if(q)list=list.filter(([,f])=>[f.variety,gname(f.group),f.group,f.supplier,cname(f.color),String(f.length||'')].join(' ').toLowerCase().includes(q));
 if(S.pNoPrice)list=list.filter(([id])=>sellOf(id)==null);
 return list.sort((a,b)=>(a[1].tier==='luxury'?0:1)-(b[1].tier==='luxury'?0:1))}
function vPrices(){const ps=pset();const rows=priceRows();const all=flowerList();const priced=all.filter(([id])=>sellOf(id)!=null).length;
 let h=`<h2 class="secth" style="margin-top:14px">${t('pricesTitle')}</h2><p class="small muted" style="max-width:65ch">${t('pricesHint')}</p>
 <div class="card"><div class="pgrid">
  <div class="field"><label for="ps_vat">${t('vat')}</label><input id="ps_vat" type="number" inputmode="decimal" min="0" step="1" value="${ps.vat}" data-pset="vat"></div>
  <div class="field"><label for="ps_round">${t('rounding')}</label><select id="ps_round" data-pset="round">${[0,0.5,1,5,10].map(r=>`<option value="${r}" ${Number(ps.round)===r?'selected':''}>${r?nf(r,r<1?2:0):'0,01'}</option>`).join('')}</select></div>
  <div class="field"><label for="ps_markup">${t('markup')}</label><input id="ps_markup" type="number" inputmode="decimal" min="1" step="0.1" value="${ps.markup}" data-pset="markup"></div>
  <div class="field"><label for="ps_show">${t('plShow')}</label><select id="ps_show" data-pset="show"><option value="both" ${ps.show==='both'?'selected':''}>${t('plBoth')}</option><option value="incl" ${ps.show==='incl'?'selected':''}>${t('plIncl')}</option><option value="excl" ${ps.show==='excl'?'selected':''}>${t('plExcl')}</option></select></div>
 </div>
 <div class="row" style="margin-top:10px"><span class="lbl">${t('applyMarkup')} ×${nf(ps.markup,1)}</span><button class="btn" data-act="applyMk" data-k="empty">${t('toEmpty')}</button><button class="btn" data-act="applyMk" data-k="all">${S.confirm==='mkall'?t('tapAgain').replace(/видалити|delete/i,'ok'):t('toAll')}</button></div></div>
 <div class="card"><h3>${t('priceList')} <span class="muted small">${priced}/${all.length} ${t('withPrice')}</span></h3><div class="row"><button class="btn primary" data-act="plPdf" data-k="customer">${t('plCustomer')}</button><button class="btn" data-act="plPdf" data-k="internal">${t('plInternal')}</button><button class="btn" data-act="csv" data-k="prices">${t('plCsv')}</button></div></div>
 <div class="seg" role="group">${[['',t('allTiers')],['luxury',t('luxury')],['regular',t('regular')]].map(([k,l])=>`<button ${k==='luxury'?'class="lux"':''} data-act="ptier" data-k="${k}" aria-pressed="${(S.ptier||'')===k}">${l}</button>`).join('')}</div>
 <div class="row"><input id="pq" type="search" style="flex:1;min-width:200px" placeholder="${esc(t('search'))}" value="${esc(S.pq||'')}" data-bind="pq"><button class="chip" data-act="pNoPrice" aria-pressed="${!!S.pNoPrice}">${t('onlyNoPrice')}</button></div>
 <div class="tblwrap"><table class="ptable"><thead><tr><th>${t('variety')}</th><th>${t('costStem')}</th><th>${t('sellStem')}</th><th>${t('exclVat')}</th><th>${t('perBunch')} ${t('inclVat')}</th><th>${t('markup')}</th><th>${t('margin')}</th></tr></thead><tbody>`;
 let tier=null,col=null;
 for(const [id,f] of rows){const tr=f.tier==='luxury'?'luxury':'regular';if(tr!==tier){tier=tr;col=null;h+=`<tr class="grp"><td colspan="7"><span class="badge ${tr==='luxury'?'b-lux':'b-ok'}">${t(tr)}</span></td></tr>`}
  if(f.color!==col){col=f.color;h+=`<tr class="sub"><td colspan="7">${swatch(f.color)} ${esc(cname(f.color))}</td></tr>`}
  const cost=lastPrice(id),s=sellOf(id),v=id in sellDraft?sellDraft[id]:(s??'');const mk=cost&&s?s/cost:null,mg=cost&&s?(exVat(s)-cost)/exVat(s):null;
  h+=`<tr><td><b>${esc(f.variety||gname(f.group))}</b> <span class="muted">${f.length?f.length+' cm':''}</span><div class="small muted">${esc(gname(f.group))} · ${bunchOf(id)}/${t('bundles')}</div></td>
  <td class="num">${cost!=null?dkk(cost,2):`<span class="small muted" title="${esc(t('noCostHint'))}">—</span>`}</td>
  <td><input id="sell_${id}" class="sellin" type="number" inputmode="decimal" min="0" step="0.5" value="${esc(v)}" data-sell="${id}" aria-label="${esc(t('sellStem')+' '+(f.variety||''))}" placeholder="${cost!=null?nf(roundUp(cost*ps.markup),2):''}"></td>
  <td class="num muted">${s!=null?dkk(exVat(s),2):'—'}</td><td class="num">${s!=null?dkk(s*bunchOf(id),0):'—'}</td>
  <td class="num">${mk?'×'+nf(mk,1):'—'}</td><td class="num" style="color:${mg!=null&&mg<.4?'var(--warn)':'inherit'}">${mg!=null?pct(mg):'—'}</td></tr>`}
 if(!rows.length)h+=`<tr><td colspan="7" class="muted" style="text-align:center">${t('noMatch')}</td></tr>`;
 return h+'</tbody></table></div>'}
async function applyMarkup(mode){const ps=pset();let n=0;const ops=[];
 for(const [id] of priceRows()){const cost=lastPrice(id);if(cost==null)continue;if(mode==='empty'&&sellOf(id)!=null)continue;const v=roundUp(cost*ps.markup);sellDraft[id]=v;n++;ops.push(upd('flowers/'+id,{sell:v}))}
 bump();await Promise.all(ops);setTimeout(()=>{for(const k in sellDraft)delete sellDraft[k];bump()},1500);toast(t('applied',{n}))}
async function pdfPriceList(kind){try{const ps=pset();const rows=sortFlowers(flowerList()).filter(([id])=>sellOf(id)!=null).sort((a,b)=>(a[1].tier==='luxury'?0:1)-(b[1].tier==='luxury'?0:1));
 if(!rows.length){toast(t('plNone'));return}
 const internal=kind==='internal';const today=new Date();const ds=new Intl.DateTimeFormat(loc(),{day:'numeric',month:'long',year:'numeric'}).format(today);
 const d=await pdfDoc(`Florén · ${t('plTitle')}`,t('plValid',{d:ds})+(ps.show!=='excl'?` · ${t('vat')} ${ps.vat}`:''));
 const cols=[t('variety'),'cm',t('color')];if(internal)cols.push(t('costStem'));
 if(ps.show!=='excl')cols.push(t('sellShortCol')+' '+t('inclVat'));if(ps.show!=='incl')cols.push(t('sellShortCol')+' '+t('exclVat'));
 cols.push(t('perBunch')+' '+(ps.show==='excl'?t('exclVat'):t('inclVat')));if(internal)cols.push(t('markup'),t('margin'));
 const body=[];let tier=null,g=null;
 for(const [id,f] of rows){const tr=f.tier==='luxury'?'luxury':'regular';if(tr!==tier){tier=tr;g=null;body.push(grpRow(t(tr),cols.length,[30,90,66].map(x=>x+150)))}
  if(f.group!==g){g=f.group;body.push(grpRow(gname(f.group),cols.length))}
  const s=sellOf(id),c=lastPrice(id),b=bunchOf(id);const r=[f.variety||gname(f.group),f.length||'',cname(f.color)];if(internal)r.push(c!=null?nf(c,2):'-');
  if(ps.show!=='excl')r.push(nf(s,2));if(ps.show!=='incl')r.push(nf(exVat(s),2));
  r.push(`${nf(ps.show==='excl'?exVat(s)*b:s*b,0)} (${b} ${t('stems')})`);if(internal)r.push(c?'×'+nf(s/c,1):'-',c?pct((exVat(s)-c)/exVat(s)):'-');body.push(r.map(P))}
 const right={};for(let i=3;i<cols.length;i++)right[i]={halign:'right'};
 d.autoTable(Object.assign({},TS,{startY:28,head:[cols.map(P)],body,columnStyles:right}));
 d.setFontSize(8);d.setTextColor(90);d.text(P('DKK · Florén Studio ApS'),14,d.lastAutoTable.finalY+6);
 await savePdf(d,`Floren_${internal?'intern_':''}prisliste_${today.toISOString().slice(0,10)}.pdf`)}catch(e){toast(e.message)}}
function vMore(){const st=settings();const hasDemo=Object.values(S.invoices).some(i=>i.demo)||Object.values(S.cm).some(c=>c.demo);
 let h=`<div class="card"><h3>${t('buyDays')}</h3><div class="stack">${[0,1].map(i=>`<div class="row"><span class="lbl" style="width:50px">${t('day')} ${i+1}</span><select id="sd_${i}" data-sday="${i}" style="flex:1">${t('days').map((d,j)=>`<option value="${j+1}" ${st.days[i]?.wd===j+1?'selected':''}>${d}</option>`).join('')}</select><input id="st_${i}" type="time" data-stime="${i}" value="${esc(st.days[i]?.time||'06:00')}" style="width:140px"></div>`).join('')}
 <div class="field"><label for="s_share">${t('share')}: <b>${Math.round(st.share1*100)} %</b></label><input id="s_share" type="range" min="0" max="100" step="5" value="${Math.round(st.share1*100)}" data-sshare="1"></div></div></div>
 <div class="card"><h3>${t('language')}</h3><div class="seg" style="margin:0"><button data-act="setLang" data-k="uk" aria-pressed="${LANG==='uk'}">Українська</button><button data-act="setLang" data-k="en" aria-pressed="${LANG==='en'}">English</button></div></div>
 <div class="card"><h3>${t('templates')}</h3><p class="small muted">${t('week')} ${wnum(S.week)}</p><div class="stack"><button class="btn" data-act="pdfBuy" data-day="1">${t('buySheet')} · ${t('day')} 1</button><button class="btn" data-act="pdfBuy" data-day="2">${t('buySheet')} · ${t('day')} 2</button><button class="btn" data-act="pdfCooler">${t('coolerSheet')}</button><button class="btn" data-act="pdfSum">${t('summary')}</button></div></div>
 <div class="card"><h3>${t('export')}</h3><div class="chips">${[['flowers','exFlowers'],['purch','exPurch'],['lines','exLines'],['counts','exCounts'],['stats','exStats']].map(([k,l])=>`<button class="btn" data-act="csv" data-k="${k}">${t(l)}</button>`).join('')}</div></div>`;
 const me=(S.user?.email||'').toLowerCase();
 h+=`<div class="card"><h3>${t('team')}</h3><p class="small muted">${t('teamHint')}</p><div class="stack">${(S.team||[]).map(m=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding-block:6px"><span>${esc(m.email)}${m.email===me?` <span class="muted small">(${t('you')})</span>`:''}</span>${m.email!==me?`<button class="btn ghost small" data-act="rmMember" data-e="${esc(m.email)}">${S.confirm==='tm_'+m.email?t('tapAgain'):t('removeMember')}</button>`:''}</div>`).join('')}
 <form id="teamForm" class="row" novalidate><input id="tm_email" type="email" placeholder="${t('email')}" style="flex:1" autocomplete="off"><button class="btn" type="submit">${t('addMember')}</button></form></div></div>
 <div class="card"><p class="small muted">${esc(t('signedInAs',{e:me}))}</p><button class="btn" data-act="signOut">${t('signOut')}</button></div>`;
 if(hasDemo)h+=`<div class="card"><h3>${t('demo')}</h3><p class="small">${t('demoText')}</p><button class="btn danger" data-act="rmDemo">${S.confirm==='demo'?t('tapAgain'):t('removeDemo')}</button></div>`;
 return h}
function saveSettings(patch){const st=Object.assign(settings(),patch);S.settings=st;queueSet('settings/main',st,400)}
async function removeDemo(){const ops=[];for(const [id,p] of Object.entries(S.purch))if(p.demo)ops.push(del('purchases/'+id));for(const [id,i] of Object.entries(S.invoices))if(i.demo)ops.push(del('invoices/'+id));
 for(const [id,c] of Object.entries(S.cl))if(c.demo)ops.push(del('countlines/'+id));for(const [id,c] of Object.entries(S.cm))if(c.demo)ops.push(del('countmeta/'+id));
 for(const [id,o] of Object.entries(S.orders))if(o.demo)ops.push(del('orders/'+id));await Promise.all(ops);toast(t('demoGone'))}

/* ---------- PDF ---------- */
const P=s=>String(s??'').replace(/ /g,' ');
const FONT={};async function fontB64(file){if(FONT[file])return FONT[file];const buf=await (await fetch('fonts/'+file)).arrayBuffer();let s='';const u=new Uint8Array(buf);for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return FONT[file]=btoa(s)}
async function pdfDoc(title,sub){await loadScript(CDN.jspdf);await loadScript(CDN.auto);const {jsPDF}=window.jspdf;const d=new jsPDF({unit:'mm',format:'a4'});
 const [r,b]=await Promise.all([fontB64('DejaVuSansCondensed.ttf'),fontB64('DejaVuSansCondensed-Bold.ttf')]);
 d.addFileToVFS('DejaVu.ttf',r);d.addFont('DejaVu.ttf','DejaVu','normal');d.addFileToVFS('DejaVu-Bold.ttf',b);d.addFont('DejaVu-Bold.ttf','DejaVu','bold');
 d.setFont('DejaVu','bold');d.setFontSize(17);d.text(P(title),14,17);d.setFont('DejaVu','normal');d.setFontSize(9.5);d.setTextColor(90);d.text(P(sub),14,23);d.setTextColor(0);
 d.setFontSize(8);d.text(P('Florén Studio ApS · '+new Date().toLocaleString(loc())),196,10,{align:'right'});return d}
const TS={styles:{font:'DejaVu',fontSize:8.5,cellPadding:1.6,lineColor:[200,206,200],lineWidth:.15},headStyles:{fillColor:[30,90,66],textColor:255,fontStyle:'bold'},theme:'grid',margin:{left:14,right:14}};
const grpRow=(txt,n,fill)=>[{content:P(txt),colSpan:n,styles:{fillColor:fill||[226,233,224],fontStyle:'bold'}}];
async function savePdf(d,name){if(!dls){toast(t('dlNo'));return}try{await dls.save({filename:name,data:d.output('blob')});toast(t('dlOk'))}catch(e){if(e?.code!=='declined')toast(errMsg(e))}}
async function pdfBuy(day){try{const dl=dayLabel(day);const rows=sheetRows(S.week,day).filter(r=>r.order>0||S.showAll);const h=hist(S.week);
 const d=await pdfDoc(`${t('buySheet')} – ${t('day')} ${day}`,`${t('days')[dl.wd-1]} ${fdate(dl.date,{day:'numeric',month:'long',year:'numeric'})} ${dl.time} · ${t('week')} ${wnum(S.week)} · ${h.dataWeeks<8?t('lowConf')+' ('+h.dataWeeks+')':t('okConf',{n:h.dataWeeks})}`);
 const head=[[t('color'),t('variety'),'cm',t('have'),t('need'),t('order')+' ('+t('bundles')+')',t('stems'),t('price'),t('estTotal'),'✓'].map(P)];const body=[];let sup=null,tier=null,sum=0,cost=0;
 for(const r of rows){const sp=r.f.supplier||'—';if(sp!==sup){sup=sp;tier=null;body.push(grpRow(sp,10,[30,90,66].map(x=>x+150)))}const tr=r.f.tier==='luxury'?'luxury':'regular';if(tr!==tier){tier=tr;body.push(grpRow(t(tr),10))}
  sum+=r.stems;cost+=r.cost||0;body.push([cname(r.f.color),(r.f.variety||gname(r.f.group))+' · '+gname(r.f.group),r.f.length||'',nf(r.have)+(r.haveEst?' '+t('est'):''),r.need==null?'-':nf(r.need),r.order,nf(r.stems),r.pp!=null?nf(r.pp,2):'-',r.cost!=null?nf(r.cost):'-',''].map(P))}
 if(!body.length)body.push(grpRow(t('noRows'),10,[255,255,255]));
 d.autoTable(Object.assign({},TS,{startY:28,head,body,columnStyles:{2:{halign:'right'},3:{halign:'right'},4:{halign:'right'},5:{halign:'right',fontStyle:'bold'},6:{halign:'right'},7:{halign:'right'},8:{halign:'right'},9:{cellWidth:8}}}));
 const y=d.lastAutoTable.finalY+7;d.setFontSize(10);d.setFont('DejaVu','bold');d.text(P(`${t('totalStems')}: ${nf(sum)}   ${t('totalCost')}: ${nf(cost)} DKK`),14,y);d.setFont('DejaVu','normal');d.setFontSize(8);d.text(P(`${t('price')} = ${t('pdfPriceNote')}`),14,y+5);
 await savePdf(d,`Floren_indkob_uge${wnum(S.week)}_dag${day}.pdf`)}catch(e){toast(e.message)}}
async function pdfCooler(){try{const wk=S.week;const wd=weekData(wk);const list=sortFlowers(flowerList()).filter(([id])=>{const r=wd.rows[id];return S.cntFilter==='all'||(r&&r.open+r.bought>0)});
 const d=await pdfDoc(t('coolerSheet'),`${t('week')} ${wnum(wk)} · ${t('coolerNote')}`);
 const head=[[t('variety'),'cm','/'+t('bundles'),t('expected'),t('bunches'),t('loose'),t('fresh'),t('usable'),t('sell'),t('bad'),t('reasonCol')].map(P)];const body=[];let z=null;
 for(const [id,f] of list){const zn=f.spot||`${t(f.tier==='luxury'?'luxury':'regular')} · ${cname(f.color)}`;if(zn!==z){z=zn;body.push(grpRow(zn,11))}const r=wd.rows[id]||{open:0,bought:0};body.push([(f.variety||gname(f.group))+' · '+gname(f.group),f.length||'',bunchOf(id),nf(r.open+r.bought),'','','','','','',''].map(P))}
 d.autoTable(Object.assign({},TS,{startY:28,head,body,styles:Object.assign({},TS.styles,{minCellHeight:7.5,valign:'middle'}),columnStyles:{4:{cellWidth:14},5:{cellWidth:14},6:{cellWidth:10},7:{cellWidth:12},8:{cellWidth:12},9:{cellWidth:12},10:{cellWidth:26}}}));
 await savePdf(d,`Floren_optaelling_uge${wnum(wk)}.pdf`)}catch(e){toast(e.message)}}
async function pdfSum(){try{const wk=S.week;const wd=weekData(wk);const rows=weekRowsList(wk);const counted=wd.counted;const tot=agg(rows,()=>'a').a||{open:0,bought:0,used:0,left:0,bad:0,cost:0,cps:null,wastePct:null};
 const d=await pdfDoc(`${t('summary')} – ${t('week')} ${wnum(wk)}`,counted?`${t('bought')} ${nf(tot.bought)} · ${t('used')} ${nf(tot.used)} · ${t('left')} ${nf(tot.left)} · ${t('waste')} ${pct(tot.wastePct)} · ${t('cost')} ${nf(tot.cost)} DKK · ${t('cps')} ${nf(tot.cps,2)}`:t('notCounted'));
 const head=[['',t('open'),t('bought'),t('used'),t('left'),t('waste'),t('cost'),t('cps'),t('income')].map(P)];
 const rowOf=(lab,a)=>[lab,nf(a.open),nf(a.bought),counted?nf(a.used):'-',counted?nf(a.left):'-',counted?pct(a.wastePct):'-',nf(a.cost),nf(a.cps,2),a.hasInc?nf(a.income):'-'].map(P);
 const body=[grpRow(t('byTier'),9)];const bt=agg(rows,f=>F(f).tier==='luxury'?'luxury':'regular');for(const k in bt)body.push(rowOf(t(k),bt[k]));
 body.push(grpRow(t('byColor'),9));const bc=agg(rows,f=>F(f).color);Object.keys(bc).sort((a,b)=>(CMAP[a]?.i??99)-(CMAP[b]?.i??99)).forEach(k=>body.push(rowOf(cname(k),bc[k])));
 body.push(grpRow(t('byFlower'),9));sortFlowers(rows.map(([fid])=>[fid,F(fid)])).forEach(([fid,f])=>body.push(rowOf(`${f.variety||gname(f.group)} ${f.length||''}`,agg([[fid,wd.rows[fid]]],()=>'x').x)));
 d.autoTable(Object.assign({},TS,{startY:28,head,body,columnStyles:Object.fromEntries([1,2,3,4,5,6,7,8].map(i=>[i,{halign:'right'}]))}));
 const nx=addW(wk,1);const items=sortFlowers(flowerList()).map(([id,f])=>[id,f,suggest(nx,id)]).filter(x=>x[2].b>0);const hh=hist(nx);
 d.addPage();d.setFont('DejaVu','bold');d.setFontSize(14);d.text(P(`${t('nextOrder')} – ${t('week')} ${wnum(nx)}`),14,17);d.setFont('DejaVu','normal');d.setFontSize(9);d.text(P(hh.dataWeeks<8?`${t('lowConf')}: ${t('lowConfText',{n:hh.dataWeeks})}`:t('okConf',{n:hh.dataWeeks})),14,23,{maxWidth:180});
 d.autoTable(Object.assign({},TS,{startY:30,head:[[t('variety'),t('need'),t('left'),t('day')+' 1',t('day')+' 2',t('why')].map(P)],body:items.map(([id,f,s])=>[`${f.variety||gname(f.group)} ${f.length||''}`,nf(s.typ),nf(s.left),s.d1+' '+t('bundles'),s.d2+' '+t('bundles'),reasonText({s})].map(P)),columnStyles:{5:{cellWidth:85,fontSize:7}}}));
 await savePdf(d,`Floren_ugeoversigt_uge${wnum(wk)}.pdf`)}catch(e){toast(e.message)}}

/* ---------- CSV ---------- */
const cnum=n=>n==null||n===''||isNaN(n)?'':String(Math.round(Number(n)*100)/100).replace('.',',');
const cq=v=>{const s=String(v??'');return /[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
async function csv(kind){let rows=[],name='';const fl=S.flowers;
 const fcols=id=>{const f=fl[id]||{};return [id,f.tier,gname(f.group),f.variety,cname(f.color),f.length,f.supplier]};
 if(kind==='flowers'){name='blomster';rows=[['id','tier','group','variety','colour','length_cm','supplier','stems_per_bunch','sell_price_dkk','verified','cooler_spot','last_price_dkk']];for(const [id,f] of Object.entries(fl))rows.push([...fcols(id),f.bunch,cnum(f.sell),f.verified?'yes':'no',f.spot||'',cnum(lastPrice(id))])}
 if(kind==='purch'){name='koeb';rows=[['week','day','flower_id','tier','group','variety','colour','length_cm','supplier','stems','packs','price_per_stem_dkk','total_dkk','invoice','demo']];for(const p of Object.values(S.purch))rows.push([p.wk,p.day,...fcols(p.fid),p.stems,p.bunches,cnum(p.ppStem),cnum(p.total),p.inv||'',p.demo?'yes':''])}
 if(kind==='lines'){name='fakturalinjer';rows=[['invoice_id','supplier','invoice_no','invoice_date','week','day','line','status','kind','text','flower_id','variety','stems','price_per_stem_dkk','total_dkk','original_file']];for(const [id,i] of Object.entries(S.invoices))(i.lines||[]).forEach((l,n)=>rows.push([id,i.supplier,i.no,i.date,i.wk,i.day,n,l.status,l.kind,l.text,l.fid||'',l.fid&&fl[l.fid]?fl[l.fid].variety:'',l.stems,cnum(l.ppStem),cnum(l.total),i.fileName||'']))}
 if(kind==='counts'){name='optaellinger';rows=[['week','saved','flower_id','tier','group','variety','colour','length_cm','supplier','bunches','loose','stems','condition','reason']];for(const c of Object.values(allCL()))(c.entries||[]).forEach(e=>rows.push([c.wk,S.cm[c.wk]?.saved?'yes':'no',...fcols(c.fid),e.b||0,e.l||0,eStems(e,c.fid),t(e.c),e.c==='bad'?(e.r==='other'&&e.rt?e.rt:t(e.r||'other')):'']))}
 if(kind==='prices'){name='prisliste';const ps=pset();rows=[['flower_id','tier','group','variety','colour','length_cm','supplier','stems_per_bunch','cost_per_stem_dkk','sell_per_stem_excl_vat_dkk','sell_per_stem_incl_vat_dkk','bunch_incl_vat_dkk','markup','margin_pct']];
  for(const [id] of sortFlowers(flowerList())){const s=sellOf(id),c=lastPrice(id),b=bunchOf(id);rows.push([...fcols(id),b,cnum(c),cnum(exVat(s)),cnum(s),s!=null?cnum(s*b):'',c&&s?cnum(s/c):'',c&&s?cnum((exVat(s)-c)/exVat(s)*100):''])}}
 if(kind==='stats'){name='ugetal';rows=[['week','flower_id','tier','group','variety','colour','length_cm','supplier','opening','bought','used','left','not_usable','waste_pct','cost_dkk','cost_per_stem_dkk','income_dkk']];
  const weeks=[...new Set([...Object.values(S.purch).map(p=>p.wk),...Object.keys(S.cm)])].sort();for(const w of weeks){const wd=weekData(w);for(const [fid,r] of Object.entries(wd.rows))if(fl[fid])rows.push([w,...fcols(fid),r.open,r.bought,r.used??'',wd.counted?r.left:'',wd.counted?r.bad:'',r.wastePct!=null?cnum(r.wastePct*100):'',cnum(r.cost),cnum(r.cps),cnum(r.income)])}}
 const text='﻿'+rows.map(r=>r.map(cq).join(';')).join('\r\n');
 if(!dls){toast(t('dlNo'));return}try{await dls.save({filename:`Floren_${name}_${new Date().toISOString().slice(0,10)}.csv`,data:new Blob([text],{type:'text/csv'})});toast(t('dlOk'))}catch(e){if(e?.code!=='declined')toast(errMsg(e))}}

/* ---------- modal render ---------- */
function renderModal(){const el=document.getElementById('modal');if(!S.modal){el.innerHTML='';return}
 const body=S.modal.type==='flower'?mFlower():S.modal.type==='invoice'?mInvoice():S.modal.type==='import'?mImport():mLine();
 const old=el.querySelector('.sheet');const sc=old?old.scrollTop:0;
 el.innerHTML=`<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${body}</div></div>`;
 const nw=el.querySelector('.sheet');if(nw&&old)nw.scrollTop=sc}

/* ---------- events ---------- */
const A={
 openOrig:e=>openOriginal(e.dataset.id),
 ftab:e=>{S.ftab=e.dataset.k;render()},
 goBuy:e=>{S.week=e.dataset.wk;S.bday=Number(e.dataset.day);S.tab='buying';window.scrollTo(0,0);render()},
 goCount:()=>{S.week=TODAY_WK;S.tab='count';window.scrollTo(0,0);render()},
 alert:e=>{const k=e.dataset.k;if(k==='invoices')S.tab='invoices';else if(k==='prices'){S.tab='flowers';S.ftab='prices';S.pNoPrice=true}else{S.tab='flowers';S.ftab='list';S.onlyUnv=true}window.scrollTo(0,0);render()},
 impColor:e=>{const g=S.modal.d[e.dataset.i];g.color=e.dataset.k;g.colorGuessed=true;render()},
 impTier:e=>{const g=S.modal.d[e.dataset.i];g.tier=g.tier==='luxury'?'regular':'luxury';render()},
 absorb:()=>{if(!S.busy)absorb()},
 ptier:e=>{S.ptier=e.dataset.k;render()},pNoPrice:()=>{S.pNoPrice=!S.pNoPrice;render()},plPdf:e=>pdfPriceList(e.dataset.k),
 applyMk:e=>{if(e.dataset.k==='all'&&S.confirm!=='mkall'){S.confirm='mkall';render();return}S.confirm=null;applyMarkup(e.dataset.k)},
 loginMode:()=>{S.loginMode=S.loginMode==='up'?'in':'up';S.loginMsg='';render()},
 signOut:async()=>{await sb.auth.signOut();S.flowers={};S.purch={};S.cl={};S.cm={};S.orders={};S.invoices={};S.team=[];render()},
 rmMember:async e=>{const em=e.dataset.e;if(S.confirm!=='tm_'+em){S.confirm='tm_'+em;render();return}S.confirm=null;const {error}=await sb.from('team').delete().eq('email',em);if(error)toast(errMsg(error));loadTeam()},
 tab:e=>{S.tab=e.dataset.k;S.modal=null;try{history.replaceState(null,'','#'+S.tab)}catch(x){}window.scrollTo(0,0);render()},
 wk:e=>{S.week=addW(S.week,Number(e.dataset.d));ensureWeek(S.week);render()},
 lang:()=>{LANG=LANG==='uk'?'en':'uk';try{localStorage.setItem('fl_lang',LANG)}catch(x){}render()},
 setLang:e=>{LANG=e.dataset.k;try{localStorage.setItem('fl_lang',LANG)}catch(x){}render()},
 tier:e=>{S.tier=e.dataset.k;S.fg='';S.fl='';S.fc='';render()},
 onlyUnv:()=>{S.onlyUnv=!S.onlyUnv;render()},
 addFlower:()=>openFlower(null),editFlower:e=>openFlower(e.dataset.id),
 closeModal:()=>{S.modal=null;S.pendingMatch=null;render()},
 scrim:(e,ev)=>{if(ev.target===e){S.modal=null;S.pendingMatch=null;render()}},
 fset:e=>{const d=S.modal.d;const f=e.dataset.f;let v=e.dataset.v;if(f==='length')v=Number(v);d[f]=(d[f]===v&&f!=='tier')?(f==='length'?null:''):v;if(f==='group'&&!d.bunch)d.bunch=null;render()},
 saveFlower:e=>saveFlower(!!e.dataset.next),
 delFlower:async()=>{if(S.confirm!=='delf'){S.confirm='delf';render();return}const id=S.modal.id;const used=Object.values(S.purch).some(p=>p.fid===id)||Object.values(S.cl).some(c=>c.fid===id);
  const ok=used?await upd('flowers/'+id,{active:false}):await del('flowers/'+id);if(ok){S.modal=null;S.confirm=null;render()}},
 bday:e=>{S.bday=Number(e.dataset.k);render()},showAll:()=>{S.showAll=!S.showAll;render()},
 why:e=>{S.why[e.dataset.id]=!S.why[e.dataset.id];render()},
 ord:e=>setOrder(e.dataset.id,Number(e.dataset.d)),ordReset:e=>resetOrder(e.dataset.id),
 goBuying:e=>{S.week=e.dataset.wk;S.tab='buying';S.bday=1;window.scrollTo(0,0);render()},
 openInv:e=>{S.modal={type:'invoice',id:e.dataset.id};S.confirm=null;render()},
 openLine:e=>{const inv=S.invoices[e.dataset.inv];const l=inv.lines[Number(e.dataset.i)];S.modal={type:'line',inv:e.dataset.inv,i:Number(e.dataset.i),q:'',d:{stems:l.stems,pp:l.ppStem}};render()},
 addLine:()=>{S.modal={type:'line',inv:S.modal.id,i:null,q:'',d:{text:'',stems:null,pp:null}};render()},
 pickFlower:e=>{const m=S.modal;matchLine(m.inv,m.i,e.dataset.id,m.d.stems,m.d.pp)},
 ignoreLine:()=>ignoreLine(S.modal.inv,S.modal.i),
 newFromLine:()=>{const m=S.modal;const inv=S.invoices[m.inv];const l=m.i!=null?inv.lines[m.i]:{};S.pendingMatch={inv:m.inv,idx:m.i,stems:m.d.stems,pp:m.d.pp};
  const nm=(l.name||m.d.text||'');let g='';for(const x of GROUPS){if(norm(nm).includes(norm(x[2]).split(' ')[0].slice(0,4)))g=x[0]}
  openFlower(null,{variety:nm.replace(/^(Rosa|Ros|Tulipa|Hydr\.?|Lilium|Chrys|Dahlia|Eust G)\s+/i,''),group:g,length:l.length||null,supplier:inv.supplier||'',alias:l.name?[l.name]:[],src:inv.no?inv.supplier+' '+inv.no:'manual'})},
 delInv:()=>{if(S.confirm!=='deli'){S.confirm='deli';render();return}S.confirm=null;deleteInvoice(S.modal.id)},
 manualInv:()=>newManualInv(),
 cntf:e=>{S.cntFilter=e.dataset.k;render()},
 cnt:e=>editEntries(e.dataset.id,en=>{const x=en[Number(e.dataset.i)];x[e.dataset.f]=Math.max(0,(Number(x[e.dataset.f])||0)+Number(e.dataset.d))}),
 cond:e=>editEntries(e.dataset.id,en=>{const x=en[Number(e.dataset.i)];x.c=e.dataset.k;if(x.c!=='bad'){delete x.r;delete x.rt}}),
 reason:e=>editEntries(e.dataset.id,en=>{en[Number(e.dataset.i)].r=e.dataset.k}),
 split:e=>editEntries(e.dataset.id,en=>en.push({b:0,l:0,c:'sell'})),
 rmEntry:e=>editEntries(e.dataset.id,en=>en.splice(Number(e.dataset.i),1)),
 saveCount:()=>saveCount(),
 pdfBuy:e=>pdfBuy(Number(e.dataset.day)),pdfCooler:()=>pdfCooler(),pdfSum:()=>pdfSum(),csv:e=>csv(e.dataset.k),
 rmDemo:()=>{if(S.confirm!=='demo'){S.confirm='demo';render();return}S.confirm=null;removeDemo()}
};
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-act]');if(!el)return;const fn=A[el.dataset.act];if(fn){if(el.dataset.act!=='scrim')ev.preventDefault();fn(el,ev)}});
document.addEventListener('input',ev=>{const el=ev.target;const ds=el.dataset;
 if(ds.bind){S[ds.bind]=el.value;render();return}
 if(ds.fbind&&S.modal?.d){const k=ds.fbind;S.modal.d[k]=el.type==='checkbox'?el.checked:el.value;if(el.tagName==='SELECT'||el.type==='checkbox'||k==='length')render();else{const b=document.querySelectorAll('[data-act="saveFlower"]');b.forEach(x=>x.disabled=!canSaveF(S.modal.d))}return}
 if(ds.lbind&&S.modal){if(ds.lbind==='q'){S.modal.q=el.value;render()}else S.modal.d[ds.lbind]=el.value;return}
 if(ds.cnt){const v=Math.max(0,parseInt(el.value,10)||0);editEntries(ds.cnt,en=>{en[Number(ds.i)][ds.f]=v});return}
 if(ds.rt){const v=el.value;editEntries(ds.rt,en=>{en[Number(ds.i)].rt=v});return}
 if(ds.sell){setSell(ds.sell,el.value);return}
 if(ds.imp!=null&&S.modal?.type==='import'){const g=S.modal.d[ds.imp];g[ds.f]=el.value;if(el.tagName==='SELECT')render();return}
 if(ds.pset&&el.tagName!=='SELECT'){const v=Number(el.value);if(!isNaN(v)&&el.value!==''){saveSettings({prices:Object.assign(pset(),{[ds.pset]:v})})}return}
 if(ds.sshare){saveSettings({share1:Number(el.value)/100});return}
});
document.addEventListener('change',ev=>{const el=ev.target;const ds=el.dataset;
 if(ds.attach){const f=el.files&&el.files[0];el.value='';attachOriginal(ds.attach,f);return}
 if(ds.actChange==='invFile'){const f=el.files&&el.files[0];el.value='';handleInvoiceFile(f);return}
 if(ds.invbind&&S.modal?.id){setInvField(S.modal.id,ds.invbind,el.value);return}
 if(ds.pset&&el.tagName==='SELECT'){saveSettings({prices:Object.assign(pset(),{[ds.pset]:ds.pset==='show'?el.value:Number(el.value)})});return}
 if(ds.sday!=null){const st=settings();const days=st.days.map(x=>Object.assign({},x));days[Number(ds.sday)].wd=Number(el.value);saveSettings({days});return}
 if(ds.stime!=null){const st=settings();const days=st.days.map(x=>Object.assign({},x));days[Number(ds.stime)].time=el.value;saveSettings({days});return}
});
document.addEventListener('submit',async ev=>{const f=ev.target;ev.preventDefault();
 if(f.id==='loginForm')return doLogin(f);
 if(f.id==='teamForm'){const em=f.querySelector('#tm_email').value.trim().toLowerCase();if(!/^\S+@\S+\.\S+$/.test(em))return;const {error}=await sb.from('team').insert({email:em});if(error)toast(errMsg(error));else{toast(t('saved'));loadTeam()}}});
let dragN=0;
document.addEventListener('dragenter',ev=>{if(S.auth!=='in'||!ev.dataTransfer||![...ev.dataTransfer.types].includes('Files'))return;dragN++;document.body.classList.add('dropping')});
document.addEventListener('dragleave',()=>{dragN=Math.max(0,dragN-1);if(!dragN)document.body.classList.remove('dropping')});
document.addEventListener('dragover',ev=>{if(ev.dataTransfer&&[...ev.dataTransfer.types].includes('Files'))ev.preventDefault()});
document.addEventListener('drop',ev=>{if(!ev.dataTransfer?.files?.length)return;ev.preventDefault();dragN=0;document.body.classList.remove('dropping');if(S.auth!=='in')return;const f=[...ev.dataTransfer.files].find(f=>/pdf|image/.test(f.type)||/\.pdf$/i.test(f.name));if(f)handleInvoiceFile(f)});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&S.modal){S.modal=null;render()}});

render();connect();
