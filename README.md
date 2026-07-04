# politics5.org

Siyaset 5.0 kamuya açık tanıtım, yöntem ve şeffaflık sitesi.

## Teknoloji seçimi

Bu proje **statik web sitesi** olarak tasarlanmıştır:

- **HTML5:** Semantik içerik ve erişilebilirlik
- **CSS3:** Özgün, mobil uyumlu kullanıcı arayüzü
- **Saf JavaScript:** Mobil menü, hareket azaltma tercihi ve görünüm etkileşimleri
- **Apache/LiteSpeed `.htaccess`:** Temel güvenlik başlıkları ve sıkıştırma

Sunucuda Node.js, Docker, veritabanı veya sunucu tarafı uygulama çalıştırılmaz. Bu tercih, Natro paylaşımlı hosting ile uyumluluk, düşük bakım maliyeti ve saldırı yüzeyinin azaltılması içindir.

## Mimari sınırı

- `politics5.org`: Tanıtım, yöntem, şeffaflık, raporlar ve anonimleştirilmiş etki göstergeleri.
- `nextlife.harran.edu.tr`: Kimlik doğrulama gerektiren başvuru, anket ve süreç takip işlemleri.

Bu depoya kişisel veri alan form, veri tabanı bağlantısı, takip çerezi veya reklam kodu eklenmemelidir.

## Yerelde görüntüleme

Bu proje derleme gerektirmez. `index.html` dosyası tarayıcıda açılabilir. Daha doğru test için proje klasöründe basit bir HTTP sunucusu kullanılabilir:

```bash
python3 -m http.server 8080
```

Ardından `http://localhost:8080` adresini açın.

## Natro'ya yayınlama

1. Natro panelinde `politics5.org` alan adının bu hosting paketine bağlı olduğundan emin olun.
2. Linux hosting ve cPanel tercih edin.
3. cPanel > **Dosya Yöneticisi** > alan adının belge kökü klasörünü açın. Ana alan adı için bu klasör çoğunlukla `public_html` olur.
4. Bu deponun içeriğini, `.git` klasörü hariç olacak şekilde belge köküne yükleyin:
   - `index.html`
   - `.htaccess`
   - `robots.txt`
   - `sitemap.xml`
   - `assets/`
5. Alan adının SSL sertifikasını etkinleştirin ve `https://politics5.org` üzerinden açıldığını doğrulayın.
6. Yayın sonrasında en az şu adresleri kontrol edin:
   - `https://politics5.org/`
   - `https://politics5.org/robots.txt`
   - `https://politics5.org/sitemap.xml`

## İçerik yayın ilkesi

Raporlar, aydınlatma metni, etik ilkeler ve proje güncellemeleri yayımlandıkça ayrı HTML sayfaları veya statik Markdown'dan üretilen sayfalar olarak eklenmelidir. Başvuru sahiplerinin adı, iletişim bilgisi, tam adresi veya ham başvuru metni bu sitede yayımlanmaz.
