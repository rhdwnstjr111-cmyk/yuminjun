const { C, a1, child, humanoid, pet, adult, label, page } = require('./lib');

module.exports = function addMood(pages) {
  const sw = (x, y, colors) => colors.map((c, i) => `<circle cx="${x + i * 34}" cy="${y}" r="13" fill="${c}" stroke="${C.ink}" stroke-width="1.5"/>`).join('');
  const col = (cx, name, role, size, colors, lines) => `
    <g>
      ${label(cx, 760, name, { size: 28, weight: 700, anchor: 'middle' })}
      ${label(cx, 794, role, { size: 19, color: C.orange, weight: 600, anchor: 'middle' })}
      ${label(cx, 826, size, { size: 16, color: C.mute, anchor: 'middle' })}
      ${sw(cx - (colors.length - 1) * 17, 862, colors)}
      ${lines.map((t, i) => label(cx, 906 + i * 26, t, { size: 16, anchor: 'middle' })).join('')}
    </g>`;
  const base = 700;
  pages['08_family_mood'] = page('Form Factor Mood', ['조용한 가구, 따뜻한 동거인, 공손한 손', '큰 것은 차분하게 물러서고, 작은 것은 따뜻하게 다가오며, 힘센 것은 부드럽게 비켜선다'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
  <rect x="0" y="${base}" width="1920" height="${1080 - base}" fill="#EDEAE5"/>
  <line x1="0" y1="${base}" x2="1920" y2="${base}" stroke="${C.ink}" stroke-width="2"/>

  ${a1(360, base, { mode: 'space', dir: 1, scale: 0.98, glow: C.green, tone: 'dark', nest: true })}
  ${pet(460, base - 22, { dir: -1, scale: 0.7, mood: 'sleep' })}
  ${label(430, base - 110, '둥지 · 밤에는 펫이 A1 곁에서 충전', { size: 15, color: C.mute })}

  ${child(880, base, { dir: 1, scale: 1.3, band: false })}
  ${label(960, 250, '실제 비율 (아이 140cm 기준)', { size: 15, color: C.mute, anchor: 'middle' })}
  ${pet(1010, base, { dir: -1, scale: 0.85, mood: 'happy', warm: true })}

  ${humanoid(1500, base, { dir: -1, scale: 1.09, pose: 'yield', glow: C.soft })}

  ${col(400, '나무 A1', '조용한 가구 · 집의 공기와 판단', '약 100cm · 현재 A1 볼륨 계승', ['#4A4744', '#8A847D', '#D9D5CE', '#3DBE7A'], ['짙은 차콜 무광 셸 + 360° 패브릭 흡기면', '링 라이트 = 공기 언어, 표정은 최소', '하부 측면에 펫 충전 둥지'])}
  ${col(960, '로봇펫 몽실', '따뜻한 동거인 · 아이 곁의 친구', '약 30cm · 2kg 내외 · 안을 수 있는 크기', ['#EFE6D8', '#D8C7AE', '#C9B79C', '#FF6A2B'], ['갈아입는 니트 외피 + 실리콘 귀·발', '세 줄 눈 · 귀 · 꼬리로 감정 표현', '배 온열 패널 = 엄마의 토닥'])}
  ${col(1500, '휴머노이드', '공손한 손 · 물리 수행 전용', '약 140~150cm · 어른보다 작게', ['#E4E1DC', '#D9D5CE', '#1E1E1E', '#F2B632'], ['라이트 웜그레이 소프트 외장, 관절 커버', '세 줄 바이저, 표정 없음', '사람이 오면 팔을 접고 비켜섬'])}

  <g transform="translate(1660 250)">
    <rect width="220" height="300" rx="20" fill="${C.dark}"/>
    ${adult(60, 290, { dir: 1, scale: 0.5, pose: 'tap' })}
    <text x="20" y="34" font-size="15" fill="#fff" font-weight="700">부모 글래스</text>
    <text x="20" y="56" font-size="12.5" fill="#aaa">집 밖에서만 · 상용 글래스 위 UI</text>
    <g transform="translate(105 150)"><rect width="100" height="22" rx="11" fill="#2b2b2b"/><circle cx="11" cy="11" r="4" fill="${C.orange}"/><text x="20" y="15.5" font-size="10" fill="#fff">지우 귀가 15:02</text></g>
  </g>
</svg>
<div style="position:absolute;bottom:34px;left:0;right:0;text-align:center;font-size:17px;color:${C.ink}">
  <b>공통 디자인 언어</b> &nbsp;·&nbsp; ① 세 줄 빛 (현재 A1 라이트 슬릿 계승) &nbsp; ② 사람이 닿는 높이는 부드러운 실리콘 &nbsp; ③ 관절은 숨기고 이음새는 한 줄로 &nbsp; ④ 같은 컬러칩, 다른 비율
</div>
`);
};
