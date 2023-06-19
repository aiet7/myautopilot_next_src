export const handleSendGraph = async (
  token,
  currentEmailId,
  currentEmailSubject,
  currentEmailBody
) => {
  const rawContent = {
    message: {
      subject: currentEmailSubject,
      body: {
        contentType: "Text",
        content: currentEmailBody,
      },
      toRecipients: [
        {
          emailAddress: {
            address: currentEmailId,
          },
        },
      ],
    },
    saveToSentItems: "true",
  };

  const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawContent),
  });
  return response;
};
