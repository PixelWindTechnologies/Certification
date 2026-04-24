require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => { console.error('❌ MongoDB connection error:', err); process.exit(1); });

// Multer setup for Excel upload
const upload = multer({ storage: multer.memoryStorage() });

// ─── API: Verify student by ID ───────────────────────────────────────────────
app.get('/student/:student_id', async (req, res) => {
  try {
    const id = req.params.student_id.trim().toUpperCase();
    const student = await Student.findOne({
      student_id: { $regex: new RegExp('^' + id + '$', 'i') }
    });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Invalid Certificate' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── API: Upload Excel and import students ───────────────────────────────────
app.post('/admin/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    const results = { inserted: 0, updated: 0, skipped: 0, errors: [] };

    for (const row of rows) {
      const student_id = (row['Student ID'] || row['student_id'] || '').toString().trim();
      const name = (row['Student Name'] || row['name'] || '').toString().trim();
      const father_name = (row['Father Name'] || row['father_name'] || '').toString().trim();
      const internship_domain = (row['Internship Domain'] || row['internship_domain'] || '').toString().trim();
      const college = (row['college'] || 'LENDI INSTITUTE OF ENGINEERING AND TECHNOLOGY').toString().trim();
      const start_date = (row['start_date'] || '26 Jan 2026').toString().trim();
      const end_date = (row['end_date'] || '26 Mar 2026').toString().trim();

      if (!student_id || student_id === 'PW/VSP/LENDI/IN/' || !name) {
        results.skipped++;
        continue;
      }

      try {
        const existing = await Student.findOne({ student_id: { $regex: new RegExp('^' + student_id + '$', 'i') } });
        if (existing) {
          await Student.updateOne({ student_id: existing.student_id }, { name, father_name, college, internship_domain, start_date, end_date });
          results.updated++;
        } else {
          await Student.create({ student_id, name, father_name, college, internship_domain, start_date, end_date });
          results.inserted++;
        }
      } catch (e) {
        results.errors.push(`${student_id}: ${e.message}`);
      }
    }

    res.json({ success: true, message: 'Import complete', results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to process file: ' + err.message });
  }
});

// ─── API: Get all students (admin) ───────────────────────────────────────────
app.get('/admin/students', async (req, res) => {
  try {
    const students = await Student.find({}).sort({ student_id: 1 });
    res.json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── API: Delete all (admin reset) ───────────────────────────────────────────
app.delete('/admin/students', async (req, res) => {
  await Student.deleteMany({});
  res.json({ success: true, message: 'All records deleted' });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
