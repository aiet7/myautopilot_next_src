import MarkedInteraction from "../../Marked/MarkedInteraction";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { useEffect } from "react";

const Switch = ({ item, itemId }) => {
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

  return <MarkedInteraction id={item.id} markdown={item.content} />;
};
export default Switch;
