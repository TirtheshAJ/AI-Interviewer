import React, { useState, useEffect, useRef } from 'react';
import '../styles/Interview.css';
import { FiMic, FiMicOff, FiPlay, FiPause } from 'react-icons/fi';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function Interview({ data, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isRecording, isRecordingState] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  const QUESTION_TIME = 45;
  const COUNTDOWN_TIME = 3;

  useEffect(() => {
    loadQuestions();
    requestCameraAccess();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, {
        role: data.role,
        experience: data.experience,
        num_questions: data.numQuestions,
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Error loading questions. Please try again.');
    }
  };

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera/Microphone access denied:', error);
      alert('Please allow camera and microphone access to proceed.');
    }
  };

  const startCountdown = () => {
    setCountdown(COUNTDOWN_TIME);
    let count = COUNTDOWN_TIME;
    countdownTimerRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownTimerRef.current);
        startRecording();
      }
    }, 1000);
  };

  const startRecording = async () => {
    audioChunks.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      isRecordingState(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= QUESTION_TIME) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      isRecordingState(false);
      clearInterval(recordingTimerRef.current);
      processAnswer();
    }
  };

  const processAnswer = async () => {
    setLoading(true);
    try {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('question_num', currentQuestion + 1);

      const response = await axios.post(`${API_BASE_URL}/submit-answer`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFeedback(response.data.feedback);
    } catch (error) {
      console.error('Error processing answer:', error);
      setFeedback({
        eye_contact_score: 0,
        stability_score: 0,
        speech_score: 0,
        strengths: ['Unable to process answer'],
        improvements: ['Please try again'],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback(null);
      setRecordingTime(0);
      setCountdown(null);
    } else {
      onComplete({ feedback });
    }
  };

  const handleSkipQuestion = () => {
    setFeedback(null);
    setRecordingTime(0);
    handleNextQuestion();
  };

  if (questions.length === 0) {
    return <div className="interview-container"><p>Loading questions...</p></div>;
  }

  return (
    <div className="interview-container">
      <div className="interview-main">
        <div className="video-section">
          <video ref={videoRef} autoPlay muted className="video-feed" />
          <div className="recording-indicator">
            {isRecording && (
              <>
                <div className="pulse"></div>
                <span>RECORDING - {recordingTime}s</span>
              </>
            )}
          </div>
        </div>

        <div className="interview-content">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="question-section">
            <h2>Question {currentQuestion + 1} of {questions.length}</h2>
            <p className="question-text">{questions[currentQuestion]}</p>
          </div>

          {countdown !== null && (
            <div className="countdown-display">{countdown}</div>
          )}

          {feedback ? (
            <div className="feedback-section">
              <h3>Feedback</h3>
              <div className="feedback-scores">
                <div className="score-box">
                  <span className="score-label">Eye Contact</span>
                  <span className="score-value">{feedback.eye_contact_score || 0}%</span>
                </div>
                <div className="score-box">
                  <span className="score-label">Stability</span>
                  <span className="score-value">{feedback.stability_score || 0}%</span>
                </div>
                <div className="score-box">
                  <span className="score-label">Speech</span>
                  <span className="score-value">{feedback.speech_score || 0}%</span>
                </div>
              </div>
              <div className="feedback-details">
                <div className="strengths">
                  <h4>Strengths</h4>
                  <ul>
                    {(feedback.strengths || []).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="improvements">
                  <h4>Areas to Improve</h4>
                  <ul>
                    {(feedback.improvements || []).map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="controls-section">
              {!isRecording && countdown === null ? (
                <button
                  className="btn-record"
                  onClick={startCountdown}
                  disabled={loading}
                >
                  <FiMic /> Start Recording
                </button>
              ) : isRecording ? (
                <button className="btn-stop" onClick={stopRecording}>
                  <FiMicOff /> Stop Recording
                </button>
              ) : null}
              {loading && <p>Processing answer...</p>}
            </div>
          )}

          {feedback && (
            <div className="action-buttons">
              {currentQuestion < questions.length - 1 ? (
                <button className="btn-next-q" onClick={handleNextQuestion}>
                  Next Question
                </button>
              ) : (
                <button className="btn-finish" onClick={handleNextQuestion}>
                  Finish Interview
                </button>
              )}
              <button className="btn-skip" onClick={handleSkipQuestion}>
                Skip this Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
