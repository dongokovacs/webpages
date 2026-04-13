const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  observer.observe(item);

// Highlight today's hours row (0 = Vasárnap, 1 = Hétfő, …)
const todayDay = new Date().getDay();
document.querySelectorAll('.hours-list li[data-days]').forEach((li) => {
  const days = li.dataset.days.split(',').map(Number);
  if (days.includes(todayDay)) {
    li.classList.add('hours-today');
  }
});
});
