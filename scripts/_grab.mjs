import fs from 'fs'; import vm from 'vm';
function grab(src,name){
  const re=new RegExp('^\\s*const '+name+'\\s*=\\s*([\\[{])','m'); const m=re.exec(src); if(!m) return null;
  let i=m.index+m[0].length-1, depth=0, str=null, esc=false, tpl=[];
  for(let j=i;j<src.length;j++){const c=src[j];
    if(str){ if(esc){esc=false;continue} if(c==='\\'){esc=true;continue}
      if(str==='`'&&c==='$'&&src[j+1]==='{'){tpl.push(depth);depth++;str=null;j++;continue}
      if(c===str)str=null; continue}
    if(c==="'"||c==='"'||c==='`'){str=c;continue}
    if(c==='/'&&src[j+1]==='/'){while(src[j]!=='\n')j++;continue}
    if(c==='/'&&src[j+1]==='*'){j=src.indexOf('*/',j)+1;continue}
    if(c==='{'||c==='['||c==='(')depth++;
    if(c==='}'||c===']'||c===')'){depth--; if(tpl.length&&depth===tpl[tpl.length-1]&&c==='}'){tpl.pop();str='`';continue} if(depth===0)return src.slice(i,j+1)}
  } return null}
for(const f of process.argv.slice(2)){
  const html=fs.readFileSync(f,'utf8'); const s=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0]||'';
  let L=null,C=null;
  try{const a=grab(s,'LEARN'); if(a)L=vm.runInNewContext('('+a+')')}catch(e){L='ERR '+e.message.slice(0,60)}
  try{const a=grab(s,'chapters'); if(a)C=vm.runInNewContext('('+a+')')}catch(e){C='ERR '+e.message.slice(0,60)}
  const nt=Array.isArray(C)?C.reduce((n,c)=>n+(c.topics?.length||0),0):C;
  console.log(f.padEnd(50),'LEARN',typeof L==='object'&&L?Object.keys(L).length:L,'chapters',Array.isArray(C)?C.length:C,'topics',nt);
}
