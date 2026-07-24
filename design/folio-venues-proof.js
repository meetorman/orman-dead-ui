(() => {
  const hallModel = document.querySelector('[data-hall-model]');
  const details = {
    stage: {
      index:'01 · Show floor',
      title:'The stage at the short end.',
      copy:'The band faced the length of the drill floor, turning the hall’s long central volume into one shared room rather than a conventional theater.',
      facts:[['Room','Fieldstone drill hall'],['Capacity','5,000'],['Floor','General admission']]
    },
    floor: {
      index:'02 · Audience floor',
      title:'One unbroken field of people.',
      copy:'No orchestra pit and no sequence of theater balconies separated the room. The open drill floor carried the audience toward the stage, with bleachers held along the long walls.',
      facts:[['Plan','Long rectangular hall'],['Admission','$6.50 advance'],['Door','$7.50']]
    },
    trusses: {
      index:'03 · Roof structure',
      title:'A room carried by its span.',
      copy:'The roof structure repeats across the length of the hall. In the drawing, those frames become the measure of the room—part architecture, part musical staff.',
      facts:[['Element','Repeated roof trusses'],['Volume','Single open span'],['View','Interior layer']]
    },
    recording: {
      index:'04 · Recording path',
      title:'The two-track that outlived the room.',
      copy:'Betty Cantor-Jackson made her own two-track mix that night. That portable document became the version listeners copied, traded, and learned by heart.',
      facts:[['Engineer','Betty Cantor-Jackson'],['Format','Two-track'],['Legacy','National Recording Registry']]
    },
    shell: {
      index:'05 · Building shell',
      title:'Fieldstone outside. Vastness within.',
      copy:'Barton Hall reads as a fortress from the campus and as a single enormous volume inside. The cutaway keeps both identities visible at once.',
      facts:[['Building','Barton Hall'],['Material','Fieldstone'],['Campus','Cornell University']]
    }
  };

  const selectDetail = marker => {
    const detail = details[marker.dataset.venuePart];
    if (!detail) return;
    hallModel.querySelectorAll('.plate-marker').forEach(candidate => candidate.classList.toggle('active', candidate === marker));
    document.querySelector('[data-detail-index]').textContent = detail.index;
    document.querySelector('[data-detail-title]').textContent = detail.title;
    document.querySelector('[data-detail-copy]').textContent = detail.copy;
    document.querySelector('[data-detail-facts]').innerHTML = detail.facts.map(([term,value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  };

  hallModel?.addEventListener('click', event => {
    const marker = event.target.closest('[data-venue-part]');
    if (marker) selectDetail(marker);
  });
  hallModel?.addEventListener('keydown', event => {
    const marker = event.target.closest('[data-venue-part]');
    if (!marker || !['Enter',' '].includes(event.key)) return;
    event.preventDefault();
    selectDetail(marker);
  });

  document.querySelector('.plate-controls')?.addEventListener('click', event => {
    const button = event.target.closest('button[data-plate-view]');
    if (!button || !hallModel) return;
    document.querySelectorAll('[data-plate-view]').forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === button)));
    hallModel.classList.remove('view-structure','view-interior','view-show');
    hallModel.classList.add(`view-${button.dataset.plateView}`);
  });

  const search = document.querySelector('#venue-search');
  const venueRows = [...document.querySelectorAll('[data-venue-list] > a')];
  const filterButtons = [...document.querySelectorAll('[data-venue-filter]')];
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('.empty-state');
  let activeType = 'all';

  const filterVenues = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    venueRows.forEach(row => {
      const matchesText = !query || row.dataset.name.toLowerCase().includes(query);
      const matchesType = activeType === 'all' || row.dataset.type === activeType;
      row.hidden = !(matchesText && matchesType);
      if (!row.hidden) visible += 1;
    });
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  };

  search?.addEventListener('input', filterVenues);
  document.querySelector('.type-filter')?.addEventListener('click', event => {
    const button = event.target.closest('button[data-venue-filter]');
    if (!button) return;
    activeType = button.dataset.venueFilter;
    filterButtons.forEach(candidate => {
      const active = candidate === button;
      candidate.classList.toggle('active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    filterVenues();
  });

  document.querySelector('.global-search')?.addEventListener('submit', event => {
    event.preventDefault();
    const value = document.querySelector('#archive-search').value;
    search.value = value;
    filterVenues();
    document.querySelector('#browse').scrollIntoView({behavior:'smooth'});
  });
  document.addEventListener('keydown', event => {
    if (event.key !== '/' || ['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    event.preventDefault();
    search.focus();
  });
})();
