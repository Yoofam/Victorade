// Theme toggle with persistence
(function themeInit() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved || 'auto');
  if (saved === 'dark' || (!saved && prefersDark)) {
    root.setAttribute('data-theme', 'dark');
  } else if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Contact form (demo only)
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const status = form.querySelector('.form-status');
  // Replace this with a real endpoint or email service
  status.textContent = 'Thanks ' + data.name + '! Your message has been sent sucessfully.';
  form.reset();
  return false;
}
