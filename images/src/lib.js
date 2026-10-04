// Line-pictogram figures for NAMUH X interaction images.
// Coordinates: (x, y) is the figure's ground contact point; y grows downward.
const C = {
  ink: '#1E1E1E',
  paper: '#F5F4F2',
  card: '#FFFFFF',
  soft: '#D9D5CE',
  mute: '#8C8780',
  orange: '#FF6A2B',
  orangeSoft: '#FFD9C7',
  green: '#3DBE7A',
  yellow: '#F2B632',
  dark: '#111111',
};

const S = (w = 3) => `stroke="${C.ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

// Next A1. mode: 'space' (tall, neck up) | 'side' (low, head tilted toward dir)
// dir: 1 faces right, -1 faces left. glow: ring light color or null.
function a1(x, y, { mode = 'space', dir = 1, glow = null, scale = 1, shutter = 'closed', touch = false, tone = 'light', nest = false } = {}) {
  const F = tone === 'dark' ? '#4A4744' : C.card;
  const LN = tone === 'dark' ? '#5E5A56' : C.soft;
  const EYE = tone === 'dark' ? '#F5F4F2' : C.ink;
  const neck = mode === 'space' ? 62 : 6;
  const tilt = mode === 'space' ? 0 : 16 * dir;
  const bodyH = 120, bodyW = 104;
  const g = [];
  // floor shadow
  if (nest) g.push(`<path d="M ${bodyW / 2 - 4} -6 L ${bodyW / 2 + 70} -6 Q ${bodyW / 2 + 80} -6 ${bodyW / 2 + 80} -16 L ${bodyW / 2 + 80} -22 L ${bodyW / 2 - 2} -22 Z" fill="${F}" ${S(2.5)}/>`);
  g.push(`<ellipse cx="0" cy="2" rx="62" ry="8" fill="${C.ink}" opacity="0.08"/>`);
  // body
  g.push(`<path d="M ${-bodyW / 2} 0 L ${-bodyW / 2 + 6} ${-bodyH} Q 0 ${-bodyH - 10} ${bodyW / 2 - 6} ${-bodyH} L ${bodyW / 2} 0 Z" fill="${F}" ${S()}/>`);
  // fabric intake lines
  for (let i = -3; i <= 3; i++) g.push(`<line x1="${i * 11}" y1="-18" x2="${i * 11 * 0.95}" y2="-70" stroke="${LN}" stroke-width="2"/>`);
  // silicone band
  g.push(`<rect x="${-bodyW / 2 - 4}" y="-96" width="${bodyW + 8}" height="20" rx="10" fill="${touch ? C.orangeSoft : C.soft}" ${S(2.5)}/>`);
  // neck
  if (neck <= 10) g.push(`<rect x="-34" y="${-bodyH - 16}" width="68" height="22" rx="8" fill="${F}" ${S()}/>`);
  if (neck > 10) {
    g.push(`<rect x="-30" y="${-bodyH - neck - 4}" width="60" height="${neck + 8}" rx="8" fill="${F}" ${S()}/>`);
    for (let i = 1; i < 4; i++) g.push(`<line x1="-30" y1="${-bodyH - (neck * i) / 4}" x2="30" y2="${-bodyH - (neck * i) / 4}" stroke="${LN}" stroke-width="2"/>`);
  }
  // head group
  const hy = -bodyH - neck;
  const head = [];
  // ring light
  head.push(`<rect x="-46" y="-8" width="92" height="10" rx="5" fill="${glow || C.soft}" ${S(2)}/>`);
  if (glow) head.push(`<rect x="-56" y="-14" width="112" height="22" rx="11" fill="${glow}" opacity="0.18"/>`);
  head.push(`<path d="M -50 -8 Q -50 -62 0 -64 Q 50 -62 50 -8 Z" fill="${F}" ${S()}/>`);
  // eyes (light bars) facing dir
  const ex = 14 * dir;
  head.push(`<rect x="${ex - 15}" y="-44" width="7" height="18" rx="3.5" fill="${EYE}"/>`);
  head.push(`<rect x="${ex - 3}" y="-44" width="7" height="18" rx="3.5" fill="${EYE}"/>`);
  head.push(`<rect x="${ex + 9}" y="-44" width="7" height="18" rx="3.5" fill="${EYE}"/>`);
  // camera + shutter
  const cx = 34 * dir;
  head.push(`<circle cx="${cx}" cy="-36" r="6" fill="${shutter === 'open' ? C.ink : C.soft}" ${S(2)}/>`);
  if (shutter === 'open') head.push(`<circle cx="${cx + 10 * dir}" cy="-48" r="3.5" fill="${C.orange}"/>`);
  g.push(`<g transform="translate(0 ${hy}) rotate(${tilt} 0 -8)">${head.join('')}</g>`);
  return `<g transform="translate(${x} ${y}) scale(${scale})">${g.join('')}</g>`;
}

// Child (10y). pose: 'stand' | 'point' | 'sit' | 'squeeze'
function child(x, y, { pose = 'stand', dir = 1, scale = 1, band = true, bandGlow = false } = {}) {
  const g = [];
  const sit = pose === 'sit';
  const hipY = sit ? -70 : -120;
  const shoulderY = hipY - 82;
  g.push(`<ellipse cx="0" cy="2" rx="34" ry="6" fill="${C.ink}" opacity="0.08"/>`);
  // legs
  if (sit) {
    g.push(`<path d="M -8 ${hipY} L ${40 * dir} ${hipY} L ${40 * dir} 0" fill="none" ${S(10)}/>`);
    g.push(`<path d="M -8 ${hipY} L ${40 * dir} ${hipY} L ${40 * dir} 0" fill="none" stroke="${C.card}" stroke-width="4" stroke-linecap="round"/>`);
  } else {
    g.push(`<path d="M -10 ${hipY} L -14 0 M 10 ${hipY} L 14 0" fill="none" ${S(10)}/>`);
  }
  // torso
  g.push(`<path d="M -24 ${shoulderY} Q 0 ${shoulderY - 10} 24 ${shoulderY} L 20 ${hipY} L -20 ${hipY} Z" fill="${C.card}" ${S()}/>`);
  // head
  g.push(`<circle cx="${4 * dir}" cy="${shoulderY - 30}" r="25" fill="${C.card}" ${S()}/>`);
  g.push(`<path d="M ${-20 + 4 * dir} ${shoulderY - 40} Q ${4 * dir} ${shoulderY - 64} ${28 + 4 * dir} ${shoulderY - 38}" fill="none" ${S(5)}/>`);
  g.push(`<circle cx="${14 * dir}" cy="${shoulderY - 30}" r="2.6" fill="${C.ink}"/>`);
  // arms
  let hand;
  if (pose === 'point') {
    hand = [70 * dir, shoulderY - 18];
    g.push(`<path d="M ${16 * dir} ${shoulderY + 8} L ${hand[0]} ${hand[1]}" fill="none" ${S(8)}/>`);
    g.push(`<path d="M ${-16 * dir} ${shoulderY + 8} L ${-22 * dir} ${hipY - 4}" fill="none" ${S(8)}/>`);
  } else if (pose === 'squeeze') {
    hand = [6 * dir, shoulderY + 44];
    g.push(`<path d="M ${16 * dir} ${shoulderY + 8} Q ${30 * dir} ${shoulderY + 40} ${hand[0]} ${hand[1]}" fill="none" ${S(8)}/>`);
    g.push(`<path d="M ${-16 * dir} ${shoulderY + 8} Q ${-4 * dir} ${shoulderY + 46} ${10 * dir} ${shoulderY + 46}" fill="none" ${S(8)}/>`);
  } else if (sit) {
    hand = [48 * dir, shoulderY + 46];
    g.push(`<path d="M ${16 * dir} ${shoulderY + 8} L ${hand[0]} ${hand[1]}" fill="none" ${S(8)}/>`);
    g.push(`<path d="M ${-14 * dir} ${shoulderY + 8} L ${36 * dir} ${shoulderY + 52}" fill="none" ${S(8)}/>`);
  } else {
    hand = [26 * dir, hipY - 4];
    g.push(`<path d="M ${16 * dir} ${shoulderY + 8} L ${hand[0]} ${hand[1]}" fill="none" ${S(8)}/>`);
    g.push(`<path d="M ${-16 * dir} ${shoulderY + 8} L ${-22 * dir} ${hipY - 4}" fill="none" ${S(8)}/>`);
  }
  if (band) {
    const bx = hand[0] * 0.82, by = hand[1] + (shoulderY + 8 - hand[1]) * 0.18;
    if (bandGlow) g.push(`<circle cx="${bx}" cy="${by}" r="16" fill="${C.orange}" opacity="0.25"/>`);
    g.push(`<circle cx="${bx}" cy="${by}" r="6.5" fill="${C.orange}" stroke="${C.ink}" stroke-width="2"/>`);
  }
  return `<g transform="translate(${x} ${y}) scale(${scale})">${g.join('')}</g>`;
}

// Adult (parent) with smart glasses. pose: 'stand' | 'pinch' | 'tap' | 'sit'
function adult(x, y, { dir = 1, scale = 1, pose = 'stand', glasses = true, chip = null } = {}) {
  const g = [];
  const sit = pose === 'sit';
  const hipY = sit ? -86 : -160;
  const shoulderY = hipY - 108;
  g.push(`<ellipse cx="0" cy="2" rx="40" ry="7" fill="${C.ink}" opacity="0.08"/>`);
  if (sit) g.push(`<path d="M -8 ${hipY} L ${52 * dir} ${hipY} L ${52 * dir} 0" fill="none" ${S(11)}/>`);
  else g.push(`<path d="M -12 ${hipY} L -16 0 M 12 ${hipY} L 16 0" fill="none" ${S(11)}/>`);
  g.push(`<path d="M -30 ${shoulderY} Q 0 ${shoulderY - 12} 30 ${shoulderY} L 25 ${hipY} L -25 ${hipY} Z" fill="${C.card}" ${S()}/>`);
  const hx = 4 * dir, hy = shoulderY - 36;
  g.push(`<circle cx="${hx}" cy="${hy}" r="28" fill="${C.card}" ${S()}/>`);
  g.push(`<path d="M ${hx - 26} ${hy - 6} Q ${hx} ${hy - 44} ${hx + 28} ${hy - 4}" fill="none" ${S(5)}/>`);
  if (glasses) {
    g.push(`<line x1="${hx - 8 * dir}" y1="${hy - 2}" x2="${hx + 30 * dir}" y2="${hy - 2}" ${S(3)}/>`);
    g.push(`<rect x="${dir > 0 ? hx + 8 : hx - 28}" y="${hy - 9}" width="20" height="13" rx="4" fill="${C.orangeSoft}" ${S(2.5)}/>`);
  }
  // arms
  if (pose === 'pinch' || pose === 'tap') {
    g.push(`<path d="M ${18 * dir} ${shoulderY + 10} L ${30 * dir} ${shoulderY + 70} L ${10 * dir} ${shoulderY + 58}" fill="none" ${S(9)}/>`);
    g.push(`<circle cx="${10 * dir}" cy="${shoulderY + 58}" r="5" fill="${C.orange}"/>`);
    g.push(`<path d="M ${-18 * dir} ${shoulderY + 10} L ${-24 * dir} ${hipY}" fill="none" ${S(9)}/>`);
  } else {
    g.push(`<path d="M ${18 * dir} ${shoulderY + 10} L ${26 * dir} ${hipY}" fill="none" ${S(9)}/>`);
    g.push(`<path d="M ${-18 * dir} ${shoulderY + 10} L ${-26 * dir} ${hipY}" fill="none" ${S(9)}/>`);
  }
  if (chip) {
    const cxp = hx + 46 * dir, cyp = hy - 70;
    const w = chip.length * 15 + 30;
    g.push(`<g transform="translate(${dir > 0 ? cxp : cxp - w} ${cyp})"><rect width="${w}" height="34" rx="17" fill="${C.dark}"/><circle cx="17" cy="17" r="5" fill="${C.orange}"/><text x="30" y="23" font-size="15" fill="#fff">${chip}</text></g>`);
  }
  return `<g transform="translate(${x} ${y}) scale(${scale})">${g.join('')}</g>`;
}

// Humanoid. pose: 'work' (arms out, holding plate) | 'yield' (arms folded) | 'point'
function humanoid(x, y, { dir = 1, scale = 1, pose = 'work', glow = null } = {}) {
  const g = [];
  const hipY = -150, shoulderY = -262;
  g.push(`<ellipse cx="0" cy="2" rx="44" ry="7" fill="${C.ink}" opacity="0.08"/>`);
  g.push(`<path d="M -14 ${hipY} L -18 0 M 14 ${hipY} L 18 0" fill="none" ${S(16)}/>`);
  g.push(`<path d="M -14 ${hipY} L -18 0 M 14 ${hipY} L 18 0" fill="none" stroke="${C.card}" stroke-width="9" stroke-linecap="round"/>`);
  g.push(`<rect x="-34" y="${shoulderY}" width="68" height="${hipY - shoulderY + 8}" rx="26" fill="${C.card}" ${S()}/>`);
  g.push(`<rect x="-36" y="${shoulderY + 40}" width="72" height="16" rx="8" fill="${C.soft}" ${S(2)}/>`);
  // head
  g.push(`<rect x="-24" y="${shoulderY - 58}" width="48" height="52" rx="20" fill="${C.card}" ${S()}/>`);
  g.push(`<rect x="${-18 + 4 * dir}" y="${shoulderY - 44}" width="36" height="20" rx="10" fill="${C.ink}"/>`);
  [-8, 0, 8].forEach(dx => g.push(`<rect x="${4 * dir + dx - 1.5}" y="${shoulderY - 40}" width="3" height="12" rx="1.5" fill="#F5F4F2"/>`));
  const wrist = glow || C.soft;
  if (pose === 'work') {
    g.push(`<path d="M ${26 * dir} ${shoulderY + 14} L ${62 * dir} ${shoulderY + 70} L ${96 * dir} ${shoulderY + 70}" fill="none" ${S(12)}/>`);
    g.push(`<path d="M ${-26 * dir} ${shoulderY + 14} L ${-30 * dir} ${shoulderY + 100}" fill="none" ${S(12)}/>`);
    g.push(`<ellipse cx="${112 * dir}" cy="${shoulderY + 64}" rx="34" ry="7" fill="${C.card}" ${S(2.5)}/>`);
    g.push(`<path d="M ${102 * dir} ${shoulderY + 50} q 4 -8 0 -16 M ${118 * dir} ${shoulderY + 50} q 4 -8 0 -16" fill="none" stroke="${C.mute}" stroke-width="2"/>`);
    g.push(`<circle cx="${80 * dir}" cy="${shoulderY + 70}" r="6" fill="${wrist}" ${S(2)}/>`);
  } else if (pose === 'yield') {
    g.push(`<path d="M ${26 * dir} ${shoulderY + 14} L ${30 * dir} ${shoulderY + 60} L ${-6 * dir} ${shoulderY + 74}" fill="none" ${S(12)}/>`);
    g.push(`<path d="M ${-26 * dir} ${shoulderY + 14} L ${-30 * dir} ${shoulderY + 60} L ${6 * dir} ${shoulderY + 82}" fill="none" ${S(12)}/>`);
    g.push(`<circle cx="0" cy="${shoulderY + 78}" r="6" fill="${wrist}" ${S(2)}/>`);
  } else {
    g.push(`<path d="M ${26 * dir} ${shoulderY + 14} L ${70 * dir} ${shoulderY + 40} L ${100 * dir} ${shoulderY + 30}" fill="none" ${S(12)}/>`);
    g.push(`<path d="M ${-26 * dir} ${shoulderY + 14} L ${-30 * dir} ${shoulderY + 100}" fill="none" ${S(12)}/>`);
    g.push(`<circle cx="${86 * dir}" cy="${shoulderY + 35}" r="6" fill="${wrist}" ${S(2)}/>`);
    if (glow) g.push(`<circle cx="${86 * dir}" cy="${shoulderY + 35}" r="16" fill="${glow}" opacity="0.25"/>`);
  }
  return `<g transform="translate(${x} ${y}) scale(${scale})">${g.join('')}</g>`;
}


// Robot pet (~30cm). mood: 'happy' | 'curious' | 'wait' | 'sleep'. warm: belly glow.
function pet(x, y, { dir = 1, scale = 1, mood = 'happy', warm = false, color = '#EFE6D8' } = {}) {
  const g = [];
  g.push(`<ellipse cx="0" cy="2" rx="46" ry="6" fill="${C.ink}" opacity="0.08"/>`);
  const earUp = mood === 'happy' || mood === 'curious';
  const tilt = mood === 'curious' ? 10 * dir : 0;
  const body = [];
  if (warm) body.push(`<ellipse cx="0" cy="-30" rx="58" ry="40" fill="${C.orange}" opacity="0.22"/>`);
  // tail antenna
  const tail = mood === 'sleep' ? `M ${-40 * dir} -14 q ${-14 * dir} 2 ${-18 * dir} 10` : `M ${-40 * dir} -26 q ${-16 * dir} -10 ${-14 * dir} -30`;
  body.push(`<path d="${tail}" fill="none" ${S(4)}/><circle cx="${(mood === 'sleep' ? -58 : -54) * dir}" cy="${mood === 'sleep' ? -4 : -56}" r="5" fill="${C.orange}" ${S(2)}/>`);
  // ears
  if (earUp) {
    body.push(`<path d="M ${-24 + 4 * dir} -58 Q ${-30 + 4 * dir} -92 ${-12 + 4 * dir} -84 Q ${-6 + 4 * dir} -70 ${-8 + 4 * dir} -60 Z" fill="${color}" ${S(2.5)}/>`);
    body.push(`<path d="M ${10 + 4 * dir} -60 Q ${16 + 4 * dir} -94 ${30 + 4 * dir} -82 Q ${32 + 4 * dir} -68 ${26 + 4 * dir} -56 Z" fill="${color}" ${S(2.5)}/>`);
  } else {
    body.push(`<path d="M ${-26 * dir} -52 Q ${-48 * dir} -50 ${-46 * dir} -36 Q ${-36 * dir} -38 ${-22 * dir} -42 Z" fill="${color}" ${S(2.5)}/>`);
    body.push(`<path d="M ${24 * dir} -54 Q ${44 * dir} -60 ${48 * dir} -44 Q ${36 * dir} -42 ${22 * dir} -44 Z" fill="${color}" ${S(2.5)}/>`);
  }
  // loaf body
  body.push(`<path d="M -44 -4 Q -48 -62 0 -64 Q 48 -62 44 -4 Q 0 4 -44 -4 Z" fill="${color}" ${S()}/>`);
  // knit texture
  for (let i = -2; i <= 2; i++) body.push(`<path d="M ${i * 14 - 4} -14 q 4 -6 8 0" fill="none" stroke="#CDBFA9" stroke-width="2"/>`);
  // face: three-line eyes
  const fx = 14 * dir;
  if (mood === 'sleep') {
    body.push(`<path d="M ${fx - 14} -38 q 4 3 8 0 M ${fx + 6} -38 q 4 3 8 0" fill="none" ${S(2.5)}/>`);
  } else {
    [-10, 0, 10].forEach((dx, k) => body.push(`<rect x="${fx + dx - 2}" y="${-46 + (k === 1 ? -2 : 0)}" width="4" height="${mood === 'wait' ? 6 : 12}" rx="2" fill="${C.ink}"/>`));
  }
  body.push(`<circle cx="${fx}" cy="-26" r="2.4" fill="${C.ink}" opacity="0.7"/>`);
  // silicone feet
  body.push(`<rect x="-30" y="-6" width="18" height="7" rx="3.5" fill="${C.soft}" ${S(2)}/><rect x="12" y="-6" width="18" height="7" rx="3.5" fill="${C.soft}" ${S(2)}/>`);
  g.push(`<g transform="rotate(${tilt} 0 -20)">${body.join('')}</g>`);
  return `<g transform="translate(${x} ${y}) scale(${scale})">${g.join('')}</g>`;
}

function dog(x, y, { dir = 1, scale = 1 } = {}) {
  const g = [];
  g.push(`<ellipse cx="0" cy="2" rx="40" ry="6" fill="${C.ink}" opacity="0.08"/>`);
  g.push(`<path d="M -30 0 L -30 -26 M -14 0 L -14 -24 M 16 0 L 16 -24 M 30 0 L 30 -26" fill="none" ${S(6)}/>`);
  g.push(`<rect x="-40" y="-56" width="80" height="34" rx="17" fill="${C.card}" ${S()}/>`);
  g.push(`<circle cx="${42 * dir}" cy="-66" r="18" fill="${C.card}" ${S()}/>`);
  g.push(`<path d="M ${34 * dir} -80 q ${-6 * dir} 18 ${4 * dir} 20" fill="${C.soft}" ${S(2.5)}/>`);
  g.push(`<circle cx="${50 * dir}" cy="-68" r="2.4" fill="${C.ink}"/>`);
  g.push(`<path d="M ${-40 * dir} -50 q ${-16 * dir} -10 ${-14 * dir} -26" fill="none" ${S(4)}/>`);
  return `<g transform="translate(${x} ${y}) scale(${scale})">${g.join('')}</g>`;
}

function label(x, y, text, { size = 18, color = C.ink, weight = 500, anchor = 'start' } = {}) {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${text}</text>`;
}

function callout(x1, y1, x2, y2, text, { anchor = 'start' } = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.mute}" stroke-width="1.5" stroke-dasharray="4 4"/><circle cx="${x1}" cy="${y1}" r="4" fill="${C.orange}"/>` +
    label(x2 + (anchor === 'start' ? 8 : -8), y2 + 6, text, { size: 17, anchor });
}

function page(title, sub, body, { w = 1920, h = 1080, dark = false } = {}) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;background:${dark ? C.dark : C.paper};font-family:Pretendard,sans-serif;color:${dark ? '#fff' : C.ink};overflow:hidden}
.top{position:absolute;top:44px;left:0;right:0;text-align:center;font-size:24px;font-weight:500;letter-spacing:-0.2px}
.h{position:absolute;top:96px;left:0;right:0;text-align:center;font-size:40px;font-weight:700;letter-spacing:-0.8px}
.s{position:absolute;top:154px;left:0;right:0;text-align:center;font-size:21px;color:${dark ? '#bbb' : C.mute}}
svg text,div{font-family:Pretendard,sans-serif;letter-spacing:-0.3px}
</style></head><body>
${title ? `<div class="top">${title}</div>` : ''}${sub ? `<div class="h">${sub[0]}</div><div class="s">${sub[1] || ''}</div>` : ''}
${body}
</body></html>`;
}

module.exports = { C, a1, child, adult, humanoid, dog, pet, label, callout, page };
