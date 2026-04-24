import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  FiSearch, FiShield, FiCheckCircle, FiXCircle,
  FiUser, FiHash, FiUsers, FiBook, FiCalendar,
  FiArrowLeft, FiLock, FiBriefcase, FiAward
} from 'react-icons/fi';

const API_BASE = process.env.REACT_APP_API_URL || '';

export default function VerifyPage() {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleVerify = async () => {
    const id = studentId.trim();
    if (!id) { inputRef.current?.focus(); return; }
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.get(`${API_BASE}/student/${encodeURIComponent(id)}`);
      setResult({ success: true, data: res.data.data });
    } catch (err) {
      setResult({ success: false, message: err.response?.data?.message || 'Invalid Certificate' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleVerify(); };
  const handleReset = () => { setResult(null); setStudentId(''); inputRef.current?.focus(); };

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="header-inner">
          <div className="logo-box"><FiAward size={22} color="white" /></div>
          <div className="header-text">
            <div className="company-name">PW Skills</div>
            <div className="portal-title">Certificate Verification Portal</div>
          </div>
          <div className="verified-badge-header">
            <FiLock size={13} /><span>Secure Verification</span>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <div className="hero-icon-wrap"><FiShield size={40} className="hero-icon" /></div>
          <h1>Certificate Verification</h1>
          <p>Enter the Student ID printed on your internship certificate to instantly verify its authenticity.</p>
        </div>

        <div className="search-card">
          <label className="search-label" htmlFor="sid-input">Student Certificate ID</label>
          <div className="search-row">
            <div className="input-wrap">
              <FiHash className="input-icon" size={16} />
              <input
                id="sid-input" ref={inputRef} className="search-input" type="text"
                placeholder="e.g. PW/VSP/LENDI/IN/001"
                value={studentId}
                onChange={e => setStudentId(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown} autoComplete="off" autoFocus
              />
            </div>
            <button className="btn-verify" onClick={handleVerify} disabled={loading}>
              {loading
                ? <><span className="btn-spinner" /> Verifying...</>
                : <><FiSearch size={16} style={{ marginRight: 8 }} /> Verify Certificate</>}
            </button>
          </div>
          <div className="search-hint">Format: <code>PW/VSP/LENDI/IN/001</code> &nbsp;&middot;&nbsp; Case-insensitive</div>
        </div>

        {loading && (
          <div className="loading-wrap">
            <div className="spinner" />
            <p>Checking certificate database...</p>
          </div>
        )}

        {!loading && result && (
          result.success
            ? <SuccessCard data={result.data} onReset={handleReset} />
            : <ErrorCard onReset={handleReset} />
        )}
      </main>

      <footer className="footer">
        <FiShield size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
        This certificate is digitally verified by <strong> PW Skills (PhysicsWallah)</strong>
        &nbsp;&middot;&nbsp; Lendi Institute of Engineering and Technology &nbsp;&middot;&nbsp; 2026
      </footer>
    </div>
  );
}

function SuccessCard({ data, onReset }) {
  const fields = [
    { icon: <FiHash size={15} />,      label: 'Student ID',        value: data.student_id,       mono: true },
    { icon: <FiUsers size={15} />,     label: "Father's Name",      value: data.father_name },
    { icon: <FiBook size={15} />,      label: 'College',            value: data.college },
    { icon: <FiBriefcase size={15} />, label: 'Internship Domain',  value: data.internship_domain },
    { icon: <FiCalendar size={15} />,  label: 'Start Date',         value: data.start_date },
    { icon: <FiCalendar size={15} />,  label: 'End Date',           value: data.end_date },
  ];
  return (
    <div className="result-card success">
      <div className="result-header success">
        <div className="status-icon success"><FiCheckCircle size={28} /></div>
        <div className="result-header-text">
          <h2>Certificate Verified</h2>
          <p>This is an authentic certificate issued by PW Skills</p>
        </div>
        <div className="verified-stamp">VERIFIED</div>
      </div>
      <div className="result-body">
        <div className="student-name-row">
          <div className="student-name-left">
            <div className="name-avatar"><FiUser size={20} /></div>
            <h3>{data.name}</h3>
          </div>
          <span className="domain-pill"><FiBriefcase size={12} style={{ marginRight: 5 }} />{data.internship_domain}</span>
        </div>
        <div className="details-grid">
          {fields.map((f, i) => (
            <div className="detail-item" key={i}>
              <div className="detail-label"><span className="detail-icon">{f.icon}</span>{f.label}</div>
              <div className={`detail-value ${f.mono ? 'mono' : ''}`}>{f.value}</div>
            </div>
          ))}
        </div>
        <div className="cert-footer-row">
          <FiShield size={15} className="cert-shield" />
          <span>Certificate status: <strong>VERIFIED &amp; AUTHENTIC</strong> &nbsp;&middot;&nbsp; Issued by PW Skills &nbsp;&middot;&nbsp; 2026</span>
        </div>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={onReset} className="btn-ghost"><FiArrowLeft size={14} style={{ marginRight: 6 }} />Verify Another</button>
        </div>
      </div>
    </div>
  );
}

function ErrorCard({ onReset }) {
  return (
    <div className="result-card error">
      <div className="result-header error">
        <div className="status-icon error"><FiXCircle size={28} /></div>
        <div className="result-header-text">
          <h2>Invalid Certificate</h2>
          <p>No certificate found for this Student ID</p>
        </div>
      </div>
      <div className="error-body">
        <p>The Student ID you entered does not match any record in our database.<br />Please double-check the ID printed on your certificate.</p>
        <p className="hint">If you believe this is an error, please contact PW Skills support.</p>
        <div style={{ marginTop: 24 }}>
          <button onClick={onReset} className="btn-ghost"><FiArrowLeft size={14} style={{ marginRight: 6 }} />Try Again</button>
        </div>
      </div>
    </div>
  );
}
