import MarkedInteraction from "../../Marked/MarkedInteraction";
import TicketForm from "../Forms/Ticket/TicketForm.js";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { useEffect } from "react";

const Switch = ({ item, itemId }) => {
  const { isMobile, setIsMobile } = useTicketConversationsStore();

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
                className={`${isMobile ? "flex-col" : "flex-row"} flex gap-6 `}
              >
                <div className="flex-1">
                  <TicketForm itemId={itemId} />
                </div>
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
