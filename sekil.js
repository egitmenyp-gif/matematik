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

  function ciz(sekil, takmaAd) {
    if (!sekil) return '';
    if (sekil.tip === 'masa-ustten') return masaUstten(sekil, takmaAd);
    return '';
  }
  return { ciz: ciz, masaUstten: masaUstten };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Sekil;
