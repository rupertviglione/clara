/* =========================================================
   CLARA — app.js
   hamburguer menu · modais · vídeos em modal
========================================================= */

(function () {
  'use strict';

  /* =========================================================
     MENU MOBILE
  ========================================================= */

  const toggle   = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // clicar num link fecha menu
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // clicar fora dos links fecha menu
  if (navLinks) {
    navLinks.addEventListener('click', e => {
      if (e.target === navLinks) {
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================================================
     MODAL BASE (IMAGENS · HTML · VÍDEOS)
  ========================================================= */

  const modal        = document.querySelector('.image-modal');
  const modalContent = modal?.querySelector('.image-modal__content');

  function openModal(html) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = html;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !modalContent) return;
    modal.classList.remove('is-open');
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  // fechar por ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeModal();
    }
  });

  // fechar por botão
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // fechar ao clicar no overlay
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  /* =========================================================
     MODAL DE IMAGEM — "ANTES"
  ========================================================= */

  document.querySelectorAll('[data-modal]').forEach(img => {
    img.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const avif = img.dataset.fullAvif;
      const webp = img.dataset.fullWebp;
      const jpg  = img.dataset.fullJpg;
      const alt  = img.alt || '';

      openModal(`
        <picture>
          ${avif ? `<source type="image/avif" srcset="${avif}">` : ''}
          ${webp ? `<source type="image/webp" srcset="${webp}">` : ''}
          <img src="${jpg}" alt="${alt}">
        </picture>
      `);
    });
  });

  /* =========================================================
     MODAL DE HTML — "DEPOIS"
  ========================================================= */

  document.querySelectorAll('[data-modal-html]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      openModal(`
        <iframe
          src="${link.dataset.modalHtml}"
          style="width:100%; height:100%; border:0;"
          loading="lazy">
        </iframe>
      `);
    });
  });

  /* =========================================================
     MODAL DE VÍDEO — TRABALHOS
  ========================================================= */

  document.querySelectorAll('[data-video-modal]').forEach(video => {
    video.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const src = video.dataset.videoSrc;
      if (!src) return;

      openModal(`
        <video
          src="${src}"
          controls
          autoplay
          style="width:100%; height:auto;">
        </video>
      `);
    });
  });

})();
