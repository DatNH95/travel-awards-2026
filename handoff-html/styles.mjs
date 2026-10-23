// Development-only CSS packaging. Delivered pages load ordinary CSS files.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const folder=(await fs.readdir(path.resolve('node_modules/.pnpm'))).find(name=>name.startsWith('postcss@'));
const postcss=require(path.resolve('node_modules/.pnpm',folder,'node_modules/postcss'));

function withoutLayers(root) {
  root.walkAtRules('layer',rule=>{if(rule.nodes)rule.replaceWith(...rule.nodes);else rule.remove();});
}
function moveRule(rule,target) {
  let copy=rule.clone();
  for(let parent=rule.parent;parent.type!=='root';parent=parent.parent) {
    const wrapper=parent.clone({nodes:[]});wrapper.append(copy);copy=wrapper;
  }
  target.append(copy);rule.remove();
}
function iconDefinition(selector) {
  if (selector.includes('.nomination-guide-icon')) return true;
  return selector.split(',').every(part=>/^(?:\.home-footer-icon(?:--[\w-]+)?|\.home-minitalk-reminder-icon|\.cta-arrow|\.voting-(?:facebook|copylink|slider-arrow)-icon(?:--[\w-]+)?|\.voting-gallery-zoom\s*>\s*span|\.phase-2-scope \.ui-icon(?:::before)?|\.phase-2-scope \.ui-icon-grid(?:\s*>\s*div)?|\.phase-2-scope \.home-footer-icon--facebook)$/.test(part.trim()));
}
export async function packageHandoffStyles(out,{phase=1,foundation=path.resolve('handoff-html')}={}) {
  const fonts=postcss.root(),icons=postcss.root();
  if(phase===2) {
    fonts.append(postcss.parse(await fs.readFile(path.join(foundation,'css/font.css'),'utf8')).nodes);
    icons.append(postcss.parse(await fs.readFile(path.join(foundation,'css/icons.css'),'utf8')).nodes);
  }
  const files=['tokens','base',...(phase===2?['voting']:[]),'home',...(phase===1?['rules','news','nomination']:[])];
  for(const name of files) {
    const file=path.join(out,`css/${name}.css`),root=postcss.parse(await fs.readFile(file,'utf8'));
    withoutLayers(root);
    root.walkAtRules('font-face',rule=>moveRule(rule,fonts));
    root.walkRules(rule=>{
      if(rule.selector.includes('.news-site')&&rule.nodes.some(node=>node.prop==='--font-news-title'))moveRule(rule,fonts);
      else if(iconDefinition(rule.selector))moveRule(rule,icons);
    });
    root.walkAtRules(rule=>{if(rule.nodes&&!rule.nodes.length)rule.remove();});
    await fs.writeFile(file,root.toString().trim()+'\n');
  }
  if(phase===2)for(const name of ['regular-rounded','brands']) {
    const root=postcss.parse(await fs.readFile(path.resolve(`public/assets/icons/flaticon/uicons-${name}.css`),'utf8'));
    root.walkAtRules('font-face',rule=>{
      rule.walkDecls('src',decl=>{decl.value=`url('../assets/icons/flaticon/uicons-${name}.woff2') format('woff2')`;});
      fonts.append(rule.clone());rule.remove();
    });
    icons.append(root.nodes);
  }
  for(const root of [fonts,icons])root.walkComments(comment=>{if(/^(?:Local fonts\.|Shared icon shapes)/.test(comment.text))comment.remove();});
  await fs.writeFile(path.join(out,'css/font.css'),'/* Local fonts. Preserve the licenses in fonts/ and assets/icons/flaticon/NOTICE.md. */\n'+fonts.toString().trim()+'\n');
  await fs.writeFile(path.join(out,'css/icons.css'),'/* Shared icon shapes and glyphs. Component placement stays in the component CSS. */\n'+icons.toString().trim()+'\n');
  // Copied vendor styles are consolidated above; avoid duplicate font/glyph definitions.
  for(const name of ['regular-rounded','brands'])await fs.rm(path.join(out,`assets/icons/flaticon/uicons-${name}.css`),{force:true});
}

export async function updateHandoffStyleLinks(out) {
  for(const file of (await fs.readdir(out)).filter(name=>name.endsWith('.html'))) {
    const target=path.join(out,file),original=await fs.readFile(target,'utf8');let html=original;
    html=html.replace(/<link\b[^>]*href="(?:css\/(?:font|icons)\.css|assets\/icons\/flaticon\/uicons-[^"]+\.css)"[^>]*>\s*/g,'');
    html=html.replace(/<link rel="stylesheet" href="css\/base.css">/,'<link rel="stylesheet" href="css/font.css">\n<link rel="stylesheet" href="css/base.css">');
    // Icon definitions follow component CSS; contextual placement has greater specificity.
    html=html.replace(/(?=<script src="js\/)/,'<link rel="stylesheet" href="css/icons.css">\n');
    if(html===original)continue;
    for(let attempt=0;;attempt++) {
      try {await fs.writeFile(target,html);break;}
      catch(error){if(!['UNKNOWN','EBUSY','EPERM'].includes(error.code)||attempt>=7)throw error;await new Promise(resolve=>setTimeout(resolve,200));}
    }
  }
}
