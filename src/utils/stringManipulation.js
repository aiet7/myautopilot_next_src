export const trimQuotes = (string) => {
  if (string.startsWith('"') && string.endsWith('"')) {
    return string.slice(1, -1);
  }
  return string.replace(/"/g, "''");
};
