import React, { useState } from 'react';
import './App.css';
import Setup from './pages/Setup';
import Interview from './pages/Interview';
import Report from './pages/Report';

function App() {
  const [currentPage, setCurrentPage] = useState('setup');
  const [interviewData, setInterviewData] = useState(null);

  const handleStartInterview = (data) => {
    setInterviewData(data);
    setCurrentPage('interview');
  };

  const handleInterviewComplete = (reportData) => {
    setInterviewData({ ...interviewData, ...reportData });
    setCurrentPage('report');
  };

  const handleRestart = () => {
    setInterviewData(null);
    setCurrentPage('setup');
  };

  return (
    <div className="App">
      {currentPage === 'setup' && <Setup onStart={handleStartInterview} />}
      {currentPage === 'interview' && (
        <Interview data={interviewData} onComplete={handleInterviewComplete} />
      )}
      {currentPage === 'report' && (
        <Report data={interviewData} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
