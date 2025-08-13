import React, { useState } from 'react';

interface EmployeeTableProps {
  data: any[];
  pageSize?: number;
  onSubmit: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, pageSize = 10, onSubmit }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // Filter data based on search
  const filteredData = data.filter(
    (row) =>
      row.Employee_Name?.toLowerCase().includes(search.toLowerCase()) ||
      row.Employee_EmailID?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Reset to first page when search changes
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div style={{ marginTop: 32, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {/* <h2>Uploaded Employees</h2> */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: 4,
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: 300,
            fontSize: 16
          }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className="ss-table-cell">#</th>
            <th className="ss-table-cell">Employee Name</th>
            <th className="ss-table-cell">Employee EmailID</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              <td className="ss-table-cell" style={{ textAlign: 'center' }}>
                {(page - 1) * pageSize + idx + 1}
              </td>
              <td className="ss-table-cell">{row.Employee_Name}</td>
              <td className="ss-table-cell">{row.Employee_EmailID}</td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: 16, color: '#888' }}>
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8 }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{
            padding: '8px 20px',
            borderRadius: 4,
            border: '1px solid #bd2828',
            background: page === 1 ? '#f8d7da' : 'linear-gradient(90deg, #ff4e50, #bd2828, #e7131d)',
            color: page === 1 ? '#bd2828' : '#fff',
            fontWeight: 600,
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            opacity: page === 1 ? 0.6 : 1,
            minWidth: 70,
          }}
        >
          Prev
        </button>
        <span style={{ alignSelf: 'center', fontWeight: 500 }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          style={{
            padding: '8px 20px',
            borderRadius: 4,
            border: '1px solid #bd2828',
            background: page === totalPages || totalPages === 0 ? '#f8d7da' : 'linear-gradient(90deg, #ff4e50, #bd2828, #e7131d)',
            color: page === totalPages || totalPages === 0 ? '#bd2828' : '#fff',
            fontWeight: 600,
            cursor: page === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
            opacity: page === totalPages || totalPages === 0 ? 0.6 : 1,
            minWidth: 70,
          }}
        >
          Next
        </button>
      </div>
      {/* Submit Button */}
      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onSubmit}
            className="secret-santa-btn"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;