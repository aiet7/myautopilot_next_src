"use client";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useState, useEffect } from "react";

import TeamMeetingHistory from "./TeamMeetingHistory";
import TeamAssistant from "./TeamAssistant";

const Teams = ({
  openTeamsHistory,
  openTeamsAssistant,
  handleOpenTeamsHistory,
  handleOpenTeamsAssistant,
}) => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  console.log(messages);

  const handleConnectToWebSocket = () => {
    const socket = new SockJS(`http://localhost:8083/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setConnected(true);
        stompClient.subscribe("/topic/agentResponses", (message) => {
          setMessages((prevState) => [...prevState, message.body]);
        });
        stompClient.publish({
          destination: "/app/userInput1",
          body: JSON.stringify({
            message: "how can we efficiently use springboot with react?",
            industry: "Software Development",
          }),
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
    });

    stompClient.activate();
    setClient(stompClient);
  };

  const handleDisconnectFromWebSocket = () => {
    if (client && connected) {
      client.deactivate();
    }
  };

  useEffect(() => {
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [client]);

  return (
    <div className="flex flex-1 relative overflow-hidden">
      <TeamMeetingHistory openTeamsHistory={openTeamsHistory} />
      <div
        onClick={() => {
          openTeamsHistory && handleOpenTeamsHistory(false);
          openTeamsAssistant && handleOpenTeamsAssistant(false);
        }}
        className={`relative flex flex-col h-full w-full  ${
          (openTeamsHistory && "lg:opacity-100 opacity-5") ||
          (openTeamsAssistant && "lg:opacity-100 opacity-5")
        } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
      >
        <button onClick={handleConnectToWebSocket}>Connect</button>
        <button onClick={handleDisconnectFromWebSocket}>Disconnect</button>
        {messages.map((data, i) => (
          <div key={i}>
            <div
              dangerouslySetInnerHTML={{
                __html: data,
              }}
            />
          </div>
        ))}
      </div>
      <TeamAssistant openTeamsAssistant={openTeamsAssistant} />
    </div>
  );
};

export default Teams;
