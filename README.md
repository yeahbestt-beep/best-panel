# Best Panel — GitHub + Netlify

Bu paket GitHub reposuna aktarılıp Netlify ile deploy edilmek üzere hazırlanmıştır.

## Klasör yapısı
- `public/` → web sitesinin dosyaları
- `netlify/functions/` → giriş/kayıt, abonelik ve admin API'leri
- `netlify.toml` → Netlify ayarları
- `package.json` → Netlify Blobs bağımlılığı

## GitHub'a yükleme
ÖNEMLİ: GitHub'a ZIP dosyasını doğrudan yüklemek, ZIP'i otomatik olarak açmaz.

1. Bu ZIP'i telefonunda veya bilgisayarında çıkar.
2. Çıkan klasörün İÇİNDEKİ tüm dosya ve klasörleri GitHub'daki `best-panel` reposunun ana dizinine yükle.
3. Repo kökünde `public`, `netlify`, `netlify.toml` ve `package.json` görünmelidir.

## Netlify
GitHub reposunu Netlify'a bağla. `netlify.toml` otomatik olarak:
- Publish directory: `public`
- Functions directory: `netlify/functions`
ayarlarını kullanır.

## Environment variables
Netlify > Project configuration > Environment variables bölümünde:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

değişkenlerini kendin oluştur. Şifreni GitHub'a veya sohbet mesajına koyma.

## Not
Bu paket özel bir ağ engeli aşma mekanizması içermez; normal Netlify/GitHub dağıtımı için hazırlanmıştır.
