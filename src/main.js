// ============================================================
//  🔥 SIDDHANT BRAINROT CHAOS ENGINE v6.9.420 — QUANTUM ULTRA 🔥
// ============================================================

const IMGS = window.IMGS || [
  './src/1.jpeg','./src/2.jpeg','./src/3.jpeg','./src/4.jpeg','./src/5.jpeg',
  './src/6.jpeg','./src/7.jpeg','./src/8.jpeg','./src/9.jpeg','./src/10.jpeg'
]

const app = document.getElementById('app') || document.body
const canvas = document.getElementById('chaos-canvas')
const ctx = canvas ? canvas.getContext('2d') : null
const cursor = document.getElementById('cursor')
const W = () => window.innerWidth
const H = () => window.innerHeight

// ── GLOBAL STATE & CONTROLS (DECLARED FIRST TO PREVENT TDZ) ───
let globalSpeedMultiplier = 1.0
let totalRespectScore = 0
let totalAura = 1000000
const respectCounts = {}
const dvdBouncers = []
const floaters = []
const particles = []
const canvasImgObjs = IMGS.map(src => {
  const i = new Image()
  i.src = src
  return i
})

const resizeCanvas = () => {
  if (canvas) {
    canvas.width = W()
    canvas.height = H()
  }
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

// ── LORE ROSTER ──────────────────────────────────────────────
const NAMES = [
  'SIDDHANT','PAWAN ANNA','AWAN PANNA','MUDIGONDA',
  'MARUTI PRASAD','JD PRABHAKAR','MUKUNDH','YELLISHETTY',
  'RISHI BOBBILI','GITAM DEAN','CHAD SIDDHANT','SKIBIDI PRABHAKAR'
]

const RESPECT_LABELS = [
  ['SIDDHANT','🗿'],['GITAM','🏫'],['PAWAN ANNA','💀'],
  ['MUDIGONDA','🔥'],['RISHI BOBBILI','👑'],['MUKUNDH','🤝'],
  ['YELLISHETTY','⚡'],['MARUTI PRASAD','🫡'],['JD PRABHAKAR','💪'],
  ['GITAM UNIVERSITY','🎓'],['AWAN PANNA','🧠'],['SIDDHANT W','🏆'],
  ['SKIBIDI SIDDHANT','🚽'],['MUDIGONDA MATRIX','🕶️'],['CANTEEN BIRYANI','🍗'],
  ['0% ATTENDANCE','🚨'],['SIGMA BOBBILI','🗿'],['RIZZLER PRABHAKAR','✨'],
  ['OVER 9000 AURA','📈'],['PAWAN ANNA FINAL BOSS','👹'],['QUANTUM SIDDHANT','⚛️'],
  ['FANUM TAX GITAM','🍔'],['MEWING MARUTI','🤫'],['LUNGI POWER','🥋']
]

const BRAINROT_PROCLAMATIONS = [
  "📢 ALERT: SIDDHANT JUST PURCHASED GITAM UNIVERSITY FOR 2 RS!",
  "💀 BREAKING: PAWAN ANNA CANCELLED ALL SEMESTER EXAMS WITH A SINGLE WINK!",
  "🕶️ MUDIGONDA JUST COMPILED C++ INSIDE A MICROWAVE OVEN!",
  "🔥 RISHI BOBBILI'S JAWLINE DETECTED BY NASA SATELLITES!",
  "⚡ JD PRABHAKAR DEADLIFTED THE ENTIRE K-BLOCK WITH HIS PINKY!",
  "🧠 AWAN PANNA SOLVED QUANTUM GRAVITY WHILE DRINKING CANTEEN CHAI!",
  "🏆 ATTENDANCE UPDATE: YOU HAVE ATTENDED -420.69% OF CLASSES. DEAN IS CRYING!",
  "🗿 SIDDHANT ACCIDENTALLY DROPPED +10,000,000 AURA INTO THE HYDERABAD WATER SUPPLY!",
  "🏎️ MARUTI PRASAD OUTRAN A RAJDHANI EXPRESS ON AN ELECTRIC SCOOTER!",
  "👑 MUKUNDH DECLARED GITAM HYDERABAD AN INDEPENDENT EMPIRE!"
]

function randColor() { return `hsl(${Math.random()*360},100%,${50+Math.random()*30}%)` }
function randName()  { return NAMES[Math.floor(Math.random()*NAMES.length)] }
function randImg()   { return IMGS[Math.floor(Math.random()*IMGS.length)] }

// ── SYNTHETIC AUDIO ENGINE (100% PURE WEB AUDIO BS) ───────────
let audioCtx = null
function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) audioCtx = new AudioContextClass()
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Vine boom / Sub bass drop generator
function playBoomSound() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const gain = actx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.8)

    gain.gain.setValueAtTime(0.9, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85)

    osc.connect(gain)
    gain.connect(actx.destination)

    osc.start(now)
    osc.stop(now + 0.85)
  } catch (e) { /* audio fallback */ }
}

// High pitch retro blip
function playBlipSound(freq = 600) {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const gain = actx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.12)

    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

    osc.connect(gain)
    gain.connect(actx.destination)

    osc.start(now)
    osc.stop(now + 0.12)
  } catch (e) { /* audio fallback */ }
}

// Laser Pew Pew
function playLaserSound() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const gain = actx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(1200, now)
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.25)

    gain.gain.setValueAtTime(0.4, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    osc.connect(gain)
    gain.connect(actx.destination)

    osc.start(now)
    osc.stop(now + 0.25)
  } catch (e) { /* audio fallback */ }
}

// ── CURSOR ────────────────────────────────────────────────────
if (cursor) {
  const CURSOR_EMOJIS = ['🗿','💀','🤡','🧠','😭','🔥','👁️','🫡','👑','⚡','🚀','🍗']
  let cursorIdx = 0
  document.addEventListener('mousemove', e => {
    if (e && typeof e.clientX === 'number') {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }
  })
  setInterval(() => {
    cursorIdx = (cursorIdx + 1) % CURSOR_EMOJIS.length
    cursor.textContent = CURSOR_EMOJIS[cursorIdx]
  }, 500)
}

// ── BG (slow, dark cycle) ─────────────────────────────────────
const BG = ['#0a0015','#001100','#150000','#00101f','#111100','#0f000f','#140500','#031518']
let bgI = 0
setInterval(() => {
  bgI = (bgI + 1) % BG.length
  document.body.style.background = BG[bgI]
}, 2000)

// ── STYLES INJECTION ──────────────────────────────────────────
document.head.insertAdjacentHTML('beforeend', `<style>
  @keyframes tiledMove {
    0%   { transform:translate(0,0); }
    100% { transform:translate(-33.33%,-33.33%); }
  }
  @keyframes floatBounce {
    0%,100% { transform:translateY(0); }
    50%     { transform:translateY(-14px); }
  }
  @keyframes subtleGlow {
    0%,100% { box-shadow:0 0 12px 3px rgba(255,255,255,0.25); }
    50%     { box-shadow:0 0 30px 10px rgba(255,220,80,0.5); }
  }
  @keyframes respectPop {
    0%   { transform:scale(0) rotate(-10deg); opacity:0; }
    60%  { transform:scale(1.1) rotate(3deg);  opacity:1; }
    100% { transform:scale(1)   rotate(0deg);  opacity:1; }
  }
  @keyframes dvdHue {
    0%   { filter:hue-rotate(0deg)   saturate(1.4); }
    100% { filter:hue-rotate(360deg) saturate(1.4); }
  }
  @keyframes screenShake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    10% { transform: translate(-15px, -12px) rotate(-1deg); }
    20% { transform: translate(14px, 10px) rotate(1.5deg); }
    30% { transform: translate(-12px, 15px) rotate(-1deg); }
    40% { transform: translate(15px, -10px) rotate(1deg); }
    50% { transform: translate(-10px, -15px) rotate(-0.5deg); }
    60% { transform: translate(12px, 12px) rotate(1deg); }
    70% { transform: translate(-8px, 10px) rotate(-1deg); }
    80% { transform: translate(10px, -8px) rotate(0.5deg); }
    90% { transform: translate(-5px, 5px) rotate(0deg); }
  }
  @keyframes screenSpinAnim {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(0.85); }
    100% { transform: rotate(360deg) scale(1); }
  }
  @keyframes floatUpFade {
    0% { transform: translate(-50%, 0) scale(0.8); opacity: 1; }
    100% { transform: translate(-50%, -70px) scale(1.4); opacity: 0; }
  }
  @keyframes pulseGlow {
    0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(255,255,255,0.4); }
    50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(255,0,128,0.8); }
  }

  .shaking { animation: screenShake 0.6s cubic-bezier(.36,.07,.19,.97) both; }
  .spinning { animation: screenSpinAnim 2.5s ease-in-out both; }

  .respect-btn {
    position:fixed;
    padding:10px 16px;
    font-weight:900;
    font-family:'Impact',sans-serif;
    font-size:15px;
    text-transform:uppercase;
    border:3px solid;
    cursor:pointer;
    z-index:10000;
    letter-spacing:1px;
    animation:respectPop 0.4s ease-out forwards, floatBounce 2.5s ease-in-out infinite 0.4s;
    pointer-events:all !important;
    user-select:none;
    border-radius: 6px;
    transition: background 0.15s, color 0.15s;
  }
  .respect-btn:hover { filter:brightness(1.4); transform:scale(1.1) !important; }
  .respect-btn:active { transform:scale(0.92) !important; }

  /* CHAOS CONTROL PANEL */
  #chaos-hud {
    position: fixed;
    top: 36px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    z-index: 10002;
    pointer-events: all;
    background: rgba(0, 0, 0, 0.75);
    padding: 8px 14px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    box-shadow: 0 0 25px rgba(0,0,0,0.8);
    max-width: 96vw;
  }
  .chaos-btn {
    background: #111;
    color: #fff;
    border: 2px solid #555;
    padding: 8px 14px;
    font-family: 'Impact', sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 6px;
    pointer-events: all;
    transition: all 0.15s ease-in-out;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    user-select: none;
  }
  .chaos-btn:hover {
    transform: translateY(-2px) scale(1.05);
    border-color: #ff0055;
    box-shadow: 0 0 15px rgba(255,0,85,0.7);
    color: #ffff00;
  }
  .chaos-btn:active {
    transform: translateY(1px) scale(0.95);
  }

  /* STATS BANNER */
  #chaos-stats {
    position: fixed;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10002;
    background: rgba(10, 10, 10, 0.85);
    border: 2px solid #00ffcc;
    color: #00ffcc;
    padding: 6px 18px;
    border-radius: 20px;
    font-family: 'Courier New', monospace;
    font-weight: 900;
    font-size: 13px;
    letter-spacing: 1.5px;
    pointer-events: all;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0,255,204,0.4);
    animation: pulseGlow 3s infinite ease-in-out;
    user-select: none;
    white-space: nowrap;
  }

  /* AURA ORACLE TOAST */
  .toast-modal {
    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    background: linear-gradient(135deg, #ff007f, #7928ca, #00dfd8);
    padding: 16px 28px;
    border-radius: 12px;
    color: #fff;
    font-family: 'Impact', sans-serif;
    font-size: 20px;
    letter-spacing: 1.5px;
    text-shadow: 2px 2px 0 #000;
    z-index: 20000;
    pointer-events: none;
    opacity: 0;
    box-shadow: 0 0 40px rgba(255, 0, 128, 0.8);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-align: center;
    max-width: 85vw;
  }
  .toast-modal.show {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
</style>`)

// ════════════════════════════════════════════════════════════
//  WALLPAPER — big tiles, always fully visible
// ════════════════════════════════════════════════════════════
function buildWallpaper() {
  const SIZE = 200
  const cols = Math.ceil(W()/SIZE) + 2
  const rows = Math.ceil(H()/SIZE) + 2
  const wall = document.createElement('div')
  wall.id = 'wallpaper-grid'
  wall.style.cssText = `position:fixed;top:-${SIZE}px;left:-${SIZE}px;width:${(cols+1)*SIZE}px;height:${(rows+1)*SIZE}px;display:grid;grid-template-columns:repeat(${cols},${SIZE}px);grid-template-rows:repeat(${rows},${SIZE}px);z-index:0;pointer-events:none;gap:3px;`
  for (let i = 0; i < cols * rows; i++) {
    const img = document.createElement('img')
    img.src = randImg()
    img.style.cssText = `width:${SIZE}px;height:${SIZE}px;object-fit:cover;opacity:${0.7+Math.random()*0.3};display:block;`
    wall.appendChild(img)
  }
  app.appendChild(wall)
  setInterval(() => {
    wall.querySelectorAll('img').forEach(im => {
      if (Math.random() > 0.9) { im.src = randImg() }
    })
  }, 1500)
}

// ════════════════════════════════════════════════════════════
//  DIAGONAL SCROLLER
// ════════════════════════════════════════════════════════════
function buildTiledBg() {
  const wrap = document.createElement('div')
  wrap.style.cssText = `position:fixed;top:0;left:0;width:300%;height:300%;display:flex;flex-wrap:wrap;z-index:1;pointer-events:none;animation:tiledMove 18s linear infinite;`
  for (let i = 0; i < 100; i++) {
    const img = document.createElement('img')
    img.src = IMGS[i % IMGS.length]
    const s = 180 + Math.floor(Math.random() * 140)
    img.style.cssText = `width:${s}px;height:${s}px;object-fit:cover;opacity:${0.45+Math.random()*0.4};display:block;`
    wrap.appendChild(img)
  }
  app.appendChild(wrap)
}

// ════════════════════════════════════════════════════════════
//  FLOATING IMAGES — big, always opaque, slow drift
// ════════════════════════════════════════════════════════════
class FloatingImg {
  constructor() {
    this.el = null
    this.reset(true)
  }
  reset(initial = false) {
    this.w = 220 + Math.random() * 350
    this.h = this.w * (0.65 + Math.random() * 0.6)
    this.x = Math.random() * (W() - this.w)
    this.y = initial ? Math.random() * H() : H() + 50
    this.vx = (Math.random() - 0.5) * 1.8 * globalSpeedMultiplier
    this.vy = (initial ? (Math.random() - 0.5) * 1.5 : -0.5 - Math.random() * 1.5) * globalSpeedMultiplier
    this.rot = (Math.random() - 0.5) * 6
    this.rotSpeed = (Math.random() - 0.5) * 0.25 * globalSpeedMultiplier
    this.bouncing = true
    this.imgSrc = randImg()
    this.zIndex = 20 + Math.floor(Math.random() * 180)
  }
  mount() {
    const el = document.createElement('img')
    el.src = this.imgSrc
    el.style.cssText = `position:fixed;left:${this.x}px;top:${this.y}px;width:${this.w}px;height:${this.h}px;object-fit:cover;opacity:0.9;border-radius:6px;border:2px solid rgba(255,255,255,0.4);z-index:${this.zIndex};pointer-events:none;animation:subtleGlow 3s ease-in-out infinite;will-change:transform;`
    app.appendChild(el)
    this.el = el
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.rot += this.rotSpeed
    if (this.x <= 0) { this.x = 0; this.vx = Math.abs(this.vx) }
    if (this.x + this.w >= W()) { this.x = W() - this.w; this.vx = -Math.abs(this.vx) }
    if (this.y < -this.h - 100 || this.y > H() + 200) {
      if (this.el) this.el.remove()
      this.reset()
      this.mount()
    }
    if (this.el) {
      this.el.style.left = this.x + 'px'
      this.el.style.top = this.y + 'px'
      this.el.style.transform = `rotate(${this.rot}deg)`
    }
  }
}

// ════════════════════════════════════════════════════════════
//  DVD BOUNCE ENGINE
// ════════════════════════════════════════════════════════════
function buildDVDBouncer(imgSrc, size, startColor) {
  const el = document.createElement('img')
  el.src = imgSrc
  el.style.cssText = `position:fixed;width:${size}px;height:${size}px;object-fit:cover;z-index:600;pointer-events:all;cursor:pointer;border-radius:8px;animation:dvdHue 4s linear infinite;border:4px solid ${startColor || 'rgba(255,255,255,0.8)'};box-shadow:0 0 20px rgba(255,255,255,0.5);`
  document.body.appendChild(el)

  let x = Math.random() * (W() - size)
  let y = Math.random() * (H() - size)
  let vx = (2 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) * globalSpeedMultiplier
  let vy = (2 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) * globalSpeedMultiplier

  el.onclick = (e) => {
    e.stopPropagation()
    playBoomSound()
    explode(x + size / 2, y + size / 2, 40)
    addAura(500000)
    triggerScreenShake()
  }

  function tick() {
    x += vx * globalSpeedMultiplier
    y += vy * globalSpeedMultiplier
    let bounced = false
    if (x <= 0) { x = 0; vx = Math.abs(vx); bounced = true }
    if (x + size >= W()) { x = W() - size; vx = -Math.abs(vx); bounced = true }
    if (y <= 0) { y = 0; vy = Math.abs(vy); bounced = true }
    if (y + size >= H()) { y = H() - size; vy = -Math.abs(vy); bounced = true }
    if (bounced) {
      el.style.borderColor = randColor()
      el.style.boxShadow = `0 0 40px ${randColor()}`
      playBlipSound(180 + Math.random() * 400)
    }
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    requestAnimationFrame(tick)
  }
  tick()
  dvdBouncers.push(el)
  return el
}

// ════════════════════════════════════════════════════════════
//  MARQUEE BARS
// ════════════════════════════════════════════════════════════
function addMarqueeBar(text, topPct, speed, color, bg) {
  const wrap = document.createElement('div')
  wrap.style.cssText = `position:fixed;top:${topPct}%;left:0;right:0;overflow:hidden;white-space:nowrap;background:${bg};color:${color};font-size:13px;font-weight:700;padding:3px 0;z-index:8500;font-family:Impact,sans-serif;letter-spacing:3px;pointer-events:none;`
  const inner = document.createElement('div')
  inner.style.cssText = 'display:inline-block;white-space:nowrap;'
  inner.textContent = (text + '    ').repeat(20)
  wrap.appendChild(inner)
  document.body.appendChild(wrap)
  let pos = 0
  ;(function run() {
    pos -= speed * globalSpeedMultiplier
    if (Math.abs(pos) > inner.scrollWidth / 2) pos = 0
    inner.style.transform = `translateX(${pos}px)`
    requestAnimationFrame(run)
  })()
}

// ════════════════════════════════════════════════════════════
//  HUD & FLOATING TEXTS
// ════════════════════════════════════════════════════════════
function updateStatsHUD() {
  const hud = document.getElementById('chaos-stats')
  if (hud) {
    hud.innerHTML = `🗿 RESPECTS: ${totalRespectScore.toLocaleString()} | ⚡ AURA: +${totalAura.toLocaleString()} | 👑 SIDDHANT: SUPREME`
  }
}

function addAura(pts) {
  totalAura += pts
  updateStatsHUD()
}

function spawnFloatingText(text, x, y, color = '#ffeb3b') {
  const el = document.createElement('div')
  el.textContent = text
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;color:${color};font-family:Impact,sans-serif;font-size:22px;pointer-events:none;z-index:25000;text-shadow:2px 2px 4px #000;animation:floatUpFade 1s cubic-bezier(0.2,0.8,0.2,1) forwards;font-weight:900;letter-spacing:1px;`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1000)
}

// ════════════════════════════════════════════════════════════
//  RESPECT BUTTONS GENERATOR
// ════════════════════════════════════════════════════════════
function spawnRespectBtn() {
  const [name, emoji] = RESPECT_LABELS[Math.floor(Math.random() * RESPECT_LABELS.length)]
  if (!respectCounts[name]) respectCounts[name] = 0
  const btn = document.createElement('button')
  const x = 50 + Math.random() * (W() - 240)
  const y = 75 + Math.random() * (H() - 180)
  const hue = Math.floor(Math.random() * 360)
  btn.className = 'respect-btn'
  btn.style.left = x + 'px'
  btn.style.top = y + 'px'
  btn.style.background = `hsl(${hue},70%,18%)`
  btn.style.color = `hsl(${hue},100%,78%)`
  btn.style.borderColor = `hsl(${hue},100%,55%)`
  btn.style.transform = `rotate(${(Math.random()-0.5)*14}deg)`
  btn.innerHTML = `${emoji} ${name}<br><small style="font-size:11px;font-weight:400;opacity:0.75;">${respectCounts[name]} respects</small>`

  btn.onclick = (e) => {
    e.stopPropagation()
    respectCounts[name]++
    totalRespectScore++
    addAura(100000)
    playBlipSound(440 + Math.random() * 600)
    spawnFloatingText(`+1 RESPECT 🗿`, e.clientX, e.clientY)

    btn.innerHTML = `${emoji} ${name}<br><small style="font-size:11px;font-weight:400;opacity:0.75;">${respectCounts[name]} respects ✅</small>`
    for (let i = 0; i < 26; i++) particles.push(new Particle(x + 80, y + 25))
    btn.style.background = `hsl(${hue},100%,45%)`
    btn.style.color = '#000'
    setTimeout(() => {
      btn.style.background = `hsl(${hue},70%,18%)`
      btn.style.color = `hsl(${hue},100%,78%)`
    }, 350)
  }
  document.body.appendChild(btn)
  setTimeout(() => {
    btn.remove()
    spawnRespectBtn()
  }, 10000 + Math.random() * 10000)
}

// ════════════════════════════════════════════════════════════
//  CANVAS PARTICLES ENGINE
// ════════════════════════════════════════════════════════════
class Particle {
  constructor(x, y, boost = 1) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 22 * boost
    this.vy = (Math.random() - 0.5) * 22 * boost
    this.life = 1
    this.decay = 0.016 + Math.random() * 0.024
    this.size = (60 + Math.random() * 150) * Math.min(boost, 1.8)
    this.img = canvasImgObjs[Math.floor(Math.random() * canvasImgObjs.length)]
    this.rot = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.14
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.55
    this.life -= this.decay
    this.rot += this.rotSpeed
    this.vx *= 0.97
  }
  draw() {
    if (!ctx || this.life <= 0) return
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.life)
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rot)
    if (this.img) {
      ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size)
    }
    ctx.restore()
  }
}

function explode(x, y, n = 20, boost = 1) {
  for (let i = 0; i < n; i++) particles.push(new Particle(x, y, boost))
}

document.addEventListener('click', e => {
  if (!e.target.closest('button') && !e.target.closest('#chaos-hud') && !e.target.closest('#chaos-stats')) {
    playLaserSound()
    explode(e.clientX, e.clientY, 22)
  }
})

document.addEventListener('wheel', e => {
  e.preventDefault()
  explode(Math.random() * W(), Math.random() * H(), 12)
}, { passive: false })

// ════════════════════════════════════════════════════════════
//  SCREEN EFFECTS & CHAOS ACTIONS
// ════════════════════════════════════════════════════════════
function triggerScreenShake() {
  document.body.classList.remove('shaking')
  void document.body.offsetWidth
  document.body.classList.add('shaking')
  setTimeout(() => document.body.classList.remove('shaking'), 600)
}

function triggerScreenSpin() {
  app.classList.remove('spinning')
  void app.offsetWidth
  app.classList.add('spinning')
  setTimeout(() => app.classList.remove('spinning'), 2500)
}

function showToast(msg) {
  let toast = document.querySelector('.toast-modal')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'toast-modal'
    document.body.appendChild(toast)
  }
  toast.textContent = msg
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 3800)
}

// ════════════════════════════════════════════════════════════
//  CHAOS FUNCTIONALITY BUTTONS
// ════════════════════════════════════════════════════════════
function buildChaosControls() {
  const hud = document.createElement('div')
  hud.id = 'chaos-hud'

  const actions = [
    {
      label: 'TACTICAL NUKE',
      icon: '💥',
      color: '#ff0033',
      action: () => {
        playBoomSound()
        triggerScreenShake()
        addAura(10000000)
        showToast("☢️ TACTICAL SIDDHANT NUKE DETONATED IN GITAM HYDERABAD!")
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            explode(Math.random() * W(), Math.random() * H(), 45, 1.8)
          }, i * 120)
        }
      }
    },
    {
      label: 'VINE BOOM',
      icon: '🔊',
      color: '#ffaa00',
      action: () => {
        playBoomSound()
        triggerScreenShake()
        explode(W() / 2, H() / 2, 50, 1.5)
        addAura(250000)
      }
    },
    {
      label: 'SPINOCALYPSE',
      icon: '🌪️',
      color: '#00e5ff',
      action: () => {
        playLaserSound()
        triggerScreenSpin()
        showToast("🌀 REALITY DISTORTION FIELD AT 420% RPM!")
        addAura(500000)
      }
    },
    {
      label: 'SUMMON DVD',
      icon: '🗿',
      color: '#e040fb',
      action: () => {
        playBlipSound(880)
        buildDVDBouncer(randImg(), 200 + Math.random() * 120, randColor())
        showToast("✨ A NEW SIDDHANT BOUNCER HAS ENTERED THE MATRIX!")
        addAura(300000)
      }
    },
    {
      label: 'TURBO 3X',
      icon: '⚡',
      color: '#ffeb3b',
      action: () => {
        playLaserSound()
        globalSpeedMultiplier = 3.5
        showToast("⚡ OVERCLOCK ACTIVATED: 3.5X RELATIVISTIC VELOCITY!")
        setTimeout(() => {
          globalSpeedMultiplier = 1.0
        }, 5000)
      }
    },
    {
      label: 'AURA ORACLE',
      icon: '🔮',
      color: '#76ff03',
      action: () => {
        playBlipSound(700)
        const proclamation = BRAINROT_PROCLAMATIONS[Math.floor(Math.random() * BRAINROT_PROCLAMATIONS.length)]
        showToast(proclamation)
        addAura(777777)
      }
    },
    {
      label: 'PARTY DISCO',
      icon: '🪩',
      color: '#ff4081',
      action: () => {
        playLaserSound()
        let count = 0
        const interval = setInterval(() => {
          document.body.style.filter = `invert(${Math.random() > 0.5 ? 1 : 0}) hue-rotate(${Math.random() * 360}deg)`
          count++
          if (count > 18) {
            clearInterval(interval)
            document.body.style.filter = 'none'
          }
        }, 150)
      }
    },
    {
      label: 'RESET PURGE',
      icon: '🧼',
      color: '#ffffff',
      action: () => {
        particles.length = 0
        explode(W() / 2, H() / 2, 30)
        showToast("🧹 THE SIMULATION HAS BEEN SCRUBBED SQUEAKY CLEAN!")
      }
    }
  ]

  actions.forEach(act => {
    const btn = document.createElement('button')
    btn.className = 'chaos-btn'
    btn.innerHTML = `<span>${act.icon}</span> <span>${act.label}</span>`
    btn.style.borderColor = act.color
    btn.onclick = (e) => {
      e.stopPropagation()
      act.action()
    }
    hud.appendChild(btn)
  })

  document.body.appendChild(hud)

  // STATS HUD BAR
  const stats = document.createElement('div')
  stats.id = 'chaos-stats'
  stats.title = "Click to absorb infinite aura"
  stats.onclick = (e) => {
    e.stopPropagation()
    addAura(1000000)
    playBlipSound(990)
    spawnFloatingText("+1,000,000 AURA ✨", e.clientX, e.clientY, '#00ffcc')
    explode(e.clientX, e.clientY, 15)
  }
  document.body.appendChild(stats)
  updateStatsHUD()
}

// ════════════════════════════════════════════════════════════
//  KEYBOARD BS SHORTCUTS
// ════════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  const k = e.key.toUpperCase()
  if (k === 'B') {
    playBoomSound()
    triggerScreenShake()
    explode(W() / 2, H() / 2, 35)
  } else if (k === 'N') {
    playBoomSound()
    triggerScreenShake()
    explode(W() / 2, H() / 2, 100, 2)
    showToast("☢️ KEYBOARD NUKE INITIATED!")
  } else if (k === 'S') {
    buildDVDBouncer(randImg(), 220, randColor())
  } else if (k === 'T') {
    globalSpeedMultiplier = globalSpeedMultiplier === 1.0 ? 3.5 : 1.0
  } else if (k === ' ') {
    explode(Math.random() * W(), Math.random() * H(), 30)
  }
})

// ════════════════════════════════════════════════════════════
//  SOME ADVANCED BS SCIENTIFIC CALCULATIONS & CONSOLE EASTER EGGS
// ════════════════════════════════════════════════════════════
function calculateSiddhantSigmaQuotient() {
  const tau = Math.PI * 2
  const mudigondaTensor = Math.sin(Date.now() / 1000) * 420
  const pawanAnnaEigenvalue = Math.cos(Date.now() / 690) * 1337
  const attendanceDecayRate = Math.exp(-0.00001 * totalRespectScore)
  return ((mudigondaTensor ** 2 + pawanAnnaEigenvalue ** 2) * attendanceDecayRate * tau).toFixed(4)
}

function pawanAnnaHarmonicConvergence() {
  return `Convergence confirmed: Sigma quotient = ${calculateSiddhantSigmaQuotient()} mega-chads per second.`
}

// Periodic BS log to console
setInterval(() => {
  const bsQuotes = [
    `[QUANTUM SIDDHANT KERNEL] Sigma Index: ${calculateSiddhantSigmaQuotient()} | Gitam Firewall Status: OVERRIDDEN`,
    `[PAWAN ANNA MONITOR] Aura level fluxuating around ${totalAura} micro-Mewings`,
    `[CANTEEN SATELLITE] 100% chance of biryani detected in South Hyderabad campus`,
    `[MUDIGONDA COMPILED] Successfully mapped 10 JPEG particles onto 11th dimension`
  ]
  console.log(`%c ${bsQuotes[Math.floor(Math.random() * bsQuotes.length)]} `, 'background: #222; color: #00ffaa; font-family: monospace; padding: 4px;')
}, 6000)

// ── TITLE CYCLE ───────────────────────────────────────────────
let ti = 0
setInterval(() => {
  ti = (ti + 1) % NAMES.length
  document.title = NAMES[ti] + ' 🔥'
}, 1200)

// ════════════════════════════════════════════════════════════
//  INIT ALL LAYERS
// ════════════════════════════════════════════════════════════
function initEngine() {
  buildWallpaper()
  buildTiledBg()
  addMarqueeBar('🔥 SIDDHANT 🔥 PAWAN ANNA 🔥 MUDIGONDA 🔥 RISHI BOBBILI 🔥 MUKUNDH 🔥 YELLISHETTY 🔥', 0, 2, '#000', 'rgba(255,220,0,0.92)')
  addMarqueeBar('💀 MARUTI PRASAD 💀 JD PRABHAKAR 💀 MUKUNDH 💀 YELLISHETTY 💀 AWAN PANNA 💀', 96.2, 2.5, '#fff', 'rgba(180,0,0,0.92)')
  buildChaosControls()

  // 50 big floating images
  for (let i = 0; i < 50; i++) {
    const f = new FloatingImg()
    f.mount()
    floaters.push(f)
  }

  // DVD bouncers — img 2 (index 1) and img 8 (index 7)
  buildDVDBouncer(IMGS[1 % IMGS.length], 260, '#ff0')
  buildDVDBouncer(IMGS[7 % IMGS.length], 220, '#0ff')

  // 12 respect buttons scattered around
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnRespectBtn(), i * 250)
  }

  // Scanline overlay
  const sl = document.createElement('div')
  sl.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px);pointer-events:none;z-index:9000;`
  document.body.appendChild(sl)

  // ── MAIN LOOP ──
  let frame = 0
  function loop() {
    requestAnimationFrame(loop)
    frame++

    if (ctx) {
      ctx.clearRect(0, 0, W(), H())
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].life <= 0) particles.splice(i, 1)
      }
    }

    floaters.forEach(f => f.update())

    if (frame % 80 === 0 && floaters.length < 75) {
      const f = new FloatingImg()
      f.mount()
      floaters.push(f)
    }
  }
  loop()

  console.log(`%c
  ███████╗██╗██████╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗████████╗
  ██╔════╝██║██╔══██╗██╔══██╗██║  ██║██╔══██╗████╗  ██║╚══██╔══╝
  ███████╗██║██║  ██║██║  ██║███████║███████║██╔██╗ ██║   ██║   
  ╚════██║██║██║  ██║██║  ██║██╔══██║██╔══██║██║╚██╗██║   ██║   
  ███████║██║██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚████║   ██║   
  ╚══════╝╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   
  `, 'color: #ff0055; font-weight: bold;')
  console.log('%c 🔥 SIDDHANT ENGINE v6.9.420 LOADED — AURA CERTIFIED 🗿', 'font-size:20px;font-weight:900;color:#ffff00;background:#000;padding:10px;border:2px solid #ff0055;')
  console.log(pawanAnnaHarmonicConvergence())
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine)
} else {
  initEngine()
}
