import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { create } from "zustand";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const gptServiceUrl = process.env.NEXT_PUBLIC_GPT_SERVICE_URL;

const useEngineerStore = create((set, get) => ({
  prependText:
    "Act as an expert IT prompt engineer. ALWAYS give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding ",
  userInput: "",
  prompts: "",
  isWaiting: false,

  setUserInput: (input) => set({ userInput: input }),

  handleSendPromptGenerator: async () => {
    const { prependText, userInput } = get();
    const { troubleshootMessage } = useTicketConversationsStore.getState();
    const completeMessage = prependText + (userInput || troubleshootMessage);

    if (
      userInput.trim() !== "" ||
      (troubleshootMessage && troubleshootMessage.trim() !== "")
    ) {
      set({ isWaiting: true, userInput: "" });

      try {
        const response = await fetch(
          // `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/message?message=${encodedCompleteMessage}`
          `${gptServiceUrl}/message`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: completeMessage,
            }),
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          set({ prompts: responseBody.choices[0].message.content });
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ isWaiting: false });
      }
    }
  },

  clearEngineer: () => {
    set({ prompts: "" });
  },
}));

export default useEngineerStore;
