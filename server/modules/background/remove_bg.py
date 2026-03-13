'''import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path)

mask = np.zeros(img.shape[:2], np.uint8)

bgdModel = np.zeros((1,65), np.float64)
fgdModel = np.zeros((1,65), np.float64)

height, width = img.shape[:2]
rect = (10,10,width-20,height-20)

cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
result = img * mask2[:,:,np.newaxis]

b,g,r = cv2.split(result)
alpha = mask2 * 255

rgba = cv2.merge([b,g,r,alpha])

cv2.imwrite(output_path, rgba)''''''main
import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path)

if img is None:
    print("Error loading image")
    sys.exit(1)

mask = np.zeros(img.shape[:2], np.uint8)

bgdModel = np.zeros((1,65), np.float64)
fgdModel = np.zeros((1,65), np.float64)

height, width = img.shape[:2]

rect = (10,10,width-20,height-20)

cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')

result = img * mask2[:,:,np.newaxis]

b,g,r = cv2.split(result)
alpha = mask2 * 255

rgba = cv2.merge([b,g,r,alpha])

cv2.imwrite(output_path, rgba)'''

'''
import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path)

if img is None:
    print("Image load failed")
    sys.exit(1)

h, w = img.shape[:2]

# Resize very large images (speed improvement)
if max(h, w) > 1600:
    scale = 1600 / max(h, w)
    img = cv2.resize(img, None, fx=scale, fy=scale)

h, w = img.shape[:2]

# Smooth image slightly
img_blur = cv2.GaussianBlur(img, (5,5), 0)

# Create empty mask
mask = np.zeros((h, w), np.uint8)

# Rectangle slightly inside the border
margin_x = int(w * 0.05)
margin_y = int(h * 0.05)

rect = (
    margin_x,
    margin_y,
    w - margin_x * 2,
    h - margin_y * 2
)

bgModel = np.zeros((1,65), np.float64)
fgModel = np.zeros((1,65), np.float64)

# Run GrabCut
cv2.grabCut(
    img_blur,
    mask,
    rect,
    bgModel,
    fgModel,
    5,
    cv2.GC_INIT_WITH_RECT
)

# Extract foreground
mask2 = np.where(
    (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD),
    1,
    0
).astype('uint8')

# Clean mask
kernel = np.ones((3,3), np.uint8)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=3)
mask2 = cv2.GaussianBlur(mask2.astype(np.float32), (5,5), 0)

# Apply mask
result = img * mask2[:,:,np.newaxis]

# Create transparent output
b,g,r = cv2.split(result)
alpha = (mask2 * 255).astype(np.uint8)

rgba = cv2.merge([b,g,r,alpha])

cv2.imwrite(output_path, rgba)

import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path)

if img is None:
    print("Image load failed")
    sys.exit(1)

h, w = img.shape[:2]

# Resize very large images (speed improvement)
if max(h, w) > 1600:
    scale = 1600 / max(h, w)
    img = cv2.resize(img, None, fx=scale, fy=scale)

h, w = img.shape[:2]

# Slight smoothing (helps segmentation)
img_blur = cv2.GaussianBlur(img, (5,5), 0)

# Create mask
mask = np.zeros((h, w), np.uint8)

# Models required by GrabCut
bgModel = np.zeros((1,65), np.float64)
fgModel = np.zeros((1,65), np.float64)

# Rectangle slightly inside border
margin_x = int(w * 0.05)
margin_y = int(h * 0.05)

rect = (
    margin_x,
    margin_y,
    w - margin_x * 2,
    h - margin_y * 2
)

# Run GrabCut
cv2.grabCut(
    img_blur,
    mask,
    rect,
    bgModel,
    fgModel,
    5,
    cv2.GC_INIT_WITH_RECT
)

# Extract foreground mask
mask2 = np.where(
    (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD),
    1,
    0
).astype('uint8')

# Clean mask
kernel = np.ones((3,3), np.uint8)

mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_OPEN, kernel, iterations=1)

# Apply mask to image
result = cv2.bitwise_and(img, img, mask=mask2)

# Split channels
b, g, r = cv2.split(result)

# Create alpha channel
alpha = (mask2 * 255).astype(np.uint8)

# Ensure same size
alpha = cv2.resize(alpha, (b.shape[1], b.shape[0]))

# Merge channels
rgba = cv2.merge([b, g, r, alpha])

# Save transparent PNG
cv2.imwrite(output_path, rgba)'''


'''
import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path)

if img is None:
    print("Image load failed")
    sys.exit(1)

# Resize large images (better performance)
h, w = img.shape[:2]
if max(h, w) > 1500:
    scale = 1500 / max(h, w)
    img = cv2.resize(img, None, fx=scale, fy=scale)

# Smooth image
blur = cv2.GaussianBlur(img, (5,5), 0)

# Edge detection
edges = cv2.Canny(blur, 80, 200)

# Dilate edges
kernel = np.ones((3,3), np.uint8)
edges = cv2.dilate(edges, kernel, iterations=2)

# Create mask
mask = np.zeros(img.shape[:2], np.uint8)

# probable foreground from edges
mask[edges > 0] = cv2.GC_PR_FGD

# probable background
mask[edges == 0] = cv2.GC_PR_BGD

bgdModel = np.zeros((1,65), np.float64)
fgdModel = np.zeros((1,65), np.float64)

# Run GrabCut
cv2.grabCut(img, mask, None, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_MASK)

# Final mask
mask2 = np.where(
    (mask==cv2.GC_FGD) | (mask==cv2.GC_PR_FGD),
    1, 0
).astype('uint8')

# Clean mask
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)

# Apply mask
result = img * mask2[:,:,np.newaxis]

# Convert to transparent
b,g,r = cv2.split(result)
alpha = mask2 * 255
rgba = cv2.merge([b,g,r,alpha])

cv2.imwrite(output_path, rgba)'''


import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path)

if img is None:
    print("Image load failed")
    sys.exit(1)

# Resize large images (better performance)
h, w = img.shape[:2]
if max(h, w) > 1500:
    scale = 1500 / max(h, w)
    img = cv2.resize(img, None, fx=scale, fy=scale)

# Smooth image
blur = cv2.GaussianBlur(img, (5,5), 0)

# Edge detection
edges = cv2.Canny(blur, 60, 180)

# Dilate edges
kernel = np.ones((3,3), np.uint8)
edges = cv2.dilate(edges, kernel, iterations=2)

# Create mask
mask = np.zeros(img.shape[:2], np.uint8)

# probable foreground from edges
mask[edges > 0] = cv2.GC_PR_FGD

# probable background
mask[edges == 0] = cv2.GC_PR_BGD

bgdModel = np.zeros((1,65), np.float64)
fgdModel = np.zeros((1,65), np.float64)

# Run GrabCut
cv2.grabCut(img, mask, None, bgdModel, fgdModel, 7, cv2.GC_INIT_WITH_MASK)

# Final mask
mask2 = np.where(
    (mask==cv2.GC_FGD) | (mask==cv2.GC_PR_FGD),
    1, 0
).astype('uint8')

# Clean mask
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)

# Additional noise removal
mask2 = cv2.medianBlur(mask2, 5)

# Smooth mask edges
mask2 = cv2.GaussianBlur(mask2.astype(np.float32), (5,5), 0)
mask2 = (mask2 > 0.3).astype('uint8')

# Apply mask
result = img * mask2[:,:,np.newaxis]

# Convert to transparent
b,g,r = cv2.split(result)
alpha = mask2 * 255
rgba = cv2.merge([b,g,r,alpha])

cv2.imwrite(output_path, rgba)
'''
from rembg import remove
from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

input_image = Image.open(input_path)

output_image = remove(input_image)

output_image.save(output_path)'''