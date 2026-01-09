// preload
const assets = [
  "assets/antes-full.png",
  "assets/depois-full.png",
  "assets/site seiva.mp4",
  "assets/site gq.mp4"
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

// transição entre páginas
// transição entre páginas
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




document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // recolhe campos (sem validação complexa)
    const data = new FormData(form);
    const mensagem = (data.get('mensagem') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const nome  = (data.get('nome') || '').toString().trim() || '—';

    // aqui podes enviar via fetch para um endpoint real se tiveres backend.
    // por agora simulamos envio e mostramos a carta de resposta.
    const cartaResposta = `
      <section class="letter" aria-live="polite">
        <p>Olá, <strong>— ${nome}</strong></p>
        <p>Obrigado pela tua mensagem.</p>
        <p>Recebemos isto:<br><em>${mensagem ? mensagem.replace(/\n/g, '<br>') : '<i>(mensagem vazia)</i>'}</em></p>
        <p>Responderemos para: <strong>${email || '(não indicado)'}</strong></p>
        <p class="sign">Cumprimentos,<br>– clara.</p>
      </section>
    `;

    // substitui o formulário pela resposta (animação curta)
    const container = form.parentElement; // normalmente <main class="page contact">
    form.style.transition = 'opacity .18s ease';
    form.style.opacity = '0';
    setTimeout(() => {
      // limpa e insere a carta de resposta
      container.innerHTML = cartaResposta;
      // rolar para centro (caso necessário)
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 180);
  });
});

/* clara. — scripts definitivos */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-ready");

  // iniciar viewers (D)
  document.querySelectorAll(".viewer").forEach(initViewer);
});

/* VIEWER SIMPLES (D) */
function initViewer(viewer){
  const videos = viewer.querySelectorAll("video");
  if(videos.length < 2) return;

  let index = 0;

  videos.forEach((v,i)=>{
    v.preload = "auto";
    v.muted = true;
    v.loop = true;
    if(i === 0){
      v.classList.add("active");
      v.play();
    }
  });

  const prev = viewer.querySelector(".prev");
  const next = viewer.querySelector(".next");

  function show(i){
    videos[index].classList.remove("active");
    index = (i + videos.length) % videos.length;
    videos[index].classList.add("active");
    videos[index].play();
  }

  prev && (prev.onclick = () => show(index-1));
  next && (next.onclick = () => show(index+1));
}
const assets = [
  "assets/antes-full.png",
  "assets/depois-full.png",
  "assets/site seiva.mp4",
  "assets/site gq.mp4"
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


  const items = document.querySelectorAll('.carousel-item');
  const prev = document.querySelector('.carousel-arrow.prev');
  const next = document.querySelector('.carousel-arrow.next');
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
    video.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });
  });

  document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.querySelector('.letter').innerHTML = `
    <p>Obrigado pela carta.</p>
    <p>Respondemos na volta do correio.</p>
    <p class="sign">– clara.</p>
  `;
});

 const modal = document.querySelector('.modal');
  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('[data-modal]').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.hidden = false;
    });
  });

  closeBtn.onclick = () => {
    modal.hidden = true;
    modalImg.src = '';
  };

  modal.onclick = e => {
    if (e.target === modal) {
      modal.hidden = true;
      modalImg.src = '';
    }
  };

const modal = document.querySelector('.modal');
  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('[data-modal]').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.hidden = false;
    });
  });

  closeBtn.onclick = () => {
    modal.hidden = true;
    modalImg.src = '';
  };

  modal.onclick = e => {
    if (e.target === modal) {
      modal.hidden = true;
      modalImg.src = '';
    }
  };

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('[data-modal]').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});

