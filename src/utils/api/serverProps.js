export const handleServerPropsData = async (userId) => {
  const [initialUser, initialConversations, initialAgents, initialRooms] =
    await Promise.all([
      handeGetUser(userId),
      handleGetConversations(userId),
      handleGetAgents(),
      handleGetRooms(userId),
    ]);

  const initialMessages = await Promise.all(
    initialConversations.map((conversation) =>
      handleGetMessages(conversation.id)
    )
  );

  const initialRoomMessages = await Promise.all(
    initialRooms.map((room) => handleGetRoomMessages(room.id))
  );

  return {
    initialUser,
    initialConversations,
    initialAgents,
    initialMessages,
    initialRooms,
    initialRoomMessages,
  };
};

export const handeGetUser = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getUserById?userId=${userId}`
  );
  return await response.json();
};

export const handleGetConversations = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getConversations?userId=${userId}`
  );
  return await response.json();
};

export const handleGetAgents = async () => {
  const response = await fetch(
    "https://etech7-wf-etech7-db-service.azuremicroservices.io/getAgents"
  );
  return await response.json();
};

export const handleGetRooms = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getRooms?userId=${userId}`
  );
  return await response.json();
};

export const handleGetMessages = async (conversationId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getMessages?conversationId=${conversationId}`
  );
  return await response.json();
};

export const handleGetRoomMessages = async (roomId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getRoomMessages?roomId=${roomId}`
  );
  return await response.json();
};
