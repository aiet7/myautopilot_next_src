export const generateTitle = async (message) => {
  const url = `
  https://api.openai.com/v1/completions`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
  };
  const prompt = `Summarize the following message in 3-5 words: ${message}`;
  const body = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 15,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    const data = await response.json();
    const title =
      data.choices && data.choices.length > 0
        ? data.choices[0].text.trim()
        : "";
    return title;
  } catch (e) {
    console.log(e);
  }
  return "";
};
