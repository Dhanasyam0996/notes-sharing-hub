const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const api = {
  getSubjects: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/api/subjects/?${query}`);
    return res.json();
  },

  createSubject: async (data) => {
    const res = await fetch(`${BASE_URL}/api/subjects/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getNotes: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/api/notes/?${query}`);
    return res.json();
  },

  createNote: async (data) => {
    const res = await fetch(`${BASE_URL}/api/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  upvoteNote: async (id) => {
    const res = await fetch(`${BASE_URL}/api/notes/${id}/upvote/`, {
      method: 'POST',
    });
    return res.json();
  },
};