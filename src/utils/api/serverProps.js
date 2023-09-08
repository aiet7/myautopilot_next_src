export const handleServerPropsData = async (userId) => {
  const [initialUser, initialAgents] = await Promise.all([
    handeGetUser(userId),
    handleGetAgents(),
  ]);

  return {
    initialUser,
    initialAgents,
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

export const handleGetTasks = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getTasks?userId=${userId}`
  );
  return await response.json();
};

export const handleGetNotes = async (conversationId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getNotes?conversationID=${conversationId}`
  );

  return await response.json();
};

export const handleGetTickets = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getSupportTickets?userId=${userId}`
  );

  return await response.json();
};
