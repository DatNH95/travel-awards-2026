const fs = require('node:fs');
const path = require('node:path');
const directory = path.join(__dirname, '../public/assets/decor');
const image = fs.readFileSync(path.join(directory, 'gold-wave.webp')).toString('base64');
// Deform the supplied artwork locally; keep its frame fixed rather than moving it.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="711" viewBox="0 0 1600 711">
<defs><filter id="flow" x="-5%" y="-15%" width="110%" height="130%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.0015 0.003" numOctaves="1" seed="7" result="wave">
<animate attributeName="baseFrequency" values="0.0015 0.003;0.0025 0.005;0.0015 0.003" dur="14s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
</feTurbulence>
<feDisplacementMap in="SourceGraphic" in2="wave" scale="70" xChannelSelector="R" yChannelSelector="G"/>
</filter></defs>
<image width="1600" height="711" href="data:image/webp;base64,${image}" filter="url(#flow)"/>
</svg>`;
fs.writeFileSync(path.join(directory, 'gold-wave-animated.svg'), svg);
