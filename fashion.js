(() => {
 'use strict';
 const pages=window.fashionPages;
 if(!Array.isArray(pages)||!pages.length)return;
 const total=pages.length,number=n=>String(n).padStart(2,'0');
 const page=document.createElement('article');page.id='fashion';page.className='fashion-page';page.setAttribute('data-view','');page.hidden=true;
 page.innerHTML=`<header class="fashion-heading"><div><p>SHUYAO CUI / FASHION DESIGN</p><h1>Fashion.</h1></div><span>${number(total)} PAGES<br>COMPLETE PORTFOLIO</span></header>
 <nav class="fashion-toolbar" aria-label="Fashion portfolio navigation"><span class="fashion-reading">01 / ${number(total)}</span><label>Jump to page <select aria-label="Jump to fashion page">${pages.map(p=>`<option value="${p.page}">${number(p.page)}</option>`).join('')}</select></label><button class="fashion-index-open">Page index <span>↗</span></button></nav>
 <div class="fashion-pages" aria-label="All ${total} portfolio pages in original order"></div>
 <footer class="fashion-end"><span>END OF PORTFOLIO / ${total} PAGES</span><button class="fashion-top">Back to top ↑</button></footer>
 <dialog class="fashion-index" aria-labelledby="fashion-index-heading"><header><h2 id="fashion-index-heading">Page index</h2><button class="fashion-index-close" aria-label="Close page index">Close ×</button></header><div class="fashion-thumbnails"></div></dialog>
 <dialog class="fashion-viewer" aria-label="Full-size fashion portfolio page"><header><span class="fashion-viewer-count"></span><div><button class="fashion-zoom" aria-pressed="false">Zoom in +</button><button class="fashion-viewer-close" aria-label="Close full-size page">Close ×</button></div></header><div class="fashion-viewer-stage"><img alt=""></div><footer><button class="fashion-prev" aria-label="Previous fashion page">← Previous</button><span>← → to browse · Esc to close</span><button class="fashion-next" aria-label="Next fashion page">Next →</button></footer></dialog>`;
 document.body.append(page);
 const list=page.querySelector('.fashion-pages'),jump=page.querySelector('select'),reading=page.querySelector('.fashion-reading');
 const index=page.querySelector('.fashion-index'),viewer=page.querySelector('.fashion-viewer'),viewImage=viewer.querySelector('img'),viewStage=viewer.querySelector('.fashion-viewer-stage');
 let viewed=1;
 const path=n=>`fashion-assets/page-${number(n)}.jpg`;
 function setReading(n){reading.textContent=`${number(n)} / ${number(total)}`;jump.value=String(n)}
 function scrollToPage(n){const target=document.getElementById(`fashion-page-${n}`);if(target){setReading(n);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}}
 function setZoom(on){viewer.classList.toggle('is-zoomed',on);const button=viewer.querySelector('.fashion-zoom');button.textContent=on?'Fit to screen −':'Zoom in +';button.setAttribute('aria-pressed',String(on))}
 function showPage(n){viewed=Math.max(1,Math.min(total,n));setZoom(false);viewImage.src=path(viewed);viewImage.alt=`Fashion portfolio — page ${viewed} of ${total}`;viewImage.width=pages[viewed-1].width;viewImage.height=pages[viewed-1].height;viewer.querySelector('.fashion-viewer-count').textContent=`PAGE ${number(viewed)} / ${number(total)}`;viewer.querySelector('.fashion-prev').disabled=viewed===1;viewer.querySelector('.fashion-next').disabled=viewed===total;viewStage.scrollTo(0,0)}
 const fragment=document.createDocumentFragment(),thumbFragment=document.createDocumentFragment();
 pages.forEach(p=>{const label=`Fashion portfolio — page ${p.page} of ${total}`;const figure=document.createElement('figure');figure.className='fashion-sheet';figure.id=`fashion-page-${p.page}`;figure.dataset.page=String(p.page);figure.innerHTML=`<button type="button" aria-label="Enlarge fashion page ${p.page}"><img src="${path(p.page)}" width="${p.width}" height="${p.height}" alt="${label}" loading="${p.page===1?'eager':'lazy'}" decoding="async"></button><figcaption><span>${number(p.page)} / ${number(total)}</span><span>VIEW FULL SIZE ↗</span></figcaption>`;figure.querySelector('button').addEventListener('click',()=>{showPage(p.page);viewer.showModal()});fragment.append(figure);
 const thumb=document.createElement('button');thumb.type='button';thumb.setAttribute('aria-label',`Go to fashion page ${p.page}`);thumb.innerHTML=`<img src="fashion-assets/thumbs/page-${number(p.page)}.jpg" width="${p.width}" height="${p.height}" alt="" loading="lazy"><span>${number(p.page)}</span>`;thumb.addEventListener('click',()=>{index.close();scrollToPage(p.page)});thumbFragment.append(thumb)});
 list.append(fragment);page.querySelector('.fashion-thumbnails').append(thumbFragment);
 const observer=new IntersectionObserver(entries=>{const candidates=entries.filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top-130)-Math.abs(b.boundingClientRect.top-130));if(candidates[0])setReading(Number(candidates[0].target.dataset.page))},{rootMargin:'-110px 0px -40% 0px',threshold:0});list.querySelectorAll('figure').forEach(f=>observer.observe(f));
 jump.addEventListener('change',()=>scrollToPage(Number(jump.value)));
 page.querySelector('.fashion-index-open').addEventListener('click',()=>index.showModal());page.querySelector('.fashion-index-close').addEventListener('click',()=>index.close());
 page.querySelector('.fashion-viewer-close').addEventListener('click',()=>viewer.close());viewer.querySelector('.fashion-prev').addEventListener('click',()=>showPage(viewed-1));viewer.querySelector('.fashion-next').addEventListener('click',()=>showPage(viewed+1));
 viewer.querySelector('.fashion-zoom').addEventListener('click',()=>setZoom(!viewer.classList.contains('is-zoomed')));
 viewer.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showPage(viewed+(e.key==='ArrowRight'?1:-1))}});
 [viewer,index].forEach(d=>{d.addEventListener('click',e=>{if(e.target===d)d.close()});d.addEventListener('close',()=>document.body.classList.toggle('fashion-dialog-open',Boolean(viewer.open||index.open)))});
 const lockObserver=new MutationObserver(()=>document.body.classList.toggle('fashion-dialog-open',Boolean(viewer.open||index.open)));[viewer,index].forEach(d=>lockObserver.observe(d,{attributes:true,attributeFilter:['open']}));
 page.querySelector('.fashion-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 addEventListener('hashchange',()=>{if(location.hash==='#fashion')setReading(1)});
})();
