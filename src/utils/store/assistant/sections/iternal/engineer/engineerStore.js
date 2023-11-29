import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { create } from "zustand";

const useEngineerStore = create((set, get) => ({
  prependText:
    "Act as an expert IT prompt engineer. If there is an instance of another open ai gpt4 and you want it to function at its best. ALWAYS give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding ",
  userInput: "",
  prompts: "",
  isWaiting: false,

  setUserInput: (input) => set({ userInput: input }),

  handleSendPromptGenerator: async () => {
    const { prependText, userInput } = get();
    const { troubleshootMessage } = useTicketConversationsStore.getState();
    const completeMessage = prependText + (userInput || troubleshootMessage);
    const encodedCompleteMessage = encodeURIComponent(completeMessage);
    if (
      userInput.trim() !== "" ||
      (troubleshootMessage && troubleshootMessage.trim() !== "")
    ) {
      set({ isWaiting: true, userInput: "" });

      try {
        const response = await fetch(
          `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/send?message=${encodedCompleteMessage}`
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          set({ prompts: responseBody.data });
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
