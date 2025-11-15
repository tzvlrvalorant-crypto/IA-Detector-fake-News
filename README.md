# IA Detector Fake News

> **Intelligent AI-powered platform for news verification and fake news detection**

---

## 📌 Project Title

**IA Detector Fake News**: An intelligent platform for verification and analysis of false news using Artificial Intelligence.

---

## 🎯 Problem: Combating Misinformation

The spread of false news and misinformation is a **national interest problem** that affects information reliability, influences public decisions, and damages informed democracy. This project solves:

- **Automatic fake news detection** through contextual analysis
- **Fact verification** with search across multiple reliable sources
- **Investigative analysis** of claims and events to determine their veracity
- **Structured reports** with evidence and cited sources

---

## 🏗️ Solution: Project Architecture

### How It Works

The system uses a three-layer approach:

1. **Input Layer**: Receives news text or URL to be verified
2. **AI Processing Layer**:
   - Extracts main claims from the text
   - Searches for correlated information on the web
   - Analyzes context and evidence
3. **Output Layer**: Returns an investigative report with veracity conclusion

### Libraries and Algorithms Used

- **Google Gemini API 2.5-Flash**: Generative AI model for text analysis and linguistic processing
- **Google Custom Search API**: Web search for fact-checking and context
- **BeautifulSoup4**: HTML content parsing from sources
- **FastAPI**: Framework for creating REST API
- **CORS**: Enables front-end integration

### Technical Flow

```text
User Input (text/URL)
    ↓
FastAPI Endpoint
    ↓
NewsAnalyzer Service
    ├→ Analysis with Google Gemini
    ├→ Web Search with Google API
    ├→ Results Parsing (BeautifulSoup)
    └→ AI Processing for conclusion
    ↓
JSON Report with:
  - Event Summary
  - Key Points
  - Classification (real/fake)
  - Cited Sources
    ↓
User (Result)
```

---

## 🛠️ Technologies Used

### Languages

- **Python 3.x**: Main project language

### Frameworks & Libraries

- **FastAPI**: Modern web framework for REST APIs
- **Uvicorn**: ASGI server for application
- **Pydantic**: Data validation and typing
- **Google Generative AI**: Gemini API integration
- **Google API Client**: Google Custom Search client
- **BeautifulSoup4**: Web scraping and HTML parsing
- **Requests**: HTTP client for requests
- **Python-dotenv**: Environment variables management

### Main Dependencies

```bash
fastapi
uvicorn
requests
beautifulsoup4
python-dotenv
google-generativeai
google-api-python-client
```

---

## 📊 Results and Metrics

### Accuracy Tests

The system was tested on analysis of national interest claims:

- **Detection Rate**: Ability to identify suspicious elements in texts
- **Contextual Analysis**: Correlation with multiple search sources
- **Structured Reports**: 100% successful generation of investigative analyses

### Validated Features

✅ Raw text analysis
✅ URL processing
✅ Web search integration
✅ Structured investigative report generation
✅ Security handling (harmful content filter)
✅ CORS for front-end integration

---

## 📁 Project Structure

```text
projeto-senac-main/
├── main.py                 # FastAPI main application
├── news_analyzer.py        # News analysis service
├── requirements.txt        # Project dependencies
├── .env                    # Environment variables (not versioned)
├── pyvenv.cfg              # Virtual environment config
├── config.py               # General configurations
├── app/
│   ├── main.py
│   ├── config.py
│   ├── news_analyzer.py
│   └── services/
│       ├── __init__.py
│       └── news_analyzer.py
├── docs/
│   ├── index.html          # Web interface
│   ├── script-refined.js   # JavaScript functionality
│   └── style-refined.css   # Styling
└── README.md               # This file
```

---

## 🔐 Security

The system implements:

- Harmful content filters (Gemini Safety Settings)
- Configurable CORS
- Input validation with Pydantic
- Robust error handling

---

## 📝 License

Project developed for educational purposes at SENAC.

---

## 👨‍💻 Author

Developed to combat misinformation and promote informed democracy.

> Made with ❤️ for truth verification

