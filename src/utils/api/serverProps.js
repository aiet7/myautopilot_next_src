export const handleServerPropsData = async (clientId) => {
  const [initialUser, initialTickets, initialConversations, initialAgents] =
    await Promise.all([
      handleGetUser(clientId),
      handleGetTickets(clientId),
      handleGetConversations(clientId),
      handleGetAgents(),
    ]);

  const initialMessages = await Promise.all(
    initialConversations.map((conversation) =>
      handleGetMessages(conversation.id)
    )
  );

  return {
    initialUser,
    initialTickets,
    initialAgents,
    initialConversations,
    initialMessages,
  };
};

export const handleGetUser = async (clientId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getClientById?id=${clientId}`
  );
  return response.json();
};

export const handleGetConversations = async (clientId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getConversations?userId=${clientId}`
  );
  return response.json();
};

export const handleGetAgents = async () => {
  const response = await fetch(
    "https://etech7-wf-etech7-db-service.azuremicroservices.io/getAgents"
  );
  return response.json();
};

export const handleGetRooms = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getRooms?userId=${userId}`
  );
  return response.json();
};

export const handleGetMessages = async (conversationId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getMessages?conversationId=${conversationId}`
  );
  return response.json();
};

export const handleGetRoomMessages = async (roomId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getRoomMessages?roomId=${roomId}`
  );
  return response.json();
};

export const handleGetTasks = async (userId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getTasks?userId=${userId}`
  );
  return response.json();
};

export const handleGetNotes = async (conversationId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getNotes?conversationID=${conversationId}`
  );

  return response.json();
};

export const handleGetTickets = async (clientId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getSupportTickets?userId=${clientId}`
  );

  return response.json();
};

export const handleGetReports = async () => {
  const response = await fetch(
    "https://etech7-wf-etech7-support-service.azuremicroservices.io/getReports"
  );
  return response.json();
};

export const handleGetProjects = async () => {
  const response = await fetch(
    "https://etech7-wf-etech7-support-service.azuremicroservices.io/getProjects"
  );
  return response.json();
};
