"""
Face Analysis Module - Tracks face position, eye contact, and stability
"""

import cv2
import numpy as np
import time

try:
    import mediapipe as mp
    MEDIAPIPE_AVAILABLE = True
except ImportError:
    MEDIAPIPE_AVAILABLE = False
    print("Warning: MediaPipe not available. Face analysis will be limited.")

from ai_interviewer.utils import COLORS
