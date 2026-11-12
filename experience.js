(() => {
 'use strict';
 const data=window.experiencePages;
 if(!Array.isArray(data)||data.length!==14)return;
 const configs=[{id:'senti',title:'SentiEcho',start:1,end:5},{id:'fem',title:'Femseal',start:6,end:10},{id:'health',title:'Health Companion',start:11,end:14}];
 const pad=n=>String(n).padStart(2,'0'),source=n=>`experience-assets/page-${pad(n)}.jpg`;
 configs.forEach(config=>{
  const page=document.getElementById(config.id);if(!page)return;
  const pages=data.filter(p=>p.page>=config.start&&p.page<=config.end),total=pages.length;
  page.classList.add('experience-case');
  page.querySelector('.back').href='#experience';page.querySelector('.back').textContent='← Experience collection';
  // The supplied boards carry the research and process; avoid repeating it in prose.
  page.querySelectorAll('.txt>div').forEach(n=>n.remove());
  const gallery=document.createElement('section');gallery.className='exp-pages';gallery.setAttribute('aria-label',`${config.title} — complete project boards`);
  pages.forEach((p,i)=>{const figure=document.createElement('figure');figure.className='exp-board';figure.dataset.sourcePage=String(p.page);figure.innerHTML=`<button type="button" aria-label="Enlarge ${config.title} board ${i+1}"><img src="${source(p.page)}" width="${p.width}" height="${p.height}" alt="${config.title} project board ${i+1} — source PDF page ${p.page}" loading="${i===0?'eager':'lazy'}" decoding="async"></button><figcaption><span>${pad(i+1)} / ${pad(total)}</span><span>VIEW FULL SIZE ↗</span></figcaption>`;figure.querySelector('button').addEventListener('click',()=>{show(i);viewer.showModal();document.body.classList.add('fashion-dialog-open')});gallery.append(figure)});
  const oldGallery=page.querySelector('.gal');if(oldGallery)oldGallery.replaceWith(gallery);else page.querySelector('.nx').before(gallery);
  const viewer=document.createElement('dialog');viewer.className='fashion-viewer experience-viewer';viewer.setAttribute('aria-label',`${config.title} full-size project board`);viewer.innerHTML='<header><span class="exp-viewer-count"></span><div><button class="exp-zoom" aria-pressed="false">Zoom in +</button><button class="exp-close" aria-label="Close full-size board">Close ×</button></div></header><div class="fashion-viewer-stage"><img alt=""></div><footer><button class="exp-prev" aria-label="Previous project board">← Previous</button><span>← → to browse · Esc to close</span><button class="exp-next" aria-label="Next project board">Next →</button></footer>';page.append(viewer);
  const image=viewer.querySelector('img'),stage=viewer.querySelector('.fashion-viewer-stage');let current=0;
  function zoom(on){viewer.classList.toggle('is-zoomed',on);viewer.querySelector('.exp-zoom').textContent=on?'Fit to screen −':'Zoom in +';viewer.querySelector('.exp-zoom').setAttribute('aria-pressed',String(on))}
  function show(i){current=Math.max(0,Math.min(total-1,i));const p=pages[current];zoom(false);image.src=source(p.page);image.alt=`${config.title} — board ${current+1} of ${total}`;image.width=p.width;image.height=p.height;viewer.querySelector('.exp-viewer-count').textContent=`${config.title.toUpperCase()} / ${pad(current+1)} OF ${pad(total)}`;viewer.querySelector('.exp-prev').disabled=current===0;viewer.querySelector('.exp-next').disabled=current===total-1;stage.scrollTo(0,0)}
  viewer.querySelector('.exp-close').addEventListener('click',()=>viewer.close());viewer.querySelector('.exp-prev').addEventListener('click',()=>show(current-1));viewer.querySelector('.exp-next').addEventListener('click',()=>show(current+1));viewer.querySelector('.exp-zoom').addEventListener('click',()=>zoom(!viewer.classList.contains('is-zoomed')));
  viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1))}});viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});viewer.addEventListener('close',()=>document.body.classList.remove('fashion-dialog-open'));
 });
})();
