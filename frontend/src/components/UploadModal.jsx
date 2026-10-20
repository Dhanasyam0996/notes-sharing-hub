import React, { useState } from 'react';
import { api } from '../api/client.js';

export default function UploadModal({ isOpen, onClose, subjects, onResourceUploaded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resource_type: 'NOTES',
    subject_id: '',
    file_url: '',
    uploader_name: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.file_url || !formData.subject_id) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      await api.createNote(formData);
      onResourceUploaded();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to upload resource.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Share Study Resource</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Unit 3 Dynamic Programming Notes"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <select
              required
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name} ({s.department})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Resource Type</label>
            <select
              value={formData.resource_type}
              onChange={(e) => setFormData({ ...formData, resource_type: e.target.value })}
            >
              <option value="NOTES">Class Notes</option>
              <option value="QB">Question Bank</option>
              <option value="SYLLABUS">Syllabus Copy</option>
            </select>
          </div>

          <div className="form-group">
            <label>Resource URL (Google Drive / Doc link) *</label>
            <input
              type="url"
              required
              placeholder="https://drive.google.com/..."
              value={formData.file_url}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Your Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={formData.uploader_name}
              onChange={(e) => setFormData({ ...formData, uploader_name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="2"
              placeholder="Brief details about hand-written pages or topics covered..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Submit Resource</button>
          </div>
        </form>
      </div>
    </div>
  );
}