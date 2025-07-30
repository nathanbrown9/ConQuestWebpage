  //------------------ Load in Page Function-----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const loaderWrapper = document.getElementById("loader-wrapper");

    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";

    // Simulate a loading delay (customize this duration)
    setTimeout(() => {
      document.body.classList.add("loaded");

      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }, 2000); // 2 seconds (matches your loader animation)
  });
// ---------------Underline Nav Link Functionality ------------------------------
document.querySelectorAll('.nav-links li').forEach(li => {
    li.addEventListener('mouseenter', () => {
        li.classList.remove('hover-out', 'hover-done', 'show-after');
        li.classList.add('hover-in');

        // Delay showing ::after (solid underline) to follow ::before swipe
        setTimeout(() => {
            if (li.classList.contains('hover-in')) {
                li.classList.add('show-after');
              }
            }, 500); // delay must match ::before width transition
    });

    li.addEventListener('mouseleave', () => {
      li.classList.remove('hover-in', 'show-after');
      li.classList.add('hover-out');
      
      setTimeout(() => {
        li.classList.add('hover-done');
        }, 300); // Let the rainbow finish swipe before removing
      });
    });

    //-------------Nav Blur and Stick Functionality-------------------------
    // Add blur and shrink effect to nav on scroll
    window.addEventListener('scroll', function() {
      const nav = document.querySelector('nav');
      if (!nav) return;
      if (window.scrollY > 10) {
        nav.classList.add('nav-blur');
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-blur');
        nav.classList.remove('nav-scrolled');
      }
    });
    
    
    
    
    //-----------------SideMenu Functionality--------------------------  
    
    const menuBtn = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');
    const navWrapper = document.getElementById('navWrapper');
    const body = document.body;
    
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.contains('is-menu-open');
      
      if (isOpen) {
        // Close menu
        menuBtn.classList.remove('is-menu-open');
    navLinks.classList.remove('show');
    
    // Allow time for nav to slide out before removing overlay and scroll lock
    setTimeout(() => {
      navWrapper.classList.remove('show');
      body.classList.remove('no-scroll');
    }, 400); // Match your CSS transition time
  } else {
    // Open menu
    menuBtn.classList.add('is-menu-open');
    navWrapper.classList.add('show');
    
    // Delay the menu slide-in slightly
    setTimeout(() => {
      navLinks.classList.add('show');
    }, 100);
    
    body.classList.add('no-scroll');
  }
});
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    e.preventDefault(); // Prevent default jump

    const isOpen = menuBtn.classList.contains('is-menu-open');

    if (isOpen) {
      // Close menu
      menuBtn.classList.remove('is-menu-open');
      navLinks.classList.remove('show');

      setTimeout(() => {
        navWrapper.classList.remove('show');
        body.classList.remove('no-scroll');

        // After menu closes, scroll to target smoothly
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 400); // Match menu close duration
    } else {
      // If menu isn't open (e.g. desktop), scroll immediately
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

//------------------Music Video Hover Functionality-----------------------
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("musicVideo");
  const wrapper = document.getElementById("musicWrapper");
  const overlayText = document.getElementById("overlayText");
  const volumeIcon = document.getElementById("volumeIcon");
  const fullscreenIcon = document.getElementById("fullscreenIcon");
  
  function updateOverlay() {
    if (video.muted) {
      wrapper.classList.add("muted");
      overlayText.textContent = "Ready to hear Magic?";
      volumeIcon.classList.remove("fa-volume-xmark");
      volumeIcon.classList.add("fa-volume-high");
    } else {
      wrapper.classList.remove("muted");
      overlayText.textContent = "You've been fulfilled?";
      volumeIcon.classList.remove("fa-volume-high");
      volumeIcon.classList.add("fa-volume-xmark");
    }
  }
  
  // Initial update
  updateOverlay();
  
  volumeIcon.addEventListener("click", () => {
    // Toggle mute
    video.muted = !video.muted;
    
    // Update overlay UI
    updateOverlay();
    
    // If unmuting, pause and mute all other media elements after a short delay
    if (!video.muted) {
      setTimeout(() => {
        const mediaElements = document.querySelectorAll("audio, video");
        mediaElements.forEach((el) => {
          if (el !== video) {
            el.muted = true;
          }
        });
      }, 50); // Delay ensures video.muted state has been set first
    }
  });
  
  fullscreenIcon.addEventListener("click", () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });
  
  // Remove blur when in fullscreen
  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement === video || document.fullscreenElement === video.parentElement) {
      wrapper.classList.add("no-blur");
    } else {
      wrapper.classList.remove("no-blur");
    }
  });
});

//---------------Video Description Animation Functionality-----------
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelector('.music-description').classList.add('show');
        observer.disconnect(); // Only animate once
      }
    });
  }, {
    threshold: 0.5 // Reveal when 50% in view
  });
  
  const target = document.querySelector('.music-video-wrapper');
  if (target) observer.observe(target);
});

//---------------Name Scroll-in Animation Functionality-------------------
// Scroll-linked animation for Jon (from left) and Kylo (from right)
window.addEventListener('scroll', function () {
  const section = document.getElementById('music-section');
  const jon = document.querySelector('.name-jon');
  const kylo = document.querySelector('.name-kylo');
  const desc = document.querySelector('.music-names-desc');
  if (!section || !jon || !kylo || !desc) return;
  
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  let progress = 1 - rect.top / windowHeight;
  progress = Math.max(0, Math.min(1, progress));
  
  // Animate Jon and Kylo
  jon.style.transform = `translateX(${(-40 + 40 * progress)}vw)`;
  jon.style.opacity = progress > 0.05 ? 1 : 0;
  
  kylo.style.transform = `translateX(${(40 - 40 * progress)}vw)`;
  kylo.style.opacity = progress > 0.05 ? 1 : 0;
  
  // Re-trigger the fade-up animation every time it enters view
  const descTop = desc.getBoundingClientRect().top;
  const descVisible = descTop < windowHeight && descTop > 0;
  
  if (descVisible) {
    desc.classList.add('visible');
  } else {
    desc.classList.remove('visible');
  }
});

//-------------Video Collapse and Blur on Scroll-------------------------
window.addEventListener('scroll', function() {
  const video = document.querySelector('.bg-video');
  const videoMobile = document.querySelector('.bg-video-mobile');
  const header = document.querySelector('.header');
  if (!video || !header) return;
  
  // How far the user has scrolled in the header section (0 = top, 1 = header bottom at top)
  const rect = header.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  let progress = 1 - (rect.bottom / windowHeight);
  progress = Math.max(0, Math.min(1, progress));
  
  // Interpolate min-height and blur
  const minHeight = 100 - 70 * progress; // from 100vh to 30vh
  const blur = 10 * progress; // from 0 to 10px
  const brightness = 1 - 0.3 * progress; // from 1 to 0.7
  
  video.style.minHeight = minHeight + 'vh';
  video.style.height = minHeight + 'vh';
  video.style.filter = `blur(${blur}px) brightness(${brightness})`;
  
  if (videoMobile) {
    videoMobile.style.minHeight = minHeight + 'vh';
    videoMobile.style.height = minHeight + 'vh';
    videoMobile.style.filter = `blur(${blur}px) brightness(${brightness})`;
  }
});
//---------------- Stacked Video Cards Scroll Animation (Column Layout) ------------------
document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('.checker-row');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.6
  });
  rows.forEach(row => {
    observer.observe(row);
  });
});
//Hover effect for video
const wrappers = document.querySelectorAll('.video-wrapper');

wrappers.forEach(wrapper => {
  const video = wrapper.querySelector('video');
  const volumeIcon = wrapper.querySelector('.volume-icon');
  const fullscreenIcon = wrapper.querySelector('.fullscreen-icon');
  const overlayText = wrapper.querySelector('.overlay-text');
  
  // Volume toggle with mute others
  volumeIcon.addEventListener('click', () => {
    const isNowUnmuted = video.muted;

    // Mute all other videos
    wrappers.forEach(otherWrapper => {
      const otherVideo = otherWrapper.querySelector('video');
        const otherIcon = otherWrapper.querySelector('.volume-icon');
        const otherText = otherWrapper.querySelector('.overlay-text');
        
        otherVideo.muted = true;
        otherIcon.classList.remove('fa-volume-mute');
        otherIcon.classList.add('fa-volume-up');
        otherText.textContent = 'Ready to hear magic?';
      });
      
      // Toggle this video to opposite state (mute → unmute)
      video.muted = !isNowUnmuted;
      volumeIcon.classList.toggle('fa-volume-mute', !video.muted);
      volumeIcon.classList.toggle('fa-volume-up', video.muted);
      
      // Update overlay text
      overlayText.textContent = video.muted ? 'Ready to hear magic?' : "You've been fulfilled?";
    });
    
    // Fullscreen logic and blur removal
    fullscreenIcon.addEventListener('click', () => {
      wrapper.classList.add('no-blur');
      
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });
  });
  
  //-----------------Transition to Album Section---------------------
  const subtitle = document.querySelector('.albums-subtitle');
  const albumsSection = document.querySelector('.albums-section');
  
  // Fade-in animation for albums-subtitle only once on first entry
  if (subtitle) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          subtitle.classList.add('fade-in');
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(subtitle);
}

window.addEventListener('scroll', () => {
  const rect = subtitle.getBoundingClientRect();
  // Change section background when scrolled past subtitle
  if (rect.top <= 0) {
    albumsSection.classList.add('dark-bg');
  } else {
    albumsSection.classList.remove('dark-bg');
  }
});

//----------------Play Button Animation Functionality--------------
let currentAudio = null;
let currentIcon = null;
let currentProgress = null;

const songs = document.querySelectorAll('.album-song');
songs.forEach(song => {
  const icon = song.querySelector('.play-icon');
  const src = song.getAttribute('data-src');
  const progress = song.querySelector('.progress-circle');
  const audio = new Audio(src);
  
  let interval;
  
  icon.addEventListener('click', () => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentIcon.classList.replace('fa-pause', 'fa-play');
      clearInterval(currentProgress);
      currentProgress = null;
    }

    if (audio.paused) {
      audio.play();
      icon.classList.replace('fa-play', 'fa-pause');
      currentAudio = audio;
      currentIcon = icon;
      currentProgress = setInterval(() => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.background = `conic-gradient(var(--clr-accent) ${percent}%, transparent ${percent}%)`;
      }, 250);
    } else {
      audio.pause();
      icon.classList.replace('fa-pause', 'fa-play');
      clearInterval(currentProgress);
    }
    
    audio.addEventListener('ended', () => {
      icon.classList.replace('fa-pause', 'fa-play');
      progress.style.background = 'transparent';
      clearInterval(currentProgress);
    });
  });
});

//------------------The Gallery Title Animation-----------------------
document.addEventListener("DOMContentLoaded", function () {
  const gallerySection = document.getElementById("gallery-section");
  const gallerySubtitle = document.querySelector(".gallery-subtitle");
  const galleryTitle = document.getElementById("galleryTitle");
  let waveAnimated = false;
  
  // Prepare the wave letters but don't animate yet
  const title = "We Are All Witnesses";
  let html = "";
  let delay = 0;
  for (let i = 0; i < title.length; i++) {
          const char = title[i] === " " ? "&nbsp;" : title[i];
          html += `<span class=\"wave-letter\" style=\"animation-delay: ${delay}s\">${char}</span>`;
          delay += 0.06;
        }
        galleryTitle.innerHTML = html;
        
        // Remove fade-in-up from subtitle initially
        gallerySubtitle.classList.remove("fade-in-up");
        // Remove animation from all wave letters initially
        Array.from(galleryTitle.children).forEach((span) => {
          span.style.opacity = 0;
          span.style.transform = "translateY(40px)";
          span.style.animation = "none";
        });
        
        // IntersectionObserver to trigger animation
        const observer = new window.IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !waveAnimated) {
                // Animate subtitle
                gallerySubtitle.classList.add("fade-in-up");
                // Animate wave letters
                Array.from(galleryTitle.children).forEach((span, i) => {
                  span.style.animation = `waveUp 0.7s cubic-bezier(0.4,0,0.2,1) forwards`;
                  span.style.animationDelay = `${i * 0.06}s`;
                });
                waveAnimated = true;
                obs.disconnect();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(gallerySection);
      });
//------------------Gallery Scatter Images Fade-in Animation-----------------------
document.addEventListener("DOMContentLoaded", function () {
  const scatterImgs = document.querySelectorAll(".gallery-scatter-img");
  scatterImgs.forEach(img => {
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.classList.add("fade-in-up");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(img);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cqvideo = document.querySelector(".cqvideo");
  if (cqvideo) {
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cqvideo.classList.add("fade-in-up");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(cqvideo);
  }
});
//----------------Scroll to top on logo click-------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('footerTopBtn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      });


//------------------Socials Section Fade-in Animation-----------------------
document.addEventListener("DOMContentLoaded", function () {
  const socialsSection = document.getElementById("socials-section");
  const socialsTitle = document.querySelector(".socials-title");
  const socialsIcons = document.querySelectorAll(".socials-icon-circle");
  let socialsAnimated = false;
  if (socialsSection && socialsTitle && socialsIcons.length) {
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting && !socialsAnimated) {
                socialsTitle.classList.add("fade-in-up");
                socialsIcons.forEach((icon, i) => {
                setTimeout(() => {
                  icon.classList.add("fade-in-up");
                  }, i * 180);
                });
                  socialsAnimated = true;
                  obs.disconnect();
                }
              });
            },
            { threshold: 0.3 }
          );
          observer.observe(socialsSection);
        }
      });