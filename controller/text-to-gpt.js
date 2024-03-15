import {OpenAI} from 'openai';
import dotenv from "dotenv";
dotenv.config({path: './.env'});

export  async function getChatGPTResponse(prompt) {

  const openai = new OpenAI({
    apiKey:process.env.API_KEY_OPENAI
  });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `${prompt} give small answer in 2-3 line` }],
      model: "gpt-3.5-turbo",
    });
  


    let answer  = completion.choices[0].message.content;
    return answer;
}