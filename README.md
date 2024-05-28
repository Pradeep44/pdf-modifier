# PDF Modifier Service
This service generates PDF documents from HTML content using Node.js, Express, and Puppeteer.

## Setup
1. Clone the repository
2. Install dependencies:
    npm install
3. Run the service:
    npm run start

## Docker
1. Build the Docker image:
    docker-compose build
2. Run the Docker container:
    docker-compose up

## Usage
Send a POST request to `/render-pdf` with JSON body:
{
  "html": "<html><body><h1>Hello World</h1></body></html>",
  "header": "<span>Header Content</span>",
  "footer": "<span>Footer Content</span>"
}
