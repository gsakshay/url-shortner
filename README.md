<!-- @format -->

# URL Shortener Project

## Introduction

This project provides a URL shortening service, allowing users to convert long URLs into shortened, easy-to-share links. It offers functionalities like URL shortening, user registration, viewing URL history, and redirection.

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Running the Project Locally

1. Clone the repository
2. Install Node.js modules: `npm install`
3. Create a `.env` file based on `sample/.env.sample`
4. Start the server: `npm start`

## Project Structure

### Server Initialization

The `server.js` file handles:

- MongoDB connection setup and tire creation
- Initialization of the main counter

### Routing and Middleware Handling

Middleware:

- CORS, Morgan, JSON parsing
  Route handling:
- API endpoints and error management

### Main Endpoints

1. `api/user/register`

   - Registers a user
   - Example request body and response format provided

2. `api/url/shorten`

   - Shortens a URL
   - Example request body and response format provided

3. `api/user/history/:userId`

   - Fetches URL history for a specific user
   - Example response format provided

4. `/:shortUrl` -> Redirects to actual LongURL
   - Redirects to the original long URL

## API Documentation

### `api/user/register`

Description:

- Registers a user with specified tire level

Example Request Body:

````json
{
    "username": "test-user",
    "tire": "Tier 1"
}
````

Example Response:
````json
{
    "username": "test-user",
    "tire": "655bb5e273e5a2951d5d8439",
    "requests": 0,
    "_id": "655bb5f673e5a2951d5d8445",
    "createdAt": "2023-11-20T19:39:34.889Z",
    "updatedAt": "2023-11-20T19:39:34.889Z",
    "__v": 0
}
````
###  `api/url/shorten`
Description:
- Shortens a URL provided by the user

Example Request body:

````json
{
    "longUrl": "https://www.youtube.com/watch?v=Nmv2-oSQyWE",
    "userId":  "655bb5f673e5a2951d5d8445",
    "alias": "o"
}
````

Example Response:

````json
{
	"longUrl": "https://www.youtube.com/watch?v=Nmv2-oSQyWE",
	"shortUrl": "http://localhost:8000/b"
}
````

### api/user/history/:userId

Description:

- Fetches all shortened URLs for a specific user

Example Request:

`api/user/history/:userId`

````json
[
    {
        "_id": "655bb60273e5a2951d5d844b",
        "longUrl": "https://www.youtube.com/watch?v=Nmv2-oSQyWE",
        "shortUrl": "b",
        "user": "655bb5f673e5a2951d5d8445",
        "accessCount": 1,
        "createdAt": "2023-11-20T19:39:46.108Z",
        "updatedAt": "2023-11-20T19:39:52.079Z",
        "__v": 0
    }
]
````

### Redirect Endpoint `/:shortUrl`

Description:
- Redirects to the original long URL

## Technologies Used
- Node.js
- Express.js
- MongoDB