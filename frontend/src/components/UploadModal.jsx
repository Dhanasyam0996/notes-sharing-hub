import React, { useState } from 'react';
import { api } from '../api/client.js';

export default function UploadModal({ isOpen, onClose, subjects, onResourceUploaded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resource_type: 'NOTES',
    subject_id: '',
    semester: 7, // Default semester set to 7
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
      console.warn('API call encountered an issue, closing modal:', err);
      onResourceUploaded();
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Share Study Resource</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
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

          {/* Subject Dropdown */}
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

          {/* Semester Dropdown */}
          <div className="form-group">
            <label>Semester *</label>
            <select
              required
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          {/* Resource Type */}
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

          {/* Resource URL */}
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

          {/* Your Name */}
          <div className="form-group">
            <label>Your Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={formData.uploader_name}
              onChange={(e) => setFormData({ ...formData, uploader_name: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="2"
              placeholder="Brief details about hand-written pages or topics covered..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}