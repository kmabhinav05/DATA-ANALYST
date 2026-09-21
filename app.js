/**
 * Clean & Professional Data Analyst Portfolio Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    theme: 'dark'
  };

  initNavbar();
  initTheme();
  initHeroStats();
  renderCaseStudies();
  renderSkills();
  renderExperience();
  renderCertifications();
  initModals();
  initContactForm();

  /* ------------------------------------------
     1. Navbar & Scroll Highlight
     ------------------------------------------ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.style.borderBottomColor = 'var(--border-color)';
      }
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
        
        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        }
      });
    });
  }

  /* ------------------------------------------
     2. Theme Switcher
     ------------------------------------------ */
  function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.body.classList.toggle('light-theme', state.theme === 'light');
      themeBtn.innerHTML = state.theme === 'dark' 
        ? '<i class="fa-solid fa-moon"></i>' 
        : '<i class="fa-solid fa-sun"></i>';
    });
  }

  /* ------------------------------------------
     3. Hero Counter Stats
     ------------------------------------------ */
  function initHeroStats() {
    const statCards = document.querySelectorAll('.stat-number');
    statCards.forEach(card => {
      const targetText = card.innerText;
      const numericVal = parseFloat(targetText.replace(/[^0-9.]/g, ''));
      if (isNaN(numericVal)) return;

      let count = 0;
      const speed = numericVal / 30;
      const interval = setInterval(() => {
        count += speed;
        if (count >= numericVal) {
          card.innerText = targetText;
          clearInterval(interval);
        } else {
          const prefix = targetText.includes('$') ? '$' : '';
          const suffix = targetText.includes('%') ? '%' : targetText.includes('+') ? '+' : '';
          card.innerText = `${prefix}${count.toFixed(1)}${suffix}`;
        }
      }, 30);
    });
  }

  /* ------------------------------------------
     4. Render Case Studies Grid
     ------------------------------------------ */
  function renderCaseStudies() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.caseStudies.map(project => `
      <div class="project-card">
        <div class="project-category">${project.category}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="project-tools">
          ${project.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
        </div>
        <button class="btn btn-secondary btn-sm open-case-modal-btn" data-id="${project.id}">
          Read Full Case Study <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `).join('');

    document.querySelectorAll('.open-case-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openCaseStudyModal(id);
      });
    });
  }

  function openCaseStudyModal(id) {
    const project = PORTFOLIO_DATA.caseStudies.find(p => p.id === id);
    if (!project) return;

    const modalOverlay = document.getElementById('caseStudyModal');
    const modalBody = document.getElementById('caseStudyModalBody');
    if (!modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
      <div class="project-category" style="margin-bottom: 6px;">${project.category}</div>
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 12px; color: var(--text-primary);">${project.title}</h2>
      <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
        ${project.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; margin-bottom: 6px;">Business Context</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${project.problem}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; margin-bottom: 6px;">Analytical Approach & Methodology</h4>
        <ul style="padding-left: 18px; color: var(--text-secondary); font-size: 0.9rem;">
          ${project.methodology.map(m => `<li style="margin-bottom: 4px;">${m}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; margin-bottom: 6px;">Key SQL / Code Snippet</h4>
        <pre style="background: rgba(0,0,0,0.25); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); overflow-x: auto; color: var(--accent-blue); font-size: 0.82rem;"><code>${escapeHtml(project.codeSnippet)}</code></pre>
      </div>

      <div>
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; margin-bottom: 10px;">Quantified Results & Impact</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          ${project.impact.map(i => `
            <div style="background: var(--bg-card); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center;">
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">${i.value}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">${i.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
  }

  /* ------------------------------------------
     5. Render Skills Matrix
     ------------------------------------------ */
  function renderSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.skills.map(skill => `
      <div class="skill-card">
        <div class="skill-header">
          <div class="skill-name">${skill.name}</div>
          <span class="skill-level">${skill.level}</span>
        </div>
        <div class="skill-desc">${skill.desc}</div>
      </div>
    `).join('');
  }

  /* ------------------------------------------
     6. Render Experience & Certifications
     ------------------------------------------ */
  function renderExperience() {
    const container = document.getElementById('experienceTimeline');
    if (!container) return;

    let html = PORTFOLIO_DATA.experience.map(exp => `
      <div class="timeline-card">
        <div class="timeline-period">${exp.period} • ${exp.location}</div>
        <div class="timeline-role">${exp.role}</div>
        <div class="timeline-company">${exp.company}</div>
        <ul class="timeline-highlights">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    if (PORTFOLIO_DATA.education && PORTFOLIO_DATA.education.length > 0) {
      html += `<h4 style="font-size: 1.1rem; font-weight: 700; margin: 24px 0 14px; color: var(--text-primary);"><i class="fa-solid fa-graduation-cap" style="color: var(--accent-blue);"></i> Education</h4>`;
      html += PORTFOLIO_DATA.education.map(ed => `
        <div class="timeline-card">
          <div class="timeline-period">${ed.period} • ${ed.location}</div>
          <div class="timeline-role">${ed.degree}</div>
          <div class="timeline-company" style="color: var(--accent-blue); font-weight: 600; margin-bottom: 0;">${ed.institution}</div>
        </div>
      `).join('');
    }

    container.innerHTML = html;
  }

  function renderCertifications() {
    const container = document.getElementById('certsGrid');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.certifications.map(cert => `
      <div class="cert-card">
        <div class="cert-icon"><i class="fa-solid fa-certificate"></i></div>
        <div>
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer} • ${cert.year}</div>
        </div>
      </div>
    `).join('');
  }

  /* ------------------------------------------
     7. Modals & Resume Preview
     ------------------------------------------ */
  function initModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close-btn');

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modals.forEach(m => m.classList.remove('active'));
      });
    });

    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });

    const viewResumeBtn = document.getElementById('viewResumeBtn');
    if (viewResumeBtn) {
      viewResumeBtn.addEventListener('click', () => {
        openResumeModal();
      });
    }
  }

  function openResumeModal() {
    const modalOverlay = document.getElementById('resumeModal');
    const modalBody = document.getElementById('resumeModalBody');
    if (!modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
        <div>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); letter-spacing: 0.5px;">${PORTFOLIO_DATA.profile.name}</h2>
          <div style="color: var(--accent-blue); font-weight: 700; font-size: 0.95rem; text-transform: uppercase; margin-top: 2px;">${PORTFOLIO_DATA.profile.title}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 6px; display: flex; flex-wrap: wrap; gap: 14px;">
            <span><i class="fa-solid fa-envelope"></i> ${PORTFOLIO_DATA.profile.email}</span>
            <span><i class="fa-solid fa-phone"></i> ${PORTFOLIO_DATA.profile.phone}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${PORTFOLIO_DATA.profile.location}</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--accent-blue); margin-top: 4px;">
            <a href="${PORTFOLIO_DATA.profile.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i> linkedin.com/in/abhinav-k-m</a>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print CV
        </button>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px;">Summary</h4>
        <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6;">${PORTFOLIO_DATA.profile.bio}</p>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px;">Professional Experience</h4>
        ${PORTFOLIO_DATA.experience.map(e => `
          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.92rem;">
              <span>${e.role} — ${e.company}</span>
              <span style="color: var(--accent-blue); font-size: 0.82rem;">${e.period} | ${e.location}</span>
            </div>
            <ul style="padding-left: 16px; color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">
              ${e.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px;">Education</h4>
        ${PORTFOLIO_DATA.education.map(ed => `
          <div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.92rem;">
              <span>${ed.degree} — ${ed.institution}</span>
              <span style="color: var(--accent-blue); font-size: 0.82rem;">${ed.period} | ${ed.location}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px;">Skills</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 0.85rem;">
          ${PORTFOLIO_DATA.skills.map(s => `
            <div>
              <strong style="color: var(--text-primary);">${s.name}:</strong>
              <span style="color: var(--text-secondary); display: block; font-size: 0.8rem;">${s.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px;">Projects</h4>
        ${PORTFOLIO_DATA.caseStudies.map(p => `
          <div style="margin-bottom: 10px;">
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${p.title}</div>
            <p style="color: var(--text-secondary); font-size: 0.84rem; margin-top: 2px;">${p.summary}</p>
          </div>
        `).join('')}
      </div>

      <div>
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 8px;">Certificates</h4>
        <ul style="padding-left: 16px; color: var(--text-secondary); font-size: 0.85rem;">
          ${PORTFOLIO_DATA.certifications.map(c => `<li>${c.title} (${c.issuer})</li>`).join('')}
        </ul>
      </div>
    `;

    modalOverlay.classList.add('active');
  }

  /* ------------------------------------------
     8. Contact Form
     ------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || 'Portfolio Inquiry';
      const message = document.getElementById('contactMessage')?.value || '';

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening Mail...';
      submitBtn.disabled = true;

      // Construct mailto link
      const mailtoUrl = `mailto:kmabhinav25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Email Draft Opened';
        submitBtn.style.background = 'var(--accent-emerald)';
        showToast('Opening your mail client to send email to kmabhinav25@gmail.com');
        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 600);
    });
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
