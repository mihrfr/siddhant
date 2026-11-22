// ============================================================
//  🔥 SIDDHANT BRAINROT CHAOS ENGINE — AUTHENTIC MEME EDITION 🔥
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

// ── GLOBAL STATE & CONTROLS (DECLARED FIRST) ──────────────────
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

// ── AUTHENTIC GROUP LORE ROSTER (NO TIKTOK WORDS) ─────────────
const NAMES = [
  'SIDDHANT','PAWAN ANNA','AWAN PANNA','MUDIGONDA',
  'MARUTI PRASAD','JD PRABHAKAR','MUKUNDH','YELLISHETTY',
  'RISHI BOBBILI','GITAM DEAN','CHAD SIDDHANT','K-BLOCK BOSS'
]

const RESPECT_LABELS = [
  ['SIDDHANT SUPREME','🗿'],
  ['GITAM UNIVERSITY','🏫'],
  ['PAWAN ANNA FINAL BOSS','💀'],
  ['MUDIGONDA MATRIX','🔥'],
  ['RISHI BOBBILI','👑'],
  ['MUKUNDH POWER','🤝'],
  ['YELLISHETTY OVERDRIVE','⚡'],
  ['MARUTI PRASAD SPEED','🏎️'],
  ['JD PRABHAKAR 9999 HP','💪'],
  ['AWAN PANNA PARADOX','🧠'],
  ['SIDDHANT W','🏆'],
  ['K-BLOCK CONCLAVE','🚬'],
  ['CANTEEN CHICKEN BIRYANI','🍗'],
  ['0% ATTENDANCE DETAINED','🚨'],
  ['CHAD BOBBILI','🗿'],
  ['PRABHAKAR 200KG BENCH','🦾'],
  ['OVER 9000 AURA','📈'],
  ['HALL TICKET CONFISCATED','📄'],
  ['QUANTUM SIDDHANT','⚛️'],
  ['GITAM BUS NO. 69','🚌'],
  ['MARUTI FULL THROTTLE','💨'],
  ['LUNGI SUPREMACY','🥋'],
  ['SOUTH HYDERABAD CAMPUS','📍'],
  ['LAB VIVA SURVIVOR','🧪']
]

const BRAINROT_PROCLAMATIONS = [
  "📢 ALERT: SIDDHANT JUST PURCHASED GITAM UNIVERSITY FOR 2 RS!",
  "💀 BREAKING: PAWAN ANNA CANCELLED ALL SEMESTER EXAMS WITH A SINGLE NOD!",
  "🕶️ MUDIGONDA JUST COMPILED C++ INSIDE A MICROWAVE OVEN!",
  "🔥 RISHI BOBBILI DETECTED BY NASA SATELLITES IN K-BLOCK!",
  "⚡ JD PRABHAKAR DEADLIFTED THE ENTIRE GITAM ADMIN BLOCK WITH HIS PINKY!",
  "🧠 AWAN PANNA SOLVED QUANTUM GRAVITY WHILE DRINKING CANTEEN CHAI!",
  "🏆 ATTENDANCE UPDATE: -420.69% RECORDED. HOD IS PERSONALLY WEEPING!",
  "🗿 SIDDHANT ACCIDENTALLY DROPPED +10,000,000 AURA INTO THE HYDERABAD WATER SUPPLY!",
  "🏎️ MARUTI PRASAD OUTRAN A RAJDHANI EXPRESS ON AN ACTIVA!",
  "👑 MUKUNDH DECLARED GITAM HYDERABAD AN INDEPENDENT NUCLEAR POWER!"
]

function randColor() { return `hsl(${Math.random()*360},100%,${50+Math.random()*30}%)` }
function randName()  { return NAMES[Math.floor(Math.random()*NAMES.length)] }
function randImg()   { return IMGS[Math.floor(Math.random()*IMGS.length)] }

// ════════════════════════════════════════════════════════════
//  AUTHENTIC MEME AUDIO SYNTHESIZER ENGINE (100% PURE WEB AUDIO)
// ════════════════════════════════════════════════════════════
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

// 1. ACTUAL AUTHENTIC VINE BOOM (Punchy Click + 808 Sub Pitch Drop + Brown Noise Rumble + Distortion)
function playVineBoom() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime

    // --- Sub-Bass Dive ---
    const osc = actx.createOscillator()
    const oscGain = actx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(115, now)
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.95)

    // Distortion shaper for thick boom warmth
    const distortion = actx.createWaveShaper()
    const n = 2048
    const curve = new Float32Array(n)
    for (let i = 0; i < n; ++i) {
      let x = (i * 2) / n - 1
      curve[i] = (Math.PI + 40) * x / (Math.PI + 40 * Math.abs(x))
    }
    distortion.curve = curve

    oscGain.gain.setValueAtTime(1.4, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

    osc.connect(distortion)
    distortion.connect(oscGain)
    oscGain.connect(actx.destination)

    osc.start(now)
    osc.stop(now + 1.25)

    // --- Low Frequency Brown Noise Cavern Rumble ---
    const bufLen = Math.floor(actx.sampleRate * 1.3)
    const noiseBuffer = actx.createBuffer(1, bufLen, actx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    let b0 = 0
    for (let i = 0; i < bufLen; i++) {
      let white = Math.random() * 2 - 1
      b0 = (b0 + (0.04 * white)) / 1.04
      data[i] = b0 * 4.0
    }
    const noiseNode = actx.createBufferSource()
    noiseNode.buffer = noiseBuffer

    const filter = actx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(280, now)
    filter.frequency.exponentialRampToValueAtTime(35, now + 1.2)

    const noiseGain = actx.createGain()
    noiseGain.gain.setValueAtTime(1.1, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25)

    noiseNode.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(actx.destination)

    noiseNode.start(now)
    noiseNode.stop(now + 1.3)
  } catch (e) { /* ignore */ }
}

// 2. METAL PIPE FALLING (Dissonant high metallic clang + ringmod)
function playMetalPipe() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const freqs = [620, 940, 1250, 1780, 2600, 3450, 4800]
    freqs.forEach((f, idx) => {
      const osc = actx.createOscillator()
      const g = actx.createGain()
      osc.type = idx % 2 === 0 ? 'square' : 'sawtooth'
      osc.frequency.setValueAtTime(f + (Math.random() - 0.5) * 60, now)
      osc.frequency.exponentialRampToValueAtTime(f * 0.75, now + 1.5)

      const bp = actx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = f
      bp.Q.value = 14

      g.gain.setValueAtTime(0.25 / (idx + 1), now)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + Math.random() * 0.4)

      osc.connect(bp)
      bp.connect(g)
      g.connect(actx.destination)

      osc.start(now)
      osc.stop(now + 1.6)
    })
  } catch (e) { /* ignore */ }
}

// 3. MLG AIRHORN (Classic 5-note fanfare)
function playAirhorn() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const baseFreq = 466.16 // Bb4
    const notes = [baseFreq, baseFreq, baseFreq, baseFreq * 1.334, baseFreq * 1.5]
    notes.forEach((p, i) => {
      const t = actx.currentTime + (i * 0.12)
      const osc1 = actx.createOscillator()
      const osc2 = actx.createOscillator()
      const g = actx.createGain()

      osc1.type = 'sawtooth'
      osc2.type = 'sawtooth'
      osc1.frequency.setValueAtTime(p, t)
      osc2.frequency.setValueAtTime(p * 1.012, t)

      g.gain.setValueAtTime(0.35, t)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.13)

      osc1.connect(g)
      osc2.connect(g)
      g.connect(actx.destination)

      osc1.start(t)
      osc2.start(t)
      osc1.stop(t + 0.14)
      osc2.stop(t + 0.14)
    })
  } catch (e) { /* ignore */ }
}

// 4. BRUH SOUND (Formant vocal synthesis)
function playBruh() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const g = actx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.exponentialRampToValueAtTime(88, now + 0.7)

    const f1 = actx.createBiquadFilter()
    f1.type = 'bandpass'
    f1.frequency.setValueAtTime(450, now)
    f1.frequency.exponentialRampToValueAtTime(320, now + 0.7)
    f1.Q.value = 6.0

    const f2 = actx.createBiquadFilter()
    f2.type = 'bandpass'
    f2.frequency.setValueAtTime(950, now)
    f2.frequency.exponentialRampToValueAtTime(600, now + 0.7)
    f2.Q.value = 7.0

    g.gain.setValueAtTime(0.9, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.75)

    osc.connect(f1)
    osc.connect(f2)
    f1.connect(g)
    f2.connect(g)
    g.connect(actx.destination)

    osc.start(now)
    osc.stop(now + 0.78)
  } catch (e) { /* ignore */ }
}

// 5. REVERB FART (FM flutter sweep)
function playReverbFart() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const mod = actx.createOscillator()
    const modGain = actx.createGain()
    const g = actx.createGain()

    mod.frequency.setValueAtTime(28, now)
    modGain.gain.setValueAtTime(60, now)
    mod.connect(osc.frequency)

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(95, now)
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.85)

    g.gain.setValueAtTime(0.9, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 1.2)

    osc.connect(g)
    g.connect(actx.destination)

    mod.start(now)
    osc.start(now)
    mod.stop(now + 1.2)
    osc.stop(now + 1.2)
  } catch (e) { /* ignore */ }
}

// 6. TACO BELL BONG (Bronze gong ring)
function playTacoBell() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const tones = [220, 440, 665, 888, 1240]
    tones.forEach((freq, idx) => {
      const osc = actx.createOscillator()
      const g = actx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      g.gain.setValueAtTime(0.4 / (idx + 1), now)
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.5)
      osc.connect(g)
      g.connect(actx.destination)
      osc.start(now)
      osc.stop(now + 2.6)
    })
  } catch (e) { /* ignore */ }
}

// 7. CARTOON BONK
function playBonk() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const g = actx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.16)
    g.gain.setValueAtTime(0.9, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
    osc.connect(g)
    g.connect(actx.destination)
    osc.start(now)
    osc.stop(now + 0.2)
  } catch (e) { /* ignore */ }
}

// 8. BOING
function playBoing() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    const osc = actx.createOscillator()
    const g = actx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(160, now)
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.35)
    g.gain.setValueAtTime(0.7, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.38)
    osc.connect(g)
    g.connect(actx.destination)
    osc.start(now)
    osc.stop(now + 0.4)
  } catch (e) { /* ignore */ }
}

// 9. WINDOWS ERROR CHORD
function playWindowsError() {
  try {
    const actx = getAudioCtx()
    if (!actx) return
    const now = actx.currentTime
    ;[146, 185, 220].forEach(f => {
      const osc = actx.createOscillator()
      const g = actx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(f, now)
      g.gain.setValueAtTime(0.35, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.32)
      osc.connect(g)
      g.connect(actx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    })
  } catch (e) { /* ignore */ }
}

// SOUND BANK TO TRIGGER FOR RANDOM BRAINROT
const RANDOM_MEME_SOUNDS = [
  playVineBoom,
  playMetalPipe,
  playAirhorn,
  playBruh,
  playReverbFart,
  playTacoBell,
  playBonk,
  playBoing,
  playWindowsError
]

function playRandomMemeSound() {
  const soundFn = RANDOM_MEME_SOUNDS[Math.floor(Math.random() * RANDOM_MEME_SOUNDS.length)]
  soundFn()
}

// ── CURSOR ────────────────────────────────────────────────────
if (cursor) {
  const CURSOR_EMOJIS = ['🗿','💀','🤡','🧠','😭','🔥','👁️','🫡','👑','⚡','🍗','🥋']
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

// ── RAW UNHINGED RETRO MEME STYLES (NOT VIBECODED) ────────────
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
    10% { transform: translate(-18px, -15px) rotate(-1.5deg); }
    20% { transform: translate(16px, 14px) rotate(2deg); }
    30% { transform: translate(-14px, 18px) rotate(-1.5deg); }
    40% { transform: translate(18px, -14px) rotate(1.5deg); }
    50% { transform: translate(-14px, -18px) rotate(-1deg); }
    60% { transform: translate(15px, 15px) rotate(1.5deg); }
    70% { transform: translate(-10px, 12px) rotate(-1deg); }
    80% { transform: translate(12px, -10px) rotate(0.8deg); }
    90% { transform: translate(-6px, 6px) rotate(0deg); }
  }
  @keyframes screenSpinAnim {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(0.8); }
    100% { transform: rotate(360deg) scale(1); }
  }
  @keyframes floatUpFade {
    0% { transform: translate(-50%, 0) scale(0.8); opacity: 1; }
    100% { transform: translate(-50%, -85px) scale(1.5); opacity: 0; }
  }
  @keyframes sirenAlert {
    0%, 100% { background: #ff0000; color: #fff; }
    50% { background: #0000ff; color: #ffff00; }
  }

  .shaking { animation: screenShake 0.65s cubic-bezier(.36,.07,.19,.97) both; }
  .spinning { animation: screenSpinAnim 2.5s ease-in-out both; }

  /* RESPECT BUTTONS — BIGGER, UN-VIBECODED RETRO MEME */
  .respect-btn {
    position: fixed;
    padding: 14px 22px;
    font-weight: 900;
    font-family: 'Impact', 'Comic Sans MS', sans-serif;
    font-size: 17px;
    text-transform: uppercase;
    border: 4px solid #000;
    box-shadow: 6px 6px 0px #000;
    cursor: pointer;
    z-index: 10000;
    letter-spacing: 1px;
    border-radius: 0px;
    pointer-events: all !important;
    user-select: none;
    transition: transform 0.05s, box-shadow 0.05s;
    animation: respectPop 0.4s ease-out forwards, floatBounce 2.5s ease-in-out infinite 0.4s;
  }
  .respect-btn:hover {
    filter: brightness(1.25);
    transform: scale(1.1) !important;
  }
  .respect-btn:active {
    transform: translate(4px, 4px) scale(0.95) !important;
    box-shadow: 2px 2px 0px #000;
  }

  /* RAW UNHINGED MEME COCKPIT (NOT VIBECODED) */
  #chaos-hud {
    position: fixed;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    z-index: 10002;
    pointer-events: all;
    background: #ffeb3b;
    padding: 10px 14px;
    border: 5px solid #000;
    box-shadow: 8px 8px 0px #000;
    max-width: 98vw;
  }
  .chaos-btn {
    background: #fff;
    color: #000;
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    padding: 11px 18px;
    font-family: 'Impact', 'Comic Sans MS', sans-serif;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    border-radius: 0px;
    pointer-events: all;
    transition: transform 0.05s, box-shadow 0.05s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    user-select: none;
  }
  .chaos-btn:hover {
    background: #00ff66;
    color: #000;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #000;
  }
  .chaos-btn:active {
    transform: translate(3px, 3px);
    box-shadow: 1px 1px 0px #000;
    background: #ff0055;
    color: #fff;
  }

  /* ARCADE STATS BANNER */
  #chaos-stats {
    position: fixed;
    bottom: 34px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10002;
    background: #000;
    border: 4px solid #00ff66;
    color: #00ff66;
    padding: 8px 24px;
    border-radius: 0px;
    font-family: 'Impact', monospace;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 2px;
    pointer-events: all;
    cursor: pointer;
    box-shadow: 6px 6px 0px #ff0055;
    user-select: none;
    white-space: nowrap;
  }
  #chaos-stats:hover {
    background: #00ff66;
    color: #000;
  }

  /* TOAST BANNER */
  .toast-modal {
    position: fixed;
    top: 130px;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    background: #ff0055;
    padding: 18px 32px;
    border: 5px solid #000;
    box-shadow: 8px 8px 0px #000;
    color: #fff;
    font-family: 'Impact', sans-serif;
    font-size: 22px;
    letter-spacing: 1.5px;
    z-index: 20000;
    pointer-events: none;
    opacity: 0;
    transition: all 0.25s ease-out;
    text-align: center;
    max-width: 90vw;
  }
  .toast-modal.show {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
</style>`)

// ════════════════════════════════════════════════════════════
//  WALLPAPER — big tiles
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
//  FLOATING IMAGES
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
    el.style.cssText = `position:fixed;left:${this.x}px;top:${this.y}px;width:${this.w}px;height:${this.h}px;object-fit:cover;opacity:0.9;border-radius:0px;border:3px solid #000;box-shadow:4px 4px 0px #000;z-index:${this.zIndex};pointer-events:none;animation:subtleGlow 3s ease-in-out infinite;will-change:transform;`
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
  el.style.cssText = `position:fixed;width:${size}px;height:${size}px;object-fit:cover;z-index:600;pointer-events:all;cursor:pointer;border-radius:0px;animation:dvdHue 4s linear infinite;border:5px solid ${startColor || '#ff0055'};box-shadow:6px 6px 0px #000;`
  document.body.appendChild(el)

  let x = Math.random() * (W() - size)
  let y = Math.random() * (H() - size)
  let vx = (2 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) * globalSpeedMultiplier
  let vy = (2 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) * globalSpeedMultiplier

  el.onclick = (e) => {
    e.stopPropagation()
    playVineBoom()
    explode(x + size / 2, y + size / 2, 45)
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
      playBonk()
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
  wrap.style.cssText = `position:fixed;top:${topPct}%;left:0;right:0;overflow:hidden;white-space:nowrap;background:${bg};color:${color};font-size:14px;font-weight:900;padding:4px 0;z-index:8500;font-family:Impact,sans-serif;letter-spacing:3px;pointer-events:none;border-top:2px solid #000;border-bottom:2px solid #000;`
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
    hud.innerHTML = `🗿 RESPECTS: ${totalRespectScore.toLocaleString()} | ⚡ AURA: +${totalAura.toLocaleString()} | 👑 SIDDHANT SUPREME`
  }
}

function addAura(pts) {
  totalAura += pts
  updateStatsHUD()
}

function spawnFloatingText(text, x, y, color = '#ffff00') {
  const el = document.createElement('div')
  el.textContent = text
  el.style.cssText = `position:fixed;left:${x}px;top:${y}px;color:${color};font-family:Impact,sans-serif;font-size:26px;pointer-events:none;z-index:25000;text-shadow:3px 3px 0px #000;animation:floatUpFade 1s cubic-bezier(0.2,0.8,0.2,1) forwards;font-weight:900;letter-spacing:1px;`
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
  const x = 50 + Math.random() * (W() - 280)
  const y = 85 + Math.random() * (H() - 190)
  const hue = Math.floor(Math.random() * 360)
  btn.className = 'respect-btn'
  btn.style.left = x + 'px'
  btn.style.top = y + 'px'
  btn.style.background = `hsl(${hue},90%,35%)`
  btn.style.color = `#fff`
  btn.style.borderColor = `#000`
  btn.style.transform = `rotate(${(Math.random()-0.5)*14}deg)`
  btn.innerHTML = `${emoji} ${name}<br><small style="font-size:12px;font-weight:700;background:#000;color:#ffff00;padding:2px 6px;display:inline-block;margin-top:4px;">${respectCounts[name]} RESPECTS</small>`

  btn.onclick = (e) => {
    e.stopPropagation()
    respectCounts[name]++
    totalRespectScore++
    addAura(100000)
    playRandomMemeSound()
    spawnFloatingText(`+1 RESPECT 🗿`, e.clientX, e.clientY)

    btn.innerHTML = `${emoji} ${name}<br><small style="font-size:12px;font-weight:700;background:#000;color:#00ff66;padding:2px 6px;display:inline-block;margin-top:4px;">${respectCounts[name]} RESPECTS ✅</small>`
    for (let i = 0; i < 28; i++) particles.push(new Particle(x + 80, y + 25))
    btn.style.background = `#ffff00`
    btn.style.color = '#000'
    setTimeout(() => {
      btn.style.background = `hsl(${hue},90%,35%)`
      btn.style.color = `#fff`
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
    this.vx = (Math.random() - 0.5) * 24 * boost
    this.vy = (Math.random() - 0.5) * 24 * boost
    this.life = 1
    this.decay = 0.016 + Math.random() * 0.024
    this.size = (70 + Math.random() * 160) * Math.min(boost, 1.8)
    this.img = canvasImgObjs[Math.floor(Math.random() * canvasImgObjs.length)]
    this.rot = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.16
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
    playRandomMemeSound()
    explode(e.clientX, e.clientY, 24)
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
  setTimeout(() => document.body.classList.remove('shaking'), 650)
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
//  CHAOS FUNCTIONALITY BUTTONS (BIGGER & MORE BUTTONS)
// ════════════════════════════════════════════════════════════
function buildChaosControls() {
  const hud = document.createElement('div')
  hud.id = 'chaos-hud'

  // Expanded unhinged meme button bank
  const actions = [
    {
      label: 'VINE BOOM',
      icon: '💥',
      color: '#ff0033',
      action: () => {
        playVineBoom()
        triggerScreenShake()
        explode(W() / 2, H() / 2, 50, 1.6)
        addAura(500000)
        showToast("💥 REAL VINE BOOM DETONATED!")
      }
    },
    {
      label: 'METAL PIPE',
      icon: '🪈',
      color: '#9e9e9e',
      action: () => {
        playMetalPipe()
        triggerScreenShake()
        for (let i = 0; i < 4; i++) {
          buildDVDBouncer(randImg(), 180 + Math.random() * 80, randColor())
        }
        showToast("🪈 METAL PIPE HAS FALLEN IN K-BLOCK CORRIDOR!")
      }
    },
    {
      label: 'MLG AIRHORN',
      icon: '📢',
      color: '#ffeb3b',
      action: () => {
        playAirhorn()
        triggerScreenShake()
        showToast("📢 360 NO-SCOPE CONFIRMED BY PAWAN ANNA!")
        addAura(420000)
      }
    },
    {
      label: 'BRUH MOMENT',
      icon: '🎺',
      color: '#795548',
      action: () => {
        playBruh()
        document.body.style.filter = 'grayscale(1)'
        setTimeout(() => { document.body.style.filter = 'none' }, 800)
        showToast("🗿 CERTIFIED BRUH MOMENT IN PROGRESS...")
      }
    },
    {
      label: 'REVERB FART',
      icon: '💨',
      color: '#8bc34a',
      action: () => {
        playReverbFart()
        triggerScreenShake()
        showToast("💨 CANTEEN CHANA MASALA REVERB FART RELEASED!")
      }
    },
    {
      label: 'TACO BELL',
      icon: '🔔',
      color: '#9c27b0',
      action: () => {
        playTacoBell()
        document.body.style.filter = 'invert(1)'
        setTimeout(() => { document.body.style.filter = 'none' }, 350)
        showToast("🔔 THE COSMIC TACO BELL TOLLS FOR THE DEAN!")
      }
    },
    {
      label: 'BONK HEAD',
      icon: '🔨',
      color: '#ff9800',
      action: () => {
        playBonk()
        spawnFloatingText("💥 BONK! 💥", W() / 2, H() / 2, '#ff0055')
        explode(W() / 2, H() / 2, 25)
      }
    },
    {
      label: 'TACTICAL NUKE',
      icon: '☢️',
      color: '#f44336',
      action: () => {
        playVineBoom()
        triggerScreenShake()
        addAura(10000000)
        showToast("☢️ TACTICAL SIDDHANT NUKE DETONATED IN GITAM HYDERABAD!")
        for (let i = 0; i < 7; i++) {
          setTimeout(() => {
            explode(Math.random() * W(), Math.random() * H(), 45, 1.8)
          }, i * 110)
        }
      }
    },
    {
      label: 'SPINOCALYPSE',
      icon: '🌪️',
      color: '#00bcd4',
      action: () => {
        playBoing()
        triggerScreenSpin()
        showToast("🌀 REALITY ROTATING AT 420 RPM!")
        addAura(500000)
      }
    },
    {
      label: 'TURBO 4X',
      icon: '⚡',
      color: '#cddc39',
      action: () => {
        playAirhorn()
        globalSpeedMultiplier = 4.0
        showToast("⚡ TURBO OVERCLOCK: 4.0X RELATIVISTIC VELOCITY!")
        setTimeout(() => {
          globalSpeedMultiplier = 1.0
        }, 5000)
      }
    },
    {
      label: 'SUMMON PAWAN ANNA',
      icon: '👹',
      color: '#e91e63',
      action: () => {
        playVineBoom()
        const boss = buildDVDBouncer(randImg(), 320, '#ff0000')
        showToast("👹 FINAL BOSS PAWAN ANNA HAS ENTERED THE FIELD!")
        addAura(1000000)
      }
    },
    {
      label: 'CANTEEN BIRYANI',
      icon: '🍗',
      color: '#ff5722',
      action: () => {
        playBoing()
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            spawnFloatingText("🍗 BIRYANI 🍗", Math.random() * W(), Math.random() * H(), '#ffaa00')
          }, i * 80)
        }
        showToast("🍗 EMERGENCY BIRYANI AIRDROP DELIVERED TO SOUTH CAMPUS!")
      }
    },
    {
      label: '0% ATTENDANCE',
      icon: '🚨',
      color: '#f44336',
      action: () => {
        playWindowsError()
        showToast("🚨 ATTENDANCE DETAINED: DEAN DEPLOYED TO K-BLOCK!")
        let flashes = 0
        const siren = setInterval(() => {
          document.body.style.background = flashes % 2 === 0 ? '#ff0000' : '#0000ff'
          flashes++
          if (flashes > 12) {
            clearInterval(siren)
            document.body.style.background = '#111'
          }
        }, 120)
      }
    },
    {
      label: 'RESET PURGE',
      icon: '🧼',
      color: '#ffffff',
      action: () => {
        playWindowsError()
        particles.length = 0
        explode(W() / 2, H() / 2, 35)
        showToast("🧹 THE SIMULATION HAS BEEN SCRUBBED SQUEAKY CLEAN!")
      }
    }
  ]

  actions.forEach(act => {
    const btn = document.createElement('button')
    btn.className = 'chaos-btn'
    btn.innerHTML = `<span style="font-size: 20px;">${act.icon}</span> <span>${act.label}</span>`
    btn.onclick = (e) => {
      e.stopPropagation()
      playRandomMemeSound()
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
    playRandomMemeSound()
    addAura(1000000)
    spawnFloatingText("+1,000,000 AURA ✨", e.clientX, e.clientY, '#00ff66')
    explode(e.clientX, e.clientY, 20)
  }
  document.body.appendChild(stats)
  updateStatsHUD()
}

// ════════════════════════════════════════════════════════════
//  KEYBOARD MEME SHORTCUTS
// ════════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  const k = e.key.toUpperCase()
  if (k === 'B') {
    playVineBoom()
    triggerScreenShake()
    explode(W() / 2, H() / 2, 35)
  } else if (k === 'M') {
    playMetalPipe()
    triggerScreenShake()
  } else if (k === 'A') {
    playAirhorn()
  } else if (k === 'N') {
    playVineBoom()
    triggerScreenShake()
    explode(W() / 2, H() / 2, 100, 2)
    showToast("☢️ KEYBOARD NUKE INITIATED!")
  } else if (k === 'S') {
    buildDVDBouncer(randImg(), 220, randColor())
    playBonk()
  } else if (k === 'T') {
    globalSpeedMultiplier = globalSpeedMultiplier === 1.0 ? 4.0 : 1.0
  } else if (k === ' ') {
    playRandomMemeSound()
    explode(Math.random() * W(), Math.random() * H(), 30)
  }
})

// ════════════════════════════════════════════════════════════
//  AUTHENTIC GROUP BS CALCULATIONS & CONSOLE EASTER EGGS
// ════════════════════════════════════════════════════════════
function calculateSiddhantQuantumQuotient() {
  const tau = Math.PI * 2
  const mudigondaTensor = Math.sin(Date.now() / 1000) * 420
  const pawanAnnaEigenvalue = Math.cos(Date.now() / 690) * 1337
  const attendanceDecayRate = Math.exp(-0.00001 * totalRespectScore)
  return ((mudigondaTensor ** 2 + pawanAnnaEigenvalue ** 2) * attendanceDecayRate * tau).toFixed(4)
}

function pawanAnnaHarmonicConvergence() {
  return `Convergence confirmed: Quantum quotient = ${calculateSiddhantQuantumQuotient()} chad units per second.`
}

// Periodic BS log to console
setInterval(() => {
  const bsQuotes = [
    `[QUANTUM SIDDHANT KERNEL] Quotient: ${calculateSiddhantQuantumQuotient()} | Gitam Firewall Status: OVERRIDDEN`,
    `[PAWAN ANNA MONITOR] Aura level fluctuating around ${totalAura} micro-joules`,
    `[CANTEEN SATELLITE] 100% chance of hot chicken biryani detected in South Hyderabad campus`,
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
  addMarqueeBar('🔥 SIDDHANT 🔥 PAWAN ANNA 🔥 MUDIGONDA 🔥 RISHI BOBBILI 🔥 MUKUNDH 🔥 YELLISHETTY 🔥', 0, 2, '#000', 'rgba(255,220,0,0.95)')
  addMarqueeBar('💀 MARUTI PRASAD 💀 JD PRABHAKAR 💀 MUKUNDH 💀 YELLISHETTY 💀 AWAN PANNA 💀', 96.2, 2.5, '#fff', 'rgba(180,0,0,0.95)')
  buildChaosControls()

  // 50 big floating images
  for (let i = 0; i < 50; i++) {
    const f = new FloatingImg()
    f.mount()
    floaters.push(f)
  }

  // DVD bouncers — img 2 (index 1) and img 8 (index 7)
  buildDVDBouncer(IMGS[1 % IMGS.length], 260, '#ff0055')
  buildDVDBouncer(IMGS[7 % IMGS.length], 220, '#00ff66')

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
  console.log('%c 🔥 SIDDHANT ENGINE v6.9.420 LOADED — AUTHENTIC MEME EDITION 🗿', 'font-size:20px;font-weight:900;color:#ffff00;background:#000;padding:10px;border:3px solid #ff0055;')
  console.log(pawanAnnaHarmonicConvergence())
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEngine)
} else {
  initEngine()
}
