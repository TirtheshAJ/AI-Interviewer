import React from 'react';
import '../styles/Report.css';
import { FiDownload, FiRotateCcw } from 'react-icons/fi';

function Report({ data, onRestart }) {
  const calculateAverageScore = () => {
    const scores = [data.feedback?.eye_contact_score || 0, data.feedback?.stability_score || 0, data.feedback?.speech_score || 0];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const downloadReport = () => {
    const reportContent = `
AI INTERVIEW SIMULATOR - FINAL REPORT
======================================

Role: ${data.role}
Experience Level: ${data.experience}
Number of Questions: ${data.numQuestions}

--- OVERALL PERFORMANCE ---
Average Score: ${calculateAverageScore()}%
Eye Contact: ${data.feedback?.eye_contact_score || 0}%
Stability: ${data.feedback?.stability_score || 0}%
Speech Quality: ${data.feedback?.speech_score || 0}%

--- STRENGTHS ---
${(data.feedback?.strengths || []).map((s) => `• ${s}`).join('\n')}

--- AREAS TO IMPROVE ---
${(data.feedback?.improvements || []).map((i) => `• ${i}`).join('\n')}

Generated: ${new Date().toLocaleString()}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', 'interview_report.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const avgScore = calculateAverageScore();

  return (
    <div className="report-container">
      <div className="report-card">
        <h1>Interview Complete!</h1>

        <div className="overall-score">
          <div className={`score-circle score-${avgScore}`}>
            <span className="score-number">{avgScore}%</span>
          </div>
          <p className="score-label">Overall Performance</p>
        </div>

        <div className="interview-details">
          <p><strong>Position:</strong> {data.role}</p>
          <p><strong>Experience Level:</strong> {data.experience}</p>
          <p><strong>Questions Answered:</strong> {data.numQuestions}</p>
        </div>

        <div className="detailed-scores">
          <h2>Detailed Scores</h2>
          <div className="score-bars">
            <div className="score-item">
              <span>Eye Contact</span>
              <div className="score-bar">
                <div
                  className="score-bar-fill"
                  style={{ width: `${data.feedback?.eye_contact_score || 0}%` }}
                ></div>
              </div>
              <span className="score-val">{data.feedback?.eye_contact_score || 0}%</span>
            </div>

            <div className="score-item">
              <span>Stability</span>
              <div className="score-bar">
                <div
                  className="score-bar-fill"
                  style={{ width: `${data.feedback?.stability_score || 0}%` }}
                ></div>
              </div>
              <span className="score-val">{data.feedback?.stability_score || 0}%</span>
            </div>

            <div className="score-item">
              <span>Speech Quality</span>
              <div className="score-bar">
                <div
                  className="score-bar-fill"
                  style={{ width: `${data.feedback?.speech_score || 0}%` }}
                ></div>
              </div>
              <span className="score-val">{data.feedback?.speech_score || 0}%</span>
            </div>
          </div>
        </div>

        <div className="feedback-summary">
          <div className="strengths-section">
            <h3>Your Strengths</h3>
            <ul>
              {(data.feedback?.strengths || []).map((strength, idx) => (
                <li key={idx}>✓ {strength}</li>
              ))}
            </ul>
          </div>

          <div className="improvements-section">
            <h3>Areas to Improve</h3>
            <ul>
              {(data.feedback?.improvements || []).map((improvement, idx) => (
                <li key={idx}>→ {improvement}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-download" onClick={downloadReport}>
            <FiDownload /> Download Report
          </button>
          <button className="btn-restart" onClick={onRestart}>
            <FiRotateCcw /> Practice Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
