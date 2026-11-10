# Panduan: SO Harian jadi aplikasi HP (gratis)

Folder ini berisi **halaman pembungkus** untuk aplikasi SO Harian. Halaman ini menampilkan web app Apps Script
dalam layar penuh, punya ikon Kopdes, bisa dipasang di layar utama HP, dan bisa diubah menjadi file **APK Android**.
Folder ini **tidak ikut** `clasp push` (lihat `.claspignore`).

| File | Isi |
|---|---|
| `index.html` | Halaman pembungkus (aplikasi tampil penuh + layar "tidak ada sinyal") |
| `manifest.webmanifest` | Nama aplikasi, warna, ikon (membuat bisa "dipasang") |
| `sw.js` | Menyimpan cangkang halaman agar tetap terbuka saat offline |
| `ikon-*.png`, `apple-touch-icon.png`, `favicon-48.png` | Ikon 48, 180, 192, 512 dan versi *maskable* |
| `.nojekyll` | Wajib untuk GitHub Pages agar folder `.well-known` (untuk APK) ikut tayang |

---

## Langkah 1 — Tayangkan gratis di GitHub Pages (± 15 menit, sekali saja)

1. Buat akun di https://github.com (gratis). Nama pengguna, misalnya `naratech`, akan menjadi alamat aplikasi.
2. Klik **New repository** → beri nama **persis** `rhenaldiherlambang24-oss.github.io` (ganti `naratech` dengan nama pengguna Anda) → **Public** → **Create repository**.
3. Klik **uploading an existing file** → seret **semua isi folder `pembungkus`** (termasuk file ikon dan `.nojekyll`) → **Commit changes**.
   - Kalau `.nojekyll` tidak terlihat di Windows Explorer, aktifkan *View → Hidden items*.
4. Buka **Settings → Pages** → Source: **Deploy from a branch** → Branch **main** / **(root)** → **Save**.
5. Tunggu 1–2 menit, lalu buka `https://rhenaldiherlambang24-oss.github.io` di HP. Aplikasi SO Harian akan tampil penuh.

## Langkah 2 — Pasang di HP petugas (gratis)

- **Android (Chrome):** buka alamat di atas → menu **⋮** → **Instal aplikasi** / **Tambahkan ke layar utama**.
- **iPhone (Safari):** buka alamat di atas → tombol **Bagikan** → **Tambahkan ke Layar Utama**.

## Langkah 3 — Buat file APK Android (gratis)

1. Buka https://www.pwabuilder.com → tempel `https://rhenaldiherlambang24-oss.github.io` → **Start**.
2. Klik **Package for stores → Android → Generate Package**.
   - Package ID contoh: `id.naratech.soharian`. App name: `SO Harian KDKMP`.
3. Unduh file ZIP hasilnya. Di dalamnya ada:
   - `*.apk` → file yang dibagikan ke petugas (WhatsApp / Google Drive).
   - `*.aab` → hanya untuk Play Store (nanti).
   - `assetlinks.json` → **wajib diunggah** supaya aplikasi tampil penuh tanpa bilah alamat.
   - `signing.keystore` + `signing-key-info.txt` → **SIMPAN baik-baik** (Google Drive pribadi). Tanpa ini, aplikasi tidak bisa diperbarui.
4. Di repository GitHub: **Add file → Create new file** → nama file `.well-known/assetlinks.json` → tempel isi `assetlinks.json` → **Commit**.
5. Bagikan file `.apk` ke petugas. Saat memasang, Android akan meminta izin **"Instal dari sumber tidak dikenal"** — izinkan untuk WhatsApp/Drive.

## Nanti — Google Play Store (USD 25 sekali bayar)

Unggah file `.aab` dari Langkah 3 ke **Google Play Console**. Akun pribadi baru wajib uji tertutup
(minimal 12 penguji selama 14 hari) sebelum rilis publik; akun organisasi (D-U-N-S NARA TECH) tidak.

---

### Catatan
- Kalau URL deployment Apps Script berubah, ganti alamat `src` di `index.html` lalu unggah ulang.
  Selama Anda selalu memakai **deployment yang sama** (Kelola deployment → Versi baru), URL tidak berubah.
- Web app sudah diizinkan tampil di dalam halaman lain (`XFrameOptionsMode.ALLOWALL` di `Kode.js`).
- Saat diuji (10 Nov 2026), banner Google "Aplikasi ini dibuat oleh pengguna Google Apps Script" **tidak tampil** di dalam pembungkus. Google bisa mengubah aturan ini sewaktu-waktu.
- Untuk ikon yang lebih tajam, ganti file ikon `ikon-*.png` dengan logo resolusi tinggi (minimal 512×512).
