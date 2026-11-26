import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('handoff-html');
export async function finishRegistrationHandoff(){
 const files=(await fs.readdir(root)).filter(f=>f.endsWith('.html'));
 const initial=await fs.readFile(path.join(root,'dang-ky-de-cu.html'),'utf8');
 const checklist=initial.match(/<a class="button button--secondary nomination-checklist-link"[\s\S]*?<\/a>/)?.[0];
 const footer=initial.match(/<footer class="home-footer"[\s\S]*?<\/footer>/)?.[0];
 for(const file of files){
  let html=await fs.readFile(path.join(root,file),'utf8');
  if(checklist && html.includes('class="nomination-intro"') && !html.includes('nomination-checklist-link')) html=html.replace(/(<header class="nomination-intro">[\s\S]*?)(<\/header>)/,(_,intro,end)=>intro+checklist+'\n'+end);
  if(footer) html=html.replace(/<footer class="home-footer"[\s\S]*?<\/footer>/,footer);
  html=html.replace(/<template data-registration-part="\d+">[\s\S]*?<\/template>\r?\n?/g,'');
  const match=file.match(/^dang-ky-((?:tru-cot|tien-phong)-\d+)(?:-phan-\d+)?\.html$/);
  if(match){const part=Number(file.match(/-phan-(\d+)\.html$/)?.[1]||1)-1;html=html.replace(/<option value="(\d+)"[^>]*>/g,(_,value)=>`<option value="${value}"${Number(value)===part?' selected':''}>`);}
  if(match && match[1]!=='tien-phong-8'){
   const forms=[];
   for(let i=0;i<6;i++){
    const source=await fs.readFile(path.join(root,`dang-ky-${match[1]}${i?`-phan-${i+1}`:''}.html`),'utf8');
    let form=source.match(/<form class="nomination-registration-form"[\s\S]*?<\/form>/)?.[0];
    if(!form)throw new Error(`Missing registration part ${i+1}: ${file}`);
    form=form.replace(/<option value="(\d+)"[^>]*>/g,(_,value)=>`<option value="${value}"${Number(value)===i?' selected':''}>`);
    forms.push(`<template data-registration-part="${i}">${form}</template>`);
   }
   html=html.replace('</body>',forms.join('\n')+'\n</body>');
  }
  const target=path.join(root,file);await fs.writeFile(target+'.tmp',html);
  for(let attempt=0;;attempt++){try{await fs.rename(target+'.tmp',target);break;}catch(error){if(attempt>=12)throw error;await new Promise(resolve=>setTimeout(resolve,250));}}
 }
}
if(process.argv[1]?.endsWith('registration-handoff.mjs'))await finishRegistrationHandoff();
