(function () {
  function initProductPage() {
    const modal = document.getElementById('productImageModal');
    if (!modal || modal.dataset.ready === '1') return;
    modal.dataset.ready = '1';
    const modalImg = modal.querySelector('img');
    const close = modal.querySelector('.product-image-modal__close');

    document.querySelectorAll('[data-gallery-src]').forEach(function (button) {
      button.addEventListener('click', function () {
        modalImg.src = button.getAttribute('data-gallery-src');
        modalImg.alt = button.querySelector('img')?.alt || '제품 이미지';
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    function hideModal() {
      modal.hidden = true;
      modalImg.src = '';
      document.body.style.overflow = '';
    }
    close.addEventListener('click', hideModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) hideModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) hideModal(); });

    const links = Array.from(document.querySelectorAll('.product-anchor-nav a'));
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        links.forEach(function (item) { item.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    });
  }
  document.addEventListener('DOMContentLoaded', initProductPage);
  document.addEventListener('components:loaded', initProductPage);
})();
