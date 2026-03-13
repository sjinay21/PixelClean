import cv2
import numpy as np
import sys

# ------------------------------------------------
# INPUT ARGUMENTS FROM NODE SERVER
# ------------------------------------------------
input_path = sys.argv[1]
output_path = sys.argv[2]
scale = int(sys.argv[3])  # 1,2,4,8


# ------------------------------------------------
# LOAD IMAGE
# ------------------------------------------------
img = cv2.imread(input_path)

if img is None:
    print("Error: image not loaded")
    sys.exit(1)


# ------------------------------------------------
# 1️⃣ NOISE REDUCTION
# ------------------------------------------------
# 🔵 UPDATED: mild denoise to keep gradients smooth
img = cv2.fastNlMeansDenoisingColored(
    img,
    None,
    h=6,
    hColor=6,
    templateWindowSize=7,
    searchWindowSize=21
)


# ------------------------------------------------
# 2️⃣ UPSCALE IMAGE
# ------------------------------------------------
# 🔵 UPDATED: upscale first using cubic interpolation
h, w = img.shape[:2]

img = cv2.resize(
    img,
    (w * scale, h * scale),
    interpolation=cv2.INTER_CUBIC
)


# ------------------------------------------------
# 3️⃣ LIGHT SHARPEN (UNSHARP MASK)
# ------------------------------------------------
# 🔵 UPDATED: soft sharpening only
blur = cv2.GaussianBlur(img, (0, 0), 1.0)

img = cv2.addWeighted(
    img,
    1.2,   # original weight
    blur,
    -0.2,  # blur subtraction
    0
)


# ------------------------------------------------
# 4️⃣ COLOR BALANCE
# ------------------------------------------------
# 🔵 NEW: gentle brightness and color improvement
img = cv2.convertScaleAbs(
    img,
    alpha=1.05,  # contrast
    beta=5       # brightness
)


# ------------------------------------------------
# 5️⃣ FINAL SMALL SHARPEN
# ------------------------------------------------
kernel = np.array([
    [0, -1, 0],
    [-1, 5,-1],
    [0, -1, 0]
])

img = cv2.filter2D(img, -1, kernel)


# ------------------------------------------------
# SAVE OUTPUT
# ------------------------------------------------
cv2.imwrite(output_path, img)

print("Enhancement completed successfully")
