# WM-Challenge

## Approach

The idea is to enhance wavemakers existing prototype with a new feature which is content recommendation.

Considering that we already have existing prototype we will develop a microservice that can be integrated with our prototype and develop a simple UI to demonstrate the feature.

The onboarding process is designed thinking that it will only collect more information about a user for recommendation service.

### Functional Requirements

- Collect additional user data for existing users which can be used to recommend content.

- The user should be able to select challenges and other preferences which would be used to recommend content.

- The user should be able to see the recommended content.

## APIs

- **POST /content/seed** - Used to seed the content data in firestore.

- **POST /content** - Retrieves the recommended content for the user based on the user preferences. A

## Schema

- **Content**
  - name - string
  - challenges: array
  - learning_speed: string
  - support_type: string
  - description: string
  - learning_style: string

## Tech Stack

- **Node.js** - Runtime environment for the backend.
- **Express.js** - Web framework for Node.js.
- **Firestore** - NoSQL database to store the content data.
- **Tailwind CSS** - CSS framework for the UI.
- **HTML** - Markup language for the UI.

## Project Structure

- **src** - Contains the source code for the microservice.
- **public** - Contains the static files for the UI.

## Pre-requisites

- Node.js
- Update firebase credentials in `src/config.js`

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run build` to build the microservice.
4. Run `npm start` to start the server at localhost:80 (default port).

Once the server is running, you can seed the content data by making a POST request to `/content/seed`.

You can visit public folder and open index.html to see the UI.
