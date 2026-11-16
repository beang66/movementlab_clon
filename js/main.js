(function () {
  let heroInitialized = false;
  let arrivalsInitialized = false;

  function initMain() {
    if (!heroInitialized && document.querySelector('#heroSwiper')) {
      heroInitialized = true;
      const heroEl = document.querySelector('#heroSwiper');
      const totalSlides = heroEl.querySelectorAll('.swiper-slide').length;
      const currentEl = heroEl.querySelector('.hero-count-current');
      const totalEl = heroEl.querySelector('.hero-count-total');
      const fillEl = heroEl.querySelector('.hero-progress-fill');
      if (totalEl) totalEl.textContent = totalSlides;

      function updateSliderBar(swiper) {
        const current = swiper.realIndex + 1;
        if (currentEl) currentEl.textContent = current;
        if (fillEl && totalSlides) fillEl.style.width = (current / totalSlides) * 100 + '%';
      }

      new Swiper('#heroSwiper', {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        navigation: {
          nextEl: '#heroSwiper .hero-nav.next',
          prevEl: '#heroSwiper .hero-nav.prev'
        },
        on: { init: updateSliderBar, slideChange: updateSliderBar }
      });
    }

    if (!arrivalsInitialized && document.querySelector('#arrivalsSwiper')) {
      arrivalsInitialized = true;
      new Swiper('#arrivalsSwiper', {
        slidesPerView: 'auto',
        spaceBetween: 24,
        navigation: { nextEl: '.arrivals-nav.next', prevEl: '.arrivals-nav.prev' }
      });
    }
  }

  // DOMContentLoaded 시점에는 비동기 partial이 아직 없을 수 있으므로 로드 완료 이벤트에서도 초기화한다.
  // heroInitialized/arrivalsInitialized가 두 이벤트 사이의 중복 Swiper 생성을 방지한다.
  document.addEventListener('DOMContentLoaded', initMain);
  document.addEventListener('components:loaded', initMain);
})();
