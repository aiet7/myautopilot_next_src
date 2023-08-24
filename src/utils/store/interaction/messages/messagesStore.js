import { create } from "zustand";
import useInteractionStore from "../interactionsStore";
import useConversationStore from "../conversations/conversationsStore";
import { convertKelvinToFahrenheit } from "@/utils/conversions";

const useMessagesStore = create((set, get) => ({
  handleGetEventsProcess: async (responseBody) => {
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();

    const { events } = responseBody;

    if (events.length > 0) {
      let eventCards = `<div class="flex flex-col gap-3">`;
      events.forEach((event) => {
        const { summary, description, start, end } = event;
        const formattedStartDateTime = new Date(start).toLocaleString();
        const formattedEndDateTime = new Date(end).toLocaleString();

        eventCards += `<div class="flex flex-col">
              <div class="flex items-center">
                <h2>Summary: </h2>
                <p>${summary}</p>
              </div>
              <div class="flex items-center">
                <h2>Description: </h2>
                <p>${description || "No Description"}</p>
              </div>
              <div class="flex items-center">
                <h2>Start Time: </h2>
                <p>${formattedStartDateTime}</p>
              </div>
              <div class="flex items-center">
                <h2>End Time: </h2>
                <p>${formattedEndDateTime}</p>
              </div>
              </div>
            `;
      });

      eventCards += `</div>`;
      try {
        const eventResponse = await handleAddMessageToDB(
          eventCards,
          responseBody
        );

        if (eventResponse.status === 200) {
          handleAddAssistantMessage(eventCards, null);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const eventResponse = await handleAddMessageToDB(
          "No Events Scheduled",
          responseBody
        );

        if (eventResponse.status === 200) {
          handleAddAssistantMessage("No Events Scheduled", null);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleGetTasksProcess: async (responseBody) => {
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();

    const { tasks } = responseBody;

    if (tasks.length > 0) {
      let taskCards = `<div class="flex flex-col gap-2">`;
      tasks.forEach((task, index) => {
        const { taskName } = task;
        taskCards += `<div class="flex flex-col">
                <h2 class="font-bold">Task ${index + 1}</h2>
                <p>${taskName}</p>
                </div>
            `;
      });
      taskCards += `</div>`;

      try {
        const taskResponse = await handleAddMessageToDB(
          taskCards,
          responseBody
        );

        if (taskResponse.status === 200) {
          handleAddAssistantMessage(taskCards, null);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const taskResponse = await handleAddMessageToDB(
          "No Tasks",
          responseBody
        );

        if (taskResponse.status === 200) {
          handleAddAssistantMessage("No Tasks", null);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  handleGetNewsProcess: async (message, responseBody) => {
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();

    const { articles } = message;
    if (articles.length > 0) {
      let newsCards = `<div class="flex flex-col gap-2">`;
      articles.forEach((article) => {
        const description = article.description || "Description not available";
        const title = article.title || "Title not available";
        const url = article.url || "#";
        const urlToImage = article.urlToImage || "/image_not_available.png";
        const publishedAt = article.publishedAt;
        const formattedPublishedAt = new Date(publishedAt).toLocaleString();

        newsCards += `<div class="dark:rounded-lg dark:shadow-lg dark:shadow-gray-500 flex items-start rounded-lg shadow-lg shadow-gray-500">
            <img class="w-48 h-32 object-cover flex-shrink-0" src="${urlToImage}" alt="Article image"/>
            <div class="flex flex-col p-2">
              <div class="font-bold line-clamp-1">${title}</div>
              <div class="text-xs text-gray-500">${formattedPublishedAt}</div>
              <div class="dark:text-gray-300 text-gray-500 line-clamp-2">${description}</div>
              <div class="text-blue-500 underline"><a href="${url}" target="_blank">Read more</a></div>
            </div>
          </div>`;
      });
      newsCards += `</div>`;

      try {
        const newsResponse = await handleAddMessageToDB(
          newsCards,
          responseBody
        );

        if (newsResponse.status === 200) {
          handleAddAssistantMessage(newsCards, null);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const newsResponse = await handleAddMessageToDB(
          "No News Available",
          responseBody
        );

        if (newsResponse.status === 200) {
          handleAddAssistantMessage("No News Available", null);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleGetStocksProcess: async (message, responseBody) => {
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();

    const c = message.c.toFixed(2) || "Current price not available";
    const d = message.d.toFixed(2) || "Absolute change not available";
    const dp = message.dp.toFixed(2) || "Percentage change not available";
    const h = message.h.toFixed(2) || "Highest price not available";
    const l = message.l.toFixed(2) || "Lowest price not available";
    const o = message.o.toFixed(2) || "Opening price not available";
    const pc =
      message.pc.toFixed(2) || "Closing price certificaties not available";
    const t =
      new Date(message.t * 1000).toLocaleString() || "Timestamp not available";
    let stockCards = "";
    stockCards += `<div class="dark:rounded-lg dark:shadow-lg dark:shadow-gray-500 flex flex-col items-center rounded-lg shadow-lg shadow-gray-500">
           <div class="flex flex-col py-4">
            <h2 class="text-4xl py-2">Stock Information</h2>
            <p><strong>Current Price</strong>: $${c}</p>
            <p><strong>Change</strong>: $${d} (${dp}%)</p>
            <p><strong>Highest Price Today</strong>: $${h}</p>
            <p><strong>Lowest Price Today</strong>: $${l}</p>
            <p><strong>Opening Price Today</strong>: $${o}</p>
            <p><strong>Previous Closing Price</strong>: $${pc}</p>
            <p><strong>Timestamp</strong>: ${t}</p>
           </div>
          </div>
        `;
    try {
      const stockResponse = await handleAddMessageToDB(
        stockCards,
        responseBody
      );

      if (stockResponse.status === 200) {
        handleAddAssistantMessage(stockCards, null);
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetWeatherProcess: async (message, responseBody) => {
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();

    const { main, weather } = message;
    if (main && weather.length > 0) {
      const temp =
        convertKelvinToFahrenheit(main.temp) || "Temperature not available";
      const category = weather[0].main || "Category not available";
      const temp_max =
        convertKelvinToFahrenheit(main.temp_max) || "High not available";
      const temp_min =
        convertKelvinToFahrenheit(main.temp_min) || "Low not available";
      let weatherCards = `<div class="dark:rounded-lg dark:shadow-lg dark:shadow-gray-500 flex justify-between items-center px-6 py-2 rounded-lg shadow-lg shadow-gray-500">
            <div class="flex flex-col">
              <div class="self-start text-9xl">${temp}</div>
              <div class="self-start">${category}</div>
              <div class="self-start flex gap-2">
                <div>High ${temp_max}</div>
                <div>Low ${temp_min}</div>
              </div>
            </div>
            <img class="w-38 h-28 flex-shrink-0 object-cover" src="/cloudy.png" alt="cloudy"/>
          </div>
          `;

      try {
        const weatherResponse = await handleAddMessageToDB(
          weatherCards,
          responseBody
        );
        if (weatherResponse.status === 200) {
          handleAddAssistantMessage(weatherCards, null);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const weatherResponse = await handleAddMessageToDB(
          "No Weather Available",
          responseBody
        );

        if (weatherResponse.status === 200) {
          handleAddAssistantMessage("No Weather Available", null);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleDefaultActionProcess: async (message, responseBody) => {
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();

    if (message.data && message.data[0].url) {
      const imageUrl = message.data[0].url;
      const markDownImage = `![Generated Image](${imageUrl})`;
      const openLink = `[Open Image](${imageUrl})`;

      try {
        const imageResponse = await handleAddMessageToDB(
          `${openLink}`,
          responseBody
        );
        if (imageResponse.status === 200) {
          handleAddAssistantMessage(`${markDownImage}`, null);
        } else {
          try {
            const imageResponse = await handleAddMessageToDB(
              "No Image Generated",
              responseBody
            );

            if (imageResponse.status === 200) {
              handleAddAssistantMessage("No Image Generated", null);
            }
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      handleAddAssistantMessage(message, null);
    }
  },
}));

export default useMessagesStore;
