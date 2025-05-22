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


source:
[medium-elaurichetoho](https://medium.com/@elaurichetoho/clean-architecture-with-nodejs-4a62a67b2bff), [medium-ben](https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3)
