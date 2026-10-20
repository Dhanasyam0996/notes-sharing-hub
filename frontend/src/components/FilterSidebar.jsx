import React from 'react';

export default function FilterSidebar({ filters, setFilters, onReset }) {
  const departments = ['ALL', 'CSE', 'ECE', 'IT', 'MECH', 'CIVIL', 'AIDS'];
  const semesters = ['ALL', '1', '2', '3', '4', '5', '6', '7', '8'];
  const resourceTypes = [
    { label: 'All Resources', value: '' },
    { label: 'Class Notes', value: 'NOTES' },
    { label: 'Question Banks', value: 'QB' },
    { label: 'Syllabus Copies', value: 'SYLLABUS' },
  ];

  return (
    <aside style={{
      width: '240px',
      background: '#1e293b',
      padding: '18px',
      borderRadius: '8px',
      height: 'fit-content',
      border: '1px solid #334155'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1rem', color: '#94a3b8' }}>Filters</h3>
        <button onClick={onReset} style={{ background: 'transparent', color: '#38bdf8', fontSize: '0.8rem' }}>Reset</button>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Department</label>
        <select
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value === 'ALL' ? '' : e.target.value })}
          style={{ width: '100%', padding: '8px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '4px' }}
        >
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Semester</label>
        <select
          value={filters.semester}
          onChange={(e) => setFilters({ ...filters, semester: e.target.value === 'ALL' ? '' : e.target.value })}
          style={{ width: '100%', padding: '8px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '4px' }}
        >
          {semesters.map((s) => <option key={s} value={s}>{s === 'ALL' ? 'All Semesters' : `Semester ${s}`}</option>)}
        </select>
      </div>

      <div>
        <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>Type</label>
        {resourceTypes.map((t) => (
          <label key={t.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '6px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="resourceType"
              checked={filters.resource_type === t.value}
              onChange={() => setFilters({ ...filters, resource_type: t.value })}
            />
            {t.label}
          </label>
        ))}
      </div>
    </aside>
  );
}