const fs = require('fs');
const path = require('path');

const dbFolder = path.join(__dirname, 'src/pages/data/db');
const outputFile = path.join(__dirname, 'db.json');

// Ambil semua file .json di folder db/
const files = fs.readdirSync(dbFolder).filter(f => f.endsWith('.json'));

const combined = {};

files.forEach(file => {
  const key = path.basename(file, '.json'); // mahasiswa.json → mahasiswa
  const content = fs.readFileSync(path.join(dbFolder, file), 'utf-8');
  let data = JSON.parse(content);

  // Jika datanya array, konversi id jadi number
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

fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2));

console.log('✅ Berhasil generate db.json dari /src/pages/data/db (dengan ID number)');
