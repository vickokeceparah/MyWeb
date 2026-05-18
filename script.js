// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '196, 43, 43' : '212, 168, 83';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
      this.opacity = Math.min(this.opacity + 0.02, 0.8);
    }

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 26, 26, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileOverlay = document.getElementById('mobileOverlay');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
});

function closeMobileMenu() {
  menuToggle.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          entry.target.textContent = target + '+';
          clearInterval(timer);
        } else {
          entry.target.textContent = Math.floor(current);
        }
      }, 40);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// Floating petals
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  const size = Math.random() * 15 + 8;
  petal.style.width = size + 'px';
  petal.style.height = size + 'px';
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.top = '-20px';
  petal.style.background = `radial-gradient(ellipse, rgba(196, 43, 43, ${Math.random() * 0.5 + 0.3}), transparent)`;
  petal.style.borderRadius = '50% 0 50% 50%';
  petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
  document.body.appendChild(petal);

  setTimeout(() => petal.remove(), 16000);
}

setInterval(createPetal, 3000);

// Contact form handler
function handleSubmit() {
  const btn = document.querySelector('.contact-btn');
  btn.textContent = 'Terkirim! ✓';
  btn.style.background = '#2a7a2a';
  setTimeout(() => {
    btn.textContent = 'Kirim Pesan →';
    btn.style.background = '';
  }, 3000);
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Photo Upload System
const photoInput = document.getElementById('photoInput');
const avatarPhoto = document.getElementById('avatarPhoto');
const uploadBtnText = document.getElementById('uploadBtnText');
const photoHint = document.getElementById('photoHint');

// Load saved photo from localStorage
function loadSavedPhoto() {
  const savedPhoto = localStorage.getItem('marfin_portfolio_photo');
  if (savedPhoto) {
    avatarPhoto.src = savedPhoto;
    avatarPhoto.classList.add('visible');
    photoHint.classList.add('has-photo');
    uploadBtnText.textContent = 'Ganti Foto';
  }
}

loadSavedPhoto();

photoInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Mohon pilih file gambar (JPG, PNG, WebP, GIF)');
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran file maksimal 5MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;

    // Apply photo with animation
    avatarPhoto.classList.remove('visible');
    setTimeout(() => {
      avatarPhoto.src = dataUrl;
      avatarPhoto.onload = function() {
        avatarPhoto.classList.add('visible');
        photoHint.classList.add('has-photo');
        uploadBtnText.textContent = 'Ganti Foto';

        // Save to localStorage
        try {
          localStorage.setItem('marfin_portfolio_photo', dataUrl);
        } catch(err) {
          console.log('Photo too large for localStorage, displayed without saving.');
        }
      };
    }, 200);
  };

  reader.readAsDataURL(file);
  // Reset input so same file can be selected again
  this.value = '';
});

// Clicking on hint also triggers upload
photoHint.addEventListener('click', function() {
  photoInput.click();
});