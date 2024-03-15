import express from 'express';
const app = express();
import path from 'path';

// Serve static files
app.use(express.static('public'));

import  {getChatGPTResponse as GPTresponce} from './controller/text-to-gpt.js';
import  {convertTextToSpeech as getSpeech} from './controller/gpt-to-speech.js';


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



app.listen(process.env.PORT, () => {
  console.log(`listening on port:${process.env.PORT}`);
});