This is a trivia quiz app built with the following considerations:
- User should be able to select a trivia category and difficulty
- User should be presented with 5 multiple choice questions
- User should receive the score with correct/incorrect anwers displayed in the ui
- The data should be seeding from an external API provided in the instructions

Tech Stack:

Front-End: React, TypeScript, Redux
Back-End: Node.js, Express, TypeScript
Database: MongoDB
Tests: Jest, React Testing Library

Installation:

1. Clone the repository:
Run the following commands in your terminal from a directory of your choice:

`git clone git@github.com:german-borys/fincons-trivia-app-challenge.git`
`cd fincons-trivia-app-challenge`

3. Setup the database
Run the following commands in your terminal:
The following instructions are to be used with Homebrew package manager


`brew tap mongodb/brew`
`brew install mongodb-community`
`brew services start mongodb-community`

4. Backend setup
Run the following commands in your terminal:

`cd server`
`npm install`
`npx ts-node src/seed_data.ts`
`npx ts-node src/index.ts`

6. Frontend configuration
Run the following commands in your terminal:

`cd ../client`
`npm install`
`npm start`

navigate to http://localhost:3000 on your browser


