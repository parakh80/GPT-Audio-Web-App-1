const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static('public'));

const GPTresponce = require('./controller/text-to-gpt');
const getSpeech = require('./controller/gpt-to-speech');


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});






app.use(express.json());

// Handle POST request to '/spokenwords' endpoint
app.post('/spokenwords', async (req, res) => {

  const spokenWords = req.body.spokenWords;

  console.log('Spoken words received:', spokenWords);

  let answer = await GPTresponce(spokenWords);
  answer = answer.replace(/\n/g, ' ');
  console.log("answer: ",answer)

  const response = await getSpeech(answer);

  res.send(response);
});



// const fuckingFunction = async () => {
// let spokenWords = 'who are you'
// let answer = await GPTresponce(spokenWords);
// answer =  answer.replace(/\n/g, ' ');
// const response = await  getSpeech(answer);
// console.log(response)
// }
// fuckingFunction();

app.listen(3000, () => {
  console.log('listening on port:3000');
});


