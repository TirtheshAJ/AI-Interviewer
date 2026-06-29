# Flask Backend API - AI Interview Simulator

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

```bash
python server.py
```

Server will start on `http://localhost:5000`

## API Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 2. Get Roles
**GET** `/api/roles`

Get list of available interview roles.

**Response:**
```json
{
  "roles": [
    "Full Stack Developer",
    "Data Scientist",
    "Software Engineer",
    "HR Manager",
    "Product Manager"
  ]
}
```

### 3. Get Experience Levels
**GET** `/api/experience-levels`

Get available experience levels.

**Response:**
```json
{
  "levels": ["Fresher", "Intermediate"]
}
```

### 4. Get Questions
**POST** `/api/questions`

Get interview questions based on role and experience.

**Request:**
```json
{
  "role": "Full Stack Developer",
  "experience": "Fresher",
  "num_questions": 5
}
```

**Response:**
```json
{
  "questions": [
    "Tell me about yourself...",
    "What is REST API...",
    "..."
  ],
  "role": "Full Stack Developer",
  "experience": "Fresher",
  "total": 5
}
```

### 5. Submit Answer
**POST** `/api/submit-answer`

Submit and analyze user's answer.

**Request:**
- Multipart form data
- `audio`: Audio file (wav/mp3)
- `question_num`: Question number

**Response:**
```json
{
  "feedback": {
    "eye_contact_score": 78,
    "stability_score": 82,
    "speech_score": 80,
    "strengths": [
      "Good speaking pace",
      "Clear articulation"
    ],
    "improvements": [
      "Reduce pauses",
      "Make more eye contact"
    ],
    "overall_feedback": "Great answer!"
  },
  "question_num": 1
}
```

### 6. Generate Final Report
**POST** `/api/final-report`

Generate final interview report with all statistics.

**Request:**
```json
{
  "role": "Full Stack Developer",
  "experience": "Fresher",
  "answers": [...]
}
```

**Response:**
```json
{
  "role": "Full Stack Developer",
  "experience": "Fresher",
  "overall_score": 80,
  "eye_contact_score": 78,
  "stability_score": 82,
  "speech_score": 80,
  "total_questions": 5,
  "strengths": [...],
  "areas_to_improve": [...],
  "recommendations": [...]
}
```

## File Structure

```
backend/
├── server.py              # Flask application
├── requirements.txt       # Python dependencies
└── README_BACKEND.md      # This file
```

## Dependencies

- **flask**: Web framework
- **flask-cors**: Enable CORS for frontend communication
- **opencv-python**: Video processing
- **mediapipe**: Face and hand tracking
- **speech-recognition**: Convert audio to text
- **numpy**: Numerical computations
- **pyttsx3**: Text-to-speech

## Configuration

### CORS Settings
CORS is enabled for all origins. For production, modify:
```python
CORS(app, resources={r"/api/*": {"origins": ["https://yourdomain.com"]}})
```

### Port Configuration
Default port is 5000. To change:
```bash
python server.py --port 8000
```

## Development Tips

1. **Debug Mode**: Already enabled in `server.py`
2. **Hot Reload**: Server restarts on code changes
3. **Logging**: Check console for detailed logs
4. **Testing**: Use curl or Postman to test endpoints

### Example curl commands:

```bash
# Health check
curl http://localhost:5000/api/health

# Get roles
curl http://localhost:5000/api/roles

# Get questions
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -d '{"role":"Full Stack Developer","experience":"Fresher","num_questions":5}'
```

## Production Deployment

### Using Gunicorn

```bash
pip install gunicorn
gunicorn server:app --bind 0.0.0.0:5000 --workers 4
```

### Using Docker

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY server.py .
EXPOSE 5000
CMD ["python", "server.py"]
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request
- `404`: Not found
- `500`: Internal server error

## Logging

Enable detailed logging:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Performance Optimization

1. **Caching**: Consider caching questions
2. **Async Processing**: Use Celery for heavy tasks
3. **Database**: Add database for storing results
4. **Compression**: Enable gzip compression

## Security Considerations

1. **Input Validation**: Always validate user input
2. **CORS**: Restrict origins in production
3. **Rate Limiting**: Implement rate limiting
4. **Authentication**: Add JWT authentication if needed

## Troubleshooting

### Port 5000 already in use
```bash
lsof -i :5000  # Find process
kill -9 <PID>  # Kill process
```

### ModuleNotFoundError
```bash
pip install -r requirements.txt --upgrade
```

### CORS errors in frontend
- Ensure `flask-cors` is installed
- Check that CORS(app) is called in server.py

## Future Enhancements

- [ ] Database integration for storing interview results
- [ ] Advanced ML model for better feedback
- [ ] Real-time transcription
- [ ] Video analysis improvements
- [ ] Detailed analytics dashboard
- [ ] Interview history and progress tracking

