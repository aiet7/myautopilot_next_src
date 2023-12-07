export const handleGetTech = async (msp, techId) => {
  const response = await fetch(
    `http://localhost:9019/${encodeURIComponent(
      msp
    )}/technicianUsers/getById?id=${encodeURIComponent(techId)}`
  );
  return response.json();
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

export const handleGetDocumentConversations = async (clientId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getDocumentConversations?userId=${clientId}`
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

export const handleGetDocumentMessages = async (documentConversationId) => {
  const response = await fetch(
    `https://etech7-wf-etech7-db-service.azuremicroservices.io/getDocumentMessages?documentConversationID=${documentConversationId}`
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

export const handleGetMSPs = async (customDomain) => {
  const response = await fetch(
    `http://localhost:9019/msp?customDomain=${customDomain}`
  );
  return response.json();
};
