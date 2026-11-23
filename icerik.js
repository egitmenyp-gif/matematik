// Otomatik üretildi (testler/yardimci/icerik_uret.js); elle değiştirme. Kaynak: icerik/konular.json, icerik/seviye-testi.json
window.MATEMATIK_ICERIK = { KONULAR: [
 {
  "id": "kesir-anlami",
  "ad": "Kesrin anlamı",
  "kazanim": "onkosul-5",
  "onkosul": [],
  "sira": 1
 },
 {
  "id": "islem-secimi",
  "ad": "Hangi işlem? (sözel durumdan işlem seçme)",
  "kazanim": "onkosul-5",
  "onkosul": [],
  "sira": 2
 },
 {
  "id": "ondalik-basamak",
  "ad": "Ondalık gösterim ve basamak değeri",
  "kazanim": "MAT.6.1.5",
  "onkosul": [
   "kesir-anlami"
  ],
  "sira": 3
 },
 {
  "id": "kesir-bolme",
  "ad": "Kesir ve bölme",
  "kazanim": "MAT.6.1.6",
  "onkosul": [
   "kesir-anlami",
   "islem-secimi"
  ],
  "sira": 4
 },
 {
  "id": "uzunluk-birim",
  "ad": "Uzunluk ölçme birimleri",
  "kazanim": "MAT.6.1.8",
  "onkosul": [
   "ondalik-basamak"
  ],
  "sira": 5
 },
 {
  "id": "ondalik-toplama-cikarma",
  "ad": "Ondalık sayılarla toplama ve çıkarma",
  "kazanim": "MAT.6.1.7",
  "onkosul": [
   "ondalik-basamak",
   "islem-secimi"
  ],
  "sira": 6
 },
 {
  "id": "ondalik-carpma",
  "ad": "Ondalık sayılarla çarpma",
  "kazanim": "MAT.6.1.7",
  "onkosul": [
   "ondalik-basamak",
   "islem-secimi"
  ],
  "sira": 7
 },
 {
  "id": "kesir-problem",
  "ad": "Kesirlerle problem",
  "kazanim": "MAT.6.1.7",
  "onkosul": [
   "kesir-anlami",
   "kesir-bolme"
  ],
  "sira": 8
 },
 {
  "id": "yuzde-problem",
  "ad": "Yüzdelerle problem",
  "kazanim": "MAT.6.1.7",
  "onkosul": [
   "kesir-anlami",
   "ondalik-basamak"
  ],
  "sira": 9
 },
 {
  "id": "karisik-problem",
  "ad": "Kesir, ondalık ve yüzde birlikte",
  "kazanim": "MAT.6.1.7",
  "onkosul": [
   "kesir-problem",
   "yuzde-problem",
   "uzunluk-birim"
  ],
  "sira": 10
 }
], SEVIYE_TESTI: {
 "id": "seviye-1",
 "yazan": "Çıra, 19.11.2026",
 "amac": "İlk gün başlangıç çizgisi (plan §2.1, §2.6): hangi konular sağlam, hangilerinde eksik var. Puan BETİKLE.",
 "kurallar": {
  "deneme": "her soruda TEK cevap; doğru/yanlış çocuğa gösterilmez, eğitmen yalnız 'Kaydettim, sıradakine geçelim' der (teşhis testi; kaygı yaratmasın)",
  "ipucu": "İpucu ve Kısa hâl düğmeleri KAPALI; 'Anlamadım' açık ama yalnız soruyu yeniden okutur, konu anlatmaz",
  "ne_isteniyor": "AÇIK ve kaydedilir (okuduğunu anlama da ölçülüyor); şıklar her durumda açılır",
  "sure": "soru başına süre kaydedilir, sınır yok; toplam ~20-25 dk (bir blok)",
  "bitis": "son ekranda sayı yok: 'Teşekkürler! Nereden başlayacağımızı şimdi biliyorum. Yarın birlikte başlıyoruz.' Sonuç veliye gece e-postasında gider."
 },
 "sorular": [
  {
   "sira": 1,
   "konu": "kesir-anlami",
   "sablon_id": "kesir-anlami-devre-karti-01"
  },
  {
   "sira": 2,
   "konu": "islem-secimi",
   "sablon_id": "islem-secimi-pil-01"
  },
  {
   "sira": 3,
   "konu": "ondalik-basamak",
   "sablon_id": "ondalik-basamak-powerbank-01"
  },
  {
   "sira": 4,
   "konu": "kesir-bolme",
   "sablon_id": "bolme-serit-parca-01"
  },
  {
   "sira": 5,
   "konu": "uzunluk-birim",
   "sablon_id": "uzunluk-kablo-cm-01"
  },
  {
   "sira": 6,
   "konu": "ondalik-toplama-cikarma",
   "sablon_id": "ondalik-kablo-kalan-01"
  },
  {
   "sira": 7,
   "konu": "ondalik-carpma",
   "sablon_id": "ondalik-simit-para-ustu-01"
  },
  {
   "sira": 8,
   "konu": "kesir-problem",
   "sablon_id": "kesir-harclik-01"
  },
  {
   "sira": 9,
   "konu": "yuzde-problem",
   "sablon_id": "yuzde-indirim-lehim-01"
  },
  {
   "sira": 10,
   "konu": "kesir-problem",
   "sablon_id": "kesir-kalan-kablo-01"
  },
  {
   "sira": 11,
   "konu": "yuzde-problem",
   "sablon_id": "yuzde-kulup-01"
  },
  {
   "sira": 12,
   "konu": "karisik-problem",
   "sablon_id": "karisik-led-panel-01"
  }
 ],
 "degerlendirme": {
  "konu_durumu": "konudaki bütün sorular doğru → 'saglam'; en az biri yanlış → 'eksik'; 'ne isteniyor' değerlendirmesi 'hayir' olan sorular ayrıca 'okuma' işaretli",
  "baslangic": "konular.json sırasına göre 'eksik' olan EN KÜÇÜK sıralı konu; onun önkoşulu da eksikse önkoşul. Hiç eksik yoksa 'karisik-problem'.",
  "hata_turleri": "yanlış şıkların hata türleri sayılır ve öğrenci kartının 'takildigi' alanına ilk veri olarak girer",
  "haftalik": "haftalık sınav aynı yapıda, aynı konular, FARKLI tohumla (aynı soru tekrar gelmez); konu konu karşılaştırma veli raporundaki ilerleme grafiğinin verisi"
 }
}, ANLATIMLAR: [
 {
  "konu": "kesir-anlami",
  "baslik": "Kesir: bütünün parçası",
  "ekranlar": [
   {
    "metin": "Bir devre kartını 4 eşit parçaya ayırdığını düşün. Her parça, kartın 4'te 1'idir.",
    "resim": {
     "tip": "kesir-cubugu",
     "parca": 4,
     "boyali": 1
    }
   },
   {
    "metin": "3 parçayı lehimlersen kartın 4'te 3'ünü lehimlemiş olursun. Bunu 3/4 diye yazarız.",
    "resim": {
     "tip": "kesir-cubugu",
     "parca": 4,
     "boyali": 3,
     "etiket": "3/4"
    }
   },
   {
    "metin": "Alttaki sayıya payda denir: bütün kaç eşit parçaya ayrıldı? Üstteki sayıya pay denir: kaç parçayı aldık?",
    "resim": {
     "tip": "kesir-cubugu",
     "parca": 4,
     "boyali": 3,
     "etiket": "3/4"
    }
   },
   {
    "metin": "Dikkat: payda her zaman BÜTÜNDÜR. 3 LED yanıyor, 2 LED sönükse yananlar 3/5'tir, 3/2 değil. Çünkü bütün 5 LED'dir.",
    "resim": {
     "tip": "kesir-cubugu",
     "parca": 5,
     "boyali": 3,
     "etiket": "3/5"
    }
   }
  ]
 },
 {
  "konu": "uzunluk-birim",
  "baslik": "Uzunluk birimleri: m, cm, mm",
  "ekranlar": [
   {
    "metin": "Metre şeridine bak: 1 metrede 100 santimetre, 1 santimetrede 10 milimetre var.",
    "resim": {
     "tip": "birim-merdiven"
    }
   },
   {
    "metin": "Büyük birimden küçük birime geçerken sayı büyür: 2 m = 200 cm. Küçükten büyüğe geçerken sayı küçülür: 300 cm = 3 m.",
    "resim": {
     "tip": "birim-merdiven"
    }
   },
   {
    "metin": "Ondalıkta da aynı kural: 1,5 m = 150 cm. 100 ile çarpınca virgül iki basamak sağa kayar."
   },
   {
    "metin": "En önemlisi: toplamadan ya da çıkarmadan önce bütün uzunlukları AYNI birime çevir. 2 m ile 30 cm'yi toplarken 2 + 30 yapılmaz: 200 + 30 = 230 cm."
   }
  ]
 },
 {
  "konu": "kesir-problem",
  "baslik": "Bir şeyin kesri kadarı",
  "ekranlar": [
   {
    "metin": "Işık dizisinde 15 LED var, 2/5'i yanıyor. Bu, 2 LED yanıyor demek değildir! 2/5 bir sayı değil, bütünün bir parçasıdır.",
    "resim": {
     "tip": "grup",
     "toplam": 15,
     "payda": 1,
     "boyali": 0
    }
   },
   {
    "metin": "Payda 5: 15 LED'i 5 eşit gruba ayır. Her grupta 15 ÷ 5 = 3 LED olur.",
    "resim": {
     "tip": "grup",
     "toplam": 15,
     "payda": 5,
     "boyali": 0
    }
   },
   {
    "metin": "Pay 2: bu gruplardan 2 tanesi yanıyor. 2 × 3 = 6 LED yanıyor.",
    "resim": {
     "tip": "grup",
     "toplam": 15,
     "payda": 5,
     "boyali": 2
    }
   },
   {
    "metin": "Kısaca: bütünü paydaya böl, bir grubu bulursun. Sonra payla çarp. Parça verilip bütün sorulursa tersini yap: parçayı paya böl, paydayla çarp."
   }
  ]
 },
 {
  "konu": "yuzde-problem",
  "baslik": "Yüzde: her 100'de kaç",
  "ekranlar": [
   {
    "metin": "%30 demek: her 100 taneden 30 tanesi. Yüzde, paydası 100 olan bir kesirdir: %30 = 30/100.",
    "resim": {
     "tip": "yuz-kare",
     "boyali": 30
    }
   },
   {
    "metin": "100 kişinin %30'u 30 kişidir. Ama 200 kişinin %30'u 30 değildir! 200'de iki tane 100 var: 30 + 30 = 60 kişi."
   },
   {
    "metin": "Kesirden yüzdeye: 20 görevin 13'ü bitti, yani 13/20. Paydayı 100 yap: 20 × 5 = 100, payı da 5 ile çarp: 13 × 5 = 65. Görevlerin %65'i bitti.",
    "resim": {
     "tip": "yuz-kare",
     "boyali": 65
    }
   },
   {
    "metin": "Dikkat: yüzde her zaman BÜTÜNE göre hesaplanır. %20 indirim, eski fiyatın her 100 TL'sinden 20 TL düşmek demektir; 20 TL düşmek demek değildir."
   }
  ]
 }
] };
