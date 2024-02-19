// process.env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/folkloric-vault-406412-5f0424fcab7d.json`;

// const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

// const convertTextToSpeech = async (text) => {
//   // Creates a client
//   const client = new TextToSpeechClient();

//   // Construct the request
//   const request = {
//     input: { text: text },
//     voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//     audioConfig: { audioEncoding: 'MP3' },
//   };

//   try {
//     // Perform the text-to-speech request
//     const [response] = await client.synthesizeSpeech(request);
//     const audioContent = response.audioContent;
//     return audioContent;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }



// module.exports = convertTextToSpeech;






const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()

async function convertTextToSpeech(text) {

  const configuration = new Configuration({
    organization:process.env.ORGANIZATION_KEY,
    apiKey:process.env.API_KEY
  })
  const openai = new OpenAIApi(configuration);
    const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
   console.log('speechFile');
   const buffer = Buffer.from(await mp3.arrayBuffer());
   return buffer;
      

}


module.exports = convertTextToSpeech;
