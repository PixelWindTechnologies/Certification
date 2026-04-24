import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiArrowLeft, FiDatabase } from 'react-icons/fi';

const API_BASE = process.env.REACT_APP_API_URL || '';

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  const handleFile = (f) => {
    if (f && (f.name.endsWith('.xlsx') || f.name.endsWith('.csv'))) {
      setFile(f); setResult(null);
    } else {
      alert('Please upload a .xlsx or .csv file');
    }
  };

  const handleDrop = (e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await axios.post(`${API_BASE}/admin/upload`, form);
      setResult({ ok: true, data: res.data });
    } catch (err) {
      setResult({ ok: false, msg: err.response?.data?.message || 'Upload failed' });
    } finally { setLoading(false); }
  };

  return (
    <div className="admin-wrap">
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div className="logo-box" style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#1a56db,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiDatabase size={18} color="white" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Admin: Import Students</h1>
        </div>
        <p>Upload the Excel sheet (.xlsx) to import all student records into MongoDB Atlas.</p>

        <div
          className={`upload-zone ${drag ? 'drag' : ''}`}
          onClick={() => fileRef.current.click()}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
        >
          <input ref={fileRef} type="file" accept=".xlsx,.csv" onChange={e => handleFile(e.target.files[0])} />
          <FiUploadCloud size={40} style={{ color: file ? 'var(--primary)' : '#9ca3af', marginBottom: 10 }} />
          {file
            ? <p><strong>{file.name}</strong><br /><span style={{ color: '#9ca3af', fontSize: 12 }}>{(file.size / 1024).toFixed(1)} KB &middot; Ready to upload</span></p>
            : <p>Drag &amp; drop your Excel file here<br /><span style={{ color: '#adb5bd', fontSize: 12 }}>or click to browse (.xlsx, .csv)</span></p>
          }
        </div>

        <button className="btn-upload" onClick={handleUpload} disabled={!file || loading}>
          {loading ? 'Importing...' : 'Import to Database'}
        </button>

        {result && (
          <div className={`import-result ${result.ok ? 'ok' : 'err'}`}>
            {result.ok
              ? <><FiCheckCircle size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} /><strong>Import Complete!</strong> Inserted: {result.data.results.inserted} &middot; Updated: {result.data.results.updated} &middot; Skipped: {result.data.results.skipped}</>
              : <><FiAlertCircle size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />{result.msg}</>
            }
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px', background: '#f9fafb', borderRadius: 8, fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
          <strong>Expected Excel columns:</strong><br />
          Student ID, Student Name, Father Name, Internship Domain<br />
          <em>College, start_date, end_date default to Lendi / 26 Jan 2026 / 26 Mar 2026</em>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <a href="/" style={{ fontSize: 13, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
            <FiArrowLeft size={13} /> Back to Verification Portal
          </a>
        </div>
      </div>
    </div>
  );
}
