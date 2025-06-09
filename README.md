# SEHATI
RESTFull API for SEHATI project.

## API Documentation
Silahkan baca dokumentasi API di bawah ini <br>
[OpenAPI Documentation](https://sehati-by-dbs-coding-camp.github.io/sehati-api/)

## Clean Architecture
<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" width="400">

### Tujuan
Project berusaha menerapkan clean architecture untuk pembelajaran dan agar suatusaat mudah di kembangkan.

### Penjelasan
Clean Architecture adalah filosofi desain perangkat lunak (software) yang memisahkan kode ke dalam lapisan-lapisan (layers) yang konsentris (berpusat di tengah), dengan penekanan kuat pada pemisahan tanggung jawab (separation of concerns) dan aturan ketergantungan (dependency rules).

### folder structure
```
.
├── src
│   ├── application
│   │   ├── use_cases
│   │   └── interfaces
│   │       ├── controllers
│   │       ├── storage
│   │       └── validators
│   ├── domain
│   │   ├── model
│   │   └── service
│   └── infrastructure
│       ├── http 
│       │   └── hapi
│       │       ├── routes
│       │       └── middleware
│       ├── db
│       └── logger
├── tests
│   ├── unit
│   └── integration
├── .env
├── .gitignore
├── package.json
└── README.md
```

## commit rule
**Penjelasan Format Conventional Commits dengan Scope**
```
<type>(<scope>): <short summary>
```
- **type**: Jenis perubahan (feat, fix, docs, dsb).
- **scope**: (opsional) Bagian/fitur/komponen aplikasi yang berubah, ditulis dalam tanda kurung.
- **short summary**: Ringkasan perubahan.

**Conventional Commits**
- `feat`: Penambahan fitur baru
- `fix`: Memperbaiki bug
- `docs`: Perubahan dokumentasi saja (tidak menyentuh kode aplikasi)
- `style`: Perubahan format/tata letak kode (indentasi, spasi, titik koma, dsb), tanpa mengubah logic
- `refactor`: Refactor kode (mengubah struktur/arsitektur tanpa mengubah perilaku/fitur)
- `perf`: Perbaikan performa (optimasi, mempercepat eksekusi, dsb)
- `test`: Menambah/memperbaiki kode pengujian (unit test, integration test, dsb)
- `build`: Perubahan yang mempengaruhi sistem build atau dependency eksternal (npm, gradle, docker, dsb)
- `ci`: Perubahan pada konfigurasi Continuous Integration (GitHub Actions, Travis, Circle, dsb)
- `chore`: Perubahan minor atau tugas rutin (misal update dependency, bukan pada source code aplikasi)
- `revert`: Membatalkan perubahan commit sebelumnya
- `merge`: Commit hasil merge branch (opsional, biasanya auto-generated)

**Contoh Penggunaan:**
- `feat(auth): add fitur autentikasi`
  - Menambahkan fitur autentikasi pada bagian auth.
- `fix(login): perbaiki validasi password`
  - Memperbaiki bug validasi password pada halaman login.
- `docs(readme): update cara instalasi`
  - Update dokumentasi README pada bagian instalasi.

**Contoh Commit Message Lainnya**
```
feat(profile): implement edit profile page
fix(api): handle timeout error on data fetch
chore(deps): update dependency react to v18
refactor(user-service): optimize query for user lookup
test(auth): add tests for login functionality
```
