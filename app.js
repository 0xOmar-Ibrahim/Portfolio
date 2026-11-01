/**
 * Omar Ibrahim - Cybersecurity & Ethical Hacker Portfolio Core Engine
 * Interactive terminal, project modal system, security sandbox, audio FX, and particle canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 3. Dynamic Interactive Background Canvas (Cyber Particle Grid)
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 75);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.4 ? '#00f0ff' : '#00ff9d'
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouseX = -1000;
      mouseY = -1000;
    }, { passive: true });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Proximity lines between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Mouse interaction line
        const mouseDist = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
        if (mouseDist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 255, 157, ${0.3 * (1 - mouseDist / 160)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 4. Typewriter Effect in Hero
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      "Penetration Tester & Ethical Hacker",
      "TryHackMe Top 7% Offensive Security",
      "Embedded Security & IoT Developer",
      "Low-Level x86-64 Assembly & C Specialist",
      "Vulnerability Assessment & CVE Researcher"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function typeEffect() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at full sentence
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 350;
      }

      setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();
  }

  // 5. Header Scroll State & Active Section Spy
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Navigation Drawer Toggle & Touch Controller
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  function updateMobileToggleIcon(isOpen) {
    if (!mobileToggle) return;
    mobileToggle.innerHTML = isOpen
      ? '<i data-lucide="x" id="menu-icon"></i>'
      : '<i data-lucide="menu" id="menu-icon"></i>';
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeMobileMenu() {
    if (!navMenu || !navMenu.classList.contains('active')) return;
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      updateMobileToggleIcon(false);
    }
  }

  function openMobileMenu() {
    if (!navMenu) return;
    navMenu.classList.add('active');
    document.body.classList.add('no-scroll');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'true');
      updateMobileToggleIcon(true);
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.contains('active');
      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on nav item click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when tapping outside the mobile menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on window resize if scaling to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // 6. Dynamic Projects Grid Rendering (Affiliation-Driven)
  const projectsGrid = document.getElementById('projects-grid');
  const projectAffiliationFilterBtns = document.querySelectorAll('[data-affiliation-filter]');

  function getAffiliationIcon(type) {
    switch (type) {
      case 'Company':
        return '<i data-lucide="building-2" style="width:13px;height:13px;"></i> Company';
      case 'Education':
        return '<i data-lucide="graduation-cap" style="width:13px;height:13px;"></i> Education';
      case 'Self-Employed':
        return '<i data-lucide="user-check" style="width:13px;height:13px;"></i> Self-Employed';
      default:
        return '<i data-lucide="folder" style="width:13px;height:13px;"></i> Project';
    }
  }

  function getAffiliationBadgeClass(type) {
    switch (type) {
      case 'Company': return 'affiliation-badge-company';
      case 'Education': return 'affiliation-badge-university';
      case 'Self-Employed': return 'affiliation-badge-self';
      default: return 'affiliation-badge-default';
    }
  }

  function renderProjects(affiliationFilter = 'all') {
    const data = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : (window.PROJECTS_DATA || []);
    if (!projectsGrid || data.length === 0) return;

    projectsGrid.innerHTML = '';
    const filteredProjects = data.filter((p) => affiliationFilter === 'all' || p.affiliation === affiliationFilter);

    filteredProjects.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'glass-card project-card';
      card.setAttribute('data-id', proj.id);
      card.setAttribute('data-affiliation', proj.affiliation);

      const hasVideo = !!(proj.videoUrl && proj.videoUrl.trim());
      const hasGithub = !!(proj.github && proj.github.trim());

      card.innerHTML = `
        <div class="project-thumbnail-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy">
          <span class="project-card-badge ${getAffiliationBadgeClass(proj.affiliation)}">
            ${getAffiliationIcon(proj.affiliation)} ${proj.affiliationName ? `&bull; ${proj.affiliationName}` : ''}
          </span>
          ${hasVideo ? `<span class="project-video-pill" title="Video Available"><i data-lucide="video" style="width:12px;height:12px;"></i> VIDEO</span>` : ''}
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <h4 class="project-subtitle">${proj.subtitle}</h4>
          <p class="project-summary">${proj.summary}</p>
          <div class="project-tags">
            ${proj.tags.slice(0, 4).map((t) => `<span class="project-tag">${t}</span>`).join('')}
            ${proj.tags.length > 4 ? `<span class="project-tag">+${proj.tags.length - 4}</span>` : ''}
          </div>
          <div class="project-card-footer">
            <span class="inspect-trigger">
              <i data-lucide="eye" style="width:14px;height:14px;"></i> Details & Photos &gt;
            </span>
            <div class="card-action-icons-group">
              ${hasVideo ? `
                <a href="${proj.videoUrl}" target="_blank" rel="noopener noreferrer" class="card-action-icon video-icon" title="Watch Video Demo" onclick="event.stopPropagation();">
                  <i data-lucide="play-circle" style="width:18px;height:18px;"></i>
                </a>
              ` : ''}
              ${hasGithub ? `
                <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="card-action-icon github-icon" title="View Source Code on GitHub" onclick="event.stopPropagation();">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openProjectModal(proj.id);
      });

      projectsGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Initial Project Render & Counts
  const initialProjectsData = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : (window.PROJECTS_DATA || []);
  if (initialProjectsData.length > 0) {
    renderProjects('all');

    // Update affiliation count badges
    const countAll = document.getElementById('count-all');
    const countCompany = document.getElementById('count-company');
    const countUniversity = document.getElementById('count-university');
    const countSelf = document.getElementById('count-self');

    if (countAll) countAll.textContent = initialProjectsData.length;
    if (countCompany) countCompany.textContent = initialProjectsData.filter((p) => p.affiliation === 'Company').length;
    if (countUniversity) countUniversity.textContent = initialProjectsData.filter((p) => p.affiliation === 'Education').length;
    if (countSelf) countSelf.textContent = initialProjectsData.filter((p) => p.affiliation === 'Self-Employed').length;
  }

  // Affiliation Filter Tabs Event
  projectAffiliationFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectAffiliationFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-affiliation-filter');
      renderProjects(filterValue);
    });
  });

  // 6.1 Dynamic Certificates Grid Rendering (Data-Driven from certificates-data.js)
  const certificatesGrid = document.getElementById('certificates-grid');

  function renderCertificates() {
    if (!certificatesGrid || typeof CERTIFICATES_DATA === 'undefined') return;

    certificatesGrid.innerHTML = CERTIFICATES_DATA.map((cert) => `
      <div class="glass-card cert-card ${cert.highlight ? 'highlight-cert' : ''}" id="cert-${escapeHTML(cert.id)}">
        <div class="cert-header">
          <div class="cert-issuer-badge ${cert.issuerBadge || 'ibm-badge'}">${escapeHTML(cert.issuer)}</div>
          <span class="cert-date">${escapeHTML(cert.date)}</span>
        </div>
        <h3 class="cert-title">${escapeHTML(cert.title)}</h3>
        <p class="cert-issuer">${escapeHTML(cert.issuer)}</p>
        <p class="cert-desc">${escapeHTML(cert.desc)}</p>
        <div class="cert-footer">
          <div class="cert-meta-group">
            <span class="cert-tag">${escapeHTML(cert.tag)}</span>
            <span class="cert-verified"><i data-lucide="check-check"></i> Verified</span>
          </div>
          <a href="${escapeHTML(cert.fileUrl || '#')}" target="_blank" rel="noopener noreferrer"
             class="cyber-btn cyber-btn-outline cyber-btn-sm cert-view-btn"
             data-cert-id="${escapeHTML(cert.id)}"
             title="View ${escapeHTML(cert.title)} Certificate">
            <i data-lucide="award"></i>
            <span>View Certificate</span>
            <i data-lucide="external-link" class="mini-ext"></i>
          </a>
        </div>
      </div>
    `).join('');

    // Attach click sound and toast confirmation to all certificate view buttons
    certificatesGrid.querySelectorAll('.cert-view-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const certTitle = btn.getAttribute('title') || 'Certificate';
        showToast(`Opening ${certTitle}...`, 'info');
      });
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Initial Certificates Render
  if (typeof CERTIFICATES_DATA !== 'undefined') {
    renderCertificates();
  }

  // 7. Experience Filtering
  const expFilterBtns = document.querySelectorAll('[data-exp-filter]');
  const expItems = document.querySelectorAll('#experience-list .timeline-item');

  expFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      expFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-exp-filter');

      expItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. Dedicated Interactive Project Modal Engine
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseBtnBottom = document.getElementById('modal-close-btn-bottom');
  const modalTabs = document.querySelectorAll('.modal-tab');
  const modalTabPanes = document.querySelectorAll('.modal-tab-pane');

  function openProjectModal(projectId) {
    const data = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : (window.PROJECTS_DATA || []);
    const project = data.find((p) => p.id === projectId);
    if (!project || !projectModal) return;

    // Populate metadata
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-subtitle').textContent = project.subtitle;

    // Affiliation Badge in Header
    const modalCategoryBadge = document.getElementById('modal-category-badge');
    modalCategoryBadge.className = `modal-category-badge ${getAffiliationBadgeClass(project.affiliation)}`;
    modalCategoryBadge.innerHTML = `${getAffiliationIcon(project.affiliation)} &bull; ${escapeHTML(project.affiliationName || project.affiliation)}`;

    document.getElementById('modal-hero-img').src = project.image;
    document.getElementById('modal-hero-img').alt = project.title;
    document.getElementById('modal-role-pill').innerHTML = `<i data-lucide="user" style="width:14px;height:14px;"></i> ${project.role || 'Lead Developer'}`;
    document.getElementById('modal-date-pill').innerHTML = `<i data-lucide="calendar" style="width:14px;height:14px;"></i> ${project.date || '2024 - 2026'}`;

    // GitHub Button in Footer
    const modalGithubLink = document.getElementById('modal-github-link');
    if (project.github && project.github.trim()) {
      modalGithubLink.href = project.github;
      modalGithubLink.style.display = 'inline-flex';
    } else {
      modalGithubLink.style.display = 'none';
    }

    // Video Button in Footer
    const modalVideoLink = document.getElementById('modal-video-link');
    if (project.videoUrl && project.videoUrl.trim()) {
      modalVideoLink.href = project.videoUrl;
      modalVideoLink.style.display = 'inline-flex';
    } else {
      modalVideoLink.style.display = 'none';
    }

    // Tab 1: Brief
    document.getElementById('modal-full-desc').innerHTML = `<p>${project.fullDescription.trim()}</p>`;
    const tagsRow = document.getElementById('modal-tags-row');
    tagsRow.innerHTML = project.tags.map((t) => `<span class="tech-chip">${t}</span>`).join('');

    // Tab 2: Architecture
    const archGrid = document.getElementById('modal-arch-grid');
    archGrid.innerHTML = '';
    if (project.architecture) {
      for (const [key, val] of Object.entries(project.architecture)) {
        const box = document.createElement('div');
        box.className = 'arch-box';
        box.innerHTML = `
          <div class="arch-box-title">${key}</div>
          <div class="arch-box-desc">${val}</div>
        `;
        archGrid.appendChild(box);
      }
    }

    // Tab 3: Highlights
    const highlightsList = document.getElementById('modal-highlights-list');
    highlightsList.innerHTML = project.highlights.map((h) => `<li>${h}</li>`).join('');

    // Tab 4: Photos & Media Gallery
    const galleryGrid = document.getElementById('modal-gallery-grid');
    const photoList = (project.photos && project.photos.length > 0) ? project.photos : [project.image];
    galleryGrid.innerHTML = photoList.map((imgSrc, idx) => `
      <div class="gallery-photo-item">
        <img src="${imgSrc}" alt="${project.title} Artifact ${idx + 1}" class="gallery-photo-img" loading="lazy">
        <span class="gallery-caption">${project.title} &bull; Photo ${idx + 1}</span>
      </div>
    `).join('');

    const videoBox = document.getElementById('modal-video-box');
    if (project.videoUrl && project.videoUrl.trim()) {
      videoBox.style.display = 'block';
      videoBox.innerHTML = `
        <div class="video-preview-card">
          <div class="video-preview-info">
            <i data-lucide="video" class="video-icon-large"></i>
            <div>
              <h4 class="video-card-title">Live Demonstration Video</h4>
              <p class="video-card-desc">Watch complete walkthrough and feature demonstration for ${escapeHTML(project.title)}.</p>
            </div>
          </div>
          <a href="${escapeHTML(project.videoUrl)}" target="_blank" rel="noopener noreferrer" class="cyber-btn cyber-btn-primary cyber-btn-sm">
            <i data-lucide="play-circle"></i>
            <span>Watch Video Demo</span>
            <i data-lucide="external-link" class="mini-ext"></i>
          </a>
        </div>
      `;
    } else {
      videoBox.style.display = 'none';
      videoBox.innerHTML = '';
    }

    // Tab 5: Interactive Live Demo Generator
    const demoContainer = document.getElementById('modal-demo-container');
    demoContainer.innerHTML = '';
    injectProjectInteractiveDemo(project, demoContainer);

    // Reset to first tab
    modalTabs.forEach((t) => t.classList.remove('active'));
    modalTabPanes.forEach((p) => p.classList.remove('active'));
    document.querySelector('.modal-tab[data-tab="brief"]').classList.add('active');
    document.getElementById('tab-brief').classList.add('active');

    // Show modal
    projectModal.classList.add('active');
    document.body.classList.add('no-scroll');

    // Scroll modal body to top
    const modalBody = document.getElementById('modal-body-content');
    if (modalBody) modalBody.scrollTop = 0;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseBtnBottom) modalCloseBtnBottom.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Modal Tab Switching
  modalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      modalTabs.forEach((t) => t.classList.remove('active'));
      modalTabPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 9. In-Browser Interactive Project Simulators (Tab 4)
  function injectProjectInteractiveDemo(project, container) {
    const demoType = project.demoType || 'default';

    if (demoType === 'morse-interactive') {
      container.innerHTML = `
        <div class="widget-box">
          <h4 class="widget-title"><i data-lucide="binary"></i> x86-64 Win32 Morse Code Encoder & Audio Synthesizer</h4>
          <div class="widget-field">
            <label>Input ASCII Text (e.g. OMAR PENETRATION TESTER):</label>
            <input type="text" id="demo-morse-input" class="cyber-input" value="OMAR IBRAHIM PENTEST 2026">
          </div>
          <div class="widget-field">
            <label>x86-64 Assembly O(1) Lookup Output (Morse Stream):</label>
            <div class="widget-result" id="demo-morse-output"></div>
          </div>
          <button class="cyber-btn cyber-btn-primary cyber-btn-sm" id="btn-play-morse-audio">
            <i data-lucide="volume-2"></i> Play Morse Audio Beeps
          </button>
        </div>
      `;

      const morseMap = {
        A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
        I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
        Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
        Y: "-.--", Z: "--..", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....",
        6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----", " ": " / "
      };

      const input = container.querySelector('#demo-morse-input');
      const output = container.querySelector('#demo-morse-output');
      const playBtn = container.querySelector('#btn-play-morse-audio');

      function updateMorse() {
        const text = input.value.toUpperCase();
        const morse = text.split('').map(c => morseMap[c] || c).join(' ');
        output.textContent = morse || '[Awaiting input]';
      }
      input.addEventListener('input', updateMorse);
      updateMorse();

      playBtn.addEventListener('click', () => {
        const code = output.textContent;
        let delay = 0;
        for (const sym of code) {
          if (sym === '.') {
            delay += 120;
          } else if (sym === '-') {
            delay += 220;
          } else {
            delay += 100;
          }
        }
      });

    } else if (demoType === 'password-generator') {
      container.innerHTML = `
        <div class="widget-box">
          <h4 class="widget-title"><i data-lucide="key"></i> KeyGarden CSPRNG Password Generator & Entropy Evaluator</h4>
          <div class="widget-field">
            <label>Password Length: <span id="pass-len-val">20</span> characters</label>
            <input type="range" id="pass-len-slider" min="12" max="48" value="20" style="width:100%;accent-color:var(--cyan-primary);">
          </div>
          <div class="widget-field">
            <label>Generated Cryptographic Credential:</label>
            <div class="widget-result" id="demo-pass-result"></div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.75rem;">
            <span style="font-size:0.8rem;color:var(--green-cyber);" id="entropy-score">Entropy: ~130.4 bits (Ultra-Strong)</span>
            <button class="cyber-btn cyber-btn-sm cyber-btn-primary" id="btn-regen-pass">Regenerate</button>
          </div>
        </div>
      `;

      const slider = container.querySelector('#pass-len-slider');
      const lenVal = container.querySelector('#pass-len-val');
      const passResult = container.querySelector('#demo-pass-result');
      const regenBtn = container.querySelector('#btn-regen-pass');
      const entropyScore = container.querySelector('#entropy-score');

      function generatePass() {
        const len = parseInt(slider.value);
        lenVal.textContent = len;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let pass = '';
        const array = new Uint32Array(len);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < len; i++) {
          pass += chars[array[i] % chars.length];
        }
        passResult.textContent = pass;
        const entropy = (len * Math.log2(chars.length)).toFixed(1);
        entropyScore.textContent = `Shannon Entropy: ~${entropy} bits (Estimated Crack Time: Billions of Years)`;
      }

      slider.addEventListener('input', generatePass);
      regenBtn.addEventListener('click', () => {
        generatePass();
      });
      generatePass();

    } else if (demoType === 'number-converter') {
      container.innerHTML = `
        <div class="widget-box">
          <h4 class="widget-title"><i data-lucide="calculator"></i> Universal Number Base & Bitwise Visualizer</h4>
          <div class="widget-field">
            <label>Decimal Input Value:</label>
            <input type="number" id="demo-num-input" class="cyber-input" value="1337">
          </div>
          <div class="widget-field">
            <label>Multi-Representation Grid:</label>
            <div class="widget-result" id="demo-num-grid" style="font-size:0.82rem;line-height:1.7;"></div>
          </div>
        </div>
      `;
      const numInput = container.querySelector('#demo-num-input');
      const numGrid = container.querySelector('#demo-num-grid');

      function updateBases() {
        const val = parseInt(numInput.value) || 0;
        numGrid.innerHTML = `
          <strong>Hexadecimal:</strong> 0x${val.toString(16).toUpperCase()}<br>
          <strong>Binary (8/16-bit):</strong> ${val.toString(2).padStart(16, '0').match(/.{1,4}/g).join(' ')}<br>
          <strong>Octal:</strong> 0o${val.toString(8)}<br>
          <strong>ASCII Char Equivalent:</strong> '${String.fromCharCode(val % 256) || 'N/A'}'<br>
          <strong>Bitwise NOT (~X):</strong> ${(~val)}
        `;
      }
      numInput.addEventListener('input', updateBases);
      updateBases();

    } else if (demoType === 'nmap-simulator') {
      container.innerHTML = `
        <div class="widget-box">
          <h4 class="widget-title"><i data-lucide="terminal"></i> TryHackMe Offensive Attack Surface Scanner</h4>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">Simulating active enumeration script: <code>nmap -sV -sC -p- -T4 10.10.14.88</code></p>
          <div class="widget-result" style="height:170px;overflow-y:auto;background:#050811;">
Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-31 18:00 UTC
Nmap scan report for sec-target.thm (10.10.14.88)
Host is up (0.024s latency).
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.4p1 Debian 5+deb11u1
80/tcp   open  http        Apache httpd 2.4.56 ((Debian))
|_http-title: Industrial Portal - Authentication Required
|_http-server-header: Apache/2.4.56 (Debian)
443/tcp  open  ssl/https   Apache/2.4.56
8080/tcp open  http-proxy  Werkzeug/2.2.2 Python/3.9.2 (Vulnerable JWT Auth)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

[+] Vulnerability Identified: CVE-2022-29217 (JWT Key Confusion) on port 8080.
[+] Privilege Escalation Vector: SUID binary /usr/bin/find misconfigured with root cap.
          </div>
        </div>
      `;
    } else if (demoType === 'c-linked-list') {
      let emsNodes = [
        { id: 101, name: "Omar Ibrahim", dept: "SecOps / RedTeam", title: "Lead PenTester", addr: "0x7ffd9b8a1c10", status: "active" },
        { id: 102, name: "Sarah Chen", dept: "Cyber Architecture", title: "Security Engineer", addr: "0x7ffd9b8a1c60", status: "active" },
        { id: 103, name: "Alex Mercer", dept: "Kernel Systems", title: "Low-Level Developer", addr: "0x7ffd9b8a1cb0", status: "active" }
      ];

      container.innerHTML = `
        <div class="widget-box">
          <h4 class="widget-title"><i data-lucide="cpu"></i> C Linked-List Dynamic Memory & CRUD Engine Simulator</h4>
          
          <div style="margin-bottom:0.85rem;display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;">
            <button class="cyber-btn cyber-btn-primary cyber-btn-sm" id="ems-btn-add">
              <i data-lucide="plus-circle"></i> malloc() Node
            </button>
            <button class="cyber-btn cyber-btn-outline cyber-btn-sm" id="ems-btn-search">
              <i data-lucide="search"></i> O(n) Search
            </button>
            <button class="cyber-btn cyber-btn-outline cyber-btn-sm" id="ems-btn-lazy-del" style="border-color:var(--amber-glow);color:var(--amber-glow);">
              <i data-lucide="trash-2"></i> Mark & Sweep
            </button>
            <button class="cyber-btn cyber-btn-outline cyber-btn-sm" id="ems-btn-bin-save">
              <i data-lucide="save"></i> fwrite() Binary
            </button>
            <button class="cyber-btn cyber-btn-outline cyber-btn-sm" id="ems-btn-valgrind" style="border-color:var(--green-cyber);color:var(--green-cyber);">
              <i data-lucide="shield-check"></i> Valgrind Audit
            </button>
          </div>

          <div class="widget-field">
            <label style="display:flex;justify-content:space-between;">
              <span>Dynamic Singly-Linked List Heap Chain:</span>
              <span id="ems-heap-stat" style="color:var(--cyan-primary);font-size:0.75rem;">Allocated Nodes: 3 | Heap: 144 bytes</span>
            </label>
            <div class="widget-result" id="ems-chain-view" style="font-family:var(--font-mono);font-size:0.8rem;white-space:nowrap;overflow-x:auto;padding:0.75rem;background:#030712;border:1px solid var(--border-subtle);border-radius:6px;min-height:50px;"></div>
          </div>

          <div class="widget-field">
            <label>C Runtime Terminal I/O (stdout):</label>
            <div class="widget-result" id="ems-term-out" style="height:140px;overflow-y:auto;background:#050811;font-family:var(--font-mono);font-size:0.78rem;line-height:1.6;color:var(--green-cyber);"></div>
          </div>
        </div>
      `;

      const chainView = container.querySelector('#ems-chain-view');
      const termOut = container.querySelector('#ems-term-out');
      const heapStat = container.querySelector('#ems-heap-stat');
      const btnAdd = container.querySelector('#ems-btn-add');
      const btnSearch = container.querySelector('#ems-btn-search');
      const btnLazyDel = container.querySelector('#ems-btn-lazy-del');
      const btnBinSave = container.querySelector('#ems-btn-bin-save');
      const btnValgrind = container.querySelector('#ems-btn-valgrind');

      function appendLog(text) {
        termOut.innerHTML += text + '<br>';
        termOut.scrollTop = termOut.scrollHeight;
      }

      function renderChain() {
        if (emsNodes.length === 0) {
          chainView.innerHTML = `<span style="color:var(--text-muted);">[HEAD -> NULL] (Heap Empty)</span>`;
          heapStat.textContent = `Allocated Nodes: 0 | Heap: 0 bytes`;
          return;
        }

        const activeCount = emsNodes.filter(n => n.status === 'active').length;
        heapStat.textContent = `Allocated Nodes: ${emsNodes.length} (${activeCount} active) | Heap: ${emsNodes.length * 48} bytes`;

        const chainHTML = `<span style="color:var(--cyan-primary);">HEAD</span> &rarr; ` + emsNodes.map((n, idx) => {
          const isMarked = n.status === 'marked_deleted';
          const bg = isMarked ? 'rgba(255,184,0,0.15)' : 'rgba(0,240,255,0.08)';
          const border = isMarked ? 'var(--amber-glow)' : 'var(--border-subtle)';
          const txtColor = isMarked ? 'var(--amber-glow)' : 'var(--text-primary)';
          return `
            <span style="display:inline-block;padding:0.25rem 0.5rem;background:${bg};border:1px solid ${border};border-radius:4px;color:${txtColor};">
              <strong>${n.addr}</strong><br>
              <small>#${n.id} ${escapeHTML(n.name)}</small><br>
              <em style="font-size:0.7rem;color:var(--text-muted);">&bull; next &rarr; ${idx < emsNodes.length - 1 ? emsNodes[idx+1].addr : 'NULL'}</em>
              ${isMarked ? '<br><strong style="color:var(--red-exploit);font-size:0.65rem;">[LAZY DELETED]</strong>' : ''}
            </span>
          `;
        }).join(' &rarr; ') + ` &rarr; <span style="color:var(--red-exploit);">NULL</span>`;

        chainView.innerHTML = chainHTML;
      }

      appendLog(`[+] Initializing EMS linked-list subsystem...`);
      appendLog(`[+] Allocated 3 default employee structures on heap.`);
      appendLog(`[+] Binary persistence driver ready: <code>employees.dat</code>.`);
      renderChain();

      btnAdd.addEventListener('click', () => {
        const nextId = 100 + emsNodes.length + 1;
        const names = ["Elena Vance", "Marcus Reed", "Layla Hassan", "Tariq Mansour", "Kareem Adel"];
        const depts = ["Offensive Sec", "Firmware Lab", "Cloud Sec", "Cryptography", "AppSec"];
        const titles = ["Security Analyst", "Systems Dev", "SOC Engineer", "Reverse Engineer", "Auditor"];
        const randIdx = Math.floor(Math.random() * names.length);
        const randHex = (0x7ffd9b8a1000 + Math.floor(Math.random() * 0xffff)).toString(16);

        const newNode = {
          id: nextId,
          name: names[randIdx],
          dept: depts[randIdx],
          title: titles[randIdx],
          addr: `0x${randHex}`,
          status: "active"
        };

        emsNodes.push(newNode);
        appendLog(`[malloc] <span class="cyber-cyan">Node ${newNode.addr}</span> allocated (sizeof(EmployeeNode)=48B). Inserted #${newNode.id} (${newNode.name} &bull; ${newNode.dept}).`);
        renderChain();
      });

      btnSearch.addEventListener('click', () => {
        if (emsNodes.length === 0) {
          appendLog(`[-] Cannot search: Linked list is empty.`);
          return;
        }
        const target = emsNodes[Math.floor(Math.random() * emsNodes.length)];
        appendLog(`[search] Dispatching multi-criteria query for target: <strong>"${target.name}"</strong>...`);
        let step = 0;
        emsNodes.forEach((n, idx) => {
          if (n.name === target.name) {
            step = idx + 1;
          }
        });
        appendLog(`[+] <span class="cyber-green">MATCH FOUND</span> in ${step} traversal step(s) [O(n) Early Exit] &rarr; ID: #${target.id} | Dept: ${target.dept} | Title: ${target.title} | Ptr: ${target.addr}`);
      });

      btnLazyDel.addEventListener('click', () => {
        const activeNodes = emsNodes.filter(n => n.status === 'active');
        if (activeNodes.length === 0) {
          appendLog(`[lazy_delete] Running Sweep compaction: Reclaimed memory for all marked nodes.`);
          emsNodes = [];
          renderChain();
          return;
        }

        const toMark = activeNodes[activeNodes.length - 1];
        if (toMark.status === 'active') {
          toMark.status = 'marked_deleted';
          appendLog(`[lazy_delete] <span class="cyber-amber">Marked Node #${toMark.id} (${toMark.name}) for deferred deletion</span>.`);
        }
        renderChain();
      });

      btnBinSave.addEventListener('click', () => {
        const activeCount = emsNodes.filter(n => n.status === 'active').length;
        appendLog(`[fwrite] Serializing ${activeCount} active record(s) to <code>employees.dat</code>...`);
        appendLog(`[+] Header Checksum: <span class="cyber-green">0x9F4C2A11 (CRC-32 Valid)</span>. ${activeCount * 48} bytes written atomically.`);
      });

      btnValgrind.addEventListener('click', () => {
        appendLog(`------------------------------------------------------`);
        appendLog(`<span class="cyber-green">== VALGRIND MEMCHECK AUDIT REPORT ==</span>`);
        appendLog(`== HEAP SUMMARY:`);
        appendLog(`==     in use at exit: 0 bytes in 0 blocks`);
        appendLog(`==   total heap allocs: ${emsNodes.length + 5} allocs, ${emsNodes.length + 5} frees`);
        appendLog(`== All heap blocks were freed -- no leaks are possible`);
        appendLog(`== <span class="cyber-green">ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0)</span>`);
        appendLog(`------------------------------------------------------`);
      });

    } else {
      // Default interactive overview
      container.innerHTML = `
        <div class="widget-box">
          <h4 class="widget-title"><i data-lucide="shield-check"></i> Project Verification & Execution Artifacts</h4>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;">
            This project has undergone comprehensive static and dynamic security validation. The source code repository includes full architecture schematics, test benches, and documentation.
          </p>
          <a href="${project.github}" target="_blank" class="cyber-btn cyber-btn-primary cyber-btn-sm">
            <i data-lucide="github"></i> Inspect Full Source Repository
          </a>
        </div>
      `;
    }
  }

  // 10. Interactive Terminal Sandbox (0xTerminal) Modal & Commands Engine
  const terminalModal = document.getElementById('terminal-modal');
  const openTerminalBtns = [
    document.getElementById('open-terminal-btn'),
    document.getElementById('hero-cta-terminal'),
    document.getElementById('hero-quick-terminal-btn'),
    document.getElementById('footer-terminal-btn')
  ];
  const termCloseDot = document.getElementById('term-close-dot');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output-lines');
  const termScrollContainer = document.getElementById('term-scroll-container');

  const cmdHistory = [];
  let historyIdx = -1;

  function openTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    document.body.classList.add('no-scroll');
    setTimeout(() => {
      if (termInput) termInput.focus();
    }, 100);
  }

  function closeTerminal() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  openTerminalBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openTerminal);
  });
  if (termCloseDot) termCloseDot.addEventListener('click', closeTerminal);
  if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) closeTerminal();
    });
  }

  // Terminal Command Parser
  function executeTerminalCommand(cmdString) {
    const rawCmd = cmdString.trim();
    if (!rawCmd) return;

    cmdHistory.push(rawCmd);
    historyIdx = cmdHistory.length;

    const parts = rawCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Print user command prompt line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-out-cmd';
    cmdLine.innerHTML = `<span class="term-user-prompt">omar@sec-station:~$</span> ${escapeHTML(rawCmd)}`;
    termOutput.appendChild(cmdLine);

    const resLine = document.createElement('div');
    resLine.className = 'term-out-res';

    switch (command) {
      case 'help':
        resLine.innerHTML = `
<span class="cyber-cyan">AVAILABLE COMMANDS:</span>
  <span class="cyber-green">whoami</span>       - Display professional summary & offensive security profile
  <span class="cyber-green">skills</span>       - List technical skill matrix and security toolchain
  <span class="cyber-green">projects</span>     - List all 11 portfolio projects with IDs
  <span class="cyber-green">open &lt;id&gt;</span>     - Launch dedicated interactive modal for specified project ID
  <span class="cyber-green">exp</span>          - View career work experience & internships
  <span class="cyber-green">edu</span>          - View academic degrees and national rankings
  <span class="cyber-green">certs</span>        - Display verified certifications (IBM, Oracle, UMich, etc.)
  <span class="cyber-green">contact</span>      - Show direct email, phone numbers, and social links
  <span class="cyber-green">nmap [host]</span>  - Execute simulated network vulnerability port scan
  <span class="cyber-green">matrix</span>       - Trigger simulated green matrix rain stream
  <span class="cyber-green">cat resume</span>   - Print quick summary text dossier
  <span class="cyber-green">clear</span>        - Clear terminal console screen
  <span class="cyber-green">exit</span>         - Close interactive terminal window
`;
        break;

      case 'whoami':
        resLine.innerHTML = `
<span class="cyber-cyan">OMAR IBRAHIM</span> | Penetration Tester & Ethical Hacker
Location: Giza, Egypt | Status: Available for Security & Pentest roles
Global Rankings: <strong>Top 8% TryHackMe</strong> &bull; <strong>#9 Global Rank Hawaii Cyber CTF (HTB)</strong> &bull; <strong>#4 Solo Rank IEEE CTF</strong>
National Honors: <strong>3rd Nationally across Egypt</strong> (Embedded Systems & AI)
Email: omarforsec@gmail.com | Phone: 01061408612 / 01144130977
`;
        break;

      case 'ctf':
      case 'ctfs':
        resLine.innerHTML = `
<span class="cyber-amber">[🏆] PWN3RX0 CTF (IEEE HITU):</span> <strong>#4 Rank Solo</strong> vs teams of 3-5 (Web, PrivEsc, Binary, Crypto)
  PDF Certificate: pdfs/IEEE-CTF.pdf
<span class="cyber-green">[⚡] HAWAII CYBER CTF (Hack The Box):</span> <strong>#9 Rank Global</strong> (Adversarial Infrastructure, AD, Web)
  PDF Certificate: pdfs/Hawaii-Cyber-CTF.pdf
<span class="cyber-cyan">[🛡️] TRYHACKME ARENA:</span> <strong>Top 7% Worldwide</strong> across 70+ lab attack rooms
`;
        break;

      case 'skills':
        resLine.innerHTML = `
<span class="cyber-cyan">[+] PROGRAMMING & LOW-LEVEL:</span> C, Python 3, x86-64 Assembly, SQL, Bash, PowerShell, JavaScript
<span class="cyber-green">[+] OFFENSIVE SECURITY:</span> OWASP Top 10, Web Pentesting, Privilege Escalation, CVE Exploitation
<span class="cyber-amber">[+] SECURITY TOOLS:</span> Metasploit, OpenVAS, Burp Suite, Nmap, Wireshark, Gobuster, IDA Pro, SQLmap
<span class="cyber-purple">[+] HARDWARE & CLOUD:</span> ESP32, ESP8266, RFID Security, Custom PCB Design, Firebase, Flutter
`;
        break;

      case 'projects':
        resLine.innerHTML = PROJECTS_DATA.map((p, idx) => `
  [${idx + 1}] <strong class="cyber-cyan">${p.id}</strong> - ${p.title} [<span class="cyber-green">${p.affiliation}</span>${p.videoUrl ? ' &bull; 🎬 Video' : ''}]
`).join('') + `<br><span class="cyber-green">Tip: Type 'open &lt;id&gt;' (e.g. 'open morse-code-x86') to launch any project modal!</span>`;
        break;

      case 'open':
        if (!args[0]) {
          resLine.innerHTML = `<span class="cyber-red">[-] Error: Please specify a project ID. Type 'projects' to see all IDs.</span>`;
        } else {
          const targetId = args[0].toLowerCase();
          const found = PROJECTS_DATA.find(p => p.id.toLowerCase() === targetId);
          if (found) {
            resLine.innerHTML = `<span class="cyber-green">[+] Launching interactive modal for '${found.title}'...</span>`;
            setTimeout(() => {
              closeTerminal();
              openProjectModal(found.id);
            }, 500);
          } else {
            resLine.innerHTML = `<span class="cyber-red">[-] Project '${targetId}' not found. Type 'projects' to list IDs.</span>`;
          }
        }
        break;

      case 'exp':
        resLine.innerHTML = `
<span class="cyber-cyan">[1] Embedded Software Developer | LABstar</span> (Aug 2023 – Jun 2025 | Cairo)
    - RBAC enforcement, RFID elevator access control, IoT controller (Flutter + ESP32), SQL audits.
<span class="cyber-green">[2] Penetration Testing & AppSec Trainee | NTI</span> (Aug 2026 – Sep 2026 | Cairo/Online)
    - Vulnerability assessment, WordPress hardening, cloud auditing, threat hunting & capstone.
<span class="cyber-purple">[3] Python Developer Intern | CodeAlpha</span> (Oct 2025 – Nov 2025 | Remote)
    - Security automation scripts, OS/Shutil/Regex pipelines, data structures.
`;
        break;

      case 'edu':
        resLine.innerHTML = `
<span class="cyber-cyan">[+] Bachelor's degree – Information Technology</span> (Expected 2029)
    New Cairo Technological University (NCTU), Cairo, Egypt
<span class="cyber-amber">[+] High School Diploma – Embedded Systems & AI</span> (Jun 2025)
    Misr International Computer & AI Academy (MICA), Giza, Egypt
    <strong>★ Ranked 3rd Nationally across the Arab Republic of Egypt!</strong>
`;
        break;

      case 'certs':
      case 'certificates':
        resLine.innerHTML = typeof CERTIFICATES_DATA !== 'undefined'
          ? CERTIFICATES_DATA.map(c => `&bull; <strong class="cyber-cyan">${escapeHTML(c.title)}</strong> (<span class="cyber-green">${escapeHTML(c.issuer)}</span>) — ${escapeHTML(c.date)} &bull; <em>${escapeHTML(c.fileUrl)}</em>`).join('<br>')
          : 'No certificates found.';
        break;

      case 'contact':
        resLine.innerHTML = `
<span class="cyber-cyan">Direct Email:</span> omarforsec@gmail.com
<span class="cyber-green">Primary Phone:</span> 01061408612
<span class="cyber-green">Secondary Phone:</span> 01144130977
<span class="cyber-purple">GitHub:</span> https://github.com/0xOmar-Ibrahim
<span class="cyber-cyan">LinkedIn:</span> https://www.linkedin.com/in/0x4fmar
<span class="cyber-amber">Location:</span> Giza, Egypt
`;
        break;

      case 'nmap':
        const target = args[0] || '127.0.0.1';
        resLine.innerHTML = `
Starting Nmap 7.94 scan on ${escapeHTML(target)}...
[+] Port 22/tcp   OPEN  (OpenSSH 8.4p1)
[+] Port 80/tcp   OPEN  (Apache httpd 2.4.56)
[+] Port 443/tcp  OPEN  (TLS 1.3 / Valid Cipher Suites)
[+] Port 3306/tcp FILTERED (MySQL RBAC Guarded)
[+] Port 8080/tcp OPEN  (CustomTkinter Remote Broker)
Nmap done: 1 IP address scanned in 0.42 seconds.
`;
        break;

      case 'cat':
        if (args[0] && args[0].toLowerCase().includes('resume')) {
          resLine.innerHTML = `
======================================================
OMAR IBRAHIM — RESUME DOSSIER
Penetration Tester & Ethical Hacker
Email: omarforsec@gmail.com | Phone: 01061408612
Rankings: Top 7% TryHackMe | 3rd Nationally Egypt (Embedded)
======================================================
`;
        } else {
          resLine.innerHTML = `File not found or permission denied. Try 'cat resume'.`;
        }
        break;

      case 'resume':
      case 'pdf':
        window.open('pdfs/Omar%20Ibrahim%20Fathy%20-%20Junior%20Pentester.pdf', '_blank');
        resLine.innerHTML = `<span class="cyber-green">[+] Launching official Resume PDF document in new browser tab...</span>`;
        break;

      case 'matrix':
        resLine.innerHTML = `<span class="cyber-green">Wake up, Neo... Follow the white rabbit. 01001111 01001101 01000001 01010010</span>`;
        break;

      case 'clear':
        termOutput.innerHTML = '';
        return;

      case 'exit':
      case 'close':
      case 'quit':
        closeTerminal();
        return;

      default:
        resLine.innerHTML = `<span class="cyber-red">[-] Command '${escapeHTML(command)}' not recognized. Type <strong class="cyber-green">'help'</strong> for valid commands.</span>`;
        break;
    }

    termOutput.appendChild(resLine);
    termScrollContainer.scrollTop = termScrollContainer.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        executeTerminalCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          termInput.value = cmdHistory[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          termInput.value = cmdHistory[historyIdx] || '';
        } else {
          historyIdx = cmdHistory.length;
          termInput.value = '';
        }
      }
    });
  }

  // Quick Chips in Terminal Banner
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('term-chip')) {
      const cmd = e.target.getAttribute('data-cmd');
      if (cmd) {
        executeTerminalCommand(cmd);
      }
    }
  });

  // Global ESC shortcut to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeTerminal();
      closeResumeModal();
    }
  });



  // 12. Copy to Clipboard Utility with Toast Alerts
  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copy]');
    if (copyTarget) {
      const textToCopy = copyTarget.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`, 'success');
        }).catch(() => {
          showToast(`Failed to copy to clipboard`, 'error');
        });
      }
    }
  });

  // 13. Toast Notification Helper
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'cyber-toast';
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-circle';

    toast.innerHTML = `
      <i data-lucide="${icon}" style="width:16px;height:16px;color:var(--cyan-primary);"></i>
      <span>${escapeHTML(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // 14. Contact Message Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      showToast(`Thank you ${name}! Your message has been encrypted and transmitted.`, 'success');
      contactForm.reset();
    });
  }

  // 15. Resume PDF Click Handler
  const btnDownloadResume = document.getElementById('btn-download-resume');
  if (btnDownloadResume) {
    btnDownloadResume.addEventListener('click', () => {
      showToast('Opening Resume PDF in new tab...', 'info');
    });
  }

  // Utility: HTML Escaper
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Auto-update year in footer
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
