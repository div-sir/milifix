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

async function loadContent(section, lang) {
  const fileLang = langMap[lang] || 'en';
  const res = await fetch('data/content.json');
  const data = await res.json();
  const sectionData = data[section][fileLang];
  document.getElementById('main-title').textContent = sectionData.title;
  // 內容渲染（僅顯示 intro，進階可擴充）
  if (sectionData.intro) {
    document.getElementById('main-content').textContent = sectionData.intro;
  } else if (sectionData.content) {
    document.getElementById('main-content').textContent = sectionData.content;
  } else {
    document.getElementById('main-content').textContent = '';
  }
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
  langSelected.onclick = () => {
    langDropdown.classList.toggle('open');
  };
  langDropdown.onmouseenter = () => {
    langDropdown.classList.add('open');
  };
  langDropdown.onmouseleave = () => {
    langDropdown.classList.remove('open');
  };
  function updateLang(lang) {
    langSelected.textContent = langDisplay[lang];
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