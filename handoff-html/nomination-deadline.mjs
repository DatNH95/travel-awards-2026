import fs from 'node:fs/promises';
export async function syncNominationDeadline(){
 const source=await fs.readFile('src/components/hero-stage.tsx','utf8');
 const deadline=source.match(/const nominationDeadline = Date\.parse\('([^']+)'\)/)?.[1];if(!deadline)throw Error('Missing nomination deadline');
 const [year,month,day]=deadline.slice(0,10).split('-');const label=`${day}.${month}.${year}`;
 for(const file of (await fs.readdir('handoff-html')).filter(f=>f.endsWith('.html'))){const target='handoff-html/'+file;const old=await fs.readFile(target,'utf8');const html=old.replace(/2026-11-\d{2}T23:59:00\+07:00/g,deadline).replace(/(Hạn gửi đề cử: 23:59 ngày )\d{2}\.11\.2026/g,'$1'+label).replace(/(Nhận đề cử từ [^<]* đến 23:59 ngày )\d{2}\.11\.2026/g,'$1'+label);if(html!==old){await fs.writeFile(target+'.tmp',html);for(let attempt=0;;attempt++){try{await fs.rename(target+'.tmp',target);break;}catch(error){if(attempt>=12)throw error;await new Promise(resolve=>setTimeout(resolve,250));}}}}
 const script='handoff-html/js/handoff.js';const js=await fs.readFile(script,'utf8');await fs.writeFile(script,js.replace(/Date\.parse\('2026-11-\d{2}T23:59:00\+07:00'\)/g,`Date.parse('${deadline}')`));
}
