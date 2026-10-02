const fs = require('fs');
const path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { C, a1, child, adult, humanoid, dog, label, callout, page } = require('./lib');

const pages = {};
require('./more')(pages);

// 01 — Next A1 two postures
pages['01_a1_postures'] = page('Next A1 Form Factor', ['공간을 지킬 때는 서 있고, 한 사람을 돌볼 때는 낮아진다', '두 가지 자세를 가진 소프트 바디'], `
<svg width="1920" height="1080" style="position:absolute;top:0;left:0">
  <line x1="960" y1="250" x2="960" y2="960" stroke="${C.soft}" stroke-width="2"/>
  ${label(480, 270, '공간 자세 · SPACE', { size: 26, weight: 700, anchor: 'middle' })}
  ${label(480, 302, '평소 · 집이 비었을 때 · 방 전체 순환', { size: 18, color: C.mute, anchor: 'middle' })}
  ${a1(480, 880, { mode: 'space', scale: 1.9, glow: C.green })}
  ${callout(500, 420, 700, 380, '헤드 정면 · 높은 위치 토출')}
  ${callout(560, 600, 700, 560, '텔레스코픽 넥 (올라감)')}
  ${callout(580, 717, 700, 690, '소프트 실리콘 밴드 · 쓰다듬기 감지')}
  ${callout(520, 800, 700, 810, '360° 패브릭 흡기면')}
  ${label(1440, 270, '곁 자세 · SIDE', { size: 26, weight: 700, anchor: 'middle', color: C.orange })}
  ${label(1440, 302, '마중 · 숙제 · 위로 · 아이 눈높이', { size: 18, color: C.mute, anchor: 'middle' })}
  ${a1(1330, 880, { mode: 'side', scale: 1.9, glow: C.orange, shutter: 'closed' })}
  ${child(1610, 880, { dir: -1, scale: 1.55 })}
  ${callout(1350, 560, 1120, 470, '헤드가 사람 쪽으로 기울어짐', { anchor: 'end' })}
  ${callout(1300, 636, 1120, 560, '링 라이트 = 공기·상태 언어', { anchor: 'end' })}
  ${callout(1250, 668, 1120, 650, '넥이 내려가 키가 낮아짐', { anchor: 'end' })}
  ${callout(1235, 717, 1120, 750, '부딪힘 → 즉시 정지 (실리콘 밴드)', { anchor: 'end' })}
  <path d="M 1435 640 q 50 -10 95 10" fill="none" stroke="${C.orange}" stroke-width="3" stroke-dasharray="6 6"/>${label(1440,680,'간접 토출',{size:15,color:C.orange})}
</svg>
<div style="position:absolute;bottom:52px;left:0;right:0;text-align:center;font-size:20px;color:${C.mute}">관절은 외피 안에 숨기고, 펫다움은 동물 모양이 아니라 <b style="color:${C.ink}">자세와 움직임</b>에서 만든다</div>
`);

async function render(names) {
  const outDir = path.join(__dirname, '..');
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  for (const name of names) {
    const html = pages[name];
    const file = path.join(__dirname, `${name}.html`);
    fs.writeFileSync(file, html);
    const p = await ctx.newPage();
    await p.goto('file://' + file, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(1500);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(outDir, `${name}.png`) });
    await p.close();
    console.log('rendered', name);
  }
  await browser.close();
}

const only = process.argv.slice(2);
render(only.length ? only : Object.keys(pages));
