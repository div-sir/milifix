// 星空動畫
function initStars() {
  const canvas = document.querySelector('.stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({length: Math.floor(w * h / 1200)}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      o: Math.random() * 0.5 + 0.5
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      ctx.globalAlpha = s.o;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#b6e0fe';
      ctx.shadowColor = '#4ad';
      ctx.shadowBlur = 8;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  window.addEventListener('resize', resize);
  resize();
  setInterval(draw, 60);
}

// 語言切換與內容載入
const langMap = {
  'zh-Hant': 'zh',
  'en': 'en',
  'ja': 'ja'
};
const langDisplay = {
  'zh-Hant': '中文',
  'en': 'English',
  'ja': '日本語'
};
const langReverse = {
  'zh': 'zh-Hant',
  'en': 'en',
  'ja': 'ja'
};
const langOrder = ['zh-Hant', 'en', 'ja'];

function renderContent(section, sectionData) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';
  // intro
  if (sectionData.intro) {
    const intro = document.createElement('p');
    intro.textContent = sectionData.intro;
    intro.style.fontWeight = 'bold';
    intro.style.marginBottom = '1.2em';
    mainContent.appendChild(intro);
  }
  // highlights (條列)
  if (sectionData.highlights) {
    const ul = document.createElement('ul');
    ul.style.textAlign = 'left';
    sectionData.highlights.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    mainContent.appendChild(ul);
  }
  // projects or works (卡片)
  if (sectionData.projects || sectionData.works) {
    const list = sectionData.projects || sectionData.works;
    const cardWrap = document.createElement('div');
    cardWrap.style.display = 'flex';
    cardWrap.style.flexWrap = 'wrap';
    cardWrap.style.gap = '18px';
    cardWrap.style.justifyContent = 'center';
    list.forEach(item => {
      const card = document.createElement('div');
      card.style.background = 'rgba(40,60,90,0.85)';
      card.style.borderRadius = '14px';
      card.style.boxShadow = '0 2px 12px #0004';
      card.style.padding = '18px 16px';
      card.style.width = '260px';
      card.style.textAlign = 'center';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        img.style.marginBottom = '10px';
        card.appendChild(img);
      }
      const name = document.createElement('div');
      name.textContent = item.name;
      name.style.fontWeight = 'bold';
      name.style.fontSize = '1.1em';
      name.style.marginBottom = '6px';
      card.appendChild(name);
      const desc = document.createElement('div');
      desc.textContent = item.desc;
      desc.style.fontSize = '0.98em';
      card.appendChild(desc);
      cardWrap.appendChild(card);
    });
    mainContent.appendChild(cardWrap);
  }
  // 專案列表 (list)
  if (sectionData.list) {
    const cardWrap = document.createElement('div');
    cardWrap.style.display = 'flex';
    cardWrap.style.flexWrap = 'wrap';
    cardWrap.style.gap = '18px';
    cardWrap.style.justifyContent = 'center';
    sectionData.list.forEach(item => {
      const card = document.createElement('div');
      card.style.background = 'rgba(40,60,90,0.85)';
      card.style.borderRadius = '14px';
      card.style.boxShadow = '0 2px 12px #0004';
      card.style.padding = '18px 16px';
      card.style.width = '260px';
      card.style.textAlign = 'center';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        img.style.marginBottom = '10px';
        card.appendChild(img);
      }
      const name = document.createElement('div');
      name.textContent = item.name;
      name.style.fontWeight = 'bold';
      name.style.fontSize = '1.1em';
      name.style.marginBottom = '6px';
      card.appendChild(name);
      const desc = document.createElement('div');
      desc.textContent = item.desc;
      desc.style.fontSize = '0.98em';
      card.appendChild(desc);
      cardWrap.appendChild(card);
    });
    mainContent.appendChild(cardWrap);
  }
  // members (人員卡片)
  if (sectionData.members) {
    const cardWrap = document.createElement('div');
    cardWrap.style.display = 'flex';
    cardWrap.style.flexWrap = 'wrap';
    cardWrap.style.gap = '18px';
    cardWrap.style.justifyContent = 'center';
    sectionData.members.forEach(item => {
      const card = document.createElement('div');
      card.style.background = 'rgba(40,60,90,0.85)';
      card.style.borderRadius = '14px';
      card.style.boxShadow = '0 2px 12px #0004';
      card.style.padding = '18px 16px';
      card.style.width = '220px';
      card.style.textAlign = 'center';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      if (item.img) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.borderRadius = '50%';
        img.style.marginBottom = '10px';
        card.appendChild(img);
      }
      const name = document.createElement('div');
      name.textContent = item.name;
      name.style.fontWeight = 'bold';
      name.style.fontSize = '1.1em';
      name.style.marginBottom = '4px';
      card.appendChild(name);
      const role = document.createElement('div');
      role.textContent = item.role;
      role.style.fontSize = '0.98em';
      role.style.color = '#4ad';
      card.appendChild(role);
      const desc = document.createElement('div');
      desc.textContent = item.desc;
      desc.style.fontSize = '0.95em';
      desc.style.marginTop = '4px';
      card.appendChild(desc);
      cardWrap.appendChild(card);
    });
    mainContent.appendChild(cardWrap);
  }
  // timeline (品牌故事)
  if (sectionData.timeline) {
    const timeline = document.createElement('div');
    timeline.style.margin = '2em 0 1em 0';
    timeline.style.paddingLeft = '0.5em';
    sectionData.timeline.forEach(item => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.marginBottom = '0.5em';
      const year = document.createElement('span');
      year.textContent = item.year;
      year.style.fontWeight = 'bold';
      year.style.color = '#4ad';
      year.style.marginRight = '1em';
      row.appendChild(year);
      const event = document.createElement('span');
      event.textContent = item.event;
      row.appendChild(event);
      timeline.appendChild(row);
    });
    mainContent.appendChild(timeline);
  }
  // vision
  if (sectionData.vision) {
    const vision = document.createElement('div');
    vision.textContent = sectionData.vision;
    vision.style.marginTop = '1.2em';
    vision.style.fontStyle = 'italic';
    vision.style.color = '#b6e0fe';
    mainContent.appendChild(vision);
  }
}

async function loadContent(section, lang) {
  const fileLang = langMap[lang] || 'en';
  const res = await fetch('data/content.json');
  const data = await res.json();
  const sectionData = data[section][fileLang];
  document.getElementById('main-title').textContent = sectionData.title;
  renderContent(section, sectionData);
}

function setupNav() {
  let currentSection = document.body.dataset.section || 'tech';
  let currentLang = document.documentElement.lang || 'zh-Hant';
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      currentSection = a.dataset.section;
      updateNav(currentSection);
      loadContent(currentSection, currentLang);
    });
  });
  // 語言下拉選單
  const langDropdown = document.querySelector('.lang-dropdown');
  const langSelected = langDropdown.querySelector('.lang-selected');
  const langList = langDropdown.querySelector('.lang-list');
  let hoverTimeout;
  function renderLangList() {
    langList.innerHTML = '';
    langOrder.forEach(l => {
      const btn = document.createElement('button');
      btn.className = 'lang-option' + (l === currentLang ? ' active' : '');
      btn.textContent = langDisplay[l];
      btn.dataset.lang = l;
      btn.onclick = () => {
        currentLang = l;
        updateLang(currentLang);
        loadContent(currentSection, currentLang);
        langDropdown.classList.remove('open');
      };
      langList.appendChild(btn);
    });
  }
  // 地球SVG
  const globeSVG = '<span class="globe">🌐</span>';
  langSelected.innerHTML = globeSVG;
  langSelected.onclick = () => {
    langDropdown.classList.toggle('open');
  };
  langDropdown.onmouseenter = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      langDropdown.classList.add('open');
    }, 120);
  };
  langDropdown.onmouseleave = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      langDropdown.classList.remove('open');
    }, 180);
  };
  function updateLang(lang) {
    langSelected.innerHTML = globeSVG;
    renderLangList();
    document.documentElement.lang = lang;
  }
  updateLang(currentLang);
  renderLangList();
  // 頁面初始內容
  updateNav(currentSection);
  loadContent(currentSection, currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  setupNav();
}); 