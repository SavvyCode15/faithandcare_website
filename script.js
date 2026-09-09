// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    header.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hours dropdown — click toggle on mobile, hover handled by CSS on desktop
  var hoursWrap = document.getElementById('hours-drop');
  var hoursTrigger = hoursWrap && hoursWrap.querySelector('.hours-trigger');
  if (hoursWrap && hoursTrigger) {
    // Highlight today's row
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var today = days[new Date().getDay()];
    hoursWrap.querySelectorAll('.hours-panel td:first-child').forEach(function(td) {
      if (td.textContent.trim() === today) {
        td.parentElement.classList.add('today-row');
      }
    });
    // Click toggle for mobile
    hoursTrigger.addEventListener('click', function () {
      var isOpen = hoursWrap.classList.toggle('is-open');
      hoursTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!hoursWrap.contains(e.target)) {
        hoursWrap.classList.remove('is-open');
        hoursTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(function (o) {
        o.classList.remove('is-open');
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Contact form — opens WhatsApp with appointment details
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var condition = form.querySelector('#condition').value;
      var message = form.querySelector('#message').value.trim();
      var text = 'Hi, I would like to book an appointment at Faith & Care.\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Condition: ' + condition;
      if (message) text += '\nMessage: ' + message;
      window.open('https://wa.me/919582553238?text=' + encodeURIComponent(text), '_blank');
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  // Reviews auto-slider
  var track = document.getElementById('reviews-track');
  var dots = document.querySelectorAll('.reviews-dot');
  if (track && dots.length) {
    var current = 0;
    var total = dots.length;
    var timer;

    function goTo(idx) {
      current = idx;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('is-active', i === idx);
      });
    }

    function next() { goTo((current + 1) % total); }

    function startTimer() { timer = setInterval(next, 5000); }
    function resetTimer() { clearInterval(timer); startTimer(); }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goTo(i); resetTimer(); });
    });

    // Pause on hover
    track.addEventListener('mouseenter', function() { clearInterval(timer); });
    track.addEventListener('mouseleave', startTimer);

    startTimer();
  }
  var motionTargets = document.querySelectorAll('.service-card, .testi-card, .result-card, .process-step, .value-item, .service-detail, .info-row, .credential-card, .condition-tag, .conditions-cta, .clinic-photo, .hero-photo, .feature-media, .spotlight-media');
  motionTargets.forEach(function (element) { element.classList.add('animate-in'); });
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    motionTargets.forEach(function (element) { observer.observe(element); });
  } else {
    motionTargets.forEach(function (element) { element.classList.add('is-in-view'); });
  }
});
