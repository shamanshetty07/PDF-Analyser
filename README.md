# 📄 PDF Analyzer AI

An AI-powered PDF Analyzer built with Node.js, Express, Multer, PDF-Parse, Cloudinary, and Google's Gemini API.

Users can upload a PDF, extract its contents, and use Gemini AI to analyze the document. The project is designed for applications like syllabus analysis, document summarization, interview preparation, and more.

---

## 🚀 Features

- Upload PDF files
- Store uploaded PDFs using Cloudinary
- Extract text from PDF documents
- Analyze PDFs using Google's Gemini API
- Generate AI-powered summaries and insights
- REST API built with Express.js

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### File Upload
- Multer

### PDF Processing
- pdf-parse

### Cloud Storage
- Cloudinary

### AI
- Google Gemini API

### Environment Variables
- dotenv

---

## 📂 Project Structure

```
backend/
│
├── uploads/
├── node_modules/
│
├── .env
├── .gitignore
├── cloudinary.js
├── index.js
├── package.json
└── README.md
```

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/pdf-analyzer.git
```

Move into the project

```bash
cd pdf-analyzer/backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=3000

CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Run the Project

```bash
npm start
```

Server starts on

```
http://localhost:3000
```

---

## API

### Upload PDF

```
POST /upload
```

Form Data

| Key | Type |
|------|------|
| pdf | File |

---

## Workflow

```
User uploads PDF
        │
        ▼
Multer
        │
        ▼
Cloudinary Upload
        │
        ▼
Extract PDF Text
        │
        ▼
Gemini AI
        │
        ▼
AI Analysis
        │
        ▼
Return Response
```

---

## Example Use Cases

- PDF Summarizer
- College Syllabus Analysis
- Resume Analysis
- Research Paper Summary
- Study Notes Generation
- Interview Question Generation
- AI-powered Document Understanding

---

## Future Improvements

- User Authentication (JWT)
- Store Analysis History
- Multiple PDF Upload
- Chat with PDF
- Vector Database Integration
- RAG (Retrieval-Augmented Generation)
- OCR Support for Scanned PDFs
- Frontend using React
- Markdown/PDF Export
- Streaming AI Responses

---

## Dependencies

- express
- multer
- dotenv
- cloudinary
- pdf-parse
- @google/genai

---

## Security

- Environment variables are stored in `.env`
- `.env` is ignored using `.gitignore`
- API keys are never committed to GitHub

---

## Author

**Shaman Shetty**

Computer Science (AI & ML)

---

## License

This project is licensed under the MIT License.
