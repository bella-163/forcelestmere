const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('is-open');
  });
}

document.querySelectorAll('.copy-ip').forEach((button) => {
  button.addEventListener('click', async () => {
    const ip = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(ip);
      const originalText = button.textContent;
      button.textContent = '已複製 IP！';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    } catch (error) {
      button.textContent = ip;
    }
  });
});
