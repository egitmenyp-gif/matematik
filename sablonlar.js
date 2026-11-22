// Otomatik üretildi (testler/yardimci/sablonlari_site_e_yaz.js); elle değiştirme. Kaynak: icerik/sablonlar/*.json
window.MATEMATIK_SABLONLAR = [
 {
  "id": "kesir-kalan-kablo-01",
  "konu": "kesir-problem",
  "konu_adi": "Kesirlerle problem",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "payda": {
    "degerler": [
     "4",
     "5",
     "8"
    ]
   },
   "pay": {
    "min": 1,
    "max": 7,
    "adim": 1
   },
   "k": {
    "min": 2,
    "max": 6,
    "adim": 1
   }
  },
  "kisitlar": [
   "pay < payda",
   "pay * 2 != payda",
   "payda != 3 * pay"
  ],
  "turetilen": {
   "toplam": "payda * k * 10",
   "kesilen": "toplam * pay / payda",
   "kalan": "toplam - kesilen"
  },
  "hikaye": [
   "Kâşif'in {toplam} cm uzunluğunda bir kablosu var.",
   "Kablonun {pay}/{payda} kadarını robotunun devresi için kesiyor.",
   "Kalan kablonun yarısını da kardeşine veriyor."
  ],
  "istenen": "Kâşif'te kaç cm kablo kalır?",
  "vurgu": [
   "{toplam} cm",
   "{pay}/{payda} kadarını",
   "Kalan kablonun yarısını"
  ],
  "cevap": "kalan / 2",
  "birim": "cm",
  "celdiriciler": [
   {
    "ifade": "kesilen",
    "hata": "ilk-adimda-durdu"
   },
   {
    "ifade": "kalan",
    "hata": "adim-atladi"
   },
   {
    "ifade": "kesilen / 2",
    "hata": "yanlis-parca"
   }
  ],
  "kisa_hali": "{toplam} cm kablo. {pay}/{payda} kadarı gitti. Kalanın yarısı da gitti. Kaç cm kaldı?",
  "ipuclari": [
   "Kablo üç kez değişiyor: başta, kesince, verince. Her birini ayrı düşün.",
   "Önce kesilen parçayı bul: {toplam} cm'yi {payda} eşit parçaya böl, {pay} tanesini al.",
   "Kalanı bulduktan sonra 'yarısını verdi' ne demek?"
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {toplam} cm'yi {payda} eşit parçaya böl: bir parça kaç cm?",
   "{pay} parça kesildi. Kalan kaç cm?",
   "Kalanın yarısını verdi. Sende ne kadar kalır? Şıklara yeniden bak."
  ]
 },
 {
  "id": "yuzde-indirim-lehim-01",
  "konu": "yuzde-problem",
  "konu_adi": "Yüzdelerle problem",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "fiyat": {
    "min": 120,
    "max": 600,
    "adim": 20
   },
   "oran": {
    "degerler": [
     "10",
     "20",
     "25",
     "30",
     "40"
    ]
   }
  },
  "turetilen": {
   "indirim": "fiyat * oran / 100"
  },
  "hikaye": [
   "Bir elektronik dükkânında lehim makinesinin fiyatı {fiyat} TL.",
   "Bu hafta bütün ürünlerde %{oran} indirim var."
  ],
  "istenen": "Kâşif lehim makinesi için kaç TL öder?",
  "vurgu": [
   "{fiyat} TL",
   "%{oran} indirim"
  ],
  "cevap": "fiyat - indirim",
  "birim": "TL",
  "celdiriciler": [
   {
    "ifade": "indirim",
    "hata": "ilk-adimda-durdu"
   },
   {
    "ifade": "fiyat - oran",
    "hata": "yuzdeyi-sayi-sandi"
   },
   {
    "ifade": "fiyat + indirim",
    "hata": "islem-secimi"
   }
  ],
  "kisa_hali": "Fiyat {fiyat} TL. %{oran} ucuz. Kaç TL ödenir?",
  "ipuclari": [
   "%{oran} indirim, fiyatın tamamından mı düşer yoksa {oran} TL mi düşer?",
   "%{oran} demek: her 100 TL'de {oran} TL. {fiyat} TL'de kaç TL eder?",
   "İndirimi bulunca bitti mi? Kâşif ne kadar ödeyecek?"
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Her 100 TL'den {oran} TL indirim var. {fiyat} TL'de kaç tane 100 var?",
   "O zaman toplam indirim kaç TL?",
   "Fiyattan indirimi çıkar ve şıklara yeniden bak."
  ]
 },
 {
  "id": "ondalik-kablo-kalan-01",
  "konu": "ondalik-toplama-cikarma",
  "konu_adi": "Ondalık sayılarla toplama ve çıkarma",
  "kazanim": "MAT.6.1.7, MAT.6.1.8",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "birim",
   "hesap"
  ],
  "parametreler": {
   "a_cm": {
    "min": 120,
    "max": 240,
    "adim": 5
   },
   "b_cm": {
    "min": 40,
    "max": 160,
    "adim": 10
   }
  },
  "kisitlar": [
   "a_cm + b_cm != 250",
   "2 * a_cm + b_cm != 500"
  ],
  "turetilen": {
   "a_m": "a_cm / 100",
   "b_m": "b_cm / 100"
  },
  "hikaye": [
   "Kâşif 5 metrelik bir kablo makarası aldı.",
   "Robotunun kolları için {a_m} m kablo kullandı.",
   "Masa lambası için de {b_cm} cm kablo kesti."
  ],
  "istenen": "Makarada kaç metre kablo kaldı?",
  "vurgu": [
   "5 metrelik",
   "{a_m} m",
   "{b_cm} cm"
  ],
  "cevap": "5 - a_m - b_m",
  "birim": "m",
  "celdiriciler": [
   {
    "ifade": "5 - a_m",
    "hata": "adim-atladi"
   },
   {
    "ifade": "a_m + b_m",
    "hata": "istenen-farkli"
   },
   {
    "ifade": "5 - a_m + b_m",
    "hata": "islem-secimi"
   }
  ],
  "kisa_hali": "5 m kablo vardı. {a_m} m ve {b_cm} cm kullanıldı. Kaç m kaldı?",
  "ipuclari": [
   "Birimlere bak: hepsi metre mi?",
   "{b_cm} cm kaç metre eder? 100 cm = 1 m.",
   "Kullanılan iki parçayı da 5 metreden düşmen gerekiyor."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {b_cm} cm'yi metreye çevir.",
   "Kullanılan iki parçayı topla: kaç metre?",
   "Bunu 5 metreden çıkar ve şıklara yeniden bak."
  ]
 },
 {
  "id": "yuzde-kulup-01",
  "konu": "yuzde-problem",
  "konu_adi": "Yüzdelerle problem",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "n": {
    "degerler": [
     "20",
     "40",
     "60",
     "80"
    ]
   },
   "oran": {
    "degerler": [
     "10",
     "20",
     "25",
     "30",
     "40",
     "60"
    ]
   }
  },
  "turetilen": {
   "katilan": "n * oran / 100"
  },
  "hikaye": [
   "Bir okulda robotik kulübüne {n} öğrenci başvurdu.",
   "Kulübe alınanların oranı %{oran}."
  ],
  "istenen": "Kaç öğrenci bu dönem kulübe alınamadı?",
  "vurgu": [
   "{n} öğrenci",
   "%{oran}"
  ],
  "cevap": "n - katilan",
  "birim": "öğrenci",
  "celdiriciler": [
   {
    "ifade": "katilan",
    "hata": "istenen-farkli"
   },
   {
    "ifade": "n - oran",
    "hata": "yuzdeyi-sayi-sandi"
   },
   {
    "ifade": "100 - oran",
    "hata": "yuzdeyi-sayi-sandi"
   }
  ],
  "kisa_hali": "{n} kişi başvurdu. Alınanların oranı %{oran}. Kaç kişi alınamadı?",
  "ipuclari": [
   "Soru alınanları mı soruyor, alınamayanları mı?",
   "%{oran} demek: her 100 kişide {oran} kişi. {n} kişide kaç kişi eder?",
   "Alınanları bulunca, alınamayanları nasıl bulursun?"
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Her 100 kişiden {oran} kişi alınıyor. {n} kişide kaç kişi eder? (%10 kolaydır: {n} sayısını 10'a böl.)",
   "Alınan sayısını buldun mu? Başvuranlardan çıkar.",
   "Şıklara yeniden bak."
  ],
  "kisitlar": [
   "n > oran"
  ]
 },
 {
  "id": "bolme-serit-parca-01",
  "konu": "kesir-bolme",
  "konu_adi": "Kesir ve bölme",
  "kazanim": "MAT.6.1.6",
  "zorluk": 1,
  "adimlar": [
   "iliski",
   "hesap"
  ],
  "parametreler": {
   "toplam": {
    "min": 150,
    "max": 450,
    "adim": 50
   },
   "parca": {
    "degerler": [
     "2",
     "5"
    ]
   }
  },
  "hikaye": [
   "Kâşif {toplam} cm uzunluğundaki LED şeridi {parca} eşit parçaya kesiyor.",
   "Her parçayı odasının bir köşesine yapıştıracak."
  ],
  "istenen": "Bir parça kaç cm olur?",
  "vurgu": [
   "{toplam} cm",
   "{parca} eşit parçaya"
  ],
  "cevap": "toplam / parca",
  "birim": "cm",
  "celdiriciler": [
   {
    "ifade": "toplam * parca",
    "hata": "islem-secimi"
   },
   {
    "ifade": "toplam - parca",
    "hata": "islem-secimi"
   },
   {
    "ifade": "toplam / (parca - 1)",
    "hata": "kesim-parca-karisti"
   }
  ],
  "kisa_hali": "{toplam} cm şerit, {parca} eşit parça. Bir parça kaç cm?",
  "ipuclari": [
   "Eşit parçalara kesmek hangi işlem?",
   "{toplam} cm'yi {parca} kişiye eşit paylaştırdığını düşün.",
   "Bir parça, bütünün {parca} eşit parçasından biridir."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Şerit {parca} eşit parçaya ayrılıyor: bu bölme mi çarpma mı?",
   "{toplam} ÷ {parca} işlemini yap.",
   "Şıklara yeniden bak."
  ]
 },
 {
  "id": "ondalik-carpma-led-01",
  "konu": "ondalik-carpma",
  "konu_adi": "Ondalık sayılarla çarpma",
  "kazanim": "MAT.6.1.7, MAT.6.1.8",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "birim",
   "hesap"
  ],
  "parametreler": {
   "en_cm": {
    "min": 80,
    "max": 160,
    "adim": 10
   },
   "boy_cm": {
    "min": 50,
    "max": 80,
    "adim": 5
   },
   "watt": {
    "degerler": [
     "0,4",
     "0,5",
     "0,6",
     "0,8"
    ]
   }
  },
  "kisitlar": [
   "en_cm > boy_cm"
  ],
  "turetilen": {
   "uzunluk_m": "(en_cm + 2*boy_cm) / 100"
  },
  "hikaye": [
   "Kâşif masasının arkasına ve iki yanına LED şerit yapıştıracak.",
   "Masanın eni {en_cm} cm, boyu {boy_cm} cm.",
   "Şeridin her metresi {watt} watt harcıyor."
  ],
  "istenen": "Şerit toplam kaç watt harcar?",
  "vurgu": [
   "arkasına ve iki yanına",
   "{watt} watt"
  ],
  "sekil": {
   "tip": "masa-ustten",
   "en": "en_cm",
   "boy": "boy_cm",
   "isaretli": [
    "arka",
    "sol",
    "sag"
   ]
  },
  "cevap": "uzunluk_m * watt",
  "birim": "W",
  "celdiriciler": [
   {
    "ifade": "en_cm/100 * watt",
    "hata": "yalniz-bir-kenar"
   },
   {
    "ifade": "2*(en_cm+boy_cm)/100 * watt",
    "hata": "dort-kenar"
   },
   {
    "ifade": "(en_cm + 2*boy_cm) * watt",
    "hata": "birim-donusturmedi"
   }
  ],
  "kisa_hali": "{en_cm} + {boy_cm} + {boy_cm} cm şerit var. Metresi {watt} W. Toplam kaç W?",
  "ipuclari": [
   "Şekle bak: şerit hangi kenarlarda?",
   "Birimlere bak: hepsi aynı mı?",
   "Önce toplam uzunluğu metre olarak bul."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Şerit hangi kenarlarda? O kenarların uzunluklarını topla: kaç cm?",
   "Bunu metreye çevir: 100 cm = 1 m.",
   "Şimdi metreyi {watt} ile çarp ve şıklara yeniden bak."
  ]
 },
 {
  "id": "ondalik-basamak-powerbank-01",
  "konu": "ondalik-basamak",
  "konu_adi": "Ondalık gösterim ve basamak değeri",
  "kazanim": "MAT.6.1.5",
  "zorluk": 1,
  "adimlar": [
   "iliski",
   "hesap"
  ],
  "parametreler": {
   "pay": {
    "min": 2,
    "max": 9,
    "adim": 1
   }
  },
  "kisitlar": [
   "pay != 5"
  ],
  "hikaye": [
   "Kâşif'in powerbank göstergesinde 10 çubuk var.",
   "Çubuklardan {pay} tanesi yanıyor, yani şarj düzeyi {pay}/10 kadar."
  ],
  "istenen": "Bu şarj düzeyi ondalık sayı olarak kaçtır?",
  "vurgu": [
   "{pay} tanesi yanıyor",
   "{pay}/10 kadar"
  ],
  "cevap": "pay/10",
  "birim": "",
  "celdiriciler": [
   {
    "ifade": "pay",
    "hata": "pay-payda-karisti"
   },
   {
    "ifade": "pay/100",
    "hata": "basamak-kaydi"
   },
   {
    "ifade": "(10-pay)/10",
    "hata": "istenen-farkli"
   }
  ],
  "kisa_hali": "10 çubuktan {pay} tanesi yanıyor. Ondalık sayı kaç?",
  "ipuclari": [
   "Paydaya bak: 10 olan kesir ondalıkta kaç basamak ister?",
   "Onda bir, virgülden sonraki ilk basamaktır.",
   "Önce {pay}/10 kesrini 'pay bölü 10' diye oku."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {pay}/10 demek {pay} sayısını 10'a bölmek.",
   "Bir sayıyı 10'a bölünce virgül bir basamak sola kayar.",
   "{pay} sayısında virgülü bir basamak sola kaydır ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "ondalik-basamak-multimetre-01",
  "konu": "ondalik-basamak",
  "konu_adi": "Ondalık gösterim ve basamak değeri",
  "kazanim": "MAT.6.1.5",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap"
  ],
  "parametreler": {
   "a": {
    "min": 1,
    "max": 9,
    "adim": 1
   },
   "b": {
    "min": 1,
    "max": 9,
    "adim": 1
   },
   "c": {
    "min": 1,
    "max": 9,
    "adim": 1
   }
  },
  "kisitlar": [
   "b != c"
  ],
  "hikaye": [
   "Kâşif multimetreyle bir pilin gerilimini ölçüyor.",
   "Ekranda {a},{b}{c} V yazıyor."
  ],
  "istenen": "Virgülden sonraki ilk basamakta duran rakamın değeri kaçtır?",
  "vurgu": [
   "{a},{b}{c} V"
  ],
  "cevap": "b/10",
  "birim": "",
  "celdiriciler": [
   {
    "ifade": "b",
    "hata": "basamak-kaydi"
   },
   {
    "ifade": "b/100",
    "hata": "basamak-kaydi"
   },
   {
    "ifade": "c/10",
    "hata": "yanlis-parca"
   }
  ],
  "kisa_hali": "Ekran {a},{b}{c} V. Virgülden sonraki ilk rakamın değeri kaç?",
  "ipuclari": [
   "Virgülden sonra kaç rakam var? İlk basamağın adı ne?",
   "Virgülden sonraki ilk basamak 'onda bir' basamağıdır.",
   "Sayıda bu basamaktaki rakamı bul."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Virgülden sonraki ilk basamak onda bir basamağı.",
   "Oradaki rakamı bul ve 10'a böl.",
   "Çıkan değere şıklarda yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "kesir-bolme-kablo-01",
  "konu": "kesir-bolme",
  "konu_adi": "Kesir ve bölme",
  "kazanim": "MAT.6.1.6",
  "zorluk": 1,
  "adimlar": [
   "iliski",
   "hesap"
  ],
  "parametreler": {
   "a": {
    "min": 2,
    "max": 7,
    "adim": 1
   },
   "b": {
    "degerler": [
     "3",
     "4",
     "5",
     "8",
     "9"
    ]
   }
  },
  "kisitlar": [
   "a < b",
   "a * 2 != b"
  ],
  "gosterim": "kesir",
  "hikaye": [
   "Kâşif {a} metre kabloyu {b} eşit parçaya bölecek.",
   "Her parça aynı uzunlukta olacak."
  ],
  "istenen": "Bir parça kaç metredir? (Kesir olarak yaz.)",
  "vurgu": [
   "{a} metre",
   "{b} eşit parçaya"
  ],
  "cevap": "a/b",
  "birim": "m",
  "celdiriciler": [
   {
    "ifade": "b/a",
    "hata": "pay-payda-karisti"
   },
   {
    "ifade": "a*b",
    "hata": "islem-secimi"
   },
   {
    "ifade": "(b-a)/b",
    "hata": "yanlis-parca"
   }
  ],
  "kisa_hali": "{a} m kablo, {b} eşit parça. Bir parça kaç m?",
  "ipuclari": [
   "Eşit parçalara bölmek hangi işlem?",
   "Bölünen pay, bölen payda olur.",
   "Önce kaç metre ve kaç parça var, yaz."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Bölünen sayı {a}, bölen sayı {b}.",
   "Bölme işlemini kesir olarak yaz: bölünen üstte, bölen altta.",
   "Kesri sadeleştirebiliyorsan sadeleştir ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "kesir-bolme-bakir-tel-01",
  "konu": "kesir-bolme",
  "konu_adi": "Kesir ve bölme",
  "kazanim": "MAT.6.1.6",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap"
  ],
  "parametreler": {
   "a": {
    "min": 1,
    "max": 19,
    "adim": 1
   },
   "b": {
    "degerler": [
     "4",
     "5",
     "10",
     "20",
     "25"
    ]
   }
  },
  "kisitlar": [
   "a < b",
   "2 * a != b"
  ],
  "hikaye": [
   "Kâşif {a} kg bakır teli {b} eşit makaraya sardı.",
   "Makaraların hepsi aynı ağırlıkta."
  ],
  "istenen": "Bir makarada kaç kg tel var? (Ondalık yaz.)",
  "vurgu": [
   "{a} kg",
   "{b} eşit makaraya"
  ],
  "cevap": "a/b",
  "birim": "kg",
  "celdiriciler": [
   {
    "ifade": "a/b*10",
    "hata": "basamak-kaydi"
   },
   {
    "ifade": "(b-a)/b",
    "hata": "yanlis-parca"
   },
   {
    "ifade": "a*b",
    "hata": "islem-secimi"
   }
  ],
  "kisa_hali": "{a} kg tel, {b} makara. Birinde kaç kg var?",
  "ipuclari": [
   "Eşit paylaştırmak hangi işlem?",
   "Pay bölü payda: kesir çizgisi bölme demek.",
   "{a} kg'yi {b} parçaya böl."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {a} ÷ {b} işlemini kur.",
   "{a} sayısı {b} sayısından küçükse sonuç 1'den küçük olur.",
   "Bölmeyi yap, virgüle dikkat et ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "yuzde-led-serit-01",
  "konu": "yuzde-problem",
  "konu_adi": "Yüzdelerle problem",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "fiyat": {
    "min": 80,
    "max": 400,
    "adim": 20
   },
   "oran": {
    "degerler": [
     "10",
     "20",
     "25",
     "50"
    ]
   },
   "kargo": {
    "min": 10,
    "max": 30,
    "adim": 5
   }
  },
  "kisitlar": [
   "fiyat != 100",
   "fiyat*oran + 100*kargo != 100*oran",
   "fiyat*oran + 200*kargo != 100*oran"
  ],
  "turetilen": {
   "indirim": "fiyat * oran / 100"
  },
  "hikaye": [
   "Kâşif internet sitesinden {fiyat} TL'lik LED şerit seçti.",
   "Şerit fiyatında %{oran} indirim var.",
   "Kargo ücreti ayrıca {kargo} TL."
  ],
  "istenen": "Kâşif toplam kaç TL öder?",
  "vurgu": [
   "{fiyat} TL'lik",
   "%{oran} indirim",
   "Kargo ücreti ayrıca {kargo} TL"
  ],
  "cevap": "fiyat - indirim + kargo",
  "birim": "TL",
  "celdiriciler": [
   {
    "ifade": "fiyat - indirim",
    "hata": "adim-atladi"
   },
   {
    "ifade": "fiyat - indirim - kargo",
    "hata": "islem-secimi"
   },
   {
    "ifade": "fiyat + kargo - oran",
    "hata": "yuzdeyi-sayi-sandi"
   }
  ],
  "kisa_hali": "Şerit {fiyat} TL. %{oran} ucuz. Kargo {kargo} TL. Toplam kaç TL?",
  "ipuclari": [
   "Üç şey var: fiyat, indirim, kargo. Hangisi para ekler, hangisi düşürür?",
   "%{oran} demek: her 100 TL'de {oran} TL. {fiyat} TL'de kaç TL eder?",
   "İndirimi bulunca fiyattan düşersin; kargo ne olacak?"
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. İndirim tutarını bul: {fiyat} TL'nin %{oran} değeri kaç TL?",
   "İndirimli fiyatı bul.",
   "Üstüne kargoyu ekle ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "kesir-harclik-01",
  "konu": "kesir-problem",
  "konu_adi": "Kesirlerle problem",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "top": {
    "min": 40,
    "max": 200,
    "adim": 20
   },
   "payda": {
    "degerler": [
     "4",
     "5"
    ]
   },
   "pay": {
    "min": 1,
    "max": 4,
    "adim": 1
   },
   "ek": {
    "degerler": [
     "5",
     "10",
     "15"
    ]
   }
  },
  "kisitlar": [
   "pay < payda",
   "top*(payda-pay) > payda*ek",
   "top*payda != 2*top*pay + 2*ek*payda",
   "top*pay != payda*(pay+ek)",
   "top*payda != payda*pay + top*pay + 2*ek*payda",
   "pay * 2 != payda"
  ],
  "turetilen": {
   "harc": "top * pay / payda"
  },
  "hikaye": [
   "Kâşif'in {top} TL harçlığı var.",
   "Harçlığının {pay}/{payda} kadarını kantinde harcadı.",
   "Sonra {ek} TL'lik defter aldı."
  ],
  "istenen": "Kâşif'in kaç TL parası kalır?",
  "vurgu": [
   "{top} TL",
   "{pay}/{payda} kadarını",
   "{ek} TL'lik defter"
  ],
  "cevap": "top - harc - ek",
  "birim": "TL",
  "celdiriciler": [
   {
    "ifade": "top - harc",
    "hata": "adim-atladi"
   },
   {
    "ifade": "harc + ek",
    "hata": "istenen-farkli"
   },
   {
    "ifade": "top - pay - ek",
    "hata": "kesri-sayi-sandi"
   }
  ],
  "kisa_hali": "{top} TL var. {pay}/{payda} kadarı kantinde gitti. {ek} TL de defter. Kaç TL kaldı?",
  "ipuclari": [
   "Para iki kez azalıyor. Her birini ayrı düşün.",
   "Önce kantinde giden parayı bul: {top} TL'yi {payda} eşit parçaya böl, {pay} tanesini al.",
   "Kantinden sonra defter parasını da düşmen gerekiyor."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {top} TL'yi {payda} eşit parçaya böl: bir parça kaç TL?",
   "{pay} parça kantinde gitti. Kaç TL?",
   "Harcamaları toplam paradan çıkar ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "kesir-robot-isi-01",
  "konu": "kesir-problem",
  "konu_adi": "Kesirlerle problem",
  "kazanim": "MAT.6.1.7",
  "zorluk": 3,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "payda": {
    "degerler": [
     "8",
     "10",
     "12"
    ]
   },
   "a": {
    "min": 1,
    "max": 5,
    "adim": 1
   },
   "b": {
    "min": 1,
    "max": 5,
    "adim": 1
   }
  },
  "kisitlar": [
   "a + b < payda",
   "2*(a+b) != payda",
   "payda != 2*a + b",
   "3*(a+b) != 2*payda",
   "3*a + b != 2*payda"
  ],
  "gosterim": "kesir",
  "hikaye": [
   "Kâşif robot kolunun kablolarını bağlıyor.",
   "Salı günü işin {a}/{payda} kadarını bitirdi.",
   "Çarşamba günü de {b}/{payda} kadarını bitirdi."
  ],
  "istenen": "İşin kaçta kaçı henüz bitmedi?",
  "vurgu": [
   "{a}/{payda} kadarını",
   "{b}/{payda} kadarını"
  ],
  "cevap": "(payda - a - b)/payda",
  "birim": "",
  "celdiriciler": [
   {
    "ifade": "(a+b)/payda",
    "hata": "istenen-farkli"
   },
   {
    "ifade": "(payda-a)/payda",
    "hata": "adim-atladi"
   },
   {
    "ifade": "(a+b)/(2*payda)",
    "hata": "pay-payda-karisti"
   }
  ],
  "kisa_hali": "İşin {a}/{payda} ve {b}/{payda} kadarı bitti. Kalan kısım kaçta kaç?",
  "ipuclari": [
   "Bütün iş kaç parça? İki günde kaç parça bitti?",
   "Bütün iş {payda}/{payda} demektir.",
   "Önce iki günde biten parçaları topla."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. İki günde biten: {a} + {b} parça.",
   "Bütün iş {payda} parça. Bitmeyen parçayı bul.",
   "Payda aynı kalır, kesri yaz ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "ondalik-simit-para-ustu-01",
  "konu": "ondalik-carpma",
  "konu_adi": "Ondalık sayılarla çarpma",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "n": {
    "min": 2,
    "max": 5,
    "adim": 1
   },
   "fiyat": {
    "degerler": [
     "12,5",
     "15",
     "17,5",
     "20"
    ]
   },
   "ver": {
    "degerler": [
     "100",
     "200"
    ]
   }
  },
  "kisitlar": [
   "2*n*fiyat != ver",
   "n*fiyat < ver",
   "(n+1)*fiyat != ver"
  ],
  "hikaye": [
   "Kâşif okul kantininde {n} simit aldı.",
   "Bir simit {fiyat} TL.",
   "Kasiyere {ver} TL verdi."
  ],
  "istenen": "Kâşif'e kaç TL para üstü verilir?",
  "vurgu": [
   "{n} simit",
   "{fiyat} TL",
   "{ver} TL"
  ],
  "cevap": "ver - n*fiyat",
  "birim": "TL",
  "celdiriciler": [
   {
    "ifade": "n*fiyat",
    "hata": "ilk-adimda-durdu"
   },
   {
    "ifade": "ver - fiyat",
    "hata": "adim-atladi"
   },
   {
    "ifade": "ver + n*fiyat",
    "hata": "islem-secimi"
   }
  ],
  "kisa_hali": "{n} simit, tanesi {fiyat} TL. {ver} TL verdi. Para üstü kaç TL?",
  "ipuclari": [
   "Önce simitlerin hepsi kaç TL tutuyor?",
   "Tek simit değil, {n} simit alındı.",
   "Toplam tutarı bulunca verdiği paradan ne yapacaksın?"
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {n} simidin tutarı: {fiyat} TL ile {n} sayısını çarp.",
   "Bu tutar Kâşif'in verdiği paradan harcanan kısım.",
   "{ver} TL'den tutarı çıkar ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "ondalik-hoparlor-kablo-01",
  "konu": "ondalik-toplama-cikarma",
  "konu_adi": "Ondalık sayılarla toplama ve çıkarma",
  "kazanim": "MAT.6.1.7",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "a": {
    "degerler": [
     "1,2",
     "1,5",
     "2,4",
     "3,5"
    ]
   },
   "b": {
    "degerler": [
     "0,8",
     "1,5",
     "2,5"
    ]
   },
   "k": {
    "degerler": [
     "2",
     "5"
    ]
   }
  },
  "hikaye": [
   "Kâşif hoparlör için iki kablo parçası buldu.",
   "Parçalar {a} m ve {b} m uzunluğunda.",
   "Hepsini uç uca ekleyip {k} eşit parçaya kesecek."
  ],
  "istenen": "Bir parça kaç metre olur?",
  "vurgu": [
   "{a} m ve {b} m",
   "{k} eşit parçaya"
  ],
  "cevap": "(a+b)/k",
  "birim": "m",
  "celdiriciler": [
   {
    "ifade": "a+b",
    "hata": "ilk-adimda-durdu"
   },
   {
    "ifade": "a + b/k",
    "hata": "islem-onceligi"
   },
   {
    "ifade": "(a+b)*k",
    "hata": "islem-secimi"
   }
  ],
  "kisa_hali": "{a} m ile {b} m eklendi. {k} eşit parçaya kesildi. Bir parça kaç m?",
  "ipuclari": [
   "Önce kablolar eklenip tek parça oluyor. Sonra ne oluyor?",
   "Ekleme önce, bölme sonra yapılır.",
   "Önce iki uzunluğu topla."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. {a} + {b} işlemini yap: toplam kaç metre?",
   "Toplamı {k} eşit parçaya bölmek için hangi işlem gerekir?",
   "Toplamı {k} sayısına böl ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "karisik-led-panel-01",
  "konu": "karisik-problem",
  "konu_adi": "Kesir, ondalık ve yüzde birlikte",
  "kazanim": "MAT.6.1.7",
  "zorluk": 3,
  "adimlar": [
   "iliski",
   "hesap",
   "hesap"
  ],
  "parametreler": {
   "n": {
    "degerler": [
     "100",
     "200",
     "300"
    ]
   },
   "payda": {
    "degerler": [
     "4",
     "5"
    ]
   },
   "pay": {
    "min": 1,
    "max": 4,
    "adim": 1
   },
   "oran": {
    "degerler": [
     "20",
     "40",
     "60"
    ]
   }
  },
  "kisitlar": [
   "pay < payda",
   "oran*payda != 100*pay",
   "pay * 2 != payda"
  ],
  "turetilen": {
   "kirmizi": "n * pay / payda"
  },
  "hikaye": [
   "Kâşif'in elektronik panelinde {n} LED var.",
   "LED'lerin {pay}/{payda} kadarı kırmızı.",
   "Kırmızı LED'lerin %{oran} kadarı şu an yanıyor."
  ],
  "istenen": "Kaç kırmızı LED yanıyor?",
  "vurgu": [
   "{n} LED",
   "{pay}/{payda} kadarı kırmızı",
   "%{oran} kadarı"
  ],
  "cevap": "kirmizi * oran / 100",
  "birim": "LED",
  "celdiriciler": [
   {
    "ifade": "kirmizi",
    "hata": "ilk-adimda-durdu"
   },
   {
    "ifade": "n * oran / 100",
    "hata": "yanlis-parca"
   },
   {
    "ifade": "kirmizi * oran",
    "hata": "yuzdeyi-sayi-sandi"
   }
  ],
  "kisa_hali": "{n} LED. {pay}/{payda} kırmızı. Kırmızıların %{oran} kadarı yanıyor. Kaç LED yanıyor?",
  "ipuclari": [
   "Yüzde hangi sayının üzerinden alınıyor: tüm LED'ler mi, kırmızılar mı?",
   "Önce kırmızı LED sayısını bul.",
   "{n} sayısını {payda} eşit parçaya böl, {pay} tanesini al."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Kırmızı LED sayısını bul: {n} ÷ {payda} × {pay}.",
   "Bu sayının %{oran} kadarı yanıyor: her 100 kırmızıdan {oran} tanesi.",
   "Kırmızı sayısını 100'e böl, {oran} ile çarp ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "uzunluk-kablo-cm-01",
  "konu": "uzunluk-birim",
  "konu_adi": "Uzunluk ölçme birimleri",
  "kazanim": "MAT.6.1.8",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "birim",
   "hesap"
  ],
  "parametreler": {
   "m": {
    "min": 2,
    "max": 5,
    "adim": 1
   },
   "cm": {
    "min": 20,
    "max": 90,
    "adim": 10
   }
  },
  "hikaye": [
   "Kâşif lambasına {m} m kablo bağladı.",
   "Hoparlörüne de {cm} cm kablo bağladı."
  ],
  "istenen": "Toplam kaç cm kablo kullandı?",
  "vurgu": [
   "{m} m",
   "{cm} cm"
  ],
  "cevap": "m*100 + cm",
  "birim": "cm",
  "celdiriciler": [
   {
    "ifade": "m + cm",
    "hata": "birim-donusturmedi"
   },
   {
    "ifade": "m*10 + cm",
    "hata": "birim-karisti"
   },
   {
    "ifade": "m*1000 + cm",
    "hata": "birim-karisti"
   }
  ],
  "kisa_hali": "{m} m ve {cm} cm kablo. Toplam kaç cm?",
  "ipuclari": [
   "Birimlere bak: ikisi de aynı mı?",
   "1 m kaç cm eder?",
   "Önce metreyi santimetreye çevir."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. 1 m = 100 cm. {m} m kaç cm eder?",
   "Çevirdiğin sayıya {cm} cm'yi ekle.",
   "Toplamı şıklarda ara."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "uzunluk-parkur-01",
  "konu": "uzunluk-birim",
  "konu_adi": "Uzunluk ölçme birimleri",
  "kazanim": "MAT.6.1.8",
  "zorluk": 2,
  "adimlar": [
   "iliski",
   "birim",
   "hesap"
  ],
  "parametreler": {
   "km": {
    "degerler": [
     "1,2",
     "1,5",
     "1,8",
     "2,5"
    ]
   },
   "m": {
    "min": 300,
    "max": 1000,
    "adim": 100
   }
  },
  "kisitlar": [
   "km*1000 > m",
   "2*m != km*1000"
  ],
  "hikaye": [
   "Okulun koşu parkuru {km} km uzunluğunda.",
   "Kâşif şimdiye kadar {m} metre koştu."
  ],
  "istenen": "Parkuru bitirmek için kaç metre daha koşmalı?",
  "vurgu": [
   "{km} km",
   "{m} metre"
  ],
  "cevap": "km*1000 - m",
  "birim": "m",
  "celdiriciler": [
   {
    "ifade": "km*1000 + m",
    "hata": "islem-secimi"
   },
   {
    "ifade": "km - m/1000",
    "hata": "birim-donusturmedi"
   },
   {
    "ifade": "m",
    "hata": "istenen-farkli"
   }
  ],
  "kisa_hali": "Parkur {km} km. {m} m koşuldu. Kaç m kaldı?",
  "ipuclari": [
   "Birimlere bak: km ile m karışık mı?",
   "1 km kaç metre?",
   "Önce parkuru metreye çevir."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. 1 km = 1000 m. {km} km kaç metre?",
   "Koştuğu {m} metreyi bundan çıkar.",
   "Kalan metreyi şıklarda ara."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "kesir-anlami-devre-karti-01",
  "konu": "kesir-anlami",
  "konu_adi": "Kesrin anlamı",
  "kazanim": "onkosul-5",
  "zorluk": 1,
  "adimlar": [
   "iliski"
  ],
  "parametreler": {
   "payda": {
    "degerler": [
     "5",
     "7"
    ]
   },
   "pay": {
    "min": 1,
    "max": 6,
    "adim": 1
   }
  },
  "kisitlar": [
   "pay < payda"
  ],
  "gosterim": "kesir",
  "hikaye": [
   "Kâşif bir devre kartını {payda} eşit parçaya ayırdı.",
   "Bunlardan {pay} parçayı lehimledi."
  ],
  "istenen": "Kartın kaçta kaçı lehimlendi?",
  "vurgu": [
   "{payda} eşit parçaya",
   "{pay} parçayı"
  ],
  "cevap": "pay/payda",
  "birim": "",
  "celdiriciler": [
   {
    "ifade": "(payda-pay)/payda",
    "hata": "istenen-farkli"
   },
   {
    "ifade": "pay/(payda-pay)",
    "hata": "yanlis-parca"
   },
   {
    "ifade": "payda/pay",
    "hata": "pay-payda-karisti"
   }
  ],
  "kisa_hali": "Kart {payda} eşit parça. {pay} parça lehimli. Kesir kaç?",
  "ipuclari": [
   "Bütün kaç eşit parçaya ayrıldı? Kaç parça seçildi?",
   "Payda bütünün kaç parça olduğunu, pay seçilen parçayı gösterir.",
   "Alttaki sayı bütünün parça sayısıdır."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Paydaya bütünün parça sayısını yaz.",
   "Paya lehimlenen parça sayısını yaz.",
   "Kesri oku ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 },
 {
  "id": "islem-secimi-pil-01",
  "konu": "islem-secimi",
  "konu_adi": "Hangi işlem? (sözel durumdan işlem seçme)",
  "kazanim": "onkosul-5",
  "zorluk": 1,
  "adimlar": [
   "iliski",
   "hesap"
  ],
  "parametreler": {
   "k": {
    "min": 3,
    "max": 6,
    "adim": 1
   },
   "q": {
    "min": 4,
    "max": 12,
    "adim": 1
   }
  },
  "turetilen": {
   "top": "k*q"
  },
  "hikaye": [
   "Kâşif'in {top} pili var.",
   "Pilleri {k} robota eşit olarak dağıtacak."
  ],
  "istenen": "Her robota kaç pil düşer?",
  "vurgu": [
   "{top} pili",
   "{k} robota eşit"
  ],
  "cevap": "top/k",
  "birim": "pil",
  "celdiriciler": [
   {
    "ifade": "top*k",
    "hata": "islem-secimi"
   },
   {
    "ifade": "top-k",
    "hata": "islem-secimi"
   },
   {
    "ifade": "top+k",
    "hata": "islem-secimi"
   }
  ],
  "kisa_hali": "{top} pil, {k} robot. Eşit dağıtılırsa her birine kaç pil?",
  "ipuclari": [
   "'Eşit dağıtmak' hangi işlemi çağırıyor?",
   "Toplama, çıkarma, çarpma ya da bölmeden hangisi paylaştırmaya uyar?",
   "Pil sayısını robot sayısına paylaştır."
  ],
  "ucuncu_deneme": [
   "Birlikte kuralım. Eşit paylaşım bölme demektir.",
   "Bölünen {top}, bölen {k}.",
   "{top} ÷ {k} işlemini yap ve şıklara yeniden bak."
  ],
  "yazan": "Sonnet alt ajanı taslak, Çıra denetimi 19.11.2026"
 }
];
