import React from 'react';

export default function Navbar({ searchTerm, setSearchTerm, onOpenUpload }) {
  return (
    <header style={{
      background: '#1e293b',
      borderBottom: '1px solid #334155',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>📚</span>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8' }}>StudyHub</h1>
      </div>

      <div style={{ flex: 1, maxWidth: '480px' }}>
        <input
          type="text"
          placeholder="Search subjects, codes, or note titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#fff',
            outline: 'none'
          }}
        />
      </div>

      <button
        onClick={onOpenUpload}
        style={{
          background: '#0284c7',
          color: '#fff',
          padding: '10px 18px',
          fontWeight: 600
        }}
      >
        + Share Resource
      </button>
    </header>
  );
}