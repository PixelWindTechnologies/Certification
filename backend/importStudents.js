// Run: node importStudents.js
require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

const STUDENTS = [
  { student_id: 'PW/VSP/LENDI/IN/001', name: 'Burada Dhana Lakshmi', father_name: 'Burada Gangaraju', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/002', name: 'Bonumahanti Kusuma', father_name: 'Bonumahanti Kumar Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/003', name: 'Boni Sudheer', father_name: 'Boni Siva', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/004', name: 'Gantyada Lokesh', father_name: 'Gantyada Gowri Sankar Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/005', name: 'Althi Niharika', father_name: 'Althi Ramana', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/006', name: 'Adatarao Sathish', father_name: 'Adatarao Venkata Ramana', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/007', name: 'Dandu Amith Varma', father_name: 'Dandu Seetha Babu', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/008', name: 'Dubbaka Dhanya', father_name: 'Dubbaka Appala Raju', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/009', name: 'Kalyanpudi Katyayani Devi', father_name: 'Kalyanpudi Govind', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/010', name: 'Arisetti Vybhava Lakshmi', father_name: 'Arisetti Srinivasa Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/011', name: 'Chevuri Sri Varshitha', father_name: 'Chevuri Ramesh Babu', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/012', name: 'Dekkatha Mounika', father_name: 'Dekkatha Appala Guruvulu', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/013', name: 'Gadi Ramya', father_name: 'Gadi Tirupathi Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/014', name: 'Gantlana Bharath Kumar', father_name: 'Gantlana Nageswara Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/015', name: 'Addepalli Mohith Sai Vikramaditya Varma', father_name: 'Addepalli Rama Raju', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/016', name: 'Dadi Mounika', father_name: 'Dadi Jayababu', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/017', name: 'Gadipalli Bharathi', father_name: 'G. Appalanaidu', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/018', name: 'Dondapathi Naresh', father_name: 'Donpathi Vasudeva Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/019', name: 'Amjuri Sandeep', father_name: 'Amjuri Rambabu', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/020', name: 'B. Komal Kumar', father_name: 'B. Srinivasa Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/021', name: 'Ganivada Vamsi', father_name: 'G. Ramakrishna', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/022', name: 'Gorusu Balaji', father_name: 'G. Jagadeeswarao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/023', name: 'Jahnavi Kuppiri', father_name: 'K. Lakshmi Prasanna Kumar', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/024', name: 'Mailapilli Reethu', father_name: 'M. Lakshman Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/025', name: 'Kanduri V N Vyashnavi', father_name: 'K.V. Rama Prasad', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/026', name: 'Kunisetti Hemanth', father_name: 'K. Srinivas Rao', internship_domain: 'Ethical Hacking' },
  { student_id: 'PW/VSP/LENDI/IN/027', name: 'Chelluri Lalitha Madhuri', father_name: 'Chelluri Srinivasa Rao', internship_domain: 'AWS IoT Cloud Engineering' },
  { student_id: 'PW/VSP/LENDI/IN/028', name: 'Gara Naga Sai Nareen', father_name: 'Gara Apparao', internship_domain: 'Business Analytics and Data Visualization' },
  { student_id: 'PW/VSP/LENDI/IN/029', name: 'Bulli Tim Kumar', father_name: 'Bulli Appala Naidu', internship_domain: 'Google Data Analytics' },
];

const COMMON = {
  college: 'LENDI INSTITUTE OF ENGINEERING AND TECHNOLOGY',
  start_date: '26 Jan 2026',
  end_date: '26 Mar 2026',
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas');

  let inserted = 0, updated = 0;
  for (const s of STUDENTS) {
    const doc = { ...s, ...COMMON };
    const exists = await Student.findOne({ student_id: doc.student_id });
    if (exists) {
      await Student.updateOne({ student_id: doc.student_id }, doc);
      updated++;
    } else {
      await Student.create(doc);
      inserted++;
    }
  }
  console.log(`✅ Import done. Inserted: ${inserted}, Updated: ${updated}`);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
