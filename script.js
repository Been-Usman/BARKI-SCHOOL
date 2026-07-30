(function() {
  // ===== SPLASH SCREEN =====
  const splash = document.getElementById('splashScreen');
  setTimeout(() => {
    splash.classList.add('hidden');
  }, 3000);

  // ===== FORM MODAL =====
  const overlay = document.getElementById('applyFormOverlay');
  const closeBtn = document.getElementById('closeFormBtn');
  const form = document.getElementById('applyForm');

  function openForm(department) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (department) {
      const select = document.getElementById('departmentSelect');
      select.value = department;
      updateSubjectInput(department);
    }
  }

  function closeForm() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.apply-btn-big, .apply-btn-small').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const dept = this.dataset.department || null;
      openForm(dept);
    });
  });

  closeBtn.addEventListener('click', closeForm);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeForm();
  });

  // ===== SUBJECT INPUT AUTO-UPDATE =====
  const deptSelect = document.getElementById('departmentSelect');
  const subjectInput = document.getElementById('subjectInput');

  function updateSubjectInput(dept) {
    if (dept === 'western') {
      subjectInput.value = 'Subject: English (or choose from list)';
      subjectInput.placeholder = 'English, Maths, etc.';
    } else if (dept === 'islamic') {
      subjectInput.value = 'Subject: Arabic (or choose from list)';
      subjectInput.placeholder = 'Arabic, Khaddu, etc.';
    } else {
      subjectInput.value = '';
      subjectInput.placeholder = 'Zaɓi bangaren farko';
    }
  }

  deptSelect.addEventListener('change', function() {
    updateSubjectInput(this.value);
  });

  // ===== FORM SUBMIT -> WHATSAPP =====
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value || 'Baba';
    const phone = document.getElementById('phoneNumber').value || '08168886357';
    const email = document.getElementById('emailInput').value || 'No email';
    const dept = deptSelect.value || 'Not selected';
    const subject = subjectInput.value || 'Not specified';
    const note = document.getElementById('noteText').value || 'No note';

    const message =
      `Apply Now - Hadiqatus Sibyan%0A%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A` +
      `Email: ${email}%0A` +
      `Department: ${dept}%0A` +
      `Subject: ${subject}%0A` +
      `Note: ${note}`;

    const url = `https://wa.me/2348168886357?text=${message}`;
    window.open(url, '_blank');
    closeForm();
    form.reset();
    subjectInput.value = '';
    subjectInput.placeholder = 'Zaɓi bangaren farko';
  });

  // ===== SCROLL ANIMATION =====
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__fadeInUp');
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.style.opacity = '0.6';
    observer.observe(section);
  });

})();