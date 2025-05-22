#Airalo QA Automation Task - UI & API Testing

This repository contains automated test solutions for both UI and API exercises as part of the Senior Test Automation Engineer assessment at **Airalo**.

---

##Project Structure

📦 airalo-test
┣ 📂 tests
┃ ┗ 📜 test-task.spec.ts              # Main Playwright test file for UI & API tests
┣ 📂 helpers
┃ ┣ 📜 page-helper.ts                 # Page actions for UI test
┃ ┣ 📜 api-services.ts                # API interaction utilities
┃ ┣ 📜 data-for-body-requests.ts      # Constants used in API payloads
┃ ┗ 📜 urls.ts                        # All API endpoint URLs
┣ 📂 config
┃ ┗ 📜 playwright.config.ts           # Playwright test config
┣ 📜 .env.example                      # Example .env template
┗ 📜 README.md

Setup Instructions

STEP 1: Clone the Repository

BASH

git clone https://github.com/bottomcity/airalo-test.git
cd airalo-test

STEP 2: Install Dependencies

BASH

npm install
npx playwright install

STEP 3: Create .env File
# UI Base URL

BASE_URL=https://www.airalo.com

# Partner API Settings
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
BASE_API_URL=https://sandbox-partners-api.airalo.com/v2

# Playwright Settings
RETRIES=1
TRACE_MODE=retain-on-failure
HEADLESS=true
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=800

STEP 4: Run UI & API Tests

npx playwright test

Test Case Summary

UI Automation
•	Navigate to airalo.com
•	Verify header/footer elements are visible
•	Search for a country (e.g., “Japan”)
•	Validate selected country page content
•	Select eSIM package and validate detail popup
•	Assert text & visibility of freemium download button

API Automation
•	Authenticate using OAuth2 client credentials
•	Verify existence of merhaba-7days-1gb package via /packages
•	Submit a POST /orders request with quantity = 6
•	Validate order ID & correct package slugs in response
•	GET /esims and assert 6 matching results returned

⸻

Tech Stack
•	Playwright
•	TypeScript
•	Dotenv
•	Node.js

⸻

Strategy Overview
•	Modular structure for both UI and API helpers
•	Configurable via .env to allow secure secrets injection
•	Assertions included for all key response validations and UI states
•	Resilient handling for flakiness (timeouts, retry logic)

⸻

Time Spent

Approximately 3 hours across both exercises.

⸻

Author

Alexander Yudin
Senior Test Automation Engineer
GitHub: bottomcity
