import React from 'react';
import NoteCard from './NoteCard.jsx';

export default function NotesFeed({ notes, loading, onUpvote }) {
  if (loading) {
    return <div style={{ color: '#94a3b8', padding: '24px' }}>Loading resources...</div>;
  }

  if (notes.length === 0) {
    return (
      <div style={{
        background: '#1e293b',
        border: '1px dashed #334155',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        color: '#94a3b8'
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '6px' }}>No study resources found.</p>
        <p style={{ fontSize: '0.85rem' }}>Be the first to share a note for this subject!</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px'
    }}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onUpvote={onUpvote} />
      ))}
    </div>
  );
}