const { C, a1, child, adult, humanoid, dog, page } = require('./lib');

module.exports = function addFamily(pages, h) {
  const { door, table, plate, book, sofa, dust, chipSvg, waves } = h;
  const pw = 422, ph = 290, gx = 30, x0 = 70, y0 = 200, rowGap = 160;
  const bubble = (x, y, text, { w = null, tail = 'left' } = {}) => {
    const ww = w || text.length * 14 + 28;
    const tx = tail === 'left' ? 22 : ww - 34;
    return `<g transform="translate(${x} ${y})"><rect width="${ww}" height="36" rx="13" fill="#fff" stroke="${C.ink}" stroke-width="2"/><path d="M ${tx} 35 l 6 12 l 8 -12" fill="#fff" stroke="${C.ink}" stroke-width="2"/><rect x="${tx - 1}" y="32" width="16" height="5" fill="#fff"/><text x="14" y="24" font-size="14">${text}</text></g>`;
  };
  const inset = (x, y, text, pose = 'stand', sc = 0.8) => `<g transform="translate(${x} ${y}) scale(${sc})"><rect width="170" height="128" rx="14" fill="${C.dark}"/>${adult(44, 122, { dir: 1, scale: 0.28, pose })}<rect x="78" y="40" width="80" height="50" rx="5" fill="#333"/><text x="85" y="20" font-size="11" fill="#aaa">회사 · 엄마 글래스</text><g transform="translate(8 96)"><rect width="154" height="24" rx="12" fill="#2b2b2b"/><circle cx="12" cy="12" r="4" fill="${C.orange}"/><text x="22" y="16.5" font-size="11" fill="#fff">${text}</text></g></g>`;
  const cupboard = (x, y) => `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="110" height="80" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/><line x1="55" y1="0" x2="55" y2="80" stroke="${C.ink}" stroke-width="2"/><circle cx="48" cy="44" r="3" fill="${C.ink}"/><circle cx="62" cy="44" r="3" fill="${C.ink}"/></g>`;
  const floor = `<line x1="0" y1="${ph - 22}" x2="${pw}" y2="${ph - 22}" stroke="${C.soft}" stroke-width="3"/>`;
  const fy = ph - 22;
  const panel = (i, col, row, tag, title, time, scene, caption) => {
    const x = x0 + col * (pw + gx), y = y0 + row * (ph + rowGap);
    return `<g transform="translate(${x} ${y})">
      <rect width="${pw}" height="${ph}" rx="18" fill="${C.card}" stroke="${C.ink}" stroke-width="2.5"/>
      <clipPath id="fp${i}"><rect width="${pw}" height="${ph}" rx="18"/></clipPath>
      <g clip-path="url(#fp${i})">${floor}${scene}</g>
      <circle cx="28" cy="30" r="17" fill="${C.orange}"/><text x="28" y="36" font-size="17" font-weight="700" fill="#fff" text-anchor="middle">${i}</text>
      <text x="54" y="36" font-size="17" font-weight="700">${title}</text>
      <text x="${pw - 16}" y="36" font-size="14" fill="${C.mute}" text-anchor="end">${time}</text>
      <g transform="translate(0 ${ph + 12})"><rect width="${tag.length * 13 + 22}" height="26" rx="13" fill="${C.orangeSoft}"/><text x="11" y="18" font-size="13" font-weight="700" fill="${C.orange}">${tag}</text></g>
      <foreignObject x="0" y="${ph + 44}" width="${pw}" height="110"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Pretendard,sans-serif;font-size:15px;line-height:1.5;color:${C.ink}">${caption}</div></foreignObject>
    </g>`;
  };

  pages['07_storyboard_family'] = page('2030 Key Scenario · Storyboard', ['가족이 서로에게 주는 것', '엄마는 돌봄을 남기고, 아이는 혼자인 오후를 해내고, 아빠는 아이 옆에 앉는다'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
${panel(1, 0, 0, '엄마 → 아이 · 미리 남긴 돌봄', '엄마의 아침', '07:50', `
  ${adult(90, fy, { dir: 1, scale: 0.55, pose: 'pinch', glasses: false })}
  <rect x="170" y="70" width="230" height="170" rx="16" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.5"/>
  <text x="186" y="100" font-size="14" font-weight="700">하교 후 루틴 · 15:00</text>
  <g font-size="12.5"><text x="186" y="132">간식 · 냉장고 2칸 샌드위치</text><text x="186" y="164">숙제 · 놀이 끝나면 권하기</text><text x="186" y="196">찬장 과자 · 엄마에게 묻기</text></g>
  <circle cx="380" cy="128" r="6" fill="${C.green}"/><circle cx="380" cy="160" r="6" fill="${C.yellow}"/><circle cx="380" cy="192" r="6" fill="${C.orange}"/>`,
  '출근 전 앱에서 하교 시간에 맞춰 간식을 챙기도록 설정하고, 샌드위치 위치를 적어 둔다. “오늘은 혼자 잘 먹으려나.”')}
${panel(2, 1, 0, '아이 → 엄마 · 귀가의 안심', '다녀왔습니다', '15:02', `
  ${door(20, fy, 0.75)}
  ${child(170, fy, { dir: 1, scale: 0.62, bandGlow: true })}
  ${a1(275, fy, { mode: 'side', dir: -1, scale: 0.68, glow: C.orange })}
  ${dog(370, fy, { dir: -1, scale: 0.5 })}
  ${bubble(150, 60, '나 왔어.', { w: 90 })}`,
  '팔찌로 문이 열리고, 미리 돌고 있던 A1이 다가와 <b>키를 낮추고 올려다본다</b>. 엄마 글래스엔 “지우 귀가 15:02”.')}
${panel(3, 2, 0, '엄마 → 아이 · 미리 남긴 돌봄', '손부터 씻고 먹자', '15:05', `
  ${sofa(16, fy, 0.62)}
  ${child(95, fy, { dir: 1, scale: 0.58, pose: 'sit' })}
  ${humanoid(300, fy, { dir: -1, scale: 0.6, pose: 'work', glow: C.green })}
  ${bubble(230, 50, '손부터 씻고 먹자.', { w: 150, tail: 'right' })}
  ${bubble(40, 92, '어, 샌드위치다.', { w: 130 })}`,
  '소파에 털썩 앉자 휴머노이드가 샌드위치와 물을 가져다준다. 포장을 뜯으려는 순간 “손부터 씻고 먹자.” “아, 맞다.”')}
${panel(4, 3, 0, '집이 아이에게 · 곁의 공기', '쟤 갑자기 왜 저래?', '15:40', `
  ${sofa(14, fy, 0.6)}
  ${child(80, fy, { dir: 1, scale: 0.55, pose: 'sit' })}
  ${dog(200, fy, { dir: 1, scale: 0.48 })}${dust(160, 160)}
  ${a1(345, fy, { mode: 'side', dir: -1, scale: 0.62, glow: C.yellow })}
  <path d="M 312 168 q 20 -30 0 -55" fill="none" stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="5 6"/>
  ${bubble(170, 54, '먼지가 많아져서 청소 중이에요', { w: 230, tail: 'right' })}`,
  '쿠션을 쌓다 A1 바람 소리가 커진다. 아이가 물을 때만 답하고, <b>얼굴을 피해 옆에서</b> 청정. 불빛이 주황 → 초록.')}
${panel(5, 0, 1, '아이 → 엄마 · 물어보기', '엄마한테 물어볼게', '17:00', `
  ${cupboard(232, 58)}
  ${child(60, fy, { dir: 1, scale: 0.58, pose: 'point', bandGlow: true })}
  ${humanoid(180, fy, { dir: 1, scale: 0.58, pose: 'point', glow: C.yellow })}
  ${inset(278, 156, '찬장 과자를 원해요', 'pinch')}`,
  '“찬장 과자 꺼내줘.” 휴머노이드가 찬장을 보고 멈추고, 팔찌가 톡톡. 회의 중인 엄마는 손가락으로 거절 → “엄마가 저녁 먹고 먹재.”')}
${panel(6, 1, 1, '엄마 → 아이 · 떨어져도 닿는 토닥임', '엄마의 토닥', '17:20', `
  ${table(110, fy, 170, 100, 1)}${book(200, fy - 106)}
  ${child(60, fy, { dir: 1, scale: 0.6, pose: 'squeeze', bandGlow: true })}
  ${waves(63, fy - 112, C.orange, 2, 12)}
  ${a1(330, fy, { mode: 'side', dir: -1, scale: 0.6, glow: C.orange, touch: true })}
  ${inset(136, 48, '지우가 엄마를 찾아요', 'tap')}`,
  '문제가 안 풀려 팔찌를 꼭 쥐자, 엄마가 손목을 톡톡 두드린다. 지우 손목이 <b>따뜻해지며 두 번</b>. A1은 엄마가 남긴 목소리를 틀어 준다.')}
${panel(7, 2, 1, '아빠 → 아이 · 함께하는 시간', '이거 같이 만들자', '18:30', `
  ${table(70, fy, 200, 100, 1)}
  ${adult(70, fy, { dir: 1, scale: 0.5, pose: 'sit', glasses: false })}
  ${child(260, fy, { dir: -1, scale: 0.55, pose: 'sit' })}
  <rect x="150" y="${fy - 124}" width="44" height="18" rx="3" fill="${C.orangeSoft}" stroke="${C.ink}" stroke-width="2"/>
  ${humanoid(375, fy, { dir: 1, scale: 0.5, pose: 'work' })}
  ${bubble(20, 48, 'A1, 조금만 조용히 해줄래?', { w: 210 })}`,
  '접시는 휴머노이드가 치우고, 아빠는 앱 대신 <b>말 한마디</b>로 A1을 조용하게. “이거 잡고 있어, 내가 붙일게.” “아직 놓지 마!”')}
${panel(8, 3, 1, '아이 → 가족 · 나 혼자 해냈어', '나 숙제 다 했어!', '19:00', `
  <rect x="0" y="50" width="${pw}" height="${fy - 50}" fill="${C.green}" opacity="0.07"/>
  ${door(14, fy, 0.72)}
  ${adult(160, fy, { dir: 1, scale: 0.52, glasses: false })}
  ${child(250, fy, { dir: -1, scale: 0.55 })}
  ${a1(360, fy, { mode: 'space', dir: -1, scale: 0.55, glow: C.green })}
  ${bubble(190, 50, '엄마, 나 숙제 다 했어!', { w: 180 })}`,
  '현관을 넘으면 <b>글래스는 조용해진다</b>. 초록 불빛의 A1, 달려오는 지우. 나중에 “오늘 어땠어?” 하면 A1이 목소리로 짧게 전한다.')}
</svg>
`);
};
