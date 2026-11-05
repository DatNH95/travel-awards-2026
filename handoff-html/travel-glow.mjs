// Portable, framework-free version of the standalone 30Plus registration demo.
import fs from 'node:fs/promises';
export async function exportTravelGlow(){
 let html=await fs.readFile('public/30plus-travel-preview.html','utf8');const styles=[];
 html=html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g,(_,css)=>{styles.push(css);return '';});
 const scripts=[];
 html=html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g,(_,attrs,code)=>{if(!/src=/.test(attrs))scripts.push(code);return '';});
 const vendor='handoff-html/js/lucide.min.js';
 try{await fs.access(vendor);}catch{
  const response=await fetch('https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js');
  if(!response.ok)throw Error('Cannot package Lucide icons');
  await fs.writeFile(vendor,await response.text());
 }
 await fs.writeFile('handoff-html/js/30plus-form.js',scripts.join('\n;\n'));
 html=html.replace('</head>','<script defer src="js/lucide.min.js"></script><script defer src="js/30plus-phone-validation.js"></script><script defer src="js/30plus-form.js"></script></head>');
 const routes={'/':'index.html','/the-le':'the-le.html','/tin-tuc':'tin-tuc.html','/dang-ky-de-cu':'dang-ky-de-cu.html','/dang-ky-30-plus':'dang-ky-30-plus.html','/30plus-phone-validation.js':'js/30plus-phone-validation.js'};
 html=html.replace(/(href|src)=(["'])(\/[^"']*)\2/g,(whole,attr,quote,value)=>{
  if(value.startsWith('//'))return whole;
  const url=new URL(value,'http://local');const target=routes[url.pathname]||(url.pathname.startsWith('/assets/')?url.pathname.slice(1):null);
  if(!target)throw Error('Unmapped 30Plus URL: '+value);
  return `${attr}=${quote}${target}${url.search}${url.hash}${quote}`;
 });
 html=html.replace('</head>','<link rel="stylesheet" href="css/30plus.css"></head>');
 await fs.writeFile('handoff-html/css/30plus.css',styles.join('\n').replaceAll('/assets/','../assets/'));
 await fs.copyFile('public/30plus-phone-validation.js','handoff-html/js/30plus-phone-validation.js');
 const target='handoff-html/dang-ky-30-plus.html';await fs.writeFile(target+'.tmp',html);await fs.rename(target+'.tmp',target);
}
