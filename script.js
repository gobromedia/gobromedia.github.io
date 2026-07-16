/**
 * GOBRO MEDIA - PREMIUM INTERACTION SCRIPT
 *
 * CONFIGURATION:
 * Set WHATSAPP_NUMBER via localStorage or environment variable.
 * Default: "919990737306" (India - no "+" or spaces)
 */

const WHATSAPP_NUMBER = localStorage.getItem('gobro_whatsapp') || "919990737306";

document.addEventListener('DOMContentLoaded', function() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 1. CUSTOM CURSOR (hover-capable devices only)
  // ==========================================================================
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    if (cursor && ring) {
      document.addEventListener('mousemove', function(e) {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = (mx - 5) + 'px';
        cursor.style.top = (my - 5) + 'px';
      });

      function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = (rx - 18) + 'px';
        ring.style.top = (ry - 18) + 'px';
        requestAnimationFrame(animRing);
      }
      animRing();

      document.querySelectorAll('a, button, [tabindex]').forEach(function(el) {
        el.addEventListener('mouseenter', function() {
          ring.style.transform = 'scale(2)';
          ring.style.borderColor = 'rgba(201,168,76,0.6)';
        });
        el.addEventListener('mouseleave', function() {
          ring.style.transform = 'scale(1)';
          ring.style.borderColor = 'rgba(201,168,76,0.5)';
        });
      });
    }
  } else {
    // Hide cursor elements on touch devices
    var c = document.getElementById('cursor');
    var r = document.getElementById('cursorRing');
    if (c) c.style.display = 'none';
    if (r) r.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ==========================================================================
  // 2. MORPHING HEADER ON SCROLL + SCROLL PROGRESS + HERO PARALLAX + ACTIVE NAV
  // ==========================================================================
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const progressBar = document.querySelector('.scroll-progress');
  const heroSlider = document.querySelector('.hero-slider');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let scrollTicking = false;
  let lastScrollY = 0;

  function onScroll() {
    const scrollPos = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Header morphing
    if (header) {
      header.classList.toggle('scrolled', scrollPos > 60);
    }

    // Scroll to top button
    if (scrollTopBtn) {
      const shouldShow = scrollPos > 400;
      scrollTopBtn.style.display = shouldShow ? 'flex' : 'none';
      scrollTopBtn.hidden = !shouldShow;
    }

    // Scroll progress bar
    if (progressBar && maxScroll > 0) {
      progressBar.style.width = ((scrollPos / maxScroll) * 100) + '%';
    }

    // Hero parallax
    if (heroSlider && !reduceMotion && scrollPos < window.innerHeight * 1.2) {
      heroSlider.style.transform = 'translateY(' + (scrollPos * 0.25) + 'px)';
    }

    // Active navigation link (throttled via scrollTicking)
    let current = '';
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - 120;
      if (scrollPos >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    lastScrollY = scrollPos;
    scrollTicking = false;
  }

  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 3. MOBILE MENU NAVIGATION
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      mobileMenu.hidden = isOpen;
      hamburger.setAttribute('aria-expanded', !isOpen);

      if (!isOpen) {
        hamburger.innerHTML =
          '<span style="transform: rotate(45deg) translate(6px, 6px)" aria-hidden="true"></span>' +
          '<span style="opacity:0" aria-hidden="true"></span>' +
          '<span style="transform: rotate(-45deg) translate(5px, -5px)" aria-hidden="true"></span>';
        document.body.style.overflow = 'hidden';
      } else {
        hamburger.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>';
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileMenu.hidden = true;
        hamburger.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>';
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // 4. INTERSECTION OBSERVER - REVEAL ON SCROLL ANIMATIONS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  let revealObserver = null;

  if (reduceMotion) {
    revealElements.forEach(function(el) { el.classList.add('visible'); });
  } else if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(function(el) { revealObserver.observe(el); });
  } else {
    revealElements.forEach(function(el) { el.classList.add('visible'); });
  }

  // ==========================================================================
  // 4b. MICRO-ANIMATIONS — count-up, scroll progress, hero parallax
  // ==========================================================================
  const counters = document.querySelectorAll('.count');
if (!reduceMotion && counters.length) {
    counters.forEach(function(el) {
      el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
    });
    const animateCount = function(el) {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const dur = 1200;
      let startTs = null;
      const step = function(ts) {
        if (startTs === null) startTs = ts;
        const p = Math.min((ts - startTs) / dur, 1);
        const val = Math.floor(p * target);
        el.textContent = prefix + val.toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const countObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function(el) { countObserver.observe(el); });
    } else {
      counters.forEach(animateCount);
    }
  }

  // Homepage FAQ toggle
  window.toggleFaq = function(btn) {
    var item = btn.parentElement;
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(f) {
      f.classList.remove('open');
      var q = f.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  // ==========================================================================
  // 5. EVENT DELEGATION - SERVICE MODAL TRIGGERS
  // ==========================================================================
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('[data-open-service]');
    if (trigger) {
      e.preventDefault();
      const serviceKey = trigger.getAttribute('data-open-service');
      if (serviceKey) openServiceModal(serviceKey);
    }
  });

  // ==========================================================================
  // 6. PORTFOLIO KEYBOARD ACCESSIBILITY
  // ==========================================================================
  document.querySelectorAll('.portfolio-item').forEach(function(item) {
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectKey = item.getAttribute('data-project');
        if (projectKey) openPortfolioModal(projectKey);
      }
    });
    item.addEventListener('click', function() {
      const projectKey = item.getAttribute('data-project');
      if (projectKey) openPortfolioModal(projectKey);
    });
  });

  // ==========================================================================
  // 5. INTERACTIVE SPECIFICATIONS MODALS FOR SERVICES
  // ==========================================================================
  window.openServiceModal = function(serviceKey) {
    const modal = document.getElementById('modal-service');
    const modalTitle = document.getElementById('service-modal-title');
    const modalBody = document.getElementById('service-modal-body');

    if (!modal || !modalTitle || !modalBody) return;

    const serviceDetails = {
      'marketing': {
        title: 'Digital <em>Marketing</em>',
        desc: 'Drive organic business growth, qualified inbound leads, and highly profitable conversion funnels with our custom marketing solutions.',
        bullets: [
          '**Technical & On-Page SEO:** Technical website restructuring and keyword positioning for rapid 90-day organic ranking gains.',
          '**Targeted Google Ads & Meta (FB/IG) Advertising:** Maximize Return on Ad Spend (ROAS) and drastically lower Customer Acquisition Costs (CAC).',
          '**Advanced Conversion Analytics:** Integration of GA4, GTM, and custom dashboards for 100% transparent attribution reporting.',
          '**Local Search Dominance:** Custom Google Business Profile optimization to capture local search market share.'
        ]
      },
      'creation': {
        title: 'Content <em>Creation</em>',
        desc: 'Connect dynamically with your target audience using highly refined brand storytelling, custom graphics, and copy that converts visitors.',
        bullets: [
          '**Brand Copywriting:** Conversion-focused website copy, sales letters, newsletters, and engaging landing pages.',
          '**Graphic & Brand Design:** Aesthetic social media creatives, high-conversion ad banners, and corporate presentation decks.',
          '**Strategic Content Calendars:** Multi-platform posting schedules tailored specifically to target industry niches.',
          '**Influence Campaign Management:** Strategic outreach and structured collaboration roadmaps with key industry creators.'
        ]
      },
      'editing': {
        title: 'Video <em>Editing</em>',
        desc: 'Professional post-production that captures viewer attention, drives high-retention rates, and establishes a premium aesthetic across formats.',
        bullets: [
          '**YouTube Longform Editing:** High-engagement structural cuts, custom sound design, motion typography, and pacing control.',
          '**High-Retention Reels & Shorts:** Dynamic caption animations, trendy visual highlights, and audio enhancement designed for virality.',
          '**Corporate Commercials:** Slick promotional videos, client video testimonials, and high-impact software demo walk-throughs.',
          '**Color Grading & VFX:** Cinematic lighting corrections, sound effects mixing, and seamless visual transitions.'
        ]
      },
      'creator': {
        title: 'Content <em>Creator</em>',
        desc: 'Empowering independent creators and channels with all the resources, tools, and technical post-production backing to scale rapidly.',
        bullets: [
          '**Thumbnail Graphic Design:** Click-Through-Rate (CTR) optimized thumbnail creation using professional graphics & color maps.',
          '**Channel Growth Strategy:** In-depth topic brainstorming, competitor analysis, and audience retention metrics reviews.',
          '**SEO Optimization for YouTube:** High-traffic search tags setup, description copy, and custom card integrations.',
          '**Monetization & Sponsorship Sourcing:** Positioning kits and deal-closing structures to secure paid sponsor campaigns.'
        ]
      },
      'networking': {
        title: 'Networking <em>Solutions</em>',
        desc: 'Build high-value business networks, strategic partnership ecosystems, and sustainable B2B collaborations for exponential scaling.',
        bullets: [
          '**Strategic B2B Partnership Structuring:** Facilitating growth alliances between complementary business houses.',
          '**Lead Generation Networking:** Accessing direct connection loops with top-tier agency founders and digital entrepreneurs.',
          '**Affiliate Integration Maps:** Building automated referral loops that generate high-margin residual revenues.',
          '**Exclusive Professional Connections:** Facilitating structured warm introductions to key target executives.'
        ]
      },
      'strategy': {
        title: 'Brand <em>Strategy</em>',
        desc: 'Position your business as the premium market authority, establish a solid identity, and launch structured growth roadmaps.',
        bullets: [
          '**Competitive Market Positioning:** In-depth market maps to locate untapped high-margin client pockets.',
          '**Visual Identity Frameworks:** Premium color systems design, elegant logo suites, typography styles, and comprehensive brand books.',
          '**Pricing Architecture Consulting:** Optimizing agency fees structures, subscription packaging, and corporate high-ticket offers.',
          '**Go-To-Market (GTM) Playbooks:** End-to-end tactical plans to roll out new products or services with maximum initial impact.'
        ]
      }
    };

    var details = serviceDetails[serviceKey];
    if (!details) return;

    modalTitle.innerHTML = details.title;

    var htmlContent = '<div class="modal-section"><p>' + details.desc + '</p></div>';
    htmlContent += '<div class="modal-section"><h3>Core Deliverables</h3><ul>';

    details.bullets.forEach(function(bullet) {
      var processedBullet = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlContent += '<li>' + processedBullet + '</li>';
    });

    htmlContent += '</ul></div>';
    modalBody.innerHTML = htmlContent;

    modal.classList.add('open');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  // Open generic modals
  window.openModal = function(modalId) {
    var modal = document.getElementById('modal-' + modalId);
    if (modal) {
      modal.classList.add('open');
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  };

  // Close modals
  window.closeModal = function(modalId) {
    var modal = document.getElementById('modal-' + modalId);
    if (modal) {
      modal.classList.remove('open');
      modal.hidden = true;
      document.body.style.overflow = '';
      // Drop focus from the trigger so no focus-visible outline lingers
      // on the "Learn More" button after closing (e.g. via Escape).
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    }
  };

  // Close modals on backdrop click
  window.closeModalOutside = function(event, modalId) {
    var modal = document.getElementById('modal-' + modalId);
    if (modal && event.target === modal) {
      window.closeModal(modalId);
    }
  };

  // ==========================================================================
  // 6b. INTERACTIVE CASE STUDY MODALS FOR PORTFOLIO
  // ==========================================================================
  window.openPortfolioModal = function(projectKey) {
    var modal = document.getElementById('modal-portfolio');
    var modalTitle = document.getElementById('portfolio-modal-title');
    var modalMeta = document.getElementById('portfolio-modal-meta');
    var modalBody = document.getElementById('portfolio-modal-body');

    if (!modal || !modalTitle || !modalMeta || !modalBody) return;

    var projectsData = {
      'growth-campaign': {
        title: 'Brand <em>Growth Campaign</em>',
        meta: 'Category: Sample Demo &bull; Digital Marketing &bull; Illustrative',
        desc: 'In this sample campaign we transition your Google Ads and Meta accounts to a clean, optimized structure from scratch. We build content creative maps and completely overhaul the conversion copy.',
        bullets: [
          '**Sample Outcome:** An illustrative target of **3.2x ROAS** and 300%+ monthly sales growth within 90 days.',
          '**Ad Spend Optimization:** An illustrative target of lifting ad CTR from 1.2% to **4.5%**.',
          '**SEO Integration:** Ranking standard landing pages on high-intent local keywords for permanent organic leads.'
        ]
      },
      'ads-reel': {
        title: 'Corporate <em>Ads Reel</em>',
        meta: 'Category: Sample Demo &bull; Video Production &bull; Illustrative',
        desc: 'Our high-retention video production team executes cinematic product commercials and advertising reels — from screenplay to dynamic sound-effect mapping.',
        bullets: [
          '**Retention Goal:** An illustrative target of an **84%** first-3-second hook rate and **92%** average watch-time.',
          '**Cinematic Post Production:** High-end motion typography, color correction, sound grading, and targeted hooks.',
          '**Organic Reach:** An illustrative target of up to **2.4M views** on the brand\'s social handle.'
        ]
      },
      'social-strategy': {
        title: 'Content <em>Strategy</em>',
        meta: 'Category: Sample Demo &bull; Social Media &bull; Illustrative',
        desc: 'In this sample we design a brand\'s full social grid and aesthetics in custom gold-black palettes, schedule targeted content grids, and execute a YouTube growth strategy.',
        bullets: [
          '**Followers Goal:** An illustrative target of growing from **50,000 to 5,00,000+** in 6 months.',
          '**Content Pillar Setup:** A sample high-retention micro-content Reels setup positioned to perform well in organic algorithms.',
          '**Monetization Hub:** An illustrative target of 3 major high-ticket paid sponsor deals.'
        ]
      },
      'copywriting': {
        title: 'Blog &amp; <em>Copywriting</em>',
        meta: 'Category: Sample Demo &bull; Content Creation &bull; Illustrative',
        desc: 'We write organic copy for your full website, landing pages, and blog ecosystem — focused on high-intent, rich copywriting frameworks and local search keyword integration.',
        bullets: [
          '**Organic Traffic:** An illustrative target of **400%** growth in monthly unique search visits after launch.',
          '**High Conversion:** An illustrative target of direct sign-up actions rising from **2.8% to 6.2%**.',
          '**Topic Dominance:** An illustrative target of 15+ rich blog guides ranking on Google\'s first page.'
        ]
      },
      'partnership-program': {
        title: 'Partnership <em>Program</em>',
        meta: 'Category: Sample Demo &bull; Networking &bull; Illustrative',
        desc: 'Through our strategic networking modules we build exclusive warm business networking and affiliate referral pipelines for your brand.',
        bullets: [
          '**B2B Partnerships:** An illustrative target of **50+ active alliances** with agency founders and premium creators.',
          '**Revenue Share:** Joint-venture partnerships creating monthly residual leads and passive revenue.',
          '**Brand Authority:** Premium B2B networking to build professional dominance in your niche.'
        ]
      }
    };

    var details = projectsData[projectKey];
    if (!details) return;

    modalTitle.innerHTML = details.title;
    modalMeta.innerHTML = details.meta;

    var htmlContent = '<div class="modal-section"><p>' + details.desc + '</p></div>';
    htmlContent += '<div class="modal-section"><h3>Project Highlights</h3><ul>';

    details.bullets.forEach(function(bullet) {
      var processedBullet = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlContent += '<li>' + processedBullet + '</li>';
    });

    htmlContent += '</ul></div>';
    modalBody.innerHTML = htmlContent;

    modal.classList.add('open');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  // ==========================================================================
  // 7. PARTNERSHIP FAQ TOGGLE
  // ==========================================================================
  window.openPMFaq = function(btn) {
    var faq = btn.parentElement;
    var isOpen = faq.classList.contains('open');

    document.querySelectorAll('.pm-faq').forEach(function(f) {
      f.classList.remove('open');
      var qBtn = f.querySelector('.pm-faq-q');
      if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      faq.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  // Escape key to close modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      ['service', 'blog', 'portfolio', 'localreader', 'privacy', 'terms', 'partnership'].forEach(function(id) {
        window.closeModal(id);
      });
      if (typeof window.closeBlogHub === 'function') closeBlogHub();
    }
  });

  // ==========================================================================
  // 8. FORM SUBMISSION - SANITIZE & WHATSAPP
  // ==========================================================================
  function sanitize(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function setupForm(formId, statusId, waMessageFn) {
    var form = document.getElementById(formId);
    var status = document.getElementById(statusId);
    if (!form || !status) return;

    // Set access key from localStorage or placeholder
    var accessKey = form.querySelector('input[name="access_key"]');
    if (accessKey) {
      var storedKey = localStorage.getItem('gobro_web3forms_key');
      if (storedKey) accessKey.value = storedKey;
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate required fields
      var requiredFields = form.querySelectorAll('[required]');
      var isValid = true;
      var firstInvalid = null;

      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#a83030';
          field.style.boxShadow = '0 0 0 4px rgba(168, 48, 48, 0.08)';
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }
      });

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        status.className = 'form-status error';
        status.innerHTML = '<strong>Error:</strong> Please fill in all required fields.';
        status.style.display = 'block';
        return;
      }

      // Email validation
      var emailField = form.querySelector('input[type="email"]');
      if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        emailField.style.borderColor = '#a83030';
        emailField.style.boxShadow = '0 0 0 4px rgba(168, 48, 48, 0.08)';
        emailField.focus();
        status.className = 'form-status error';
        status.innerHTML = '<strong>Error:</strong> Please enter a valid email address.';
        status.style.display = 'block';
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      status.className = 'form-status';
      status.style.display = 'none';

      var formData = new FormData(form);
      var jsonObject = {};
      formData.forEach(function(value, key) { jsonObject[key] = value; });
      
      console.log('Form data:', jsonObject);
      console.log('Access key:', jsonObject.access_key);

      // Submit to Web3Forms (email)
      var hasAccessKey = jsonObject.access_key && jsonObject.access_key.trim().length > 0;
      if (hasAccessKey) {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(jsonObject)
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
          console.log('Web3Forms response:', data);
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          if (data.success) {
            status.className = 'form-status success';
            status.innerHTML = '<strong>Success!</strong> Your message has been sent. We\'ll get back to you soon.';
            status.style.display = 'block';
            form.reset();
          } else {
            status.className = 'form-status error';
            status.innerHTML = '<strong>Error:</strong> ' + (data.message || 'Failed to send. Please try again.');
            status.style.display = 'block';
          }
        })
        .catch(function(err) {
          console.error('Web3Forms fetch error:', err);
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          status.className = 'form-status error';
          status.innerHTML = '<strong>Error:</strong> Network error. Please try again.';
          status.style.display = 'block';
        });
      } else {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        status.className = 'form-status error';
        status.innerHTML = '<strong>Error:</strong> Form configuration missing. Please contact admin.';
        status.style.display = 'block';
      }
    });

    // Clear error styles on input
    form.querySelectorAll('input, select, textarea').forEach(function(field) {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
      });
    });
  }

  setupForm('agencyForm', 'formStatus', function(form) {
    var name = sanitize(document.getElementById('name').value);
    var email = sanitize(document.getElementById('email').value);
    var phone = sanitize(document.getElementById('phone').value);
    var website = sanitize(document.getElementById('website').value) || 'Not Provided';
    var service = sanitize(form.querySelector('#service option:checked').text);
    var budget = sanitize(form.querySelector('#budget option:checked').text);
    var message = sanitize(document.getElementById('message').value) || 'Not Provided';

    var msg = '*NEW LEAD - GOBRO MEDIA*\n';
    msg += '-----------------------------\n';
    msg += '*Name:* ' + name + '\n';
    msg += '*Email:* ' + email + '\n';
    msg += '*WhatsApp:* ' + phone + '\n';
    msg += '*Website:* ' + website + '\n';
    msg += '*Service:* ' + service + '\n';
    msg += '*Budget:* ' + budget + '\n';
    msg += '*Project Goals:* ' + message + '\n';
    msg += '-----------------------------';

    return 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(msg);
  });

  setupForm('pmForm', 'pmFormStatus', function(form) {
    var pName = sanitize(form.querySelector('input[name="partner_name"]').value);
    var pPhone = sanitize(form.querySelector('input[name="partner_phone"]').value);
    var pEmail = sanitize(form.querySelector('input[name="partner_email"]').value);
    var pModel = sanitize(form.querySelector('select[name="partner_model"] option:checked').text);
    var pDetails = sanitize(form.querySelector('textarea[name="partner_details"]').value) || 'Not Provided';

    var msg = '*NEW PARTNERSHIP APPLICATION*\n';
    msg += '-----------------------------\n';
    msg += '*Name:* ' + pName + '\n';
    msg += '*WhatsApp:* ' + pPhone + '\n';
    msg += '*Email:* ' + pEmail + '\n';
    msg += '*Model:* ' + pModel + '\n';
    msg += '*Background:* ' + pDetails + '\n';
    msg += '-----------------------------';

    return 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(msg);
  });

  // ==========================================================================
  // 9. HERO BACKGROUND IMAGE SLIDER
  // ==========================================================================
  var heroSlides = document.querySelectorAll('.hero-slider .slide');
  var currentHeroSlide = 0;

  if (heroSlides.length > 0 && !reduceMotion) {
    setInterval(function() {
      heroSlides[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
    }, 5000);
  }

  // ==========================================================================
  // 10. DYNAMIC LOCAL BLOG SYSTEM (localStorage Persisted)
  // ==========================================================================
  function sanitizeHTML(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    // Remove scripts and event handlers
    template.content.querySelectorAll('script, [onclick], [onload], [onerror], [onmouseover], [onfocus], [onblur], [onchange], [onsubmit], [onreset], [onselect], [onscroll], [ondblclick], [onkeydown], [onkeypress], [onkeyup]').forEach(function(el) {
      el.remove();
    });
    return template.innerHTML;
  }

  var defaultBlogs = [
    {
      id: "seo-vs-ads",
      title: "SEO vs Google Ads: Which One Should You Choose?",
      category: "Digital Growth",
      author: "GOBRO MEDIA Team",
      date: "March 15, 2026",
      desc: "Complete guide on when to invest in organic SEO vs paid Google Ads based on your business timeline, budget, and commercial goals.",
      image: "assets/images/blog1.webp",
      content: '<div class="modal-section"><p>When starting digital marketing, every business owner faces the ultimate question: <strong>"Should I run Google Ads or focus on organic SEO?"</strong>. Both options target Google search queries, but their workflows, costs, and timelines are entirely different.</p><p>In this guide, we break down both channels to help you choose the best fit for your business goals.</p></div><div class="modal-section"><h3>1. SEO (Search Engine Optimization)</h3><p>SEO is an organic strategy where we optimize your website according to Google\'s guidelines to rank on the first page when prospects search for your keywords.</p><ul><li><strong>Pros:</strong> Once ranked, the traffic is entirely free. It offers the highest long-term ROI.</li><li><strong>Cons:</strong> It takes time. Consistent ranking efforts require 3 to 6 months of technical work.</li><li><strong>Best for:</strong> Long-term dominance and sustainable inbound lead flow without paying per click.</li></ul></div><div class="modal-section"><h3>2. Google Ads (Pay-Per-Click)</h3><p>Google Ads is a paid advertising channel. You pay Google to place your website at the very top of search results in the "Sponsored" section instantly.</p><ul><li><strong>Pros:</strong> Instant results. Launch ads today, and capture targeted buyer traffic and leads by tomorrow!</li><li><strong>Cons:</strong> High recurring cost. The moment you stop funding the ad account, your traffic stops instantly.</li><li><strong>Best for:</strong> Launching new products, gathering quick feedback, or running seasonal promotions.</li></ul></div><div class="modal-section"><h3>The GOBRO MEDIA Hybrid Recommendation</h3><p>If budget permits, we recommend a <strong>Hybrid Approach</strong>: deploy <strong>Google Ads</strong> in the first 90 days to generate immediate revenue and feedback, while simultaneously building your long-term organic <strong>SEO pipeline</strong>. As SEO rankings climb, you can optimize paid budgets and maximize profits.</p></div>'
    },
    {
      id: "roas-guide",
      title: "How to Achieve 3x ROAS for E-commerce Brands",
      category: "Performance Ads",
      author: "GOBRO MEDIA Team",
      date: "March 12, 2026",
      desc: "Proven strategies to scale to a 3.0x Return on Ad Spend (ROAS) using conversion landing pages and advanced retargeting funnels.",
      image: "assets/images/blog2.webp",
      content: '<div class="modal-section"><p>For e-commerce brands, the single most critical metric is <strong>ROAS (Return on Ad Spend)</strong>. If you invest $1,000 in ads and generate $3,000 in revenue, your ROAS is 3.0x. In today\'s competitive landscape, hitting 3.0x ROAS requires strategic optimization.</p><p>Here is our agency blueprint for scaling e-commerce ad returns:</p></div><div class="modal-section"><h3>Step 1: High-Conversion Product Landing Pages</h3><p>Never send paid traffic to a generic homepage or slow website. Optimize for conversions:</p><ul><li>Ensure page loading speeds are under 2 seconds.</li><li>Use premium, high-resolution lifestyle graphics of your product.</li><li>Incorporate strong, sticky <strong>"Add to Cart / Buy Now"</strong> buttons.</li><li>Integrate automated cart-abandonment loops via WhatsApp, SMS, and Email.</li></ul></div><div class="modal-section"><h3>Step 2: Micro-Creative Testing Cycles</h3><p>Running the same creatives for months leads to \'Ad Fatigue\' and higher customer acquisition costs.</p></div>'
    },
    {
      id: "local-seo",
      title: "Local SEO Checklist for Small Businesses",
      category: "Local SEO",
      author: "GOBRO MEDIA Team",
      date: "March 10, 2026",
      desc: "Step-by-step organic search mapping checklist every local business, showroom, or store should execute to rank on Google Maps.",
      image: "assets/images/blog3.webp",
      content: '<div class="modal-section"><p>Do you own a physical store, cafe, gym, or medical clinic? Ranking high on Google Maps can become your primary source of free inbound leads.</p></div><div class="modal-section"><h3>1. Claim & Verify Google Business Profile (GBP)</h3><p>Visit Google Business Profile to claim your official business listing.</p></div>'
    }
  ];

  window.openBlogHub = function() {
    var hub = document.getElementById('modal-bloghub');
    if (hub) {
      hub.classList.add('open');
      hub.hidden = false;
      document.body.style.overflow = 'hidden';
      checkAdminState();
      renderLocalBlogs();
    }
  };

  window.closeBlogHub = function() {
    var hub = document.getElementById('modal-bloghub');
    if (hub) {
      hub.classList.remove('open');
      hub.hidden = true;
      document.body.style.overflow = '';
    }
  };

  window.renderLocalBlogs = function() {
    var blogs = JSON.parse(localStorage.getItem('gobro_blogs')) || [];
    if (blogs.length === 0) {
      localStorage.setItem('gobro_blogs', JSON.stringify(defaultBlogs));
      blogs = defaultBlogs;
    }

    // Render in Blog Hub
    var grid = document.getElementById('localBlogGrid');
    if (grid) {
      var htmlContent = '';
      blogs.forEach(function(blog) {
        var coverImageHtml = blog.image
          ? '<div style="width:100%; height:180px; overflow:hidden; border-radius:4px; margin-bottom:16px;">' +
            '<img src="' + sanitize(blog.image) + '" alt="' + sanitize(blog.title) + '" loading="lazy" style="width:100%; height:100%; object-fit:cover;" />' +
            '</div>'
          : '';
        htmlContent += '<article class="blog-card" style="display:flex; flex-direction:column; padding:24px; background:var(--bg-dark-3); border:1px solid var(--glass-border); border-radius:6px; min-height: 320px; box-shadow: var(--shadow-premium);">' +
          coverImageHtml +
          '<div style="font-size:0.65rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; font-weight:700;">' + sanitize(blog.category) + '</div>' +
          '<h3 style="font-family:\'Cormorant Garamond\', serif; font-size:1.4rem; line-height:1.3; color:var(--white); margin-bottom:12px; font-weight:600;">' + sanitize(blog.title) + '</h3>' +
          '<p style="font-size:0.8rem; color:var(--text-muted); line-height:1.7; font-weight:300; margin-bottom:20px;">' + sanitize(blog.desc) + '</p>' +
          '<div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center;">' +
          '<span style="font-size:0.7rem; color:var(--text-dim); font-weight:400;">By ' + sanitize(blog.author) + '</span>' +
          '<button onclick="readLocalBlog(\'' + blog.id + '\')" style="background:none; border:none; color:var(--gold); font-size:0.75rem; font-weight:700; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">Read &rarr;</button>' +
          '</div></article>';
      });
      grid.innerHTML = htmlContent;
    }

    // Render on Homepage
    var homepageGrid = document.getElementById('homepageBlogGrid');
    if (homepageGrid) {
      var htmlContent2 = '';
      blogs.slice(0, 3).forEach(function(blog) {
        var coverImageHtml = blog.image
          ? '<div class="blog-image"><img src="' + sanitize(blog.image) + '" alt="' + sanitize(blog.title) + '" loading="lazy" style="width:100%; height:100%; object-fit:cover; object-position:center;" /></div>'
          : '';
        htmlContent2 += '<article class="blog-card reveal">' +
          coverImageHtml +
          '<div class="blog-content">' +
          '<div class="blog-date">' + sanitize(blog.date) + ' &bull; ' + sanitize(blog.category) + '</div>' +
          '<h3>' + sanitize(blog.title) + '</h3>' +
          '<p class="blog-desc">' + sanitize(blog.desc) + '</p>' +
          '<button onclick="readLocalBlog(\'' + blog.id + '\')" class="blog-btn">Read Full Article &rarr;</button>' +
          '</div></article>';
      });
      homepageGrid.innerHTML = htmlContent2;
      var newReveals = homepageGrid.querySelectorAll('.reveal');
      if (reduceMotion) {
        newReveals.forEach(function(el) { el.classList.add('visible'); });
      } else if (revealObserver) {
        newReveals.forEach(function(el) { revealObserver.observe(el); });
      } else {
        newReveals.forEach(function(el) { el.classList.add('visible'); });
      }
    }
  };

  window.readLocalBlog = function(blogId) {
    var blogs = JSON.parse(localStorage.getItem('gobro_blogs')) || [];
    var blog = blogs.find(function(b) { return b.id === blogId; });
    if (!blog) return;

    document.getElementById('readerCategory').textContent = blog.category;
    document.getElementById('readerTitle').textContent = blog.title;
    document.getElementById('readerMeta').innerHTML = 'Published: ' + sanitize(blog.date) + ' &bull; By ' + sanitize(blog.author);

    var coverImageHtml = blog.image
      ? '<div style="width:100%; max-height:360px; overflow:hidden; border-radius:4px; margin-bottom:24px;">' +
        '<img src="' + sanitize(blog.image) + '" alt="' + sanitize(blog.title) + '" style="width:100%; height:100%; object-fit:cover;" />' +
        '</div>'
      : '';

    document.getElementById('readerContent').innerHTML = coverImageHtml + sanitizeHTML(blog.content);

    var reader = document.getElementById('modal-localreader');
    if (reader) {
      reader.classList.add('open');
      reader.hidden = false;
    }
  };

  // Initialize
  renderLocalBlogs();

  // ==========================================================================
  // MICRO-INTERACTIONS
  // ==========================================================================

  // 1. Ripple Effect on Buttons
  document.querySelectorAll('.btn, .service-link, .blog-btn, .nav-cta').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = [
        'position: absolute',
        'width: 8px',
        'height: 8px',
        'border-radius: 50%',
        'background: rgba(201, 168, 76, 0.3)',
        'transform: scale(0)',
        'animation: rippleAnim 0.7s ease-out forwards',
        'pointer-events: none',
        'left: ' + (x - 4) + 'px',
        'top: ' + (y - 4) + 'px'
      ].join(';');

      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 700);
    });
  });

  // 2. Magnetic Hover on CTA Buttons
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      if (window.innerWidth < 768) return;
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.style.transform = 'translate(' + (x * 6) + 'px, ' + (y * 4) + 'px)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // 3. Smooth Page Transitions for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        history.pushState(null, null, targetId);
      }
    });
  });

  // 4. Add ripple animation keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = '@keyframes rippleAnim { to { transform: scale(25); opacity: 0; } }';
  document.head.appendChild(rippleStyle);

  // ==========================================================================
  // CAROUSEL INIT
  // ==========================================================================
  function initCarousel(trackSelector, dotsSelector, interval) {
    var track = document.querySelector(trackSelector);
    var dotsContainer = document.querySelector(dotsSelector);
    if (!track || !dotsContainer) return;

    var gap = 30;
    var total = track.children.length; // number of real cards (before cloning)
    if (total < 2) return;

    var visible = 0;
    var current = 0;
    var timer;

    function getVisible() {
      return window.innerWidth < 680 ? 1 : (window.innerWidth < 1024 ? 2 : 3);
    }

    // Strip any previously appended clones, then append `visible` clones of the
    // first cards so the track can scroll seamlessly past the real end.
    function buildClones() {
      while (track.children.length > total) {
        track.removeChild(track.lastChild);
      }
      visible = getVisible();
      var reals = Array.prototype.slice.call(track.children, 0, total);
      for (var i = 0; i < visible; i++) {
        track.appendChild(reals[i].cloneNode(true));
      }
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < total; i++) {
        (function(idx) {
          var btn = document.createElement('button');
          btn.setAttribute('role', 'tab');
          btn.setAttribute('aria-label', 'Slide ' + (i + 1));
          if (idx === 0) btn.classList.add('active');
          btn.addEventListener('click', function() {
            current = idx;
            update(true);
            resetTimer();
          });
          dotsContainer.appendChild(btn);
        })(i);
      }
    }

    function cardWidth() {
      return track.children[0].getBoundingClientRect().width;
    }

    function update(animate) {
      track.style.transition = animate === false ? 'none' : 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
      var offset = current * (cardWidth() + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';
      var active = ((current % total) + total) % total;
      Array.prototype.forEach.call(dotsContainer.children, function(d, i) {
        d.classList.toggle('active', i === active);
      });
    }

    function next() {
      current++;
      update(true);
      // When we reach the cloned tail, snap back to the real start seamlessly.
      if (current >= total) {
        setTimeout(function() {
          current = current % total;
          update(false);
        }, 620);
      }
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, interval);
    }

    buildClones();
    buildDots();
    current = 0;
    update(false);
    timer = setInterval(next, interval);

    window.addEventListener('resize', function() {
      clearInterval(timer);
      buildClones();
      current = 0;
      update(false);
      timer = setInterval(next, interval);
    });

    track.parentElement.addEventListener('mouseenter', function() { clearInterval(timer); });
    track.parentElement.addEventListener('mouseleave', function() { resetTimer(); });
  }

  if (!reduceMotion) initCarousel('.identity-track', '.identity-dots', 5000);

  // ==========================================================================
  // BLUR-UP IMAGE LOADING
  // ==========================================================================
  document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    if (img.complete) {
      img.classList.add('loaded');
    }
  });
});
