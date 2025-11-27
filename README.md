# Gmail AI Reply Assistant

A Chrome Extension that integrates with a Spring Boot backend to generate AI-powered replies for Gmail using Google's Gemini API.

## Features
- Adds a "Reply with AI" button to Gmail's compose toolbar.
- Generates professional, context-aware replies using Gemini 2.5 Flash.
- Backend built with Spring Boot (Java 17+).
- Frontend built with vanilla JavaScript (Manifest V3).
- **OOP Design**: Backend utilizes interfaces (`AiService`) and DTOs (`ReplyRequest`, `ReplyResponse`) for clean architecture.

## Prerequisites
- Java 17 or higher
- Maven
- Google Chrome
- Google Gemini API Key

## Setup & Running

### 1. Backend (Spring Boot)
The backend handles the communication with the Gemini API.

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Run the application with your API key:
    ```bash
    GEMINI_API_KEY=your_actual_api_key_here mvn spring-boot:run
    ```
    *Replace `your_actual_api_key_here` with your Gemini API key.*

The server will start on `http://localhost:8080`.

### 2. Chrome Extension
1.  Open Chrome and go to `chrome://extensions`.
2.  Enable **Developer mode** in the top right corner.
3.  Click **Load unpacked**.
4.  Select the `extension` folder from this project.

## Usage
1.  Open [Gmail](https://mail.google.com).
2.  Open an email you want to reply to.
3.  Click **Reply**.
4.  Click the **Reply with AI** button (next to the Send button).
5.  The AI-generated draft will appear in the compose box.

## Troubleshooting
-   **Button not appearing?** Refresh the Gmail page. The extension uses a timer to check for the toolbar, but Gmail's dynamic loading can sometimes delay it.
-   **Error generating reply?**
    -   Ensure the backend is running on port 8080.
    -   Check the backend console for errors (e.g., invalid API key).
    -   Reload the extension in `chrome://extensions` if you made changes.
