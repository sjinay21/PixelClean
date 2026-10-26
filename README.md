# PixelClean - Media Processing & Enhancement Platform

PixelClean is a full-stack web application for image enhancement, watermark removal, background removal, logo watermark removal, and PDF watermark processing. It combines a Next.js frontend with a Node.js/Express backend and Python-based image-processing workflows.

**Live website:** https://pixelclean-frontend.vercel.app

## Features

### Image Watermark Remover
- Provides an automated workflow for removing image watermarks.
- Connects the frontend to the backend processing service.
- Returns the processed image for the user to view or download.

### PDF Watermark Remover
- Provides a workflow for processing PDF documents and removing supported watermarks or stamps.
- Supports document upload and delivery of the processed result.

### Logo Watermark Remover
- Uses a custom Node.js image-processing engine.
- Uses alpha blending calculations and reference alpha maps to recover pixels where the supported logo watermark matches the expected pattern.

### Background Remover
- Uses Python and OpenCV's GrabCut segmentation with edge detection and mask post-processing.
- Produces a transparent PNG result when the foreground can be separated successfully.

### Image Enhancer
- Uses Python and OpenCV for image processing.
- Applies colour denoising, cubic interpolation for upscaling, sharpening, and brightness/contrast adjustments.
- Supports configurable upscaling factors through the processing workflow.

### Authentication and Dashboard
- Supports user registration and login using JWT-based authentication.
- Uses password hashing for account security.
- Tracks tool usage and subscription information through the backend.

## Tech Stack

### Frontend
- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Framer Motion
- Axios
- React Dropzone
- Yup
- Material UI Icons

### Backend
- Node.js and Express
- MongoDB and Mongoose
- Python and OpenCV
- Node Canvas and Sharp
- Cloudinary for media storage and delivery
- JWT and bcrypt for authentication
- Multer and Streamifier for file upload handling

## Project Structure

```text
PixelClean/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/             # Next.js routes and pages
│   │   ├── components/      # Reusable UI and page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # API and utility modules
│   │   └── schemas/         # Validation schemas
│   └── package.json
└── server/
    ├── app.js
    ├── server.js
    ├── config/
    ├── core/
    ├── middleware/
    ├── models/
    ├── modules/
    ├── services/
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (use a version supported by the project dependencies)
- npm
- Python 3.10 or newer
- MongoDB, either locally or through a hosted database
- Python packages required by the image-processing scripts

### 1. Clone the repository

```bash
git clone https://github.com/sjinay21/PixelClean.git
cd PixelClean
```

### 2. Configure and start the backend

```bash
cd server
npm install
```

Configure the backend environment variables required by your local setup in `server/.env`. Keep secrets in environment files and never commit real credentials to GitHub.

Start the backend using the script configured in `server/package.json`, for example:

```bash
npm run dev
```

### 3. Configure and start the frontend

Open a separate terminal:

```bash
cd client
npm install
```

Configure `client/.env.local` with the backend URL used by your local environment. For example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend is typically available at `http://localhost:3000` when using the standard Next.js development port.

## Environment Configuration

The backend requires environment configuration for the database, authentication, media storage, and any external processing services enabled by the application. Set these values in `server/.env` according to your deployment or local setup. Do not put private server credentials in frontend environment variables or publish them in the repository.

The frontend uses the following configuration values when applicable:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL for backend API requests |
| `BACKEND_URL` | Backend host URL for server-side requests, where used |

## API Overview

Protected processing endpoints use the application's authentication flow. Available endpoints depend on the backend configuration.

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/register` | Register an account |
| `POST /api/auth/login` | Log in and receive an authentication token |
| `GET /api/protected` | Retrieve authenticated user information, where enabled |
| `POST /api/watermark` | Process an image for watermark removal |
| `POST /api/pdf` | Process a PDF document for watermark removal |
| `POST /api/logo` | Process a supported logo watermark in an image |
| `POST /api/background` | Remove an image background |
| `POST /api/enhance` | Enhance or upscale an image |

Check the backend route files for the exact request fields, response formats, and authentication requirements for each endpoint.

## Subscription Plans

The following plan limits describe the proposed website pricing. Make sure they match the usage limits enforced by the deployed backend before publishing them to users.

| Feature | Free | Pro - ₹799 | Premium - ₹999 |
|---|---:|---:|---:|
| Image Watermark Removal | 1 use | 5 uses | Unlimited |
| PDF Watermark Removal | 1 use | 3 uses | Unlimited |
| Logo Watermark Removal | 2 uses | Unlimited | Unlimited |
| Background Removal | 2 uses | Unlimited | Unlimited |
| Image Enhancement | 2 uses | Unlimited | Unlimited |

The video watermark tool is not listed as an included plan feature because availability and quota enforcement should be confirmed before it is advertised. The pricing period should be stated on the website only after it has been decided.

## Security Notes

- Keep backend secrets in environment variables and never expose them in frontend code or public documentation.
- Do not commit `.env` or `.env.local` files containing real credentials.
- Use HTTPS in production.
- Validate uploaded files and enforce file-size and usage limits on the backend.
- Protect authenticated routes with the server's authentication middleware.

## License

Add the project's actual license here if one has been selected. Do not claim a license unless the repository contains the corresponding license terms.
