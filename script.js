// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Events slider data
const events = [
  {
    date: "15 Aug 2025",
    type: "Conference",
    title: "Nelieca Education Summit 2025",
    desc: "Join global educators and innovators to explore the future of learning, with keynotes on AI-driven education and hybrid classrooms.",
    img: "https://images.unsplash.com/photo-1742827871480-4962b0653e1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
  },
  {
    date: "10 Jun 2025",
    type: "Webinar",
    title: "AI in Education: Nelieca’s Vision",
    desc: "Experts discuss how Nelieca’s AI tools personalize learning and empower educators to create impactful courses.",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80"
  },
  {
    date: "20 Apr 2025",
    type: "Collaboration",
    title: "Nelieca Partners with GlobalLearn",
    desc: "This partnership introduces 500+ open courses, expanding access to quality education for learners worldwide.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    date: "10 Feb 2025",
    type: "Achievement",
    title: "Nelieca Reaches 50K Beta Sign-Ups",
    desc: "We’ve hit 50,000 sign-ups for our beta, a milestone in our mission to make education accessible to all.",
    img: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=1200&q=80"
  }
];

// DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  // Loader and content reveal
  const loader = document.querySelector('.loader');
  const content = document.querySelector('.content');
  const header = document.getElementById('header');

  function revealContent() {
    try {
      if (!loader || !content || !header) {
        console.warn('Reveal elements missing:', { loader, content, header });
        return;
      }
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.style.display = 'none';
        header.style.opacity = '1';
        content.classList.add('loaded');
        console.log('Content revealed');
      }, 500);
    } catch (error) {
      console.error('Reveal content error:', error);
    }
  }

  setTimeout(revealContent, 3000);

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      console.log('Hamburger clicked');
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  } else {
    console.error('Hamburger or mobile nav not found:', { hamburger, mobileNav });
  }

  // Close button for mobile nav
  if (mobileNavClose && hamburger && mobileNav) {
    mobileNavClose.addEventListener('click', () => {
      console.log('Mobile nav close button clicked');
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  } else {
    console.warn('Mobile nav close button or related elements not found:', { mobileNavClose, hamburger, mobileNav });
  }

  // Close mobile nav when a link is clicked
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  if (mobileNavLinks.length > 0) {
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log('Mobile nav link clicked');
        if (hamburger && mobileNav) {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
        }
      });
    });
  } else {
    console.warn('No mobile nav links found');
  }

  // FAQ toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        console.log('FAQ item clicked');
        item.classList.toggle('active');
      });
    });
  } else {
    console.warn('No FAQ items found');
  }

  // Events slider functionality
  const slider = document.getElementById('event-slider');
  let currentIndex = 0;

  function renderSlides() {
    if (slider) {
      slider.innerHTML = events.map((e) => `
        <div class="event-slide">
          <div class="event-content">
            <div class="event-left">
              <div>${e.type}</div>
              <div>${e.date}</div>
            </div>
            <div class="event-center">
              <div class="event-title">${e.title}</div>
              <div class="event-desc">${e.desc}</div>
            </div>
          </div>
          <img src="${e.img}" alt="Event Image" class="event-image" loading="lazy" />
        </div>
      `).join('');
    } else {
      console.error('Event slider element not found');
    }
  }

  window.changeSlide = function(direction) {
    console.log('changeSlide called with direction:', direction);
    const total = events.length;
    currentIndex = (currentIndex + direction + total) % total;
    const offset = currentIndex * -100;
    if (slider) {
      slider.style.transform = `translateX(${offset}%)`;
    }
  };

  renderSlides();

  // Lottie width adjustment
  const heading = document.querySelector('.hero-heading');
  const lottiePlayer = document.querySelector('.lottie-animation lottie-player');
  const lottieFallback = document.querySelector('.lottie-fallback');
  if (heading && lottiePlayer) {
    const updateLottieWidth = () => {
      lottiePlayer.style.width = `${heading.offsetWidth}px`;
    };
    updateLottieWidth();
    window.addEventListener('resize', debounce(updateLottieWidth, 100));

    lottiePlayer.addEventListener('error', () => {
      console.log('Lottie animation error');
      lottiePlayer.style.display = 'none';
      lottieFallback.style.display = 'block';
    });
  } else {
    console.warn('Lottie elements missing:', { heading, lottiePlayer });
  }

  // Timeline animation with IntersectionObserver
  const timeline = document.querySelector('.timeline-section .timeline');
  if (timeline) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Timeline visible');
            timeline.classList.add('visible');
            observer.unobserve(timeline);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(timeline);
  } else {
    console.warn('Timeline element not found');
  }

  // Features section scroll animation
  const section = document.querySelector('.features-steps');
  const track = document.querySelector('.steps-container');

  window.addEventListener('scroll', () => {
    if (section && track) {
      const rect = section.getBoundingClientRect();
      const scrollLength = section.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && Math.abs(rect.top) <= scrollLength) {
        const progress = Math.abs(rect.top) / scrollLength;
        const translateX = progress * (track.scrollWidth - window.innerWidth);
        track.style.transform = `translateX(-${translateX}px)`;
      }
    }
  });
});

// Header scroll effect
let lastScroll = 0;

function updateHeaderPosition() {
  const header = document.getElementById('header');
  const currentScroll = window.scrollY;

  if (!header) {
    console.error('Header not found');
    return;
  }

  if (currentScroll > 50) {
    header.classList.add('scrolled');
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
  } else {
    header.classList.remove('scrolled', 'hidden');
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
}

window.addEventListener('scroll', debounce(updateHeaderPosition, 16));

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.message, event.filename, event.lineno);
});