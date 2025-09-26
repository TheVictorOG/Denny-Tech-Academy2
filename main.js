    let started = false;
    window.addEventListener('scroll', () => {
      const counter = document.getElementById('counter');
      if (!counter) return;
      const offsetTop = counter.offsetTop - window.innerHeight + 100;
      if (!started && window.scrollY > offsetTop) {
        started = true;
        let count = 0;
        const target = 60000;
        const duration = 2000;
        const increment = Math.ceil(target / (duration / 20));
        
        const interval = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(interval);
          }
          counter.textContent = count.toLocaleString();
        }, 20);
      }
    });
    const slider = document.getElementById('slider');
let scrollAmount = 0;
let scrollStep = 310; // Adjust to match your image + margin
let isPaused = false;
let autoScroll;
let resumeTimeout;

// Scroll function
function scrollImages() {
  if (!isPaused) {
    if (scrollAmount + slider.offsetWidth >= slider.scrollWidth) {
      scrollAmount = 0;
    } else {
      scrollAmount += scrollStep;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

// Start auto-scroll
function startAutoScroll() {
  autoScroll = setInterval(scrollImages, 3000);
}

// Pause + Resume logic
function pauseAndResume() {
  if (!isPaused) {
    isPaused = true;
    clearInterval(autoScroll);

    resumeTimeout = setTimeout(() => {
      isPaused = false;
      startAutoScroll();
    }, 15000);
  }
}

// Handle click to pause/resume
slider.addEventListener('click', () => {
  if (isPaused) {
    clearTimeout(resumeTimeout);
    isPaused = false;
    startAutoScroll();
  } else {
    pauseAndResume();
  }
});

// Handle manual scroll by user
let userScrolling;
slider.addEventListener('scroll', () => {
  clearTimeout(userScrolling);
  pauseAndResume();
  userScrolling = setTimeout(() => {
    if (!isPaused) return;
    isPaused = false;
    startAutoScroll();
  }, 15000);
});

// Start initially
startAutoScroll();