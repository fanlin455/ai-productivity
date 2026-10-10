(() => {
const host=document.querySelector('#chartGallery');if(!host)return;
const stage=host.dataset.stage;
const colors=['#4195d6','#21a8a0','#efb548','#8f9ae5','#ed8b75','#78bf89'];
const configs={
definition:[['radar','新质三维坐标',['科技','效能','质量'],[90,85,88]],['flow','生产要素重组',['技术突破','要素配置','产业转型','新质生产力'],[1,1,1,1]]],
evolution:[['heat','时代 × 生产能力',['机械化','电气化','信息化','智能化'],[[90,30,10,5],[80,95,30,15],[65,80,95,45],[70,90,95,95]],['动力','规模','连接','认知']],['area','能力边界扩展',['机械化','电气化','信息化','智能化'],[20,42,65,92]]],
adoption:[['area','组织AI采用率',['2017','2018','2019','2020','2021','2022','2023','2024','2025'],[20,47,58,50,56,50,55,78,88],null,'Stanford AI Index 2026 · %'],['waterfall','采用率年度变化',['2018','2019','2020','2021','2022','2023','2024','2025'],[27,11,-8,6,-6,5,23,10],null,'同源数据 · 百分点']],
mechanism:[['heat','能力 × 产业路径',['感知','生成','预测','决策'],[[90,85,65,70],[65,90,75,60],[85,80,95,90],[90,70,80,95]],['制造','科研','农业','交通']],['funnel','价值实现链',['可用数据','模型能力','流程嵌入','价值验证'],[100,80,60,40]]],
industry:[['treemap','AI产业应用图谱',['制造','医疗','科研','农业','教育','交通'],[1,1,1,1,1,1]],['radar','行业能力侧重',['效率','创新','质量','普惠','绿色'],[92,76,90,48,78],null,'智能制造 · 情景指数']],
evidence:[['dumbbell','制造流程前后',['周期','缺陷','柔性','能耗'],[62,55,148,78],null,'情景指数 · 应用前=100'],['scatter','场景效能坐标',['制造','服务','研发','农业'],[[85,75],[70,90],[95,65],[65,80]],['创新侧重','效率侧重']]],
impact:[['bars','生产率增幅',['平均员工','新手与低技能'],[14,35],null,'NBER · %'],['slope','全球数据中心用电',['2024','2030'],[415,945],null,'IEA基准情景 · TWh']],
innovation:[['bubbles','GenAI专利家族',['中国','美国','韩国','日本','印度'],[38210,6276,4155,3409,1350],null,'WIPO · 2014—2023'],['bars','地区私人AI投资',['美国','欧洲','中国'],[285.88,20.92,12.41],null,'AI Index 2026 · 2025 · 十亿美元']],
meaning:[['flow','从智能能力到价值',['知识复用','流程重组','提效提质','产业升级'],[1,1,1,1]],['radar','价值维度',['效率','质量','创新','普惠','绿色'],[90,85,95,70,75]]],
governance:[['heat','风险 × 治理工具',['隐私','偏见','虚假内容','岗位转型'],[[95,75,50,35],[60,95,75,55],[45,60,95,65],[35,50,65,95]],['授权','复核','溯源','培训']],['network','治理协作网络',['企业','监管','研究者','劳动者','公众','平台'],[1,1,1,1,1,1]]],
jobs:[['donut','全球岗位GenAI暴露',['存在一定暴露','其余岗位'],[25,75],null,'ILO · 2025 · 约25%'],['stacked','职业任务分工',['设计','教学','工程','医疗'],[45,35,50,30],null,'分工情景 · AI辅助 / 人的职责']],
future:[['network','人机协作生态',['人','AI','知识','工具','组织','责任'],[1,1,1,1,1,1]],['flow','协作闭环',['人定目标','AI提方案','人作审核','实践反馈'],[1,1,1,1]]]
};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=(x,y,s,size=13,anchor='middle',fill='#46677e')=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" fill="${fill}">${esc(s)}</text>`;
const tip=s=>`<title>${esc(s)}</title>`;
function draw(c){
const [type,title,labels,v,axes,source]=c,w=520,h=320;let out='';const max=Math.max(...v.filter(x=>typeof x==='number'),1);const line=(x1,y1,x2,y2,color='#dfeaf0',sw=1)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}"/>`;
if(type==='radar'){
 const n=labels.length,cx=260,cy=155,r=110,pt=(i,k)=>[cx+Math.cos(-Math.PI/2+i*2*Math.PI/n)*r*k,cy+Math.sin(-Math.PI/2+i*2*Math.PI/n)*r*k];
 [.25,.5,.75,1].forEach(k=>{out+=`<polygon points="${labels.map((_,i)=>pt(i,k).join(',')).join(' ')}" fill="${k===1?'#f3f9fd':'none'}" stroke="#d7e6ef"/>`});labels.forEach((s,i)=>{const [x,y]=pt(i,1.22);out+=line(cx,cy,...pt(i,1))+text(x,y+4,s)});out+=`<polygon class="gallery-radar" points="${v.map((x,i)=>pt(i,x/100).join(',')).join(' ')}" fill="#21a8a033" stroke="#21a8a0" stroke-width="3">${tip('机制示意：'+labels.map((s,i)=>s+' '+v[i]).join(' · '))}</polygon>`;
}else if(type==='heat'){
const rows=labels.length,cols=axes.length,cw=365/cols,ch=210/rows;labels.forEach((s,i)=>{out+=text(98,80+i*ch+ch/2,s,12,'end');axes.forEach((a,j)=>{const opacity=.12+v[i][j]/100*.75;out+=`<rect class="gallery-cell" x="${112+j*cw}" y="${80+i*ch}" width="${cw-5}" height="${ch-5}" rx="9" fill="#4195d6" opacity="${opacity}">${tip(s+' × '+a+'：关联示意')}</rect>`})});axes.forEach((a,j)=>out+=text(112+j*cw+cw/2,65,a,12));out+=text(260,315,'浅：关联较弱     深：关联较强',11);
}else if(type==='area'){
const x=i=>55+i*410/(labels.length-1),y=z=>260-z/max*205;[0,.5,1].forEach(k=>out+=line(55,y(k*max),465,y(k*max))+text(42,y(k*max)+4,Math.round(k*max),11,'end'));const d=v.map((z,i)=>`${i?'L':'M'}${x(i)},${y(z)}`).join(' ');out+=`<path d="${d} L465,260 L55,260 Z" fill="#4195d626"/><path class="gallery-line" d="${d}" fill="none" stroke="#4195d6" stroke-width="3"/>`;labels.forEach((s,i)=>{out+=`<circle class="gallery-dot" cx="${x(i)}" cy="${y(v[i])}" r="5" fill="#21a8a0">${tip(s+'：'+v[i])}</circle>`+text(x(i),285,s,labels.length>6?10:12)+text(x(i),y(v[i])-11,v[i],12)});
}else if(type==='waterfall'){
const scale=2.2,base=260,cw=410/labels.length;let total=20;out+=line(55,base,470,base)+text(260,25,'2017：20% → 2025：88%',13);v.forEach((z,i)=>{const previous=total;total+=z;const y=base-Math.max(previous,total)*scale;out+=`<rect x="${58+i*cw}" y="${y}" width="${cw-14}" height="${Math.abs(z)*scale}" rx="4" fill="${z>=0?'#21a8a0':'#ed8b75'}">${tip(labels[i]+'：'+previous+'% → '+total+'%')}</rect>`+text(58+i*cw+(cw-14)/2,y-10,(z>0?'+':'')+z,12)+text(58+i*cw+(cw-14)/2,290,labels[i],11);if(i<v.length-1)out+=line(58+i*cw+cw-14,base-total*scale,58+(i+1)*cw,base-total*scale,'#b3cbd8');});
}else if(type==='flow'){
labels.forEach((s,i)=>{const x=30+i*125;out+=`<rect x="${x}" y="112" width="105" height="80" rx="18" fill="${colors[i]}22" stroke="${colors[i]}" stroke-width="2"/>`+text(x+52,155,s,13);if(i<3)out+=`<path class="gallery-flow" d="M${x+108} 152h14" stroke="#21a8a0" stroke-width="3" stroke-dasharray="4 3"/>`});out+=text(260,245,'创新 → 应用 → 反馈',16);
}else if(type==='funnel'){
v.forEach((z,i)=>{const top=60+i*53,width=100+z*3;out+=`<path d="M${260-width/2} ${top}h${width}l-16 43H${276-width/2}Z" fill="${colors[i]}" opacity=".78">${tip(labels[i]+'：链路示意')}</path>`+text(260,top+27,labels[i],13,'middle','#fff')});
}else if(type==='treemap'){
labels.forEach((s,i)=>{const x=40+i%3*150,y=45+Math.floor(i/3)*125;out+=`<rect class="gallery-cell" x="${x}" y="${y}" width="140" height="115" rx="16" fill="${colors[i]}22" stroke="${colors[i]}"/>`+text(x+70,y+65,s,19)});
}else if(type==='bars'){
v.forEach((z,i)=>{const y=50+i*(240/v.length);out+=text(100,y+20,labels[i],13,'end')+`<rect x="115" y="${y}" width="320" height="32" rx="10" fill="#eef5f9"/><rect class="gallery-bar" x="115" y="${y}" width="${z/max*320}" height="32" rx="10" fill="${colors[i]}">${tip(labels[i]+'：'+z)}</rect>`+text(450,y+21,z,12,'start')});
}else if(type==='dumbbell'){
const x=z=>55+z/180*410;out+=text(260,30,'● 应用前100    ● 应用后',12);v.forEach((z,i)=>{const y=80+i*52;out+=text(62,y+5,labels[i],12,'end')+line(x(100),y,x(z),y,'#b4d5e8',5)+`<circle cx="${x(100)}" cy="${y}" r="7" fill="#8aafd5"/><circle cx="${x(z)}" cy="${y}" r="9" fill="#21a8a0">${tip(labels[i]+'：100 → '+z)}</circle>`+text(x(z),y-15,z,12)});
}else if(type==='scatter'){
out+=line(60,265,470,265)+line(60,265,60,40)+line(265,40,265,265)+line(60,153,470,153);labels.forEach((s,i)=>{const x=60+v[i][0]*4,y=265-v[i][1]*2.1;out+=`<circle class="gallery-dot" cx="${x}" cy="${y}" r="15" fill="${colors[i]}99" stroke="${colors[i]}">${tip(s+'：情景定位')}</circle>`+text(x,y-22,s,12)});out+=text(275,305,axes[0],12)+text(30,30,axes[1],12,'start');
}else if(type==='slope'){
out+=line(120,260,400,260);const y=z=>265-z/1000*215;out+=line(135,y(v[0]),385,y(v[1]),'#21a8a0',4);v.forEach((z,i)=>{const x=i?385:135;out+=`<circle class="gallery-dot" cx="${x}" cy="${y(z)}" r="9" fill="${colors[i]}"/>`+text(x,y(z)-19,z,24)+text(x,292,labels[i],14)});out+=text(260,180,'约 '+(v[1]/v[0]).toFixed(1)+' 倍',19);
}else if(type==='bubbles'){
labels.forEach((s,i)=>{const x=60+i*100,r=Math.sqrt(v[i]/max)*55;out+=`<circle class="gallery-dot" cx="${x}" cy="145" r="${r}" fill="${colors[i]}77" stroke="${colors[i]}" stroke-width="2">${tip(s+'：'+v[i].toLocaleString())}</circle>`+text(x,235,s,13)+text(x,260,v[i].toLocaleString(),12)});
}else if(type==='network'){
const cx=260,cy=160,r=115;labels.forEach((s,i)=>{const a=i*2*Math.PI/labels.length-Math.PI/2,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;out+=`<path class="gallery-flow" d="M${cx},${cy}L${x},${y}" stroke="#8bbccc" stroke-width="2" stroke-dasharray="5 4"/>`+`<circle class="gallery-dot" cx="${x}" cy="${y}" r="29" fill="${colors[i]}22" stroke="${colors[i]}"/>`+text(x,y+5,s,12)});out+=`<circle cx="${cx}" cy="${cy}" r="38" fill="#21a8a0"/>`+text(cx,cy+5,stage==='governance'?'治理':'协同',15,'middle','#fff');
}else if(type==='donut'){
const sum=v.reduce((a,b)=>a+b,0),r=85,length=2*Math.PI*r;let offset=0;v.forEach((z,i)=>{out+=`<circle cx="205" cy="150" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="32" stroke-dasharray="${z/sum*length} ${length}" stroke-dashoffset="${-offset}" transform="rotate(-90 205 150)">${tip(labels[i]+'：'+z+'%')}</circle>`;offset+=z/sum*length});out+=text(205,150,'25%',36)+text(205,180,'岗位暴露',13);labels.forEach((s,i)=>out+=`<rect x="340" y="${125+i*38}" width="14" height="14" rx="4" fill="${colors[i]}"/>`+text(363,137+i*38,s,11,'start'));
}else if(type==='stacked'){
labels.forEach((s,i)=>{const y=45+i*58;out+=text(90,y+21,s,13,'end')+`<rect x="110" y="${y}" width="${v[i]*3.3}" height="32" rx="6" fill="#4195d6">${tip('AI辅助：'+v[i]+'%（情景）')}</rect><rect x="${110+v[i]*3.3}" y="${y}" width="${(100-v[i])*3.3}" height="32" rx="6" fill="#21a8a0">${tip('人的职责：'+(100-v[i])+'%（情景）')}</rect>`});out+=text(260,305,'蓝：AI辅助    青：人的职责',12);
}
return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><g>${out}</g></svg>`;
}
host.innerHTML=`<div class="gallery-grid">${configs[stage].map(c=>`<article class="gallery-card"><header><h3>${c[1]}</h3><span>${c[5]||'机制示意 · 非统计数据'}</span></header><div class="gallery-svg">${draw(c)}</div></article>`).join('')}</div>`;
// Keep every visualization within the level's opening scene, under one heading.
const section=host.closest('.section');
const heading=section?.querySelector(':scope > .section-heading');
if(heading){
  const dashboard=document.createElement('div');
  dashboard.className='level-dashboard';
  const primary=document.createElement('div');
  primary.className='level-primary';
  let node=heading.nextSibling;
  while(node && node!==host){const next=node.nextSibling;primary.append(node);node=next;}
  heading.after(dashboard);
  dashboard.append(primary,host);
}else if(section){section.classList.add('integrated-finale');}
})();
