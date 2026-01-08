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



<script>
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
</script>
