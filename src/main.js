// ============================================================
//  BRAINROT CHAOS ENGINE — FIXED IMAGE-FIRST EDITION
// ============================================================

const IMGS = window.IMGS
const app = document.getElementById('app')
const canvas = document.getElementById('chaos-canvas')
const ctx = canvas.getContext('2d')
const cursor = document.getElementById('cursor')
const W = () => window.innerWidth
const H = () => window.innerHeight

const resizeCanvas = () => { canvas.width = W(); canvas.height = H() }
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

const NAMES = [
  'SIDDHANT','PAWAN ANNA','AWAN PANNA','MUDIGONDA',
  'MARUTI PRASAD','JD PRABHAKAR','MUKUNDH','YELLISHETTY','RISHI BOBBILI'
]
const RESPECT_LABELS = [
  ['SIDDHANT','🗿'],['GITAM','🏫'],['PAWAN ANNA','💀'],
  ['MUDIGONDA','🔥'],['RISHI BOBBILI','👑'],['MUKUNDH','🤝'],
  ['YELLISHETTY','⚡'],['MARUTI PRASAD','🫡'],['JD PRABHAKAR','💪'],
  ['GITAM UNIVERSITY','🎓'],['AWAN PANNA','🧠'],['SIDDHANT W','🏆'],
]

function randColor() { return `hsl(${Math.random()*360},100%,${50+Math.random()*30}%)` }
function randName()  { return NAMES[Math.floor(Math.random()*NAMES.length)] }
function randImg()   { return IMGS[Math.floor(Math.random()*IMGS.length)] }

// ── CURSOR ────────────────────────────────────────────────────
const CURSOR_EMOJIS=['🗿','💀','🤡','🧠','😭','🔥','👁️','🫡']
let cursorIdx=0
document.addEventListener('mousemove',e=>{ cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px' })
setInterval(()=>{ cursorIdx=(cursorIdx+1)%CURSOR_EMOJIS.length; cursor.textContent=CURSOR_EMOJIS[cursorIdx] },600)

// ── BG (slow, dark) ───────────────────────────────────────────
const BG=['#0a0015','#001100','#150000','#00101f','#111100','#0f000f']
let bgI=0
setInterval(()=>{ bgI=(bgI+1)%BG.length; document.body.style.background=BG[bgI] },2000)

// ── STYLES ────────────────────────────────────────────────────
document.head.insertAdjacentHTML('beforeend',`<style>
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
  .respect-btn {
    position:fixed;
    padding:12px 20px;
    font-weight:900;
    font-family:Impact,sans-serif;
    font-size:16px;
    text-transform:uppercase;
    border:3px solid;
    cursor:pointer;
    z-index:10000;
    letter-spacing:1px;
    animation:respectPop 0.4s ease-out forwards, floatBounce 2.5s ease-in-out infinite 0.4s;
    pointer-events:all !important;
    user-select:none;
  }
  .respect-btn:hover { filter:brightness(1.3); transform:scale(1.08) !important; }
  .respect-btn:active { transform:scale(0.95) !important; }
</style>`)

// ════════════════════════════════════════════════════════════
//  WALLPAPER — big tiles, always fully visible, NO canvas cover
// ════════════════════════════════════════════════════════════
function buildWallpaper() {
  const SIZE=200   // big tiles
  const cols=Math.ceil(W()/SIZE)+2
  const rows=Math.ceil(H()/SIZE)+2
  const wall=document.createElement('div')
  wall.style.cssText=`position:fixed;top:-${SIZE}px;left:-${SIZE}px;width:${(cols+1)*SIZE}px;height:${(rows+1)*SIZE}px;display:grid;grid-template-columns:repeat(${cols},${SIZE}px);grid-template-rows:repeat(${rows},${SIZE}px);z-index:0;pointer-events:none;gap:3px;`
  for(let i=0;i<cols*rows;i++){
    const img=document.createElement('img')
    img.src=randImg()
    img.style.cssText=`width:${SIZE}px;height:${SIZE}px;object-fit:cover;opacity:${0.7+Math.random()*0.3};display:block;`
    wall.appendChild(img)
  }
  app.appendChild(wall)
  setInterval(()=>{ wall.querySelectorAll('img').forEach(im=>{ if(Math.random()>0.9){ im.src=randImg() } }) },1500)
}

// ════════════════════════════════════════════════════════════
//  DIAGONAL SCROLLER
// ════════════════════════════════════════════════════════════
function buildTiledBg() {
  const wrap=document.createElement('div')
  wrap.style.cssText=`position:fixed;top:0;left:0;width:300%;height:300%;display:flex;flex-wrap:wrap;z-index:1;pointer-events:none;animation:tiledMove 18s linear infinite;`
  for(let i=0;i<100;i++){
    const img=document.createElement('img')
    img.src=IMGS[i%IMGS.length]
    const s=180+Math.floor(Math.random()*140)
    img.style.cssText=`width:${s}px;height:${s}px;object-fit:cover;opacity:${0.45+Math.random()*0.4};display:block;`
    wrap.appendChild(img)
  }
  app.appendChild(wrap)
}

// ════════════════════════════════════════════════════════════
//  FLOATING IMAGES — big, always opaque, slow drift
// ════════════════════════════════════════════════════════════
class FloatingImg {
  constructor(){ this.el=null; this.reset(true) }
  reset(initial=false){
    this.w=220+Math.random()*350   // 220–570px
    this.h=this.w*(0.65+Math.random()*0.6)
    this.x=Math.random()*(W()-this.w)
    this.y=initial ? Math.random()*H() : H()+50
    this.vx=(Math.random()-0.5)*1.8
    this.vy=initial ? (Math.random()-0.5)*1.5 : -0.5-Math.random()*1.5
    this.rot=(Math.random()-0.5)*6
    this.rotSpeed=(Math.random()-0.5)*0.25
    this.bouncing=true
    this.imgSrc=randImg()
    this.zIndex=20+Math.floor(Math.random()*180)
  }
  mount(){
    const el=document.createElement('img')
    el.src=this.imgSrc
    el.style.cssText=`position:fixed;left:${this.x}px;top:${this.y}px;width:${this.w}px;height:${this.h}px;object-fit:cover;opacity:0.9;border-radius:6px;border:2px solid rgba(255,255,255,0.4);z-index:${this.zIndex};pointer-events:none;animation:subtleGlow 3s ease-in-out infinite;will-change:transform;`
    app.appendChild(el)
    this.el=el
  }
  update(){
    this.x+=this.vx; this.y+=this.vy
    this.rot+=this.rotSpeed
    // bounce off walls
    if(this.x<=0){ this.x=0; this.vx=Math.abs(this.vx) }
    if(this.x+this.w>=W()){ this.x=W()-this.w; this.vx=-Math.abs(this.vx) }
    // reset when out top or bottom
    if(this.y<-this.h-100||this.y>H()+200){ this.el&&this.el.remove(); this.reset(); this.mount() }
    if(this.el){
      this.el.style.left=this.x+'px'
      this.el.style.top=this.y+'px'
      this.el.style.transform=`rotate(${this.rot}deg)`
    }
  }
}

// ════════════════════════════════════════════════════════════
//  DVD BOUNCE — images 2 and 8 bounce like DVD screensaver
// ════════════════════════════════════════════════════════════
function buildDVDBouncer(imgSrc, size, startColor) {
  const el=document.createElement('img')
  el.src=imgSrc
  el.style.cssText=`position:fixed;width:${size}px;height:${size}px;object-fit:cover;z-index:600;pointer-events:none;border-radius:8px;animation:dvdHue 4s linear infinite;border:4px solid rgba(255,255,255,0.8);box-shadow:0 0 20px rgba(255,255,255,0.5);`
  document.body.appendChild(el)

  let x=Math.random()*(W()-size)
  let y=Math.random()*(H()-size)
  let vx=(2+Math.random()*3)*(Math.random()>0.5?1:-1)
  let vy=(2+Math.random()*3)*(Math.random()>0.5?1:-1)

  function tick(){
    x+=vx; y+=vy
    let bounced=false
    if(x<=0){          x=0;        vx=Math.abs(vx);  bounced=true }
    if(x+size>=W()){   x=W()-size; vx=-Math.abs(vx); bounced=true }
    if(y<=0){          y=0;        vy=Math.abs(vy);  bounced=true }
    if(y+size>=H()){   y=H()-size; vy=-Math.abs(vy); bounced=true }
    if(bounced){
      // flash border on bounce
      el.style.borderColor=randColor()
      el.style.boxShadow=`0 0 40px ${randColor()}`
    }
    el.style.left=x+'px'
    el.style.top=y+'px'
    requestAnimationFrame(tick)
  }
  tick()
  return el
}

// ════════════════════════════════════════════════════════════
//  MARQUEE BARS
// ════════════════════════════════════════════════════════════
function addMarqueeBar(text,topPct,speed,color,bg){
  const wrap=document.createElement('div')
  wrap.style.cssText=`position:fixed;top:${topPct}%;left:0;right:0;overflow:hidden;white-space:nowrap;background:${bg};color:${color};font-size:13px;font-weight:700;padding:3px 0;z-index:8500;font-family:Impact,sans-serif;letter-spacing:3px;pointer-events:none;`
  const inner=document.createElement('div')
  inner.style.cssText='display:inline-block;white-space:nowrap;'
  inner.textContent=(text+'    ').repeat(20)
  wrap.appendChild(inner); document.body.appendChild(wrap)
  let pos=0
  ;(function run(){ pos-=speed; if(Math.abs(pos)>inner.scrollWidth/2) pos=0; inner.style.transform=`translateX(${pos}px)`; requestAnimationFrame(run) })()
}
addMarqueeBar('🔥 SIDDHANT 🔥 PAWAN ANNA 🔥 MUDIGONDA 🔥 RISHI BOBBILI 🔥 MUKUNDH 🔥 YELLISHETTY 🔥',0,2,'#000','rgba(255,220,0,0.92)')
addMarqueeBar('💀 MARUTI PRASAD 💀 JD PRABHAKAR 💀 MUKUNDH 💀 YELLISHETTY 💀 AWAN PANNA 💀',95.5,2.5,'#fff','rgba(180,0,0,0.92)')

// ════════════════════════════════════════════════════════════
//  RESPECT BUTTONS
// ════════════════════════════════════════════════════════════
const respectCounts={}

function spawnRespectBtn(){
  const [name,emoji]=RESPECT_LABELS[Math.floor(Math.random()*RESPECT_LABELS.length)]
  if(!respectCounts[name]) respectCounts[name]=0
  const btn=document.createElement('button')
  // safe zone: avoid marquee bars (top 30px, bottom 30px)
  const x=60+Math.random()*(W()-280)
  const y=50+Math.random()*(H()-120)
  const hue=Math.floor(Math.random()*360)
  btn.className='respect-btn'
  btn.style.left=x+'px'
  btn.style.top=y+'px'
  btn.style.background=`hsl(${hue},70%,18%)`
  btn.style.color=`hsl(${hue},100%,78%)`
  btn.style.borderColor=`hsl(${hue},100%,55%)`
  btn.style.transform=`rotate(${(Math.random()-0.5)*14}deg)`
  btn.innerHTML=`${emoji} ${name}<br><small style="font-size:11px;font-weight:400;opacity:0.75;">${respectCounts[name]} respects</small>`
  btn.onclick=e=>{
    e.stopPropagation()
    respectCounts[name]++
    btn.innerHTML=`${emoji} ${name}<br><small style="font-size:11px;font-weight:400;opacity:0.75;">${respectCounts[name]} respects ✅</small>`
    // big image burst
    for(let i=0;i<28;i++) particles.push(new Particle(x+100,y+35))
    btn.style.background=`hsl(${hue},100%,45%)`
    btn.style.color='#000'
    setTimeout(()=>{ btn.style.background=`hsl(${hue},70%,18%)`; btn.style.color=`hsl(${hue},100%,78%)` },350)
  }
  document.body.appendChild(btn)
  setTimeout(()=>{ btn.remove(); spawnRespectBtn() },9000+Math.random()*10000)
}

// ════════════════════════════════════════════════════════════
//  CANVAS — PARTICLES ONLY (clear transparent each frame)
// ════════════════════════════════════════════════════════════
const canvasImgObjs=IMGS.map(src=>{ const i=new Image(); i.src=src; return i })
const particles=[]

class Particle {
  constructor(x,y){
    this.x=x; this.y=y
    this.vx=(Math.random()-0.5)*20; this.vy=(Math.random()-0.5)*20
    this.life=1; this.decay=0.018+Math.random()*0.025
    this.size=60+Math.random()*150   // big image particles
    this.img=canvasImgObjs[Math.floor(Math.random()*canvasImgObjs.length)]
    this.rot=Math.random()*Math.PI*2; this.rotSpeed=(Math.random()-0.5)*0.12
  }
  update(){ this.x+=this.vx; this.y+=this.vy; this.vy+=0.5; this.life-=this.decay; this.rot+=this.rotSpeed; this.vx*=0.97 }
  draw(){
    if(this.life<=0) return
    ctx.save(); ctx.globalAlpha=this.life
    ctx.translate(this.x,this.y); ctx.rotate(this.rot)
    ctx.drawImage(this.img,-this.size/2,-this.size/2,this.size,this.size)
    ctx.restore()
  }
}

function explode(x,y,n=18){ for(let i=0;i<n;i++) particles.push(new Particle(x,y)) }
document.addEventListener('click',e=>{ if(!e.target.classList.contains('respect-btn')) explode(e.clientX,e.clientY,22) })
document.addEventListener('wheel',e=>{ e.preventDefault(); explode(Math.random()*W(),Math.random()*H(),10) },{passive:false})

// ── TITLE ─────────────────────────────────────────────────────
let ti=0
setInterval(()=>{ ti=(ti+1)%NAMES.length; document.title=NAMES[ti]+' 🔥' },1200)

// ═══════════════════════════════════════════════════════════
//  INIT ALL LAYERS
// ═══════════════════════════════════════════════════════════
buildWallpaper()
buildTiledBg()

// 50 big floating images
const floaters=[]
for(let i=0;i<50;i++){ const f=new FloatingImg(); f.mount(); floaters.push(f) }

// DVD bouncers — img 2 (index 1) and img 8 (index 7)
buildDVDBouncer(IMGS[1], 260, '#ff0')
buildDVDBouncer(IMGS[7], 220, '#0ff')

// 7 respect buttons to start
for(let i=0;i<7;i++) setTimeout(()=>spawnRespectBtn(), i*400)

// scanline overlay
const sl=document.createElement('div')
sl.style.cssText=`position:fixed;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px);pointer-events:none;z-index:9000;`
document.body.appendChild(sl)

// ── MAIN LOOP — canvas cleared TRANSPARENT each frame ─────────
let frame=0
function loop(){
  requestAnimationFrame(loop); frame++

  // CLEAR TRANSPARENT — no black fill, DOM images stay visible
  ctx.clearRect(0,0,W(),H())

  // draw particles on top
  for(let i=particles.length-1;i>=0;i--){
    particles[i].update(); particles[i].draw()
    if(particles[i].life<=0) particles.splice(i,1)
  }

  floaters.forEach(f=>f.update())

  // slowly add more floaters
  if(frame%80===0&&floaters.length<75){ const f=new FloatingImg(); f.mount(); floaters.push(f) }
}
loop()

console.log('%c SIDDHANT LOADED 🗿','font-size:28px;font-weight:900;color:#ff0;background:#000;padding:12px;')
