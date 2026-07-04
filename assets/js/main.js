(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav a');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeaderState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  const closeNavigation = () => {
    if (!toggle || !nav) return;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  toggle?.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('is-open');
    toggle.classList.toggle('is-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
    nav.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('nav-open', willOpen);
  });

  navLinks.forEach((link) => link.addEventListener('click', closeNavigation));
  window.addEventListener('scroll', setHeaderState, { passive: true });
  setHeaderState();

  document.querySelector('#current-year').textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
