(() => {
  const timelineData = [
    { year: "18世纪", name: "机械化", title: "机器放大人的体力", text: "蒸汽动力把生产从手工作坊推向机器体系，单位劳动能够驱动更大规模的物质生产。", shift: "体力 → 动力" },
    { year: "19—20世纪", name: "电气化", title: "标准化带来规模生产", text: "电力、流水线和现代组织方式协同，生产过程开始被拆分、测量并大规模复制。", shift: "单件 → 规模" },
    { year: "20世纪后期", name: "信息化", title: "计算机加速信息处理", text: "软件与网络连接组织和市场，自动化从机器动作延伸到信息流与业务流程。", shift: "离线 → 连接" },
    { year: "21世纪", name: "智能化", title: "AI扩展认知与创造", text: "模型能够感知、生成、预测与辅助决策，使知识被快速复用，并进入研发与生产的核心环节。", shift: "执行 → 协同" }
  ];

  const timeline = document.querySelector("#timeline");
  const detail = document.querySelector("#timelineDetail");
  (timeline ? timelineData : []).forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.ariaSelected = index === 3 ? "true" : "false";
    button.className = index === 3 ? "active" : "";
    button.innerHTML = `<span>${item.year}</span><b>${item.name}</b>`;
    button.addEventListener("click", () => selectTimeline(index));
    timeline.appendChild(button);
  });

  function selectTimeline(index) {
    if (!timeline || !detail) return;
    [...timeline.children].forEach((button, i) => {
      button.classList.toggle("active", i === index);
      button.ariaSelected = i === index ? "true" : "false";
    });
    const item = timelineData[index];
    detail.innerHTML = `<div><strong>能力跃迁</strong><h3>${item.shift}</h3></div><div><strong>${item.name}</strong><h3>${item.title}</h3></div>`;
  }
  selectTimeline(3);

  const adoption = [20,47,58,50,56,50,55,78,88];
  const years = [2017,2018,2019,2020,2021,2022,2023,2024,2025];
  function drawLineChart() {
    const host = document.querySelector("#adoptionChart");
    if (!host) return;
    const width = Math.max(700, host.clientWidth || 700), height = 340;
    const pad = {l:52,r:28,t:28,b:42};
    const x = i => pad.l + i * (width-pad.l-pad.r)/(years.length-1);
    const y = v => height-pad.b-v/100*(height-pad.t-pad.b);
    const path = adoption.map((v,i)=>`${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ');
    const grid = [0,25,50,75,100].map(v=>`<g><line x1="${pad.l}" y1="${y(v)}" x2="${width-pad.r}" y2="${y(v)}" stroke="rgba(139,184,218,.14)"/><text x="${pad.l-12}" y="${y(v)+4}" fill="#7890a3" font-size="12" text-anchor="end">${v}%</text></g>`).join('');
    const labels = years.map((yr,i)=>`<text x="${x(i)}" y="${height-12}" fill="#7890a3" font-size="12" text-anchor="middle">${yr}</text>`).join('');
    const dots = adoption.map((v,i)=>`<g class="chart-point" tabindex="0"><circle cx="${x(i)}" cy="${y(v)}" r="5" fill="#06101f" stroke="#59e6d2" stroke-width="3"/><text x="${x(i)}" y="${y(v)-12}" fill="#f2f7fb" font-size="13" text-anchor="middle">${v}%</text></g>`).join('');
    host.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${grid}${labels}<defs><linearGradient id="lineG" x1="0" x2="1"><stop stop-color="#7ca7ff"/><stop offset="1" stop-color="#59e6d2"/></linearGradient></defs><path d="${path}" fill="none" stroke="url(#lineG)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`;
  }
  drawLineChart();
  window.addEventListener("resize", drawLineChart);

  function drawMiniChart() {
    const host = document.querySelector("#miniAdoption");
    if (!host) return;
    const w = 520, h = 180, px = 12, py = 16;
    const x = i => px+i*(w-px*2)/(adoption.length-1);
    const y = v => h-py-v/100*(h-py*2);
    const line = adoption.map((v,i)=>`${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ');
    const area = `${line} L ${x(adoption.length-1)} ${h-py} L ${x(0)} ${h-py} Z`;
    host.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#59e6d2" stop-opacity=".35"/><stop offset="1" stop-color="#59e6d2" stop-opacity="0"/></linearGradient></defs><path d="${area}" fill="url(#areaG)"/><path d="${line}" fill="none" stroke="#59e6d2" stroke-width="4" vector-effect="non-scaling-stroke"/></svg>`;
  }
  drawMiniChart();

  const sankeyNodes = [
    {id:"data",label:"数据资源",col:0,value:40},{id:"compute",label:"算力设施",col:0,value:30},{id:"knowledge",label:"领域知识",col:0,value:30},
    {id:"perception",label:"感知",col:1,value:25},{id:"generation",label:"生成",col:1,value:25},{id:"prediction",label:"预测",col:1,value:25},{id:"decision",label:"决策",col:1,value:25},
    {id:"manufacturing",label:"制造",col:2,value:20},{id:"health",label:"医疗",col:2,value:15},{id:"science",label:"科研",col:2,value:17},{id:"agriculture",label:"农业",col:2,value:13},{id:"service",label:"服务",col:2,value:18},{id:"transport",label:"交通",col:2,value:17},
    {id:"efficiency",label:"效率提升",col:3,value:30},{id:"innovation",label:"创新加速",col:3,value:25},{id:"quality",label:"质量跃迁",col:3,value:25},{id:"inclusion",label:"普惠可及",col:3,value:10},{id:"green",label:"绿色转型",col:3,value:10}
  ];
  const sankeyLinks = [
    ["data","perception",10],["data","generation",10],["data","prediction",10],["data","decision",10],
    ["compute","perception",8],["compute","generation",8],["compute","prediction",7],["compute","decision",7],
    ["knowledge","perception",7],["knowledge","generation",7],["knowledge","prediction",8],["knowledge","decision",8],
    ["perception","manufacturing",5],["perception","health",4],["perception","science",3],["perception","agriculture",5],["perception","service",3],["perception","transport",5],
    ["generation","manufacturing",3],["generation","health",3],["generation","science",6],["generation","agriculture",2],["generation","service",7],["generation","transport",4],
    ["prediction","manufacturing",7],["prediction","health",3],["prediction","science",4],["prediction","agriculture",4],["prediction","service",2],["prediction","transport",5],
    ["decision","manufacturing",5],["decision","health",5],["decision","science",4],["decision","agriculture",2],["decision","service",6],["decision","transport",3],
    ["manufacturing","efficiency",7],["manufacturing","innovation",4],["manufacturing","quality",6],["manufacturing","green",3],
    ["health","efficiency",3],["health","innovation",4],["health","quality",6],["health","inclusion",2],
    ["science","efficiency",2],["science","innovation",11],["science","quality",3],["science","green",1],
    ["agriculture","efficiency",4],["agriculture","innovation",2],["agriculture","quality",3],["agriculture","inclusion",1],["agriculture","green",3],
    ["service","efficiency",8],["service","innovation",3],["service","quality",3],["service","inclusion",4],
    ["transport","efficiency",6],["transport","innovation",1],["transport","quality",4],["transport","inclusion",3],["transport","green",3]
  ];
  const sankeyCopy = {
    data:"数据把生产现场转化为可计算对象，是模型学习规律和持续反馈的基础。", compute:"算力决定模型训练、推理与规模化部署的物质边界。", knowledge:"领域知识为模型提供目标、约束和评价标准，决定智能是否真正可用。",
    perception:"识别图像、声音、文本与设备状态，让生产系统能够持续感知环境。", generation:"生成内容、代码与候选方案，降低知识生产和方案探索成本。", prediction:"从历史与实时数据中识别趋势，为维护、需求和风险提供提前量。", decision:"连接目标、约束与资源，辅助排产、调度和复杂选择。",
    manufacturing:"制造业将感知、预测与决策能力嵌入质量、设备和排产环节。", health:"医疗领域以辅助识别、知识检索和研发加速扩展专业能力。", science:"AI for Science扩大假设生成和候选筛选的空间。", agriculture:"农业通过遥感、预警和精准投入减少资源浪费。", service:"服务业把知识响应转化为可规模复制的组织能力。", transport:"交通系统依靠预测与协同决策提高安全和运行效率。",
    efficiency:"缩短周转时间、减少重复劳动并提高单位投入的产出。", innovation:"扩大可探索方案数量，加快从想法到验证的循环。", quality:"用持续感知与预测降低偏差，从事后纠错走向事前优化。", inclusion:"降低专业知识使用门槛，使服务覆盖更广泛的人群。", green:"通过精准投入、能效优化和系统调度支持低碳转型。"
  };
  function renderSankey() {
    const host = document.querySelector("#sankeyChart");
    if (!host) return;
    const w=1000,h=520,nodeW=18,scale=3.45,gap=14,xs=[28,300,580,880];
    const colors=["#7ca7ff","#59e6d2","#48b9e6","#ffc66d"];
    for(let col=0;col<4;col++){
      const group=sankeyNodes.filter(n=>n.col===col), total=group.reduce((s,n)=>s+n.value*scale,0)+(group.length-1)*gap;
      let y=(h-total)/2+18;
      group.forEach(n=>{n.x=xs[col];n.y=y;n.h=n.value*scale;n.out=0;n.in=0;y+=n.h+gap;});
    }
    const byId=Object.fromEntries(sankeyNodes.map(n=>[n.id,n]));
    const links=sankeyLinks.map(([source,target,value],i)=>{
      const s=byId[source],t=byId[target],th=value*scale;
      const sy=s.y+s.out+th/2,ty=t.y+t.in+th/2;s.out+=th;t.in+=th;
      const x1=s.x+nodeW,x2=t.x,c=(x2-x1)*.48;
      return `<path class="sankey-link" data-source="${source}" data-target="${target}" data-value="${value}" d="M${x1},${sy} C${x1+c},${sy} ${x2-c},${ty} ${x2},${ty}" stroke="${colors[s.col]}" stroke-width="${Math.max(2,th)}"><title>${s.label} → ${t.label}：概念权重 ${value}</title></path>`;
    }).join("");
    const labels=["生产要素","AI能力","产业场景","价值结果"].map((v,i)=>`<text class="sankey-col-label" x="${xs[i]}" y="16">${v}</text>`).join("");
    const nodes=sankeyNodes.map(n=>`<g class="sankey-node" data-node="${n.id}" tabindex="0"><rect x="${n.x}" y="${n.y}" width="${nodeW}" height="${n.h}" rx="4" fill="${colors[n.col]}"><title>${n.label}</title></rect><text x="${n.col===3?n.x-8:n.x+nodeW+8}" y="${n.y+n.h/2+4}" text-anchor="${n.col===3?'end':'start'}">${n.label}</text></g>`).join("");
    host.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${labels}${links}${nodes}</svg>`;
    const insight=document.querySelector("#sankeyInsight");
    host.querySelectorAll(".sankey-node").forEach(node=>{
      const focus=()=>{const id=node.dataset.node;host.querySelectorAll(".sankey-node").forEach(n=>n.classList.toggle("focus",n===node));host.querySelectorAll(".sankey-link").forEach(l=>l.classList.toggle("focus",l.dataset.source===id||l.dataset.target===id));insight.innerHTML=`<span>${byId[id].label}</span><p>${sankeyCopy[id]}</p>`;};
      node.addEventListener("mouseenter",focus);node.addEventListener("focus",focus);node.addEventListener("click",focus);
      node.addEventListener("mouseleave",()=>host.querySelectorAll(".focus").forEach(n=>n.classList.remove("focus")));
    });
  }
  renderSankey();

  const flowCopy = {
    data: ["数据资源", "把分散的信息转化为可计算、可分析、可复用的新型生产要素。"],
    compute: ["算力设施", "提供训练与推理的物质基础，让复杂模型能够进入规模化应用。"],
    knowledge: ["领域知识", "把行业规则、专家经验和真实场景约束注入模型，决定输出是否可用。"],
    efficiency: ["效率提升", "自动处理重复任务、辅助判断并缩短信息获取与流程周转时间。"],
    innovation: ["创新加速", "快速生成、模拟和筛选候选方案，扩大研发可探索的空间。"],
    quality: ["质量跃迁", "通过更连续的监测与预测，让生产从事后纠错转向事前优化。"]
  };
  const flowInsight = document.querySelector("#flowInsight");
  document.querySelectorAll("[data-flow]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-flow]").forEach(item => item.classList.toggle("active", item === button));
    const [title, copy] = flowCopy[button.dataset.flow];
    flowInsight.innerHTML = `<span>${title}</span><p>${copy}</p>`;
  }));

  const industryData = {
    manufacturing: { index:"01", name:"智能制造", summary:"视觉检测、预测性维护与柔性排产，让生产线从固定自动化走向动态优化。", items:[["生产工具","机器视觉与工业模型"],["生产流程","状态感知与预测维护"],["新价值","小批量、多品种、低损耗"]], tag:"从自动化走向自适应", radar:[92,76,90,48,78] },
    health: { index:"02", name:"智慧医疗", summary:"AI辅助影像识别、病例整理与药物研发，让专业知识更快抵达诊疗现场。", items:[["生产工具","医疗影像与临床模型"],["生产流程","筛查、辅助判断与随访"],["新价值","提升可及性与研发效率"]], tag:"让稀缺知识被更广泛使用", radar:[76,86,92,84,52] },
    science: { index:"03", name:"AI for Science", summary:"模型帮助研究者提出假设、预测结构并筛选实验方案，缩短从问题到验证的路径。", items:[["生产工具","科学基础模型"],["生产流程","模拟、预测与实验设计"],["新价值","扩大可探索的知识空间"]], tag:"把计算变成新的发现方法", radar:[72,98,82,58,64] },
    agriculture: { index:"04", name:"智慧农业", summary:"遥感、传感器与算法共同识别作物状态，支持精准灌溉、病虫害预警和农机作业。", items:[["生产工具","遥感识别与智能农机"],["生产流程","监测、预警与精准投入"],["新价值","稳产、节水与减损"]], tag:"让经验种田走向数据决策", radar:[80,70,84,72,94] },
    education: { index:"05", name:"智能教育", summary:"学习分析和生成式工具提供分层反馈，但教师仍负责目标、评价与成长陪伴。", items:[["生产工具","个性化学习助手"],["生产流程","诊断、反馈与资源生成"],["新价值","规模化的因材施教"]], tag:"增强教师，而不是绕开教师", radar:[74,78,76,96,50] },
    transport: { index:"06", name:"智能交通", summary:"AI连接道路感知、需求预测和信号控制，提高交通系统的实时协同能力。", items:[["生产工具","感知模型与调度算法"],["生产流程","预测、规划与协同控制"],["新价值","安全、通畅与低碳"]], tag:"从单点智能走向系统协同", radar:[88,72,90,68,86] }
  };
  const industryDetail = document.querySelector("#industryDetail");
  function selectIndustry(key) {
    if (!industryDetail) return;
    document.querySelectorAll("[data-industry]").forEach(btn => btn.classList.toggle("active", btn.dataset.industry === key));
    const d = industryData[key];
    industryDetail.innerHTML = `<span class="industry-index">INDUSTRY ${d.index}</span><h3>${d.name}</h3><div id="industryRadar" class="industry-radar" role="img" aria-label="${d.name}作用维度雷达图"></div>`;
    drawRadar(d.radar);
  }
  function drawRadar(values){
    const host=document.querySelector("#industryRadar");if(!host)return;const labels=["效率","创新","质量","普惠","绿色"],cx=90,cy=90,r=60;
    const point=(i,ratio)=>{const a=-Math.PI/2+i*Math.PI*2/5;return [cx+Math.cos(a)*r*ratio,cy+Math.sin(a)*r*ratio]};
    const rings=[.33,.66,1].map(level=>`<polygon class="radar-grid" points="${labels.map((_,i)=>point(i,level).join(',')).join(' ')}"/>`).join('');
    const axes=labels.map((label,i)=>{const [x,y]=point(i,1.25);return `<line x1="${cx}" y1="${cy}" x2="${point(i,1)[0]}" y2="${point(i,1)[1]}" stroke="rgba(124,167,255,.15)"/><text class="radar-label" x="${x}" y="${y+3}" text-anchor="middle">${label}</text>`}).join('');
    const shape=values.map((v,i)=>point(i,v/100).join(',')).join(' ');
    host.innerHTML=`<svg viewBox="0 0 180 180" aria-hidden="true">${rings}${axes}<polygon class="radar-shape" points="${shape}"/></svg>`;
  }
  document.querySelectorAll("[data-industry]").forEach(btn => btn.addEventListener("click",()=>selectIndustry(btn.dataset.industry)));
  selectIndustry("manufacturing");

  const compareData={
    manufacturing:{title:"智能制造",metrics:["生产周期","缺陷指数","柔性能力","能耗指数"],after:[62,55,148,78],note:"AI将视觉检测、设备预测和排产优化连接起来：周期、缺陷与能耗下降，柔性能力上升。"},
    service:{title:"客户服务",metrics:["响应时间","升级请求","单位解决量","培训成本"],after:[72,82,135,68],note:"知识助手把成熟员工的经验转化为即时建议，减少检索和培训负担。"},
    research:{title:"研发设计",metrics:["验证周期","重复试错","候选方案","研发成本"],after:[68,80,170,74],note:"生成与预测模型扩大候选空间，再通过模拟和筛选压缩验证周期。"},
    agriculture:{title:"智慧农业",metrics:["巡检时间","投入浪费","预警能力","资源消耗"],after:[76,70,128,82],note:"遥感识别与预测预警让投入更精准，把经验判断转化为连续监测。"}
  };
  function renderCompare(key){
    if (!document.querySelector('#compareChart')) return;
    const d=compareData[key],host=document.querySelector("#compareChart"),w=680,h=350,p={l:54,r:20,t:42,b:62},max=180;
    const y=v=>h-p.b-v/max*(h-p.t-p.b),group=(w-p.l-p.r)/d.metrics.length,bar=26;
    const grid=[0,50,100,150].map(v=>`<g><line x1="${p.l}" y1="${y(v)}" x2="${w-p.r}" y2="${y(v)}" stroke="rgba(139,184,218,.13)"/><text x="${p.l-10}" y="${y(v)+4}" fill="#7890a3" font-size="11" text-anchor="end">${v}</text></g>`).join('');
    const groups=d.metrics.map((m,i)=>{const x=p.l+i*group+group/2;return `<rect x="${x-bar-3}" y="${y(100)}" width="${bar}" height="${h-p.b-y(100)}" rx="4" fill="rgba(124,167,255,.35)"/><rect x="${x+3}" y="${y(d.after[i])}" width="${bar}" height="${h-p.b-y(d.after[i])}" rx="4" fill="${d.after[i]>100?'#59e6d2':'#ffc66d'}"/><text x="${x+3+bar/2}" y="${y(d.after[i])-8}" fill="#f2f7fb" font-size="12" text-anchor="middle">${d.after[i]}</text><text x="${x}" y="${h-30}" fill="#9fb4c6" font-size="12" text-anchor="middle">${m}</text>`}).join('');
    host.innerHTML=`<div class="compare-legend"><span><i style="background:rgba(124,167,255,.55)"></i>应用前 100</span><span><i style="background:#59e6d2"></i>上升指标</span><span><i style="background:#ffc66d"></i>下降指标</span></div><svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${grid}${groups}</svg>`;
    document.querySelector("#compareInsight").innerHTML=`<small>SCENARIO</small><h3>${d.title}</h3>`;
    document.querySelectorAll("[data-compare]").forEach(btn=>{btn.classList.toggle("active",btn.dataset.compare===key);btn.ariaSelected=btn.dataset.compare===key?"true":"false"});
  }
  document.querySelectorAll("[data-compare]").forEach(btn=>btn.addEventListener("click",()=>renderCompare(btn.dataset.compare)));
  renderCompare("manufacturing");

  function renderPatentMap(){
    const host=document.querySelector("#patentMap");if(!host)return;
    const lands=["M48 75 L130 42 L220 70 L205 120 L165 132 L145 170 L92 148 L55 108 Z","M165 164 L218 183 L238 240 L208 318 L178 278 L157 210 Z","M356 78 L418 68 L450 102 L410 121 L370 108 Z","M365 120 L437 126 L458 195 L410 270 L368 210 L350 155 Z","M430 78 L555 52 L684 78 L728 130 L663 167 L590 151 L542 192 L465 151 L430 112 Z","M626 229 L702 218 L738 262 L685 300 L627 276 Z","M242 24 L300 20 L316 54 L270 69 L236 49 Z"];
    const grid=[90,180,270].map(y=>`<path class="map-graticule" d="M20 ${y}H760"/>`).join('')+[130,260,390,520,650].map(x=>`<path class="map-graticule" d="M${x} 20V330"/>`).join('');
    const pts=[{n:"美国",v:6276,x:143,y:117},{n:"中国",v:38210,x:608,y:129},{n:"韩国",v:4155,x:658,y:135},{n:"日本",v:3409,x:700,y:133},{n:"印度",v:1350,x:558,y:174}];
    const bubbles=pts.map(p=>{const r=Math.sqrt(p.v)/6.2;return `<g><circle class="map-bubble" cx="${p.x}" cy="${p.y}" r="${r}"><title>${p.n}：${p.v.toLocaleString()}项</title></circle><text class="map-label" x="${p.x}" y="${p.y-r-7}" text-anchor="middle">${p.n}</text><text class="map-value" x="${p.x}" y="${p.y+4}" text-anchor="middle">${p.v.toLocaleString()}</text></g>`}).join('');
    host.innerHTML=`<svg viewBox="0 0 780 350" aria-hidden="true">${grid}${lands.map(d=>`<path class="map-land" d="${d}"/>`).join('')}${bubbles}</svg>`;
  }
  renderPatentMap();

  const risks = {
    privacy:["数据与隐私","训练与应用可能放大未经授权的数据收集、泄露与再识别风险。","治理路径：数据最小化、分级授权、脱敏审计与全生命周期安全。"],
    bias:["算法偏见","历史数据中的不平等可能被模型学习，并在招聘、信贷等决策中持续放大。","治理路径：代表性数据、偏差测试、人工复核与申诉机制。"],
    content:["虚假内容","低成本生成能力降低了伪造文本、图像和音视频的门槛。","治理路径：来源标识、内容溯源、平台检测与媒介素养。"],
    jobs:["就业转型","部分任务会被自动化，岗位能力结构与人才需求将发生变化。","治理路径：再培训、工作重构、社会对话与转型保障。"],
    energy:["能源消耗","模型训练、推理和数据中心扩张带来电力、水资源与碳排放压力。","治理路径：高效模型、绿色算力、清洁能源与能效披露。"],
    divide:["技术鸿沟","算力、数据和人才集中可能扩大企业、地区与群体之间的能力差距。","治理路径：公共基础设施、开放生态、教育普惠与中小企业支持。"]
  };
  const riskDetail = document.querySelector("#riskDetail");
  function selectRisk(key) {
    if (!riskDetail) return;
    document.querySelectorAll("[data-risk]").forEach(btn => btn.classList.toggle("active", btn.dataset.risk === key));
    const [title,copy,path] = risks[key];
    riskDetail.innerHTML = `<small>RISK &amp; GOVERNANCE</small><h3>${title}</h3><strong>${path.replace('治理路径：','')}</strong>`;
  }
  document.querySelectorAll("[data-risk]").forEach(btn=>btn.addEventListener("click",()=>selectRisk(btn.dataset.risk)));
  selectRisk("privacy");

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const counters = document.querySelectorAll("[data-counter]");
  const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = "1";
    const end = Number(entry.target.dataset.counter), start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now-start)/1100);
      entry.target.textContent = Math.round(end*(1-Math.pow(1-p,3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
  counters.forEach(el => counterObserver.observe(el));

  const progress = document.querySelector("#progressBar");
  const sections = [...document.querySelectorAll("main section[id]")];
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max ? scrollY/max*100 : 0}%`;
    const current = [...sections].reverse().find(section => scrollY + 120 >= section.offsetTop);
    document.querySelectorAll("nav a").forEach(link => link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`));
  }, {passive:true});

  const toggle = document.querySelector("#motionToggle");
  toggle.addEventListener("click", () => {
    const reduced = document.body.classList.toggle("reduce-motion");
    toggle.ariaPressed = String(reduced);
    toggle.textContent = reduced ? "恢复动态" : "减少动态";
    if (document.querySelector('#networkCanvas')) {
      cancelAnimationFrame(frame);
      if (!reduced) animate();
    }
  });

  const canvas = document.querySelector("#networkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let points = [], frame;
  function resetCanvas() {
    const dpr = Math.min(devicePixelRatio, 2);
    canvas.width = canvas.clientWidth*dpr; canvas.height = canvas.clientHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    points = Array.from({length: Math.min(90, Math.floor(innerWidth/14))},()=>({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2}));
  }
  function animate() {
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    for (const p of points) { p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1; }
    for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++) {
      const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<145){ctx.strokeStyle=`rgba(89,230,210,${(1-d/145)*.20})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    }
    points.forEach(p=>{ctx.fillStyle="rgba(124,167,255,.72)";ctx.beginPath();ctx.arc(p.x,p.y,1.7,0,Math.PI*2);ctx.fill();});
    if(!document.body.classList.contains("reduce-motion")) frame=requestAnimationFrame(animate);
  }
  resetCanvas(); animate();
  window.addEventListener("resize",()=>{cancelAnimationFrame(frame);resetCanvas();animate();});
})();
