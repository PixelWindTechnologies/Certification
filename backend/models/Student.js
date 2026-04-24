const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  father_name: { type: String, required: true, trim: true },
  college: { type: String, required: true, trim: true },
  internship_domain: { type: String, required: true, trim: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
