(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var GUNLER = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  // Eğitmen sabit cümleleri: DENEME modunda bunlar konuşur; model bağlıyken de cevap gelmezse yedek olarak durur.
  var SABIT = {
    giris: 'Önce hikâyeyi oku. Önemli gördüğün yerlere dokun, işaretlensin.',
    istenen: 'Şimdi söyle bakalım: burada ne isteniyor? Kendi cümlenle yaz.',
    bosIstenen: 'Önce ne istendiğini kendi cümlenle yaz, sonra şıklar açılır.',
    kisa: 'Biraz daha açar mısın? Bir iki kelime daha ekle.',
    anladi: 'Tam olarak bu! 👏 Şimdi şıklara bak.',
    kismen: 'Şıkları açıyorum. Soruya bir daha bakarak seç.',
    dogru: '✓ Doğru! Aferin sana.',
    yanlis: '↺ Henüz değil. ',
    cozum: 'Birlikte kuralım. ',
    digerKonu: 'Şimdi bu sorunun içindeyiz. Takıldıysan İpucu ya da Anlamadım düğmesine bas.',
    ipucuBitti: 'Başka ipucum kalmadı. Anlamadım düğmesine basarsan başka türlü anlatırım.',
    anlamadim: 'Tamam, başka türlü anlatayım. Önce hangi sayıları bildiğimizi say, sonra neyin sorulduğuna bak: ',
    bugunBitti: 'Bugünlük bitti. Yarın görüşürüz!',
    sinavNotr: 'Teşekkürler, şimdi şıklara bakalım.',
    sayiIstenen: 'Bu bir cevaba benziyor. Cevabı birazdan şıklarda seçeceksin. Şimdi sorunun senden ne istediğini kendi cümlenle yaz. Örneğin: "Toplam kaç lira ödendiğini soruyor."',
    molaMetin: 'Biraz kalk, su iç, gözlerini dinlendir. Süre bitince buradan devam ederiz.',
    molaBitti: 'Mola bitti! Hazır olunca Devam et düğmesine bas.',
    kaydettim: 'Kaydettim, sıradakine geçelim.'
  };

  var arka, q, durum, sinavMi = false;   // sinavMi: seviye testi / haftalık sınav (doğru-yanlış, ipucu, kısa hâl yok)
  var model = { asama: 'bekle', cumle: 0, okumaBas: 0, okumaSn: 0, ipucu: 0, yanlis: 0, istenenMetin: '', anladi: null, kisaDeneme: 0, soruBas: 0, istenenSes: false };

  function mesaj(metin, tur) {
    var d = document.createElement('div');
    d.className = 'b ' + (tur || 'e');
    d.textContent = metin;
    $('akis').appendChild(d);
    $('akis').scrollTop = $('akis').scrollHeight;
    return d;
  }
  function yazmaAc(acik, yerTutucu) {
    $('giris').disabled = !acik; $('gonder').disabled = !acik;
    if (yerTutucu) $('giris').placeholder = yerTutucu;
    if (acik) $('giris').focus();
  }
  function dugmeler(acik) { ['dIpucu', 'dAnlamadim', 'dKisa'].forEach(function (i) { $(i).disabled = !acik; }); }

  function zamanYaz() {
    var d = new Date(), s = d.getHours() + '.' + ('0' + d.getMinutes()).slice(-2);
    $('zaman').textContent = GUNLER[d.getDay()] + ' · ' + s;
  }
  function sayacYaz() {
    var s = arka.durum();
    var n = $('noktalar'); n.textContent = '';
    for (var i = 1; i <= s.blok_toplam; i++) {
      var e = document.createElement('span');
      e.className = 'nokta' + (i < s.blok_no ? ' dolu' : '');
      if (i === s.blok_no) e.style.background = 'linear-gradient(90deg,var(--notr) ' + Math.round(s.blok_ilerleme * 100) + '%,var(--cizgi) ' + Math.round(s.blok_ilerleme * 100) + '%)';
      n.appendChild(e);
      n.appendChild(document.createTextNode(' '));
    }
    $('blokNo').textContent = s.blok_no + '. bölüm';
    $('mola').textContent = '☕ Mola: ' + s.mola_dk_sonra + ' dk sonra';
    if (s.kapali) kapaliGoster(s);
  }
  // Sunucu "kapalı" dediğinde: mola ise geri sayım + Devam düğmesi; değilse günün sonu (ya da erken) perdesi.
  function kapaliGoster(s, mesajYedek) {
    s = s || {};
    if (s.neden === 'mola') { molaPerdesi(s); return; }
    var m = s.mesaj || mesajYedek || SABIT.bugunBitti;
    perde(s.neden === 'pencere' && /erken/i.test(m) ? 'Biraz erken' : 'Bugünlük bitti', m, null);
  }
  var mola = { durum: null, bitis: 0, zaman: null };
  function molaPerdesi(s) {
    if (s === mola.durum) return;   // aynı sunucu cevabı: sayaç baştan başlamaz (bitmiş molayı da yeniden açmaz)
    mola.durum = s;
    var kalan = Number(s.mola_kalan_sn);
    if (!(kalan >= 0)) { var dk = /(\d+)\s*dakika/.exec(s.mesaj || ''); kalan = dk ? Number(dk[1]) * 60 : 600; }
    mola.bitis = Date.now() + kalan * 1000;
    perde('Mola zamanı ☕', SABIT.molaMetin, 'Devam et ▸', molaSonu);
    var sayac = document.createElement('span'); sayac.className = 'sayac'; sayac.id = 'molaSayac';
    $('perdeMetin').appendChild(sayac);
    var b = $('perdeDugme');
    var tik = function () {
      var sn = Math.max(0, Math.ceil((mola.bitis - Date.now()) / 1000));
      sayac.textContent = Math.floor(sn / 60) + ':' + ('0' + (sn % 60)).slice(-2);
      b.disabled = sn > 0;
      if (sn <= 0) { clearInterval(mola.zaman); mola.zaman = null; $('perdeMetin').firstChild.textContent = SABIT.molaBitti; b.focus(); }
    };
    tik(); if (!b.disabled) return;
    mola.zaman = setInterval(tik, 1000);
  }
  function molaSonu() {
    // Soru yarımdaysa aynı sorudan sürer; soru bittiyse (ya da hiç yoksa) sıradaki istenir. Sunucu hâlâ mola derse perde yeniden gelir.
    if (!q || model.asama === 'bitti') yeniSoru();
  }
  function perde(baslik, metin, dugme, tikla) {
    $('perdeBaslik').textContent = baslik; $('perdeMetin').textContent = metin;
    var b = $('perdeDugme');
    if (mola.zaman) { clearInterval(mola.zaman); mola.zaman = null; }   // yeni perde eski mola sayacını durdurur
    b.disabled = false;
    b.hidden = !dugme; if (dugme) b.textContent = dugme;
    b.onclick = function () { $('perde').hidden = true; if (tikla) tikla(); };
    $('perde').hidden = false;
  }

  // ---- Hikâye: cümle cümle, vurgulanabilir parçalar ----
  function cumleEkle(metin, istenen) {
    var span = document.createElement('span');
    span.className = 'cumle';
    var kalan = metin, vurgular = (q.vurgu || []).filter(function (v) { return metin.indexOf(v) >= 0; });
    function parcala(p, dugumler) {
      var sira = null, bulunan = null;
      vurgular.forEach(function (v) { var i = p.indexOf(v); if (i >= 0 && (sira === null || i < sira)) { sira = i; bulunan = v; } });
      if (sira === null) { dugumler.push(document.createTextNode(p)); return; }
      if (sira > 0) dugumler.push(document.createTextNode(p.slice(0, sira)));
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'isaret'; b.textContent = bulunan;
      b.addEventListener('click', function () { b.classList.toggle('acik'); });
      var rest = p.slice(sira + bulunan.length), noktalama = /^[.,;:!?)"”’»…]+/.exec(rest);
      if (noktalama) {   // vurgulu parça ile bitişik noktalama aynı satırda kalsın (düğme bölünemez kutu olduğundan satır sonunda yalnız kalırdı)
        var kap = document.createElement('span');
        kap.className = 'bitisik'; kap.appendChild(b); kap.appendChild(document.createTextNode(noktalama[0]));
        dugumler.push(kap); rest = rest.slice(noktalama[0].length);
      } else dugumler.push(b);
      parcala(rest, dugumler);
    }
    var dugumler = [];
    if (istenen) { var i = document.createElement('span'); i.className = 'istenen'; i.textContent = metin; dugumler.push(i); }
    else parcala(kalan, dugumler);
    dugumler.forEach(function (d) { span.appendChild(d); });
    $('hikaye').appendChild(span);
  }
  function tumCumleler() { return q.hikaye.concat([q.istenen]); }
  function sonrakiCumle() {
    var hepsi = tumCumleler();
    if (model.cumle === 0) model.okumaBas = Date.now();
    cumleEkle(hepsi[model.cumle], model.cumle === hepsi.length - 1);
    model.cumle++;
    if (model.cumle >= hepsi.length) {
      $('devam').hidden = true;
      model.okumaSn = Math.round((Date.now() - model.okumaBas) / 1000);
      istenenAsamasi();
    }
  }

  function istenenAsamasi() {
    model.asama = 'istenen';
    mesaj(SABIT.istenen);
    yazmaAc(true, 'Burada ne isteniyor? Kendi cümlenle yaz…');
    dugmeler(true);
  }

  function siklariCiz(acik) {
    var kap = $('siklar'); kap.textContent = '';
    q.siklar.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'sik' + (acik ? '' : ' kilitli'); b.dataset.harf = s.harf;
      b.disabled = !acik;
      var h = document.createElement('b'); h.textContent = s.harf;
      b.appendChild(h);
      b.appendChild(document.createTextNode(acik ? s.metin + (q.birim ? ' ' + q.birim : '') : '🔒'));
      b.addEventListener('click', function () { cevapVer({ sik: s.harf }, b); });
      kap.appendChild(b);
    });
    $('kilit').className = 'kilit';
    $('kilit').textContent = acik ? 'Şıklar açıldı, çünkü ne istendiğini kendi cümlenle söyledin.' : 'Şıklar, ne istendiğini kendi cümlenle yazınca açılır.';
  }

  function soruCiz(soru) {
    q = soru;
    sinavMi = !!(q.sinav && q.mod && q.mod !== 'ders');
    $('dIpucu').hidden = $('dKisa').hidden = sinavMi;   // sınavda ipucu ve kısa hâl düğmeleri görünmez
    model = { asama: 'okuma', cumle: 0, okumaBas: 0, okumaSn: 0, ipucu: 0, yanlis: 0, istenenMetin: '', anladi: null, kisaDeneme: 0, sayiUyari: 0, soruBas: Date.now() };
    $('etiket').textContent = sinavMi ? q.sinav.baslik + ' · Soru ' + q.sinav.n + '/' + q.sinav.toplam : 'Soru ' + (q.sira || '') + ' · ' + (q.konu_adi || '');
    $('hikaye').textContent = '';
    $('sekil').innerHTML = Sekil.ciz(q.sekil, durum.takma_ad);
    $('soruKart').classList.toggle('sekilsiz', !$('sekil').firstChild);   // şekilsiz soruda hikâye büyür ve ortalanır (boşluk kalmaz)
    $('sonraki').hidden = true;
    $('devam').hidden = false;
    siklariCiz(false);
    yazmaAc(false, 'Önce hikâyeyi oku…');
    dugmeler(false);
    mesaj(SABIT.giris);
    sonrakiCumle();
  }

  function yeniSoru() {
    arka.soru().then(function (c) {
      if (c && c.durum === 'bitti') { kapaliGoster(c.sure, c.mesaj); return; }
      soruCiz(c);
      sayacYaz();
      anlatimGerekirse(tanitimGerekirse);
    });
  }

  // ---- Çocuğun yazdığı ----
  function gonder(metin) {
    metin = metin.trim().slice(0, 300);
    if (!metin) { if (model.asama === 'istenen') mesaj(SABIT.bosIstenen); return; }
    mesaj(metin, 'c');
    if (model.asama === 'istenen') {
      // "Ne isteniyor?" kutusuna yalnız sayı yazıldıysa bir kez nazikçe hatırlat (22.11 testi: çocuk 6. sorudan sonra cevabı yazdı).
      // Cevabın doğruluğu hakkında bir şey söylemez; sınavda da aynı cümle. İkinci kez yine sayı yazarsa geçilir.
      if (model.sayiUyari < 1 && Motor.oku(metin) !== null) { model.sayiUyari++; mesaj(SABIT.sayiIstenen); return; }
      model.istenenMetin = metin;
      arka.anla(metin, { sablon_id: q.sablon_id, tohum: q.tohum }).then(function (c) {
        var anladi = c && c.anladi ? c.anladi : 'kismen';
        if (!sinavMi && anladi !== 'evet' && model.kisaDeneme < 1 && Motor.oku(metin) === null && metin.split(/\s+/).length < 3) {
          model.kisaDeneme++;
          mesaj((c && c.egitmen) || SABIT.kisa);
          return;
        }
        model.anladi = anladi;
        if (sinavMi) mesaj((c && c.egitmen) || SABIT.sinavNotr);   // sınavda çocuğa her zaman sabit nötr cümle
        else mesaj((c && c.egitmen) || (anladi === 'evet' ? SABIT.anladi : SABIT.kismen));
        model.asama = 'cevap';
        siklariCiz(true);
        yazmaAc(true, 'Cevabını ya da sorunu yaz…');
      });
      return;
    }
    if (model.asama === 'cevap') {
      if (Motor.oku(metin) !== null) { cevapVer({ yazi: metin }, null); return; }
      mesaj(SABIT.digerKonu);
    }
  }

  function cevapVer(girdi, dugme) {
    if (model.asama !== 'cevap') return;
    var istek = { sablon_id: q.sablon_id, tohum: q.tohum, yanlis_sayisi: model.yanlis, okuma_sn: model.okumaSn, sure_sn: Math.round((Date.now() - model.soruBas) / 1000) };
    if (girdi.sik) istek.sik = girdi.sik; else istek.yazi = girdi.yazi;
    arka.cevapla(istek).then(function (c) {
      var gecen = Math.round((Date.now() - model.soruBas) / 1000);
      if (!c.gecerli) { mesaj('Bunu cevap olarak okuyamadım. Bir sayı yazar mısın?'); return; }
      if (sinavMi) { sinavCevabi(c, dugme); return; }   // sınavda sunucu cevabı kendisi yazar; ekran doğru/yanlış göstermez
      arka.kaydet({
        sablon_id: q.sablon_id, tohum: q.tohum, okuma_sn: model.okumaSn, istenen_metin: model.istenenMetin, anladi: model.anladi,
        secilen: c.secilen || girdi.sik || girdi.yazi, dogru: c.dogru ? 'E' : 'H', hata: c.hata || '', ipucu: model.ipucu, sure_sn: gecen
      });
      if (c.dogru) {
        model.asama = 'bitti';
        if (dugme) dugme.classList.add('dogru');
        else dogruSikiIsaretle(c.dogru_harf);
        $('kilit').className = 'kilit dogru'; $('kilit').textContent = '✓ Doğru cevap';
        mesaj((c.egitmen) || SABIT.dogru, 'dogru');
        bitir();
        return;
      }
      model.yanlis++;
      if (dugme) { dugme.classList.add('tekrar'); dugme.disabled = true; dugme.lastChild.textContent = '↺ ' + dugme.lastChild.textContent; }
      if (c.uc && !model.ucGosterildi) {
        // Cevap söylenmez: adımlar sırayla gösterilir, şıklar açık kalır, çocuk doğruyu kendisi seçer.
        model.ucGosterildi = true;
        var adimlar = (q.ucuncu_deneme && q.ucuncu_deneme.length) ? q.ucuncu_deneme : (q.ipuclari || []);
        mesaj(SABIT.cozum, 'tekrar');
        adimlar.forEach(function (a, n) { mesaj((n + 1) + '. ' + a, 'tekrar'); });
        $('kilit').className = 'kilit tekrar'; $('kilit').textContent = '↺ Adımlara bak, doğru şıkkı sen seç';
        return;
      }
      $('kilit').className = 'kilit tekrar'; $('kilit').textContent = '↺ Henüz değil, bir daha dene';
      var ip2 = (q.ipuclari || [])[Math.min(model.yanlis - 1, (q.ipuclari || []).length - 1)];
      model.ipucu = Math.max(model.ipucu, model.yanlis);
      mesaj(c.egitmen || (SABIT.yanlis + (ip2 || '')), 'tekrar');
    });
  }
  // Sınav cevabı: yalnız nötr "Kaydettim". Renk, ipucu, 2. deneme yok; şıklar kilitlenir.
  function sinavCevabi(c, dugme) {
    model.asama = 'bitti';
    if (dugme) dugme.classList.add('secili');
    $('kilit').className = 'kilit'; $('kilit').textContent = 'Kaydettim';
    mesaj(SABIT.kaydettim);
    var b = document.querySelectorAll('.sik'); for (var i = 0; i < b.length; i++) b[i].disabled = true;
    yazmaAc(false, 'Bu soru bitti');
    dugmeler(false);
    if (c.sinav && c.sinav.bitti) { perde(q.sinav.baslik, c.bitis || '', null); return; }
    $('sonraki').hidden = false;
  }
  function dogruSikiIsaretle(harf) {
    var b = document.querySelector('.sik[data-harf="' + harf + '"]');
    if (b) { b.classList.remove('tekrar'); b.classList.add('dogru'); }
  }
  function bitir() {
    var b = document.querySelectorAll('.sik'); for (var i = 0; i < b.length; i++) b[i].disabled = true;
    yazmaAc(false, 'Bu soru bitti');
    dugmeler(false);
    $('sonraki').hidden = false;
  }

  // ---- Düğmeler ----
  function ipucuIste() {
    var liste = q.ipuclari || [];
    if (model.ipucu >= liste.length) { mesaj(SABIT.ipucuBitti); return; }
    mesaj('💡 ' + liste[model.ipucu]);
    model.ipucu++;
  }
  function anlamadim() {
    if (sinavMi) {   // sınavda yalnız soruyu yeniden gösterir; konu anlatmaz, model çağrılmaz
      if (arka.anlamadim) arka.anlamadim({ sablon_id: q.sablon_id, tohum: q.tohum }, 0);
      mesaj('Soruyu bir daha okuyalım: ' + tumCumleler().join(' '));
      return;
    }
    var yedek = function () { mesaj(SABIT.anlamadim + q.istenen); };
    if (!arka.anlamadim) { yedek(); return; }
    arka.anlamadim({ sablon_id: q.sablon_id, tohum: q.tohum }, model.yanlis).then(function (c) { if (c && c.egitmen) mesaj(c.egitmen); else yedek(); }, yedek);
  }
  function kisaGoster() {
    if (!q.kisa_hali) { mesaj('Bu soru için kısa hâl yok.'); return; }
    mesaj('✏️ ' + q.kisa_hali);
  }

  // ---- Tanıtım turu (kurucu 22.11): ilk açılışta neyin ne olduğu tek tek gösterilir; anlatılan öğe aydınlık, gerisi karanlık ----
  var TANITIM_ANAHTAR = 'matematik_tanitim_v1';
  function tanitimAdimlari() {
    return [
      { id: 'hikaye', m: 'Soru burada, cümle cümle gelir. Önemli gördüğün kelimelere dokunursan sarıyla işaretlenir.' },
      { id: 'devam', m: 'Sıradaki cümleyi görmek için Devam düğmesine bas.' },
      { id: 'siklar', m: 'Şıklar önce kilitlidir 🔒. Sorunun ne istediğini kendi cümlenle yazınca açılır.' },
      { id: 'yaz', m: 'Buraya yazarsın: önce sorunun senden ne istediğini, sonra cevabını ya da takıldığın yeri.' },
      { id: 'akis', m: 'Eğitmenin sana buradan yazar. Ben bir yapay zekâyım; adım adım birlikte çözeriz.' },
      { id: 'dIpucu', m: '💡 İpucu: takıldığında küçük bir yardım verir. Cevabı söylemez, yolu gösterir.' },
      { id: 'dAnlamadim', m: sinavMi ? '🤔 Anlamadım: soruyu bir daha okumak istersen bas.' : '🤔 Anlamadım: soru karışık geldiyse bas, sana başka türlü anlatırım.' },
      { id: 'dKisa', m: '✏️ Kısa hâl: uzun hikâyeyi kısaltır; yalnız sayılar ve soru kalır.' },
      { id: 'blok', m: 'Bugünkü bölümler burada. Her bölümden sonra kısa bir mola var.' },
      { id: 'mola', m: 'Molaya kaç dakika kaldığını buradan görürsün.' },
      { id: 'tamEkran', m: 'Tam ekran: başka bir şey dikkatini dağıtmasın. Açmak ya da kapatmak için bu düğmeye bas.' },
      { id: 'konuDugme', m: '📖 Konu: bu konunun kısa anlatımını yeniden açar.' },
      { id: 'tanitimDugme', m: 'Bu tanıtımı yeniden görmek istersen buraya bas. Hadi başlayalım!' }
    ].filter(function (a) { var e = $(a.id); return e && !e.hidden && e.getClientRects().length; });
  }
  var tur = null;
  function tanitimGerekirse() {
    var p = new URLSearchParams(location.search).get('tanitim'), gorulmus = false;
    if (p === '0') return;
    try { gorulmus = localStorage.getItem(TANITIM_ANAHTAR) === '1'; } catch (e) { gorulmus = false; }
    if (!gorulmus || p === '1') tanitimBaslat();
  }
  function tanitimBaslat() {
    if (tur || !q || anl) return;   // soru ekrandayken yapılır: öğeler gerçek hâliyle gösterilir
    tur = { adimlar: tanitimAdimlari(), i: 0 };
    if (!tur.adimlar.length) { tur = null; return; }
    $('tanitim').hidden = false;
    tanitimGoster();
  }
  function tanitimGoster() {
    var a = tur.adimlar[tur.i], e = $(a.id);
    var r = e.getBoundingClientRect(), pay = 6, d = $('tDelik').style;
    d.top = (r.top - pay) + 'px'; d.left = (r.left - pay) + 'px'; d.width = (r.width + 2 * pay) + 'px'; d.height = (r.height + 2 * pay) + 'px';
    $('tSayi').textContent = (tur.i + 1) + ' / ' + tur.adimlar.length;
    $('tMetin').textContent = a.m;
    var son = tur.i === tur.adimlar.length - 1;
    $('tIleri').textContent = son ? 'Başlayalım ▸' : 'İleri ▸';
    $('tGec').hidden = son;
    // Balon: öğenin altında yer varsa alta, yoksa üste; ikisine de sığmazsa en alta. Yatayda ekrana sığar.
    var bal = $('tBalon'), g = window.innerWidth, y = window.innerHeight, bw = bal.offsetWidth, bh = bal.offsetHeight, bosluk = 14;
    var ust = r.bottom + pay + bosluk + bh <= y - 8 ? r.bottom + pay + bosluk : r.top - pay - bosluk - bh;
    if (ust < 8) ust = Math.max(8, y - bh - 8);
    bal.style.top = ust + 'px';
    bal.style.left = Math.min(Math.max(8, r.left + r.width / 2 - bw / 2), g - bw - 8) + 'px';
    $('tIleri').focus();
  }
  function tanitimBitir() {
    if (!tur) return;
    tur = null; $('tanitim').hidden = true;
    try { localStorage.setItem(TANITIM_ANAHTAR, '1'); } catch (e) { /* kayıt yoksa bir dahaki açılışta yeniden gösterilir */ }
    var hedef = !$('devam').hidden ? $('devam') : (!$('giris').disabled ? $('giris') : null);
    if (hedef) hedef.focus();
  }
  $('tIleri').addEventListener('click', function () { if (!tur) return; tur.i++; if (tur.i >= tur.adimlar.length) tanitimBitir(); else tanitimGoster(); });
  $('tGec').addEventListener('click', tanitimBitir);
  $('tanitimDugme').addEventListener('click', tanitimBaslat);
  window.addEventListener('resize', function () { if (tur) tanitimGoster(); });
  document.addEventListener('keydown', function (e) { if (tur && e.key === 'Escape') tanitimBitir(); });

  // ---- Konu anlatımı (kurucu 22.11: kısa, öz, sabit): konunun ilk sorusunda bir kez, '📖 Konu' ile yeniden; sınavda yok ----
  var ANLATIM_ANAHTAR = 'matematik_anlatim_v1_', anl = null, anlatimGorulen = {};
  function anlatimBul(konu) {
    var l = (window.MATEMATIK_ICERIK || {}).ANLATIMLAR || [];
    for (var i = 0; i < l.length; i++) if (l[i].konu === konu && l[i].ekranlar && l[i].ekranlar.length) return l[i];
    return null;
  }
  function anlatimGorulduMu(konu) {
    if (anlatimGorulen[konu]) return true;
    try { return localStorage.getItem(ANLATIM_ANAHTAR + konu) === '1'; } catch (e) { return false; }
  }
  function konuDugmeYaz() { $('konuDugme').hidden = !q || sinavMi || !anlatimBul(q.konu); }
  function anlatimGerekirse(sonra) {
    var p = new URLSearchParams(location.search).get('anlatim');
    konuDugmeYaz();
    var a = q && !sinavMi ? anlatimBul(q.konu) : null;
    if (!a || p === '0' || (anlatimGorulduMu(q.konu) && p !== '1')) { if (sonra) sonra(); return; }
    anlatimAc(a, sonra, true);
  }
  function anlatimAc(a, sonra, ilk) {
    if (anl || tur) return;
    anl = { a: a, i: 0, sonra: sonra, ilk: !!ilk };
    $('anlatim').hidden = false;
    anlatimGoster();
  }
  function anlatimGoster() {
    var a = anl.a, e = a.ekranlar[anl.i], son = anl.i === a.ekranlar.length - 1;
    $('aBaslik').textContent = a.baslik;
    $('aSayi').textContent = (anl.i + 1) + ' / ' + a.ekranlar.length;
    $('aMetin').textContent = e.metin;
    $('aResim').innerHTML = e.resim ? Sekil.ciz(e.resim) : '';   // Sekil yalnız sayı ve sabit kelime yazar
    $('aNot').hidden = !son;
    $('aGeri').hidden = anl.i === 0;
    $('aIleri').textContent = son ? (anl.ilk ? 'Soruya geç ▸' : 'Soruya dön ▸') : 'İleri ▸';
    $('aIleri').focus();
  }
  function anlatimKapat() {
    if (!anl) return;
    var konu = anl.a.konu, sonra = anl.sonra, ilk = anl.ilk;
    anl = null; $('anlatim').hidden = true;
    anlatimGorulen[konu] = true;
    try { localStorage.setItem(ANLATIM_ANAHTAR + konu, '1'); } catch (e) { /* kayıt yoksa bu sayfa açıkken yeniden gösterilmez */ }
    if (ilk && q) model.soruBas = Date.now();   // anlatımda geçen süre sorunun süresine yazılmaz
    if (sonra) sonra();
    else if (!$('devam').hidden) $('devam').focus();
  }
  $('aIleri').addEventListener('click', function () { if (!anl) return; if (anl.i >= anl.a.ekranlar.length - 1) anlatimKapat(); else { anl.i++; anlatimGoster(); } });
  $('aGeri').addEventListener('click', function () { if (anl && anl.i > 0) { anl.i--; anlatimGoster(); } });
  $('konuDugme').addEventListener('click', function () { var a = q && !sinavMi ? anlatimBul(q.konu) : null; if (a) anlatimAc(a, null, false); });
  document.addEventListener('keydown', function (e) { if (anl && e.key === 'Escape') anlatimKapat(); });

  function tamEkranAc() {
    var k = document.documentElement;
    if (!document.fullscreenEnabled || !k.requestFullscreen || document.fullscreenElement) return;
    try { var s = k.requestFullscreen(); if (s && s.catch) s.catch(function () {}); } catch (e) { /* izin yoksa sayfa normal sürer */ }
  }

  function basla() {
    var p = new URLSearchParams(location.search);
    var adres = window.MATEMATIK_API;
    var jeton = p.get('j') || '';
    if (adres) arka = Arka.api(adres, jeton, function (u, o) { return fetch(u, o); });
    else {
      var ic = window.MATEMATIK_ICERIK || {};
      arka = Arka.deneme(Motor, window.MATEMATIK_SABLONLAR || [], { tohum: p.get('tohum') !== null ? p.get('tohum') : undefined, sablon: p.get('sablon') || undefined, mod: p.get('mod') || undefined, sinav: (ic.SEVIYE_TESTI || {}).sorular });
      $('denemeSerit').hidden = false;
    }
    window.__arka = arka;
    arka.baslat().then(function (d) {
      durum = d || {};
      if (!durum.takma_ad) durum.takma_ad = 'Kâşif';
      $('ad').firstChild.textContent = 'Merhaba ' + durum.takma_ad + ' ';
      zamanYaz(); setInterval(zamanYaz, 30000);
      setInterval(function () { if (arka) sayacYaz(); }, 30000);
      perde('Merhaba ' + durum.takma_ad + '!', 'Ben yapay zekâ eğitmeninim. Bir insan değilim, bir bilgisayar programıyım. Sana matematik sorularını okumayı ve anlamayı öğretmek için buradayım.', 'Başla', function () { tamEkranAc(); yeniSoru(); });   // tam ekran yalnız tıklamayla açılabilir (tarayıcı kuralı)
    });
  }

  $('yaz').addEventListener('submit', function (e) {
    e.preventDefault();
    var m = $('giris').value; $('giris').value = '';
    gonder(m);
  });
  $('devam').addEventListener('click', sonrakiCumle);
  $('sonraki').addEventListener('click', yeniSoru);
  $('dIpucu').addEventListener('click', ipucuIste);
  $('dAnlamadim').addEventListener('click', anlamadim);
  $('dKisa').addEventListener('click', kisaGoster);
  // Tam ekran (kurucu 22.11: çocuğun dikkati dağılmasın; F11'i herkes bilmiyor). Desteklemeyen tarayıcıda düğme gizli kalır.
  (function () {
    var b = $('tamEkran'), k = document.documentElement;
    if (!b || !document.fullscreenEnabled || !k.requestFullscreen) return;
    b.hidden = false;
    var yaz = function () { b.textContent = document.fullscreenElement ? '⛶ Küçült' : '⛶ Tam ekran'; };
    b.addEventListener('click', function () {
      var s = document.fullscreenElement ? document.exitFullscreen() : k.requestFullscreen();
      if (s && s.catch) s.catch(function () {});
    });
    document.addEventListener('fullscreenchange', yaz);
  })();
  basla();
})();
