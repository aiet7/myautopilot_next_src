import { create } from "zustand";
import { recognition } from "../../../../utils/speechToText.js";
import useConversationStore from "../conversations/conversationsStore";

const useSpeechStore = create((set, get) => ({
  isListening: false,
  handleTriggerSpeech: () => {
    const { handleSendUserMessage } = useConversationStore.getState();

    if (recognition) {
      recognition.start();

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        handleSendUserMessage(speechResult);
        recognition.stop();
        set({
          isListening: false,
        });
      };

      recognition.onspeechend = () => {
        recognition.stop();
        set({
          isListening: false,
        });
      };

      recognition.onerror = (event) => {
        console.log("Error occurred in recognition: " + event.error);
        set({
          isListening: false,
        });
      };
      set({
        isListening: true,
      });
    } else {
      alert("Speech Recognition is not available in this browser.");
    }
  },
}));

export default useSpeechStore;
