(() => {
  const allowed=()=>!document.body.classList.contains('reduce-motion')&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenery=document.createElement('div');scenery.className='living-scenery';scenery.ariaHidden='true';
  for(let i=0;i<18;i++){const leaf=document.createElement('i');leaf.style.cssText=`--left:${i*5.7}%;--top:${10+(i*17)%80}%;--duration:${14+i%7*3}s;--delay:-${i*2}s;--size:${5+i%5*3}px`;scenery.append(leaf)}
  document.body.prepend(scenery);
  const canvas=document.createElement('canvas');canvas.className='ambient-canvas';canvas.ariaHidden='true';document.body.prepend(canvas);
  const ctx=canvas.getContext('2d');let dots=[],frame=0,last=0;
  function resize(){const dpr=Math.min(devicePixelRatio,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);dots=Array.from({length:Math.min(65,Math.round(innerWidth/22))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.6,vy:-(.15+Math.random()*.4),r:1.5+Math.random()*3,phase:Math.random()*6.28}));}
  function paint(time){frame=requestAnimationFrame(paint);if(time-last<32||!allowed()||document.hidden)return;last=time;ctx.clearRect(0,0,innerWidth,innerHeight);dots.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.y<0)p.y=innerHeight;if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;ctx.fillStyle=`rgba(${i%3?'74,164,119':'220,177,71'},${.16+Math.sin(time*.001+p.phase)*.09})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){const a=dots[i],b=dots[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.strokeStyle=`rgba(86,155,108,${(1-d/125)*.075})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
  resize();frame=requestAnimationFrame(paint);window.addEventListener('resize',resize);window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  const map=document.querySelector('.quest-map');if(map){const traveler=document.createElement('span');traveler.className='route-traveler';traveler.textContent='✦';map.append(traveler);}
  document.querySelectorAll('.lab-visual,.industry-network,.chart-panel,.world-map-card').forEach(panel=>panel.classList.add('living-panel'));
  const toggle=document.querySelector('#motionToggle');
  if(toggle){try{if(localStorage.getItem('nq-motion')==='reduced'){document.body.classList.add('reduce-motion');toggle.textContent='恢复动态';toggle.ariaPressed='true'}}catch{}toggle.addEventListener('click',()=>{try{localStorage.setItem('nq-motion',document.body.classList.contains('reduce-motion')?'reduced':'full')}catch{}})}
  document.addEventListener('click',event=>{
    if(!allowed())return;
    const button=event.target.closest('button');if(!button)return;
    const ripple=document.createElement('span');ripple.className='tap-wave';ripple.style.left=(event.clientX-11)+'px';ripple.style.top=(event.clientY-11)+'px';document.body.append(ripple);setTimeout(()=>ripple.remove(),650);
    if(!button.matches('[data-answer].right'))return;
    const burst=document.createElement('div');burst.className='motion-sparks';burst.ariaHidden='true';
    for(let i=0;i<30;i++){const piece=document.createElement('i');piece.style.cssText=`--x:${30+Math.random()*40}%;--color:${['#efc45d','#7fbd99','#80b9d0','#e7a880'][i%4]};--delay:${Math.random()*.2}s;--drift:${(Math.random()-.5)*240}px`;burst.append(piece)}
    document.body.append(burst);setTimeout(()=>burst.remove(),1900);
  });
})();
