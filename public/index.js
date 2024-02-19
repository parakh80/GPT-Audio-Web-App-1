
const button = document.querySelector("button");
const playButton = document.getElementById("play-button");
const audioElement = document.getElementById("audio");

playButton.disabled = true; // Disable play button by default

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  console.log("Speech Recognition Started");
};

recognition.onresult = async (event) => {
  const spokenWords = event.results[0][0].transcript;
  console.log("Spoken words are ", spokenWords);

  try {
    const response = await fetch('/spokenwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ spokenWords })
    });
    console.log(response);

    playButton.disabled = false; // Enable the play button

    playButton.addEventListener("click", async () => {
      try {
        const audioContent = await response.arrayBuffer();
        const audioBlob = new Blob([audioContent], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioElement.src = audioUrl;
        audioElement.play();
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    });

  } catch (error) {
    console.error('Error sending spoken words to server:', error);
  }
}

button.addEventListener("click", () => {
  recognition.start();
  playButton.disabled = true; // Disable play button when "Let's talk!" is clicked
});
