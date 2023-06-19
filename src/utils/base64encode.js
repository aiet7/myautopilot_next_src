import { Base64 } from "js-base64";

export const urlSafeBase64Encode = (rawContent) => {
  const base64 = Base64.encode(rawContent);
  return base64.replace("+", "-").replace("/", "_").replace(/=+$/, "");
};
