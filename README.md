# Best Panel — Full Stack Netlify

Bu sürümde:
- Kayıt / giriş / çıkış
- HttpOnly oturum cookie'si
- PBKDF2 ile şifre hashleme
- Netlify Blobs ile kalıcı kullanıcı ve abonelik verisi
- Aktivasyon kodu sistemi
- Admin uçları: kullanıcı listesi + abonelik kodu oluşturma/listeleme
- Responsive frontend

## Netlify deploy
1. ZIP'i aç.
2. Netlify'da yeni site oluşturup klasörü deploy et.
3. Environment variables içine `ADMIN_EMAIL` ve `ADMIN_PASSWORD` ekle.
4. Deploy sonrası `https://SITENAME.netlify.app` adresi otomatik oluşur.

Netlify Functions varsayılan olarak `/.netlify/functions/<name>` adreslerinden erişilir.

## Aktivasyon kodu
Admin tarafında `admin` function ile kod oluşturulabilir. Örnek POST:
{"action":"create-code","days":30,"plan":"Premium","code":"BP-30D-ABC123"}

Üretim kullanımında ayrıca rate limiting, e-posta doğrulama, şifre sıfırlama, audit log ve ödeme sağlayıcısı eklenmesi önerilir.
