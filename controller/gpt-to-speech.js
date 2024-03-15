import { fileURLToPath } from 'url';
import path from 'path'
// Get the directory path of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/folkloric-vault-406412-5f0424fcab7d.json`;

import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export const convertTextToSpeech = async (text) => {
  // Creates a client
  const client = new TextToSpeechClient();

  // Construct the request
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;
    return audioContent;
  } catch (error) {
    console.error('Error:', error);
  }
}
