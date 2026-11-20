# Değişiklik günlüğü

## v2.1 · Kasım 2026

- **Yenilikler penceresi:** başlık ekranında sürüm etiketi (v2.1 · Kasım 2026); tıklayınca bu güncellemenin maddeleri açılır (Türkçe ve İngilizce).
- **Son seferler ve rozetler:** bitirdiğin son 8 seferin sonucu (zafer / iflas / süre doldu, gün, yıldız, puan) yerelde, `arena.kervan.history` anahtarında tutulur. Rozetler: «İlk zafer», «Hızlı kervan» (180. günden önce zafer), «Üç yıldız», «Beş sefer». Mevcut `save`, `best` ve `settings` anahtarlarına dokunulmadı; eski kayıtla açılış çalışıyor. «Hızlı kervan» ayrıca ortak rozet sistemine de işlenir (`Arena.award`).
- **Dokunma hedefleri:** dokunmatik ekranda 1x/2x/4x hız düğmeleri 36 pikselden 44 piksele çıktı.
- **Erişilebilirlik:** harita ve panel etiketleri (ekran okuyucu) seçili dile uyuyor; sayfa dili Türkçe iken İngilizce kalıyorlardı.
- **Sayfa:** `<title>`, açıklama, Open Graph ve Twitter kartı Türkçeleştirildi; `canonical`, `og:locale`, simge ve `theme-color` eklendi; Türkçe 404 sayfası eklendi; başlık ekranına «Diğer oyunlar» bağlantısı konuldu (portal yapılarında gizli).
- **Test:** `test/duman.mjs` duman testi eklendi (sayfa açılışı, konsol hatası, oyun başlangıcı, duraklatma, Yenilikler penceresi, telefonda taşma, bot sezonu).

## v2.0 · Kasım 2026

Yeni görsel kimlik ve `arena-core` v2; ayrıntı için README.
