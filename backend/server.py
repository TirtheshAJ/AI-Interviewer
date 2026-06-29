from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
from datetime import datetime
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from ai_interviewer.question_engine import QUESTION_DATABASE, EXPERIENCE_LEVELS
from ai_interviewer.feedback import FeedbackGenerator
from ai_interviewer.voice_analysis import VoiceAnalyzer
from ai_interviewer.face_analysis import FaceAnalyzer

app = Flask(__name__)
CORS(app)

# Initialize components
feedback_generator = FeedbackGenerator()
voice_analyzer = VoiceAnalyzer()
face_analyzer = FaceAnalyzer()

# Store session data
sessions = {}


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Server is running'})


@app.route('/api/roles', methods=['GET'])
def get_roles():
    """Get available roles"""
    roles = list(QUESTION_DATABASE.keys())
    return jsonify({'roles': roles})


@app.route('/api/experience-levels', methods=['GET'])
def get_experience_levels():
    """Get available experience levels"""
    return jsonify({'levels': EXPERIENCE_LEVELS})


@app.route('/api/questions', methods=['POST'])
def get_questions():
    """Get interview questions based on role and experience"""
    try:
        data = request.json
        role = data.get('role')
        experience = data.get('experience')
        num_questions = data.get('num_questions', 5)

        if role not in QUESTION_DATABASE:
            return jsonify({'error': 'Invalid role'}), 400

        if experience not in QUESTION_DATABASE[role]:
            experience = 'Fresher'

        questions = QUESTION_DATABASE[role][experience][:num_questions]

        return jsonify({
            'questions': questions,
            'role': role,
            'experience': experience,
            'total': len(questions)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/submit-answer', methods=['POST'])
def submit_answer():
    """Process and analyze user's answer"""
    try:
        question_num = request.form.get('question_num', 1)
        audio_file = request.files.get('audio')

        if not audio_file:
            return jsonify({'error': 'No audio file provided'}), 400

        # Save audio temporarily
        audio_path = f'temp_audio_{question_num}.wav'
        audio_file.save(audio_path)

        # Analyze voice (speech-to-text and voice metrics)
        voice_results = {
            'speaking_speed': 'Normal',  # Placeholder
            'clarity': 85,  # Placeholder score
            'confidence': 75,  # Placeholder score
            'pauses': 2,  # Placeholder
            'transcript': 'Transcribed answer would appear here...'
        }

        # Generate feedback
        feedback = {
            'eye_contact_score': 78,  # Placeholder
            'stability_score': 82,  # Placeholder
            'speech_score': 80,  # Placeholder
            'strengths': [
                'Good speaking pace',
                'Clear articulation',
                'Confident tone'
            ],
            'improvements': [
                'Reduce pauses between thoughts',
                'Make more eye contact',
                'Use more specific examples'
            ],
            'overall_feedback': 'Great answer! You demonstrated good knowledge and communication skills.'
        }

        # Clean up temporary file
        if os.path.exists(audio_path):
            os.remove(audio_path)

        return jsonify({
            'feedback': feedback,
            'question_num': question_num
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/final-report', methods=['POST'])
def generate_final_report():
    """Generate final interview report"""
    try:
        data = request.json
        role = data.get('role')
        experience = data.get('experience')
        answers = data.get('answers', [])

        # Calculate overall statistics
        overall_eye_contact = 78
        overall_stability = 82
        overall_speech = 80
        overall_score = (overall_eye_contact + overall_stability + overall_speech) // 3

        report = {
            'role': role,
            'experience': experience,
            'timestamp': datetime.now().isoformat(),
            'overall_score': overall_score,
            'eye_contact_score': overall_eye_contact,
            'stability_score': overall_stability,
            'speech_score': overall_speech,
            'total_questions': len(answers),
            'strengths': [
                'Excellent communication skills',
                'Strong technical knowledge',
                'Professional demeanor',
                'Clear and concise answers'
            ],
            'areas_to_improve': [
                'Add more real-world examples',
                'Work on maintaining consistent eye contact',
                'Reduce filler words (um, uh)',
                'Practice mock interviews regularly'
            ],
            'recommendations': [
                'Review common interview questions for your role',
                'Practice storytelling with the STAR method',
                'Record yourself answering questions',
                'Get feedback from mentors or peers'
            ]
        }

        return jsonify(report)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    print("""
    ╔════════════════════════════════════════╗
    ║  AI Interview Simulator - API Server   ║
    ║  Running on http://localhost:5000      ║
    ╚════════════════════════════════════════╝
    """)
    app.run(debug=True, host='0.0.0.0', port=5000)
