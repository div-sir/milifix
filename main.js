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
async function loadContent(section, lang) {
  const res = await fetch(`data/content-${lang}.json`);
  const data = await res.json();
  document.getElementById('main-title').textContent = data[section].title;
  document.getElementById('main-content').textContent = data[section].content;
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
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      updateLang(currentLang);
      loadContent(currentSection, currentLang);
    });
  });
  function updateNav(section) {
    document.querySelectorAll('nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.section === section);
    });
  }
  function updateLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang;
  }
  // 頁面初始內容
  updateNav(currentSection);
  updateLang(currentLang);
  loadContent(currentSection, currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  setupNav();
}); 