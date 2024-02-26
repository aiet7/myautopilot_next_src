const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

export const handleGetTech = async (msp, techId) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(
      msp
    )}/technicianUsers/getById?id=${encodeURIComponent(techId)}`
  );
  return response.json();
};

export const handleGetClient = async (msp, clientId) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(
      msp
    )}/clientUsers/getById?id=${encodeURIComponent(clientId)}`
  );

  return response.json();
};

export const handleGetIntegrations = async (msp) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(msp)}/integrations`
  );
  return response.json();
};

export const handleGetManageTechnicians = async (msp) => {
  const response = await fetch(
    `${connectWiseServiceUrl}/getConnectWiseMembers?mspCustomDomain=${encodeURIComponent(
      msp
    )}`
  );
  return response.json();
};

export const handleGetManageDBTechnicians = async (msp) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(
      msp
    )}/technicianUsers/activeTechnicians`
  );
  return response.json();
};

export const handleGetManageClients = async (msp) => {
  const response = await fetch(
    `${connectWiseServiceUrl}/getConnectWiseClients?mspCustomDomain=${encodeURIComponent(
      msp
    )}`
  );
  return response.json();
};

export const handleGetManageDBClients = async (msp) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(msp)}/clients/getAll`
  );
  return response.json();
};

export const handleGetManageContacts = async (msp) => {
  const response = await fetch(
    `${connectWiseServiceUrl}/getConnectWiseContacts?mspCustomDomain=${encodeURIComponent(
      msp
    )}`
  );
  return response.json();
};

export const handleGetManageDBContacts = async (msp) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(msp)}/connectWiseContacts`
  );
  return response.json();
};

export const handleGetRoles = async (msp) => {
  const response = await fetch(
    `${dbServiceUrl}/${encodeURIComponent(msp)}/roles/all`
  );
  return response.json();
};

export const handleGetConversations = async (clientId) => {
  const response = await fetch(
    `${dbServiceUrl}/conversations/getConversations?userId=${clientId}`
  );

  return response.json();
};

export const handleGetMessages = async (conversationId) => {
  const response = await fetch(
    `${dbServiceUrl}/getMessages?conversationId=${conversationId}`
  );
  return response.json();
};

export const handleGetMSPTickets = async (msp) => {
  const response = await fetch(
    `${dbServiceUrl}/supportTickets/byMspCustomDomain?mspCustomDomain=${encodeURIComponent(
      msp
    )}`
  );

  return response.json();
};

export const handleGetMSPs = async (customDomain) => {
  const response = await fetch(
    `${dbServiceUrl}/msp?customDomain=${customDomain}`
  );
  return response.json();
};

export const handleGetAgents = async () => {
  const response = await fetch(`${dbServiceUrl}/getAgents`);
  return response.json();
};

// export const handleGetUser = async (clientId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getClientById?id=${clientId}`
//   );
//   return response.json();
// };

// export const handleGetDocumentConversations = async (clientId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getDocumentConversations?userId=${clientId}`
//   );
//   return response.json();
// };

// export const handleGetRooms = async (userId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getRooms?userId=${userId}`
//   );
//   return response.json();
// };

// export const handleGetDocumentMessages = async (documentConversationId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getDocumentMessages?documentConversationID=${documentConversationId}`
//   );
//   return response.json();
// };

// export const handleGetRoomMessages = async (roomId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getRoomMessages?roomId=${roomId}`
//   );
//   return response.json();
// };

// export const handleGetTasks = async (userId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getTasks?userId=${userId}`
//   );
//   return response.json();
// };

// export const handleGetNotes = async (conversationId) => {
//   const response = await fetch(
//     `https://etech7-wf-etech7-db-service.azuremicroservices.io/getNotes?conversationID=${conversationId}`
//   );

//   return response.json();
// };

// export const handleGetReports = async () => {
//   const response = await fetch(
//     "https://etech7-wf-etech7-support-service.azuremicroservices.io/getReports"
//   );
//   return response.json();
// };

// export const handleGetProjects = async () => {
//   const response = await fetch(
//     "https://etech7-wf-etech7-support-service.azuremicroservices.io/getProjects"
//   );
//   return response.json();
// };
