// Node.js script to generate rich, standalone animated horror assets
const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'public/assets/horror/creatures',
  'public/assets/horror/ghosts',
  'public/assets/horror/demons',
  'public/assets/horror/female-entities',
  'public/assets/horror/face-encounters',
  'public/assets/horror/environments',
  'public/assets/horror/fog-smoke',
  'public/assets/horror/shadows',
  'public/assets/horror/paranormal-effects',
  'public/assets/horror/glitch-effects',
  'public/assets/horror/particles',
  'public/assets/horror/animations',
  'public/assets/horror/textures',
  'public/assets/horror/audio'
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

// 1. Banshee Float Animated SVG (true transparent loop)
const bansheeSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800' width='100%' height='100%' preserveAspectRatio='xMidYMid meet'>
  <defs>
    <filter id='banshee-glow' x='-30%' y='-30%' width='160%' height='160%'>
      <feGaussianBlur stdDeviation='8' result='blur'/>
      <feColorMatrix type='matrix' values='
        0.8 0 0 0 0.4
        0 0.1 0 0 0
        0 0 0.1 0 0
        0 0 0 0.9 0' result='glow'/>
      <feMerge>
        <feMergeNode in='glow'/>
        <feMergeNode in='SourceGraphic'/>
      </feMerge>
    </filter>
  </defs>
  <!-- Floating root animation -->
  <g filter='url(#banshee-glow)'>
    <animateTransform attributeName='transform' type='translate' values='0,0; 0,-20; 0,0' dur='4.5s' repeatCount='indefinite' calcMode='spline' keySplines='0.4 0 0.6 1; 0.4 0 0.6 1'/>
    <!-- Shroud trailing hem -->
    <path d='M250,350 Q230,550 200,750 Q280,720 300,740 Q320,720 400,750 Q370,550 350,350 Z' fill='#0e0e12' opacity='0.85'>
      <animate attributeName='d' values='
        M250,350 Q230,550 200,750 Q280,720 300,740 Q320,720 400,750 Q370,550 350,350 Z;
        M250,350 Q210,540 215,750 Q270,735 300,735 Q330,735 385,750 Q390,540 350,350 Z;
        M250,350 Q230,550 200,750 Q280,720 300,740 Q320,720 400,750 Q370,550 350,350 Z'
        dur='3.2s' repeatCount='indefinite'/>
    </path>
    <!-- Skeletal torso & neck -->
    <path d='M275,250 C270,300 260,380 270,420 C290,430 310,430 330,420 C340,380 330,300 325,250 Z' fill='#181a20' opacity='0.9'/>
    <!-- Gaunt Hollow Head -->
    <ellipse cx='300' cy='200' rx='45' ry='65' fill='#d8d6d2' opacity='0.95'/>
    <path d='M270,220 C275,245 285,260 300,262 C315,260 325,245 330,220 Z' fill='#08080a'/>
    <!-- Screaming Agonized Jaw -->
    <ellipse cx='300' cy='238' rx='14' ry='22' fill='#000000'>
      <animate attributeName='ry' values='18; 26; 18' dur='1.8s' repeatCount='indefinite'/>
    </ellipse>
    <!-- Hollow Sunken Eyes with Blood Red Glint -->
    <ellipse cx='282' cy='190' rx='9' ry='12' fill='#050505'/>
    <circle cx='282' cy='190' r='3' fill='#a20d19'>
      <animate attributeName='r' values='2; 4; 2' dur='1.2s' repeatCount='indefinite'/>
    </circle>
    <ellipse cx='318' cy='190' rx='9' ry='12' fill='#050505'/>
    <circle cx='318' cy='190' r='3' fill='#a20d19'>
      <animate attributeName='r' values='2; 4; 2' dur='1.2s' repeatCount='indefinite'/>
    </circle>
    <!-- Moving Disheveled Hair Tendrils -->
    <path d='M260,160 Q210,180 180,260 Q170,360 190,440' stroke='#08080a' stroke-width='14' fill='none' stroke-linecap='round'>
      <animate attributeName='d' values='
        M260,160 Q210,180 180,260 Q170,360 190,440;
        M260,160 Q200,200 170,280 Q160,370 180,450;
        M260,160 Q210,180 180,260 Q170,360 190,440'
        dur='2.6s' repeatCount='indefinite'/>
    </path>
    <path d='M340,160 Q390,180 420,260 Q430,360 410,440' stroke='#08080a' stroke-width='14' fill='none' stroke-linecap='round'>
      <animate attributeName='d' values='
        M340,160 Q390,180 420,260 Q430,360 410,440;
        M340,160 Q400,200 430,280 Q440,370 420,450;
        M340,160 Q390,180 420,260 Q430,360 410,440'
        dur='2.9s' repeatCount='indefinite'/>
    </path>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/ghosts/banshee-loop.svg', bansheeSvg);
console.log('Saved banshee-loop.svg');

// 2. She-Devil Apparition Animated SVG
const sheDevilSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800' width='100%' height='100%' preserveAspectRatio='xMidYMid meet'>
  <defs>
    <radialGradient id='devil-glow' cx='50%' cy='35%' r='50%'>
      <stop offset='0%' stop-color='#a20d19' stop-opacity='0.6'/>
      <stop offset='100%' stop-color='#000000' stop-opacity='0'/>
    </radialGradient>
  </defs>
  <!-- Background demon aura -->
  <circle cx='300' cy='280' r='200' fill='url(#devil-glow)'>
    <animate attributeName='r' values='170; 220; 170' dur='3s' repeatCount='indefinite'/>
  </circle>
  <g>
    <animateTransform attributeName='transform' type='translate' values='0,0; 0,-8; 0,0' dur='3.6s' repeatCount='indefinite'/>
    <!-- Curving Demonic Horns -->
    <path d='M270,190 C250,140 210,100 180,90 C190,110 220,150 255,205 Z' fill='#1a0406' stroke='#a20d19' stroke-width='2'/>
    <path d='M330,190 C350,140 390,100 420,90 C410,110 380,150 345,205 Z' fill='#1a0406' stroke='#a20d19' stroke-width='2'/>
    <!-- Head & Shoulders -->
    <path d='M230,330 C250,290 260,250 265,220 C275,250 325,250 335,220 C340,250 350,290 370,330 C380,420 370,550 350,750 L250,750 C230,550 220,420 230,330 Z' fill='#080405'/>
    <ellipse cx='300' cy='225' rx='38' ry='50' fill='#140507'/>
    <!-- Glowing Slit Eyes -->
    <path d='M280,215 Q290,210 295,215 Q290,220 280,215 Z' fill='#ff2233'>
      <animate attributeName='opacity' values='1; 0.2; 1; 1' dur='3.5s' repeatCount='indefinite'/>
    </path>
    <path d='M320,215 Q310,210 305,215 Q310,220 320,215 Z' fill='#ff2233'>
      <animate attributeName='opacity' values='1; 0.2; 1; 1' dur='3.5s' repeatCount='indefinite'/>
    </path>
    <!-- Sinister Grin -->
    <path d='M285,245 Q300,260 315,245' stroke='#a20d19' stroke-width='3' fill='none'>
      <animate attributeName='d' values='
        M285,245 Q300,260 315,245;
        M282,242 Q300,268 318,242;
        M285,245 Q300,260 315,245'
        dur='4s' repeatCount='indefinite'/>
    </path>
    <!-- Chest breathing motion -->
    <ellipse cx='300' cy='360' rx='50' ry='60' fill='#0e0507'>
      <animate attributeName='rx' values='48; 54; 48' dur='2.4s' repeatCount='indefinite'/>
    </ellipse>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/demons/she-devil-apparition.svg', sheDevilSvg);
console.log('Saved she-devil-apparition.svg');

// 3. Blinking Red Horror Eyes (Transparent Loop)
const blinkingEyesSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200' width='100%' height='100%'>
  <defs>
    <radialGradient id='eye-glow' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='#ff0015' stop-opacity='0.9'/>
      <stop offset='40%' stop-color='#a20d19' stop-opacity='0.4'/>
      <stop offset='100%' stop-color='#000000' stop-opacity='0'/>
    </radialGradient>
  </defs>
  <g>
    <animate attributeName='opacity' values='0; 0.9; 0.9; 0; 0.9; 0.9; 0; 0' keyTimes='0; 0.15; 0.45; 0.50; 0.55; 0.85; 0.95; 1' dur='6s' repeatCount='indefinite'/>
    <!-- Left Eye Aura -->
    <circle cx='150' cy='100' r='45' fill='url(#eye-glow)'/>
    <!-- Left Eye Almond Shape -->
    <path d='M115,100 Q150,75 185,100 Q150,125 115,100 Z' fill='#3a0408' stroke='#a20d19' stroke-width='2'/>
    <!-- Left Slit Pupil -->
    <ellipse cx='150' cy='100' rx='4' ry='16' fill='#ffdddd'>
      <animate attributeName='cx' values='148; 152; 148' dur='3s' repeatCount='indefinite'/>
    </ellipse>

    <!-- Right Eye Aura -->
    <circle cx='250' cy='100' r='45' fill='url(#eye-glow)'/>
    <!-- Right Eye Almond Shape -->
    <path d='M215,100 Q250,75 285,100 Q250,125 215,100 Z' fill='#3a0408' stroke='#a20d19' stroke-width='2'/>
    <!-- Right Slit Pupil -->
    <ellipse cx='250' cy='100' rx='4' ry='16' fill='#ffdddd'>
      <animate attributeName='cx' values='248; 252; 248' dur='3s' repeatCount='indefinite'/>
    </ellipse>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/paranormal-effects/blinking-red-eyes.svg', blinkingEyesSvg);
console.log('Saved blinking-red-eyes.svg');

// 4. Tall One Shadow Figure Animated SVG
const tallOneSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 900' width='100%' height='100%'>
  <g opacity='0.92'>
    <animateTransform attributeName='transform' type='translate' values='-20,0; 20,0; -20,0' dur='8s' repeatCount='indefinite' calcMode='spline' keySplines='0.4 0 0.6 1; 0.4 0 0.6 1'/>
    <!-- Head (faceless, pale shadow) -->
    <ellipse cx='250' cy='120' rx='28' ry='48' fill='#08080a'/>
    <!-- Extremely elongated neck & torso -->
    <path d='M235,165 L230,420 L220,780 L240,880 L250,620 L260,880 L280,780 L270,420 L265,165 Z' fill='#050507'/>
    <!-- Long spider-like arms -->
    <path d='M230,220 Q180,380 150,560 Q130,680 120,760' stroke='#050507' stroke-width='16' stroke-linecap='round' fill='none'>
      <animate attributeName='d' values='
        M230,220 Q180,380 150,560 Q130,680 120,760;
        M230,220 Q170,390 140,570 Q110,690 100,770;
        M230,220 Q180,380 150,560 Q130,680 120,760'
        dur='4s' repeatCount='indefinite'/>
    </path>
    <path d='M270,220 Q320,380 350,560 Q370,680 380,760' stroke='#050507' stroke-width='16' stroke-linecap='round' fill='none'>
      <animate attributeName='d' values='
        M270,220 Q320,380 350,560 Q370,680 380,760;
        M270,220 Q330,390 360,570 Q390,690 400,770;
        M270,220 Q320,380 350,560 Q370,680 380,760'
        dur='4.3s' repeatCount='indefinite'/>
    </path>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/demons/tall-one-walk.svg', tallOneSvg);
console.log('Saved tall-one-walk.svg');

// 5. Creeping Moving Wall Shadows Animated SVG
const creepingShadowSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' width='100%' height='100%' preserveAspectRatio='none'>
  <defs>
    <filter id='shadow-blur'>
      <feGaussianBlur stdDeviation='14'/>
    </filter>
  </defs>
  <g filter='url(#shadow-blur)' fill='#020203' opacity='0.8'>
    <path d='M0,0 L200,0 C350,150 280,350 400,500 L0,600 Z'>
      <animate attributeName='d' values='
        M0,0 L200,0 C350,150 280,350 400,500 L0,600 Z;
        M0,0 L260,0 C420,180 320,380 480,550 L0,600 Z;
        M0,0 L180,0 C310,130 250,330 360,470 L0,600 Z;
        M0,0 L200,0 C350,150 280,350 400,500 L0,600 Z'
        dur='7s' repeatCount='indefinite' calcMode='spline' keySplines='0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1'/>
    </path>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/shadows/creeping-wall-shadows.svg', creepingShadowSvg);
console.log('Saved creeping-wall-shadows.svg');

// 6. Weeping Bride Animated SVG
const weepingBrideSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 800' width='100%' height='100%'>
  <g>
    <!-- Subtle shoulder trembling -->
    <animateTransform attributeName='transform' type='translate' values='0,0; 1,-2; -1,0; 0,1; 0,0' dur='0.4s' repeatCount='indefinite'/>
    <!-- Decayed Yellowed Wedding Dress -->
    <path d='M200,320 C180,480 140,650 110,780 L390,780 C360,650 320,480 300,320 Z' fill='#1b1c1d' stroke='#2b2d30' stroke-width='2'/>
    <!-- Torn Lace Overhang -->
    <path d='M130,760 Q250,710 370,760 L390,780 L110,780 Z' fill='#0e0e11'/>
    <!-- Severely bent neck and head -->
    <path d='M230,220 C220,260 210,310 230,340 L270,340 C290,310 280,260 270,220 Z' fill='#141518'/>
    <!-- Head tilted unnaturally to side -->
    <ellipse cx='240' cy='190' rx='36' ry='48' fill='#d0cdc6' transform='rotate(-22 240 190)'/>
    <!-- Dirty lace veil draping down -->
    <path d='M190,160 Q230,140 280,180 Q290,260 270,380 L180,340 Z' fill='#24262b' opacity='0.75'>
      <animate attributeName='opacity' values='0.7; 0.85; 0.7' dur='2s' repeatCount='indefinite'/>
    </path>
    <!-- Blood tears streaming -->
    <path d='M235,190 L233,230' stroke='#a20d19' stroke-width='2' stroke-linecap='round'>
      <animate attributeName='y2' values='220; 245; 220' dur='2.5s' repeatCount='indefinite'/>
    </path>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/female-entities/weeping-bride-loop.svg', weepingBrideSvg);
console.log('Saved weeping-bride-loop.svg');

// 7. Wall Breather Pulse Animated SVG
const wallBreatherSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' width='100%' height='100%'>
  <defs>
    <radialGradient id='plaster-bulge' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='#2a0508' stop-opacity='0.85'/>
      <stop offset='60%' stop-color='#120305' stop-opacity='0.4'/>
      <stop offset='100%' stop-color='#000000' stop-opacity='0'/>
    </radialGradient>
  </defs>
  <ellipse cx='300' cy='300' rx='160' ry='160' fill='url(#plaster-bulge)'>
    <animate attributeName='rx' values='140; 210; 140' dur='4s' repeatCount='indefinite' calcMode='spline' keySplines='0.4 0 0.6 1; 0.4 0 0.6 1'/>
    <animate attributeName='ry' values='140; 210; 140' dur='4s' repeatCount='indefinite' calcMode='spline' keySplines='0.4 0 0.6 1; 0.4 0 0.6 1'/>
  </ellipse>
  <!-- Stretched cracked wallpaper seams -->
  <path d='M260,200 Q290,300 270,400' stroke='#a20d19' stroke-width='1.5' fill='none' opacity='0.7'>
    <animate attributeName='stroke-width' values='1.2; 3; 1.2' dur='4s' repeatCount='indefinite'/>
  </path>
  <path d='M340,200 Q310,300 330,400' stroke='#a20d19' stroke-width='1.5' fill='none' opacity='0.7'>
    <animate attributeName='stroke-width' values='1.2; 3; 1.2' dur='4s' repeatCount='indefinite'/>
  </path>
</svg>`;
fs.writeFileSync('public/assets/horror/shadows/wall-breather-pulse.svg', wallBreatherSvg);
console.log('Saved wall-breather-pulse.svg');

// 8. Floating Dust Motes Particles Animated SVG
const dustMotesSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' width='100%' height='100%' preserveAspectRatio='none'>
  <g fill='#ffffff' opacity='0.35'>
    <circle cx='120' cy='200' r='2'>
      <animate attributeName='cy' values='200; 120; 200' dur='6s' repeatCount='indefinite'/>
      <animate attributeName='cx' values='120; 150; 120' dur='6s' repeatCount='indefinite'/>
      <animate attributeName='opacity' values='0.1; 0.6; 0.1' dur='3s' repeatCount='indefinite'/>
    </circle>
    <circle cx='340' cy='420' r='3'>
      <animate attributeName='cy' values='420; 340; 420' dur='8s' repeatCount='indefinite'/>
      <animate attributeName='cx' values='340; 310; 340' dur='8s' repeatCount='indefinite'/>
      <animate attributeName='opacity' values='0.2; 0.7; 0.2' dur='4s' repeatCount='indefinite'/>
    </circle>
    <circle cx='560' cy='180' r='2.5'>
      <animate attributeName='cy' values='180; 100; 180' dur='7s' repeatCount='indefinite'/>
      <animate attributeName='cx' values='560; 590; 560' dur='7s' repeatCount='indefinite'/>
      <animate attributeName='opacity' values='0.1; 0.5; 0.1' dur='3.5s' repeatCount='indefinite'/>
    </circle>
    <circle cx='700' cy='450' r='2'>
      <animate attributeName='cy' values='450; 380; 450' dur='5.5s' repeatCount='indefinite'/>
      <animate attributeName='cx' values='700; 670; 700' dur='5.5s' repeatCount='indefinite'/>
      <animate attributeName='opacity' values='0.3; 0.8; 0.3' dur='2.8s' repeatCount='indefinite'/>
    </circle>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/particles/floating-dust-motes.svg', dustMotesSvg);
console.log('Saved floating-dust-motes.svg');

// 9. Blood Drip Loop Animated SVG
const bloodDripSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600' width='100%' height='100%'>
  <g fill='#760909' stroke='#430609' stroke-width='1'>
    <!-- Drop 1 -->
    <path d='M80,0 L80,180 C80,200 95,200 95,180 L95,0 Z'>
      <animate attributeName='d' values='
        M80,0 L80,50 C80,65 95,65 95,50 L95,0 Z;
        M80,0 L80,240 C80,260 95,260 95,240 L95,0 Z;
        M80,0 L80,50 C80,65 95,65 95,50 L95,0 Z'
        dur='4.2s' repeatCount='indefinite'/>
    </path>
    <!-- Drop 2 -->
    <path d='M250,0 L250,120 C250,140 265,140 265,120 L265,0 Z'>
      <animate attributeName='d' values='
        M250,0 L250,30 C250,45 265,45 265,30 L265,0 Z;
        M250,0 L250,320 C250,340 265,340 265,320 L265,0 Z;
        M250,0 L250,30 C250,45 265,45 265,30 L265,0 Z'
        dur='5.8s' repeatCount='indefinite'/>
    </path>
  </g>
</svg>`;
fs.writeFileSync('public/assets/horror/glitch-effects/blood-drip-loop.svg', bloodDripSvg);
console.log('Saved blood-drip-loop.svg');

// 10. Occult Seal Spin Lottie JSON
const lottieSeal = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  nm: 'Occult Demon Seal',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Rotating Star',
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [60] }, { t: 45, s: [95] }, { t: 90, s: [60] }] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [360] }] },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100, 100] }, { t: 45, s: [110, 110, 100] }, { t: 90, s: [100, 100, 100] }] }
      },
      shapes: [
        {
          ty: 'el',
          d: 1,
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [280, 280] }
        },
        {
          ty: 'st',
          c: { a: 0, k: [0.63, 0.05, 0.1, 1] },
          w: { a: 0, k: 3 },
          lc: 2,
          lj: 2
        }
      ]
    }
  ]
};
fs.writeFileSync('public/assets/horror/animations/occult-seal-spin.json', JSON.stringify(lottieSeal, null, 2));
console.log('Saved occult-seal-spin.json');
