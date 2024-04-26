# WM-Challenge

## Approach

The idea is to enhance wavemakers existing prototype with a new feature which is content recommendation.

Given that we already have an existing prototype, I developed a microservice using TypeScript that can seamlessly integrate with the main prototype. Additionally, I designed a minimal UI with HTML and TailwindCSS to demonstrate the feature's functionality.

The onboarding process is designed thinking that it will only collect more information about a user for recommendation services.

### Functional Requirements

- Collect additional user data for existing users which can be used to recommend content.

- The user should be able to select challenges and other preferences which would be used to recommend content.

- The user should be able to see the recommended content.

## APIs

- **POST /content/seed** - Used to seed the content data in firestore.

- **POST /content** - Retrieves the recommended content for the user based on the user preferences.

## Schema

- **Content**
  - name: string
  - challenges: string[]
  - learning_speed: string
  - support_type: string
  - description: string
  - learning_style: string

## Tech Stack

- **TypeScript** 
- **Express.js**
- **Firebase/Firestore**
- **Tailwind CSS**
- **HTML**

## Project Structure

- **src** - Contains the microservice source code.
- **public** - Holds static files for the UI.

## Pre-requisites

- Update Firebase credentials in `src/firebase.config.ts`. You may need to adjust Firebase rules to enable database read and write access.

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Execute `npm run build` to build the microservice; the build will be located in the dist folder.
4. Launch the server with `npm start`, defaulting to localhost:80.

## How it works

1. With the server running, seed content data by sending a POST request to `/content/seed`.

2. Open index.html in the public folder to access the UI.

3. Select challenges and preferences to receive personalized content recommendations.
