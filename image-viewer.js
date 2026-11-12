(() => {
 'use strict';
 const dialog=document.createElement('dialog');dialog.className='image-viewer';dialog.setAttribute('aria-label','Image viewer');
 dialog.innerHTML='<header class="iv-header"><div><span class="iv-title"></span><span class="iv-count"></span></div><nav aria-label="Image tools"><button class="iv-minus" aria-label="Zoom out">−</button><output class="iv-scale" aria-label="Zoom level">100%</output><button class="iv-plus" aria-label="Zoom in">+</button><button class="iv-fit">Reset view</button><button class="iv-actual">1:1</button><button class="iv-close" aria-label="Close image viewer">Close ×</button></nav></header><div class="iv-stage"><div class="iv-plane"><img draggable="false" alt=""></div><span class="iv-message" role="status">Loading image…</span></div><footer class="iv-footer"><button class="iv-prev" aria-label="Previous image">← Previous</button><span>Scroll to zoom · Drag to move · Double-click to reset</span><button class="iv-next" aria-label="Next image">Next →</button></footer>';
 document.body.append(dialog);
 const stage=dialog.querySelector('.iv-stage'),plane=dialog.querySelector('.iv-plane'),image=plane.querySelector('img'),message=dialog.querySelector('.iv-message'),pointers=new Map();
 const state={gallery:[],index:0,zoom:1,x:0,y:0,width:1,height:1,ready:false};
 let pinch=null;
 const limit=(v,min,max)=>Math.max(min,Math.min(max,v));
 function paint(){
  const rect=stage.getBoundingClientRect();
  state.x=limit(state.x,-Math.max(0,(state.width*state.zoom+rect.width)/2-55),Math.max(0,(state.width*state.zoom+rect.width)/2-55));
  state.y=limit(state.y,-Math.max(0,(state.height*state.zoom+rect.height)/2-55),Math.max(0,(state.height*state.zoom+rect.height)/2-55));
  plane.style.width=state.width+'px';plane.style.height=state.height+'px';plane.style.transform=`translate(-50%,-50%) translate(${state.x}px,${state.y}px)`;image.style.transform=`scale(${state.zoom})`;dialog.querySelector('.iv-scale').textContent=Math.round(state.zoom*100)+'%';
 }
 function reset(){state.zoom=1;state.x=0;state.y=0;paint()}
 function fit(){if(!image.naturalWidth||!dialog.open)return;const rect=stage.getBoundingClientRect(),ratio=Math.min(Math.max(1,rect.width-36)/image.naturalWidth,Math.max(1,rect.height-36)/image.naturalHeight);state.width=image.naturalWidth*ratio;state.height=image.naturalHeight*ratio;state.ready=true;plane.hidden=false;message.hidden=true;reset()}
 function zoomTo(value,clientX,clientY){if(!state.ready)return;const rect=stage.getBoundingClientRect(),x=(clientX??rect.left+rect.width/2)-rect.left-rect.width/2,y=(clientY??rect.top+rect.height/2)-rect.top-rect.height/2,next=limit(value,.25,12),ratio=next/state.zoom;state.x=x-(x-state.x)*ratio;state.y=y-(y-state.y)*ratio;state.zoom=next;paint()}
 function show(index){state.index=limit(index,0,state.gallery.length-1);state.ready=false;pointers.clear();pinch=null;stage.classList.remove('is-dragging');const entry=state.gallery[state.index];plane.hidden=true;message.textContent='Loading image…';message.hidden=false;image.alt=entry.caption;dialog.querySelector('.iv-title').textContent=entry.caption;dialog.querySelector('.iv-count').textContent=`${state.index+1} / ${state.gallery.length}`;dialog.querySelector('.iv-prev').disabled=state.index===0;dialog.querySelector('.iv-next').disabled=state.index===state.gallery.length-1;image.src=entry.src;if(image.complete&&image.naturalWidth)fit()}
 image.addEventListener('load',fit);image.addEventListener('error',()=>{message.hidden=false;message.textContent='Image could not be loaded.';state.ready=false});
 document.addEventListener('click',event=>{
  if(!(event.target instanceof Element))return;
  const clicked=event.target.closest('img')||event.target.closest('button')?.querySelector('img');
  if(!clicked||clicked.closest('dialog,.disc,#strip,[data-no-image-viewer]'))return;
  const page=clicked.closest('.about-page')||clicked.closest('[data-view]');if(!page||page.id==='home')return;
  const sources=[...page.querySelectorAll('img')].filter(img=>!img.closest('dialog')&&!img.closest('[hidden]')&&(!img.closest('details')||img.closest('details').open)&&img.getAttribute('src'));
  const index=sources.indexOf(clicked);if(index<0)return;
  event.preventDefault();event.stopImmediatePropagation();
  state.gallery=sources.map(img=>({src:img.dataset.fullSrc||img.currentSrc||img.src,caption:img.alt||page.querySelector('h1')?.textContent||'Project image'}));
  dialog.showModal();document.body.classList.add('image-viewer-open');show(index);
 },true);
 stage.addEventListener('wheel',event=>{event.preventDefault();const rect=stage.getBoundingClientRect(),delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?rect.height:1);zoomTo(state.zoom*Math.exp(-limit(delta,-200,200)*.0025),event.clientX,event.clientY)},{passive:false});
 function gesture(){const points=[...pointers.values()];return points.length<2?null:{distance:Math.hypot(points[1].x-points[0].x,points[1].y-points[0].y),x:(points[0].x+points[1].x)/2,y:(points[0].y+points[1].y)/2}}
 stage.addEventListener('pointerdown',event=>{if(!state.ready||event.button!==0)return;event.preventDefault();pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});stage.setPointerCapture(event.pointerId);pinch=gesture();stage.classList.add('is-dragging')});
 stage.addEventListener('pointermove',event=>{const previous=pointers.get(event.pointerId);if(!previous)return;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});if(pointers.size===1){state.x+=event.clientX-previous.x;state.y+=event.clientY-previous.y;paint()}else{const next=gesture();if(pinch&&pinch.distance>0){state.x+=next.x-pinch.x;state.y+=next.y-pinch.y;zoomTo(state.zoom*next.distance/pinch.distance,next.x,next.y)}pinch=next}});
 function pointerEnd(event){pointers.delete(event.pointerId);pinch=gesture();if(!pointers.size)stage.classList.remove('is-dragging')}
 ['pointerup','pointercancel','lostpointercapture'].forEach(type=>stage.addEventListener(type,pointerEnd));stage.addEventListener('dblclick',reset);stage.addEventListener('dragstart',e=>e.preventDefault());
 dialog.querySelector('.iv-minus').addEventListener('click',()=>zoomTo(state.zoom/1.25));dialog.querySelector('.iv-plus').addEventListener('click',()=>zoomTo(state.zoom*1.25));dialog.querySelector('.iv-fit').addEventListener('click',reset);dialog.querySelector('.iv-actual').addEventListener('click',()=>zoomTo(image.naturalWidth/state.width));dialog.querySelector('.iv-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.iv-prev').addEventListener('click',()=>show(state.index-1));dialog.querySelector('.iv-next').addEventListener('click',()=>show(state.index+1));
 dialog.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','+','=','-','0'].includes(event.key)){event.preventDefault();if(event.key==='ArrowLeft')show(state.index-1);else if(event.key==='ArrowRight')show(state.index+1);else if(event.key==='0')reset();else zoomTo(state.zoom*(event.key==='-'?1/1.25:1.25))}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('image-viewer-open');pointers.clear();pinch=null});addEventListener('resize',()=>{if(dialog.open)fit()});
})();
