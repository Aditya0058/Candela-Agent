const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('toggleBtn');
const closeBtn = document.getElementById('closeBtn');

// Open sidebar
toggleBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});

// Close sidebar (X button)
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});

// Close sidebar (clicking outside)
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});