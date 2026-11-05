// Export a self-contained, framework-free registration handoff.
import fs from 'node:fs/promises';
import path from 'node:path';
import {embedSvgAssets} from './structure.mjs';
export async function exportTravelGlow(){
 const out='handoff-html/dangky-30plus-travel';
 for(const name of ['css','js','assets'])await fs.mkdir(path.join(out,name),{recursive:true});
 let html=await fs.readFile('public/30plus-travel-preview.html','utf8');const styles=[],scripts=[];
 html=html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g,(_,css)=>{styles.push(css);return '';});
 html=html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g,(_,attrs,code)=>{if(!/src=/.test(attrs))scripts.push(code);return '';});
 const vendor=path.join(out,'js/lucide.min.js');
 try{await fs.copyFile('handoff-html/js/lucide.min.js',vendor);}catch(error){
  if(error.code!=='ENOENT')throw error;
  const response=await fetch('https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js');
  if(!response.ok)throw Error('Cannot package Lucide icons');await fs.writeFile(vendor,await response.text());
 }
 await fs.writeFile(path.join(out,'js/30plus-form.js'),scripts.join('\n;\n'));
 await fs.copyFile('public/30plus-phone-validation.js',path.join(out,'js/30plus-phone-validation.js'));
 const css=styles.join('\n').replaceAll('/assets/','../assets/');
 await fs.writeFile(path.join(out,'css/30plus.css'),css);
 const assets=new Set([...css.matchAll(/url\(["']?(\.\.\/assets\/[^"')]+)["']?\)/g)].map(m=>m[1].slice(3)));
 html=html.replace(/(href|src)=(["'])(\/[^"']*)\2/g,(whole,attr,quote,value)=>{
  if(value.startsWith('//'))return whole;
  const url=new URL(value,'https://travel-awards-2026.vercel.app');let target;
  if(url.pathname.startsWith('/assets/')){target=url.pathname.slice(1);assets.add(target);}
  else if(url.pathname==='/dang-ky-30-plus')target='dang-ky-30-plus.html';
  else target=url.origin+url.pathname;
  return `${attr}=${quote}${target}${url.search}${url.hash}${quote}`;
 });
 for(const asset of assets){const decoded=decodeURIComponent(asset);await fs.mkdir(path.dirname(path.join(out,decoded)),{recursive:true});await fs.copyFile(path.join('public',decoded),path.join(out,decoded));}
 await fs.writeFile(path.join(out,'css/30plus.css'),await embedSvgAssets(css,path.resolve(out,'css')));
 html=html.replace('</head>','<link rel="stylesheet" href="css/30plus.css"><script defer src="js/lucide.min.js"></script><script defer src="js/30plus-phone-validation.js"></script><script defer src="js/30plus-form.js"></script></head>');
 const target=path.join(out,'dang-ky-30-plus.html');await fs.writeFile(target+'.tmp',html);await fs.rename(target+'.tmp',target);
}
