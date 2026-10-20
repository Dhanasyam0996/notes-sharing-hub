import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import FilterSidebar from './components/FilterSidebar.jsx';
import NotesFeed from './components/NotesFeed.jsx';
import UploadModal from './components/UploadModal.jsx';
import { api } from './api/client.js';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    semester: '',
    resource_type: '',
  });

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        search: searchTerm,
      };
      // Clean empty keys
      Object.keys(params).forEach((key) => !params[key] && delete params[key]);
      const data = await api.getNotes(params);
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await api.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotes();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const handleUpvote = async (id) => {
    try {
      const res = await api.upvoteNote(id);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, upvotes: res.upvotes } : n))
      );
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  const handleResetFilters = () => {
    setFilters({ department: '', semester: '', resource_type: '' });
    setSearchTerm('');
  };

  return (
    <div className="app-container">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenUpload={() => setIsModalOpen(true)}
      />

      <div className="main-content">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />

        <section className="feed-section">
          <NotesFeed
            notes={notes}
            loading={loading}
            onUpvote={handleUpvote}
          />
        </section>
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subjects={subjects}
        onResourceUploaded={fetchNotes}
      />
    </div>
  );
}