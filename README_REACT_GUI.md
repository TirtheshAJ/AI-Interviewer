# AI Interview Simulator - React GUI Version

✨ **Modern React Frontend with Flask Backend Integration**

A professional interview practice platform with real-time AI feedback, featuring a beautiful React UI and a powerful Flask API backend.

## 🎯 Quick Start (2 minutes)

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- Webcam & Microphone

### Terminal 1: Start Backend Server

```bash
cd backend
pip install -r requirements.txt
python server.py
```

✅ Server starts on `http://localhost:5000`

### Terminal 2: Start React Frontend

```bash
cd frontend
npm install
npm start
```

✅ App opens on `http://localhost:3000`

## 📋 Features

### Setup Page
- 🎭 Choose from 5 interview roles
- 📊 Select experience level (Fresher/Intermediate)
- 🎯 Configure number of questions (3-10)

### Interview Page
- 📹 Live webcam feed
- 🎤 Real-time audio recording
- 📝 Question display with countdown
- 📊 Instant feedback after each answer
- 👁️ Real-time eye contact tracking
- 🧭 Head stability analysis

### Report Page
- 📈 Overall performance score
- 📊 Detailed metrics breakdown
- ✅ Identified strengths
- 🔧 Areas to improve
- 📥 Download report option
- 🔄 Practice again button

## 🏗️ Project Structure

```
AI-Interviewer/
├── backend/
│   ├── server.py                 # Flask API server
│   ├── requirements.txt           # Python dependencies
│   └── README_BACKEND.md          # Backend documentation
├── frontend/
│   ├── public/
│   │   └── index.html            # Main HTML
│   ├── src/
│   │   ├── App.js                # Main component
│   │   ├── index.js              # Entry point
│   │   ├── pages/
│   │   │   ├── Setup.js          # Role selection
│   │   │   ├── Interview.js      # Interview interface
│   │   │   └── Report.js         # Results page
│   │   └── styles/
│   │       ├── Setup.css
│   │       ├── Interview.css
│   │       └── Report.css
│   ├── package.json
│   └── README_FRONTEND.md        # Frontend documentation
├── ai_interviewer/               # Original Python modules
│   ├── main.py
│   ├── question_engine.py
│   ├── face_analysis.py
│   ├── voice_analysis.py
│   ├── feedback.py
│   └── utils.py
├── SETUP_GUIDE.md               # This guide
└── README.md                     # Original README
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|----------|
| GET | `/api/health` | Server health check |
| GET | `/api/roles` | Get available roles |
| GET | `/api/experience-levels` | Get experience levels |
| POST | `/api/questions` | Get interview questions |
| POST | `/api/submit-answer` | Submit and analyze answer |
| POST | `/api/final-report` | Generate final report |

## 🎨 UI Features

- **Modern Design**: Glassmorphism with gradient backgrounds
- **Dark Theme**: Easy on the eyes during long sessions
- **Responsive Layout**: Works on desktop and tablets
- **Smooth Animations**: Polished user experience
- **Real-time Feedback**: Instant metrics updates

## 📊 Available Roles

1. **Full Stack Developer**
   - Fresher level (10 questions)
   - Intermediate level (10 questions)

2. **Data Scientist**
   - Fresher level (10 questions)
   - Intermediate level (10 questions)

3. **Software Engineer**
   - Fresher level (10 questions)
   - Intermediate level (10 questions)

4. **HR Manager**
   - Fresher level (10 questions)
   - Intermediate level (10 questions)

5. **Product Manager**
   - Fresher level (10 questions)
   - Intermediate level (10 questions)

## 🚀 Getting Started Step-by-Step

### Step 1: Clone the Repository
```bash
git clone https://github.com/TirtheshAJ/AI-Interviewer.git
cd AI-Interviewer
```

### Step 2: Checkout React GUI Branch
```bash
git checkout react-gui
```

### Step 3: Backend Setup
```bash
cd backend
pip install -r requirements.txt
python server.py
```

**Output should show:**
```
╔════════════════════════════════════════╗
║  AI Interview Simulator - API Server   ║
║  Running on http://localhost:5000      ║
╚════════════════════════════════════════╝
```

### Step 4: Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start
```

**Browser should open at `http://localhost:3000`**

### Step 5: Prepare for Interview
1. Allow camera and microphone permissions when prompted
2. Test your webcam and microphone
3. Find a quiet place for best audio quality
4. Good lighting for face analysis

## 🎬 Using the Application

### Setup Phase
1. Select your interview role
2. Choose your experience level
3. Set number of questions (3-10)
4. Review settings and start

### Interview Phase
1. Listen to the question
2. Click "Start Recording" when ready
3. 3-second countdown before recording begins
4. Speak your answer for up to 45 seconds
5. Click "Stop Recording" when done
6. View instant feedback
7. Proceed to next question

### Review Phase
1. View overall performance score
2. Check detailed metrics:
   - Eye contact percentage
   - Head stability score
   - Speech quality score
3. Review strengths and improvements
4. Download report as text file
5. Restart for another practice session

## 🔧 Troubleshooting

### Port Already in Use

**Backend port 5000:**
```bash
lsof -i :5000
kill -9 <PID>
```

**Frontend port 3000:**
```bash
npm start -- --port 3001
```

### Camera/Microphone Not Working

1. Check browser permissions:
   - Chrome: Settings → Privacy and security → Site settings
   - Firefox: Settings → Privacy & Security

2. Ensure no other app is using the camera

3. Try a different browser

4. Restart your computer

### Backend Connection Error

1. Verify Flask server is running: `http://localhost:5000/api/health`

2. Check firewall settings

3. Ensure CORS is enabled in backend

### Dependencies Issues

**Python:**
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**Node:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📝 Configuration

### Interview Settings
- Question time limit: **45 seconds**
- Countdown before recording: **3 seconds**
- Feedback display time: **5 seconds**
- Minimum questions: **3**
- Maximum questions: **10**

### Video Settings
- Resolution: 1280x720
- Frame rate: 30 FPS
- Format: H.264 (MP4)

### Audio Settings
- Sample rate: 16000 Hz
- Bit depth: 16-bit
- Channels: Mono

## 🌐 API Request Examples

### Get Questions
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "role": "Full Stack Developer",
    "experience": "Fresher",
    "num_questions": 5
  }'
```

### Submit Answer
```bash
curl -X POST http://localhost:5000/api/submit-answer \
  -F "audio=@answer.wav" \
  -F "question_num=1"
```

## 📦 Dependencies

### Frontend
- React 18.2.0
- Axios 1.6.0
- React Icons 4.12.0

### Backend
- Flask 3.0.0
- Flask-CORS 4.0.0
- OpenCV 4.8.1
- MediaPipe 0.10.3
- SpeechRecognition 3.10.0

## 🎓 Interview Tips

### Before the Interview
- ✅ Test camera and microphone
- ✅ Ensure good lighting
- ✅ Eliminate background noise
- ✅ Wear professional attire
- ✅ Have water nearby

### During the Interview
- ✅ Maintain eye contact with camera
- ✅ Speak clearly and confidently
- ✅ Take a moment to think before answering
- ✅ Use the STAR method for examples
- ✅ Keep answers concise but complete

### What Gets Scored
- 👁️ **Eye Contact**: How well you look at the camera
- 🧭 **Stability**: How still you hold your head
- 🎤 **Speech**: Voice clarity, pace, and confidence

## 📊 Performance Metrics Explained

### Eye Contact Score (0-100%)
- Measures how much you look at the camera
- Higher is better
- Aim for 70%+

### Stability Score (0-100%)
- Measures head movement steadiness
- Lower movement = Higher score
- Aim for 80%+

### Speech Score (0-100%)
- Measures audio quality and clarity
- Based on volume, noise, and pace
- Aim for 75%+

## 🔄 Next Steps

1. **Practice Regularly**: Use this tool multiple times
2. **Review Feedback**: Pay attention to improvement areas
3. **Record Yourself**: Compare different attempts
4. **Study Questions**: Learn common interview questions
5. **Mock Interviews**: Practice with friends

## 📚 Resources

- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Interview Tips](https://www.indeed.com/career-advice/interviewing)
- [STAR Method](https://www.thebalancecareers.com/star-interview-method-2059594)

## 🤝 Contributing

To contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

See LICENSE file in the repository.

## 🆘 Support

For issues or questions:

1. Check the troubleshooting section
2. Review backend/frontend README files
3. Create an issue on GitHub
4. Check existing issues for solutions

## 🎉 Good Luck!

You're now ready to practice interviews with real-time AI feedback. Start with the setup page and give your best effort on every question!

---

**Happy interviewing! 🚀**

*Made with ❤️ for interview prep*
