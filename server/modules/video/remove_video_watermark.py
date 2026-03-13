'''
import cv2
import numpy as np
import pytesseract
import sys

----------------------------
Tesseract OCR path
-----------------------------
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\Admin\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"

input_video = sys.argv[1]
output_video = sys.argv[2]

cap = cv2.VideoCapture(input_video)

if not cap.isOpened():
    print("Video open failed")
    sys.exit(1)

fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter(output_video, fourcc, fps, (width, height))

# --------------------------------
# STEP 1: Detect watermark ONCE
# --------------------------------
ret, first_frame = cap.read()

if not ret:
    print("Failed to read video")
    sys.exit(1)

gray = cv2.cvtColor(first_frame, cv2.COLOR_BGR2GRAY)

data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)

mask = np.zeros(first_frame.shape[:2], dtype=np.uint8)

for i in range(len(data["text"])):

    text = data["text"][i]

    if "@" in text or "IG" in text or "ig" in text:

        x = data["left"][i]
        y = data["top"][i]
        w = data["width"][i]
        h = data["height"][i]

        cv2.rectangle(mask, (x, y), (x+w, y+h), 255, -1)

# Process first frame
result = cv2.inpaint(first_frame, mask, 3, cv2.INPAINT_TELEA)
out.write(result)

# --------------------------------
# STEP 2: Process remaining frames
# --------------------------------
frame_count = 0

while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    # Skip frames to speed up processing
    if frame_count % 10 != 0:
        out.write(frame)
        continue

    result = cv2.inpaint(frame, mask, 3, cv2.INPAINT_TELEA)

    out.write(result)

cap.release()
out.release()

print("Video watermark removal completed")
'''
import cv2
import numpy as np
import sys

# -----------------------------
# INPUT / OUTPUT
# -----------------------------

input_video = sys.argv[1]
output_video = sys.argv[2]

cap = cv2.VideoCapture(input_video)

if not cap.isOpened():
    print("Video open failed")
    sys.exit(1)

fps = int(cap.get(cv2.CAP_PROP_FPS))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter(output_video, fourcc, fps, (width, height))

print("Video loaded successfully")

# -----------------------------
# WATERMARK AREA (CENTER REGION)
# -----------------------------

mask = np.zeros((height, width), dtype=np.uint8)

# Adjust region depending on video
x1 = int(width * 0.25)
y1 = int(height * 0.40)

x2 = int(width * 0.75)
y2 = int(height * 0.55)

cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)

print("Watermark region defined")

# -----------------------------
# PROCESS VIDEO FRAME BY FRAME
# -----------------------------

frame_count = 0

while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    # Remove watermark using inpainting
    result = cv2.inpaint(frame, mask, 5, cv2.INPAINT_TELEA)

    out.write(result)

cap.release()
out.release()

print("Video watermark removal completed")