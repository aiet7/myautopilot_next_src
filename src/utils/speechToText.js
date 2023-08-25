export let recognition;

if (typeof window !== "undefined") {
  const SpeechRecognitionConstructor =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition;

  if (SpeechRecognitionConstructor) {
    recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
  } else {
    alert("Speech Recognition is not available in this browser.")
  }
}
