"use client";

import { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import { BsFillMicFill, BsFillStopFill, BsFillSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import { parseList } from "../../utils/detectContentType.js";
import { categories, subCategories } from "../../utils/ticketCreation.js";
import { convertKelvinToFahrenheit } from "../../utils/conversions.js";
import { recognition } from "../../utils/speechToText.js";

const ChatInteraction = ({
  initialUser,

  promptAssistantInput,
  openChatHistory,
  openChatAssistant,
  currentConversationIndex,
  conversationHistory,
  setConversationHistory,

  handleNewConversation,
}) => {
  const [previousResponseBodyForForms, setPreviousResponseBodyForForms] =
    useState(null);

  const [userInput, setUserInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [currentEmailId, setCurrentEmailId] = useState("");
  const [currentEmailSubject, setCurrentEmailSubject] = useState("");
  const [currentEmailBody, setCurrentEmailBody] = useState("");
  const [availableEmailIds, setAvailableEmailIds] = useState([]);

  const [currentContactGivenName, setCurrentContactGivenName] = useState("");
  const [currentContactSurname, setCurrentContactSurname] = useState("");
  const [currentContactEmailId, setCurrentContactEmailId] = useState("");
  const [currentContactMobileNumber, setCurrentContactMobileNumber] =
    useState("");
  const [currentTicketTitle, setCurrentTicketTitle] = useState("");
  const [currentTicketDescription, setCurrentTicketDescription] = useState("");
  const [currentTicketCategory, setCurrentTicketCategory] =
    useState(categories);
  const [currentTicketSubCategory, setCurrentTicketSubCategory] =
    useState(subCategories);
  const [currentTicketName, setCurrentTicketName] = useState("");
  const [currentTicketEmailId, setCurrentTicketEmailId] = useState("");
  const [currentTicketPhoneNumber, setCurrentTicketPhoneNumber] = useState("");

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [currentEventSubject, setCurrentEventSubject] = useState("");
  const [currentEventBody, setCurrentEventBody] = useState("");
  const [currentEventStartTime, setCurrentEventStartTime] = useState("");
  const [currentEventEndTime, setCurrentEventEndTime] = useState("");
  const [currentEventLocation, setCurrentEventLocation] = useState("");
  const [currentEventUserInfo, setCurrentEventUserInfo] = useState([
    { name: "", email: "" },
  ]);

  const handleAddMessageToDB = async (aiContent) => {
    const response = await fetch(
      /*`http://localhost:9019/addMessage`,*/
      `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: previousResponseBodyForForms.id,
          conversationID: previousResponseBodyForForms.conversationId,
          userContent: previousResponseBodyForForms.userContent,
          aiContent: aiContent,
          timeStamp: Date.now(),
          deleted: false,
          intents: previousResponseBodyForForms.intents,
          entities: previousResponseBodyForForms.entities,
        }),
      }
    );
    return response;
  };

  const handleSendUserMessage = async (message) => {
    let currentConversation;
    if (conversationHistory.length === 0) {
      currentConversation = await handleNewConversation(0);
    } else {
      currentConversation = conversationHistory[currentConversationIndex];
    }

    if (message.trim() !== "") {
      handleAddUserMessage(message);
      setIsWaiting(true);
      setUserInput("");
      setPreviousResponseBodyForForms(null);
      try {
        const encodedMessage = encodeURIComponent(message);

        const response = await fetch(
          /*`http://localhost:8081/jarvis4?text=${encodedMessage}&conversationId=${currentConversation.id}&userId=${initialUser.id}`*/
          /*`https://etech7-wf-etech7-worflow-2.azuremicroservices.io/send?message=${encodedMessage}`*/
          `https://etech7-wf-etech7-clu-service.azuremicroservices.io/jarvis4?text=${encodedMessage}&conversationId=${currentConversation.id}&userId=${initialUser.id}`
        );
        if (response.status === 200) {
          const responseBody = await response.json();

          setPreviousResponseBodyForForms({
            ...responseBody,
            conversationId: currentConversation.id,
            userContent: message,
          });
          handleProcessResponse(
            responseBody.intent,
            responseBody.mailEntities,
            responseBody.message /*responseBody.data*/,
            {
              ...responseBody,
              conversationId: currentConversation.id,
              userContent: message,
            }
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    }
  };

  const handleTriggerSpeech = () => {
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      handleSendUserMessage(speechResult);
      recognition.stop();
      setIsListening(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error);
      setIsListening(false);
    };

    setIsListening(true);
  };

  const handleEmailSelection = (email, emailIndex) => {
    setSelectedEmailIndex(emailIndex);
    setCurrentEmailId(email);
  };

  const handleEmailConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      setLoading(true);
      try {
        const encodedEmailId = encodeURIComponent(currentEmailId);
        const encodedSubject = encodeURIComponent(currentEmailSubject);
        const encodedBody = encodeURIComponent(currentEmailBody);

        const emailResponse = await fetch(
          /*`http://localhost:8082/graph?mailId=${encodedEmailId}&subject=${encodedSubject}&body=${encodedBody}`,*/
          `https://etech7-wf-etech7-mail-service.azuremicroservices.io/graph?mailId=${encodedEmailId}&subject=${encodedSubject}&body=${encodedBody}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (emailResponse.status === 200) {
          const aiContent = `Email Sent!\n\nTo: ${currentEmailId}\nSubject: ${currentEmailSubject}\nBody: ${currentEmailBody}`;
          const formSummaryResponse = await handleAddMessageToDB(aiContent);
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = `Email Cancelled.`;
      await handleAddMessageToDB(aiContent);
      handleAddAssistantMessage(aiContent);
      handleRemoveForm(formId);
    }
  };

  const handleContactConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      setLoading(true);
      try {
        const encodedContactGivenName = encodeURIComponent(
          currentContactGivenName
        );
        const encodedContactSurname = encodeURIComponent(currentContactSurname);

        const encodedContactEmailId = encodeURIComponent(currentContactEmailId);

        const encodedContactMobileNumber = encodeURIComponent(
          currentContactMobileNumber
        );
        const contactResponse = await fetch(
          /*`http://localhost:8082/addContact?givenName=${encodedContactGivenName}&surName=${encodedContactSurname}&emailId=${encodedContactEmailId}&mobileNumber=${encodedContactMobileNumber}`,*/
          `https://etech7-wf-etech7-mail-service.azuremicroservices.io/addContact?givenName=${encodedContactGivenName}&surName=${encodedContactSurname}&emailId=${encodedContactEmailId}&mobileNumber=${encodedContactMobileNumber}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (contactResponse.status === 200) {
          const aiContent = `Contact Added!\nGiven Name: ${currentContactGivenName}\nSurname: ${currentContactSurname}\nEmail: ${currentContactEmailId}\nMobile Number: ${currentContactMobileNumber}`;
          const formSummaryResponse = await handleAddMessageToDB(aiContent);
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Contact Adding Cancelled";
      await handleAddMessageToDB(aiContent);
      handleAddAssistantMessage(aiContent);
      handleRemoveForm(formId);
    }
  };

  const handleScheduleConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      setLoading(true);
      try {
        const scheduleResponse = await fetch(
          /*`http://localhost:8082/scheduleEvent`,*/
          `https://etech7-wf-etech7-mail-service.azuremicroservices.io/scheduleEvent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subject: currentEventSubject,
              body: currentEventBody,
              start: currentEventStartTime,
              end: currentEventEndTime,
              locationDisplayName: currentEventLocation,
              userInfo: currentEventUserInfo,
            }),
          }
        );
        if (scheduleResponse.status === 200) {
          const aiContent = `Event Scheduled!\nSubject: ${currentEventSubject}\nBody: ${currentEventBody}\nStart Time: ${currentEventStartTime}\nEnd Time: ${currentEventEndTime}\nLocation: ${currentEventLocation}\nName: ${currentEventUserInfo[0].name}\nEmail:${currentEventUserInfo[0].email}.`;
          const formSummaryResponse = await handleAddMessageToDB(aiContent);
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Scheduling Cancelled.";
      await handleAddMessageToDB(aiContent);
      handleAddAssistantMessage(aiContent);
      handleRemoveForm(formId);
    }
  };

  const handleTicketConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      setLoading(true);
      try {
        const ticketResponse = await fetch(
          /*`http://localhost:8084/createTicket`,*/
          `https://etech7-wf-etech7-support-service.azuremicroservices.io/createTicket`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: currentTicketTitle,
              description: currentTicketDescription,
              category: currentTicketCategory,
              subcategory: currentTicketSubCategory,
              name: currentTicketName,
              emailID: currentTicketEmailId,
              phoneNumber: currentTicketPhoneNumber,
            }),
          }
        );
        if (ticketResponse.status === 200) {
          const ticketResponseJson = await ticketResponse.json();
          const { id } = ticketResponseJson;
          const aiContent = `Ticket Created!\nID: ${id}\nTitle: ${currentTicketTitle}\nDescription: ${currentTicketDescription}\nCategory: ${currentTicketCategory}\nSubcategory: ${currentTicketSubCategory}\nName: ${currentTicketName}\nEmail: ${currentTicketEmailId}\nPhone: ${currentTicketPhoneNumber}.`;
          const formSummaryResponse = await handleAddMessageToDB(aiContent);
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Ticket Creation Cancelled.";
      await handleAddMessageToDB(aiContent);
      handleAddAssistantMessage(aiContent);
      handleRemoveForm(formId);
    }
  };

  const handleProcessResponse = (
    intent,
    mailEntities,
    message,
    responseBody
  ) => {
    switch (intent) {
      case "sendMail":
        handleEmailProcess(mailEntities);
        break;
      case "scheduleEvent":
        handleScheduleProcess(JSON.parse(message));
        break;
      case "createTicket":
        handleCreateTicketProcess(JSON.parse(message));
        break;
      case "addContact":
        handleAddContactProcess(JSON.parse(message));
        break;
      case "getEvents":
        handleGetEventsProcess(responseBody);
        break;
      case "getNews":
        handleGetNewsProcess(JSON.parse(message), responseBody);
        break;
      case "getStocks":
        handleGetStocksProcess(JSON.parse(message), responseBody);
        break;
      case "getWeather":
        handleGetWeatherProcess(JSON.parse(message), responseBody);
        break;
      default:
        handleDefaultActionProcess(message);
        break;
    }
  };

  const handleEmailProcess = (mailEntities) => {
    const { mailID, subject, body, emailIDs } = mailEntities;
    if (emailIDs && emailIDs.length !== 0) {
      
      handleAddForm("emailButtons + emailForm");
      setAvailableEmailIds(emailIDs);
      setCurrentEmailSubject(subject);
      setCurrentEmailBody(body);
    } else {
      handleAddForm("contactForm + emailForm");
      setCurrentContactEmailId(mailID);
      setCurrentEmailId(mailID);
      setCurrentEmailSubject(subject);
      setCurrentEmailBody(body);
    }
  };

  const handleScheduleProcess = (message) => {
    const { subject, body, start, end, locationDisplayName, userInfo } =
      message;
    handleAddForm("eventForm");
    setCurrentEventSubject(subject);
    setCurrentEventBody(body);
    setCurrentEventStartTime(start);
    setCurrentEventEndTime(end);
    setCurrentEventLocation(locationDisplayName);
    setCurrentEventUserInfo(userInfo);
  };

  const handleCreateTicketProcess = (message) => {
    const {
      title,
      description,
      category,
      subcategory,
      name,
      emailID,
      phoneNumber,
    } = message;
    handleAddForm("ticketForm");
    setCurrentTicketTitle(title);
    setCurrentTicketDescription(description);
    setCurrentTicketCategory(category);
    setCurrentTicketSubCategory(subcategory);
    setCurrentTicketName(name);
    setCurrentTicketEmailId(emailID);
    setCurrentTicketPhoneNumber(phoneNumber);
  };

  const handleAddContactProcess = (message) => {
    const { givenName, surName, emailId, mobileNumber } = message;
    handleAddForm("contactForm");
    setCurrentContactGivenName(givenName);
    setCurrentContactSurname(surName);
    setCurrentContactEmailId(emailId);
    setCurrentContactMobileNumber(mobileNumber);
  };

  const handleGetEventsProcess = async (responseBody) => {
    const getEventsRequest = await fetch(
      /*`http://localhost:8082/getEvents`*/
      `https://etech7-wf-etech7-mail-service.azuremicroservices.io/getEvents`
    );
    const getEventsResponse = await getEventsRequest.json();
    if (getEventsResponse.events.length > 0) {
      let eventCards = `<div class="flex flex-col gap-2">`;
      getEventsResponse.events.forEach((event) => {
        const {
          subject,
          start: { dateTime: startDateTime },
          end: { dateTime: endDateTime },
          webLink,
        } = event;
        const formattedStartDateTime = new Date(startDateTime).toLocaleString();
        const formattedEndDateTime = new Date(endDateTime).toLocaleString();

        eventCards += `<div class="flex flex-col">
          <div class="flex items-center">
            <h2>Subject:</h2>
            <p>${subject}</p>
          </div>
          <div class="flex items-center">
            <h2>Start Time: </h2>
            <p>${formattedStartDateTime}</p>
          </div>
          <div class="flex items-center">
            <h2>End Time: </h2>
            <p>${formattedEndDateTime}</p>
          </div>
          <div class="flex items-center">
            <a class="text-purple-800" href="${webLink}" target="_blank">Meeting Link</a>
          </div>
          </div>
        `;
      });

      eventCards += `</div>`;

      const eventResponse = await fetch(
        /*`http://localhost:9019/addMessage`,*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: responseBody.id,
            conversationID: responseBody.conversationId,
            userContent: responseBody.userContent,
            aiContent: eventCards,
            timeStamp: Date.now(),
            deleted: false,
            intents: responseBody.intents,
            entities: responseBody.entities,
          }),
        }
      );

      if (eventResponse.status === 200) {
        handleAddAssistantMessage(eventCards);
      }
    } else {
      const eventResponse = await fetch(
        /*`http://localhost:9019/addMessage`,*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: responseBody.id,
            conversationID: responseBody.conversationId,
            userContent: responseBody.userContent,
            aiContent: "No Events Scheduled",
            timeStamp: Date.now(),
            deleted: false,
            intents: responseBody.intents,
            entities: responseBody.entities,
          }),
        }
      );

      if (eventResponse.status === 200) {
        handleAddAssistantMessage("No Events Scheduled");
      }
    }
  };

  const handleGetNewsProcess = async (message, responseBody) => {
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

      const cardResponse = await fetch(
        /*`http://localhost:9019/addMessage`,*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: responseBody.id,
            conversationID: responseBody.conversationId,
            userContent: responseBody.userContent,
            aiContent: newsCards,
            timeStamp: Date.now(),
            deleted: false,
            intents: responseBody.intents,
            entities: responseBody.entities,
          }),
        }
      );

      if (cardResponse.status === 200) {
        handleAddAssistantMessage(newsCards);
      }
    }
  };

  const handleGetStocksProcess = async (message, responseBody) => {
    const c = message.c || "Current price not available";
    const d = message.d || "Absolute change not available";
    const dp = message.dp || "Percentage change not available";
    const h = message.h || "Highest price not available";
    const l = message.l || "Lowest price not available";
    const o = message.o || "Opening price not available";
    const pc = message.pc || "Closing price certificaties not available";
    const t = message.t || "Timestamp not available";
    let stockCards = "";
    stockCards += `
      <div class="dark:rounded-lg dark:shadow-lg dark:shadow-gray-500 flex flex-col items-center rounded-lg shadow-lg shadow-gray-500">
       <div class="flex flex-col py-4">
        <h2 class="text-4xl py-2">Stock Information</h2>
        <p><strong>Current Price</strong>: $${c.toFixed(2)}</p>
        <p><strong>Change</strong>: $${d.toFixed(2)} (${dp.toFixed(2)}%)</p>
        <p><strong>Highest Price Today</strong>: $${h.toFixed(2)}</p>
        <p><strong>Lowest Price Today</strong>: $${l.toFixed(2)}</p>
        <p><strong>Opening Price Today</strong>: $${o.toFixed(2)}</p>
        <p><strong>Previous Closing Price</strong>: $${pc.toFixed(2)}</p>
        <p><strong>Timestamp</strong>: ${new Date(
          t * 1000
        ).toLocaleString()}</p>
       </div>
      </div>
    `;

    const cardResponse = await fetch(
      /*`http://localhost:9019/addMessage`,*/
      `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: responseBody.id,
          conversationID: responseBody.conversationId,
          userContent: responseBody.userContent,
          aiContent: stockCards,
          timeStamp: Date.now(),
          deleted: false,
          intents: responseBody.intents,
          entities: responseBody.entities,
        }),
      }
    );
    if (cardResponse.status === 200) {
      handleAddAssistantMessage(stockCards);
    }
  };

  const handleGetWeatherProcess = async (message, responseBody) => {
    const { main, weather } = message;
    if (main && weather.length > 0) {
      const temp =
        convertKelvinToFahrenheit(main.temp) || "Temperature not available";
      const category = weather[0].main || "Category not available";
      const temp_max =
        convertKelvinToFahrenheit(main.temp_max) || "High not available";
      const temp_min =
        convertKelvinToFahrenheit(main.temp_min) || "Low not available";
      let weatherCards = `
      <div class="dark:rounded-lg dark:shadow-lg dark:shadow-gray-500 flex justify-between items-center px-6 py-2 rounded-lg shadow-lg shadow-gray-500">
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

      const weatherResponse = await fetch(
        /*`http://localhost:9019/addMessage`,*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: responseBody.id,
            conversationID: responseBody.conversationId,
            userContent: responseBody.userContent,
            aiContent: weatherCards,
            timeStamp: Date.now(),
            deleted: false,
            intents: responseBody.intents,
            entities: responseBody.entities,
          }),
        }
      );

      if (weatherResponse.status === 200) {
        handleAddAssistantMessage(weatherCards);
      }
    }
  };

  const handleDefaultActionProcess = (message) => {
    handleAddAssistantMessage(message);
  };

  const handleAddUserMessage = async (message) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];

      if (!newConversationHistory[currentConversationIndex].messages) {
        newConversationHistory[currentConversationIndex].messages = [];
      }

      newConversationHistory[currentConversationIndex].messages.push({
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      });

      return newConversationHistory;
    });
  };

  const handleAddAssistantMessage = (message) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];

      if (!newConversationHistory[currentConversationIndex].messages) {
        newConversationHistory[currentConversationIndex].messages = [];
      }

      newConversationHistory[currentConversationIndex].messages.push({
        id: Date.now() + "-ai",
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      });

      return newConversationHistory;
    });
  };

  const handleAddForm = (formType) => {
    const formId = Date.now();
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];

      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = {
          messages: [],
        };
      }

      newConversationHistory[currentConversationIndex].messages.push({
        id: formId,
        type: "form",
        formType,
      });

      return newConversationHistory;
    });
  };

  const handleRemoveForm = (formId) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];

      newConversationHistory[currentConversationIndex].messages =
        newConversationHistory[currentConversationIndex].messages.filter(
          (message) => message.id !== formId
        );

      return newConversationHistory;
    });
  };

  useEffect(() => {
    const filtered = subCategories.filter(
      (subCategory) => subCategory.category === currentTicketCategory
    );
    setFilteredSubCategories(filtered);
  }, [currentTicketCategory, subCategories]);

  useEffect(() => {
    setUserInput(promptAssistantInput);
  }, [promptAssistantInput]);

  return (
    <div
      className={`flex flex-col h-full w-full  ${
        (openChatHistory && "md:opacity-100 opacity-5") ||
        (openChatAssistant && "md:opacity-100 opacity-5")
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      <div className=" flex-grow overflow-auto no-scrollbar ">
        {conversationHistory[currentConversationIndex]?.messages?.map(
          (item, index) => {
            return (
              <div
                key={item.id}
                className={`px-4 py-4 text-md w-full  ${
                  item.role === "user"
                    ? "dark:border-white/40 bg-black/5 border-b"
                    : "dark:bg-white/10 dark:border-white/40 border-b"
                }`}
              >
                <div className="flex items-start max-w-[800px] mx-auto gap-4">
                  <span>
                    {item.role === "user" ? (
                      <AiOutlineUser size={20} />
                    ) : (
                      <AiOutlineRobot size={20} />
                    )}
                  </span>

                  <div className="flex-grow">
                    {(() => {
                      switch (item.type) {
                        case "form":
                          switch (item.formType) {
                            case "emailButtons + emailForm":
                              return (
                                <div className="flex flex-col gap-6">
                                  <p>Please select an email address.</p>
                                  <div className="flex gap-2">
                                    {availableEmailIds.map((email, index) => (
                                      <button
                                        key={index}
                                        onClick={() =>
                                          handleEmailSelection(email, index)
                                        }
                                        className={`${
                                          selectedEmailIndex === index
                                            ? "bg-blue-900"
                                            : "bg-gray-500"
                                        }  text-white px-4 py-2 rounded-md`}
                                      >
                                        {email}
                                      </button>
                                    ))}
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-bold">Email</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEmailId}
                                        onChange={(e) =>
                                          setCurrentEmailId(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Subject</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEmailSubject}
                                        onChange={(e) =>
                                          setCurrentEmailSubject(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Body</span>
                                      <textarea
                                        className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
                                        value={currentEmailBody}
                                        onChange={(e) =>
                                          setCurrentEmailBody(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="bg-green-300 rounded-md px-3 py-2 text-white"
                                      disabled={loading}
                                      onClick={() => {
                                        handleEmailConfirmation(true, item.id);
                                      }}
                                    >
                                      {loading ? "Sending..." : "Send Email"}
                                    </button>
                                    <button
                                      className="bg-red-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => {
                                        handleEmailConfirmation(false, item.id);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-blue-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => handleToggleForm(item.id)}
                                    >
                                      Hide form
                                    </button>
                                  </div>
                                </div>
                              );

                            case "contactForm + emailForm":
                              return (
                                <div className="flex flex-col gap-6">
                                  <p>
                                    Would you like to add this email to your
                                    contacts?.
                                  </p>

                                  <div>
                                    <div>
                                      <span className="font-bold">
                                        First Name
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentContactGivenName}
                                        onChange={(e) =>
                                          setCurrentContactGivenName(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Last Name
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentContactSurname}
                                        onChange={(e) =>
                                          setCurrentContactSurname(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Email</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4 "
                                        value={currentEmailId}
                                        onChange={(e) =>
                                          setCurrentEmailId(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Phone Number
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4 "
                                        value={currentContactMobileNumber}
                                        onChange={(e) =>
                                          setCurrentContactMobileNumber(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="bg-green-300 rounded-md px-3 py-2 text-white"
                                      disabled={loading}
                                      onClick={() =>
                                        handleContactConfirmation(true)
                                      }
                                    >
                                      {loading ? "Adding..." : "Add Contact"}
                                    </button>
                                  </div>
                                  <div>
                                    <div>
                                      <span className="font-bold">Email</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEmailId}
                                        onChange={(e) =>
                                          setCurrentEmailId(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Subject</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEmailSubject}
                                        onChange={(e) =>
                                          setCurrentEmailSubject(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Body</span>
                                      <textarea
                                        className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
                                        value={currentEmailBody}
                                        onChange={(e) =>
                                          setCurrentEmailBody(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="bg-green-300 rounded-md px-3 py-2 text-white"
                                      disabled={loading}
                                      onClick={() => {
                                        handleEmailConfirmation(true, item.id);
                                      }}
                                    >
                                      {loading ? "Sending..." : "Send Email"}
                                    </button>
                                    <button
                                      className="bg-red-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => {
                                        handleEmailConfirmation(false, item.id);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-blue-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => handleToggleForm(item.id)}
                                    >
                                      Hide form
                                    </button>
                                  </div>
                                </div>
                              );
                            case "contactForm":
                              return (
                                <div className="flex flex-col gap-6">
                                  <p>Add email to contact.</p>
                                  <div>
                                    <div>
                                      <span className="font-bold">
                                        First Name
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentContactGivenName}
                                        onChange={(e) =>
                                          setCurrentContactGivenName(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Last Name
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentContactSurname}
                                        onChange={(e) =>
                                          setCurrentContactSurname(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Email</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4 "
                                        value={currentContactEmailId}
                                        onChange={(e) =>
                                          setCurrentContactEmailId(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Phone Number
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4 "
                                        value={currentContactMobileNumber}
                                        onChange={(e) =>
                                          setCurrentContactMobileNumber(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="bg-green-300 rounded-md px-3 py-2 text-white"
                                      disabled={loading}
                                      onClick={() =>
                                        handleContactConfirmation(true, item.id)
                                      }
                                    >
                                      {loading ? "Adding..." : "Add Contact"}
                                    </button>
                                    <button
                                      className="bg-red-300 rounded-md px-3 py-2 text-white"
                                      onClick={() =>
                                        handleContactConfirmation(
                                          false,
                                          item.id
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-blue-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => handleToggleForm(item.id)}
                                    >
                                      Hide form
                                    </button>
                                  </div>
                                </div>
                              );
                            case "ticketForm":
                              return (
                                <div className="flex flex-col gap-6">
                                  <div>
                                    <div>
                                      <span className="font-bold">
                                        Ticket Name
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentTicketTitle}
                                        onChange={(e) =>
                                          setCurrentTicketTitle(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Description
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentTicketDescription}
                                        onChange={(e) =>
                                          setCurrentTicketDescription(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Category
                                      </span>

                                      <select
                                        value={currentTicketCategory}
                                        onChange={(e) =>
                                          setCurrentTicketCategory(
                                            e.target.value
                                          )
                                        }
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                      >
                                        <option value="">
                                          Select a category
                                        </option>
                                        {categories.map((category, index) => (
                                          <option
                                            key={index}
                                            value={category.id}
                                          >
                                            {category.title}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Subcategory
                                      </span>
                                      <select
                                        value={currentTicketSubCategory}
                                        onChange={(e) =>
                                          setCurrentTicketSubCategory(
                                            e.target.value
                                          )
                                        }
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                      >
                                        <option value="">
                                          Select a subcategory
                                        </option>
                                        {filteredSubCategories.map(
                                          (subCategory, index) => (
                                            <option
                                              key={index}
                                              value={subCategory.id}
                                            >
                                              {subCategory.title}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                    <div>
                                      <span className="font-bold">Name</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentTicketName}
                                        onChange={(e) =>
                                          setCurrentTicketName(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Email</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentTicketEmailId}
                                        onChange={(e) =>
                                          setCurrentTicketEmailId(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Phone Number
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentTicketPhoneNumber}
                                        onChange={(e) =>
                                          setCurrentTicketPhoneNumber(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="bg-green-300 rounded-md px-3 py-2 text-white"
                                      disabled={loading}
                                      onClick={() => {
                                        handleTicketConfirmation(true, item.id);
                                      }}
                                    >
                                      {loading
                                        ? "Creating..."
                                        : "Create Ticket"}
                                    </button>
                                    <button
                                      className="bg-red-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => {
                                        handleTicketConfirmation(
                                          false,
                                          item.id
                                        );
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-blue-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => handleToggleForm(item.id)}
                                    >
                                      Hide form
                                    </button>
                                  </div>
                                </div>
                              );
                            case "eventForm":
                              return (
                                <div className="flex flex-col gap-6">
                                  <div>
                                    <div>
                                      <span className="font-bold">Subject</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEventSubject}
                                        onChange={(e) =>
                                          setCurrentEventSubject(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Body</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEventBody}
                                        onChange={(e) =>
                                          setCurrentEventBody(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Start Time
                                      </span>
                                      <input
                                        type="datetime-local"
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEventStartTime}
                                        onChange={(e) =>
                                          setCurrentEventStartTime(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        End Time
                                      </span>
                                      <input
                                        type="datetime-local"
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEventEndTime}
                                        onChange={(e) =>
                                          setCurrentEventEndTime(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        Location
                                      </span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={currentEventLocation}
                                        onChange={(e) =>
                                          setCurrentEventLocation(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Name</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={
                                          currentEventUserInfo[0]?.name || ""
                                        }
                                        onChange={(e) =>
                                          setCurrentEventUserInfo([
                                            {
                                              ...currentEventUserInfo[0],
                                              name: e.target.value,
                                            },
                                          ])
                                        }
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold">Email</span>
                                      <input
                                        className="h-[50px] border outline-blue-500 w-full px-4"
                                        value={
                                          currentEventUserInfo[0]?.email || ""
                                        }
                                        onChange={(e) =>
                                          setCurrentEventUserInfo([
                                            {
                                              ...currentEventUserInfo[0],
                                              email: e.target.value,
                                            },
                                          ])
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      className="bg-green-300 rounded-md px-3 py-2 text-white"
                                      disabled={loading}
                                      onClick={() => {
                                        handleScheduleConfirmation(
                                          true,
                                          item.id
                                        );
                                      }}
                                    >
                                      {loading
                                        ? "Scheduling..."
                                        : "Schedule Event"}
                                    </button>
                                    <button
                                      className="bg-red-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => {
                                        handleScheduleConfirmation(
                                          false,
                                          item.id
                                        );
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-blue-300 rounded-md px-3 py-2 text-white"
                                      onClick={() => handleToggleForm(item.id)}
                                    >
                                      Hide form
                                    </button>
                                  </div>
                                </div>
                              );

                            default:
                              return null;
                          }
                        default:
                          return parseList(item.content);
                      }
                    })()}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="px-4 py-2 ">
        <FaSpinner
          className={`${isWaiting ? "opacity-100" : "opacity-0"} animate-spin`}
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-2">
        <input
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendUserMessage(userInput);
            }
          }}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="dark:bg-black bg-white border outline-blue-500 w-full px-4 h-[50px] "
        />
        <BsFillSendFill
          size={25}
          onClick={() => handleSendUserMessage(userInput)}
          className="cursor-pointer"
        />
        <BsFillMicFill
          onClick={handleTriggerSpeech}
          className={`${isListening ? "text-blue-500" : null} cursor-pointer`}
          size={25}
        />
        <BsFillStopFill size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatInteraction;
