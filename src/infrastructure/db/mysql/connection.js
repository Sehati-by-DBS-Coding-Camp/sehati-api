const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '35.219.5.8',
  user: process.env.DB_USER || 'arykurnia',
  password: process.env.DB_PASSWORD || 'adakahbosq',
  database: process.env.DB_NAME || 'sehati_db',

  // Jika semua koneksi dalam pool sedang digunakan, tunggu hingga ada yang tersedia
  waitForConnections: true,
  connectionLimit: 10, // Jumlah maksimum koneksi yang bisa dibuka dalam pool
  queueLimit: 0, // Batasan antrian untuk koneksi yang menunggu (0 = tidak terbatas)
});

module.exports = pool;
