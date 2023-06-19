import { urlSafeBase64Encode } from "../base64encode";

export const handleSendGmail = async (
  token,
  currentEmailId,
  currentEmailSubject,
  currentEmailBody
) => {
  const rawContent = [
    `To: ${currentEmailId}`,
    `Subject: ${currentEmailSubject}`,
    "",
    `${currentEmailBody}`,
  ];
  const contentString = rawContent.join("\n");
  const encodedContent = urlSafeBase64Encode(contentString);
  const response = await fetch(
    "https://www.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: encodedContent }),
    }
  );
  return response;
};
