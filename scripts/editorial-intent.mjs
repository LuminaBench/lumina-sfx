// Action families describe what is visible at the edit. The ordered picks are
// listening references; material, direction, input device and timing stay searchable.
const profiles = {
  focus: ['Pointer or controller focus changes', 'focus hover navigation highlight', ['settings-focus-felt-tick','menu-focus-tap']],
  scroll: ['One scroll detent or slider notch', 'scroll list slider notch adjustment', ['settings-slider-knurled-index']],
  tab: ['One tab changes', 'tab switch navigation select', ['settings-tab-walnut-detent','settings-subtab-porcelain-tip']],
  press: ['One dry button contact', 'button click tap press select activation', ['mechanical-ui-click','desktop-mouse-press']],
  confirm: ['A change commits', 'confirm positive success apply commit save accept', ['settings-apply-overcentre-latch','menu-confirm-spring-detent']],
  notice: ['A quiet notification arrives', 'notice notification toast message arrival', ['menu-confirm-pluck']],
  back: ['Return to the previous view', 'back return cancel dismiss', ['settings-back-suede-release']],
  toggle: ['A switch changes state', 'toggle switch', ['settings-toggle-engage-brass','settings-toggle-off-cork']],
  slide: ['A panel travels across the frame', 'panel screen swipe slide whoosh transition', ['silk-swipe-right','silk-swipe-left']],
  wipe: ['A page wipes across frame', 'wipe page transition', ['silk-page-wipe','soft-air-page-wipe']],
  cut: ['One short edit accent', 'transition cut whoosh match swipe slide', ['soft-air-match-cut','linen-match-cut']],
  whip: ['A fast picture cut', 'fast whip cut whoosh swipe transition', ['silk-whip-cut','soft-air-whip-cut']],
  reveal: ['A panel or logo comes into view', 'panel reveal entrance logo transition intro', ['silk-panel-reveal','soft-air-panel-reveal']],
  land: ['A title card settles on frame', 'title card land settle hit impact reveal', ['clean-title-reveal-with-soft-hit']],
  rise: ['A title rises into view', 'title card rise riser transition', ['silk-title-rise','linen-title-rise']],
  close: ['A logo or end card signs off', 'logo end card close outro finish sting stinger', ['delicate-logo-close']],
  swell: ['A longer product reveal builds', 'wide product reveal swell build', ['wide-product-reveal-swell']],
  key: ['One key goes down', 'key keyboard single press down', ['gasket-mount-keyboard-key-down','laptop-scissor-keyboard-key-down']],
  typing: ['Several keystrokes type text', 'keyboard type typing word text phrase', ['gasket-mount-keyboard-typed-word','laptop-scissor-keyboard-typed-word']],
};
const curated = new Map();
for (const [action, [, , ids]] of Object.entries(profiles)) {
  for (const [index, id] of ids.entries()) curated.set(id, {action, index});
}

export function editorialAction(id, collection) {
  if (curated.has(id)) return curated.get(id).action;
  if (collection === 'Launch video · Transitions') {
    for (const [suffix, action] of [['match-cut','cut'],['page-wipe','wipe'],['panel-reveal','reveal'],
      ['title-rise','rise'],['whip-cut','whip'],['swipe-left','slide'],['swipe-right','slide']]) {
      if (id.endsWith(suffix)) return action;
    }
  }
  if (collection === 'Launch video · Device clicks' && id.endsWith('-press')) return 'press';
  if (collection === 'Launch video · Keyboards' && id.endsWith('-key-down')) return 'key';
  if (collection === 'Launch video · Keyboards' && id.endsWith('-typed-word')) return 'typing';
}

const medium = new Set('product software app application saas launch trailer teaser video demo film promo screen recording screenrecording interface ui ux menu web website motion graphics edit editorial animation'.split(' '));
const presentation = new Set('clean professional polished premium tasteful minimalist minimal soft warm restrained modern subtle smooth understated gentle quiet crisp cinematic nice elegant simple sleek epic powerful bold punchy'.split(' '));
const onScreen = new Set('ui ux menu interface tab settings cursor keyboard key typing mouse trackpad stylus toggle slider panel logo endcard title typography swipe whoosh transition'.split(' '));
const fiction = new Set('magic magical spell portal warp shield blaster laser synth glitch chime beep jingle electricity electric charged discharge recharge'.split(' '));
const world = new Set('jet plane rocket sword blade knife horse ocean surf thunder lightning rain footsteps footstep gunshot motorcycle helicopter explosion barn'.split(' '));
const vehicle = new Set('truck car caravan tow towing hitch coupling axle diesel tractor farm cargo haul flatbed'.split(' '));

export function editorialBrief(terms) {
  const has = (...words) => words.some(w => terms.includes(w));
  const film = has('trailer','teaser','video','film','promo','demo');
  if (terms.some(w => world.has(w)) || terms.some(w => fiction.has(w)) || (has('energy') && !has('high','energetic'))) return;
  if (film && terms.some(w => vehicle.has(w)) && !terms.some(w => onScreen.has(w))) return;
  const editOnly = has('cut','riser') && terms.every(w => ['fast','hard','short','cut','riser','picture','match','whip'].includes(w) || presentation.has(w));
  if (!editOnly && !film && !terms.some(w => onScreen.has(w)) && !has('brand','branding','app','button')) return;
  const loneMedium = terms.every(w => medium.has(w) || presentation.has(w) || ['high','energy','energetic','movie','launch'].includes(w));
  let action;
  if (has('keyboard','key','typing') || (has('word','text') && has('type'))) {
    if (has('release','up','spacebar','chord','shortcut','double','pair','backspace','hold','command','return'))
      return;
    action = has('typing','text','word','phrase') ? 'typing' : 'key';
  } else if (has('tab')) action = 'tab';
  else if (has('scroll','slider','notch')) action = 'scroll';
  else if (has('toggle')) action = 'toggle';
  else if (has('focus','highlight','navigation') && !has('cut','reveal')) action = 'focus';
  else if (has('confirm','success','apply','commit','save','accept')) action = 'confirm';
  else if (has('notification','toast','notice') && !has('warning','error','alarm')) action = 'notice';
  else if (has('back','return','cancel','dismiss') && !has('swipe','slide','pull')) action = 'back';
  else if (has('click','button','press','tap','select') && !has('double','triple','release','hold')) action = 'press';
  else if ((has('logo','endcard','card') && has('end','endcard','close','outro','finish','sting','stinger')) || (film && has('stinger'))) action = 'close';
  else if ((has('title','card') && has('land','hit','impact','settle','reveal')) || (film && has('hit','impact'))) action = 'land';
  else if ((has('title','typography') && has('rise','riser')) || ((film || editOnly) && has('riser'))) action = 'rise';
  else if (has('swell','build') && has('reveal','product','logo')) action = 'swell';
  else if (has('reveal','entrance') && has('panel','logo','product','app','screen','trailer','video')) action = 'reveal';
  else if (has('wipe')) action = 'wipe';
  else if (has('whip') || (has('fast','energetic','energy') && has('swipe','cut','whoosh','transition') && !has('left','right'))) action = 'whip';
  else if (has('swipe','slide')) action = has('left','right','panel','screen') ? 'slide' : 'cut';
  else if (has('cut','transition','whoosh')) action = 'cut';
  if (!action) return loneMedium ? {terms:[], needsGesture:true} : undefined;
  const qualifiers = terms.filter(t => !medium.has(t) && !presentation.has(t) &&
    !['high','energy','energetic','visual','frame','turn','motion','single','between','into','view','graphic','sci','fi','scifi','futuristic','fantasy'].includes(t));
  return {action, terms:[...new Set([...qualifiers, action])]};
}

export function editorialTerms(action) {
  return [action, ...profiles[action][1].split(' ')];
}

export function editorialPurpose(action) {
  return profiles[action]?.[0];
}

export function listeningOrder(id) {
  return curated.get(id)?.index ?? 100;
}
