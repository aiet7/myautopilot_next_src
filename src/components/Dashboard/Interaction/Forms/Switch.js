import MarkedInteraction from "../../Marked/MarkedInteraction";
import Troubleshoot from "../Forms/Ticket/Troubleshoot";
import TicketForm from "../Forms/Ticket/TicketForm.js";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { useEffect } from "react";

const Switch = ({ item, itemId }) => {
  const { activeSectionButton, isMobile, setIsMobile, setActiveSectionButton } =
    useTicketConversationsStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1023);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  switch (item.type) {
    case "form":
      switch (item.formType) {
        case "ticketForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Create a support ticket.</p>
              <div
                className={`${
                  isMobile ? "flex-col" : "flex-row"
                } flex gap-6 items-start`}
              >
                {isMobile ? (
                  <>
                    <div className="dark:border-white/20 flex items-center border rounded w-full">
                      <button
                        onClick={() => setActiveSectionButton("Form")}
                        className={`${
                          activeSectionButton === "Form" &&
                          "bg-blue-800 text-white"
                        } w-full rounded p-2`}
                      >
                        Form
                      </button>
                      <button
                        onClick={() => setActiveSectionButton("Troubleshoot")}
                        className={`${
                          activeSectionButton === "Troubleshoot" &&
                          "bg-blue-800 text-white"
                        } w-full rounded p-2`}
                      >
                        Troubleshoot
                      </button>
                    </div>
                    <div className="w-full">
                      {activeSectionButton === "Form" && (
                        <TicketForm itemId={itemId} />
                      )}
                      {activeSectionButton === "Troubleshoot" && (
                        <Troubleshoot />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <TicketForm itemId={itemId} />
                    </div>
                    <div className="flex-1">
                      <Troubleshoot />
                    </div>
                  </>
                )}
              </div>
            </div>
          );

        default:
          return null;
      }
    default:
      return <MarkedInteraction id={item.id} markdown={item.content} />;
  }
};
export default Switch;
