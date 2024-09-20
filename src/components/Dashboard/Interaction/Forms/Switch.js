import MarkedInteraction from "../../Marked/MarkedInteraction";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { useEffect } from "react";
import TicketButtons from "./Ticket/TicketButtons";


const Switch = ({ item }) => {

  const { setIsMobile } = useTicketConversationsStore();
  
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
  if (item.type === "ticketButtons") {
    return <TicketButtons />;
  }

  return (
    <MarkedInteraction
      id={item.id}
      elements={item.elements}
      markdown={item.content}
    />
  );
};
export default Switch;
