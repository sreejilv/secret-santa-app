import React, { useState } from 'react';

const REQUIRED_COLUMNS = ['Employee_Name', 'Employee_EmailID'];

interface FileUploadProps {
  onUploadSuccess: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please upload a CSV file.');
        setFileName('');
        return;
      }
      setFileName(file.name);
      setLoading(true);

      const Papa = await import('papaparse');
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          setLoading(false);
          const columns = (results.meta.fields || []).map((col: string) => col.trim());
          const hasRequiredColumns =
            columns.length === 2 &&
            REQUIRED_COLUMNS.every(col => columns.includes(col));
          if (!hasRequiredColumns) {
            setError('CSV must contain the required columns.');
            setFileName('');
            return;
          }
          onUploadSuccess(results.data as any[]);
        },
        error: (err: any) => {
          setLoading(false);
          setError('Failed to parse CSV file.');
          setFileName('');
        }
      });
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred during file upload.');
      setFileName('');
    }
  };

  return (
    <div>
      <label className="secret-santa-btn">
        {loading ? 'Uploading...' : 'Upload Employee Details'}
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
          <span className="secret-santa-btn"/>
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

export default FileUpload;