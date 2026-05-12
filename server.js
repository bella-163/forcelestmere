const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'assets/images')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('只允許圖片檔案'));
  },
});

const DATA_DIR = path.join(__dirname, 'data');
const ALLOWED = ['classes', 'equipment', 'monsters', 'commands', 'news', 'server-info'];

app.get('/api/data/:name', (req, res) => {
  const { name } = req.params;
  if (!ALLOWED.includes(name)) return res.status(403).json({ error: 'forbidden' });
  const file = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'not found' });
  res.json(JSON.parse(fs.readFileSync(file, 'utf8')));
});

app.post('/api/data/:name', (req, res) => {
  const { name } = req.params;
  if (!ALLOWED.includes(name)) return res.status(403).json({ error: 'forbidden' });
  const file = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2), 'utf8');
  res.json({ ok: true });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ path: `assets/images/${req.file.filename}` });
});

app.listen(PORT, () => {
  console.log(`展示版：http://localhost:${PORT}`);
  console.log(`編輯版：http://localhost:${PORT}/admin`);
});
