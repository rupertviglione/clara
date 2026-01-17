/* =========================================================
   CLARA — app.js
   Brutalist Editorial · Performance Optimized
========================================================= */

(function () {
  'use strict';

  /* =========================================================
     PAGE LOADER
  ========================================================= */
  const loader = document.querySelector('.page-loader');
  
  window.addEventListener('load', () => {
    if (loader) {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 300);
    }
  });

  /* =========================================================
     MENU MOBILE
  ========================================================= */
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  if (navLinks) {
    navLinks.addEventListener('click', e => {
      if (e.target === navLinks) {
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================================================
     SCROLL REVEAL ANIMATION
  ========================================================= */
  const revealElements = document.querySelectorAll('.section, .work-block, .step');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.animation = 'revealUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    revealObserver.observe(el);
  });

  /* =========================================================
     LAZY LOAD VIDEOS
  ========================================================= */
  const videos = document.querySelectorAll('video[preload="metadata"]');
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.play().catch(() => {});
        videoObserver.unobserve(video);
      }
    });
  }, { threshold: 0.25 });

  videos.forEach(video => {
    video.pause();
    videoObserver.observe(video);
  });

  /* =========================================================
     MODAL BASE
  ========================================================= */
  const modal = document.querySelector('.image-modal');
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
    
    // Stop any playing videos
    const video = modalContent.querySelector('video');
    if (video) video.pause();
    
    setTimeout(() => {
      modalContent.innerHTML = '';
    }, 200);
    
    document.body.style.overflow = '';
  }

  // Close with ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Close button
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on overlay click
  modal?.querySelector('.image-modal__overlay')?.addEventListener('click', closeModal);

  /* =========================================================
     IMAGE MODAL — "ANTES"
  ========================================================= */
  document.querySelectorAll('[data-modal]').forEach(img => {
    img.style.cursor = 'crosshair';
    
    img.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const avif = img.dataset.fullAvif;
      const webp = img.dataset.fullWebp;
      const jpg = img.dataset.fullJpg;
      const alt = img.alt || '';

      openModal(`
        <picture>
          ${avif ? `<source type="image/avif" srcset="${avif}">` : ''}
          ${webp ? `<source type="image/webp" srcset="${webp}">` : ''}
          <img src="${jpg}" alt="${alt}" loading="eager">
        </picture>
      `);
    });
  });

  /* =========================================================
     HTML MODAL — "DEPOIS"
  ========================================================= */
  document.querySelectorAll('[data-modal-html]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      openModal(`
        <iframe
          src="${link.dataset.modalHtml}"
          style="width: 90vw; height: 80vh; border: 1px solid #fff; background: #fff;"
          loading="lazy">
        </iframe>
      `);
    });
  });

  /* =========================================================
     VIDEO MODAL
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
          style="max-width: 90vw; max-height: 85vh;">
        </video>
      `);
    });
  });

  /* =========================================================
     SMOOTH ANCHOR LINKS
  ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =========================================================
     HOVER EFFECTS — Images
  ========================================================= */
  document.querySelectorAll('.work-image, .work-media').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.zIndex = '10';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.zIndex = '';
    });
  });

  /* =========================================================
     CURRENT YEAR FOR FOOTER
  ========================================================= */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================================
     PERFORMANCE — REDUCE MOTION
  ========================================================= */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--ease-out-expo', 'ease');
    document.querySelectorAll('[style*="animation"]').forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

})();
