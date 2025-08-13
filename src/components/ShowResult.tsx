import React, { useState } from 'react';
import Papa from 'papaparse';

interface ShowResultProps {
  employees: any[];
  previousYearData: any[];
  onBack: () => void;
}

const ShowResult: React.FC<ShowResultProps> = ({ employees, previousYearData, onBack }) => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    setError('');
    // Validate minimum employees
    if (!employees || employees.length < 2) {
      setError('At least 2 employees are required.');
      setAssignments([]);
      return;
    }

    try {
      // Build a map of previous assignments for quick lookup
      const prevMap = new Map<string, string>();
      previousYearData.forEach(row => {
        prevMap.set(row.Employee_EmailID, row.Secret_Child_EmailID);
      });

      // Try to generate a valid assignment with constraints
      let attempts = 0;
      let valid = false;
      let result: any[] = [];

      while (attempts < 1000 && !valid) {
        attempts++;
        // Shuffle employees for assignment
        const shuffled = [...employees];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Check constraints for each assignment
        valid = true;
        for (let i = 0; i < employees.length; i++) {
          const santa = employees[i];
          const child = shuffled[i];
          // Constraint 1: No self-assignment
          // Constraint 2: Not same as last year
          if (
            santa.Employee_EmailID === child.Employee_EmailID ||
            prevMap.get(santa.Employee_EmailID) === child.Employee_EmailID
          ) {
            valid = false;
            break;
          }
        }

        // If valid, build the result array
        if (valid) {
          result = employees.map((santa, idx) => ({
            Employee_Name: santa.Employee_Name,
            Employee_EmailID: santa.Employee_EmailID,
            Secret_Child_Name: shuffled[idx].Employee_Name,
            Secret_Child_EmailID: shuffled[idx].Employee_EmailID,
          }));
        }
      }

      // If no valid assignment found, show error
      if (!valid) {
        setError('Could not generate a valid assignment. Please try again.');
        setAssignments([]);
        return;
      }

      setAssignments(result);
    } catch (err) {
      setError('An unexpected error occurred while generating assignments.');
      setAssignments([]);
    }
  }, [employees, previousYearData]);

  // Download the assignments as a CSV file
  const handleDownload = () => {
    try {
      const csv = Papa.unparse(assignments);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'secret_santa_result.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError('Failed to download CSV.');
    }
  };

  // Filter assignments based on search input
  const filteredAssignments = assignments.filter(
    (row: any) =>
      row.Employee_Name?.toLowerCase().includes(search.toLowerCase()) ||
      row.Employee_EmailID?.toLowerCase().includes(search.toLowerCase()) ||
      row.Secret_Child_Name?.toLowerCase().includes(search.toLowerCase()) ||
      row.Secret_Child_EmailID?.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!assignments.length) {
    return null;
  }

  return (
    <div style={{ marginTop: 32 }}>
      {/* Back button to return to the initial upload step */}
      <button
        className="secret-santa-btn"
        style={{ marginBottom: 16 }}
        onClick={onBack}
      >
        Back
      </button>
      <h3>Secret Santa Result</h3>
      <div style={{
        background: '#fff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        {/* Search input for filtering the result table */}
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
        {/* Result table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr>
              <th className="ss-table-cell">Employee Name</th>
              <th className="ss-table-cell">Employee EmailID</th>
              <th className="ss-table-cell">Secret Child Name</th>
              <th className="ss-table-cell">Secret Child EmailID</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((row, idx) => (
                <tr key={idx}>
                  <td className="ss-table-cell">{row.Employee_Name}</td>
                  <td className="ss-table-cell">{row.Employee_EmailID}</td>
                  <td className="ss-table-cell">{row.Secret_Child_Name}</td>
                  <td className="ss-table-cell">{row.Secret_Child_EmailID}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 16, color: '#888' }}>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Download CSV button */}
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <button
            className="secret-santa-btn"
            onClick={handleDownload}
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;