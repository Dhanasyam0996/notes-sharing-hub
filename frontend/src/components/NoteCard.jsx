import React from 'react';

export default function NoteCard({ note, onUpvote }) {
  const badgeColors = {
    NOTES: '#0284c7',
    QB: '#e11d48',
    SYLLABUS: '#16a34a',
  };

  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: badgeColors[note.resource_type] || '#475569',
            fontWeight: 600
          }}>
            {note.resource_type}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {note.subject_details?.department} • Sem {note.subject_details?.semester}
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#f8fafc' }}>{note.title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 500, marginBottom: '6px' }}>
          {note.subject_details?.name} ({note.subject_details?.code})
        </p>
        {note.description && (
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{note.description}</p>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #334155',
        paddingTop: '12px',
        marginTop: '8px'
      }}>
        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Shared by {note.uploader_name}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => onUpvote(note.id)}
            style={{
              background: '#334155',
              color: '#38bdf8',
              padding: '6px 10px',
              fontSize: '0.85rem'
            }}
          >
            ▲ {note.upvotes}
          </button>
          <a
            href={note.file_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#0284c7',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            Open ↗
          </a>
        </div>
      </div>
    </div>
  );
}