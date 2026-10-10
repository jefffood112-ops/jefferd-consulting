document.addEventListener('DOMContentLoaded', function () {
  var ham = document.getElementById('ham');
  var mob = document.getElementById('mob-menu');
  if (ham && mob) {
    var openMenu = function () {
      document.body.classList.add('nav-open');
      mob.classList.add('open');
      ham.setAttribute('aria-expanded', 'true');
      ham.setAttribute('aria-label', '關閉選單');
    };
    var closeMenu = function (options) {
      var returnFocus = options && options.returnFocus;
      document.body.classList.remove('nav-open');
      mob.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      ham.setAttribute('aria-label', '開啟選單');
      if (returnFocus) ham.focus();
    };

    ham.addEventListener('click', function () {
      if (mob.classList.contains('open')) closeMenu();
      else openMenu();
    });
    Array.prototype.forEach.call(mob.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () { closeMenu(); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mob.classList.contains('open')) closeMenu({ returnFocus: true });
    });
  }

  var revealElements = document.querySelectorAll('.reveal');

  // Progressive enhancement: older browsers that do not support
  // IntersectionObserver keep content visible instead of leaving it transparent.
  if (!('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .01 });

  Array.prototype.forEach.call(revealElements, function (element) {
    element.classList.add('reveal-ready');
    io.observe(element);
  });
});
