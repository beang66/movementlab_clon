(function () {
  const components = {
    header: './components/header.partial.html',
    hero: './components/hero.partial.html',
    main: './components/main.partial.html',
    footer: './components/footer.partial.html'
  };

  async function inject(host, url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url + ' (' + res.status + ')');
    host.innerHTML = await res.text();
  }

  async function loadAll() {
    const hosts = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(hosts.map(function (host) {
      const name = host.getAttribute('data-include');
      const url = components[name];
      return url ? inject(host, url) : Promise.resolve();
    }));

    // 현재 페이지 메뉴 표시
    const current = location.pathname.split('/').pop() || 'index.html';
    if (current === 'membership.html') {
      const membership = document.querySelector('[data-nav="membership"]');
      if (membership) membership.classList.add('is-active');
    }

    // partial 로드 후 초기화가 필요한 페이지에 알림
    document.dispatchEvent(new CustomEvent('components:loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { loadAll().catch(console.error); });
  } else {
    loadAll().catch(console.error);
  }
})();
