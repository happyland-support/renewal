'use strict';
// 見本の目次（index.html）。中身は js/catalog-data.js の window.CATALOG
{
  const DATA = window.CATALOG;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const steps = label => {
    const parts = label.split('→').map(s => s.trim()).filter(Boolean);
    return parts.map((p, i) => `<span class="${i === parts.length - 1 ? 'last' : ''}">${esc(p)}</span>`).join('<span class="arrow">→</span>');
  };
  const wrap = document.querySelector('.wrap');
  const qBox = document.getElementById('q');

  // 小さく表示した画面の縮め方を、枠の幅に合わせる
  const fit = () => document.querySelectorAll('.thumb').forEach(t => t.style.setProperty('--s', t.clientWidth / 500));
  window.addEventListener('resize', fit);

  function render() {
    const q = qBox.value.trim().toLowerCase();
    let shown = 0, total = 0, chips = '', html = '';
    DATA.cats.forEach(c => {
      total += c.items.length;
      const items = c.items.filter(it => !q || (it.label + ' ' + it.file + ' ' + c.name).toLowerCase().includes(q));
      if (!items.length) return;
      shown += items.length;
      chips += `<a href="#${c.key}">${esc(c.name.replace(/（.*）/, ''))}<b>${items.length}</b></a>`;
      html += `<section class="cat" id="${c.key}"><h2>${esc(c.name)}<small>${c.items.length} 画面</small></h2>` +
        (c.note ? `<p class="note">${esc(c.note)}</p>` : '') + '<div class="grid">' +
        items.map(it => {
          const n = String(c.items.indexOf(it) + 1).padStart(2, '0');
          const tags = (it.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');
          return `<a class="card" href="${esc(it.file)}">` +
            `<span class="thumb"><iframe src="${esc(it.file)}" loading="lazy" tabindex="-1" aria-hidden="true" title=""></iframe></span>` +
            `<span class="no">${n}</span><span class="steps">${steps(it.label)}</span>` +
            `<span class="meta"><span class="file">${esc(it.file)}</span>${tags}</span></a>`;
        }).join('') + '</div></section>';
    });
    document.getElementById('chips').innerHTML = chips;
    document.getElementById('cats').innerHTML = html || `<p class="lead">「${esc(q)}」に当てはまる画面はありません。</p>`;
    document.getElementById('count').textContent = q ? `${shown} / ${total} 画面` : `${total} 画面・${DATA.cats.length} 分類`;
    fit();
  }

  document.getElementById('missing').innerHTML = DATA.missing.length
    ? `<h2>メニューにあるのに、画面が無いもの</h2><ul>${DATA.missing.map(m => `<li>${esc(m.label)}（<span class="file">${esc(m.file)}</span>）</li>`).join('')}</ul>`
    : '';

  function mode(list) {
    wrap.classList.toggle('list', list);
    document.getElementById('mode-list').setAttribute('aria-pressed', list);
    document.getElementById('mode-photo').setAttribute('aria-pressed', !list);
    try { localStorage.setItem('catalog-mode', list ? 'list' : 'photo'); } catch (e) {}
    fit();
  }

  qBox.addEventListener('input', render);
  document.getElementById('mode-list').addEventListener('click', () => mode(true));
  document.getElementById('mode-photo').addEventListener('click', () => mode(false));
  render();
  try { if (localStorage.getItem('catalog-mode') === 'list') mode(true); } catch (e) {}
}
