const levelNames=['definition','evolution','adoption','mechanism','industry','evidence','impact','innovation','meaning','governance','jobs','future'];
let visited=[];
try { visited=JSON.parse(localStorage.getItem('nq-journey')||'[]'); if(!Array.isArray(visited))visited=[]; } catch {}
const current=location.pathname.split('/').pop().replace('.html','');
if(levelNames.includes(current)&&!visited.includes(current)){visited.push(current);try{localStorage.setItem('nq-journey',JSON.stringify(visited))}catch{}}
let earned=[];try{earned=JSON.parse(localStorage.getItem('nq-badges')||'[]');if(!Array.isArray(earned))earned=[]}catch{}
document.querySelectorAll('[data-level]').forEach(node=>{if(earned.includes(node.dataset.level)){node.classList.add('explored');node.querySelector('.level-state').textContent='徽章已获得 ✦'}else if(visited.includes(node.dataset.level)){node.querySelector('.level-state').textContent='已访问 · 待挑战'}});
const count=document.querySelector('#questCount');
if(count){const completed=levelNames.filter(x=>earned.includes(x)).length;count.textContent=`${completed} / 12`;document.querySelector('#questFill').style.width=`${completed/12*100}%`;const next=levelNames.find(x=>!earned.includes(x));const link=document.querySelector('#continueQuest');link.href=`./${next||'future'}.html`;link.innerHTML=`${visited.length?'继续探索':'开启探索'} <span>→</span>`;}
