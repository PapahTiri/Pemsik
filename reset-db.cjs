const fs = require('fs');
const path = require('path');

const dbFolder = path.join(__dirname, 'src/pages/data/db');
const outputFile = path.join(__dirname, 'db.json');

// 1. Hapus file db.json lama jika ada
if (fs.existsSync(outputFile)) {
  fs.unlinkSync(outputFile);
  console.log("🗑️  db.json lama dihapus");
}

// 2. Ambil semua file .json dari folder db
const files = fs.readdirSync(dbFolder).filter(f => f.endsWith('.json'));

const combined = {};

// 3. Gabungkan dan konversi id string ke number (jika bisa)
files.forEach(file => {
  const key = path.basename(file, '.json'); // dosen.json → dosen
  let data = JSON.parse(fs.readFileSync(path.join(dbFolder, file), 'utf-8'));

  if (Array.isArray(data)) {
    data = data.map(item => {
      if (item.id && typeof item.id === "string" && !isNaN(item.id)) {
        return { ...item, id: Number(item.id) };
      }
      return item;
    });
  }

  combined[key] = data;
});

// 4. Tulis db.json baru
fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2));
console.log("✅ Berhasil generate db.json bersih dari /src/pages/data/db");
