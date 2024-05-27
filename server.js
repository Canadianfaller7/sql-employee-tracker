const express = require('express');
const promptQuestions = require('./prompts/questionPrompts')


const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const showMainMenu = () => {
  promptQuestions();
}

app.use((req, res) => {
  res.status(404).end();
});
showMainMenu();