// Soru motoru: saf JS, Google'a ve tarayıcıya bağlı değil. site/motor.js ile apps-script/Motor.gs AYNI içeriktir
// (testler/esitlik_test.js denetler). Model hesap yapmaz: sayılar, doğru cevap, şıklar ve hata türü burada üretilir.
var Motor = (function () {
  'use strict';
  var SURUM = 1;
  var GUVENLI = Number.MAX_SAFE_INTEGER;
  var HARFLER = ['A', 'B', 'C', 'D', 'E', 'F'];

  function hata(kod, ayrinti) {
    var e = new Error(kod + (ayrinti ? ': ' + ayrinti : ''));
    e.kod = kod;
    return e;
  }

  // ---- Kesirli tam aritmetik (pay/payda tamsayı; sınırı aşan hesap tasma hatası verir) ----
  function ebob(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = a % b; a = b; b = t; }
    return a;
  }
  function guvenli(x) {
    if (!Number.isSafeInteger(x)) throw hata('tasma');
    return x;
  }
  function kesir(p, q) {
    if (q === undefined) q = 1;
    if (!Number.isInteger(p) || !Number.isInteger(q)) throw hata('tamsayi-degil');
    if (q === 0) throw hata('sifira-bolme');
    if (q < 0) { p = -p; q = -q; }
    var g = ebob(p, q) || 1;
    return { p: p / g, q: q / g };
  }
  function topla(a, b) {
    var g = ebob(a.q, b.q);
    return kesir(guvenli(a.p * (b.q / g) + b.p * (a.q / g)), guvenli(a.q / g * b.q));
  }
  function eksi(a) { return { p: -a.p, q: a.q }; }
  function cikar(a, b) { return topla(a, eksi(b)); }
  function carp(a, b) {
    var g1 = ebob(a.p, b.q) || 1, g2 = ebob(b.p, a.q) || 1;
    return kesir(guvenli((a.p / g1) * (b.p / g2)), guvenli((a.q / g2) * (b.q / g1)));
  }
  function bol(a, b) {
    if (b.p === 0) throw hata('sifira-bolme');
    return carp(a, { p: b.q, q: b.p });
  }
  function esit(a, b) { return a.p === b.p && a.q === b.q; }
  function isaret(a) { return a.p > 0 ? 1 : a.p < 0 ? -1 : 0; }
  function karsilastir(a, b) { return isaret(cikar(a, b)); }
  function sayiya(a) { return a.p / a.q; }

  // ---- Türkçe sayı okuma/yazma ----
  // "1,5" "1.5" "3/2" "150" eşdeğer okunur; sondaki birim (W, watt, cm) yok sayılır.
  function oku(metin) {
    if (typeof metin === 'number') metin = String(metin);
    if (typeof metin !== 'string') return null;
    var m = /^\s*(-?)(\d+)(?:[.,](\d+))?(?:\/(\d+))?\s*[A-Za-zÇĞİÖŞÜçğıöşü°%]*\s*$/.exec(metin);
    if (!m) return null;
    try {
      if (m[3] !== undefined && m[4] !== undefined) return null; // "1,5/2" desteklenmez
      var isr = m[1] ? -1 : 1;
      if (m[4] !== undefined) return kesir(isr * parseInt(m[2], 10), parseInt(m[4], 10));
      if (m[3] !== undefined) return kesir(isr * parseInt(m[2] + m[3], 10), Math.pow(10, m[3].length));
      return kesir(isr * parseInt(m[2], 10), 1);
    } catch (e) { return null; }
  }
  function esdeger(a, b) {
    var x = oku(a), y = oku(b);
    return !!(x && y && esit(x, y));
  }
  // mod "ondalik" (varsayılan): sonlu ondalık ve en çok maxOnd basamak, yoksa null; mod "kesir": p/q.
  function yaz(f, maxOnd, mod) {
    if (mod === 'kesir') return f.q === 1 ? String(f.p) : f.p + '/' + f.q;
    if (maxOnd === undefined) maxOnd = 2;
    var q = f.q, e2 = 0, e5 = 0;
    while (q % 2 === 0) { q /= 2; e2++; }
    while (q % 5 === 0) { q /= 5; e5++; }
    if (q !== 1) return null;
    var d = Math.max(e2, e5);
    if (d > maxOnd) return null;
    var n = guvenli(f.p * (Math.pow(10, d) / f.q));
    var s = String(Math.abs(n));
    if (d > 0) {
      while (s.length < d + 1) s = '0' + s;
      s = s.slice(0, s.length - d) + ',' + s.slice(s.length - d);
    }
    return (n < 0 ? '-' : '') + s;
  }

  // ---- Tohumlu rastgele (mulberry32) ----
  function tohumSayisi(tohum) {
    var s = String(tohum), h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rastgele(tohum) {
    var h = tohumSayisi(tohum);
    return function () {
      h = (h + 0x6D2B79F5) | 0;
      var t = Math.imul(h ^ (h >>> 15), 1 | h);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function secim(rng, n) { return Math.floor(rng() * n); }
  function karistir(dizi, rng) {
    var a = dizi.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = secim(rng, i + 1), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ---- Güvenli ifade ayrıştırıcı (eval ve Function YOK) ----
  // ifade: karsilastirma | toplama ; ( + - * / ve unary - ve ( ) ), karşılaştırma: > < >= <= == !=
  var onbellek = Object.create(null);
  function ayristir(metin) {
    if (onbellek[metin]) return onbellek[metin];
    var ize = [], re = /\s*(?:(\d+(?:[.,]\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|(>=|<=|==|!=|[-+*\/()<>]))/y;
    var konum = 0, m;
    while (konum < metin.length && !/^\s*$/.test(metin.slice(konum))) {
      re.lastIndex = konum;
      m = re.exec(metin);
      if (!m) throw hata('ifade-hatasi', metin);
      konum = re.lastIndex;
      if (m[1] !== undefined) ize.push({ t: 'sayi', v: m[1] });
      else if (m[2] !== undefined) ize.push({ t: 'ad', v: m[2] });
      else ize.push({ t: 'op', v: m[3] });
    }
    var i = 0;
    function bak() { return ize[i]; }
    function opMi(v) { var x = ize[i]; return x && x.t === 'op' && x.v === v; }
    function birincil() {
      var x = ize[i++];
      if (!x) throw hata('ifade-hatasi', metin);
      if (x.t === 'sayi') { var f = oku(x.v); if (!f) throw hata('ifade-hatasi', metin); return { t: 'sayi', v: f }; }
      if (x.t === 'ad') return { t: 'ad', ad: x.v };
      if (x.v === '(') {
        var e = karsilastirma();
        if (!opMi(')')) throw hata('ifade-hatasi', metin);
        i++;
        return e;
      }
      throw hata('ifade-hatasi', metin);
    }
    function tekli() {
      if (opMi('-')) { i++; return { t: 'eksi', a: tekli() }; }
      return birincil();
    }
    function carpim() {
      var sol = tekli();
      while (opMi('*') || opMi('/')) { var op = ize[i++].v; sol = { t: 'ikili', op: op, a: sol, b: tekli() }; }
      return sol;
    }
    function toplam() {
      var sol = carpim();
      while (opMi('+') || opMi('-')) { var op = ize[i++].v; sol = { t: 'ikili', op: op, a: sol, b: carpim() }; }
      return sol;
    }
    function karsilastirma() {
      var sol = toplam();
      var x = bak();
      if (x && x.t === 'op' && ['>', '<', '>=', '<=', '==', '!='].indexOf(x.v) >= 0) {
        i++;
        return { t: 'ikili', op: x.v, a: sol, b: toplam() };
      }
      return sol;
    }
    var kok = karsilastirma();
    if (i < ize.length) throw hata('ifade-hatasi', metin);
    onbellek[metin] = kok;
    return kok;
  }
  function adlar(dugum, kume) {
    if (dugum.t === 'ad') kume[dugum.ad] = true;
    else if (dugum.t === 'eksi') adlar(dugum.a, kume);
    else if (dugum.t === 'ikili') { adlar(dugum.a, kume); adlar(dugum.b, kume); }
    return kume;
  }
  function hesapla(dugum, ortam) {
    if (dugum.t === 'sayi') return dugum.v;
    if (dugum.t === 'ad') {
      if (!Object.prototype.hasOwnProperty.call(ortam, dugum.ad)) throw hata('tanimsiz-ad', dugum.ad);
      return ortam[dugum.ad];
    }
    if (dugum.t === 'eksi') return eksi(hesapla(dugum.a, ortam));
    var a = hesapla(dugum.a, ortam), b = hesapla(dugum.b, ortam);
    switch (dugum.op) {
      case '+': return topla(a, b);
      case '-': return cikar(a, b);
      case '*': return carp(a, b);
      case '/': return bol(a, b);
      case '>': return karsilastir(a, b) > 0;
      case '<': return karsilastir(a, b) < 0;
      case '>=': return karsilastir(a, b) >= 0;
      case '<=': return karsilastir(a, b) <= 0;
      case '==': return esit(a, b);
      case '!=': return !esit(a, b);
    }
    throw hata('ifade-hatasi');
  }
  function degerlendir(metin, ortam) {
    var s = hesapla(ayristir(metin), ortam || {});
    if (typeof s === 'boolean') throw hata('ifade-hatasi', 'sayi bekleniyordu: ' + metin);
    return s;
  }
  function kisitSaglanir(metin, ortam) {
    var s = hesapla(ayristir(metin), ortam);
    if (typeof s !== 'boolean') throw hata('ifade-hatasi', 'karsilastirma bekleniyordu: ' + metin);
    return s;
  }

  // ---- Şablon ----
  var YER = /\{([A-Za-z_][A-Za-z0-9_]*)\}/g;
  function yerTutucular(metin) {
    var o = [], m;
    YER.lastIndex = 0;
    while ((m = YER.exec(metin)) !== null) o.push(m[1]);
    return o;
  }
  function sabit(x) {
    var f = oku(typeof x === 'number' ? String(x) : x);
    if (!f) throw hata('gecersiz-parametre', String(x));
    return f;
  }
  function ornekle(spec, rng) {
    if (spec && Array.isArray(spec.degerler)) {
      if (!spec.degerler.length) throw hata('gecersiz-parametre', 'bos degerler');
      return sabit(spec.degerler[secim(rng, spec.degerler.length)]);
    }
    if (!spec || spec.min === undefined || spec.max === undefined) throw hata('gecersiz-parametre', 'min/max yok');
    var mn = sabit(spec.min), mx = sabit(spec.max), ad = spec.adim === undefined ? kesir(1) : sabit(spec.adim);
    if (isaret(ad) <= 0 || karsilastir(mx, mn) < 0) throw hata('gecersiz-parametre', 'aralik');
    var oran = bol(cikar(mx, mn), ad);
    var n = Math.floor(oran.p / oran.q);
    return topla(mn, carp(kesir(secim(rng, n + 1)), ad));
  }
  function metinSozlugu(sablon) {
    // yer tutucu içeren bütün metinler (statik denetim için)
    var m = [];
    (sablon.hikaye || []).forEach(function (s) { m.push(s); });
    ['istenen', 'kisa_hali'].forEach(function (k) { if (typeof sablon[k] === 'string') m.push(sablon[k]); });
    (sablon.vurgu || []).forEach(function (s) { m.push(s); });
    (sablon.ipuclari || []).forEach(function (s) { m.push(s); });
    (sablon.ucuncu_deneme || []).forEach(function (s) { m.push(s); });
    return m;
  }

  // Statik denetim: yapı, ifadeler, tanımsız adlar. Hata listesi döner (boşsa yapı temiz).
  function yapiDenetle(s) {
    var h = [];
    if (!s || typeof s !== 'object') return ['sablon-nesne-degil'];
    ['id', 'konu', 'istenen', 'cevap'].forEach(function (k) { if (typeof s[k] !== 'string' || !s[k]) h.push('eksik-alan: ' + k); });
    if (!Array.isArray(s.hikaye) || !s.hikaye.length) h.push('eksik-alan: hikaye');
    if (!s.parametreler || typeof s.parametreler !== 'object') h.push('eksik-alan: parametreler');
    if (!Array.isArray(s.celdiriciler) || s.celdiriciler.length < 3) h.push('en-az-3-celdirici');
    if (h.length) return h;
    var tanimli = Object.create(null);
    Object.keys(s.parametreler).forEach(function (ad) { tanimli[ad] = true; });
    var turetilen = s.turetilen || {};
    function ifadeDenetle(ifade, kapsam, etiket) {
      try {
        var k = adlar(ayristir(ifade), {});
        Object.keys(k).forEach(function (ad) { if (!kapsam[ad]) h.push('tanimsiz-ad: ' + ad + ' (' + etiket + ')'); });
      } catch (e) { h.push('ifade-hatasi: ' + etiket); }
    }
    
    Object.keys(turetilen).forEach(function (ad) {
      if (tanimli[ad]) h.push('ad-cakisiyor: ' + ad);
      ifadeDenetle(turetilen[ad], tanimli, 'turetilen ' + ad);
      tanimli[ad] = true;
    });
    (s.kisitlar || []).forEach(function (k, i) { ifadeDenetle(k, tanimli, 'kisit ' + i); });
    ifadeDenetle(s.cevap, tanimli, 'cevap');
    s.celdiriciler.forEach(function (c, i) {
      if (!c || typeof c.ifade !== 'string') h.push('celdirici-ifade-yok: ' + i);
      else ifadeDenetle(c.ifade, tanimli, 'celdirici ' + i);
      if (!c || !c.hata) h.push('celdirici-hata-turu-yok: ' + i);
    });
    metinSozlugu(s).forEach(function (m) {
      yerTutucular(m).forEach(function (ad) { if (!tanimli[ad]) h.push('tanimsiz-yer-tutucu: {' + ad + '}'); });
    });
    if (s.sekil) ['en', 'boy'].forEach(function (a) {
      if (s.sekil[a] !== undefined && !tanimli[s.sekil[a]]) h.push('sekil-tanimsiz-ad: ' + s.sekil[a]);
    });
    return h;
  }

  function doldur(metin, goster) {
    return metin.replace(YER, function (_, ad) { return goster[ad]; });
  }

  // Tek soru üretir; garantilerden biri bozulursa hata fırlatır (kod alanıyla).
  function uret(s, tohum, ayar) {
    ayar = ayar || {};
    var maxOnd = ayar.maxOndalik !== undefined ? ayar.maxOndalik : (s.max_ondalik !== undefined ? s.max_ondalik : 2);
    var mod = s.gosterim || 'ondalik';
    var rng = rastgele(tohum);
    var parametreAdlari = Object.keys(s.parametreler), turetAdlari = Object.keys(s.turetilen || {});
    var paramKume = Object.create(null); parametreAdlari.forEach(function (a) { paramKume[a] = true; });
    var kisitlar = (s.kisitlar || []).map(function (k) {
      var kume = adlar(ayristir(k), {}), sadece = true;
      Object.keys(kume).forEach(function (a) { if (!paramKume[a]) sadece = false; });
      return { ifade: k, once: sadece };
    });
    var env = null;
    for (var deneme = 0; deneme < 2000 && !env; deneme++) {
      var e = {};
      parametreAdlari.forEach(function (ad) { e[ad] = ornekle(s.parametreler[ad], rng); });
      var uygun = kisitlar.every(function (k) { return !k.once || kisitSaglanir(k.ifade, e); });
      if (!uygun) continue;
      turetAdlari.forEach(function (ad) { e[ad] = degerlendir(s.turetilen[ad], e); });
      uygun = kisitlar.every(function (k) { return k.once || kisitSaglanir(k.ifade, e); });
      if (uygun) env = e;
    }
    if (!env) throw hata('karsilanamaz-kisit');

    function goster(f, etiket) {
      var y = yaz(f, maxOnd, mod);
      if (y === null) throw hata('gosterilemez', etiket + ' = ' + f.p + '/' + f.q);
      if (f.p < 0 && !s.eksi_serbest) throw hata('eksi-deger', etiket + ' = ' + y);   // garanti (f): cevap/çeldirici eksi olamaz
      return y;
    }
    var cevap;
    try { cevap = degerlendir(s.cevap, env); } catch (x) { throw hata('cevap-tanimsiz', x.message); }
    var cevapMetni = goster(cevap, 'cevap');
    var secenekler = [{ f: cevap, metin: cevapMetni, hata: null, dogru: true }];
    s.celdiriciler.forEach(function (c, i) {
      var f;
      try { f = degerlendir(c.ifade, env); } catch (x) { throw hata('celdirici-tanimsiz', c.hata + ': ' + x.message); }
      secenekler.forEach(function (o) {
        if (esit(o.f, f)) throw hata(o.dogru ? 'celdirici-cevapla-ayni' : 'celdirici-celdiriciyle-ayni', c.hata);
      });
      secenekler.push({ f: f, metin: goster(f, 'celdirici ' + c.hata), hata: c.hata, dogru: false });
    });
    var gosterim = {};
    Object.keys(env).forEach(function (ad) {
      var y = yaz(env[ad], Math.max(maxOnd, 4), mod);
      gosterim[ad] = y === null ? yaz(env[ad], 4, 'kesir') : y;
    });
    var karisik = karistir(secenekler, rng).map(function (o, i) {
      return { harf: HARFLER[i], metin: o.metin, hata: o.hata, dogru: o.dogru };
    });
    var sekil = null;
    if (s.sekil) {
      sekil = { tip: s.sekil.tip, isaretli: (s.sekil.isaretli || []).slice() };
      Object.keys(s.sekil).forEach(function (k) {
        if (k !== 'tip' && k !== 'isaretli') sekil[k] = env[s.sekil[k]] ? sayiya(env[s.sekil[k]]) : s.sekil[k];
      });
    }
    return {
      sablon_id: s.id, konu: s.konu, konu_adi: s.konu_adi || null, zorluk: s.zorluk, adimlar: s.adimlar || [], tohum: String(tohum),
      degerler: gosterim,
      hikaye: s.hikaye.map(function (m) { return doldur(m, gosterim); }),
      vurgu: (s.vurgu || []).map(function (m) { return doldur(m, gosterim); }),
      istenen: doldur(s.istenen, gosterim),
      kisa_hali: s.kisa_hali ? doldur(s.kisa_hali, gosterim) : null,
      ipuclari: (s.ipuclari || []).map(function (m) { return doldur(m, gosterim); }),
      ucuncu_deneme: (s.ucuncu_deneme || []).map(function (m) { return doldur(m, gosterim); }),
      sekil: sekil, birim: s.birim || '',
      cevap_metni: cevapMetni,
      siklar: karisik
    };
  }

  // Çocuğa giden görünüm: hangi şıkkın doğru olduğu ve hata türleri yok.
  function genel(soru) {
    var g = {};
    Object.keys(soru).forEach(function (k) { g[k] = soru[k]; });
    delete g.cevap_metni;
    g.siklar = soru.siklar.map(function (o) { return { harf: o.harf, metin: o.metin }; });
    return g;
  }

  // Şablon doğrulama: yapı + 200 tohumla üretim (garantiler a-e). {ok, hatalar}
  function dogrula(s, ayar) {
    ayar = ayar || {};
    var n = ayar.deneme || 200;
    var h = yapiDenetle(s);
    if (h.length) return { ok: false, hatalar: h };
    var goruldu = {};
    for (var i = 1; i <= n; i++) {
      try {
        var q = uret(s, i, ayar);
        (s.vurgu || []).forEach(function (_, k) {
          var v = q.vurgu[k];
          if (!q.hikaye.some(function (c) { return c.indexOf(v) >= 0; })) goruldu['vurgu-hikayede-yok: ' + s.vurgu[k]] = true;
        });
      } catch (x) { goruldu[x.kod ? x.message : 'beklenmeyen: ' + x.message] = true; }
    }
    h = Object.keys(goruldu);
    return { ok: h.length === 0, hatalar: h };
  }
  // Şablon listesi yüklenirken: geçmeyen yüklenmez, raporlanır.
  function yukle(dizi, ayar) {
    var gecerli = [], reddedilen = [], idler = Object.create(null);
    (Array.isArray(dizi) ? dizi : [dizi]).forEach(function (s) {
      var d = dogrula(s, ayar);
      if (d.ok && idler[s.id]) d = { ok: false, hatalar: ['yinelenen-id'] };
      if (d.ok) { gecerli.push(s); idler[s.id] = true; } else reddedilen.push({ id: s && s.id, hatalar: d.hatalar });
    });
    return { gecerli: gecerli, reddedilen: reddedilen };
  }

  // Cevap kontrolü: girdi {sik:'B'} ya da {yazi:'1,5'}. Soru tohumdan yeniden üretilir (istemciye güvenilmez).
  function kontrol(s, tohum, girdi, ayar) {
    var q = uret(s, tohum, ayar);
    var dogru = q.siklar.filter(function (o) { return o.dogru; })[0];
    var cevapF = oku(q.cevap_metni) || oku(dogru.metin);
    var sonuc = { dogru: false, hata: null, gecerli: true, dogru_harf: dogru.harf, cevap_metni: q.cevap_metni };
    if (girdi && girdi.sik) {
      var o = q.siklar.filter(function (x) { return x.harf === String(girdi.sik).toUpperCase(); })[0];
      if (!o) { sonuc.gecerli = false; sonuc.hata = 'okunamadi'; return sonuc; }
      sonuc.dogru = !!o.dogru; sonuc.hata = o.dogru ? null : o.hata; sonuc.secilen = o.harf;
      return sonuc;
    }
    var f = oku(girdi && girdi.yazi);
    if (!f) { sonuc.gecerli = false; sonuc.hata = 'okunamadi'; return sonuc; }
    sonuc.secilen = String(girdi.yazi).slice(0, 40);
    if (esit(f, cevapF)) { sonuc.dogru = true; return sonuc; }
    var eslesen = q.siklar.filter(function (x) { var v = oku(x.metin); return !x.dogru && v && esit(v, f); })[0];
    sonuc.hata = eslesen ? eslesen.hata : 'diger';
    return sonuc;
  }

  return {
    SURUM: SURUM,
    kesir: kesir, topla: topla, cikar: cikar, carp: carp, bol: bol, esit: esit, karsilastir: karsilastir, sayiya: sayiya,
    oku: oku, yaz: yaz, esdeger: esdeger,
    rastgele: rastgele, karistir: karistir,
    ayristir: ayristir, degerlendir: degerlendir, kisitSaglanir: kisitSaglanir,
    yapiDenetle: yapiDenetle, dogrula: dogrula, yukle: yukle, uret: uret, genel: genel, kontrol: kontrol
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Motor;
