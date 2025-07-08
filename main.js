// 星空動畫
// 狀態集中管理
const state = {
  currentSection: document.body.dataset.section || 'tech',
  currentLang: localStorage.getItem('milifix-lang') || document.documentElement.lang || 'zh-Hant'
};

// 語言對應
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
const langOrder = ['zh-Hant', 'en', 'ja'];

// 卡片渲染通用函數（圖片 lazy loading）
function renderCardList(list, type) {
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
    card.style.width = type === 'member' ? '220px' : '260px';
    card.style.textAlign = 'center';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    if (item.img) {
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.loading = 'lazy';
      img.style.width = type === 'member' ? '80px' : '100%';
      img.style.height = type === 'member' ? '80px' : '';
      img.style.borderRadius = type === 'member' ? '50%' : '8px';
      img.style.marginBottom = '10px';
      card.appendChild(img);
    }
    const name = document.createElement('div');
    name.textContent = item.name;
    name.style.fontWeight = 'bold';
    name.style.fontSize = '1.1em';
    name.style.marginBottom = type === 'member' ? '4px' : '6px';
    card.appendChild(name);
    if (type === 'member' && item.role) {
      const role = document.createElement('div');
      role.textContent = item.role;
      role.style.fontSize = '0.98em';
      role.style.color = '#4ad';
      card.appendChild(role);
    }
    const desc = document.createElement('div');
    desc.textContent = item.desc;
    desc.style.fontSize = type === 'member' ? '0.95em' : '0.98em';
    card.appendChild(desc);
    cardWrap.appendChild(card);
  });
  return cardWrap;
}

// intro 區塊
function renderIntro(intro) {
  const introEl = document.createElement('p');
  introEl.textContent = intro;
  introEl.style.fontWeight = 'bold';
  introEl.style.marginBottom = '1.2em';
  return introEl;
}
// highlights 區塊
function renderHighlights(highlights) {
  const ul = document.createElement('ul');
  ul.style.textAlign = 'left';
  highlights.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
}
// timeline 區塊
function renderTimeline(timeline) {
  const timelineEl = document.createElement('div');
  timelineEl.style.margin = '2em 0 1em 0';
  timelineEl.style.paddingLeft = '0.5em';
  timeline.forEach(item => {
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
    timelineEl.appendChild(row);
  });
  return timelineEl;
}
// vision 區塊
function renderVision(vision) {
  const visionEl = document.createElement('div');
  visionEl.textContent = vision;
  visionEl.style.marginTop = '1.2em';
  visionEl.style.fontStyle = 'italic';
  visionEl.style.color = '#b6e0fe';
  return visionEl;
}

// 主內容渲染
function renderContent(section, sectionData) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';
  if (sectionData.intro) mainContent.appendChild(renderIntro(sectionData.intro));
  if (sectionData.highlights) mainContent.appendChild(renderHighlights(sectionData.highlights));
  if (sectionData.projects) mainContent.appendChild(renderCardList(sectionData.projects, 'project'));
  if (sectionData.works) mainContent.appendChild(renderCardList(sectionData.works, 'work'));
  if (sectionData.list) mainContent.appendChild(renderCardList(sectionData.list, 'project'));
  if (sectionData.members) mainContent.appendChild(renderCardList(sectionData.members, 'member'));
  if (sectionData.timeline) mainContent.appendChild(renderTimeline(sectionData.timeline));
  if (sectionData.vision) mainContent.appendChild(renderVision(sectionData.vision));
}

// loading 狀態
function showLoading() {
  const mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.innerHTML = '<div style="color:#4ad">Loading...</div>';
}

// 內容載入（含錯誤處理）
async function loadContent(section, lang) {
  const fileLang = langMap[lang] || 'en';
  showLoading();
  try {
    const res = await fetch('data/content.json');
    const data = await res.json();
    const sectionData = data[section][fileLang];
    document.getElementById('main-title').textContent = sectionData.title;
    renderContent(section, sectionData);
  } catch (e) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div style="color:#f66">內容載入失敗，請稍後再試。</div>';
  }
}

// 導覽與語言切換
function setupNav() {
  const navLinks = document.querySelectorAll('nav a[data-section]');
  navLinks.forEach(a => {
    a.setAttribute('aria-label', a.textContent);
    a.addEventListener('click', e => {
      e.preventDefault();
      state.currentSection = a.dataset.section;
      updateNav(state.currentSection);
      loadContent(state.currentSection, state.currentLang);
    });
  });
  // 語言下拉
  const langDropdown = document.querySelector('.lang-dropdown');
  const langSelected = langDropdown.querySelector('.lang-selected');
  const langList = langDropdown.querySelector('.lang-list');
  let hoverTimeout;
  function renderLangList() {
    langList.innerHTML = '';
    langOrder.forEach(l => {
      const btn = document.createElement('button');
      btn.className = 'lang-option' + (l === state.currentLang ? ' active' : '');
      btn.textContent = langDisplay[l];
      btn.dataset.lang = l;
      btn.setAttribute('aria-label', langDisplay[l]);
      btn.onclick = () => {
        state.currentLang = l;
        localStorage.setItem('milifix-lang', l);
        updateLang(state.currentLang);
        loadContent(state.currentSection, state.currentLang);
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
  updateLang(state.currentLang);
  renderLangList();
  // 初始內容
  updateNav(state.currentSection);
  loadContent(state.currentSection, state.currentLang);
}
// 導覽 active 樣式
function updateNav(section) {
  document.querySelectorAll('nav a[data-section]').forEach(a => {
    if (a.dataset.section === section) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// favicon fallback
(function(){
  if (!document.querySelector('link[rel="icon"]')) {
    var link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/favicon.ico';
    document.head.appendChild(link);
  }
})();

// 404 導向
if (window.location.pathname.endsWith('404.html')) {
  document.title = '404 Not Found | MILIFIX';
  document.getElementById('main-title').textContent = '找不到頁面';
  document.getElementById('main-content').innerHTML = '<div style="color:#f66">您所尋找的頁面不存在。</div>';
}

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
}); 