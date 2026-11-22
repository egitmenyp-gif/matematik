// Ekranın arka tarafı: iki ayrı bağlayıcı, aynı yüzey.
//  deneme(): model anahtarı yok; soru motoru tarayıcıda, "anladı" kararı basit kural, eğitmen sabit cümle (egitmen: null).
//  api(): Apps Script arka kapısı; her istek düz POST gövdesi (berberdeki gibi), kimlik = çocuğun kişiye özel jetonu.
// Yüzey (hepsi Promise): baslat() soru() anla(metin) cevapla(girdi) kaydet(kayit) ; durum() anlık sayaç bilgisi.
var Arka = (function () {
  'use strict';

  function deneme(Motor, sablonlar, ayar) {
    ayar = ayar || {};
    var blokDk = ayar.blok_dk || 35, molaDk = ayar.mola_dk || 10, gunlukDk = ayar.gunluk_dk || 120;
    var baslangic = Date.now(), sayac = 0, taban = ayar.tohum !== undefined ? ayar.tohum : baslangic;
    var kayitlar = [], tumSablonlar = sablonlar;
    var sinavListe = (ayar.mod === 'seviye' || ayar.mod === 'haftalik') ? (ayar.sinav || []) : null, sinavN = 0;   // önizleme: ?mod=seviye|haftalik (sunucusuz)
    var SINAV_BASLIK = { seviye: 'Seviye testi', haftalik: 'Haftalık sınav' };
    var SINAV_BITIS = { seviye: 'Teşekkürler! Nereden başlayacağımızı şimdi biliyorum. Yarın birlikte başlıyoruz.', haftalik: 'Teşekkürler! Bu haftanın yol haritasını çıkardım. Yarın kaldığımız yerden devam ediyoruz.' };
    var NOTR = 'Teşekkürler, şimdi şıklara bakalım.';
    if (ayar.sablon) sablonlar = sablonlar.filter(function (s) { return s.id === ayar.sablon; }); // önizleme: tek şablon
    function sablonBul(id) { return sablonlar.filter(function (s) { return s.id === id; })[0]; }
    var o = {
      mod: 'DENEME',
      kayitlar: kayitlar,
      baslat: function () {
        return Promise.resolve({ takma_ad: ayar.takma_ad || 'Kâşif', saat_bas: ayar.saat_bas || '17.00' });
      },
      soru: function () {
        if (sinavListe) {   // sınav sorusu: ipucu, kısa hâl ve 3. deneme yok
          if (sinavN >= sinavListe.length) return Promise.resolve({ ok: true, durum: 'bitti', mesaj: SINAV_BITIS[ayar.mod] });
          var sd = sinavListe[sinavN], ss = tumSablonlar.filter(function (x) { return x.id === sd.sablon_id; })[0];
          if (!ss) return Promise.reject(new Error('şablon yok'));
          var sq = Motor.genel(Motor.uret(ss, String(taban) + '-s' + (sinavN + 1)));
          delete sq.ipuclari; delete sq.kisa_hali; delete sq.ucuncu_deneme;
          sq.sira = sinavN + 1; sq.mod = ayar.mod;
          sq.sinav = { tur: ayar.mod, baslik: SINAV_BASLIK[ayar.mod], n: sinavN + 1, toplam: sinavListe.length };
          return Promise.resolve(sq);
        }
        var s = sablonlar[sayac % sablonlar.length];
        if (!s) return Promise.reject(new Error('şablon yok'));
        sayac++;
        var tohum = String(taban) + '-' + sayac;
        var q = Motor.genel(Motor.uret(s, tohum));
        q.sira = sayac;
        return Promise.resolve(q);
      },
      anla: function (metin) {
        if (sinavListe) return Promise.resolve({ anladi: 'evet', egitmen: NOTR });
        var kelime = String(metin || '').trim().split(/\s+/).filter(Boolean).length;
        return Promise.resolve({ anladi: kelime >= 3 ? 'evet' : kelime >= 1 ? 'kismen' : 'hayir', egitmen: null });
      },
      cevapla: function (g) {
        if (sinavListe) {   // yalnız "Kaydettim": doğru/yanlış, doğru şık ve hata türü dönmez
          var gec = Motor.kontrol(tumSablonlar.filter(function (x) { return x.id === g.sablon_id; })[0], g.tohum, g.sik ? { sik: g.sik } : { yazi: g.yazi }).gecerli;
          if (!gec) return Promise.resolve({ ok: true, gecerli: false });
          sinavN++;
          var bitti = sinavN >= sinavListe.length, c0 = { ok: true, gecerli: true, kaydedildi: true, sinav: { n: sinavN, toplam: sinavListe.length, bitti: bitti } };
          if (bitti) c0.bitis = SINAV_BITIS[ayar.mod];
          return Promise.resolve(c0);
        }
        var s = sablonBul(g.sablon_id);
        var r = Motor.kontrol(s, g.tohum, g.sik ? { sik: g.sik } : { yazi: g.yazi });
        // Doğru cevap HİÇ söylenmez; 3. yanlışta yalnız 'uc' işareti gider (ekran ucuncu_deneme adımlarını gösterir).
        var uc = r.gecerli && !r.dogru && (g.yanlis_sayisi || 0) + 1 >= 3;
        var c = { gecerli: r.gecerli, dogru: r.dogru, hata: r.hata, secilen: r.secilen, uc: uc };
        if (r.gecerli && r.dogru) c.dogru_harf = r.dogru_harf;
        return Promise.resolve(c);
      },
      kaydet: function (k) {
        k.zaman = new Date().toISOString();
        kayitlar.push(k);
        try { localStorage.setItem('matematik_deneme_kayit', JSON.stringify(kayitlar.slice(-200))); } catch (e) { /* yoksa sorun değil */ }
        return Promise.resolve({ ok: true });
      },
      durum: function () {
        var gecen = (Date.now() - baslangic) / 60000;
        return {
          blok_no: 1, blok_toplam: Math.max(1, Math.ceil(gunlukDk / (blokDk + molaDk))),
          blok_ilerleme: Math.min(1, gecen / blokDk), mola_dk_sonra: Math.max(0, Math.ceil(blokDk - gecen)), kapali: false
        };
      }
    };
    return o;
  }

  function api(adres, jeton, fetchFn) {
    var son = null;
    function gonder(islem, veri) {
      var b = Object.assign({ islem: islem, jeton: jeton }, veri || {});
      return fetchFn(adres, { method: 'POST', body: JSON.stringify(b) }).then(function (r) { return r.json(); }).then(function (c) {
        if (c && c.sure) son = c.sure;
        return c;
      });
    }
    return {
      mod: 'API',
      baslat: function () { return gonder('acilis'); },
      soru: function () { return gonder('soru'); },
      anla: function (metin, soru) { return gonder('anla', { metin: metin, sablon_id: soru && soru.sablon_id, tohum: soru && soru.tohum }); },
      anlamadim: function (soru, yanlis) { return gonder('anlamadim', { sablon_id: soru.sablon_id, tohum: soru.tohum, yanlis_sayisi: yanlis }); },
      cevapla: function (g) { return gonder('cevap', g); },
      kaydet: function (k) { return gonder('kayit', k); },
      durum: function () { return son || { blok_no: 1, blok_toplam: 3, blok_ilerleme: 0, mola_dk_sonra: 0, kapali: false }; }
    };
  }

  return { deneme: deneme, api: api };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Arka;
