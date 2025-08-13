import React, { useState } from 'react';

const REQUIRED_COLUMNS = [
  'Employee_Name',
  'Employee_EmailID',
  'Secret_Child_Name',
  'Secret_Child_EmailID'
];

interface PreviousYearUploadProps {
  onUploadSuccess: (data: any[]) => void;
}

const PreviousYearUpload: React.FC<PreviousYearUploadProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please upload a CSV file.');
        setFileName('');
        return;
      }
      setFileName(file.name);
      setLoading(true);

      import('papaparse').then(Papa => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            setLoading(false);
            const columns = (results.meta.fields || []).map((col: string) => col.trim());
            const hasRequiredColumns =
              columns.length === 4 &&
              REQUIRED_COLUMNS.every(col => columns.includes(col));
            if (!hasRequiredColumns) {
              setError(
                'CSV format is invalid'
              );
              setFileName('');
              return;
            }
            onUploadSuccess(results.data as any[]);
          },
          error: () => {
            setLoading(false);
            setError('Failed to parse CSV file.');
            setFileName('');
          }
        });
      });
    }
  };

  return (
    <div>
      <label className="secret-santa-btn">
        {loading ? 'Uploading...' : 'Upload Previous Year Result (optional)'}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={loading}
        />
      </label>
      {loading && (
        <span style={{ marginLeft: 10, verticalAlign: 'middle' }}>
          <span className="secret-santa-btn" />
          <style>
            {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
          </style>
        </span>
      )}
      {fileName && !loading && <p>Uploaded file: {fileName}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PreviousYearUpload;