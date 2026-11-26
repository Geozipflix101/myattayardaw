/* မြတ်တရားတော် - website script
   config.js ထဲက လင့်ခ်များနှင့် ဗီဒီယိုစာရင်းကို စာမျက်နှာများတွင် ဖြည့်ပေးသည်။ */
(function () {
  var C = window.SITE_CONFIG || {};
  var links = C.links || {};

  /* ---------- လင့်ခ်များ ---------- */
  document.querySelectorAll('[data-link]').forEach(function (el) {
    var key = el.getAttribute('data-link');
    var url = links[key];

    if (url) {
      if (key === 'email' && url.indexOf('mailto:') !== 0) url = 'mailto:' + url;
      el.setAttribute('href', url);
      if (/^https?:/i.test(url)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    } else if (el.hasAttribute('data-optional')) {
      (el.closest('li') || el).hidden = true;
    }
  });

  /* ---------- ဗီဒီယိုများ ---------- */
  document.querySelectorAll('[data-videos]').forEach(function (box) {
    var limit = parseInt(box.getAttribute('data-videos'), 10) || 0;
    var list = (C.videos || []).filter(function (v) { return v && v.id; });
    if (limit) list = list.slice(0, limit);

    if (!list.length) {
      var p = document.createElement('p');
      p.className = 'empty';
      p.textContent = 'ဗီဒီယိုများကို မကြာမီ ထည့်သွင်းပါမည်။ ယခုအချိန်တွင် YouTube ချန်နယ်၌ တိုက်ရိုက်ကြည့်ရှုနိုင်ပါသည်။';
      box.appendChild(p);
      return;
    }

    list.forEach(function (v) {
      var id = encodeURIComponent(v.id);
      var title = v.title || 'ဗီဒီယို';

      var item = document.createElement('article');
      item.className = 'video';

      var frame = document.createElement('div');
      frame.className = 'frame';

      var thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'thumb';
      thumb.setAttribute('aria-label', 'ဗီဒီယိုဖွင့်ရန် - ' + title);

      var img = document.createElement('img');
      img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
      img.alt = '';
      img.loading = 'lazy';
      thumb.appendChild(img);

      /* နှိပ်မှသာ YouTube player ကို ဖွင့်သည် (စာမျက်နှာ မြန်စေရန်) */
      thumb.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
        f.title = title;
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        frame.replaceChild(f, thumb);
      });

      frame.appendChild(thumb);

      var h = document.createElement('h3');
      h.textContent = title;

      item.appendChild(frame);
      item.appendChild(h);
      box.appendChild(item);
    });
  });
})();
