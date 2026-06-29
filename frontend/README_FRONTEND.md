# React Frontend - AI Interview Simulator

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development Server

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## File Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── manifest.json       # PWA manifest
│
├── src/
│   ├── App.js              # Main App component
│   ├── App.css
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   │
│   ├── pages/
│   │   ├── Setup.js        # Role/Experience selection
│   │   ├── Interview.js    # Interview recording interface
│   │   └── Report.js       # Final report display
│   │
│   └── styles/
│       ├── Setup.css
│       ├── Interview.css
│       └── Report.css
│
└── package.json
```

## Key Components

### Setup Component
- Multi-step form for interview configuration
- Role selection from 5 categories
- Experience level selection
- Number of questions selection
- Beautiful gradient UI with animations

### Interview Component
- Live video feed from webcam
- Real-time question display
- Audio recording functionality
- Visual recording indicator
- Progress bar
- Countdown timer before recording
- Instant feedback after each answer
- Performance metrics display

### Report Component
- Overall performance score visualization
- Detailed breakdown of metrics
- Strengths and improvements list
- Download report functionality
- Restart interview option

## Styling

- Modern glassmorphism design
- Dark theme with cyan/purple gradients
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-friendly design

## Dependencies

- react: ^18.2.0 - UI library
- react-dom: ^18.2.0 - DOM rendering
- react-scripts: 5.0.1 - Build scripts
- axios: ^1.6.0 - HTTP client
- react-icons: ^4.12.0 - Icon library

## API Integration

The frontend communicates with the Flask backend at `http://localhost:5000/api`

### Key API Calls

1. **Get Questions**
   ```javascript
   POST /api/questions
   {
     role, experience, num_questions
   }
   ```

2. **Submit Answer**
   ```javascript
   POST /api/submit-answer
   FormData with audio file and question_num
   ```

3. **Generate Report**
   ```javascript
   POST /api/final-report
   {
     role, experience, answers
   }
   ```

## Environment Setup

Create a `.env` file in the frontend directory if needed:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Port 3000 already in use
```bash
npm start -- --port 3001
```

### CORS errors
- Ensure Flask backend has CORS enabled
- Check that backend is running on port 5000

### Camera/Microphone permissions
- Browser will prompt for permissions
- Allow both camera and microphone access
- Check browser settings if prompts don't appear

## Performance Optimization

- Video feed is compressed for better performance
- Audio chunks are processed in real-time
- State updates are optimized with React hooks
- CSS is minified in production builds

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari 14+
- Edge

## Additional Notes

- WebRTC APIs used for video/audio
- MediaRecorder API for audio recording
- Responsive design works on tablets and large phones
- Dark theme reduces eye strain during interviews

