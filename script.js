/* ══════════════════════════════════════════════════
   Sitio Agency — script.js
   À lier dans le HTML avec : <script src="script.js"></script>
   (placer juste avant </body>)
══════════════════════════════════════════════════ */

/* ── SPA Navigation ─────────────────────────────── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === name);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 100);

  // Déclencher les compteurs sur la page À propos
  if (name === 'about') setTimeout(animateCounters, 400);
}

/* ── Navbar scroll effect ────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 30);
});

/* ── Mobile menu ─────────────────────────────────── */
function toggleMobile() {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  burger.classList.toggle('open');
  menu.classList.toggle('open');
}

/* ── Scroll reveal ───────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
initReveal();

/* ── Portfolio filter ────────────────────────────── */
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.proj-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.display = match ? 'block' : 'none';
  });
}

/* ── FAQ accordion ───────────────────────────────── */
function toggleFaq(el) {
  const item   = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── Contact form ────────────────────────────────── */
function submitForm() {
  const required = ['fname', 'lname', 'email', 'projType', 'message'];
  let valid = true;

  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#ff4d4d';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });

  if (!valid) {
    alert('Veuillez remplir tous les champs obligatoires (*).');
    return;
  }

  // Simuler l'envoi et afficher le message de succès
  document.getElementById('contactFormWrapper').innerHTML = `
    <div class="form-success" style="display:block">
      <div class="form-success-icon">✅</div>
      <h3>Message envoyé !</h3>
      <p>Merci pour votre message. Nous vous répondons dans les 24 heures.</p>
      <div style="margin-top:1.5rem">
        <button class="btn btn-primary" onclick="showPage('home')">Retour à l'accueil</button>
      </div>
    </div>
  `;
}

/* ── Counter animation ───────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target  = +el.dataset.target;
    const suffix  = el.querySelector('.acc')?.textContent || '';
    let current   = 0;
    const step    = Math.ceil(target / 60);
    const timer   = setInterval(() => {
      current = Math.min(current + step, target);
      el.innerHTML = current + `<span class="acc">${suffix}</span>`;
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

/* ── Custom cursor ───────────────────────────────── */
const dot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});
document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(2)');
document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');