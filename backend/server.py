from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
from datetime import datetime
from pathlib import Path
import json

app = Flask(__name__)
CORS(app)

# Sample question database
QUESTION_DATABASE = {
    "Full Stack Developer": {
        "Fresher": [
            "Tell me about yourself and why you want to become a Full Stack Developer.",
            "What is the difference between HTML, CSS, and JavaScript?",
            "Explain what a REST API is and how it works.",
            "What is the difference between GET and POST requests?",
            "What is version control and why is Git important?",
        ],
        "Intermediate": [
            "Describe your experience with full stack development projects.",
            "Explain microservices architecture and when you would use it.",
            "How do you handle authentication and authorization in web applications?",
            "What strategies do you use for optimizing application performance?",
            "Explain the concept of CI/CD and its benefits.",
        ],
    },
    "Data Scientist": {
        "Fresher": [
            "Tell me about yourself and your interest in data science.",
            "What is the difference between supervised and unsupervised learning?",
            "Explain what a neural network is in simple terms.",
            "What is overfitting and how can you prevent it?",
            "Describe the steps in a typical data science project.",
        ],
        "Intermediate": [
            "Describe a data science project you've worked on end-to-end.",
            "How do you handle imbalanced datasets?",
            "Explain the bias-variance tradeoff.",
            "What techniques do you use for feature selection?",
            "How do you evaluate the performance of a machine learning model?",
        ],
    },
    "Software Engineer": {
        "Fresher": [
            "Tell me about yourself and your programming background.",
            "What programming languages are you most comfortable with?",
            "Explain object-oriented programming concepts.",
            "What is the difference between a stack and a queue?",
            "How do you approach debugging a piece of code?",
        ],
        "Intermediate": [
            "Describe your most challenging software engineering project.",
            "How do you design systems for scalability?",
            "Explain SOLID principles and their importance.",
            "How do you approach code reviews?",
            "Describe your experience with design patterns.",
        ],
    },
    "HR Manager": {
        "Fresher": [
            "Tell me about yourself and why you chose HR as a career.",
            "What do you think are the most important qualities of an HR professional?",
            "How would you handle a conflict between two employees?",
            "What is the purpose of performance reviews?",
            "How do you stay organized when managing multiple tasks?",
        ],
        "Intermediate": [
            "Describe your experience in HR management.",
            "How do you develop and implement HR policies?",
            "What strategies have you used to reduce employee turnover?",
            "How do you handle terminations professionally?",
            "Describe your approach to talent acquisition.",
        ],
    },
    "Product Manager": {
        "Fresher": [
            "Tell me about yourself and your interest in product management.",
            "What do you think makes a product successful?",
            "How would you prioritize features for a new product?",
            "What is the difference between a product manager and project manager?",
            "How do you gather user feedback?",
        ],
        "Intermediate": [
            "Describe a product you managed from conception to launch.",
            "How do you create and manage a product roadmap?",
            "What frameworks do you use for product strategy?",
            "How do you handle stakeholder disagreements?",
            "Describe your approach to competitive analysis.",
        ],
    },
}

EXPERIENCE_LEVELS = ["Fresher", "Intermediate"]


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

        all_questions = QUESTION_DATABASE[role][experience]
        questions = all_questions[:min(num_questions, len(all_questions))]

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

        # Generate feedback (placeholder - can be enhanced)
        import random
        feedback = {
            'eye_contact_score': random.randint(70, 95),
            'stability_score': random.randint(75, 95),
            'speech_score': random.randint(70, 90),
            'strengths': [
                'Good speaking pace',
                'Clear articulation',
                'Confident tone',
                'Relevant answer'
            ],
            'improvements': [
                'Add more specific examples',
                'Maintain eye contact',
                'Reduce filler words',
                'Practice more'
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
