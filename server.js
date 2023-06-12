const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

// Middleware untuk mengizinkan permintaan dari alamat asal tertentu
app.use(cors());

// Parsing body request
app.use(express.json());

// Data guru (contoh data sederhana)
let gurus = [
  { id: 1, nama: 'Guru 1', usia: 30, alamat: 'Alamat Guru 1' },
  { id: 2, nama: 'Guru 2', usia: 35, alamat: 'Alamat Guru 2' },
  { id: 3, nama: 'Guru 3', usia: 40, alamat: 'Alamat Guru 3' }
];

// GET: Mendapatkan semua data guru
app.get('/guru', (req, res) => {
  res.json(gurus);
});

// GET: Mendapatkan data guru berdasarkan ID
app.get('/guru/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const guru = gurus.find(g => g.id === id);
  if (guru) {
    res.json(guru);
  } else {
    res.status(404).json({ message: 'Guru tidak ditemukan' });
  }
});

// POST: Menambahkan data guru baru
app.post('/guru', (req, res) => {
  const guru = req.body;
  guru.id = gurus.length + 1;
  gurus.push(guru);
  res.status(201).json(guru);
});

// PUT: Mengupdate data guru berdasarkan ID
app.put('/guru/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const guruIndex = gurus.findIndex(g => g.id === id);
  if (guruIndex !== -1) {
    gurus[guruIndex] = { ...gurus[guruIndex], ...req.body };
    res.json(gurus[guruIndex]);
  } else {
    res.status(404).json({ message: 'Guru tidak ditemukan' });
  }
});

// DELETE: Menghapus data guru berdasarkan ID
app.delete('/guru/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const guruIndex = gurus.findIndex(g => g.id === id);
  if (guruIndex !== -1) {
    const guru = gurus[guruIndex];
    gurus.splice(guruIndex, 1);
    res.json(guru);
  } else {
    res.status(404).json({ message: 'Guru tidak ditemukan' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
