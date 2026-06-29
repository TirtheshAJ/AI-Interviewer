import React, { useState } from 'react';
import '../styles/Setup.css';
import { FiArrowRight, FiInfo } from 'react-icons/fi';

const ROLES = ['Full Stack Developer', 'Data Scientist', 'Software Engineer', 'HR Manager', 'Product Manager'];
const EXPERIENCE_LEVELS = ['Fresher', 'Intermediate'];

function Setup({ onStart }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);

  const handleNext = () => {
    if (step === 1 && selectedRole) {
      setStep(2);
    } else if (step === 2 && selectedExperience) {
      setStep(3);
    }
  };

  const handleStart = () => {
    if (selectedRole && selectedExperience && numQuestions >= 3 && numQuestions <= 10) {
      onStart({
        role: selectedRole,
        experience: selectedExperience,
        numQuestions: numQuestions,
      });
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h1 className="setup-title">AI Interview Simulator</h1>
        <p className="setup-subtitle">Practice interviews with real-time AI feedback</p>

        {step === 1 && (
          <div className="setup-step">
            <h2>Select Your Role</h2>
            <div className="role-grid">
              {ROLES.map((role) => (
                <div
                  key={role}
                  className={`role-card ${selectedRole === role ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(role)}
                >
                  {role}
                </div>
              ))}
            </div>
            <button
              className="btn-next"
              onClick={handleNext}
              disabled={!selectedRole}
            >
              Next <FiArrowRight />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="setup-step">
            <h2>Select Experience Level</h2>
            <div className="experience-grid">
              {EXPERIENCE_LEVELS.map((level) => (
                <div
                  key={level}
                  className={`exp-card ${selectedExperience === level ? 'selected' : ''}`}
                  onClick={() => setSelectedExperience(level)}
                >
                  <h3>{level}</h3>
                  <p>{level === 'Fresher' ? 'Entry level questions' : 'Advanced questions'}</p>
                </div>
              ))}
            </div>
            <button className="btn-next" onClick={handleNext}>
              Next <FiArrowRight />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="setup-step">
            <h2>Number of Questions</h2>
            <div className="question-count">
              <input
                type="number"
                min="3"
                max="10"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.max(3, Math.min(10, Number(e.target.value))))}
              />
              <p className="info-text">
                <FiInfo /> Questions can be between 3 and 10
              </p>
            </div>
            <div className="summary">
              <h3>Interview Summary</h3>
              <p><strong>Role:</strong> {selectedRole}</p>
              <p><strong>Level:</strong> {selectedExperience}</p>
              <p><strong>Questions:</strong> {numQuestions}</p>
            </div>
            <button className="btn-start" onClick={handleStart}>
              Start Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Setup;
