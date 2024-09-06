import MarkedInteraction from "../../Marked/MarkedInteraction";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { useEffect } from "react";
import TicketButtons from "./Ticket/TicketButtons";
import EngineerButtons from "../Interfaces/EngineerChat/EngineerButtons";

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
  if (item.type === "engineerButtons") {
    return <EngineerButtons />;
  }

  return <MarkedInteraction id={item.id} markdown={item.content} />;
};
export default Switch;
