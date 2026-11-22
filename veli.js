// Veli sayfası: PIN + onaylı cihaz girişi, bugün / konuşmalar / ayarlar. Metinler YALNIZ textContent ile basılır (çocuk yazısı güvenilmez, Madde 4.3).
// Sayılar sunucudan (betik) gelir; sayfa hesap yapmaz. MATEMATIK_API boşsa yalnız ?ornek=1 ile ÖRNEK VERİ gösterilir (şeritle belirtilir, Madde 3.1).
var Veli = (function () {
  var MESAJ = {
    pin: 'PIN yanlış.', kilitli: 'Çok fazla yanlış deneme. Biraz sonra tekrar deneyin.', pin_kisa: 'Kayıtlı PIN çok kısa; tablodaki menüden PIN\'i değiştirin.',
    kurulmadi: 'Sistem henüz kurulmamış.', yogun: 'Sistem meşgul, tekrar deneyin.', cihaz_kaldirildi: 'Bu telefonun izni kaldırılmış.', cihaz_cok: 'Çok fazla onay bekleyen telefon var. Tablodaki menüden gereksizleri kaldırın.',
    sunucu: 'Bir sorun oldu, tekrar deneyin.', ag: 'Bağlantı kurulamadı.'
  };
  var ALAN_ADI = { saat_bas: 'Başlangıç saati', saat_bit: 'Bitiş saati', blok_dk: 'Blok süresi (10-90 dk)', mola_dk: 'Mola (5-30 dk)', gunluk_dk: 'Günlük en çok (15-240 dk)', veli_eposta: 'E-posta', gece_saat: 'Gönderim saati (17-23, çalışma bitişinden sonra)', takma_ad: 'Takma ad (2-20 harf)', ilgi_alani: 'İlgi alanı (kişisel bilgi olmadan)', okul_konusu: 'Okuldaki konu' };
  var DURUM_ADI = { bilinmiyor: 'Henüz bilinmiyor', eksik: 'Eksik var', calisiliyor: 'Çalışılıyor', saglam: 'Sağlam' };

  /** depo: {al(k), yaz(k,v), sil(k)}; fetchFn: fetch benzeri. Her çağrıya cihaz anahtarı + günlük jeton eklenir. */
  function api(adres, fetchFn, depo) {
    function gonder(islem, ek) {
      var b = Object.assign({ islem: islem, cihaz: depo.al('cihaz') || undefined, jeton: depo.al('jeton') || undefined }, ek || {});
      return fetchFn(adres, { method: 'POST', body: JSON.stringify(b) }).then(function (r) { return r.json(); }).then(function (c) {
        if (c && c.cihaz && !c.ok) depo.yaz('cihaz', c.cihaz);       // yeni telefon: sunucunun verdiği anahtar saklanır
        if (c && c.hata === 'oturum') depo.sil('jeton');
        return c || { ok: false, hata: 'sunucu' };
      }, function () { return { ok: false, hata: 'ag' }; });
    }
    return {
      giris: function (pin) {
        return gonder('veli_giris', { pin: pin, cihazAd: 'Telefon' }).then(function (c) { if (c.ok && c.jeton) depo.yaz('jeton', c.jeton); return c; });
      },
      cikis: function () { return gonder('veli_cikis').then(function (c) { depo.sil('jeton'); return c; }); },
      jetonVar: function () { return !!depo.al('jeton') && !!depo.al('cihaz'); },
      bugun: function () { return gonder('veli_bugun'); },
      konusma: function (t) { return gonder('veli_konusma', t ? { tarih: t } : {}); },
      ilerleme: function () { return gonder('veli_ilerleme'); },
      ayarOku: function () { return gonder('veli_ayar_oku'); },
      ayarYaz: function (a) { return gonder('veli_ayar_yaz', { ayar: a }); }
    };
  }

  /** Örnek veri (yalnız görünüm için; ?ornek=1). Çocuk mesajlarından biri bilerek HTML içerir: metin olarak görünmeli. */
  function ornek() {
    var gunler = [{ tarih: '2026-11-19', mesaj: 6, uyari: 1 }, { tarih: '2026-11-18', mesaj: 4, uyari: 0 }, { tarih: '2026-11-17', mesaj: 0, uyari: 0 }];
    var konular = [{ id: 'dogal-sayilar', ad: 'Doğal sayılar' }, { id: 'kesirler', ad: 'Kesirler' }, { id: 'ondalik', ad: 'Ondalık gösterim' }, { id: 'yuzde', ad: 'Yüzde' }];
    var ayar = { okul_konusu: '', saat_bas: '17.00', saat_bit: '19.00', blok_dk: '35', mola_dk: '10', gunluk_dk: '120', veli_eposta: 'veli@ornek.com', gece_saat: '21', takma_ad: 'Kâşif', ilgi_alani: 'futbol' };
    var onayli = false, ok = function (x) { return Promise.resolve(Object.assign({ ok: true }, x)); };
    return {
      ornek: true, jetonVar: function () { return true; },
      giris: function (pin) {   // örnek giriş: 123456 → önce kod ekranı, ikincide içeri; başka PIN yanlış
        if (pin !== '123456') return Promise.resolve({ ok: false, hata: 'pin' });
        if (!onayli) { onayli = true; return Promise.resolve({ ok: false, hata: 'cihaz_onayi', kod: '4821' }); }
        return ok({});
      }, cikis: function () { return ok({}); },
      bugun: function () {
        return ok({ takma_ad: 'Kâşif', bugun: { dakika: 42, soru_sayisi: 9, dogru: 7, ilk_denemede_dogru: 5, dogru_yuzde: 78 }, uyari_sayisi: 1,
          gece: { tarih: '2026-11-18', kaynak: 'model', ozet: 'Kesirlerde iyi gidiyor; çarpmada işlem sırasını karıştırıyor.',
            govde: 'Bugün Kâşif 42 dakika çalıştı ve 9 soru çözdü, 7 tanesini doğru yaptı. Yarın çarpma işlemine yakın kolay sorular çözeceğiz.' } });
      },
      konusma: function (t) {
        var r = { gunler: gunler };
        if (t) {
          r.tarih = t; r.uyarilar = t === '2026-11-19' ? [{ saat: '17:52', kaynak: 'cocuk mesajı', neden: 'anahtar kelime' }] : [];
          r.mesajlar = [{ saat: '17:40', kim: 'cocuk', metin: 'toplam kaç watt harcadığını soruyor' }, { saat: '17:40', kim: 'egitmen', metin: 'Güzel! Hangi cümleye bakacaksın?' },
            { saat: '17:52', kim: 'cocuk', metin: '<img src=x onerror=alert(1)> çok korkuyorum' }];
        }
        return ok(r);
      },
      ilerleme: function () {
        return ok({ okul_konusu: ayar.okul_konusu, sinavlar: [{ tarih: '2026-11-13', tur: 'seviye', puan: '7/12' }, { tarih: '2026-11-20', tur: 'haftalik', puan: '9/12' }],
          konular: [{ konu: 'dogal-sayilar', ad: 'Doğal sayılar', durum: 'saglam', sinavlar: [{ dogru: 2, toplam: 2 }, { dogru: 2, toplam: 2 }] },
            { konu: 'kesirler', ad: 'Kesirler', durum: 'calisiliyor', sinavlar: [{ dogru: 1, toplam: 2 }, { dogru: 2, toplam: 2 }] },
            { konu: 'ondalik', ad: 'Ondalık gösterim', durum: 'eksik', sinavlar: [{ dogru: 0, toplam: 1 }, null] },
            { konu: 'yuzde', ad: 'Yüzde', durum: 'bilinmiyor', sinavlar: [null, null] }] });
      },
      ayarOku: function () { return ok({ ayar: ayar, konular: konular }); },
      ayarYaz: function (a) {
        var ak = Object.keys(a), kotu = ak.filter(function (k) { return k === 'blok_dk' && !(Number(a[k]) >= 10 && Number(a[k]) <= 90) || k === 'okul_konusu' && a[k] !== '' && !konular.some(function (x) { return x.id === a[k]; }); })[0];
        if (kotu) return Promise.resolve({ ok: false, hata: 'gecersiz', alan: kotu });
        Object.assign(ayar, a); return ok({ ayar: ayar });
      }
    };
  }

  function tarihYazi(t) {
    var g = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'], a = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    var p = String(t).split('-'), d = new Date(Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2])));
    return Number(p[2]) + ' ' + a[Number(p[1]) - 1] + ' ' + g[d.getUTCDay()];
  }

  function arayuz(A) {
    var $ = function (id) { return document.getElementById(id); };
    function metin(id, m) { $(id).textContent = m; }
    function goster(id, g) { $(id).hidden = !g; }
    function hataGoster(id, m) { metin(id, m); goster(id, !!m); }
    function oge(etiket, sinif, m) { var e = document.createElement(etiket); if (sinif) e.className = sinif; if (m !== undefined) e.textContent = m; return e; }

    function girisEkrani(aciklama) { goster('girisEkran', true); goster('uygulama', false); goster('kodKutu', false); goster('girisForm', true); if (aciklama) metin('girisAciklama', aciklama); }
    function uygulamaAc() { goster('girisEkran', false); goster('uygulama', true); sekme('bugun'); }
    function oturumDustu() { $('pin').value = ''; girisEkrani('Oturum bitti. PIN\'inizi girin.'); }
    function hataMetni(c) { return MESAJ[c.hata] || MESAJ.sunucu; }

    $('girisForm').addEventListener('submit', function (e) {
      e.preventDefault(); hataGoster('girisHata', '');
      var pin = $('pin').value.trim(); if (!pin) { hataGoster('girisHata', 'PIN\'i yazın.'); return; }
      A.giris(pin).then(function (c) {
        $('pin').value = '';
        if (c.ok) return uygulamaAc();
        if (c.hata === 'cihaz_onayi' || c.hata === 'cihaz_bekliyor') { metin('kod', c.kod || '----'); goster('girisForm', false); goster('kodKutu', true); return; }
        hataGoster('girisHata', hataMetni(c));
      });
    });
    $('kodTamam').addEventListener('click', function () {
      $('girisAciklama').textContent = 'Onayladıysanız PIN\'inizi yeniden girin.'; goster('kodKutu', false); goster('girisForm', true);
    });
    $('cikis').addEventListener('click', function () { A.cikis().then(function () { girisEkrani('Çıkış yapıldı. PIN\'inizi girin.'); }); });

    function sekme(ad) {
      Array.prototype.forEach.call(document.querySelectorAll('.sekme'), function (b) { b.classList.toggle('secili', b.getAttribute('data-sekme') === ad); });
      ['bugun', 'ilerleme', 'konusma', 'ayar'].forEach(function (x) { goster('bolum-' + x, x === ad); });
      if (ad === 'bugun') bugunYukle(); else if (ad === 'ilerleme') ilerlemeYukle(); else if (ad === 'konusma') gunlerYukle(); else ayarYukle();
    }
    Array.prototype.forEach.call(document.querySelectorAll('.sekme'), function (b) { b.addEventListener('click', function () { sekme(b.getAttribute('data-sekme')); }); });
    function yetkisiz(c) { if (c && c.ok === false && (c.hata === 'oturum' || c.hata === 'pin')) { oturumDustu(); return true; } return false; }

    function bugunYukle() {
      A.bugun().then(function (c) {
        if (yetkisiz(c)) return;
        if (!c.ok) { metin('sNot', hataMetni(c)); return; }
        metin('baslik', c.takma_ad + ' için veli sayfası');
        metin('sDakika', c.bugun.dakika); metin('sSoru', c.bugun.soru_sayisi); metin('sDogru', c.bugun.dogru);
        metin('sDogruEtiket', 'doğru' + (c.bugun.soru_sayisi ? ' (%' + c.bugun.dogru_yuzde + ')' : ''));
        metin('sNot', 'Bu sayılar bugünün kayıtlarından hesaplanır, tahmin değildir.');
        var u = $('uyariKutu'); goster('uyariKutu', c.uyari_sayisi > 0);
        if (c.uyari_sayisi > 0) u.textContent = 'Son 30 günde ' + c.uyari_sayisi + ' kez üzgün/endişeli bir işaret alındı. Konuşmalar bölümünden bakabilirsiniz.';
        var k = $('geceKart'); k.textContent = '';
        if (c.gece) {
          k.appendChild(oge('p', 'soluk', tarihYazi(c.gece.tarih) + ' gecesi' + (c.gece.kaynak === 'sade' ? ' (yalnız sayılar)' : '')));
          if (c.gece.ozet) k.appendChild(oge('p', '', c.gece.ozet));
          if (c.gece.govde) k.appendChild(oge('p', '', c.gece.govde));
        } else k.appendChild(oge('p', 'soluk', 'Henüz gece değerlendirmesi yapılmadı.'));
      });
    }

    function ilerlemeYukle() {
      A.ilerleme().then(function (c) {
        if (yetkisiz(c)) return;
        var l = $('ilerlemeListe'); l.textContent = '';
        if (!c.ok) { metin('ilerlemeNot', hataMetni(c)); return; }
        var okul = (c.konular || []).filter(function (x) { return x.konu === c.okul_konusu; })[0];
        metin('ilerlemeNot', okul ? 'Okulda şu an: ' + okul.ad + '. Çalışmalar buna göre sıralanır.' : 'Okuldaki konuyu Ayarlar bölümünden seçebilirsiniz; seçilmezse konular sırayla çalışılır.');
        var sv = c.sinavlar || [];
        metin('ilerlemeSinav', sv.length ? 'Son sınavlar: ' + sv.map(function (x) { return tarihYazi(x.tarih).split(' ').slice(0, 2).join(' ') + (x.tur === 'seviye' ? ' (seviye)' : ' (haftalık)'); }).join(' · ') : 'Henüz sınav yapılmadı.');
        (c.konular || []).forEach(function (x) {
          var k = oge('div', 'konu' + (x.konu === c.okul_konusu ? ' okulda' : ''));
          k.appendChild(oge('b', '', x.ad));
          k.appendChild(oge('span', 'durum d-' + (DURUM_ADI[x.durum] ? x.durum : 'bilinmiyor'), DURUM_ADI[x.durum] || DURUM_ADI.bilinmiyor));
          var oranlar = (x.sinavlar || []).map(function (o) { return o ? o.dogru + '/' + o.toplam : '–'; });
          if (oranlar.some(function (o) { return o !== '–'; })) k.appendChild(oge('small', 'soluk', 'Sınavlarda: ' + oranlar.join(' · ')));
          l.appendChild(k);
        });
      });
    }

    function gunlerYukle() {
      goster('gunDetay', false); goster('gunListe', true); goster('gunListeBaslik', true);
      A.konusma().then(function (c) {
        if (yetkisiz(c)) return;
        var l = $('gunListe'); l.textContent = '';
        if (!c.ok || !c.gunler.length) { l.appendChild(oge('p', 'soluk', c.ok ? 'Son 30 günde konuşma yok.' : hataMetni(c))); return; }
        c.gunler.forEach(function (g) {
          var b = oge('button', 'gun'); b.type = 'button';
          b.appendChild(oge('span', '', tarihYazi(g.tarih) + ' · ' + g.mesaj + ' mesaj'));
          if (g.uyari) b.appendChild(oge('span', 'rozet', '⚠ ' + g.uyari + ' uyarı'));
          b.addEventListener('click', function () { gunAc(g.tarih); });
          l.appendChild(b);
        });
      });
    }
    function gunAc(t) {
      A.konusma(t).then(function (c) {
        if (yetkisiz(c)) return;
        goster('gunListe', false); goster('gunListeBaslik', false); goster('gunDetay', true); metin('gunBaslik', tarihYazi(t));
        var u = $('uyariListe'); u.textContent = '';
        (c.uyarilar || []).forEach(function (x) { u.appendChild(oge('div', 'uyari-kutu', '⚠ ' + x.saat + ' · ' + x.kaynak + ' (' + x.neden + ')')); });
        var m = $('mesajListe'); m.textContent = '';
        if (!(c.mesajlar || []).length) m.appendChild(oge('p', 'soluk', 'Bu gün kayıtlı mesaj yok.'));
        (c.mesajlar || []).forEach(function (x) {
          var b = oge('div', 'balon ' + (x.kim === 'cocuk' ? 'cocuk' : 'egitmen'));
          b.appendChild(oge('small', '', x.saat + ' · ' + (x.kim === 'cocuk' ? 'çocuk' : 'eğitmen')));
          b.appendChild(document.createTextNode(x.metin));
          m.appendChild(b);
        });
      });
    }
    $('gunGeri').addEventListener('click', function () { goster('gunDetay', false); goster('gunListe', true); goster('gunListeBaslik', true); });

    function ayarYukle() {
      goster('ayarTamam', false); hataGoster('ayarHata', '');
      A.ayarOku().then(function (c) {
        if (yetkisiz(c)) return;
        if (!c.ok) { hataGoster('ayarHata', hataMetni(c)); return; }
        var sec = $('a_okul_konusu'); sec.textContent = '';
        var bos = oge('option', '', 'Bilmiyorum / boş'); bos.value = ''; sec.appendChild(bos);
        (c.konular || []).forEach(function (x) { var o = oge('option', '', x.ad); o.value = x.id; sec.appendChild(o); });
        Object.keys(c.ayar).forEach(function (k) { var i = $('a_' + k); if (i) { i.value = c.ayar[k]; i.classList.remove('gecersiz'); } });
      });
    }
    $('ayarForm').addEventListener('submit', function (e) {
      e.preventDefault(); goster('ayarTamam', false); hataGoster('ayarHata', '');
      var a = {}; Array.prototype.forEach.call($('ayarForm').querySelectorAll('input, select'), function (i) { i.classList.remove('gecersiz'); a[i.name] = i.value.trim(); });
      A.ayarYaz(a).then(function (c) {
        if (yetkisiz(c)) return;
        if (c.ok) { goster('ayarTamam', true); return; }
        var i = c.alan && $('a_' + c.alan); if (i) i.classList.add('gecersiz');
        hataGoster('ayarHata', c.hata === 'gecersiz' ? 'Kaydedilmedi: ' + (ALAN_ADI[c.alan] || 'bir alan') + ' geçerli değil.' : hataMetni(c));
      });
    });

    if (A.ornek) { goster('ornekSerit', true); if (/[?&]giris=1\b/.test(location.search)) girisEkrani(); else uygulamaAc(); }
    else if (A.jetonVar()) { uygulamaAc(); }
    else girisEkrani();
  }

  function baslat() {
    var adres = window.MATEMATIK_API, ornekIstegi = /[?&]ornek=1\b/.test(location.search), depo = {
      al: function (k) { try { return localStorage.getItem('matematik_veli_' + k); } catch (e) { return null; } },
      yaz: function (k, v) { try { localStorage.setItem('matematik_veli_' + k, v); } catch (e) { /* kapalıysa her seferinde PIN sorulur */ } },
      sil: function (k) { try { localStorage.removeItem('matematik_veli_' + k); } catch (e) { /* önemli değil */ } }
    };
    if (!adres) {
      if (!ornekIstegi) { document.body.textContent = 'Veli sayfası henüz bağlı değil (ayar.js içinde API adresi boş). Görünümü görmek için adresin sonuna ?ornek=1 ekleyin.'; return; }
      return arayuz(ornek());
    }
    arayuz(api(adres, function (u, s) { return fetch(u, s); }, depo));
  }

  return { api: api, ornek: ornek, arayuz: arayuz, baslat: baslat, tarihYazi: tarihYazi };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Veli;
else if (typeof document !== 'undefined') Veli.baslat();
