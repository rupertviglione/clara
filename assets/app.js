/* =========================================================
   CLARA — app.js
   Brutalist Editorial · Tech Aesthetic · Performance Optimized
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
      }, 400);
    }
  });

  /* =========================================================
     MENU MOBILE — with focus management for accessibility
  ========================================================= */
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
      
      // Accessibility: manage focus
      if (open) {
        // Focus first link when menu opens
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        // Return focus to toggle when menu closes
        toggle.focus();
      }
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
     LAZY LOAD VIDEOS — Play on hover instead of autoplay
  ========================================================= */
  const videos = document.querySelectorAll('video.work-video');
  
  videos.forEach(video => {
    // Play on hover
    video.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    
    // Pause when not hovering
    video.addEventListener('mouseleave', () => {
      video.pause();
    });
    
    // Also play when visible on mobile (touch devices)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && 'ontouchstart' in window) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(video);
  });

  /* =========================================================
     MODAL BASE WITH ZOOM
  ========================================================= */
  const modal = document.querySelector('.image-modal');
  const modalContent = modal?.querySelector('.image-modal__content');
  let currentZoom = 1;
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  function createZoomControls() {
    const existingControls = document.querySelector('.image-modal__controls');
    if (existingControls) existingControls.remove();
    
    const controls = document.createElement('div');
    controls.className = 'image-modal__controls';
    controls.innerHTML = `
      <button data-zoom="in" aria-label="Zoom in">+</button>
      <button data-zoom="reset" aria-label="Reset zoom">1:1</button>
      <button data-zoom="out" aria-label="Zoom out">−</button>
    `;
    modal.appendChild(controls);
    
    controls.addEventListener('click', (e) => {
      const action = e.target.dataset.zoom;
      const img = modalContent.querySelector('img');
      if (!img) return;
      
      if (action === 'in' && currentZoom < 3) {
        currentZoom += 0.5;
      } else if (action === 'out' && currentZoom > 0.5) {
        currentZoom -= 0.5;
      } else if (action === 'reset') {
        currentZoom = 1;
      }
      
      img.style.transform = `scale(${currentZoom})`;
      img.classList.toggle('zoomed', currentZoom > 1);
      modalContent.style.overflow = currentZoom > 1 ? 'auto' : 'hidden';
    });
  }

  function openModal(html, hasZoom = false) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = html;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    currentZoom = 1;
    
    if (hasZoom) {
      createZoomControls();
      
      // Click to zoom on image
      const img = modalContent.querySelector('img');
      if (img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
          if (currentZoom === 1) {
            currentZoom = 2;
            img.style.transform = `scale(${currentZoom})`;
            img.classList.add('zoomed');
            img.style.cursor = 'zoom-out';
            modalContent.style.overflow = 'auto';
          } else {
            currentZoom = 1;
            img.style.transform = `scale(1)`;
            img.classList.remove('zoomed');
            img.style.cursor = 'zoom-in';
            modalContent.style.overflow = 'hidden';
          }
        });
        
        // Drag to pan when zoomed
        modalContent.addEventListener('mousedown', (e) => {
          if (currentZoom > 1) {
            isDragging = true;
            startX = e.pageX - modalContent.offsetLeft;
            startY = e.pageY - modalContent.offsetTop;
            scrollLeft = modalContent.scrollLeft;
            scrollTop = modalContent.scrollTop;
            modalContent.style.cursor = 'grabbing';
          }
        });
        
        modalContent.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - modalContent.offsetLeft;
          const y = e.pageY - modalContent.offsetTop;
          const walkX = (x - startX) * 1.5;
          const walkY = (y - startY) * 1.5;
          modalContent.scrollLeft = scrollLeft - walkX;
          modalContent.scrollTop = scrollTop - walkY;
        });
        
        modalContent.addEventListener('mouseup', () => {
          isDragging = false;
          modalContent.style.cursor = currentZoom > 1 ? 'grab' : 'default';
        });
        
        modalContent.addEventListener('mouseleave', () => {
          isDragging = false;
        });
      }
    } else {
      const existingControls = document.querySelector('.image-modal__controls');
      if (existingControls) existingControls.remove();
    }
  }

  function closeModal() {
    if (!modal || !modalContent) return;
    modal.classList.remove('is-open');
    
    // Stop any playing videos
    const video = modalContent.querySelector('video');
    if (video) video.pause();
    
    const existingControls = document.querySelector('.image-modal__controls');
    if (existingControls) existingControls.remove();
    
    setTimeout(() => {
      modalContent.innerHTML = '';
      currentZoom = 1;
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
     IMAGE MODAL — "ANTES" with Zoom
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
          <img src="${jpg}" alt="${alt}" loading="eager" draggable="false">
        </picture>
      `, true); // Enable zoom
    });
  });

  /* =========================================================
     HTML MODAL — "DEPOIS" with better proportions
  ========================================================= */
  document.querySelectorAll('[data-modal-html]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      openModal(`
        <iframe
          src="${link.dataset.modalHtml}"
          style="width: 100%; height: 100%; border: none; background: #fff;"
          loading="lazy">
        </iframe>
      `, false); // No zoom for iframe
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
          style="max-width: 100%; max-height: 100%;">
        </video>
      `, false); // No zoom for video
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
     GLITCH TEXT EFFECT — Add data-text attribute
  ========================================================= */
  document.querySelectorAll('.glitch-hover').forEach(el => {
    el.setAttribute('data-text', el.textContent);
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
     STATUS INDICATOR — Random subtle animation
  ========================================================= */
  const statusDots = document.querySelectorAll('.status-dot, [data-status]');
  statusDots.forEach(dot => {
    // Add slight random delay to make multiple dots feel organic
    dot.style.animationDelay = `${Math.random() * 2}s`;
  });

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

  /* =========================================================
     CONSOLE EASTER EGG — Tech savvy touch
  ========================================================= */
  console.log('%c– clara.', 'font-family: monospace; font-size: 24px; font-weight: bold;');
  console.log('%csys.init > presença digital com clareza', 'font-family: monospace; color: #666;');

  /* =========================================================
     THEME TOGGLE — Dark/Light Mode
  ========================================================= */
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('clara-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
  }
  
  // Update button text based on current theme
  function updateToggleText() {
    const currentTheme = html.getAttribute('data-theme');
    if (themeToggle) {
      themeToggle.textContent = currentTheme === 'dark' ? 'light' : 'dark';
    }
  }
  updateToggleText();
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme === 'light' ? '' : newTheme);
      if (newTheme === 'light') {
        html.removeAttribute('data-theme');
      }
      localStorage.setItem('clara-theme', newTheme === 'light' ? '' : newTheme);
      updateToggleText();
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('clara-theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : '');
      updateToggleText();
    }
  });

})();
