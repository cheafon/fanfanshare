// FLOW Gallery — Floating Navigation Bar v3
// With favorites drawer panel
(function(){
  const file = location.pathname.split('/').pop();
  if (!file.startsWith('origin-')) return;
  const id = file.replace('origin-','').replace('.html','');

  const s = document.createElement('script');
  s.src = 'meta.js?' + Date.now();
  s.onload = s.onerror = () => init();
  document.head.appendChild(s);

  function init() {
    const META = window.__NAV_META || {};
    const IDS = Object.keys(META);
    const total = IDS.length;
    const idx = IDS.indexOf(id);
    const prev = idx > 0 ? IDS[idx-1] : (total ? IDS[total-1] : null);
    const next = idx < total-1 ? IDS[idx+1] : (total ? IDS[0] : null);
    const num = idx >= 0 ? idx + 1 : '—';
    const name = (META[id]||{}).name || id;

    let favs = JSON.parse(localStorage.getItem('origin-favs') || '[]');
    const isFav = () => favs.includes(id);
    const toggleFav = () => {
      favs = isFav() ? favs.filter(f=>f!==id) : [...favs, id];
      localStorage.setItem('origin-favs', JSON.stringify(favs));
      updateFavBtn();
    };

    // Font
    if (!document.querySelector('link[href*="Plus+Jakarta"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    // Styles
    const style = document.createElement('style');
    style.textContent = `
      .flow-nav{position:fixed;top:0;left:0;right:0;z-index:99999;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;background:rgba(255,255,255,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,0.06);font-family:'Plus Jakarta Sans',-apple-system,sans-serif;font-size:13px;flex-wrap:wrap}
      .flow-nav a,.flow-nav button{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:8px;border:1px solid rgba(0,0,0,0.08);background:#fff;color:#333;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;transition:all 0.2s;white-space:nowrap}
      .flow-nav a:hover,.flow-nav button:hover{background:#f0f0f0;border-color:rgba(0,0,0,0.12)}
      .flow-nav .nav-home{background:#f8f8f8}
      .flow-nav .nav-counter{font-size:12px;color:#999;padding:0 6px;min-width:50px;text-align:center;font-weight:500;border:none;background:none}
      .flow-nav .nav-fav{border-color:transparent}
      .flow-nav .nav-fav.faved{background:#FFF3E0;color:#E65100;border-color:#FFB74D}
      .flow-nav .nav-dl{border-color:transparent;color:#666}
      .flow-nav .nav-dl:hover{background:#E3F2FD;color:#1565C0}
      .flow-nav .nav-name{font-size:12px;color:#666;font-weight:500;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:none;background:none}
      .flow-nav .nav-drawer-btn{background:#FFF8E1;color:#F57F17;border-color:#FFD54F;position:relative}
      .flow-nav .nav-drawer-btn:hover{background:#FFF3E0}
      .flow-nav .nav-drawer-btn .badge{position:absolute;top:-4px;right:-4px;background:#E65100;color:#fff;font-size:10px;font-weight:700;min-width:16px;height:16px;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:0 4px}
      .flow-nav .nav-prompt-btn{background:#E8F5E9;color:#2E7D32;border-color:#A5D6A7}
      .flow-nav .nav-prompt-btn:hover{background:#C8E6C9}

      .fav-drawer{position:fixed;top:0;right:-340px;width:320px;height:100vh;z-index:100000;background:#fff;box-shadow:-4px 0 24px rgba(0,0,0,0.1);transition:right 0.3s cubic-bezier(0.4,0,0.2,1);font-family:'Plus Jakarta Sans',-apple-system,sans-serif;display:flex;flex-direction:column}
      .fav-drawer.open{right:0}
      .fav-drawer-header{padding:16px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between}
      .fav-drawer-title{font-size:15px;font-weight:700;color:#333}
      .fav-drawer-close{width:32px;height:32px;border-radius:8px;border:none;background:#f5f5f5;cursor:pointer;font-size:16px;color:#666;display:flex;align-items:center;justify-content:center;transition:background 0.2s}
      .fav-drawer-close:hover{background:#eee}
      .fav-drawer-list{flex:1;overflow-y:auto;padding:8px}
      .fav-drawer-empty{padding:40px 20px;text-align:center;color:#bbb;font-size:14px}
      .fav-drawer-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background 0.15s;text-decoration:none;color:inherit}
      .fav-drawer-item:hover{background:#f8f8f8}
      .fav-drawer-item-num{font-size:11px;font-weight:700;color:#ccc;min-width:28px}
      .fav-drawer-item-name{font-size:14px;font-weight:600;color:#333;flex:1}
      .fav-drawer-item-desc{font-size:11px;color:#999;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:160px}
      .fav-drawer-item-rm{width:24px;height:24px;border-radius:6px;border:none;background:transparent;cursor:pointer;font-size:12px;color:#ccc;display:flex;align-items:center;justify-content:center;transition:all 0.15s;flex-shrink:0}
      .fav-drawer-item-rm:hover{background:#FFF3E0;color:#E65100}
      .fav-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.15);opacity:0;pointer-events:none;transition:opacity 0.3s}
      .fav-overlay.open{opacity:1;pointer-events:auto}

      @media(max-width:600px){.flow-nav{gap:4px;padding:6px 8px}.flow-nav a,.flow-nav button{padding:5px 10px;font-size:12px}.flow-nav .nav-name{display:none}.fav-drawer{width:280px}}
    `;
    document.head.appendChild(style);

    // Build nav bar
    const bar = document.createElement('div');
    bar.className = 'flow-nav';

    const mk = (tag, cls, text, href) => {
      const el = document.createElement(tag);
      el.className = cls;
      el.innerHTML = text;
      if (href) el.href = href;
      return el;
    };

    bar.appendChild(mk('a','nav-home','← 首页','../index.html'));
    if (prev) bar.appendChild(mk('a','','‹ 上一个','origin-'+prev+'.html'));
    bar.appendChild(mk('span','nav-counter', num + ' / ' + (total||'?')));
    if (next) bar.appendChild(mk('a','','下一个 ›','origin-'+next+'.html'));
    bar.appendChild(mk('span','nav-name', name));

    const favBtn = mk('button','nav-fav', isFav() ? '★ 已收藏' : '☆ 收藏');
    if (isFav()) favBtn.classList.add('faved');
    favBtn.onclick = toggleFav;
    bar.appendChild(favBtn);

    const dl = mk('a','nav-dl','↓ 下载', file);
    dl.download = file;
    bar.appendChild(dl);

    // Drawer toggle button
    const drawerBtn = document.createElement('button');
    drawerBtn.className = 'nav-drawer-btn';
    drawerBtn.innerHTML = '★ 收藏夹';
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = favs.length;
    if (favs.length > 0) drawerBtn.appendChild(badge);
    drawerBtn.onclick = () => openDrawer();
    bar.appendChild(drawerBtn);

    // Copy Prompt button — fetches from .prompt.txt
    const promptBtn = document.createElement('button');
    promptBtn.className = 'nav-prompt-btn';
    promptBtn.innerHTML = '📋 复制提示词';
    promptBtn.onclick = () => {
      const promptFile = file.replace('.html', '.prompt.txt');
      promptBtn.innerHTML = '⏳ 加载中...';
      fetch(promptFile + '?' + Date.now()).then(r => {
        if (!r.ok) throw new Error('not found');
        return r.text();
      }).then(prompt => {
        navigator.clipboard.writeText(prompt).then(() => {
          promptBtn.innerHTML = '✅ 已复制';
          setTimeout(() => { promptBtn.innerHTML = '📋 复制提示词'; }, 2000);
        }).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = prompt;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          promptBtn.innerHTML = '✅ 已复制';
          setTimeout(() => { promptBtn.innerHTML = '📋 复制提示词'; }, 2000);
        });
      }).catch(() => {
        promptBtn.innerHTML = '❌ 暂无提示词';
        setTimeout(() => { promptBtn.innerHTML = '📋 复制提示词'; }, 2000);
      });
    };
    bar.appendChild(promptBtn);

    function updateFavBtn() {
      favBtn.innerHTML = isFav() ? '★ 已收藏' : '☆ 收藏';
      favBtn.classList.toggle('faved', isFav());
      badge.textContent = favs.length;
      if (favs.length > 0) { if (!drawerBtn.contains(badge)) drawerBtn.appendChild(badge); }
      else { if (drawerBtn.contains(badge)) drawerBtn.removeChild(badge); }
      renderDrawerList();
    }

    document.body.appendChild(bar);
    // Dynamic padding based on actual nav height
    requestAnimationFrame(() => {
      document.body.style.paddingTop = bar.offsetHeight + 'px';
      window.addEventListener('resize', () => {
        document.body.style.paddingTop = bar.offsetHeight + 'px';
      });
    });

    // Build drawer
    const overlay = document.createElement('div');
    overlay.className = 'fav-overlay';
    overlay.onclick = closeDrawer;

    const drawer = document.createElement('div');
    drawer.className = 'fav-drawer';
    drawer.innerHTML = `
      <div class="fav-drawer-header">
        <span class="fav-drawer-title">★ 我的收藏夹</span>
        <button class="fav-drawer-close">✕</button>
      </div>
      <div class="fav-drawer-list" id="__favDrawerList"></div>
    `;
    drawer.querySelector('.fav-drawer-close').onclick = closeDrawer;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    function openDrawer() {
      renderDrawerList();
      drawer.classList.add('open');
      overlay.classList.add('open');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    }

    function renderDrawerList() {
      const list = document.getElementById('__favDrawerList');
      if (!list) return;
      const currentFavs = JSON.parse(localStorage.getItem('origin-favs') || '[]');
      if (currentFavs.length === 0) {
        list.innerHTML = '<div class="fav-drawer-empty">还没有收藏<br>点击导航栏的 ☆ 收藏 添加</div>';
        return;
      }
      list.innerHTML = '';
      currentFavs.forEach((fid, i) => {
        const meta = META[fid] || {};
        const item = document.createElement('div');
        item.style.cssText = 'display:flex;align-items:center;gap:6px;';

        const link = document.createElement('a');
        link.className = 'fav-drawer-item';
        link.href = 'origin-' + fid + '.html';
        link.target = '_blank';
        link.innerHTML =
          '<span class="fav-drawer-item-num">#' + (IDS.indexOf(fid)+1) + '</span>' +
          '<span class="fav-drawer-item-name">' + (meta.name || fid) + '</span>' +
          '<span class="fav-drawer-item-desc">' + (meta.desc || '').substring(0,30) + '</span>';

        const rmBtn = document.createElement('button');
        rmBtn.className = 'fav-drawer-item-rm';
        rmBtn.innerHTML = '✕';
        rmBtn.title = '取消收藏';
        rmBtn.onclick = (e) => {
          e.stopPropagation();
          favs = favs.filter(f => f !== fid);
          localStorage.setItem('origin-favs', JSON.stringify(favs));
          updateFavBtn();
        };

        item.appendChild(link);
        item.appendChild(rmBtn);
        list.appendChild(item);
      });
    }
  }
})();
