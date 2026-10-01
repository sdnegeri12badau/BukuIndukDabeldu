# Buku Induk Digital – SD Negeri 12 Badau

Aplikasi web statis (HTML/CSS/JS) dengan cover, dashboard, data siswa (bagian A–O), cetak, serta impor/ekspor Excel.

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub, unggah semua isi folder ini (index.html, app.js, style.css, firebase-config.js, folder assets).
2. Buka **Settings → Pages**, pada *Source* pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu Save.
3. Alamat aplikasi: `https://USERNAME.github.io/NAMA-REPO/`.

## Penyimpanan data
- **Mode lokal (default):** data disimpan di browser perangkat yang dipakai. Tiap guru/perangkat punya data sendiri. Gunakan *Ekspor Data (Excel)* untuk cadangan dan *Impor* untuk memindahkan data.
- **Mode bersama (semua guru satu data):** GitHub Pages hanya hosting statis, sehingga butuh database online gratis:
  1. Buat proyek di https://console.firebase.google.com, tambahkan *Web app*, aktifkan **Firestore Database**.
  2. Salin konfigurasi web ke `firebase-config.js`.
  3. Atur *Rules* Firestore, misalnya `match /siswa/{id} { allow read, write: if true; }` hanya untuk uji coba.

> Keamanan: aturan `if true` membuat data bisa dibaca/ditulis siapa pun yang tahu alamat aplikasi. Data siswa bersifat pribadi, jadi untuk pemakaian nyata tambahkan Firebase Authentication dan batasi rules ke akun guru.
