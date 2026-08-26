(function () {
  "use strict";

  function injectCss(text, id){ var t=document.getElementById(id); if(!t){ t=document.createElement("style"); t.id=id; document.head.appendChild(t); } t.textContent=text; }

  __COLOR_CSS__
  __MANAGER_CSS__

  var ASSETS = __ASSETS__;

  function injectDecor(A,c){ var isPud=!!(c&&c.id==='pudding');
    ['sk-bgwash','sk-empty','sk-wm','sk-mascot','sk-avatar-badge','sk-peek','sk-logo','sk-brandtext','sk-font','sk-friends','sk-friends-row','skf-lt','skf-lb','skf-rt','skf-rb','sk-brandlogo','sk-brandimg','sk-brandbox'].forEach(function(id){ var e=document.getElementById(id); if(e) e.remove(); });
    function el(id, style){ var d=document.createElement('div'); d.id=id; d.setAttribute('style', style); return d; }
    function bg(u){ return u ? 'url("'+u+'")' : 'none'; }
    function add(id, style){ var e=document.getElementById(id); if(e) e.remove(); document.body.appendChild(el(id, style)); }
    if (isPud && A.mascot) add('sk-mascot', 'position:fixed;left:70px;bottom:84px;width:140px;height:140px;pointer-events:none;z-index:6;opacity:.96;background-image:'+bg(A.mascot)+';background-size:contain;background-position:center;background-repeat:no-repeat;');
    var hdr=document.querySelector('header[class*="wSkVaW"], [class*="wSkVaW_header"]'); if(hdr) hdr.style.position='relative';
    var baseY = hdr ? hdr.getBoundingClientRect().bottom : 78;
    if (isPud && A.peek) add('sk-peek', 'position:fixed;right:0;bottom:0;width:28vw;height:56vh;pointer-events:none;z-index:0;opacity:.92;background-image:'+bg(A.peek)+';background-size:contain;background-position:right bottom;background-repeat:no-repeat;-webkit-mask-image:linear-gradient(to bottom, black 0%, black 42%, transparent 96%);mask-image:linear-gradient(to bottom, black 0%, black 42%, transparent 96%);');
    if (!document.getElementById('sk-font')) { var fl=document.createElement('link'); fl.id='sk-font'; fl.rel='stylesheet'; fl.href='https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&display=swap'; document.head.appendChild(fl); }
    var bt=document.getElementById('sk-brandtext'); if(!bt){ bt=document.createElement('div'); bt.id='sk-brandtext'; (hdr||document.body).appendChild(bt); }
    bt.textContent=(c&&c.name)?c.name:'Pompompurin'; var ht=document.createElement('span'); ht.textContent='\u2665'; ht.style.cssText='color:#e2574c;font-size:.8em;margin-left:8px;'; bt.appendChild(ht);
    bt.style.cssText='position:'+(hdr?'absolute':'fixed')+';left:50%;top:14px;transform:translateX(-50%);z-index:4000;pointer-events:none;font-family:\"Baloo 2\",\"Comic Sans MS\",\"Chalkboard SE\",cursive,sans-serif;font-weight:700;font-size:44px;line-height:1;color:#7a5236;letter-spacing:1px;text-shadow:0 2px 0 rgba(255,255,255,.45);white-space:nowrap;';
    if (isPud && A.friendsArr && A.friendsArr.length) {
      var row=document.getElementById('sk-friends-row'); if(!row){ row=document.createElement('div'); row.id='sk-friends-row'; document.body.appendChild(row); }
      row.style.cssText='position:fixed;left:280px;right:60px;top:'+baseY+'px;height:0;pointer-events:none;z-index:1;';
      row.querySelectorAll('.sk-f').forEach(function(k){ k.remove(); });
      var xs=[4,9,15,21,27, 62,68,74,80,86,  12, 92, 6, 89, 33];
      A.friendsArr.forEach(function(u,i){ var im=document.createElement('div'); im.className='sk-f'; var x=xs[i%xs.length]; var h=40+((i*7)%20); im.style.cssText='position:absolute;bottom:0;left:'+x+'%;height:'+h+'px;width:'+h+'px;background-image:url("'+u+'");background-size:contain;background-position:center bottom;background-repeat:no-repeat;opacity:.95;'; row.appendChild(im); });
    }
    if (isPud && A.brandlogo) { var bb=document.getElementById('sk-brandbox'); if(!bb){ bb=document.createElement('div'); bb.id='sk-brandbox'; document.body.appendChild(bb); } bb.style.cssText='position:fixed;left:12px;top:10px;width:254px;height:48px;background:var(--dsw-specific-sidebar-fill);border-radius:10px;z-index:40;pointer-events:none;display:flex;align-items:center;padding:0 10px;box-sizing:border-box;'; bb.innerHTML=''; var ic=document.createElement('div'); ic.style.cssText='height:38px;width:38px;flex:0 0 38px;background-image:url("'+A.brandlogo+'");background-size:contain;background-position:center;background-repeat:no-repeat;'; var tx=document.createElement('span'); tx.style.cssText='font-weight:700;font-size:18px;color:#2b2b2b;font-family:inherit;margin-left:8px;white-space:nowrap;'; tx.innerHTML='deepseek <span style="border:1px solid #2b2b2b;font-size:11px;font-weight:600;padding:1px 5px;border-radius:4px;vertical-align:middle;margin-left:4px;">HARNESS</span>'; bb.appendChild(ic); bb.appendChild(tx); }
    if (A.avatar) document.body.style.setProperty('--sk-img-avatar', A.avatar);
  }

  var CHARACTERS = [
    { id: 'kitty',   label: 'Hello Kitty',  name: 'Hello Kitty',  emoji: '🎀' },
    { id: 'kuromi',  label: 'Kuromi',       name: 'Kuromi',       emoji: '🖤' },
    { id: 'cinna',   label: '玉桂狗',        name: 'Cinnamoroll',  emoji: '🦴' },
    { id: 'melody',  label: 'My Melody',    name: 'My Melody',    emoji: '🐰' },
    { id: 'pudding', label: '布丁狗',        name: 'Pompompurin',  emoji: '🍮' }
  ];
  var STORAGE_CHAR = 'sanrio.sk', STORAGE_MODE = 'sanrio.mode';
  function pickDaily(){ var d=new Date(); var seed=Number(''+d.getFullYear()+(d.getMonth()+1)+d.getDate()); return CHARACTERS[seed%CHARACTERS.length]; }
  function currentChar(){ var s=localStorage.getItem(STORAGE_CHAR); if(s==='daily') return pickDaily(); return CHARACTERS.find(function(c){return c.id===s;})||pickDaily(); }
  function applyChar(c){ document.body.dataset.sanrioSk=c.id; document.body.style.setProperty('--sk-emoji', c.emoji); injectDecor(ASSETS, c); }
  function applyMode(){ var mode=localStorage.getItem(STORAGE_MODE)||'auto'; var dark; if(mode==='light') dark=false; else if(mode==='dark') dark=true; else dark = document.body.hasAttribute('data-ds-dark-theme')||(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches); document.body.toggleAttribute('data-ds-dark-theme', dark); document.documentElement.style.colorScheme = dark?'dark':'light'; return mode; }
  function buildPanel(){ if(document.getElementById('skPanel')) return;
    var panel=document.createElement('div'); panel.id='skPanel'; panel.style.display='none';
    var title=document.createElement('h4'); title.textContent='🍮 三丽鸥皮肤'; panel.appendChild(title);
    var chips=document.createElement('div'); chips.className='sk-chips';
    CHARACTERS.forEach(function(c){ var b=document.createElement('button'); b.className='sk-chip'; b.dataset.id=c.id; b.textContent=c.emoji+' '+c.label;
      b.addEventListener('click',function(){ localStorage.setItem(STORAGE_CHAR,c.id); applyChar(c); refresh(); }); chips.appendChild(b); });
    var daily=document.createElement('button'); daily.className='sk-chip sk-daily'; daily.textContent='🎲 每日随机';
    daily.addEventListener('click',function(){ localStorage.setItem(STORAGE_CHAR,'daily'); applyChar(pickDaily()); refresh(); }); chips.appendChild(daily); panel.appendChild(chips);
    var modes=document.createElement('div'); modes.className='sk-modes'; var mb=document.createElement('button'); mb.id='skModeBtn';
    mb.addEventListener('click',function(){ var cur=localStorage.getItem(STORAGE_MODE)||'auto'; var nxt=cur==='auto'?'light':cur==='light'?'dark':'auto'; localStorage.setItem(STORAGE_MODE,nxt); applyMode(); refresh(); });
    modes.appendChild(mb); panel.appendChild(modes);
    var note=document.createElement('div'); note.className='sk-note'; note.textContent='角色可点选；🎲每天自动换。'; panel.appendChild(note);
    document.body.appendChild(panel); }
  function refresh(){ var c=currentChar(); applyChar(c); var mode=applyMode(); var panel=document.getElementById('skPanel'); if(!panel) return;
    panel.querySelectorAll('.sk-chip').forEach(function(el){ var active=(el.dataset.id&&el.dataset.id===c.id)||(!el.dataset.id&&localStorage.getItem(STORAGE_CHAR)==='daily'); el.classList.toggle('on', active); });
    var btn=document.getElementById('skModeBtn'); if(btn) btn.textContent='日/夜: '+(mode==='auto'?'跟随系统':mode==='light'?'白天':'夜晚'); }
  function boot(){ var t=document.getElementById('skToggle'); if(!t){ t=document.createElement('button'); t.id='skToggle'; t.textContent='🍮';
      t.addEventListener('click',function(){ var p=document.getElementById('skPanel'); if(!p){buildPanel(); p=document.getElementById('skPanel');} p.style.display = p.style.display==='none'?'block':'none'; }); document.body.appendChild(t); }
    injectDecor(ASSETS, currentChar()); buildPanel(); refresh(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();