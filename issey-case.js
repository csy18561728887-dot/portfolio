(() => {
 const page=document.getElementById('iss');
 const images='issey-assets/';
 const scenes=[
  ['01-hiroshima','Hiroshima skyline','An imagined city at a moment of rupture.'],
  ['02-street','The city before','Street-level detail, everyday objects and depth.'],
  ['03-threshold','A threshold below','A low viewpoint turns the street into an invitation.'],
  ['04-bridge','Crossing the river','A long perspective connects the city and the journey.'],
  ['05-tatami','A room of memories','Books, sketches and warm afternoon light.'],
  ['06-conference','World Design Conference','An imagined setting for Tokyo, 1960.'],
  ['07-desk','The registration desk','The wider world becomes a personal encounter.'],
  ['08-atelier','The Paris atelier','Paper, fabric and the beginnings of form.'],
  ['09-paris','Paris in motion','A street scene inspired by May 1968.']
 ];
 const figure=(name,title,cls='')=>`<figure class="${cls}"><button class="iss-image" type="button" data-iss-image="${images+name}.png" data-caption="${title}" aria-label="Enlarge: ${title}"><img loading="lazy" decoding="async" src="${images+name}.png" alt="${title}"></button><figcaption>${title}<span>↗</span></figcaption></figure>`;
 page.classList.add('issey-case');
 page.innerHTML=`
 <a class="back" href="#aigc">← AIGC collection</a>
 <header class="iss-title"><div class="iss-kicker"><span>01 / AI VISUAL STORYTELLING</span><span class="iss-status"><i></i>WORK IN PROGRESS</span></div><h1>Unfolding<br><em>Issey Miyake.</em></h1><div class="iss-opening"><p>A life reimagined<br>as a world to explore.</p><p>A collaborative game-trailer project that moves from historical and visual references to AI-generated environments, spatial studies and cinematic sequences.</p></div></header>
 <dl class="iss-facts"><div><dt>FORMAT</dt><dd>Game trailer · Group project</dd></div><div><dt>VISUAL FOUNDATION</dt><dd>9 core scenes · 16:9</dd></div><div><dt>CURRENT CUT</dt><dd>01:36 · In production</dd></div><div><dt>INTENDED LENGTH</dt><dd>Approximately 2 minutes</dd></div></dl>
 <figure class="iss-film"><video controls playsinline preload="metadata" poster="${images}08-atelier.png" src="${images}trailer-wip.mp4" aria-label="Unfolding Issey Miyake — work-in-progress game trailer"></video><figcaption><span>THE TRAILER / CURRENT WIP CUT</span><span>Sound on for the full experience ↗</span></figcaption></figure>
 <nav class="iss-chapters" aria-label="Project chapters"><button data-iss-jump="iss-references">01 / References</button><button data-iss-jump="iss-world">02 / World building</button><button data-iss-jump="iss-continuity">03 / Continuity</button><button data-iss-jump="iss-motion">04 / Motion</button></nav>
 <section class="iss-section iss-overview"><p class="iss-label">THE CREATIVE CHALLENGE</p><div><h2>Many tools.<br>One coherent world.</h2><p class="iss-body">The project explores Issey Miyake’s memories, philosophy and creative evolution through a game-trailer format. The challenge is to carry a consistent visual language from a single concept image into a sequence of moving shots.</p><p class="iss-body">The workflow combines reference research, image generation, 3D exploration and repeated prompt adjustments. Each stage returns to the same scene concepts, so colour, objects, space and atmosphere remain connected.</p><p class="iss-credit">A collaborative project. The work shown documents the group’s evolving visual and trailer-production workflow.</p></div></section>
 <section class="iss-section" id="iss-references"><div class="iss-section-head"><p class="iss-label">01 / REFERENCE RESEARCH</p><h2>Before the prompt,<br><em>build the visual world.</em></h2></div><div class="iss-reference-grid"><div><span>01.1</span><h3>Visual language</h3><p>Pinterest research into illustration styles, composition and atmosphere established a direction for the scenes.</p></div><div><span>01.2</span><h3>Objects &amp; settings</h3><p>References for specific objects, interiors and streets helped give the imagined environments a material vocabulary.</p></div><div><span>01.3</span><h3>Historical context</h3><p>Period references informed the journey from Japan to Paris. The resulting images are creative interpretations, rather than archival reconstructions.</p></div></div><div class="iss-palette" aria-label="Recurring visual palette"><span style="--swatch:#243c42">Deep blue-grey</span><span style="--swatch:#9ba9ae">Atmospheric blue</span><span style="--swatch:#e9cf9d">Warm light</span><span style="--swatch:#a22f22">Vermilion accents</span></div></section>
 <section class="iss-world" id="iss-world"><div class="iss-section-head"><p class="iss-label">02 / CONCEPT DEVELOPMENT</p><h2>Nine scenes.<br><em>A shared visual language.</em></h2><p class="iss-body">Midjourney, GPT Image and Nano Banana were used to develop the reference direction into nine widescreen scene concepts. Muted environments, warm light and recurring red accents connect different places and moments.</p></div>
 ${figure('04-bridge','04 / Crossing the river — space, light and a sense of arrival','iss-wide')}
 <div class="iss-scene-grid">${scenes.map((s,i)=>`<figure>${figure(s[0],s[1]).replace(/^<figure class="">|<\/figure>$/g,'')}<p class="iss-scene-note"><span>${String(i+1).padStart(2,'0')}</span>${s[2]}</p></figure>`).join('')}</div>
 <p class="iss-image-note">AI-generated concept imagery · Select any image to view the supplied high-resolution version.</p></section>
 <section class="iss-section iss-continuity" id="iss-continuity"><div class="iss-section-head"><p class="iss-label">03 / SPATIAL &amp; ASSET CONTINUITY</p><h2>From a picture<br><em>to a place.</em></h2></div><div class="iss-two-col"><div><p class="iss-body">The concept images also served as a foundation for 3D models and camera exploration in TapNow. Establishing a spatial basis helped keep different views connected and supported more consistent scene transitions.</p><p class="iss-body">Object studies and alternative scene views extend the visual vocabulary beyond a single composition.</p><dl class="iss-principles"><div><dt>SPACE</dt><dd>A shared setting across changing viewpoints.</dd></div><div><dt>OBJECTS</dt><dd>Recognisable forms and material cues.</dd></div><div><dt>CAMERA</dt><dd>Shots developed from the same concept foundation.</dd></div></dl></div>${figure('pleated-object','Object study / A pleated form explored from multiple angles')}</div>${figure('spatial-study','Environment study / Exploring the Paris street as a spatial setting','iss-spatial')}</section>
 <section class="iss-section" id="iss-motion"><div class="iss-section-head"><p class="iss-label">04 / IMAGE TO MOTION</p><h2>Generate. Review.<br><em>Refine the shot.</em></h2></div><div class="iss-two-col"><p class="iss-body">The visual concepts were carried into video production through LibTV and TapNow. TapNow also supported 3D models and camera exploration. Prompt adjustments and repeated generations were used to develop multiple clips toward a cohesive trailer.</p><p class="iss-body">The current edit brings these experiments together into a 1 minute 36 second WIP. Production continues toward an approximately two-minute game trailer.</p></div><ol class="iss-workflow"><li><span>01</span><strong>Reference</strong><small>Style · objects · history</small></li><li><span>02</span><strong>Concept</strong><small>9 widescreen scenes</small></li><li><span>03</span><strong>Spatial study</strong><small>3D · camera exploration</small></li><li><span>04</span><strong>Generate &amp; refine</strong><small>Prompts · multiple takes</small></li><li><span>05</span><strong>Assemble</strong><small>WIP trailer edit</small></li></ol><div class="iss-motion-pair">${figure('09-paris','Scene foundation / Paris street')}${figure('shot-action','Shot study / Character, action and depth')}</div></section>
 <section class="iss-close"><span class="iss-status"><i></i>IN PRODUCTION</span><h2>The world is still<br><em>unfolding.</em></h2><p>Current WIP: 01:36 · Intended trailer: approximately 02:00</p><div class="iss-tools"><span>IMAGE DEVELOPMENT</span><p>Midjourney · GPT Image · Nano Banana</p><span>VIDEO &amp; SPATIAL EXPLORATION</span><p>LibTV · TapNow</p></div><button class="iss-rewatch" data-iss-jump="iss-film-top">Return to the trailer ↑</button></section>
 <div class="nx"><a href="#aigc">← AIGC collection</a><a href="#bank">Next: FX Policy Animation →</a></div>
 <dialog class="iss-lightbox" aria-label="High-resolution project image"><button class="iss-lightbox-close" aria-label="Close image">Close ×</button><img alt=""><p></p></dialog>`;
 // Keep the case image-led: one short explanation per stage.
 page.querySelector('.iss-opening>p:last-child').textContent='A collaborative game trailer exploring Issey Miyake’s world through AI concept art, spatial studies and moving images.';
 page.querySelector('.iss-overview').remove();
 const references=page.querySelector('#iss-references');
 references.querySelector('.iss-reference-grid').remove();
 references.querySelector('h2').innerHTML='Finding the<br><em>visual language.</em>';
 const refNote=document.createElement('p');refNote.className='iss-body';refNote.textContent='Pinterest references informed the style, historical settings and objects.';references.querySelector('.iss-section-head').append(refNote);
 page.querySelector('#iss-world .iss-body').textContent='Nine 16:9 scenes developed with Midjourney, GPT Image and Nano Banana.';
 page.querySelector('#iss-world>.iss-wide').remove();
 page.querySelectorAll('.iss-scene-note').forEach(n=>n.remove());
 page.querySelector('.iss-image-note').textContent='Select an image to view it in high resolution.';
 const continuity=page.querySelector('#iss-continuity');
 continuity.querySelector('.iss-body').textContent='TapNow: concept images → 3D models and camera studies, supporting continuity between shots.';
 continuity.querySelectorAll('.iss-body').forEach((n,i)=>{if(i)n.remove()});
 continuity.querySelector('.iss-principles').remove();
 const motion=page.querySelector('#iss-motion');
 motion.querySelector('.iss-body').textContent='LibTV + TapNow: repeated generation, prompt refinement and shot selection → the current WIP edit.';
 motion.querySelectorAll('.iss-body').forEach((n,i)=>{if(i)n.remove()});
 const outro=page.querySelector('.iss-close');outro.querySelector('h2').remove();outro.querySelector('.iss-status').textContent='GROUP PROJECT · IN PRODUCTION';
 page.querySelector('.iss-film').id='iss-film-top';
 const lightbox=page.querySelector('dialog');
 page.querySelectorAll('[data-iss-image]').forEach(b=>b.addEventListener('click',()=>{const img=lightbox.querySelector('img');img.src=b.dataset.issImage;img.alt=b.dataset.caption;lightbox.querySelector('p').textContent=b.dataset.caption;lightbox.showModal()}));
 lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
 page.querySelectorAll('[data-iss-jump]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.issJump).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})));
 const cover=document.querySelector('#strip a[href="#iss"] img');cover.src=images+'08-atelier.png';cover.alt='Unfolding Issey Miyake — Paris atelier concept';
})();
