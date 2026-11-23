// Şekil çizici: şablondaki "sekil" alanından SVG metni üretir. Yalnız sayı ve sabit kelime koyar; ad kaçışlanır.
var Sekil = (function () {
  'use strict';
  function kac(m) {
    return String(m).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function say(n) { return String(Math.round(n * 100) / 100).replace('.', ','); }

  // Masa üstten: arka = üst kenar, sol/sag = yan kenarlar, on = alt kenar. Ölçülere orantılı çizilir.
  function masaUstten(s, takmaAd) {
    var en = Number(s.en), boy = Number(s.boy);
    if (!(en > 0) || !(boy > 0)) return '';
    var KW = 400, KH = 210, o = Math.min(KW / en, KH / boy);
    var w = Math.round(en * o), h = Math.round(boy * o);
    var x = Math.round(280 - w / 2), y = 42 + Math.round((KH - h) / 2);
    var x2 = x + w, y2 = y + h;
    var isar = s.isaretli || [];
    function var_(ad) { return isar.indexOf(ad) >= 0; }
    var p = [];
    p.push('<svg viewBox="0 0 560 300" role="img" aria-label="Masanın üstten görünüşü" xmlns="http://www.w3.org/2000/svg">');
    p.push('<rect class="kutu" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10"/>');
    p.push('<text class="etiket-s" x="280" y="' + Math.round(y + h / 2 + 6) + '" text-anchor="middle">masa (üstten)</text>');
    if (var_('arka')) p.push('<line class="serit" x1="' + x + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '"/>');
    if (var_('sol')) p.push('<line class="serit" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + y2 + '"/>');
    if (var_('sag')) p.push('<line class="serit" x1="' + x2 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y2 + '"/>');
    if (var_('on')) p.push('<line class="serit" x1="' + x + '" y1="' + y2 + '" x2="' + x2 + '" y2="' + y2 + '"/>');
    p.push('<text class="olcu" x="280" y="' + (y - 14) + '" text-anchor="middle">' + say(en) + ' cm</text>');
    var ym = Math.round(y + h / 2 + 4);
    p.push('<text class="olcu" x="' + (x - 28) + '" y="' + ym + '" text-anchor="middle" transform="rotate(-90 ' + (x - 28) + ' ' + ym + ')">' + say(boy) + ' cm</text>');
    p.push('<text class="olcu" x="' + (x2 + 28) + '" y="' + ym + '" text-anchor="middle" transform="rotate(90 ' + (x2 + 28) + ' ' + ym + ')">' + say(boy) + ' cm</text>');
    p.push('<text class="etiket-s" x="280" y="' + (y2 + 32) + '" text-anchor="middle">ön kenar (' + kac(takmaAd || 'Kâşif') + ' burada oturuyor)</text>');
    p.push('</svg>');
    return p.join('');
  }

  // ---- Konu anlatımı resimleri (22.11): yalnız tam sayı alır; sınır dışı değer boş döner (yanlış resim çizilmez, Madde 3.1) ----
  function tam(n, en, ust) { n = Number(n); return Math.floor(n) === n && n >= en && n <= ust ? n : null; }
  function svgAc(g, y, ad) { return '<svg viewBox="0 0 ' + g + ' ' + y + '" role="img" aria-label="' + kac(ad) + '" xmlns="http://www.w3.org/2000/svg">'; }

  // Kesir çubuğu: bütün 'parca' eşit parçaya bölünür, ilk 'boyali' tanesi boyanır; etiket (örn. "3/4") altta.
  function kesirCubugu(s) {
    var n = tam(s.parca, 1, 12), b = tam(s.boyali, 0, 12);
    if (n === null || b === null || b > n) return '';
    var x0 = 30, w = 500, h = 90, y0 = 60, pw = w / n, p = [svgAc(560, s.etiket ? 240 : 175, 'Kesir çubuğu: ' + n + ' eşit parçanın ' + b + ' tanesi boyalı')];
    for (var i = 0; i < n; i++) {
      p.push('<rect class="' + (i < b ? 'boyali' : 'kutu') + '" x="' + (x0 + i * pw).toFixed(1) + '" y="' + y0 + '" width="' + pw.toFixed(1) + '" height="' + h + '"/>');
    }
    p.push('<rect class="cerceve" x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="4"/>');
    p.push('<text class="etiket-s" x="280" y="40" text-anchor="middle">bütün = ' + n + ' eşit parça</text>');
    if (s.etiket && /^\d{1,2}\/\d{1,2}$/.test(String(s.etiket))) p.push('<text class="olcu buyuk" x="280" y="205" text-anchor="middle">' + kac(s.etiket) + '</text>');
    p.push('</svg>');
    return p.join('');
  }

  // Grup: 'toplam' nokta 'payda' eşit gruba ayrılır (her grup bir satır); ilk 'boyali' grup boyanır. payda 1 = henüz bölünmemiş bütün.
  function grup(s) {
    var t = tam(s.toplam, 1, 40), d = tam(s.payda, 1, 10), b = tam(s.boyali, 0, 10);
    if (t === null || d === null || b === null || b > d || t % d !== 0) return '';
    var k = t / d, satir = d === 1 ? Math.ceil(t / 8) : d, sutun = d === 1 ? Math.min(t, 8) : k;
    var r = 13, ara = 38, satirAra = 42, w = sutun * ara, x0 = 280 - w / 2 + ara / 2, y0 = 34;
    var y = y0 + satir * satirAra + 10, p = [svgAc(560, Math.max(y, 120), t + ' tane, ' + d + ' grup, ' + b + ' grup boyalı')];
    for (var i = 0; i < t; i++) {
      var g = d === 1 ? 0 : Math.floor(i / k), sat = d === 1 ? Math.floor(i / 8) : g, sut = d === 1 ? i % 8 : i % k;
      p.push('<circle class="' + (g < b && d > 1 ? 'boyali' : 'kutu') + '" cx="' + (x0 + sut * ara) + '" cy="' + (y0 + sat * satirAra) + '" r="' + r + '"/>');
    }
    if (d > 1) for (var j = 0; j < d; j++) p.push('<text class="etiket-s" x="' + (x0 + w - ara / 2 + 24) + '" y="' + (y0 + j * satirAra + 5) + '">' + (j + 1) + '. grup</text>');
    p.push('</svg>');
    return p.join('');
  }

  // Yüzlük kare: 10 × 10 = 100 küçük kare, ilk 'boyali' tanesi boyanır.
  function yuzKare(s) {
    var b = tam(s.boyali, 0, 100);
    if (b === null) return '';
    var c = 22, x0 = 280 - 5 * c, y0 = 14, p = [svgAc(560, 270, '100 karenin ' + b + ' tanesi boyalı')];
    for (var i = 0; i < 100; i++) {
      p.push('<rect class="' + (i < b ? 'boyali' : 'kutu') + '" x="' + (x0 + (i % 10) * c) + '" y="' + (y0 + Math.floor(i / 10) * c) + '" width="' + c + '" height="' + c + '"/>');
    }
    p.push('<text class="olcu" x="280" y="258" text-anchor="middle">100 karenin ' + b + ' tanesi = %' + b + '</text>');
    p.push('</svg>');
    return p.join('');
  }

  // Birim merdiveni: m → cm → mm (× 100, × 10); geri yönde bölünür.
  function birimMerdiven() {
    var p = [svgAc(560, 200, 'Birimler: 1 metre 100 santimetre, 1 santimetre 10 milimetre')];
    [['m', 'metre', 40], ['cm', 'santimetre', 220], ['mm', 'milimetre', 400]].forEach(function (b) {
      p.push('<rect class="kutu" x="' + b[2] + '" y="50" width="120" height="70" rx="12"/>');
      p.push('<text class="olcu buyuk" x="' + (b[2] + 60) + '" y="95" text-anchor="middle">' + b[0] + '</text>');
      p.push('<text class="etiket-s" x="' + (b[2] + 60) + '" y="145" text-anchor="middle">' + b[1] + '</text>');
    });
    [[160, '× 100'], [340, '× 10']].forEach(function (o) {
      p.push('<line class="ok" x1="' + (o[0] + 6) + '" y1="85" x2="' + (o[0] + 54) + '" y2="85"/>');
      p.push('<polygon class="okucu" points="' + (o[0] + 56) + ',85 ' + (o[0] + 45) + ',78 ' + (o[0] + 45) + ',92"/>');
      p.push('<text class="olcu" x="' + (o[0] + 30) + '" y="70" text-anchor="middle">' + o[1] + '</text>');
    });
    p.push('<text class="etiket-s" x="280" y="185" text-anchor="middle">büyükten küçüğe çarp, küçükten büyüğe böl</text>');
    p.push('</svg>');
    return p.join('');
  }

  function ciz(sekil, takmaAd) {
    if (!sekil) return '';
    if (sekil.tip === 'masa-ustten') return masaUstten(sekil, takmaAd);
    if (sekil.tip === 'kesir-cubugu') return kesirCubugu(sekil);
    if (sekil.tip === 'grup') return grup(sekil);
    if (sekil.tip === 'yuz-kare') return yuzKare(sekil);
    if (sekil.tip === 'birim-merdiven') return birimMerdiven();
    return '';
  }
  return { ciz: ciz, masaUstten: masaUstten, TIPLER: ['masa-ustten', 'kesir-cubugu', 'grup', 'yuz-kare', 'birim-merdiven'] };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Sekil;
