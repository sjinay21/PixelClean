'''import cv2
import sys
import numpy as np

input_path = sys.argv[1]
output_path = sys.argv[2]
scale = int(sys.argv[3])

image = cv2.imread(input_path)

if image is None:
    print("Image not found")
    sys.exit(1)

# Upscale resolution
height, width = image.shape[:2]
image = cv2.resize(
    image,
    (width * scale, height * scale),
    interpolation=cv2.INTER_CUBIC
)

# Noise reduction
image = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)

# Sharpen filter
kernel = np.array([[0,-1,0],
                   [-1,5,-1],
                   [0,-1,0]])

image = cv2.filter2D(image, -1, kernel)

# Improve contrast
lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
l,a,b = cv2.split(lab)
l = cv2.equalizeHist(l)
lab = cv2.merge((l,a,b))
image = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)

cv2.imwrite(output_path, image)

print("success")''''''
import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]
scale = int(sys.argv[3])   # 1,2,4,8

image = cv2.imread(input_path)

# -------------------------
# 1. DENOISING
# -------------------------
image = cv2.fastNlMeansDenoisingColored(
    image, None,
    h=10 * scale,
    hColor=10 * scale,
    templateWindowSize=7,
    searchWindowSize=21
)

# -------------------------
# 2. DEBLUR (Unsharp Mask)
# -------------------------
gaussian = cv2.GaussianBlur(image, (0,0), 3)
image = cv2.addWeighted(image, 1.5, gaussian, -0.5, 0)

# -------------------------
# 3. UPSCALE RESOLUTION
# -------------------------
h, w = image.shape[:2]
image = cv2.resize(
    image,
    (w * scale, h * scale),
    interpolation=cv2.INTER_CUBIC
)

# -------------------------
# 4. EDGE ENHANCEMENT
# -------------------------
kernel = np.array([
    [-1,-1,-1],
    [-1, 9,-1],
    [-1,-1,-1]
])

image = cv2.filter2D(image, -1, kernel)

# -------------------------
# 5. CONTRAST ENHANCEMENT
# -------------------------
lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
l,a,b = cv2.split(lab)

clahe = cv2.createCLAHE(
    clipLimit=2.0 + scale,
    tileGridSize=(8,8)
)

l = clahe.apply(l)
lab = cv2.merge((l,a,b))

image = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)

# -------------------------
# 6. COLOR ENHANCEMENT
# -------------------------
hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

h,s,v = cv2.split(hsv)

s = cv2.multiply(s, 1 + 0.1 * scale)
v = cv2.multiply(v, 1 + 0.05 * scale)

hsv = cv2.merge([h,s,v])

image = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# -------------------------
# 7. GAMMA CORRECTION
# -------------------------
gamma = 1.0 + (0.05 * scale)
invGamma = 1.0 / gamma

table = np.array([
    ((i / 255.0) ** invGamma) * 255
    for i in np.arange(256)
]).astype("uint8")

image = cv2.LUT(image, table)

# -------------------------
# 8. FINAL SHARPEN
# -------------------------
kernel_sharp = np.array([
    [0,-1,0],
    [-1,5,-1],
    [0,-1,0]
])

image = cv2.filter2D(image, -1, kernel_sharp)

cv2.imwrite(output_path, image)'''
'''
import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]
scale = int(sys.argv[3])

# Load image
img = cv2.imread(input_path)

# -------------------------
# 1. Noise Reduction
# -------------------------
img = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)

# -------------------------
# 2. Deblurring (sharpen kernel)
# -------------------------
kernel = np.array([[0,-1,0],
                   [-1,5,-1],
                   [0,-1,0]])

img = cv2.filter2D(img, -1, kernel)

# -------------------------
# 3. Color Enhancement
# -------------------------
img = cv2.convertScaleAbs(img, alpha=1.1, beta=10)

# -------------------------
# 4. Convert to LAB for CLAHE
# -------------------------
lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
l, a, b = cv2.split(lab)

# -------------------------
# 5. CLAHE Local Contrast
# -------------------------
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
cl = clahe.apply(l)

merged = cv2.merge((cl,a,b))
img = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)

# -------------------------
# 6. Histogram Equalization
# -------------------------
ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
y, cr, cb = cv2.split(ycrcb)
y = cv2.equalizeHist(y)
img = cv2.cvtColor(cv2.merge((y,cr,cb)), cv2.COLOR_YCrCb2BGR)

# -------------------------
# 7. Texture Enhancement
# -------------------------
detail = cv2.detailEnhance(img, sigma_s=10, sigma_r=0.15)

# -------------------------
# 8. Edge Enhancement
# -------------------------
edges = cv2.Canny(detail, 100, 200)
edges = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
img = cv2.addWeighted(detail, 0.9, edges, 0.1, 0)

# -------------------------
# 9. Artifact Reduction
# -------------------------
img = cv2.bilateralFilter(img, 9, 75, 75)

# -------------------------
# 10. Brightness Balance
# -------------------------
img = cv2.normalize(img, None, 0, 255, cv2.NORM_MINMAX)

# -------------------------
# 11. Super Resolution (Upscaling)
# -------------------------
height, width = img.shape[:2]
img = cv2.resize(img, (width*scale, height*scale), interpolation=cv2.INTER_CUBIC)

# -------------------------
# 12. Final Sharpen
# -------------------------
kernel2 = np.array([[0,-1,0],
                    [-1,5,-1],
                    [0,-1,0]])

img = cv2.filter2D(img, -1, kernel2)

# Save output
cv2.imwrite(output_path, img)'''
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