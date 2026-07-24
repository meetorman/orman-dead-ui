(() => {
  const hallModel = document.querySelector('[data-hall-model]');
  const details = {
    span:{index:'01 · Open span',title:'A room without columns.',copy:'The original drill shed opened across 362 by 228 feet without interior columns, leaving one continuous floor beneath the roof trusses.',facts:[['Length','362 feet'],['Width','228 feet'],['Open area','82,536 sq ft']]},
    floor:{index:'02 · Drill floor',title:'One continuous interior.',copy:'The uninterrupted floor made military formation possible and later allowed the same room to absorb athletics, examinations, commencement, registration, and large public events.',facts:[['Original use','Military drill'],['Current use','Indoor track'],['Plan','Long rectangular hall']]},
    trusses:{index:'03 · Roof structure',title:'A room carried by its span.',copy:'The roof structure repeats across the length of the hall. In the drawing, those frames become the measure of the room—part architecture, part musical staff.',facts:[['Element','Repeated roof trusses'],['Volume','Single open span'],['View','Interior layer']]},
    windows:{index:'04 · Daylight',title:'Tall windows in a stone shell.',copy:'Bands of tall windows admit light along the immense drill room and break the mass of the local-limestone exterior.',facts:[['Shell','Local limestone'],['Interior','Open drill shed'],['Building','Opened 1915']]},
    shell:{index:'05 · Building shell',title:'Fieldstone outside. Vastness within.',copy:'Barton Hall reads as a fortress from the campus and as a single enormous volume inside. The cutaway keeps both identities visible at once.',facts:[['Building','Barton Hall'],['Material','Fieldstone'],['Campus','Cornell University']]}
  };
  const selectDetail = marker => {
    const detail = details[marker.dataset.venuePart];
    if (!detail) return;
    hallModel.querySelectorAll('.plate-marker').forEach(candidate => candidate.classList.toggle('active',candidate === marker));
    document.querySelector('[data-detail-index]').textContent = detail.index;
    document.querySelector('[data-detail-title]').textContent = detail.title;
    document.querySelector('[data-detail-copy]').textContent = detail.copy;
    document.querySelector('[data-detail-facts]').innerHTML = detail.facts.map(([term,value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  };
  hallModel?.addEventListener('click',event => {
    const marker = event.target.closest('[data-venue-part]');
    if (marker) selectDetail(marker);
  });
  hallModel?.addEventListener('keydown',event => {
    const marker = event.target.closest('[data-venue-part]');
    if (!marker || !['Enter',' '].includes(event.key)) return;
    event.preventDefault();
    selectDetail(marker);
  });
  document.querySelector('.plate-controls')?.addEventListener('click',event => {
    const button = event.target.closest('button[data-plate-view]');
    if (!button || !hallModel) return;
    document.querySelectorAll('[data-plate-view]').forEach(candidate => candidate.setAttribute('aria-pressed',String(candidate === button)));
    hallModel.classList.remove('view-structure','view-interior','view-show');
    hallModel.classList.add(`view-${button.dataset.plateView}`);
  });
  const atlasMap = document.querySelector('[data-atlas-map]');
  document.querySelector('.atlas-controls')?.addEventListener('click',event => {
    const button = event.target.closest('button[data-map-view]');
    if (!button || !atlasMap) return;
    document.querySelectorAll('[data-map-view]').forEach(candidate => candidate.setAttribute('aria-pressed',String(candidate === button)));
    atlasMap.classList.remove('view-region','view-campus');
    atlasMap.classList.add(`view-${button.dataset.mapView}`);
    atlasMap.querySelectorAll('[data-map-layer]').forEach(layer => layer.setAttribute('aria-hidden',String(layer.dataset.mapLayer !== button.dataset.mapView)));
  });

  const storyArt = document.querySelector('[data-story-building-art]');
  const modelDrawing = hallModel?.querySelector('svg');
  if (storyArt && modelDrawing) {
    const drawing = modelDrawing.cloneNode(true);
    drawing.querySelectorAll('.plate-marker').forEach(marker => marker.remove());
    drawing.setAttribute('aria-label','Architectural drawing of Barton Hall');
    drawing.removeAttribute('aria-labelledby');

    const idMap = new Map();
    drawing.querySelectorAll('[id]').forEach(node => {
      const oldId = node.id;
      const newId = `story-${oldId}`;
      idMap.set(oldId,newId);
      node.id = newId;
    });
    drawing.querySelectorAll('*').forEach(node => {
      [...node.attributes].forEach(attribute => {
        let value = attribute.value;
        idMap.forEach((newId,oldId) => {
          value = value.replaceAll(`url(#${oldId})`,`url(#${newId})`).replaceAll(`#${oldId}`,`#${newId}`);
        });
        if (value !== attribute.value) node.setAttribute(attribute.name,value);
      });
    });
    storyArt.replaceChildren(drawing);
  }

  const story = document.querySelector('.venue-story-opening');
  const deadStory = document.querySelector('.dead-venue-story');
  const exhibits = document.querySelector('.venue-exhibits');
  const exhibitStack = document.querySelector('[data-exhibit-stack]');
  const measuredRoom = document.querySelector('.measured-room');
  const timeline = document.querySelector('.venue-timeline');
  const shows = document.querySelector('.venue-show-ledger');
  const facts = document.querySelector('.venue-archive');
  const featured = document.querySelector('.featured-venue');
  const oldRecord = document.querySelector('.venue-record');

  if (exhibitStack) {
    [document.querySelector('.place-atlas'),document.querySelector('.venue-plate'),document.querySelector('.show-layout')]
      .filter(Boolean)
      .forEach(exhibit => exhibitStack.append(exhibit));
  }
  featured?.remove();
  oldRecord?.remove();
  if (story && deadStory && exhibits && measuredRoom && timeline && shows && facts) {
    story.after(deadStory);
    deadStory.after(exhibits);
    exhibits.after(measuredRoom);
    measuredRoom.after(timeline);
    timeline.after(shows);
    shows.after(facts);
  }

  const journeyChapters = [
    {section:story,label:'Barton Hall'},
    {section:deadStory,label:'The Dead'},
    {section:exhibits,label:'Schematic'},
    {section:measuredRoom,label:'Dimensions'},
    {section:timeline,label:'Timeline'},
    {section:shows,label:'Shows'},
    {section:facts,label:'Facts'}
  ].filter(chapter => chapter.section);
  const journeyNav = document.querySelector('.place-nav');
  const journeyPosition = document.querySelector('[data-journey-position]');
  const journeyLinks = [...document.querySelectorAll('.place-nav a[href^="#"]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('venue-journey-scroll');
  document.body.classList.add('venue-scroll-ready');
  journeyChapters.forEach(({section}) => section.classList.add('journey-section'));

  const revealTargets = document.querySelectorAll([
    '.dead-venue-story>header',
    '.dead-story-copy',
    '.dead-story-register',
    '.venue-exhibits>.museum-heading',
    '.venue-exhibit-stack>*',
    '.measured-room>.museum-heading',
    '.measurement-sheet',
    '.venue-timeline>.museum-heading',
    '.timeline-track',
    '.venue-show-ledger>header',
    '.show-chapter',
    '.venue-archive>.museum-heading',
    '.archive-drawers'
  ].join(','));
  revealTargets.forEach((target,index) => {
    target.classList.add('journey-reveal');
    target.style.transitionDelay = `${(index % 3) * 55}ms`;
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-revealed',entry.isIntersecting));
    },{threshold:.1,rootMargin:'-5% 0px -8%'});
    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-revealed'));
  }

  let journeyFrame = 0;
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const phase = (progress,start,end) => clamp((progress - start) / (end - start),0,1);
  const updateJourney = () => {
    journeyFrame = 0;
    const viewport = innerHeight;
    const readingLine = viewport * .38;
    let activeIndex = 0;
    journeyChapters.forEach(({section},index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= readingLine) activeIndex = index;
    });

    journeyLinks.forEach(link => {
      const current = link.getAttribute('href') === `#${journeyChapters[activeIndex]?.section.id}`;
      link.classList.toggle('is-current',current);
      if (current) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    if (journeyPosition && journeyChapters[activeIndex]) {
      journeyPosition.textContent = `${String(activeIndex + 1).padStart(2,'0')} / ${String(journeyChapters.length).padStart(2,'0')} · ${journeyChapters[activeIndex].label}`;
    }

    if (!reduceMotion && story) {
      const rect = story.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1,rect.height - viewport),0,1);
      const compactStory = innerHeight < 560 && innerWidth > 560;
      const paragraphOne = phase(progress,.26,.38);
      const paragraphTwo = phase(progress,.7,.82);
      const paragraphThree = phase(progress,.82,.94);
      const footer = phase(progress,.9,.98);
      const titleOut = compactStory ? 1 - phase(progress,.18,.28) : 1;
      const paragraphOneOut = compactStory ? 1 - phase(progress,.61,.69) : 1;
      const paragraphTwoOut = compactStory ? 1 - phase(progress,.84,.91) : 1;
      story.style.setProperty('--story-title-opacity',String(titleOut));
      story.style.setProperty('--story-title-y','0px');
      story.style.setProperty('--story-p1-opacity',String(paragraphOne * paragraphOneOut));
      story.style.setProperty('--story-p1-y',`${(1 - paragraphOne) * 30}px`);
      story.style.setProperty('--story-p2-opacity',String(paragraphTwo * paragraphTwoOut));
      story.style.setProperty('--story-p2-y',`${(1 - paragraphTwo) * 42}px`);
      story.style.setProperty('--story-p3-opacity',String(paragraphThree));
      story.style.setProperty('--story-p3-y',`${(1 - paragraphThree) * 34}px`);
      story.style.setProperty('--story-art-opacity','.88');
      story.style.setProperty('--story-art-shell-y','0px');
      story.style.setProperty('--story-art-y','0px');
      story.style.setProperty('--story-art-scale','1');
      story.style.setProperty('--story-footer-opacity',String(footer * .72));
      story.style.setProperty('--story-footer-y',`${(1 - footer) * 20}px`);
    }
    if (!reduceMotion && deadStory) {
      const rect = deadStory.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (viewport + rect.height),0,1);
      deadStory.style.setProperty('--dead-title-x',`${(progress - .5) * -24}px`);
      deadStory.style.setProperty('--dead-copy-x',`${(progress - .5) * 18}px`);
    }
  };
  const requestJourneyUpdate = () => {
    if (!journeyFrame) journeyFrame = requestAnimationFrame(updateJourney);
  };
  addEventListener('scroll',requestJourneyUpdate,{passive:true});
  addEventListener('resize',requestJourneyUpdate,{passive:true});
  journeyNav?.addEventListener('click',requestJourneyUpdate);
  updateJourney();

  document.querySelector('.global-search')?.addEventListener('submit',event => {
    event.preventDefault();
    const query = document.querySelector('#archive-search').value.trim();
    location.href = `/design/folio-venues-proof.html?query=${encodeURIComponent(query)}#browse`;
  });
})();
