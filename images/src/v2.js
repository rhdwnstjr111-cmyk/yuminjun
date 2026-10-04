const { C, a1, child, adult, humanoid, pet, page } = require('./lib');

module.exports = function addV2(pages, h) {
  const { door, table, sofa, dust } = h;
  const pw = 568, ph = 196, gx = 28, x0 = 70, y0 = 196, rowGap = 98;
  const fy = ph - 16;
  const bubble = (x, y, text, { w = null, tail = 'left' } = {}) => {
    const ww = w || text.length * 13.5 + 26;
    const tx = tail === 'left' ? 20 : ww - 32;
    return `<g transform="translate(${x} ${y})"><rect width="${ww}" height="32" rx="12" fill="#fff" stroke="${C.ink}" stroke-width="2"/><path d="M ${tx} 31 l 6 11 l 8 -11" fill="#fff" stroke="${C.ink}" stroke-width="2"/><rect x="${tx - 1}" y="28" width="16" height="5" fill="#fff"/><text x="13" y="21.5" font-size="13.5">${text}</text></g>`;
  };
  const inset = (x, y, text, pose = 'stand') => `<g transform="translate(${x} ${y})"><rect width="196" height="112" rx="14" fill="${C.dark}"/>${adult(38, 108, { dir: 1, scale: 0.26, pose })}<rect x="76" y="30" width="104" height="44" rx="5" fill="#333"/><text x="78" y="20" font-size="10.5" fill="#aaa">회사 · 엄마 글래스</text><g transform="translate(8 82)"><rect width="180" height="22" rx="11" fill="#2b2b2b"/><circle cx="11" cy="11" r="4" fill="${C.orange}"/><text x="21" y="15" font-size="10.5" fill="#fff">${text}</text></g></g>`;
  const cupboard = (x, y) => `<g transform="translate(${x} ${y})"><rect width="96" height="64" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/><line x1="48" y1="0" x2="48" y2="64" stroke="${C.ink}" stroke-width="2"/><circle cx="42" cy="36" r="3" fill="${C.ink}"/><circle cx="54" cy="36" r="3" fill="${C.ink}"/></g>`;
  const floor = `<line x1="0" y1="${fy}" x2="${pw}" y2="${fy}" stroke="${C.soft}" stroke-width="3"/>`;
  const panel = (i, col, row, tag, title, time, scene, caption) => {
    const x = x0 + col * (pw + gx), y = y0 + row * (ph + rowGap);
    return `<g transform="translate(${x} ${y})">
      <rect width="${pw}" height="${ph}" rx="16" fill="${C.card}" stroke="${C.ink}" stroke-width="2.5"/>
      <clipPath id="v${i}"><rect width="${pw}" height="${ph}" rx="16"/></clipPath>
      <g clip-path="url(#v${i})">${floor}${scene}</g>
      <circle cx="24" cy="25" r="14" fill="${C.orange}"/><text x="24" y="30" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">${i}</text>
      <text x="46" y="30" font-size="15" font-weight="700">${title}</text>
      <text x="${pw - 14}" y="30" font-size="12.5" fill="${C.mute}" text-anchor="end">${time}</text>
      <g transform="translate(0 ${ph + 8})"><rect width="${tag.length * 12 + 20}" height="22" rx="11" fill="${C.orangeSoft}"/><text x="10" y="15.5" font-size="12" font-weight="700" fill="${C.orange}">${tag}</text></g>
      <foreignObject x="${tag.length * 12 + 30}" y="${ph + 6}" width="${pw - tag.length * 12 - 30}" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Pretendard,sans-serif;font-size:13.5px;line-height:1.45;color:${C.ink}">${caption}</div></foreignObject>
    </g>`;
  };
  const s = 0.42; // people scale
  pages['09_storyboard_v2'] = page('2030 Key Scenario · Storyboard v2', ['다녀왔습니다에 대답하는 집', '아이는 몽실이에게 말하고 안는다 · A1은 공기와 판단 · 휴머노이드는 손 · 엄마는 집 밖에서만 글래스'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
${panel(1, 0, 0, '엄마 → 아이', '엄마의 아침', '07:50', `
  ${a1(90, fy, { scale: 0.52, tone: 'dark', nest: true, glow: C.green })}
  ${pet(146, fy - 12, { dir: -1, scale: 0.42, mood: 'curious' })}
  ${adult(250, fy, { dir: 1, scale: s, pose: 'pinch', glasses: false })}
  <rect x="320" y="46" width="230" height="124" rx="12" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/>
  <g font-size="12"><text x="334" y="68" font-weight="700" font-size="13">하교 후 루틴 · 15:00</text><text x="334" y="94">간식 · 냉장고 2칸 샌드위치</text><text x="334" y="118">숙제 · 몽실이가 권하기</text><text x="334" y="142">찬장 과자 · 엄마에게 묻기</text></g>
  <circle cx="534" cy="90" r="5" fill="${C.green}"/><circle cx="534" cy="114" r="5" fill="${C.yellow}"/><circle cx="534" cy="138" r="5" fill="${C.orange}"/>`,
  '앱으로 오후를 맡기고 음성을 남긴다. A1 둥지에서 자던 몽실이가 귀를 세운다.')}
${panel(2, 1, 0, '아이 → 엄마', '다녀왔습니다', '15:02', `
  ${door(20, fy, 0.4)}
  ${child(150, fy, { dir: 1, scale: s, band: false })}
  ${pet(230, fy, { dir: -1, scale: 0.55, mood: 'happy' })}
  ${a1(310, fy, { scale: 0.52, tone: 'dark', glow: C.green })}
  ${bubble(110, 44, '나 왔어, 몽실아.')}
  ${inset(360, 40, '지우 귀가 15:02 · 간식 완료')}`,
  '몽실이가 현관으로 굴러와 귀를 세우고 몸을 흔든다. 엄마 글래스엔 작은 칩 하나.')}
${panel(3, 2, 0, '엄마 → 아이', '손부터 씻고 먹자', '15:05', `
  ${sofa(16, fy, 0.5)}
  ${child(80, fy, { dir: 1, scale: s, pose: 'sit', band: false })}
  ${pet(170, fy, { dir: -1, scale: 0.5, mood: 'curious' })}
  ${humanoid(330, fy, { dir: -1, scale: 0.42, pose: 'work', glow: C.green })}
  ${bubble(380, 50, '손부터 씻고 먹자.', { tail: 'left' })}
  ${bubble(30, 70, '어, 샌드위치다.')}`,
  '휴머노이드가 샌드위치와 물을 가져온다. 몽실이는 화장실 쪽으로 고개를 돌린다.')}
${panel(4, 0, 1, '집 → 아이', '쟤 갑자기 왜 저래?', '15:40', `
  ${sofa(16, fy, 0.5)}
  ${child(80, fy, { dir: 1, scale: s, pose: 'sit', band: false })}
  ${pet(185, fy, { dir: 1, scale: 0.5, mood: 'happy' })}
  ${dust(400, 120)}
  ${a1(500, fy, { scale: 0.52, tone: 'dark', glow: C.orange })}
  ${bubble(250, 44, '먼지가 많아져서 청소 중이에요', { tail: 'right' })}`,
  '쿠션 요새 놀이 중 A1이 <b>멀리서</b> 바람을 키운다. 아이가 물을 때만 답하고, 불빛은 주황 → 초록.')}
${panel(5, 1, 1, '펫 → 아이', '숙제 할까?', '16:30', `
  ${child(100, fy, { dir: 1, scale: s, band: false })}
  ${pet(250, fy, { dir: -1, scale: 0.5, mood: 'wait' })}
  <path d="M 290 ${fy - 20} q 40 -10 80 0" fill="none" stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="5 6"/>
  ${table(380, fy, 160, 80, 1)}
  ${bubble(60, 44, '10분만 더…')}`,
  '장난감을 내려놓자 몽실이가 식탁 쪽으로 몇 걸음 가서 <b>돌아본다</b>. 귀 한쪽만 올라가 있다. 10분 뒤 한 번만 더.')}
${panel(6, 2, 1, '아이 → 엄마', '엄마한테 물어볼게', '17:00', `
  ${cupboard(196, 46)}
  ${child(60, fy, { dir: 1, scale: s, pose: 'point', band: false })}
  ${pet(130, fy, { dir: 1, scale: 0.46, mood: 'wait' })}
  ${humanoid(230, fy, { dir: 1, scale: 0.42, pose: 'point', glow: C.yellow })}
  ${inset(360, 70, '찬장 과자를 원해요', 'pinch')}`,
  '“몽실아, 저거 꺼내 달라고 해줘.” 몽실이가 손끝을 따라 보고 귀를 내린다. 엄마는 회의 중 손가락으로 거절.')}
${panel(7, 0, 2, '엄마 → 아이', '엄마의 토닥', '17:20', `
  ${table(170, fy, 150, 76, 1)}
  ${child(90, fy, { dir: 1, scale: s, pose: 'squeeze', band: false })}
  ${pet(104, fy - 46, { dir: 1, scale: 0.32, mood: 'sleep', warm: true })}
  ${inset(350, 44, '지우가 엄마를 찾아요', 'tap')}`,
  '몽실이를 꼭 안으면 엄마에게 닿고, 엄마가 손목을 톡톡 → 몽실이가 <b>따뜻해지며 두 번 숨 쉰다</b>. 엄마 목소리도.')}
${panel(8, 1, 2, '아빠 → 아이', '이거 같이 만들자', '18:30', `
  ${table(130, fy, 190, 76, 1)}
  ${adult(110, fy, { dir: 1, scale: 0.4, pose: 'sit', glasses: false })}
  ${child(310, fy, { dir: -1, scale: 0.4, pose: 'sit', band: false })}
  ${pet(220, fy - 76, { dir: 1, scale: 0.36, mood: 'happy' })}
  ${a1(500, fy, { scale: 0.48, tone: 'dark', glow: C.soft })}
  ${bubble(330, 40, 'A1, 조금만 조용히 해줄래?', { tail: 'right' })}`,
  '접시는 휴머노이드가 치우고, 아빠는 <b>말 한마디</b>로 A1을 조용하게. 몽실이는 둘 사이에 엎드린다.')}
${panel(9, 2, 2, '아이 → 가족', '나 숙제 다 했어!', '19:00 · 밤', `
  ${door(20, fy, 0.4)}
  ${adult(150, fy, { dir: 1, scale: s, glasses: false })}
  ${child(240, fy, { dir: -1, scale: 0.4, band: false })}
  ${pet(196, fy, { dir: -1, scale: 0.42, mood: 'happy' })}
  ${a1(440, fy, { scale: 0.52, tone: 'dark', nest: true, glow: C.green })}
  ${pet(496, fy - 12, { dir: -1, scale: 0.38, mood: 'sleep' })}
  ${bubble(200, 40, '엄마, 나 숙제 다 했어!')}`,
  '현관을 넘으면 <b>글래스는 조용해진다</b>. 밤이 되면 몽실이는 A1 둥지로 돌아가 충전하며 잠든다.')}
</svg>
`);
};
