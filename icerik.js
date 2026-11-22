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
} };
