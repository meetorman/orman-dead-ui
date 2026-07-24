(() => {
  const archiveBase = 'https://archive.org/download/gd1977-05-08.148737.SBD.Betty.Anon.Noel.t-flac2448/';
  const songPages = {
    'New Minglewood Blues':'/data/site/song/5-new-minglewood-blues.html',
    'Loser':'/data/site/song/6-loser.html',
    'El Paso':'/data/site/song/7-el-paso.html',
    'They Love Each Other':'/data/site/song/8-they-love-each-other.html',
    'Jack Straw':'/data/site/song/9-jack-straw.html',
    'Deal':'/data/site/song/10-deal.html',
    'Lazy Lightning':'/data/site/song/11-lazy-lightning.html',
    'Supplication':'/data/site/song/12-supplication.html',
    'Brown-Eyed Women':'/data/site/song/13-brown-eyed-women.html',
    'Mama Tried':'/data/site/song/14-mama-tried.html',
    'Row Jimmy':'/data/site/song/15-row-jimmy.html',
    'Dancin’ in the Streets':'/data/site/song/16-dancin-in-the-streets.html',
    'Scarlet Begonias':'/data/site/song/17-scarlet-begonias.html',
    'Fire on the Mountain':'/data/site/song/18-fire-on-the-mountain.html',
    'Estimated Prophet':'/data/site/song/19-estimated-prophet.html',
    'St. Stephen':'/data/site/song/20-st-stephen.html',
    'St. Stephen — reprise':'/data/site/song/20-st-stephen.html',
    'Not Fade Away':'/data/site/song/21-not-fade-away.html',
    'Morning Dew':'/data/site/song/22-morning-dew.html',
    'One More Saturday Night':'/data/site/song/23-one-more-saturday-night.html'
  };
  const performanceSummaries = {
    'I:New Minglewood Blues':'Opened the show; Garcia on the aluminum-necked Travis Bean TB500.',
    'I:They Love Each Other':'Keith Godchaux’s near-ragtime piano solo begins around 3:00.',
    'I:Jack Straw':'Weir and Garcia split the Jack Straw and Shannon vocals.',
    'I:Lazy Lightning':'Garcia slides one chord down a half step and back to open the segue.',
    'I:Supplication':'The paired passage ends on Weir’s hard-stop “Whoo!”',
    'I:Mama Tried':'Chosen for Mother’s Day; Lesh closes it with “Thanks, Mom.”',
    'I:Row Jimmy':'Garcia plays rare slide guitar.',
    'I:Dancin’ in the Streets':'Fifteen-minute closer; the Ithaca Journal called it “the highlight of the evening.”',
    'II:“Take a Step Back”':'Garcia asks the crushed front rows to move back before Set II.',
    'II:Scarlet Begonias':'Deadbase polls later named it the favorite version on record.',
    'II:Fire on the Mountain':'Deadbase favorite; barely two months old live.',
    'II:Estimated Prophet':'The 7/4 arrangement opens on Garcia’s Mu-Tron III.',
    'II:tuning':'Several minutes of tuning heighten the returning “St. Stephen.”',
    'II:St. Stephen':'First performance in nearly five years.',
    'II:Not Fade Away':'A rare 1977 show with no drum solo; this passage nearly becomes one.',
    'II:St. Stephen — reprise':'Closes roughly twenty-three minutes of uninterrupted music.',
    'II:Morning Dew':'Latvala: “possibly the best version yet, with a burning finish.”',
    'E:One More Saturday Night':'Keith Godchaux hammers the piano like another percussionist.'
  };
  const performanceHighlights = new Set([
    'I:Brown-Eyed Women',
    'I:Mama Tried',
    'I:Row Jimmy',
    'I:Dancin’ in the Streets',
    'II:Scarlet Begonias',
    'II:Fire on the Mountain',
    'II:St. Stephen',
    'II:Not Fade Away',
    'II:St. Stephen — reprise',
    'II:Morning Dew'
  ]);
  const tracks = [
    {set:'I',pos:1,title:'New Minglewood Blues',duration:'6:45',file:'gd77-05-08.s1t01.mp3',note:'Opened the show — and had also opened the previous night in Boston. Garcia played the aluminum-necked Travis Bean TB500.',refs:['c23','c22']},
    {set:'I',pos:2,title:'Loser',duration:'8:49',file:'gd77-05-08.s1t02.mp3',note:'Garcia’s solo reaches the top of the fretboard before turning back down.',refs:['b61–82']},
    {set:'I',pos:3,title:'El Paso',duration:'5:21',file:'gd77-05-08.s1t03.mp3',note:'Weir takes the death ballad at a bright, fast canter—the arrangement plays like a dance.',refs:['b61–82']},
    {set:'I',pos:4,title:'They Love Each Other',duration:'7:04',file:'gd77-05-08.s1t04.mp3',note:'Keith Godchaux moves into a near-ragtime piano solo around 3:00; Garcia answers with a woozy solo near 4:20.',refs:['b61–82']},
    {set:'I',tape:true,title:'tuning',duration:'2:04',file:'gd77-05-08.s1t05.mp3',note:'Stage tape between “They Love Each Other” and “Jack Straw.”'},
    {set:'I',pos:5,title:'Jack Straw',duration:'8:05',file:'gd77-05-08.s1t06.mp3',note:'Weir and Garcia split the Jack Straw and Shannon vocals. The choruses move slowly; the character dialogue swings faster before the band opens into the final passage.',refs:['b61–82']},
    {set:'I',pos:6,title:'Deal',duration:'7:25',file:'gd77-05-08.s1t07.mp3',note:'Garcia leads the arrangement from the opening vocal through the final guitar run.',refs:['b61–82']},
    {set:'I',pos:7,title:'Lazy Lightning',duration:'3:29',file:'gd77-05-08.s1t08.mp3',segue:true,note:'At the transition, the music drops to high hat and an off-kilter Lesh bass line; Garcia slides one chord down a half step and back to open the jam into “Supplication.”',refs:['b61–82']},
    {set:'I',pos:8,title:'Supplication',duration:'5:25',file:'gd77-05-08.s1t09.mp3',note:'The paired passage ends on Weir’s hard-stop “Whoo!” “Supplication” was performed without “Lazy Lightning” only twice in the band’s history.',refs:['b61–82']},
    {set:'I',pos:9,title:'Brown-Eyed Women',duration:'6:47',file:'gd77-05-08.s1t10.mp3',note:'Garcia extends the central solo for a second pass before returning to the verse.',refs:['b61–82']},
    {set:'I',pos:10,title:'Mama Tried',duration:'3:45',file:'gd77-05-08.s1t11.mp3',note:'Played for Mother’s Day. As it ended, Lesh said, “Thanks, Mom.”',refs:['c24','b77']},
    {set:'I',pos:11,title:'Row Jimmy',duration:'10:52',file:'gd77-05-08.s1t12.mp3',note:'Garcia plays rare slide guitar over Keith Godchaux’s woozy, winding organ; the performance is stretched into a slow, near-reggae sway.',refs:['b71–72']},
    {set:'I',pos:12,title:'Dancin’ in the Streets',duration:'15:43',file:'gd77-05-08.s1t13.mp3',note:'A vocal miscue opens the fifteen-minute set closer; Lesh’s sliding bass and Garcia’s Mu-Tron III then drive the passage the Ithaca Journal called “the highlight of the evening.”',refs:['b61–82']},
    {set:'II',tape:true,title:'“Take a Step Back”',duration:'1:55',file:'gd77-05-08.s2t01.mp3',note:'With the front rows being crushed, Garcia asked the room to move back; Weir turned the safety plea into “everybody’s favorite fun game.”',refs:['c25','b78']},
    {set:'II',pos:1,title:'Scarlet Begonias',duration:'11:26',file:'gd77-05-08.s2t02.mp3',segue:true,note:'Deadbase polls later named this the favorite “Scarlet Begonias” on record; its transitional jam into “Fire” became one of Cornell’s defining passages.',refs:['b32','c3']},
    {set:'II',pos:2,title:'Fire on the Mountain',duration:'15:26',file:'gd77-05-08.s2t03.mp3',note:'Barely two months old live—debuted March 18, 1977 at Winterland. Garcia uses the Mu-Tron III while Lesh’s bass carries the melody; Deadbase polls also named it the favorite version.',refs:['b78–95','c3']},
    {set:'II',pos:3,title:'Estimated Prophet',duration:'8:45',file:'gd77-05-08.s2t04.mp3',note:'The 7/4 arrangement opens with Garcia’s Mu-Tron III giving the passage its mechanical pulse before the band settles into Weir’s uneven meter.',refs:['b78–95']},
    {set:'II',tape:true,title:'tuning',duration:'4:09',file:'gd77-05-08.s2t05.mp3',note:'Several minutes of tuning delay the next entrance, making the first notes of the returning “St. Stephen” land with greater force.',refs:['b78–95']},
    {set:'II',pos:4,title:'St. Stephen',duration:'4:44',file:'gd77-05-08.s2t06.mp3',segue:true,note:'The first performance in nearly five years. Much of the East Coast crowd knew it only from Live/Dead or bootlegs; the opening notes triggered an immediate roar.',refs:['b78–95']},
    {set:'II',pos:5,title:'Not Fade Away',duration:'16:23',file:'gd77-05-08.s2t07.mp3',segue:true,note:'Near fourteen minutes, a drum passage nearly breaks free and then dissolves. Cornell became a rare 1977 show without a drum solo; Kreutzmann had played with an injured wrist.',refs:['c5','c45','b78–95']},
    {set:'II',pos:6,title:'St. Stephen — reprise',duration:'1:54',file:'gd77-05-08.s2t08.mp3',segue:true,note:'The band returns for the final verses, then moves directly into “Morning Dew,” completing roughly twenty-three minutes of uninterrupted “Stephen” > “Not Fade Away” > “Stephen.”',refs:['c3','b78–95']},
    {set:'II',pos:7,title:'Morning Dew',duration:'13:36',file:'gd77-05-08.s2t09.mp3',note:'Dick Latvala called it “possibly the best version yet, with a burning finish.” Dennis McNally’s account is that Garcia sustained the final tension two or three times longer than usual.',refs:['c4','b91–95']},
    {set:'E',pos:1,title:'One More Saturday Night',duration:'5:02',file:'gd77-05-08.s2t10.mp3',note:'Weir and Donna push the encore full-tilt while Keith Godchaux hammers the piano like another percussionist. Weir closes: “Thank you all. Good night.”',refs:['b95']}
  ].map(track => {
    const performanceKey = `${track.set}:${track.title}`;
    return {...track,url:archiveBase + track.file,page:songPages[track.title],summary:performanceSummaries[performanceKey] || track.note,notable:performanceHighlights.has(performanceKey)};
  });

  const setCounts = {I:12,II:7,E:1};
  const setNames = {I:'Set I',II:'Set II',E:'Encore'};
  const setLists = {I:document.querySelector('#set-one-list'),II:document.querySelector('#set-two-list'),E:document.querySelector('#encore-list')};
  const $ = selector => document.querySelector(selector);
  const transport = $('.transport');
  const audio = $('#audio');
  const play = $('#play');
  const seek = $('#seek');
  const title = $('#track-title');
  const setMark = $('.set-mark');
  const mark = $('#track-mark');
  const elapsed = $('#elapsed');
  const remaining = $('#remaining');
  const queue = $('#queue');
  const drawer = $('#queue-drawer');
  const list = $('#track-list');
  const signalBars = $('#signal-bars');
  const annotationPlay = $('#annotation-play');
  let index = 15;
  let setlistActivated = false;
  let audioContext;
  let analyser;
  let frequencyData;
  let animationFrame;

  const barCount = 128;
  const bars = signalBars ? Array.from({length:barCount},(_,i) => {
    const bar = document.createElement('i');
    const resting = .08 + .12 * (Math.sin(i * .71) + 1) / 2 + .05 * (Math.sin(i * .23 + 1.4) + 1) / 2;
    bar.style.setProperty('--bar-scale',resting.toFixed(3));
    bar.style.setProperty('--bar-opacity',(.28 + resting).toFixed(3));
    signalBars.appendChild(bar);
    return bar;
  }) : [];

  const format = seconds => {
    if (!Number.isFinite(seconds)) return '0:00';
    const value = Math.max(0,Math.round(seconds));
    return `${Math.floor(value / 60)}:${String(value % 60).padStart(2,'0')}`;
  };

  const referenceLink = ref => {
    const anchor = ref.replaceAll('–','-');
    return `<a href="http://192.168.2.33:8733/design/cornell-77-gold-standard.html#${anchor}">${ref}</a>`;
  };

  const renderSetlist = () => {
    Object.values(setLists).forEach(node => { if (node) node.innerHTML = ''; });
    tracks.forEach((track,trackIndex) => {
      const row = document.createElement('li');
      const previous = tracks[trackIndex - 1];
      const classes = ['tape-row'];
      if (track.tape) classes.push('stage-tape');
      if (track.segue) classes.push('segue-out');
      if (previous?.segue && previous.set === track.set) classes.push('segue-in');
      row.className = classes.join(' ');
      row.dataset.trackIndex = String(trackIndex);
      const order = track.tape ? '—' : String(track.pos).padStart(2,'0');
      const expandable = Boolean(track.note);
      const detailsId = `track-details-${trackIndex}`;
      const refs = (track.refs || []).map(referenceLink).join('');
      const songRecordLink = expandable && track.page ? `<a class="song-record-link" href="${track.page}">Open the song record <span aria-hidden="true">↗</span></a>` : '';
      const expandedDetails = expandable ? `<div class="track-fact-details"><span class="track-note-label">This performance</span><p>${track.note}<span class="row-refs">${refs}</span></p>${songRecordLink}</div>` : '';
      const summaryMarkup = track.notable ? `<p class="track-fact-summary">${track.summary}<span class="row-refs">${refs}</span></p>` : '';
      const inlineNote = track.note ? `<div class="track-row-note${track.notable ? ' is-notable' : ''}" id="${detailsId}">${summaryMarkup}${expandedDetails}</div>` : '';
      const titleMarkup = expandable
        ? `<button class="track-title-link track-title-toggle" type="button" data-details-index="${trackIndex}" aria-expanded="false" aria-controls="${detailsId}"><span class="track-title">${track.title}</span><span class="details-cue" aria-hidden="true">＋</span></button>`
        : track.page
        ? `<a class="track-title-link" href="${track.page}"><span class="track-title">${track.title}</span><span class="track-page-cue" aria-hidden="true">↗</span></a>`
        : `<span class="track-title-link track-title-static"><span class="track-title">${track.title}</span></span>`;
      row.innerHTML = `<div class="track-line">
        <button class="track-play" type="button" data-index="${trackIndex}" aria-label="Play ${track.title}"><span class="play-glyph" aria-hidden="true">▶</span><span class="pause-glyph" aria-hidden="true"></span></button>
        <span class="track-order">${order}</span>
        <span class="track-copyline">${titleMarkup}${track.segue ? '<span class="track-segue" aria-label="segues into">→</span>' : ''}</span>
        <span class="track-duration">${track.duration}</span><span class="track-progress" aria-hidden="true"></span>
      </div>${inlineNote}`;
      setLists[track.set]?.appendChild(row);
    });
  };

  const renderQueue = () => {
    list.innerHTML = tracks.map((track,i) => `<li><button type="button" data-index="${i}" class="${i === index ? 'active' : ''}"><span class="n">${track.tape ? '—' : String(track.pos).padStart(2,'0')}</span><span class="title">${track.title}</span><span class="set">${setNames[track.set]}</span></button></li>`).join('');
  };

  const renderAnnotation = track => {
    $('#annotation-set').textContent = setNames[track.set];
    $('#annotation-position').textContent = track.tape ? 'TAPE' : String(track.pos).padStart(2,'0');
    $('#annotation-title').textContent = track.title;
    $('#annotation-time').textContent = `${track.duration} on tape`;
    $('#annotation-note').textContent = track.note || 'The performance ledger holds the tape position and running time; no separate editorial note is attached to this passage.';
    $('#annotation-refs').innerHTML = (track.refs || []).map(referenceLink).join('');
  };

  const renderActiveState = () => {
    document.querySelectorAll('.tape-row').forEach(row => {
      const rowIndex = Number(row.dataset.trackIndex);
      const active = setlistActivated && rowIndex === index;
      const playing = active && !audio.paused;
      row.classList.toggle('active',active);
      row.classList.toggle('is-playing',playing);
      const rowPlay = row.querySelector('.track-play');
      rowPlay?.setAttribute('aria-label',`${playing ? 'Pause' : 'Play'} ${tracks[rowIndex].title}`);
      if (!active) row.style.setProperty('--track-position','0%');
    });
    renderQueue();
    renderAnnotation(tracks[index]);
  };

  const syncRailNavigation = () => {
    const hash = location.hash || '#top';
    const setlistHashes = new Set(['#setlist','#set-one','#set-two','#encore']);
    const activeHash = setlistHashes.has(hash) ? '#setlist' : hash;
    document.querySelectorAll('.archive-nav a').forEach(link => link.classList.toggle('active',link.getAttribute('href') === activeHash));
  };

  const setupAnalyser = () => {
    if (analyser || !bars.length) return analyser;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return null;
    try {
      audioContext = new Context();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = .78;
      analyser.minDecibels = -92;
      analyser.maxDecibels = -20;
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      frequencyData = new Uint8Array(analyser.frequencyBinCount);
    } catch (error) {
      analyser = null;
    }
    return analyser;
  };

  const drawSignal = () => {
    if (!analyser || audio.paused) return;
    analyser.getByteFrequencyData(frequencyData);
    const maxBin = frequencyData.length - 1;
    bars.forEach((bar,i) => {
      const position = i / (bars.length - 1);
      const exactBin = Math.pow(maxBin,position);
      const bin = Math.max(1,Math.min(maxBin,Math.floor(exactBin)));
      const neighbor = Math.min(maxBin,bin + 1);
      const blend = exactBin - bin;
      const energy = (frequencyData[bin] * (1 - blend) + frequencyData[neighbor] * blend) / 255;
      const scale = .08 + Math.pow(energy,.82) * .94;
      bar.style.setProperty('--bar-scale',Math.min(1,scale).toFixed(3));
      bar.style.setProperty('--bar-opacity',Math.min(.96,.34 + energy * .72).toFixed(3));
    });
    animationFrame = requestAnimationFrame(drawSignal);
  };

  const startSignal = async () => {
    if (!setupAnalyser()) return;
    if (audioContext.state === 'suspended') await audioContext.resume();
    cancelAnimationFrame(animationFrame);
    drawSignal();
  };

  const holdSignal = () => cancelAnimationFrame(animationFrame);

  const load = (nextIndex,autoplay = false) => {
    index = (nextIndex + tracks.length) % tracks.length;
    const track = tracks[index];
    audio.src = track.url;
    title.textContent = track.title;
    setMark.textContent = track.set;
    mark.textContent = track.tape ? 'TAPE' : `${String(track.pos).padStart(2,'0')} / ${String(setCounts[track.set]).padStart(2,'0')}`;
    seek.value = 0;
    transport.style.setProperty('--position','0%');
    elapsed.textContent = '0:00';
    remaining.textContent = `−${track.duration}`;
    renderActiveState();
    if (autoplay) audio.play().catch(() => transport.classList.remove('playing'));
  };

  const sync = () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const ratio = duration ? audio.currentTime / duration : 0;
    seek.value = Math.round(ratio * 1000);
    transport.style.setProperty('--position',`${ratio * 100}%`);
    elapsed.textContent = format(audio.currentTime);
    remaining.textContent = `−${format(duration - audio.currentTime)}`;
    const activeRow = document.querySelector(`.tape-row[data-track-index="${index}"]`);
    activeRow?.style.setProperty('--track-position',`${ratio * 100}%`);
  };

  renderSetlist();
  syncRailNavigation();
  window.addEventListener('hashchange',syncRailNavigation);
  document.querySelector('.personnel-ledger')?.addEventListener('click',event => {
    const button = event.target.closest('button[data-lineup-person]');
    if (!button) return;
    const person = button.dataset.lineupPerson;
    document.querySelectorAll('.lineup-person').forEach(candidate => {
      const active = candidate === button;
      candidate.classList.toggle('active',active);
      candidate.setAttribute('aria-pressed',String(active));
    });
    document.querySelectorAll('[data-lineup-panel]').forEach(panel => {
      panel.hidden = panel.dataset.lineupPanel !== person;
    });
  });
  const instrumentParts = {
    'neck-pickup': {
      index:'01 · Signal source', title:'Neck pickup',
      description:'The pickup nearest the neck hears a broader section of the string, producing the roundest and fullest of the three voices.',
      acts:'String vibration near the neck', matters:'Warmest pickup position',
      note:'Each pickup has its own on/off switch, so the TB500 is not restricted to the usual three- or five-position combinations.'
    },
    'middle-pickup': {
      index:'02 · Signal source', title:'Middle pickup',
      description:'The center single-coil supplies the in-between voice. Its independent switch lets it run alone or join either—or both—of the other pickups.',
      acts:'String vibration at center', matters:'Adds independent combinations',
      note:'The separate switching system is part of what makes the TB500 control layout worth exploring rather than merely captioning.'
    },
    'bridge-pickup': {
      index:'03 · Signal source', title:'Bridge pickup',
      description:'Closest to the bridge, this pickup captures the tightest, brightest part of the string’s motion and gives the instrument its sharpest attack.',
      acts:'String vibration by bridge', matters:'Brightest, most immediate voice',
      note:'Its tighter response and sharper attack made the bridge pickup the most cutting of the three voices.'
    },
    'master-volume': {
      index:'04 · Output control', title:'Master volume',
      description:'The final level control sits after the onboard effects loop. Garcia could turn the guitar down without starving the Mu-Tron of input signal.',
      acts:'The returned signal', matters:'Effect response stays consistent',
      note:'Because the volume sits after the loop return, it changes the final output without changing the level feeding the effects.'
    },
    'stacked-tone': {
      index:'05 · Dual control', title:'Bridge / middle tone',
      description:'A stacked concentric knob places two tone circuits on one shaft: one for the bridge pickup and one for the middle pickup.',
      acts:'Bridge and middle pickups', matters:'Two controls in one footprint',
      note:'The two rings can be adjusted separately even though they occupy a single position on the guitar.'
    },
    'neck-tone': {
      index:'06 · Tone control', title:'Neck tone',
      description:'The neck pickup receives its own conventional tone control, separate from the stacked bridge-and-middle pair.',
      acts:'Neck pickup only', matters:'Independent high-frequency rolloff',
      note:'Together, the three knobs provide master volume plus an individual tone path for all three pickups.'
    },
    'pickup-switches': {
      index:'07 · Selection bank', title:'Three pickup switches',
      description:'Three small on/off toggles select the pickups independently. Any one, any pair, or all three can be active together.',
      acts:'Neck · middle · bridge', matters:'More combinations than a blade selector',
      note:'Selection is separate from playing: these switches choose the guitar’s electrical voice before the signal enters the effects loop.'
    },
    'obel-jacks': {
      index:'08 · Send / return', title:'OBEL connections',
      description:'The modified cable path sends the pickup signal out to the effects and returns it to the guitar before the master volume.',
      acts:'Onboard effects loop', matters:'Effects see a stable input level',
      note:'The second connection provides the guitar’s conventional output path and allows the external loop to be bypassed.'
    },
    'period-sticker': {
      index:'09 · Sticker history', title:'“The Enemy Is Listening”',
      description:'The orange “THE ENEMY IS LISTENING” sticker occupied the lower bout of Garcia’s white TB500 through spring 1977. Later, the now-infamous “ASS, GRASS or GAS — NOBODY RIDES FREE” sticker was placed directly over it.',
      acts:'Tour marker · spring 1977', matters:'The original layer in one of Garcia’s legendary sticker histories',
      note:'The later sticker covered this original layer; “THE ENEMY IS LISTENING” remains underneath it.'
    }
  };
  const instrumentCanvas = document.querySelector('.instrument-canvas');
  const instrumentImage = instrumentCanvas?.querySelector('img');
  if (instrumentCanvas && instrumentImage) {
    const alphaMap = document.createElement('canvas');
    const alphaContext = alphaMap.getContext('2d',{willReadFrequently:true});
    let alphaPixels = null;
    const prepareAlphaMap = () => {
      if (!instrumentImage.naturalWidth || !instrumentImage.naturalHeight || !alphaContext) return;
      alphaMap.width = instrumentImage.naturalWidth;
      alphaMap.height = instrumentImage.naturalHeight;
      alphaContext.clearRect(0,0,alphaMap.width,alphaMap.height);
      alphaContext.drawImage(instrumentImage,0,0);
      alphaPixels = alphaContext.getImageData(0,0,alphaMap.width,alphaMap.height).data;
    };
    if (instrumentImage.complete) prepareAlphaMap();
    else instrumentImage.addEventListener('load',prepareAlphaMap,{once:true});
    const updateInstrumentAlphaHover = event => {
      if (!alphaPixels) return;
      const bounds = instrumentImage.getBoundingClientRect();
      const imageX = Math.floor((event.clientX-bounds.left)/bounds.width*alphaMap.width);
      const imageY = Math.floor((event.clientY-bounds.top)/bounds.height*alphaMap.height);
      const inside = imageX >= 0 && imageY >= 0 && imageX < alphaMap.width && imageY < alphaMap.height;
      const alpha = inside ? alphaPixels[(imageY*alphaMap.width+imageX)*4+3] : 0;
      instrumentCanvas.classList.toggle('instrument-alpha-hover',alpha > 32);
    };
    instrumentCanvas.addEventListener('pointerenter',updateInstrumentAlphaHover);
    instrumentCanvas.addEventListener('pointermove',updateInstrumentAlphaHover);
    instrumentCanvas.addEventListener('pointerover',updateInstrumentAlphaHover);
    instrumentCanvas.addEventListener('mouseenter',updateInstrumentAlphaHover);
    instrumentCanvas.addEventListener('mousemove',updateInstrumentAlphaHover);
    instrumentCanvas.addEventListener('mousedown',updateInstrumentAlphaHover);
    instrumentCanvas.addEventListener('pointerleave',() => instrumentCanvas.classList.remove('instrument-alpha-hover'));
    instrumentCanvas.addEventListener('pointercancel',() => instrumentCanvas.classList.remove('instrument-alpha-hover'));
  }
  instrumentCanvas?.addEventListener('click',event => {
    const button = event.target.closest('button[data-instrument-part]');
    if (!button) return;
    const part = instrumentParts[button.dataset.instrumentPart];
    if (!part) return;
    document.querySelectorAll('.instrument-hotspot').forEach(candidate => {
      const active = candidate === button;
      candidate.classList.toggle('active',active);
      candidate.setAttribute('aria-pressed',String(active));
    });
    document.getElementById('instrument-detail-index').textContent = part.index;
    document.getElementById('instrument-detail-title').textContent = part.title;
    document.getElementById('instrument-detail-description').textContent = part.description;
    document.getElementById('instrument-detail-acts').textContent = part.acts;
    document.getElementById('instrument-detail-matters').textContent = part.matters;
    document.getElementById('instrument-detail-note').textContent = part.note;
  });

  const venueDetails = {
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
      copy:'The exposed roof structure repeats across the length of the hall. In the drawing, those frames become the measure of the room—part architecture, part musical staff.',
      facts:[['Element','Repeated roof trusses'],['Volume','Single open span'],['Reading','Structure layer']]
    },
    recording: {
      index:'04 · Recording path',
      title:'The two-track that outlived the room.',
      copy:'Betty Cantor-Jackson made her own two-track mix that night. That direct, portable document became the version listeners copied, traded, and learned by heart.',
      facts:[['Engineer','Betty Cantor-Jackson'],['Format','Two-track'],['Legacy','National Recording Registry']]
    },
    shell: {
      index:'05 · Building shell',
      title:'Fieldstone outside. Vastness within.',
      copy:'Barton Hall reads as a fortress from the campus and as a single enormous volume inside. The cutaway keeps both identities visible at once.',
      facts:[['Building','Barton Hall'],['Material','Fieldstone'],['Campus','Cornell University']]
    }
  };
  const venueModel = document.querySelector('[data-venue-model]');
  const setVenueDetail = marker => {
    const detail = venueDetails[marker.dataset.venuePart];
    if (!detail) return;
    venueModel.querySelectorAll('.hall-marker').forEach(candidate => candidate.classList.toggle('active',candidate === marker));
    document.querySelector('[data-venue-index]').textContent = detail.index;
    document.querySelector('[data-venue-title]').textContent = detail.title;
    document.querySelector('[data-venue-copy]').textContent = detail.copy;
    document.querySelector('[data-venue-facts]').innerHTML = detail.facts.map(([term,value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  };
  venueModel?.addEventListener('click',event => {
    const marker = event.target.closest('[data-venue-part]');
    if (marker) setVenueDetail(marker);
  });
  venueModel?.addEventListener('keydown',event => {
    const marker = event.target.closest('[data-venue-part]');
    if (!marker || !['Enter',' '].includes(event.key)) return;
    event.preventDefault();
    setVenueDetail(marker);
  });
  document.querySelector('.venue-view-controls')?.addEventListener('click',event => {
    const button = event.target.closest('button[data-venue-view]');
    if (!button || !venueModel) return;
    document.querySelectorAll('[data-venue-view]').forEach(candidate => candidate.setAttribute('aria-pressed',String(candidate === button)));
    venueModel.classList.remove('view-structure','view-interior','view-show');
    venueModel.classList.add(`view-${button.dataset.venueView}`);
  });
  const restoreHashPosition = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && id !== 'top') document.getElementById(id)?.scrollIntoView();
  };
  window.addEventListener('load',() => setTimeout(restoreHashPosition,0));
  if (location.hash && location.hash !== '#top') requestAnimationFrame(() => requestAnimationFrame(restoreHashPosition));
  document.querySelector('.setlist-ledger')?.addEventListener('click',event => {
    const detailsButton = event.target.closest('button[data-details-index]');
    if (detailsButton) {
      const row = detailsButton.closest('.tape-row');
      const open = row.classList.toggle('details-open');
      detailsButton.setAttribute('aria-expanded',String(open));
      detailsButton.querySelector('.details-cue').textContent = open ? '−' : '＋';
      return;
    }
    const button = event.target.closest('button[data-index]');
    if (!button) return;
    const nextIndex = Number(button.dataset.index);
    if (setlistActivated && nextIndex === index) {
      audio.paused ? audio.play() : audio.pause();
      return;
    }
    setlistActivated = true;
    load(nextIndex,true);
  });
  document.querySelector('.setlist-section')?.addEventListener('click',event => {
    const button = event.target.closest('button[data-play-set]');
    if (!button) return;
    const starts = {show:0,I:0,II:tracks.findIndex(track => track.set === 'II'),E:tracks.findIndex(track => track.set === 'E')};
    load(starts[button.dataset.playSet],true);
  });
  annotationPlay?.addEventListener('click',() => audio.paused ? audio.play() : audio.pause());
  play.addEventListener('click',() => audio.paused ? audio.play() : audio.pause());
  $('#previous').addEventListener('click',() => load(index - 1,!audio.paused));
  $('#next').addEventListener('click',() => load(index + 1,!audio.paused));
  $('#mute').addEventListener('click',event => {
    audio.muted = !audio.muted;
    event.currentTarget.classList.toggle('active',audio.muted);
    event.currentTarget.querySelector('span').textContent = audio.muted ? 'Muted' : 'Sound';
  });
  queue.addEventListener('click',() => {
    const open = drawer.hidden;
    drawer.hidden = !open;
    queue.setAttribute('aria-expanded',String(open));
  });
  list.addEventListener('click',event => {
    const button = event.target.closest('button[data-index]');
    if (!button) return;
    load(Number(button.dataset.index),true);
    drawer.hidden = true;
    queue.setAttribute('aria-expanded','false');
  });
  seek.addEventListener('input',() => {
    if (Number.isFinite(audio.duration)) audio.currentTime = audio.duration * Number(seek.value) / 1000;
    sync();
  });
  audio.addEventListener('play',() => {
    setlistActivated = true;
    transport.hidden = false;
    document.body.classList.add('player-revealed');
    transport.classList.add('playing');
    play.setAttribute('aria-label','Pause');
    annotationPlay.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause selected track';
    renderActiveState();
    startSignal();
  });
  audio.addEventListener('pause',() => {
    transport.classList.remove('playing');
    play.setAttribute('aria-label','Play');
    annotationPlay.innerHTML = '<span aria-hidden="true">▶</span> Play selected track';
    renderActiveState();
    holdSignal();
  });
  audio.addEventListener('loadedmetadata',sync);
  audio.addEventListener('timeupdate',sync);
  audio.addEventListener('ended',() => load(index + 1,true));
  load(index);
})();
