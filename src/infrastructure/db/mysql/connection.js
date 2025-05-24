const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Jika semua koneksi dalam pool sedang digunakan, tunggu hingga ada yang tersedia
  waitForConnections: true,
  connectionLimit: 10, // Jumlah maksimum koneksi yang bisa dibuka dalam pool
  queueLimit: 0, // Batasan antrian untuk koneksi yang menunggu (0 = tidak terbatas)
});

module.exports = pool;
