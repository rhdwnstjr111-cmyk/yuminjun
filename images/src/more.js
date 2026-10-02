const { C, a1, child, adult, humanoid, dog, label, page } = require('./lib');

// Small props
const door = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="-300" width="120" height="300" fill="${C.card}" stroke="${C.ink}" stroke-width="3"/><circle cx="18" cy="-150" r="5" fill="${C.ink}"/><rect x="12" y="-176" width="14" height="22" rx="3" fill="${C.soft}" stroke="${C.ink}" stroke-width="2"/></g>`;
const table = (x, y, w = 220, h = 110, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="${-h}" width="${w}" height="12" rx="4" fill="${C.card}" stroke="${C.ink}" stroke-width="3"/><line x1="16" y1="${-h + 12}" x2="16" y2="0" stroke="${C.ink}" stroke-width="3"/><line x1="${w - 16}" y1="${-h + 12}" x2="${w - 16}" y2="0" stroke="${C.ink}" stroke-width="3"/></g>`;
const plate = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="6" fill="${C.card}" stroke="${C.ink}" stroke-width="2.5"/><path d="M ${x - 8} ${y - 10} q 4 -8 0 -16 M ${x + 8} ${y - 10} q 4 -8 0 -16" fill="none" stroke="${C.mute}" stroke-width="2"/>`;
const book = (x, y) => `<path d="M ${x - 26} ${y} L ${x} ${y + 6} L ${x + 26} ${y} L ${x + 26} ${y - 6} L ${x} ${y} L ${x - 26} ${y - 6} Z" fill="${C.card}" stroke="${C.ink}" stroke-width="2.5"/>`;
const sofa = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="-90" width="240" height="60" rx="18" fill="${C.soft}" stroke="${C.ink}" stroke-width="3"/><rect x="-10" y="-50" width="260" height="50" rx="14" fill="${C.card}" stroke="${C.ink}" stroke-width="3"/></g>`;
const dust = (x, y) => [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${x + (i % 3) * 18 + (i > 2 ? 9 : 0)}" cy="${y - (i > 2 ? 18 : 0) - (i % 2) * 6}" r="${3 + (i % 2)}" fill="${C.mute}" opacity="0.5"/>`).join('');
const windowFrame = (x, y, w = 200, h = 160) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#EAF2F6" stroke="${C.ink}" stroke-width="3"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${C.ink}" stroke-width="2"/>`;
const chipSvg = (x, y, text, { w = null, dot = C.orange } = {}) => {
  const ww = w || text.length * 15 + 36;
  return `<g transform="translate(${x} ${y})"><rect width="${ww}" height="34" rx="17" fill="${C.dark}"/><circle cx="17" cy="17" r="5" fill="${dot}"/><text x="31" y="23" font-size="15" fill="#fff">${text}</text></g>`;
};
const waves = (x, y, color = C.orange, n = 3, r0 = 14) => Array.from({ length: n }, (_, i) => `<circle cx="${x}" cy="${y}" r="${r0 + i * 12}" fill="none" stroke="${color}" stroke-width="2.5" opacity="${0.9 - i * 0.25}"/>`).join('');

module.exports = function addPages(pages) {
  // 02 — Three distances
  pages['02_three_distances'] = page('Interaction Principle', ['사람과 기계 사이의 세 가지 거리', '가까울수록 몸과 촉각, 멀수록 빛과 글자 — 어떤 거리에서도 화면을 붙잡게 하지 않는다'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
  <defs><clipPath id="clipR"><rect x="0" y="230" width="1920" height="760"/></clipPath></defs>
  <g clip-path="url(#clipR)">
    <circle cx="560" cy="900" r="840" fill="#EEECE8"/>
    <circle cx="560" cy="900" r="560" fill="#E7E4DF"/>
    <circle cx="560" cy="900" r="290" fill="#DEDAD3"/>
  </g>
  ${child(500, 900, { dir: 1, scale: 1.05, pose: 'stand', bandGlow: true })}
  ${a1(640, 900, { mode: 'side', dir: -1, scale: 1.0, glow: C.orange, touch: true })}
  ${humanoid(1000, 900, { dir: -1, scale: 0.9, pose: 'point', glow: C.orange })}
  ${dog(850, 900, { dir: -1, scale: 0.8 })}
  ${adult(1530, 900, { dir: -1, scale: 1.0, pose: 'tap' })}${chipSvg(1400, 470, '지우가 엄마를 찾아요', { w: 210 })}
  <path d="M 522 750 C 760 430, 1200 400, 1505 690" fill="none" stroke="${C.orange}" stroke-width="3" stroke-dasharray="8 10"/>
  ${label(980, 445, '팔찌 ↔ 글래스 · 원격 토닥', { size: 18, color: C.orange, anchor: 'middle', weight: 600 })}
  <g font-size="18">
  ${label(80, 560, '① 곁', { size: 30, weight: 700 })}
  ${label(80, 594, '손이 닿는 거리 · 아이 ↔ A1', { size: 18, color: C.mute })}
  ${label(80, 624, '쓰다듬기 · 꾹 누르기 → 자세 · 빛의 숨쉬기', { size: 18 })}
  ${label(860, 330, '② 집 안', { size: 30, weight: 700 })}
  ${label(860, 364, '방 하나 거리 · 아이 ↔ A1 · 휴머노이드 · 집', { size: 18, color: C.mute })}
  ${label(860, 394, '가리키기 + 말 → 몸 돌리기 · 이동 · 빛의 방향', { size: 18 })}
  ${label(1420, 300, '③ 떨어짐', { size: 30, weight: 700 })}
  ${label(1420, 334, '회사 · 지하철 · 엄마/아빠 ↔ 집 · 아이', { size: 18, color: C.mute })}
  ${label(1420, 364, '손가락 핀치 · 손목 두드리기 → 글래스 칩 · 손목 온기', { size: 18 })}
  </g>
  <line x1="1300" y1="250" x2="1300" y2="980" stroke="${C.ink}" stroke-width="2" stroke-dasharray="2 10"/>
  ${label(1310, 970, '집 밖', { size: 16, color: C.mute })}
</svg>
<div style="position:absolute;bottom:40px;left:0;right:0;text-align:center;font-size:17px;color:${C.mute}">근거: Mumm &amp; Mutlu, Human-Robot Proxemics (HRI 2011) — 로봇의 시선·호감도에 따라 사람이 유지하는 거리가 달라진다</div>
`);

  // 03 — Hero: greeting
  pages['03_hero_greeting'] = page('', null, `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
  <rect x="0" y="930" width="1920" height="150" fill="#ECE9E4"/>
  <line x1="0" y1="930" x2="1920" y2="930" stroke="${C.ink}" stroke-width="3"/>
  ${door(330, 930, 1.6)}
  <rect x="330" y="450" width="192" height="480" fill="#FFF3E6" opacity="0.6"/>
  ${child(560, 930, { dir: 1, scale: 1.45, pose: 'stand', bandGlow: true })}
  ${waves(476, 780, C.orange, 3, 18)}
  ${label(420, 860, 'UWB 신원 인증', { size: 16, color: C.orange, weight: 600, anchor: 'middle' })}
  ${a1(830, 930, { mode: 'side', dir: -1, scale: 1.7, glow: C.orange })}
  <path d="M 760 560 q -40 -40 -100 -30" fill="none" stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 8"/>
  ${dog(1060, 930, { dir: -1, scale: 1.1 })}
  ${table(1250, 930, 360, 150, 1.3)}
  ${humanoid(1560, 930, { dir: -1, scale: 1.25, pose: 'work', glow: C.green })}
  <rect x="1300" y="40" width="540" height="340" rx="28" fill="${C.dark}"/>
  ${adult(1450, 360, { dir: 1, scale: 0.68, pose: 'stand' })}
  <rect x="1590" y="150" width="200" height="120" rx="8" fill="#2A2A2A"/>
  <rect x="1600" y="160" width="180" height="90" rx="4" fill="#3A3A3A"/>
  ${chipSvg(1330, 62, '지우 귀가 15:02 · 간식 준비 완료')}
  ${label(1600, 300, '회사 · 엄마의 글래스', { size: 15, color: '#aaa' })}
  ${label(120, 90, '2030 Key Scenario · Hero Shot', { size: 22, color: C.mute })}${label(120, 150, '“엄마가 남긴 오후를, 집이 이어받는다.”', { size: 46, weight: 700 })}
  ${label(120, 200, '15:02 · 현관 — A1은 낮아져 지우를 올려다보고, 휴머노이드는 데운 간식을 식탁에 내려놓는다', { size: 22, color: C.mute })}
  <g font-size="16">
  ${label(700, 470, '① 곁 자세로 낮아지며 마중', { size: 18, weight: 600 })}
  ${label(1500, 520, '② 데운 간식 서빙', { size: 18, weight: 600 })}
  ${label(380, 1000, '③ 팔찌가 열쇠', { size: 18, weight: 600 })}
  ${label(1330, 420, '④ 엄마는 고개만 들어 확인', { size: 18, weight: 600, color: C.ink })}
  </g>
</svg>
`);

  // 04 — Storyboard 6 cuts
  const pw = 560, ph = 330;
  const panel = (i, col, row, title, time, scene, caption) => {
    const x = 90 + col * (pw + 40), y = 220 + row * (ph + 130);
    return `<g transform="translate(${x} ${y})">
      <rect width="${pw}" height="${ph}" rx="20" fill="${C.card}" stroke="${C.ink}" stroke-width="2.5"/>
      <clipPath id="cp${i}"><rect width="${pw}" height="${ph}" rx="20"/></clipPath>
      <g clip-path="url(#cp${i})">${scene}</g>
      <circle cx="34" cy="34" r="20" fill="${C.orange}"/><text x="34" y="41" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">${i}</text>
      <text x="64" y="41" font-size="19" font-weight="700" fill="${C.ink}">${title}</text>
      <text x="${pw - 20}" y="41" font-size="16" fill="${C.mute}" text-anchor="end">${time}</text>
      <foreignObject x="0" y="${ph + 12}" width="${pw}" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Pretendard,sans-serif;font-size:16.5px;line-height:1.5;color:${C.ink}">${caption}</div></foreignObject>
    </g>`;
  };
  const floor = (y = 300) => `<line x1="0" y1="${y}" x2="${pw}" y2="${y}" stroke="${C.soft}" stroke-width="3"/>`;
  pages['04_storyboard'] = page('2030 Key Scenario · Storyboard', ['다녀왔습니다에 대답하는 집', '맞벌이 가정 · 10세 지우 · 반려견 콩이 · 하교 후 4시간'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
  ${panel(1, 0, 0, '엄마의 아침', '07:50', `${floor()}
     ${adult(170, 300, { dir: 1, scale: 0.62, pose: 'pinch', glasses: false })}
     <rect x="250" y="90" width="270" height="190" rx="18" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.5"/>
     <text x="270" y="122" font-size="15" font-weight="700">하교 후 루틴</text>
     <g font-size="14"><text x="270" y="156">간식 · 냉장고 2칸</text><text x="270" y="190">숙제 알림</text><text x="270" y="224">높은 찬장 간식</text></g>
     ${chipSvg(400, 140, '자동', { w: 100, dot: C.green })}${chipSvg(400, 174, '제안', { w: 100, dot: C.yellow })}${chipSvg(400, 208, '승인', { w: 100, dot: C.orange })}`,
    '출근 전 앱에 <b>맡김 범위 3단계</b>를 남긴다 — 자동 / 아이에게 제안 / 엄마 승인')}
  ${panel(2, 1, 0, '귀가 30분 전', '14:30', `${floor()}
     ${sofa(40, 300, 0.8)}${dust(70, 200)}
     ${a1(330, 300, { mode: 'space', dir: -1, scale: 0.75, glow: C.green })}
     ${humanoid(470, 300, { dir: -1, scale: 0.62, pose: 'work', glow: C.yellow })}
     ${chipSvg(150, 70, '집 준비 중 · 공기 좋음')}`,
    'A1이 지우가 머물 <b>거실·식탁 공기를 먼저</b> 정화. 휴머노이드는 간식을 데운다. 엄마 글래스엔 작은 칩 하나')}
  ${panel(3, 2, 0, '마중', '15:02', `${floor()}
     ${door(30, 300, 0.85)}
     ${child(200, 300, { dir: 1, scale: 0.72, bandGlow: true })}
     ${a1(320, 300, { mode: 'side', dir: -1, scale: 0.8, glow: C.orange })}
     ${dog(450, 300, { dir: -1, scale: 0.6 })}`,
    '팔찌로 문이 열리고, A1이 <b>낮아지며 몸을 기울여</b> 맞는다. 콩이도 함께. 엄마 글래스: “지우 귀가 15:02”')}
  ${panel(4, 0, 1, '놀이와 먼지', '15:40', `${floor()}
     ${sofa(20, 300, 0.75)}
     ${child(140, 300, { dir: 1, scale: 0.65, pose: 'sit' })}
     ${dog(260, 300, { dir: -1, scale: 0.55 })}${dust(220, 190)}
     ${a1(440, 300, { mode: 'side', dir: -1, scale: 0.75, glow: C.yellow })}
     <path d="M 400 200 q 30 -40 0 -70" fill="none" stroke="${C.orange}" stroke-width="2.5" stroke-dasharray="5 6"/>`,
    '털·먼지 상승 감지 → A1이 <b>얼굴을 피해</b> 비켜 서서 청정. 링이 <b>주황 → 초록</b>으로 바뀌는 걸 지우가 본다')}
  ${panel(5, 1, 1, '숙제와 토닥', '16:30', `${floor()}
     ${child(90, 300, { dir: 1, scale: 0.7, pose: 'squeeze', bandGlow: true })}
     ${waves(94, 190, C.orange, 2, 14)}
     ${table(160, 300, 200, 110, 1)}${book(250, 186)}
     ${a1(450, 300, { mode: 'side', dir: -1, scale: 0.72, glow: C.orange })}
     ${chipSvg(330, 70, '지우가 엄마를 찾아요', { w: 210 })}
     <text x="435" y="128" font-size="14" fill="${C.orange}" text-anchor="middle">엄마: 손목 톡톡 → 온기 2번</text>`,
    '팔찌로 A1을 <b>가리켜 꾹</b> → 곁으로 온다. 시무룩해져 팔찌를 꼭 쥐면 엄마가 손목을 두드려 <b>따뜻한 토닥</b>으로 답한다')}
  ${panel(6, 2, 1, '엄마의 귀가', '19:00', `${floor()}
     <rect x="0" y="60" width="${pw}" height="240" fill="${C.green}" opacity="0.08"/>
     ${adult(110, 300, { dir: 1, scale: 0.62 })}
     ${child(230, 300, { dir: -1, scale: 0.6 })}
     ${a1(380, 300, { mode: 'space', dir: -1, scale: 0.7, glow: C.green })}
     ${humanoid(500, 300, { dir: -1, scale: 0.55, pose: 'yield' })}
     ${chipSvg(150, 70, '오늘 오후 · 간식 ✓ 숙제 ✓', { w: 250, dot: C.green })}`,
    '글래스에 <b>공간 위 공기 색</b>과 오후 요약. A1은 공간 자세로 돌아가고 휴머노이드는 정리. “엄마, 나 숙제 다 했어!”')}
</svg>
`);

  // 05 — Interaction moments (9)
  const card = (i, col, row, title, ref, design, scene) => {
    const w = 560, h = 252, x = 90 + col * (w + 40), y = 210 + row * (h + 22);
    return `<g transform="translate(${x} ${y})">
      <rect width="${w}" height="${h}" rx="18" fill="${C.card}"/>
      <rect x="16" y="16" width="190" height="${h - 32}" rx="12" fill="${C.paper}"/>
      <clipPath id="mc${i}"><rect x="16" y="16" width="190" height="${h - 32}" rx="12"/></clipPath>
      <g clip-path="url(#mc${i})">${scene}</g>
      <text x="228" y="48" font-size="15" font-weight="700" fill="${C.orange}">M${i}</text>
      <text x="264" y="48" font-size="21" font-weight="700" fill="${C.ink}">${title}</text>
      <foreignObject x="228" y="62" width="${w - 248}" height="${h - 70}"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Pretendard,sans-serif;font-size:14.5px;line-height:1.45;color:${C.ink}"><div style="color:${C.mute};margin-bottom:6px">${ref}</div>${design}</div></foreignObject>
    </g>`;
  };
  const gy = 228;
  pages['05_interaction_moments'] = page('Interaction Moments × References', ['인터랙션 순간 9가지와 사람–기계 레퍼런스', '사람의 행동 → 기계의 반응 · 참고 사례 · 우리의 설계'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
  ${card(1, 0, 0, '마중', 'Satake·Kanda HRI 2009 · Amazon Astro', '헤드부터 현관을 향함 → 정면에서 감속 접근 → 1m 앞 <b>낮아져 올려다봄</b>', `${child(70, gy, { dir: 1, scale: 0.55 })}${a1(150, gy, { mode: 'side', dir: -1, scale: 0.55, glow: C.orange })}`)}
  ${card(2, 1, 0, '가리키기', 'Put-That-There (MIT 1980) · SeleCon · PnPSelect', '가리키기 = 선택, <b>꾹 = 확정</b>. 선택된 기기는 빛이 아이 쪽으로 모인다. 외울 동작은 3개뿐', `${child(70, gy, { dir: 1, scale: 0.55, pose: 'point', bandGlow: true })}${a1(165, gy, { mode: 'space', dir: -1, scale: 0.45, glow: C.orange })}`)}
  ${card(3, 2, 0, '의도 보여주기', 'Dragan HRI 2013 · Baraka (CMU) · Apple ELEGNT', '집기 전 <b>대상을 1초 바라봄</b>, 출발 전 이동 방향으로 빛이 흐름. 말보다 몸과 빛', `${humanoid(80, gy, { dir: 1, scale: 0.5, pose: 'point', glow: C.orange })}<rect x="150" y="190" width="30" height="38" rx="4" fill="${C.orangeSoft}" stroke="${C.ink}" stroke-width="2"/>`)}
  ${card(4, 0, 1, '쓰다듬기', 'Qoobo · LOVOT · Moflin · PARO · MAAH', '쓰다듬기와 부딪힘을 구분. 빛이 손을 따라 흐름. <b>쓰다듬기는 명령이 되지 않는다</b>', `${a1(120, gy, { mode: 'side', dir: -1, scale: 0.62, glow: C.orange, touch: true })}<path d="M 40 160 q 30 -14 60 0" fill="none" stroke="${C.orange}" stroke-width="3"/>`)}
  ${card(5, 1, 1, '원격 토닥', 'Bond Touch · Apple Watch Digital Touch · Embr Wave', '꼭 쥐기 = “엄마 생각나” / 세 번 꾹 = 도움. 엄마의 응답은 <b>온기 + 느린 진동 2번</b>', `${child(110, gy, { dir: 1, scale: 0.6, pose: 'squeeze', bandGlow: true })}${waves(112, 150, C.orange, 2, 12)}`)}
  ${card(6, 2, 1, '부모 승인', 'Apple Ask to Buy · Meta Neural Band · Calm Tech', '시야 구석 카드 한 장, 검지 핀치 허용 / 중지 핀치 거절. <b>5분 무응답 = 거절</b>', `${adult(110, gy + 4, { dir: 1, scale: 0.42, pose: 'pinch' })}`)}
  ${card(7, 0, 2, '비켜서기', 'Pacchierotti RO-MAN 2006 · Toyota Punyo', '2m 감속, 1m <b>팔 접기</b>, 비켜서기 전 헤드로 방향 예고', `${humanoid(70, gy, { dir: 1, scale: 0.5, pose: 'yield' })}${child(165, gy, { dir: -1, scale: 0.45 })}`)}
  ${card(8, 1, 2, '프라이버시 보이기', 'Amazon Astro 차단 버튼·표시등 · Robot Privacy 2026', '<b>기계식 셔터</b>, 원격 시청 중 이동 정지·표시등. 아이가 헤드를 덮으면 닫힘', `${a1(110, gy, { mode: 'space', dir: 1, scale: 0.55, glow: C.soft, shutter: 'open' })}`)}
  ${card(9, 2, 2, '먼저 말 걸기', 'IUI 2026 선제적 AI · Horvitz CHI 1999', '놀이 중엔 침묵, <b>활동 경계</b>에서만 제안. 같은 제안은 최대 2번', `${child(70, gy, { dir: 1, scale: 0.5, pose: 'sit' })}${a1(160, gy, { mode: 'side', dir: -1, scale: 0.5, glow: C.yellow })}`)}
</svg>
`);

  // 06 — State language
  const states = [
    ['대기 · 괜찮음', '#F0EEEA', '느린 숨', '—', '—', '—'],
    ['듣는 중', '#FFFFFF', '목소리 물결', '—', '—', '—'],
    ['선택됨 (가리킴)', C.orange, '아이 쪽으로 모임', '톡 1회', '—', '짧은 띵'],
    ['이동 · 작업 중', C.orange, '진행 방향 흐름', '—', '“간식 데우는 중 · 3분”', '—'],
    ['확인 필요', C.yellow, '천천히 깜빡', '톡톡 2회', '승인 카드', '물음 억양'],
    ['완료', C.green, '한 번 퍼짐', '—', '칩 사라짐', '하강 2음'],
    ['공기 상태', 'linear-gradient(90deg,#3DBE7A,#F2B632,#FF6A2B)', '색만 (초록→주황)', '—', '귀가 시 공간 오버레이', '—'],
    ['엄마의 토닥', '#FFB08A', '—', '온기 + 느린 진동 2회', '—', '—'],
    ['보고 있음', C.ink, '셔터 열림 + 표시등', '—', '—', '—'],
  ];
  const rows = states.map(([s, sw, ring, band, glass, sound]) => `<tr><td class="st">${s}</td><td><span class="sw" style="background:${sw}"></span>${ring}</td><td>${band}</td><td>${glass}</td><td>${sound}</td></tr>`).join('');
  pages['06_state_language'] = page('Shared State Language', ['A1 · 휴머노이드 · 팔찌 · 글래스가 같은 문법으로 말한다', '색만으로 외우게 하지 않는다 — 색 + 움직임 패턴 + 짧은 글자'], `
<style>
table{position:absolute;top:220px;left:150px;width:1620px;border-collapse:separate;border-spacing:0 8px;font-size:20px}
th{text-align:left;font-size:17px;color:${C.mute};font-weight:600;padding:0 22px 6px}
td{background:#fff;padding:17px 22px}
td:first-child{border-radius:14px 0 0 14px}
td:last-child{border-radius:0 14px 14px 0}
.st{font-weight:700;width:270px}
.sw{display:inline-block;width:64px;height:14px;border-radius:7px;margin-right:14px;vertical-align:middle;border:2px solid ${C.ink}}
</style>
<table><tr><th>상태</th><th>A1 링 라이트 / 휴머노이드 손목 빛</th><th>아이 팔찌</th><th>엄마 글래스</th><th>소리</th></tr>${rows}</table>
`);
};
