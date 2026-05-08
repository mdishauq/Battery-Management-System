// Smooth scroll behavior and navigation highlight
document.addEventListener('DOMContentLoaded', () => {
  // Highlight code blocks
  if (window.hljs) {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }

  // Sticky header scroll effect
  const header = document.querySelector('.nav-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });

  // Scroll-triggered animations using Intersection Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Parallax effect on hero
  const heroImage = document.querySelector('.hero-image-container');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.hero');
      const heroTop = heroSection.offsetTop;
      const heroHeight = heroSection.offsetHeight;
      
      // Only apply parallax if hero is in view
      if (scrollY < heroTop + heroHeight) {
        const parallaxValue = (scrollY - heroTop) * 0.5;
        heroImage.style.transform = `translateY(${parallaxValue}px)`;
      }
    });
  }

  // Update nav links active state based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Gallery lightbox
  const galleryImages = document.querySelectorAll('.gallery-img');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Create lightbox element if it doesn't exist
  if (!document.querySelector('.lightbox')) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close">✕</button>
      <img id="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxClose = document.querySelector('.lightbox-close');
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function openLightbox(src, alt) {
    const lightbox = document.querySelector('.lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    img.alt = alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Keyboard shortcut for lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Add lightbox styles
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);
      z-index: 2000;
      backdrop-filter: blur(4px);
    }

    .lightbox.active {
      display: flex;
    }

    #lightbox-img {
      max-width: 90%;
      max-height: 90%;
      border-radius: 16px;
      box-shadow: 0 40px 120px rgba(0, 0, 0, 0.4);
      animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .lightbox-close {
      position: absolute;
      right: 32px;
      top: 32px;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid white;
      color: white;
      font-size: 32px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .nav-links a.active {
      color: #0099cc;
    }

    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);

  // Animate on page load
  document.body.style.opacity = '1';
});

// Prevent smooth scroll issues
document.addEventListener('wheel', (e) => {
  // Allow normal scroll
}, { passive: true });
