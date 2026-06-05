/**
 * GOBRO MEDIA - PREMIUM INTERACTION SCRIPT
 * 
 * CONFIGURATION:
 * Change the WHATSAPP_NUMBER below to your own WhatsApp number (with country code, no "+" or spaces).
 * Example: "919999999999" (91 is the country code for India, followed by the 10-digit mobile number).
 */
const WHATSAPP_NUMBER = "919990737306"; 

document.addEventListener('DOMContentLoaded', function() {
  
  // Custom cursor removed to restore default browser mouse pointer

  // ==========================================================================
  // 2. MORPHING HEADER ON SCROLL
  // ==========================================================================
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    
    // Toggle header morphing class
    if (header) {
      if (scrollPos > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Toggle Scroll-to-Top sticky button
    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    }
  });

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 3. MOBILE MENU Burger Navigation
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('open');
        hamburger.innerHTML = '<span style="transform: rotate(45deg) translate(6px, 6px)"></span><span style="opacity:0"></span><span style="transform: rotate(-45deg) translate(5px, -5px)"></span>';
        document.body.style.overflow = 'hidden'; // Stop scrolling background
      }
    });
    
    // Close mobile menu on clicking any navigation anchor
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // 4. INTERSECTION OBSERVER - REVEAL ON SCROLL ANIMATIONS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger animation once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: Reveal all instantly if browser does not support Intersection Observer
    revealElements.forEach(el => el.classList.add('visible'));
  }

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
    
    const details = serviceDetails[serviceKey];
    if (!details) return;
    
    modalTitle.innerHTML = details.title;
    
    let htmlContent = `<div class="modal-section"><p>${details.desc}</p></div>`;
    htmlContent += `<div class="modal-section"><h3>Core Deliverables</h3><ul>`;
    
    details.bullets.forEach(bullet => {
      // Bold syntax conversion **text** -> <strong>text</strong>
      const processedBullet = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlContent += `<li>${processedBullet}</li>`;
    });
    
    htmlContent += `</ul></div>`;
    modalBody.innerHTML = htmlContent;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Open generic modals (Privacy, Terms, Partnership)
  window.openModal = function(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  // Close modals
  window.closeModal = function(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close modals on clicking backdrop
  window.closeModalOutside = function(event, modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal && event.target === modal) {
      closeModal(modalId);
    }
  };

  // ==========================================================================
  // 6. DETAILED BLOG / INSIGHT READ-MORE MODALS (Backup for legacy triggers)
  // ==========================================================================
  window.openBlogModal = function(blogKey) {
    readLocalBlog(blogKey);
  };

  // ==========================================================================
  // 6b. INTERACTIVE CASE STUDY MODALS FOR PORTFOLIO
  // ==========================================================================
  window.openPortfolioModal = function(projectKey) {
    const modal = document.getElementById('modal-portfolio');
    const modalTitle = document.getElementById('portfolio-modal-title');
    const modalMeta = document.getElementById('portfolio-modal-meta');
    const modalBody = document.getElementById('portfolio-modal-body');
    
    if (!modal || !modalTitle || !modalMeta || !modalBody) return;
    
    const projectsData = {
      'growth-campaign': {
        title: 'Brand <em>Growth Campaign</em>',
        meta: 'Category: Digital Marketing &bull; ROI: 320% &bull; Client: E-commerce Brand',
        desc: 'Humne is digital marketing campaign me client ke Google Ads aur Facebook Ads accounts ko zero se optimized structure par transition kiya. Content creative maps banaye aur conversion copy ko completely overhaul kiya.',
        bullets: [
          '**Result Achieved:** Just 90 days ke andar **3.2x ROAS (Return on Ad Spend)** aur 300%+ monthly sales order me growth scale kiya.',
          '**Ad Spend Optimization:** Ad click CTR (Click-Through Rate) ko 1.2% se badhakar **4.5%** tak deliver kiya.',
          '**SEO Integration:** High-intent local keywords par standard landing pages ko rank karaya, jisse permanent organic leads milti rahein.'
        ]
      },
      'ads-reel': {
        title: 'Corporate <em>Ads Reel</em>',
        meta: 'Category: Video Production &bull; Platform: YouTube &amp; Instagram &bull; Client: Tech Brand',
        desc: 'Gobro Media ki high-retention video production team ne is cinematic product commercial aur advertising reel ko screenplays se lekar dynamic sound effect mapping tak execute kiya.',
        bullets: [
          '**Retention Success:** Reels video me first 3-second hook rate **84%** cross kiya aur average watch-time metrics **92%** tak rise hua.',
          '**Cinematic Post Production:** High-end motion typography, color correction, sound grading, aur targeted hooks build kiye.',
          '**Organic Reach:** Is professional reel setup ne client ke social handle par organic impressions ko **2.4M views** tak touch kiya.'
        ]
      },
      'social-strategy': {
        title: 'Content <em>Strategy</em>',
        meta: 'Category: Social Media Management &bull; Growth: 10x &bull; Client: Indian Fitness Creator',
        desc: 'Humne client ke pure social grid layout aur aesthetic aesthetics ko custom gold-black palettes me design kiya, targeted content grids schedule kiye, aur YouTube growth strategy execute ki.',
        bullets: [
          '**Followers Scaling:** Client ka follower base just 6 months me **50,000 se 5,00,000+** cross kar gaya.',
          '**Content Pillar Setup:** High-retention micro-content Reels setup kiya jo organic algos me viral rating tak drop hui.',
          '**Monetization Hub:** 3 major high-ticket paid sponsor brands onboarding deal confirm karwayi.'
        ]
      },
      'copywriting': {
        title: 'Blog &amp; <em>Copywriting</em>',
        meta: 'Category: Content Creation &bull; Traffic: +400% &bull; Client: B2B SaaS Startup',
        desc: 'Humne pure brand website landing page and blogs ecosystem ki organic copy likhi. High-intent, rich copywriting frameworks aur local search key integration par focus kiya.',
        bullets: [
          '**Organic Traffic Gains:** Content strategies launch karne ke bad, monthly unique search hits **400%** up scale huye.',
          '**High Conversion Rates:** Copy updates ke bad direct sign-up actions **2.8% to 6.2%** range me growth huye.',
          '**Topic Dominance:** Important industry topics par 15+ rich blog guides Google search map me pehle page par position huye.'
        ]
      },
      'partnership-program': {
        title: 'Partnership <em>Program</em>',
        meta: 'Category: Business Networking &bull; Connections: 50+ &bull; Client: Corporate Agency',
        desc: 'Hamare strategic networking modules ke through humne client brand ke liye exclusive warm business networking and affiliate referral pipelines build kiye.',
        bullets: [
          '**B2B Partnerships:** Top digital agency founders aur premium content creators ke sath **50+ active alliances** confirm kiye.',
          '**Revenue Share Setup:** Joint venture partnerships create kiye jisse monthly residual leads aur passive revenue stream map hui.',
          '**Brand Authority:** Premium B2B networking networks build karke niche me 100% professional dominance lock kiya.'
        ]
      }
    };
    
    const details = projectsData[projectKey];
    if (!details) return;
    
    modalTitle.innerHTML = details.title;
    modalMeta.innerHTML = details.meta;
    
    let htmlContent = `<div class="modal-section"><p>${details.desc}</p></div>`;
    htmlContent += `<div class="modal-section"><h3>Project Highlights</h3><ul>`;
    
    details.bullets.forEach(bullet => {
      const processedBullet = bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      htmlContent += `<li>${processedBullet}</li>`;
    });
    
    htmlContent += `</ul></div>`;
    modalBody.innerHTML = htmlContent;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // ==========================================================================
  // 7. COLLAPSIBLE LANDING PAGE FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        
        // Close all other FAQ items first
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.display = 'none';
        });
        
        // Toggle the clicked one
        if (!isOpen) {
          item.classList.add('open');
          const answer = item.querySelector('.faq-answer');
          if (answer) answer.style.display = 'block';
        }
      });
    }
  });

  // ==========================================================================
  // 8. PARTNERSHIP IMMERSIVE MODAL & FAQS
  // ==========================================================================
  window.openPMFaq = function(btn) {
    const faq = btn.parentElement;
    const isOpen = faq.classList.contains('open');
    
    // Close all other partnership FAQs
    const allPMFaqs = document.querySelectorAll('.pm-faq');
    allPMFaqs.forEach(f => {
      f.classList.remove('open');
      const ans = f.querySelector('.pm-faq-a');
      if (ans) ans.style.display = 'none';
    });
    
    if (!isOpen) {
      faq.classList.add('open');
      const ans = faq.querySelector('.pm-faq-a');
      if (ans) ans.style.display = 'block';
    }
  };

  // Close modals when Escape key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal('service');
      closeModal('blog');
      closeModal('portfolio');
      closeModal('localreader');
      closeModal('privacy');
      closeModal('terms');
      closeModal('partnership');
      closeBlogHub();
    }
  });

  // ==========================================================================
  // 9. AJAX LEAD FORM SUBMISSION WITH WHATSAPP & BACKUP EMAIL
  // ==========================================================================
  const contactForm = document.getElementById('agencyForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop standard redirect
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'Connecting to WhatsApp...';
      submitBtn.disabled = true;
      formStatus.className = 'form-status'; // Reset status classes
      formStatus.style.display = 'none';
      
      // Get all values from the form inputs
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const website = document.getElementById('website').value || 'Not Provided';
      
      const serviceSelect = document.getElementById('service');
      const service = serviceSelect.options[serviceSelect.selectedIndex].text;
      
      const budgetSelect = document.getElementById('budget');
      const budget = budgetSelect.options[budgetSelect.selectedIndex].text;
      
      const message = document.getElementById('message').value || 'Not Provided';
      
      // Format the WhatsApp message beautifully
      const waMessage = `*🔥 NEW LEAD - GOBRO MEDIA *%0A` +
                        `-----------------------------%0A` +
                        `*👤 Name:* ${encodeURIComponent(name)}%0A` +
                        `*📧 Email:* ${encodeURIComponent(email)}%0A` +
                        `*📞 WhatsApp:* ${encodeURIComponent(phone)}%0A` +
                        `*🌐 Website:* ${encodeURIComponent(website)}%0A` +
                        `*💼 Service:* ${encodeURIComponent(service)}%0A` +
                        `*💰 Budget:* ${encodeURIComponent(budget)}%0A` +
                        `*📝 Project Goals:* ${encodeURIComponent(message)}%0A` +
                        `-----------------------------`;
      
      // Create the WhatsApp API Link
      const waLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${waMessage}`;
      
      // Show local success state
      formStatus.className = 'form-status success';
      formStatus.innerHTML = '<strong>Success!</strong> Redirecting you to WhatsApp to send your details instantly...';
      formStatus.style.display = 'block';
      
      // Send Email backup in background
      const formData = new FormData(contactForm);
      const jsonObject = {};
      formData.forEach((value, key) => jsonObject[key] = value);
      
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(jsonObject)
      }).catch(err => console.log('Email backup failed:', err));
      
      // Redirect to WhatsApp after 800ms
      setTimeout(() => {
        window.open(waLink, '_blank');
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 800);
    });
  }

  // ==========================================================================
  // 10. PARTNERSHIP MODAL LEAD FORM SUBMISSION WITH WHATSAPP & BACKUP EMAIL
  // ==========================================================================
  const pmForm = document.getElementById('pmForm');
  const pmFormStatus = document.getElementById('pmFormStatus');
  
  if (pmForm && pmFormStatus) {
    pmForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = pmForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'Connecting to WhatsApp...';
      submitBtn.disabled = true;
      pmFormStatus.className = 'form-status';
      pmFormStatus.style.display = 'none';
      
      // Get all values from the form inputs
      const pName = pmForm.querySelector('input[name="partner_name"]').value;
      const pPhone = pmForm.querySelector('input[name="partner_phone"]').value;
      const pEmail = pmForm.querySelector('input[name="partner_email"]').value;
      
      const pModelSelect = pmForm.querySelector('select[name="partner_model"]');
      const pModel = pModelSelect.options[pModelSelect.selectedIndex].text;
      
      const pDetails = pmForm.querySelector('textarea[name="partner_details"]').value || 'Not Provided';
      
      // Format the WhatsApp message beautifully
      const waMessage = `*🤝 NEW PARTNERSHIP APPLICATION *%0A` +
                        `-----------------------------%0A` +
                        `*👤 Name:* ${encodeURIComponent(pName)}%0A` +
                        `*📞 WhatsApp:* ${encodeURIComponent(pPhone)}%0A` +
                        `*📧 Email:* ${encodeURIComponent(pEmail)}%0A` +
                        `*💼 Model:* ${encodeURIComponent(pModel)}%0A` +
                        `*📝 Background:* ${encodeURIComponent(pDetails)}%0A` +
                        `-----------------------------`;
      
      // Create the WhatsApp API Link
      const waLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${waMessage}`;
      
      // Show local success state
      pmFormStatus.className = 'form-status success';
      pmFormStatus.innerHTML = '<strong>Success!</strong> Connecting you to WhatsApp to submit your partner application...';
      pmFormStatus.style.display = 'block';
      
      // Send Email backup in background
      const formData = new FormData(pmForm);
      const jsonObject = {};
      formData.forEach((value, key) => jsonObject[key] = value);
      
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(jsonObject)
      }).catch(err => console.log('Partnership email backup failed:', err));
      
      // Redirect to WhatsApp after 800ms
      setTimeout(() => {
        window.open(waLink, '_blank');
        pmForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 800);
    });
  }

  // ==========================================================================
  // 11. AUTOMATIC HERO BACKGROUND IMAGE SLIDER
  // ==========================================================================
  const heroSlides = document.querySelectorAll('.hero-slider .slide');
  let currentHeroSlide = 0;
  
  if (heroSlides.length > 0) {
    setInterval(() => {
      heroSlides[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
    }, 5000); // Transitions every 5 seconds
  }

  // ==========================================================================
  // 12. DYNAMIC LOCAL BLOG SYSTEM (localStorage Persisted & Translated)
  // ==========================================================================
  
  // Default Seed Blogs (Loaded if localStorage is empty)
  const defaultBlogs = [
    {
      id: "seo-vs-ads",
      title: "SEO vs Google Ads: Which One Should You Choose?",
      category: "Digital Growth",
      author: "GOBRO MEDIA Team",
      date: "March 15, 2026",
      desc: "Complete guide on when to invest in organic SEO vs paid Google Ads based on your business timeline, budget, and commercial goals.",
      image: "blog1.jpg",
      content: `
        <div class="modal-section">
          <p>When starting digital marketing, every business owner faces the ultimate question: <strong>"Should I run Google Ads or focus on organic SEO?"</strong>. Both options target Google search queries, but their workflows, costs, and timelines are entirely different.</p>
          <p>In this guide, we break down both channels to help you choose the best fit for your business goals.</p>
        </div>
        
        <div class="modal-section">
          <h3>1. SEO (Search Engine Optimization)</h3>
          <p>SEO is an organic strategy where we optimize your website according to Google's guidelines to rank on the first page when prospects search for your keywords.</p>
          <ul>
            <li><strong>Pros:</strong> Once ranked, the traffic is entirely free. It offers the highest long-term ROI.</li>
            <li><strong>Cons:</strong> It takes time. Consistent ranking efforts require 3 to 6 months of technical work.</li>
            <li><strong>Best for:</strong> Long-term dominance and sustainable inbound lead flow without paying per click.</li>
          </ul>
        </div>

        <div class="modal-section">
          <h3>2. Google Ads (Pay-Per-Click)</h3>
          <p>Google Ads is a paid advertising channel. You pay Google to place your website at the very top of search results in the "Sponsored" section instantly.</p>
          <ul>
            <li><strong>Pros:</strong> Instant results. Launch ads today, and capture targeted buyer traffic and leads by tomorrow!</li>
            <li><strong>Cons:</strong> High recurring cost. The moment you stop funding the ad account, your traffic stops instantly.</li>
            <li><strong>Best for:</strong> Launching new products, gathering quick feedback, or running seasonal promotions.</li>
          </ul>
        </div>

        <div class="modal-section">
          <h3>The GOBRO MEDIA Hybrid Recommendation</h3>
          <p>If budget permits, we recommend a <strong>Hybrid Approach</strong>: deploy <strong>Google Ads</strong> in the first 90 days to generate immediate revenue and feedback, while simultaneously building your long-term organic <strong>SEO pipeline</strong>. As SEO rankings climb, you can optimize paid budgets and maximize profits.</p>
        </div>
      `
    },
    {
      id: "roas-guide",
      title: "How to Achieve 3x ROAS for E-commerce Brands",
      category: "Performance Ads",
      author: "GOBRO MEDIA Team",
      date: "March 12, 2026",
      desc: "Proven strategies to scale to a 3.0x Return on Ad Spend (ROAS) using conversion landing pages and advanced retargeting funnels.",
      image: "blog2.jpg",
      content: `
        <div class="modal-section">
          <p>For e-commerce brands, the single most critical metric is <strong>ROAS (Return on Ad Spend)</strong>. If you invest $1,000 in ads and generate $3,000 in revenue, your ROAS is 3.0x. In today's competitive landscape, hitting 3.0x ROAS requires strategic optimization.</p>
          <p>Here is our agency blueprint for scaling e-commerce ad returns:</p>
        </div>

        <div class="modal-section">
          <h3>Step 1: High-Conversion Product Landing Pages</h3>
          <p>Never send paid traffic to a generic homepage or slow website. Optimize for conversions:</p>
          <ul>
            <li>Ensure page loading speeds are under 2 seconds.</li>
            <li>Use premium, high-resolution lifestyle graphics of your product.</li>
            <li>Incorporate strong, sticky <strong>"Add to Cart / Buy Now"</strong> buttons.</li>
            <li>Integrate automated cart-abandonment loops via WhatsApp, SMS, and Email.</li>
          </ul>
        </div>

        <div class="modal-section">
          <h3>Step 2: Micro-Creative Testing Cycles</h3>
          <p>Running the same creatives for months leads to 'Ad Fatigue' and higher customer acquisition costs. Test weekly:</p>
          <ul>
            <li><strong>UGC (User Generated Content):</strong> Real people sharing authentic product reviews can increase CTR by 40%.</li>
            <li><strong>Offer Testing:</strong> Run side-by-side A/B tests of "Buy 1 Get 1" versus "Flat 30% Off" to determine what resonates.</li>
          </ul>
        </div>

        <div class="modal-section">
          <h3>Step 3: Multi-Stage Retargeting Funnels</h3>
          <p>Nearly 98% of users do not purchase on their first visit. Set up advanced retargeting campaigns on Meta and Google to re-engage warm audiences who added items to their cart but left before checkout. Offer a limited-time incentive to seal the deal!</p>
        </div>
      `
    },
    {
      id: "local-seo",
      title: "Local SEO Checklist for Small Businesses",
      category: "Local SEO",
      author: "GOBRO MEDIA Team",
      date: "March 10, 2026",
      desc: "Step-by-step organic search mapping checklist every local business, showroom, or store should execute to rank on Google Maps.",
      image: "blog3.jpg",
      content: `
        <div class="modal-section">
          <p>Do you own a physical store, cafe, gym, or medical clinic? Ranking high on Google Maps can become your primary source of free inbound leads. When customers search for terms like "best digital agency near me," Google presents the **Google Map Pack** (the top 3 local business results).</p>
          <p>Here is your step-by-step checklist to dominate local search:</p>
        </div>

        <div class="modal-section">
          <h3>1. Claim & Verify Google Business Profile (GBP)</h3>
          <p>Visit <a href="https://business.google.com" target="_blank" style="color:var(--gold);">Google Business Profile</a> to claim your official business listing. Complete the required video or postcard verification process to go live.</p>
        </div>

        <div class="modal-section">
          <h3>2. Maximize NAP Consistency</h3>
          <p><strong>NAP</strong> stands for <strong>Name, Address, and Phone Number</strong>. Make sure your business name, physical address, and contact number are written exactly the same way across your website, social media pages, and local citation directories (e.g., Yelp, TripAdvisor, local directory platforms).</p>
        </div>

        <div class="modal-section">
          <h3>3. Drive Customer Reviews Weekly</h3>
          <p>Google Maps rankings rely heavily on the number and quality of customer reviews. Display a custom QR code at your checkout desk that links directly to your GBP review form. Encourage clients to mention specific service names in their feedback.</p>
        </div>

        <div class="modal-section">
          <h3>4. Maintain Active Profile Updates</h3>
          <p>Treat your Google Business Profile like a social media handle. Regularly upload high-quality store photos, post weekly updates, and announce active promotional discounts. Google rewards active listings with higher rank authority.</p>
        </div>
      `
    }
  ];

  // Open Blog Hub View
  window.openBlogHub = function() {
    const hub = document.getElementById('modal-bloghub');
    if (hub) {
      hub.classList.add('open');
      document.body.style.overflow = 'hidden';
      checkAdminState(); // Check if admin is logged in
      renderLocalBlogs(); // Refresh list on opening
    }
  };

  // Close Blog Hub View
  window.closeBlogHub = function() {
    const hub = document.getElementById('modal-bloghub');
    if (hub) {
      hub.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Collapse/Expand Blog Creator Form
  window.toggleBlogCreator = function() {
    const container = document.getElementById('blogCreatorContainer');
    if (container) {
      const isHidden = container.style.display === 'none';
      container.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Publish a New Blog Post (Save to localStorage with Image)
  window.publishLocalBlog = function(event) {
    event.preventDefault();
    
    const title = document.getElementById('blogTitle').value;
    const category = document.getElementById('blogCategory').value;
    const author = document.getElementById('blogAuthor').value;
    const desc = document.getElementById('blogDesc').value;
    const content = document.getElementById('blogContent').value;
    const imageUrl = document.getElementById('blogImageUrl').value;
    const imageFile = document.getElementById('blogImageFile').files[0];
    
    const saveBlog = (imageData) => {
      const newBlog = {
        id: 'blog-' + Date.now(),
        title: title,
        category: category,
        author: author,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        desc: desc,
        image: imageData || '',
        content: content
      };
      
      // Save to localStorage list
      let existingBlogs = JSON.parse(localStorage.getItem('gobro_blogs')) || [];
      existingBlogs.unshift(newBlog); // Add new blog to the top
      localStorage.setItem('gobro_blogs', JSON.stringify(existingBlogs));
      
      // Reset Creator Form & collapse it
      document.getElementById('localBlogForm').reset();
      document.getElementById('blogCreatorContainer').style.display = 'none';
      
      // Rerender list
      renderLocalBlogs();
      alert('🎉 Success! Your blog post has been successfully published.');
    };
    
    // Check if user selected a file to upload
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        saveBlog(e.target.result); // Base64 Data URL string
      };
      reader.readAsDataURL(imageFile);
    } else {
      saveBlog(imageUrl); // Text URL or asset path
    }
  };

  // Render Blogs Grid with Cover Images (renders to both Modal and Homepage Grid)
  window.renderLocalBlogs = function() {
    let blogs = JSON.parse(localStorage.getItem('gobro_blogs')) || [];
    
    // Auto-migrate any old .png seed images to .jpg
    let migrated = false;
    blogs = blogs.map(blog => {
      if (typeof blog.image === 'string' && blog.image.endsWith('.png') && blog.image.includes('blog')) {
        blog.image = blog.image.replace('.png', '.jpg');
        migrated = true;
      }
      return blog;
    });
    if (migrated) {
      localStorage.setItem('gobro_blogs', JSON.stringify(blogs));
    }
    
    // If empty or old seed configuration, reload default seed blogs
    const isOldSeed = blogs.some(b => b.id === 'seed-1' || b.id === 'seed-2');
    if (blogs.length === 0 || isOldSeed) {
      localStorage.setItem('gobro_blogs', JSON.stringify(defaultBlogs));
      blogs = defaultBlogs;
    }
    
    // 1. Render in standalone Blog Hub Modal if it exists
    const grid = document.getElementById('localBlogGrid');
    if (grid) {
      let htmlContent = '';
      blogs.forEach(blog => {
        const coverImageHtml = blog.image 
          ? `<div style="width:100%; height:180px; overflow:hidden; border-radius:4px; margin-bottom:16px;">
               <img src="${blog.image}" alt="${blog.title}" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover;" />
             </div>`
          : '';
          
        htmlContent += `
          <article class="blog-card reveal visible" style="display:flex; flex-direction:column; padding:24px; background:var(--bg-dark-3); border:1px solid var(--glass-border); border-radius:6px; min-height: 320px; box-shadow: var(--shadow-premium);">
            ${coverImageHtml}
            <div style="font-size:0.65rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; font-weight:700;">${blog.category}</div>
            <h3 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; line-height:1.3; color:var(--white); margin-bottom:12px; font-weight:600;">${blog.title}</h3>
            <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.7; font-weight:300; margin-bottom:20px;">${blog.desc}</p>
            <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.7rem; color:var(--text-dim); font-weight:400;">By ${blog.author}</span>
              <button onclick="readLocalBlog('${blog.id}')" style="background:none; border:none; color:var(--gold); font-size:0.75rem; font-weight:700; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:4px;">Read &rarr;</button>
            </div>
          </article>
        `;
      });
      grid.innerHTML = htmlContent;
    }
    
    // 2. Render on Homepage Blog Grid
    const homepageGrid = document.getElementById('homepageBlogGrid');
    if (homepageGrid) {
      let htmlContent = '';
      // Limit to latest 3 blogs for the homepage
      const latestBlogs = blogs.slice(0, 3);
      latestBlogs.forEach(blog => {
        const coverImageHtml = blog.image 
          ? `<div class="blog-image">
               <img src="${blog.image}" alt="${blog.title}" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; object-position:center;" />
             </div>`
          : '';
          
        htmlContent += `
          <article class="blog-card reveal visible">
            ${coverImageHtml}
            <div class="blog-content">
              <div class="blog-date">${blog.date} &bull; ${blog.category}</div>
              <h3>${blog.title}</h3>
              <p class="blog-desc">${blog.desc}</p>
              <button onclick="readLocalBlog('${blog.id}')" class="blog-btn">Read Full Article &rarr;</button>
            </div>
          </article>
        `;
      });
      homepageGrid.innerHTML = htmlContent;
    }
  };

  // Open Reader Overlay for a specific Blog Post with Cover Image
  window.readLocalBlog = function(blogId) {
    let blogs = JSON.parse(localStorage.getItem('gobro_blogs')) || [];
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;
    
    document.getElementById('readerCategory').innerText = blog.category;
    document.getElementById('readerTitle').innerHTML = blog.title;
    document.getElementById('readerMeta').innerHTML = `Published: ${blog.date} &bull; By ${blog.author}`;
    
    const coverImageHtml = blog.image
      ? `<div style="width:100%; max-height:360px; overflow:hidden; border-radius:4px; margin-bottom:24px;">
           <img src="${blog.image}" alt="${blog.title}" style="width:100%; height:100%; object-fit:cover;" />
         </div>`
      : '';
      
    document.getElementById('readerContent').innerHTML = coverImageHtml + blog.content;
    
    const reader = document.getElementById('modal-localreader');
    if (reader) {
      reader.classList.add('open');
    }
  };

  // Check and apply admin state on load
  window.checkAdminState = function() {
    const isAdmin = localStorage.getItem('gobro_admin') === 'true';
    const uploadBtn = document.getElementById('adminUploadBtn');
    if (uploadBtn) {
      uploadBtn.style.display = isAdmin ? 'inline-block' : 'none';
    }
  };

  // Handle Admin Passcode Prompt
  window.promptAdminAccess = function() {
    const currentAdmin = localStorage.getItem('gobro_admin') === 'true';
    
    if (currentAdmin) {
      const logout = confirm("You are currently logged in as Admin. Do you want to logout and hide the blog upload section?");
      if (logout) {
        localStorage.removeItem('gobro_admin');
        const uploadBtn = document.getElementById('adminUploadBtn');
        if (uploadBtn) uploadBtn.style.display = 'none';
        const creator = document.getElementById('blogCreatorContainer');
        if (creator) creator.style.display = 'none';
        alert("Logged out successfully. Blog upload section is now hidden.");
      }
      return;
    }

    const passcode = prompt("Enter Admin Passcode to unlock blog upload section:");
    if (passcode === null) return;
    
    if (passcode === 'gobro2026') {
      localStorage.setItem('gobro_admin', 'true');
      const uploadBtn = document.getElementById('adminUploadBtn');
      if (uploadBtn) {
        uploadBtn.style.display = 'inline-block';
        uploadBtn.scrollIntoView({ behavior: 'smooth' });
      }
      alert("🎉 Access Granted! Blog upload section is now unlocked.");
    } else {
      alert("❌ Incorrect passcode. Access Denied.");
    }
  };

  // Initialize blogs rendering on page load
  renderLocalBlogs();
  checkAdminState();

});
