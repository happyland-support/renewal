'use strict';
// 見本ナビ：各画面の下に「前・次・目次」を出し、タブの題名をその画面の名前にする。
// 見本を見て回るためだけのもの（本番のサイトには入れない）。中身は js/catalog-data.js
{
  const DATA = window.CATALOG;
  const inFrame = window.self !== window.top;   // 目次の中で小さく表示しているときは出さない
  const file = decodeURIComponent(location.pathname.split('/').pop()) || 'index.html';
  let cat = null, idx = -1;
  if (DATA) {
    DATA.cats.some(c => {
      const i = c.items.findIndex(it => it.file === file);
      if (i >= 0) { cat = c; idx = i; return true; }
      return false;
    });
  }
  const item = cat ? cat.items[idx] : null;
  if (item) document.title = `${item.label} | ハッピーランド見本`;

  if (!inFrame) {
    const css = `
      #mihon-nav { position: fixed; left: 8px; right: 8px; bottom: calc(8px + env(safe-area-inset-bottom, 0px)); z-index: 1000;
        max-width: 560px; margin: 0 auto; display: grid; grid-template-columns: auto 1fr auto auto auto; gap: 6px; align-items: center;
        background: rgba(34, 50, 58, .94); color: #fff; border-radius: 12px; padding: 8px 10px;
        font: 12px/1.35 "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif; box-shadow: 0 4px 14px rgba(0, 0, 0, .25); }
      #mihon-nav a, #mihon-nav button, #mihon-nav .off { all: unset; box-sizing: border-box; background: rgba(255, 255, 255, .16);
        border-radius: 8px; padding: 6px 9px; cursor: pointer; white-space: nowrap; color: #fff; }
      #mihon-nav .off { opacity: .35; cursor: default; }
      #mihon-nav a:hover, #mihon-nav button:hover { background: rgba(255, 255, 255, .3); }
      #mihon-nav a:focus-visible, #mihon-nav button:focus-visible { outline: 2px solid #ffb3b8; }
      #mihon-nav .t { text-align: center; min-width: 0; overflow: hidden; }
      #mihon-nav .t b { display: block; font-weight: 400; opacity: .75; font-size: 11px; }
      #mihon-nav .t span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      #mihon-nav.folded { left: auto; right: 8px; grid-template-columns: auto; padding: 4px; }
      #mihon-nav.folded > :not(.open) { display: none; }
      #mihon-nav:not(.folded) .open { display: none; }
      body.mihon-nav-pad { padding-bottom: 72px; }`;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const prev = cat && idx > 0 ? cat.items[idx - 1] : null;
    const next = cat && idx < cat.items.length - 1 ? cat.items[idx + 1] : null;
    const link = (it, text) => it ? `<a href="${esc(it.file)}" title="${esc(it.label)}">${text}</a>` : `<span class="off">${text}</span>`;
    const nav = document.createElement('nav');
    nav.id = 'mihon-nav';
    nav.setAttribute('aria-label', '見本ナビ');
    nav.innerHTML =
      link(prev, '← 前') +
      `<div class="t"><b>${cat ? `${esc(cat.name)} ${idx + 1} / ${cat.items.length}` : '見本'}</b><span>${item ? esc(item.label) : esc(file)}</span></div>` +
      link(next, '次 →') +
      `<a href="index.html${cat ? '#' + cat.key : ''}">目次</a>` +
      '<button type="button" class="fold" aria-label="見本ナビを畳む">×</button>' +
      '<button type="button" class="open">見本ナビ</button>';
    document.body.appendChild(nav);

    const setFolded = f => {
      nav.classList.toggle('folded', f);
      document.body.classList.toggle('mihon-nav-pad', !f);
      try { localStorage.setItem('mihon-nav-folded', f ? '1' : ''); } catch (e) {}
    };
    nav.querySelector('.fold').addEventListener('click', () => setFolded(true));
    nav.querySelector('.open').addEventListener('click', () => setFolded(false));
    let folded = false;
    try { folded = localStorage.getItem('mihon-nav-folded') === '1'; } catch (e) {}
    setFolded(folded);
  }
}
