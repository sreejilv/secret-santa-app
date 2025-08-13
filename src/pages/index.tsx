import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import EmployeeTable from '../components/EmployeeTable';
import PreviousYearAndResult from '../components/PreviousYearAndResult';
import ShowResult from '../components/ShowResult';

const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [showNextStep, setShowNextStep] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [previousYearData, setPreviousYearData] = useState<any[]>([]);

  const handleUploadSuccess = (uploadedData: any[]) => {
    setData(uploadedData);
    setShowNextStep(false);
    setShowFinalResult(false);
    setPreviousYearData([]);
  };

  const handleSubmit = () => {
    setShowNextStep(true);
  };

  const handleShowResult = (prevYearData: any[]) => {
    setPreviousYearData(prevYearData);
    setShowFinalResult(true);
  };

  const handleBack = () => {
    setShowFinalResult(false);
    setShowNextStep(false);
    setData([]);
    setPreviousYearData([]);
  };

  return (
    <div className="secret-santa-bg">
      <h1 className="secret-santa-title">
        Secret Santa Game
      </h1>
      {!showFinalResult && (
        <>
          <FileUpload onUploadSuccess={handleUploadSuccess} />
          {data.length > 0 && !showNextStep && (
            <EmployeeTable data={data} onSubmit={handleSubmit} />
          )}
          {showNextStep && (
            <PreviousYearAndResult
              employees={data}
              onShowResult={handleShowResult}
            />
          )}
        </>
      )}
      {showFinalResult && (
        <ShowResult
          employees={data}
          previousYearData={previousYearData}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Home;