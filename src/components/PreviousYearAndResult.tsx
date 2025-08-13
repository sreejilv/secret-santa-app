import React, { useState } from 'react';
import PreviousYearUpload from './PreviousYearUpload';

interface PreviousYearAndResultProps {
  employees: any[];
  onShowResult: (previousYearData: any[]) => void;
}

const PreviousYearAndResult: React.FC<PreviousYearAndResultProps> = ({ employees, onShowResult }) => {
  const [previousYearData, setPreviousYearData] = useState<any[]>([]);

  const handlePreviousYearUpload = (data: any[]) => {
    setPreviousYearData(data);
  };

  return (
    <div style={{ marginTop: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {/* <h2>Upload Previous Year Result & View Secret Santa Result</h2> */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <PreviousYearUpload onUploadSuccess={handlePreviousYearUpload} />
        <button
          style={{ fontSize: 20, marginTop: 15 }}
          className="secret-santa-btn"
          onClick={() => onShowResult(previousYearData)}
        >
          Show Result
        </button>
      </div>
    </div>
  );
};

export default PreviousYearAndResult;