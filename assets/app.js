/* =========================================================
   clara. — app.js
   Código unificado, limpo e defensivo
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

  preloadAssets();
  initPageTransitions();
  initContactForm();
  initViewers();
  initCarousel();
  initLightbox();
});

/* =========================================================
   PRELOAD DE ASSETS
========================================================= */

function preloadAssets() {
  const assets = [
    'assets/antes-full.png',
    'assets/depois-full.png',
    'assets/site seiva.mp4',
    'assets/site gq.mp4'
  ];

  assets.forEach(src => {
    if (src.endsWith('.mp4')) {
      const v = document.createElement('video');
      v.src = src;
      v.preload = 'auto';
    } else {
      const i = new Image();
      i.src = src;
    }
  });
}

/* =========================================================
   TRANSIÇÕES ENTRE PÁGINAS
========================================================= */

function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.origin === location.origin) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.add('is-leaving');
        const url = link.href;
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      });
    }
  });
}

/* =========================================================
   FORMULÁRIO DE CONTACTO
========================================================= */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const nome = (data.get('nome') || '—').toString().trim();
    const email = (data.get('email') || '(não indicado)').toString().trim();
    const mensagem = (data.get('mensagem') || '').toString().trim();

    const resposta = `
      <section class="letter" aria-live="polite">
        <p>Olá, <strong>${nome}</strong></p>
        <p>Obrigado pela tua mensagem.</p>
        <p>
          Recebemos isto:<br>
          <em>${mensagem ? mensagem.replace(/\n/g, '<br>') : '<i>(mensagem vazia)</i>'}</em>
        </p>
        <p>Responderemos para: <strong>${email}</strong></p>
        <p class="sign">Cumprimentos,<br>– clara.</p>
      </section>
    `;

    const container = form.parentElement;
    form.style.opacity = '0';

    setTimeout(() => {
      container.innerHTML = resposta;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
  });
}

/* =========================================================
   VIEWER DE VÍDEOS (PROJECTOS)
========================================================= */

function initViewers() {
  document.querySelectorAll('.viewer').forEach(viewer => {
    const videos = viewer.querySelectorAll('video');
    if (videos.length < 2) return;

    let index = 0;

    videos.forEach((v, i) => {
      v.preload = 'auto';
      v.muted = true;
      v.loop = true;
      if (i === 0) {
        v.classList.add('active');
        v.play();
      }
    });

    const prev = viewer.querySelector('.prev');
    const next = viewer.querySelector('.next');

    function show(i) {
      videos[index].classList.remove('active');
      index = (i + videos.length) % videos.length;
      videos[index].classList.add('active');
      videos[index].play();
    }

    prev && (prev.onclick = () => show(index - 1));
    next && (next.onclick = () => show(index + 1));
  });
}

/* =========================================================
   CARROSSEL SIMPLES
========================================================= */

function initCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  const prev = document.querySelector('.carousel-arrow.prev');
  const next = document.querySelector('.carousel-arrow.next');

  if (!items.length || !prev || !next) return;

  let index = 0;

  function show(i) {
    items.forEach(el => el.classList.remove('active'));
    items[i].classList.add('active');
  }

  prev.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    show(index);
  });

  next.addEventListener('click', () => {
    index = (index + 1) % items.length;
    show(index);
  });

  items.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;
    video.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });
  });
}

/* =========================================================
   LIGHTBOX / MODAL DE IMAGENS
========================================================= */

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const img = lightbox.querySelector('img');

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      img.src = trigger.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    img.src = '';
    document.body.style.overflow = '';
  });
}
