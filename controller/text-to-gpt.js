const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()

async function getChatGPTResponse(prompt) {

  const configuration = new Configuration({
    organization:process.env.ORGANIZATION_KEY,
    apiKey:process.env.API_KEY
  })
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",

    messages: [
      { role: "user", content: `${prompt} give me small answer in two three line` }
    ]
  })

  let answer = completion.data.choices[0].message.content;
  return answer;

}


module.exports = getChatGPTResponse;
