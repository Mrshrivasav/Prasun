// Smooth scroll for anchor links
const links = document.querySelectorAll('a.nav-link');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      // Collapse navbar on mobile
      const navbar = document.querySelector('.navbar-collapse');
      if (navbar.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbar, {toggle: false});
        bsCollapse.hide();
      }
    }
  });
});

window.addEventListener('DOMContentLoaded', () => {
  // Initialize Bootstrap components
  if (typeof bootstrap !== 'undefined') {
    // Initialize all collapse components
    const collapseElements = document.querySelectorAll('.collapse');
    collapseElements.forEach(collapseEl => {
      new bootstrap.Collapse(collapseEl, {
        toggle: false
      });
    });
  }

  // Intro Splash logic
  const intro = document.getElementById('intro');
  const main = document.getElementById('main-content');

  function hideIntro() {
    intro.classList.add('hide');
    setTimeout(() => {
      intro.style.display = 'none';
      main.style.display = '';
    }, 1000); // match CSS transition
  }

  setTimeout(hideIntro, 2500);
  intro.addEventListener('click', hideIntro);

  // Particle background
  const canvas = document.getElementById('particle-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    let particles = [];
    const num = 100;
    for (let i = 0; i < num; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = '#fff';
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.restore();
    }
    function update() {
      for (let p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
    }
    function animate() {
      draw();
      update();
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });
  }

  // Scroll progress bar
  const progressBar = document.getElementById('progress-bar');
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
    if (progressBar) {
      progressBar.style.height = Math.round(progress * 192) + 'px'; // 192px is the bar height
    }
  }
  window.addEventListener('scroll', updateProgressBar);
  updateProgressBar();

  // Contact form: open Gmail with filled data
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=darkprasun1234@gmail.com&su=Contact%20from%20Portfolio&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0A%0AWrite%20your%20message%20here...`;
      window.open(mailto, '_blank');
    });
  }
});
