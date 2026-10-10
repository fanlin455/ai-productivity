(() => {
  const host=document.querySelector('#levelLab'); if(!host)return;
  const stage=host.dataset.stage;
  const badges={definition:'新质观察家',evolution:'时代旅行者',adoption:'趋势侦察员',mechanism:'价值架构师',industry:'产业探索家',evidence:'流程设计师',impact:'绿色工程师',innovation:'创新地图员',meaning:'价值发现者',governance:'风险守护者',jobs:'技能规划师',future:'人机协作家'};
  const quizzes={
    definition:['新质生产力的核心组合？',['高科技 · 高效能 · 高质量','只增加机器数量','只追求生产速度'],0],
    evolution:['智能化最突出的能力跃迁？',['放大体力','扩展认知与协作','连接电力'],1],
    adoption:['组织采用AI，是否等于产出必然提高？',['必然提高','还取决于流程与能力','与流程完全无关'],1],
    mechanism:['让AI进入产业，需要什么？',['只需要算力','数据、算力与领域知识协同','只需要模型参数'],1],
    industry:['医疗AI应如何使用？',['绕开专业人员','辅助专业人员判断','保证每次诊断正确'],1],
    evidence:['前后对比中的情景指数是什么？',['所有行业的真实平均值','流程变化的演示值','未来必然达到的指标'],1],
    impact:['更可持续的AI发展路径？',['无限增加算力','提升能效与清洁能源占比','忽略资源成本'],1],
    innovation:['专利家族数量能直接代表什么？',['创新活动规模','每项专利的质量','全部产业收入'],0],
    meaning:['AI如何转化为新质生产力？',['仅生成更多内容','知识复用与生产系统重组','只替换工具名称'],1],
    governance:['治理应发生在什么时候？',['部署后出事才治理','设计、部署、使用全过程','只在宣传阶段'],1],
    jobs:['岗位暴露意味着什么？',['岗位必然消失','部分任务可能受影响','全部劳动者立即失业'],1],
    future:['人机协作中谁承担最终责任？',['AI模型','负责使用与决策的人和组织','没有人需要负责'],1]
  };
  const names={definition:'组装新质引擎',evolution:'穿越生产现场',adoption:'时间观测台',mechanism:'生产要素实验室',industry:'产业任务配对',evidence:'流程改造台',impact:'绿色算力实验室',innovation:'全球创新观测站',meaning:'价值路径拼图',governance:'治理工具箱',jobs:'我的未来工作台',future:'人机协作调度台'};
  host.innerHTML=`<div class="lab-head"><span>PLAY LAB · 探索实验室</span><h2>${names[stage]}</h2></div><div id="labExperience" class="lab-experience"></div><div class="challenge"><div><span>关卡挑战</span><h3>${quizzes[stage][0]}</h3></div><div class="challenge-options">${quizzes[stage][1].map((s,i)=>`<button data-answer="${i}">${s}</button>`).join('')}</div><div id="challengeFeedback" role="status" aria-live="polite">完成探索，领取「${badges[stage]}」徽章</div></div>`;
  const area=host.querySelector('#labExperience');
  const slider=(id,label,value=50,min=0,max=100)=>`<label class="lab-slider" for="${id}"><span>${label}</span><output id="${id}Value">${value}</output><input id="${id}" aria-label="${label}" type="range" min="${min}" max="${max}" value="${value}"></label>`;
  const bars=values=>`<div class="lab-bars">${values.map(([label,v,unit=''])=>`<div><span>${label}</span><i><b style="width:${Math.min(100,Math.max(2,v))}%"></b></i><strong>${v}${unit}</strong></div>`).join('')}</div>`;
  const chips=(items)=>items.map((s,i)=>`<button class="lab-chip ${i===0?'active':''}" data-choice="${i}">${s}</button>`).join('');
  const stat=(label,value)=>`<article class="lab-stat"><span>${label}</span><strong>${value}</strong></article>`;
  function ranges(update){area.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{area.querySelector('#'+input.id+'Value').value=input.value;update()}));update()}
  function tabs(update){area.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{area.querySelectorAll('[data-choice]').forEach(b=>b.classList.toggle('active',b===btn));update(Number(btn.dataset.choice))}));update(0)}
  function matching(pairs){
    let matched=new Set();area.innerHTML=`<div class="match-board">${pairs.map(([a,b],i)=>`<label><strong>${a}</strong><select data-match="${i}"><option value="">选择对应项</option>${[...pairs].reverse().map(([x,y])=>`<option value="${y}">${y}</option>`).join('')}</select><span class="match-mark">?</span></label>`).join('')}</div><div class="match-meter" role="status">0 / ${pairs.length} 已匹配</div>`;
    area.querySelectorAll('select').forEach(select=>select.addEventListener('change',()=>{const i=Number(select.dataset.match),ok=select.value===pairs[i][1];if(ok)matched.add(i);else matched.delete(i);select.parentElement.classList.toggle('correct',ok);select.nextElementSibling.textContent=ok?'✓':'↻';area.querySelector('.match-meter').textContent=`${matched.size} / ${pairs.length} 已匹配`;}));
  }
  if(stage==='definition'){
    area.innerHTML=`<div class="lab-controls"><div class="scenario-presets"><span>选择情景</span><button data-preset="startup">创新突进</button><button data-preset="factory">智能制造</button><button data-preset="balanced">协同发展</button></div>${slider('tech','科技突破',50)}${slider('eff','效率提升',50)}${slider('quality','质量提升',50)}<span class="sim-label">情景演示 · 非统计评分</span></div><div class="lab-visual definition-simulator"><div class="engine-cluster"><div class="engine-ring"><b id="engineScore"></b><span>协同指数</span></div><svg class="triad-radar" viewBox="0 0 220 200" role="img" aria-label="科技、效能、质量三维雷达图"><path class="radar-grid" d="M110 18 198 170 22 170Z M110 55 166 151 54 151Z M110 91 134 133 86 133Z"/><path id="triadShape" class="triad-shape" d=""/><text x="110" y="12">科技</text><text x="204" y="182">效能</text><text x="4" y="182">质量</text></svg></div><div id="engineBars"></div><div id="engineNarrative" class="engine-narrative"></div></div>`;
    const update=()=>{const v=['tech','eff','quality'].map(id=>+area.querySelector('#'+id).value),score=Math.round(Math.cbrt(v.reduce((a,b)=>a*b,1)));area.querySelector('#engineScore').textContent=score;area.querySelector('#engineBars').innerHTML=bars(v.map((v,i)=>[['科技','效能','质量'][i],v]));const pts=[[110,18],[198,170],[22,170]].map(([x,y],i)=>{const r=v[i]/100;return [110+(x-110)*r,119+(y-119)*r]}).map(p=>p.join(',')).join(' ');area.querySelector('#triadShape').setAttribute('d',`M ${pts.replaceAll(' ',' L ')} Z`);const weakest=Math.min(...v),key=v.indexOf(weakest);area.querySelector('#engineNarrative').innerHTML=`<span>系统诊断</span><strong>${score>=75?'跃迁条件已形成':score>=55?'协同正在建立':'存在明显短板'}</strong><p>${score>=75?'三维能力保持较高水平，继续关注实际任务中的效果验证。':['科技突破不足会限制新能力边界。','效率提升不足会让技术难以进入流程。','质量提升不足会削弱价值与可信度。'][key]}</p>`};
    host.classList.add('engine-lab');
    document.body.classList.add('definition-page');
    const radar=area.querySelector('.triad-radar');
    radar.setAttribute('viewBox','-22 -14 270 220');
    radar.querySelectorAll('text').forEach(t=>t.setAttribute('text-anchor','middle'));
    const controls=area.querySelector('.lab-controls');
    controls.insertAdjacentHTML('afterbegin','<div class="engine-control-title"><span>01 / 能力调配</span><h3>点亮三维引擎</h3></div>');
    area.querySelector('.definition-simulator').insertAdjacentHTML('afterbegin','<div class="engine-visual-title"><span>ENGINE LIVE</span><b>协同状态</b><i>实时联动</i></div>');
    area.querySelector('#engineScore').setAttribute('aria-live','polite');
    ranges(update);area.querySelectorAll('[data-preset]').forEach(btn=>{btn.setAttribute('aria-pressed','false');btn.addEventListener('click',()=>{const sets={startup:[92,58,62],factory:[70,92,80],balanced:[82,84,86]};['tech','eff','quality'].forEach((id,i)=>{const input=area.querySelector('#'+id);input.value=sets[btn.dataset.preset][i];area.querySelector('#'+id+'Value').value=input.value});area.querySelectorAll('[data-preset]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});update()})});
  }
  if(stage==='evolution'){
    const eras=[['蒸汽工厂','⚙','体力 → 动力',20,15],['电气流水线','ϟ','单件 → 规模',48,30],['数字车间','▦','离线 → 连接',72,65],['智能工厂','✦','执行 → 协同',90,95]];
    area.innerHTML=`<div class="lab-controls">${slider('era','时代坐标',0,0,3)}<div class="era-labels">机械化 · 电气化 · 信息化 · 智能化</div></div><div id="factoryScene" class="factory-scene"></div>`;
    ranges(()=>{const d=eras[+area.querySelector('#era').value];area.querySelector('#factoryScene').innerHTML=`<div class="factory-machines">${Array.from({length:5},(_,i)=>`<span style="--delay:${i*.2}s">${d[1]}</span>`).join('')}</div><h3>${d[0]}</h3><b>${d[2]}</b>${bars([['自动化能力',d[3]],['认知协同',d[4]]])}<span class="sim-label">能力示意 · 非历史统计</span>`});
  }
  if(stage==='adoption'){
    const data=[20,47,58,50,56,50,55,78,88];
    area.innerHTML=`<div class="lab-controls">${slider('year','观测年份',2025,2017,2025)}<span class="sim-label">组织AI采用率 · Stanford AI Index 2026</span></div><div class="adoption-observer"><div class="people-grid" id="peopleGrid"></div><div id="adoptionReadout"></div></div>`;
    ranges(()=>{const year=+area.querySelector('#year').value,v=data[year-2017];area.querySelector('#peopleGrid').innerHTML=Array.from({length:100},(_,i)=>`<i class="${i<v?'lit':''}"></i>`).join('');area.querySelector('#adoptionReadout').innerHTML=stat('采用AI',v+'%')+stat('年份',year)});
  }
  if(stage==='mechanism'){
    area.innerHTML=`<div class="lab-controls">${slider('data','数据质量',60)}${slider('compute','算力投入',60)}${slider('knowledge','领域知识',60)}<span class="sim-label">情景模型 · 非真实效益预测</span></div><div class="lab-visual"><div class="value-chain"><span>数据</span><b>→</b><span>AI</span><b>→</b><span>产业</span><b>→</b><span>价值</span></div><div id="valueOutput"></div></div>`;
    ranges(()=>{const d=+area.querySelector('#data').value,c=+area.querySelector('#compute').value,k=+area.querySelector('#knowledge').value;area.querySelector('#valueOutput').innerHTML=bars([['感知',Math.round(d*.65+c*.35)],['生成',Math.round(c*.6+k*.4)],['预测',Math.round(d*.45+k*.4+c*.15)],['产业可用性',Math.round(Math.min(d,c,k)*.6+(d+c+k)/3*.4)]]);});
  }
  if(stage==='industry')matching([['制造','预测维护'],['医疗','辅助诊疗'],['农业','精准灌溉'],['教育','个性学习'],['交通','协同调度']]);
  if(stage==='evidence'){
    const scenarios=[['制造',[62,55,148,78]],['服务',[72,82,135,68]],['研发',[68,80,170,74]],['农业',[76,70,128,82]]];let active=0;
    area.innerHTML=`<div class="lab-controls"><div class="lab-tabs">${chips(scenarios.map(x=>x[0]))}</div>${slider('intensity','AI介入程度',50)}<span class="sim-label">情景指数 · 传统流程=100</span></div><div class="lab-visual"><div id="processStats" class="lab-stat-grid"></div><div class="process-track"><span>任务输入</span><i>→</i><span>智能辅助</span><i>→</i><span>人工复核</span><i>→</i><span>产出</span></div></div>`;
    const update=()=>{const rate=+area.querySelector('#intensity').value/100;area.querySelector('#processStats').innerHTML=scenarios[active][1].map((v,i)=>stat(['周期','缺陷','产出','资源投入'][i],Math.round(100+(v-100)*rate))).join('')};tabs(i=>{active=i;update()});ranges(update);
  }
  if(stage==='impact'){
    area.innerHTML=`<div class="lab-controls">${slider('load','算力规模',50)}${slider('saving','能效优化',40)}${slider('clean','清洁能源占比',30)}<span class="sim-label">假设情景 · 相对指数</span></div><div class="lab-visual"><div id="energyStats" class="lab-stat-grid"></div><div id="energyBars"></div><div id="balanceFlag" class="balance-flag"></div></div>`;
    ranges(()=>{const l=+area.querySelector('#load').value,s=+area.querySelector('#saving').value,c=+area.querySelector('#clean').value,energy=Math.round((20+l*.8)*(1-s*.006)),carbon=Math.round(energy*(1-c/100)),output=Math.round(l*.7+s*.3);area.querySelector('#energyStats').innerHTML=stat('效率指数',output)+stat('用电指数',energy)+stat('排放指数',carbon);area.querySelector('#energyBars').innerHTML=bars([['效率',output],['用电',energy],['排放',carbon]]);area.querySelector('#balanceFlag').textContent=output>=55&&carbon<=25?'✓ 绿色平衡达成':'目标：效率 ≥55 · 排放 ≤25';});
  }
  if(stage==='innovation'){
    const regions=[['中国',38210],['美国',6276],['韩国',4155],['日本',3409],['印度',1350]];
    area.innerHTML=`<div class="lab-controls"><div class="lab-tabs">${chips(regions.map(x=>x[0]))}</div><span class="sim-label">WIPO · 2014—2023 · 专利家族</span></div><div class="lab-visual"><div id="regionStats" class="lab-stat-grid"></div><div id="regionBars"></div></div>`;
    tabs(i=>{const total=regions.reduce((s,r)=>s+r[1],0),d=regions[i];area.querySelector('#regionStats').innerHTML=stat('专利家族',d[1].toLocaleString())+stat('前五地区中的占比',(d[1]/total*100).toFixed(1)+'%');area.querySelector('#regionBars').innerHTML=bars(regions.map(([name,v])=>[name,Math.round(v/38210*100),'%']));document.querySelectorAll('.map-bubble').forEach((bubble,index)=>{const labels=['美国','中国','韩国','日本','印度'];bubble.style.opacity=labels[index]===d[0]?'1':'.25'});});
  }
  if(stage==='meaning')matching([['重复劳动自动化','提效'],['预测质量偏差','提质'],['生成与筛选方案','创新'],['个性化服务供给','升级']]);
  if(stage==='governance')matching([['隐私泄露','数据最小化'],['算法偏见','偏差测试与复核'],['虚假内容','来源标识与溯源'],['岗位转型','再培训与保障'],['能源消耗','绿色算力']]);
  if(stage==='jobs'){
    const careers=[['设计师',['初稿生成','素材检索','方案评价','客户沟通']],['教师',['资源生成','学情整理','目标设计','成长陪伴']],['工程师',['代码草拟','文档整理','系统设计','安全责任']],['医生',['资料检索','病历整理','临床判断','患者沟通']]];
    area.innerHTML=`<div class="lab-controls"><div class="lab-tabs">${chips(careers.map(x=>x[0]))}</div><span class="sim-label">任务分工示意 · 非职业替代预测</span></div><div class="lab-visual"><div id="careerTasks"></div><div class="skill-choices"><span>选择升级技能</span>${['专业判断','沟通协作','AI工具','数据素养'].map(s=>`<button aria-pressed="false">${s}</button>`).join('')}</div><div id="skillCount" role="status">已选择 0 项技能</div></div>`;
    tabs(i=>{area.querySelector('#careerTasks').innerHTML=`<div class="task-lanes"><div><h3>AI辅助</h3>${careers[i][1].slice(0,2).map(x=>`<span>✦ ${x}</span>`).join('')}</div><div><h3>人的职责</h3>${careers[i][1].slice(2).map(x=>`<span>♧ ${x}</span>`).join('')}</div></div>`});area.querySelectorAll('.skill-choices button').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('selected');btn.setAttribute('aria-pressed',String(btn.classList.contains('selected')));area.querySelector('#skillCount').textContent=`已选择 ${area.querySelectorAll('.skill-choices .selected').length} 项技能`}));
  }
  if(stage==='future')matching([['生成备选方案','AI辅助'],['设定目标与价值','人的责任'],['快速检索整理','AI辅助'],['最终审核与问责','人的责任']]);
  host.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
    const ok=+btn.dataset.answer===quizzes[stage][2];host.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('wrong','right'));btn.classList.add(ok?'right':'wrong');const feedback=host.querySelector('#challengeFeedback');
    if(!ok){feedback.textContent='再试一次 ↻';return}
    let done=[];try{done=JSON.parse(localStorage.getItem('nq-badges')||'[]');if(!Array.isArray(done))done=[]}catch{}if(!done.includes(stage))done.push(stage);try{localStorage.setItem('nq-badges',JSON.stringify(done))}catch{}feedback.innerHTML=`<span class="earned-badge">✦ ${badges[stage]} · 已获得</span>`;feedback.classList.add('earned');
  }));
})();
