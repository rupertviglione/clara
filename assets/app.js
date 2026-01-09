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

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method || 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await res.json();

      if (!res.ok || result.errors) {
        throw new Error('Formspree error');
      }

      form.innerHTML = `
        <section class="letter">
          <p>Olá,</p>
          <p>Obrigado pela tua mensagem.</p>
          <p>Respondemos em breve.</p>
          <p class="sign">– clara.</p>
        </section>`;
    } catch (err) {
      console.error(err);
      alert('Houve um problema no envio. Verifica os dados ou tenta mais tarde.');
    }
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

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const content = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', () => {
      const iframeSrc = el.dataset.iframe;

      if (iframeSrc) {
        content.innerHTML = `
          <iframe
            src="${iframeSrc}"
            loading="lazy"
            frameborder="0"
            aria-label="Exercício completo"
          ></iframe>`;
      } else {
        content.innerHTML = `<img src="${el.src}" alt="">`;
      }

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  function close() {
    lightbox.classList.remove('open');
    content.innerHTML = '';
    document.body.style.overflow = '';
  }
}
