# AI Interview Simulator - React GUI Setup Guide

## Project Structure

```
AI-Interviewer/
├── ai_interviewer/          # Original Python backend
│   ├── main.py
│   ├── question_engine.py
│   ├── face_analysis.py
│   ├── voice_analysis.py
│   ├── feedback.py
│   └── utils.py
│
├── backend/                 # Flask API Server
│   ├── server.py
│   ├── requirements.txt
│   └── README_BACKEND.md
│
└── frontend/                # React Frontend
    ├── package.json
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── pages/
    │   │   ├── Setup.js      # Role selection
    │   │   ├── Interview.js  # Interview interface
    │   │   └── Report.js     # Results page
    │   └── styles/
    │       ├── Setup.css
    │       ├── Interview.css
    │       └── Report.css
    └── README_FRONTEND.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn
- Webcam and microphone

### Step 1: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Start the Backend Server

```bash
cd backend
python server.py
```

The server will start on `http://localhost:5000`

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 4: Start the React Frontend

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

## Features

### Setup Page
- Select interview role (Full Stack Developer, Data Scientist, etc.)
- Choose experience level (Fresher or Intermediate)
- Specify number of questions (3-10)

### Interview Page
- Live video feed from webcam
- Real-time question display
- Audio recording of answers
- Live face analysis (eye contact, stability)
- Countdown timer
- Feedback after each answer

### Report Page
- Overall performance score
- Detailed breakdown of metrics:
  - Eye contact percentage
  - Head stability
  - Speech quality
- Strengths identified
- Areas to improve
- Download report as text file

## API Endpoints

### GET `/api/health`
Check if server is running

### GET `/api/roles`
Get list of available roles

### GET `/api/experience-levels`
Get available experience levels

### POST `/api/questions`
Get interview questions
```json
{
  "role": "Full Stack Developer",
  "experience": "Fresher",
  "num_questions": 5
}
```

### POST `/api/submit-answer`
Submit and analyze an answer
- Requires audio file upload
- Returns feedback with scores and suggestions

### POST `/api/final-report`
Generate final interview report
```json
{
  "role": "Full Stack Developer",
  "experience": "Fresher",
  "answers": [...]
}
```

## Troubleshooting

### Camera/Microphone not working
- Check browser permissions
- Ensure no other app is using the camera
- Try a different browser

### Backend connection error
- Verify Flask server is running on port 5000
- Check firewall settings
- Ensure CORS is enabled

### Audio recording issues
- Check microphone permissions
- Verify audio devices are properly configured
- Try using a different audio input device

## Development

### Backend Development
- Edit `backend/server.py` for API changes
- Modify analysis logic in `ai_interviewer/` modules
- Restart server to apply changes

### Frontend Development
- Edit files in `frontend/src/`
- Changes auto-reload with React's hot reload
- Modify styles in `frontend/src/styles/`

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Deployment
```bash
cd backend
pip install gunicorn
gunicorn server:app --bind 0.0.0.0:5000
```

## Performance Tips

1. **Video Processing**: Reduce video resolution if experiencing lag
2. **Audio Quality**: Use good quality microphone for better analysis
3. **Network**: Ensure stable internet connection for real-time feedback
4. **Browser**: Use Chrome/Firefox for best compatibility

## License

See main repository for license information.

## Support

For issues or questions, please create an issue in the GitHub repository.
