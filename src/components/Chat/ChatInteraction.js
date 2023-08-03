"use client";

import { useState, useEffect, useRef } from "react";


import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import {
  BsFillMicFill,
  BsFillStopFill,
  BsFillSendFill,
  BsImageFill,
} from "react-icons/bs";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

import { categories, subCategories } from "../../utils/ticketCreation.js";
import { convertKelvinToFahrenheit } from "../../utils/conversions.js";
import { recognition } from "../../utils/speechToText.js";
import { trimQuotes } from "../../utils/stringManipulation.js";
import {
  handleSendGmail,
  handlegetTokenRemainingValidity,
} from "../../utils/api/google.js";
import { handleSendGraphMail } from "../../utils/api/microsoft.js";

import Cookies from "js-cookie";

import Switch from "../Forms/Switch.js";

const ChatInteraction = ({
  activeTab,
  initialUser,
  selectedAgent,
  promptAssistantInput,
  openChatHistory,
  openChatAssistant,
  currentConversationIndices,
  conversationHistories,
  setConversationHistories,
  handleNewConversation,
  handleOpenChatHistory,
  handleOpenChatAssistant,
}) => {
  const token =
    Cookies.get("microsoft_session_token") || Cookies.get("session_token");

  const latestMessageRef = useRef(null);
  const chatContainerRef = useRef(null);
  const controllerRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(null);

  const [previousResponseBodyForForms, setPreviousResponseBodyForForms] =
    useState({});

  const [userInput, setUserInput] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("24px");

  const [isWaiting, setIsWaiting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState({});

  const [loading, setLoading] = useState({
    contactForm: false,
    emailForm: false,
    eventForm: false,
    ticketForm: false,
    taskForm: false,
  });
  const [feedback, setFeedback] = useState({});


  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);

  const [currentEmailId, setCurrentEmailId] = useState("");
  const [currentEmailSubject, setCurrentEmailSubject] = useState("");
  const [currentEmailBody, setCurrentEmailBody] = useState("");
  const [availableEmailIds, setAvailableEmailIds] = useState([]);

  const [currentContactGivenName, setCurrentContactGivenName] = useState("");
  const [currentContactFamilyName, setCurrentContactFamilyName] = useState("");
  const [currentContactEmailIds, setCurrentContactEmailIds] = useState([]);
  const [currentContactMobileNumber, setCurrentContactMobileNumber] =
    useState("");

  const [currentTicketTitle, setCurrentTicketTitle] = useState("");
  const [currentTicketDescription, setCurrentTicketDescription] = useState("");
  const [currentTicketCategory, setCurrentTicketCategory] = useState("");
  const [currentTicketSubCategory, setCurrentTicketSubCategory] = useState("");
  const [currentTicketName, setCurrentTicketName] = useState("");
  const [currentTicketEmailId, setCurrentTicketEmailId] = useState("");
  const [currentTicketPhoneNumber, setCurrentTicketPhoneNumber] = useState("");

  const [currentTicketNewFirstName, setCurrentTicketNewFirstName] =
    useState("");
  const [currentTicketNewLastName, setCurrentTicketNewLastName] = useState("");

  const [currentTicketNewEmailId, setCurrentTicketNewEmailId] = useState("");
  const [currentTicketNewPhoneNumber, setCurrentTicketNewPhoneNumber] =
    useState("");
  const [currentTicketLicenseId, setCurrentTicketLicenseId] = useState("");

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [currentEventSummary, setCurrentEventSummary] = useState("");
  const [currentEventDescription, setCurrentEventDescription] = useState("");
  const [currentEventStartTime, setCurrentEventStartTime] = useState("");
  const [currentEventEndTime, setCurrentEventEndTime] = useState("");

  const [currentTaskName, setCurrentTaskName] = useState("");

  const handleGetConversationId = () => {
    const conversationId =
      conversationHistories[selectedAgent]?.[
        currentConversationIndices[selectedAgent]
      ]?.id;
    return previousResponseBodyForForms[conversationId];
  };

  const handleIfConversationExists = async () => {
    if (!(selectedAgent in conversationHistories)) {
      conversationHistories[selectedAgent] = [];
    }

    let currentConversation =
      conversationHistories[selectedAgent][
        currentConversationIndices[selectedAgent]
      ];

    if (!currentConversation) {
      return new Promise(async (resolve) => {
        const conversationCount = conversationHistories[selectedAgent].length;
        const newConversation = await handleNewConversation(conversationCount);
        setConversationHistories((prevState) => {
          const newConversations = { ...prevState };
          const currentAgentConversations = newConversations[selectedAgent];
          currentAgentConversations[currentConversationIndices[selectedAgent]] =
            newConversation;
          resolve(newConversation);
          return newConversations;
        });
      });
    }

    return currentConversation;
  };

  const handleAddMessageToDB = async (aiContent, body) => {
    const response = await fetch(
      `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: body.id,
          conversationID: body.conversationId,
          userContent: body.userContent,
          aiContent: aiContent,
          timeStamp: Date.now(),
          deleted: false,
          intents: body.intents,
          entities: body.entities,
        }),
      }
    );
    return response;
  };

  const handleSubmitFeedback = async (messageId, feedback) => {
    try {
      const cleanedMessageId = messageId.replace(
        /-ai-(emailForm|contactForm|ticketForm|eventForm|taskForm)$/,
        ""
      );
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateFeedback?messageId=${cleanedMessageId}&feedback=${feedback}`
      );
      if (response.status === 200) {
        setIsFeedbackSubmitted(true);
        setFeedback((prevState) => ({ ...prevState, [messageId]: feedback }));
        setTimeout(() => {
          setIsFeedbackSubmitted(false);
        }, 2000);
      } else {
        console.log("feedback failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAbortRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      handleAddAssistantMessage(
        "Stopped generating.  Request may still be fullfilled."
      );
    }
  };

  const handleImageGenerator = async (message) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    let currentConversation = await handleIfConversationExists();

    if (message.trim() !== "") {
      inputRef.current.focus();
      handleAddUserMessage(message);
      setIsWaiting(true);
      setIsServerError(false);
      setUserInput("");

      try {
        const encodedMessage = encodeURIComponent(trimQuotes(message));
        const response = await fetch(
          `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/image?message=${encodedMessage}&conversationId=${currentConversation.id}&userId=${initialUser.id}`,
          {
            signal: controllerRef.current.signal,
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = responseBody.id;
          handleProcessResponse(
            responseBody.intent,
            null,
            JSON.parse(responseBody.message),
            {
              ...responseBody,
              conversationId: currentConversation.id,
              userContent: message,
            }
          );
        } else if (response.status === 500) {
          setIsServerError(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    }
  };

  const handleSendUserMessage = async (message) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    let currentConversation = await handleIfConversationExists();

    if (message.trim() !== "") {
      inputRef.current.focus();

      handleAddUserMessage(message);
      setIsWaiting(true);
      setIsServerError(false);
      setUserInput("");

      try {
        const encodedMessage = encodeURIComponent(trimQuotes(message));
        const response = await fetch(
          `https://etech7-wf-etech7-clu-service.azuremicroservices.io/jarvis4?text=${encodedMessage}&conversationId=${
            currentConversation.id
          }&userId=${initialUser.id}${token ? `&mToken=${token}` : ""}`,
          {
            signal: controllerRef.current.signal,
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = responseBody.id;
          setPreviousResponseBodyForForms((prevState) => ({
            ...prevState,
            [currentConversation.id]: {
              ...responseBody,
              conversationId: currentConversation.id,
              userContent: message,
            },
          }));
          handleProcessResponse(
            responseBody.intent,
            responseBody.mailEntities,
            responseBody.message,
            {
              ...responseBody,
              conversationId: currentConversation.id,
              userContent: message,
            }
          );
        } else if (response.status === 500) {
          setIsServerError(true);
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
    const previousResponseBodyForConversation = handleGetConversationId();
    if (isConfirmed) {
      setLoading((prevState) => ({ ...prevState, emailForm: true }));
      try {
        const remainingValidity = handlegetTokenRemainingValidity(
          initialUser.expiryTime
        );
        const aiContent = `Email Sent!\n\nTo: ${currentEmailId}\nSubject: ${currentEmailSubject}\nBody: ${currentEmailBody}`;
        const formSummaryResponse = await handleAddMessageToDB(
          aiContent,
          previousResponseBodyForConversation
        );
        if (formSummaryResponse.status === 200) {
          let providerResponse;
          let tokenToSend = initialUser.accessToken;
          if (Cookies.get("Secure-next.session-token-g")) {
            if (remainingValidity <= 60) {
              const newTokenResponse = await fetch(
                `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleRefreshToken?userId=${initialUser.id}`
              );
              const newToken = await newTokenResponse.json();
              tokenToSend = newToken.access_token;
            }
            providerResponse = await handleSendGmail(
              tokenToSend,
              currentEmailId,
              currentEmailSubject,
              currentEmailBody
            );
          } else if (Cookies.get("microsoft_session_token")) {
            providerResponse = await handleSendGraphMail(
              token,
              currentEmailId,
              currentEmailSubject,
              currentEmailBody
            );
          } else {
            console.log("Activate provider in settings.");
          }
          if (
            providerResponse.status === 200 ||
            providerResponse.status === 202
          ) {
            handleAddAssistantMessage(aiContent, "emailForm");
          } else {
            setIsServerError(true);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading((prevState) => ({ ...prevState, emailForm: false }));
        setIsFormOpen((prevState) => ({
          ...prevState,
          [previousResponseBodyForConversation.conversationId]: false,
        }));

        handleRemoveForm(formId);
      }
    } else {
      const aiContent = `Email Cancelled.`;
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      setIsFormOpen((prevState) => ({
        ...prevState,
        [previousResponseBodyForConversation.conversationId]: false,
      }));

      handleAddAssistantMessage(aiContent, "emailForm");
      handleRemoveForm(formId);
    }
  };

  const handleContactConfirmation = async (isConfirmed, formId) => {
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      setLoading((prevState) => ({ ...prevState, contactForm: true }));
      try {
        const remainingValidity = handlegetTokenRemainingValidity(
          initialUser.expiryTime
        );
        const aiContent = `Contact Added!\n\nName: ${currentContactGivenName} ${currentContactFamilyName}\nEmail: ${
          currentContactEmailIds[0] || currentEmailId
        }\nMobile Number: ${currentContactMobileNumber}`;
        const formSummaryResponse = await handleAddMessageToDB(
          aiContent,
          previousResponseBodyForConversation
        );

        if (formSummaryResponse.status === 200) {
          let providerResponse;
          let tokenToSend = initialUser.accessToken;
          if (Cookies.get("Secure-next.session-token-g")) {
            if (remainingValidity <= 60) {
              const newTokenResponse = await fetch(
                `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleRefreshToken?userId=${initialUser.id}`
              );
              const newToken = await newTokenResponse.json();
              tokenToSend = newToken.access_token;
            }
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addGContacts?token=${tokenToSend}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  givenName: currentContactGivenName,
                  familyName: currentContactFamilyName,
                  emailAddresses: currentContactEmailIds[0]
                    ? currentContactEmailIds
                    : [currentEmailId],
                  mobileNumber: currentContactMobileNumber,
                }),
              }
            );
          } else if (Cookies.get("microsoft_session_token")) {
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addMContacts?token=${token}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  givenName: currentContactGivenName,
                  familyName: currentContactFamilyName,
                  emailAddresses: currentContactEmailIds[0]
                    ? currentContactEmailIds
                    : [currentEmailId],
                  mobileNumber: currentContactMobileNumber,
                }),
              }
            );
          } else {
            console.log("Activate provider in settings.");
          }

          if (
            providerResponse.status === 200 ||
            providerResponse.status === 202
          ) {
            handleAddAssistantMessage(aiContent, "contactForm");
          } else {
            setIsServerError(true);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsFormOpen((prevState) => ({
          ...prevState,
          [previousResponseBodyForConversation.conversationId]: false,
        }));

        setLoading((prevState) => ({ ...prevState, contactForm: false }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Contact Adding Cancelled";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      setIsFormOpen((prevState) => ({
        ...prevState,
        [previousResponseBodyForConversation.conversationId]: false,
      }));

      handleAddAssistantMessage(aiContent, "contactForm");
      handleRemoveForm(formId);
    }
  };

  const handleScheduleConfirmation = async (isConfirmed, formId) => {
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      setLoading((prevState) => ({ ...prevState, eventForm: true }));
      try {
        const remainingValidity = handlegetTokenRemainingValidity(
          initialUser.expiryTime
        );
        const aiContent = `Event Scheduled!\nSummary: ${currentEventSummary}\nDescription: ${currentEventDescription}\nStart Time: ${new Date(
          currentEventStartTime
        ).toLocaleString()}\nEnd Time: ${new Date(
          currentEventEndTime
        ).toLocaleString()}`;
        const formSummaryResponse = await handleAddMessageToDB(
          aiContent,
          previousResponseBodyForConversation
        );
        if (formSummaryResponse.status === 200) {
          let providerResponse;
          let tokenToSend = initialUser.accessToken;
          if (Cookies.get("Secure-next.session-token-g")) {
            if (remainingValidity <= 60) {
              const newTokenResponse = await fetch(
                `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleRefreshToken?userId=${initialUser.id}`
              );
              const newToken = await newTokenResponse.json();
              tokenToSend = newToken.access_token;
            }
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addGEvents?token=${tokenToSend}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  summary: currentEventSummary,
                  description: currentEventDescription,
                  start: currentEventStartTime + ":00",
                  end: currentEventEndTime + ":00",
                }),
              }
            );
          } else if (Cookies.get("microsoft_session_token")) {
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addMEvents?token=${token}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ummary: currentEventSummary,
                  description: currentEventDescription,
                  start: currentEventStartTime + ":00",
                  end: currentEventEndTime + ":00",
                }),
              }
            );
          } else {
            console.log("Activate provider in settings.");
          }

          if (
            providerResponse.status === 200 ||
            providerResponse.status === 202
          ) {
            handleAddAssistantMessage(aiContent, "eventForm");
          } else {
            setIsServerError(true);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsFormOpen((prevState) => ({
          ...prevState,
          [previousResponseBodyForConversation.conversationId]: false,
        }));

        setLoading((prevState) => ({ ...prevState, eventForm: false }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Scheduling Cancelled.";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      setIsFormOpen((prevState) => ({
        ...prevState,
        [previousResponseBodyForConversation.conversationId]: false,
      }));
      handleAddAssistantMessage(aiContent, "eventForm");
      handleRemoveForm(formId);
    }
  };

  const handleTicketConfirmation = async (isConfirmed, formId) => {
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      setLoading((prevState) => ({ ...prevState, ticketForm: true }));
      try {
        const ticketResponse = await fetch(
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

          if (
            currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
            currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING"
          ) {
            const ticketOnboardingResponse = await fetch(
              `https://etech7-wf-etech7-support-service.azuremicroservices.io/onboardUser`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ticketId: id,
                  firstName: currentTicketNewFirstName,
                  lastName: currentTicketNewLastName,
                  emailId: currentTicketNewEmailId,
                  phoneNumber: currentTicketNewPhoneNumber,
                  licenseId: currentTicketLicenseId,
                }),
              }
            );

            if (ticketOnboardingResponse.status === 200) {
              console.log("New Employee Onboarded");
            }
          }

          const aiContent = `Ticket Created!\nID: ${id}\nTitle: ${currentTicketTitle}\nDescription: ${currentTicketDescription}\nCategory: ${currentTicketCategory}\nSubcategory: ${currentTicketSubCategory}\nName: ${currentTicketName}\nEmail: ${currentTicketEmailId}\nPhone: ${currentTicketPhoneNumber}.`;
          const formSummaryResponse = await handleAddMessageToDB(
            aiContent,
            previousResponseBodyForConversation
          );
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent, "ticketForm");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsFormOpen((prevState) => ({
          ...prevState,
          [previousResponseBodyForConversation.conversationId]: false,
        }));
        setLoading((prevState) => ({ ...prevState, ticketForm: false }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Ticket Creation Cancelled.";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      setIsFormOpen((prevState) => ({
        ...prevState,
        [previousResponseBodyForConversation.conversationId]: false,
      }));

      handleAddAssistantMessage(aiContent, "ticketForm");
      handleRemoveForm(formId);
    }
  };

  const handleTaskConfirmation = async (isConfirmed, formId) => {
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      setLoading((prevState) => ({ ...prevState, taskForm: true }));
      try {
        const encodedTask = encodeURIComponent(currentTaskName);
        const taskResponse = await fetch(
          `https://etech7-wf-etech7-mail-service.azuremicroservices.io/addTask?task=${encodedTask}`
        );
        if (taskResponse.status === 200) {
          const aiContent = `Task Created!\n\nTask Name: ${currentTaskName}`;
          const formSummaryResponse = await handleAddMessageToDB(
            aiContent,
            previousResponseBodyForConversation
          );
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent, "taskForm");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsFormOpen((prevState) => ({
          ...prevState,
          [previousResponseBodyForConversation.conversationId]: false,
        }));

        setLoading((prevState) => ({ ...prevState, taskForm: false }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Task Creation Cancelled";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      setIsFormOpen((prevState) => ({
        ...prevState,
        [previousResponseBodyForConversation.conversationId]: false,
      }));

      handleAddAssistantMessage(aiContent, "taskForm");
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
      case "createTask":
        handleCreateTaskProcess(JSON.parse(message));
        break;
      case "getTasks":
        handleGetTasksProcess(responseBody);
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
        handleDefaultActionProcess(message, responseBody);
        break;
    }
  };

  const handleEmailProcess = (mailEntities) => {
    let conversationId;
    const { mailID, subject, body, emailIDs } = mailEntities;
    const [contactGivenName, contactSurname] =
      mailEntities.personName.split(" ");
    if (emailIDs && emailIDs.length !== 0) {
      conversationId = handleAddForm("emailButtons + emailForm");
      setAvailableEmailIds(emailIDs);
      setCurrentEmailSubject(subject);
      setCurrentEmailBody(body);
    } else {
      conversationId = handleAddForm("contactForm + emailForm");
      setCurrentContactEmailIds([mailID]);
      setCurrentContactGivenName(contactGivenName);
      setCurrentContactFamilyName(contactSurname || "");
      setCurrentEmailId(mailID);
      setCurrentEmailSubject(subject);
      setCurrentEmailBody(body);
    }
    setIsFormOpen((prevState) => ({
      ...prevState,
      [conversationId]: true,
    }));
  };

  const handleScheduleProcess = (message) => {
    let conversationId;
    const { summary, description, start, end } = message;
    conversationId = handleAddForm("eventForm");
    setCurrentEventSummary(summary);
    setCurrentEventDescription(description);
    setCurrentEventStartTime(start.slice(0, -3));
    setCurrentEventEndTime(end.slice(0, -3));

    setIsFormOpen((prevState) => ({
      ...prevState,
      [conversationId]: true,
    }));
  };

  const handleCreateTicketProcess = (message) => {
    let conversationId;
    const {
      title,
      description,
      category,
      subcategory,
      name,
      emailID,
      phoneNumber,
    } = message;
    conversationId = handleAddForm("ticketForm");
    setCurrentTicketTitle(title);
    setCurrentTicketDescription(description);
    setCurrentTicketCategory(category);
    setCurrentTicketSubCategory(subcategory);
    setCurrentTicketName(name);
    setCurrentTicketEmailId(emailID);
    setCurrentTicketPhoneNumber(phoneNumber);

    setIsFormOpen((prevState) => ({
      ...prevState,
      [conversationId]: true,
    }));
  };

  const handleAddContactProcess = (message) => {
    let conversationId;
    const { givenName, familyName, emailAddresses, mobileNumber } = message;
    conversationId = handleAddForm("contactForm");
    setCurrentContactGivenName(givenName);
    setCurrentContactFamilyName(familyName);
    setCurrentContactEmailIds(emailAddresses);
    setCurrentContactMobileNumber(mobileNumber);

    setIsFormOpen((prevState) => ({
      ...prevState,
      [conversationId]: true,
    }));
  };

  const handleCreateTaskProcess = (message) => {
    let conversationId;
    conversationId = handleAddForm("taskForm");
    setCurrentTaskName(message);

    setIsFormOpen((prevState) => ({
      ...prevState,
      [conversationId]: true,
    }));
  };

  const handleGetEventsProcess = async (responseBody) => {
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
  };

  const handleGetTasksProcess = async (responseBody) => {
    const {
      tasks: { currentPage },
    } = responseBody;

    if (currentPage.length > 0) {
      let taskCards = `<div class="flex flex-col gap-2">`;
      currentPage.forEach((task, index) => {
        const { displayName } = task;
        taskCards += `<div class="flex flex-col">
            <h2 class="font-bold">Task ${index + 1}</h2>
            <p>${displayName}</p>
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
    stockCards += `<div class="dark:rounded-lg dark:shadow-lg dark:shadow-gray-500 flex flex-col items-center rounded-lg shadow-lg shadow-gray-500">
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
  };

  const handleDefaultActionProcess = async (message, responseBody) => {
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
          handleAddAssistantMessage(`${markDownImage}`);
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
  };

  const handleAddUserMessage = async (message) => {
    setConversationHistories((prevState) => {
      const newConversations = { ...prevState };
      const currentAgentConversations = newConversations[selectedAgent];

      if (
        !currentAgentConversations[currentConversationIndices[selectedAgent]]
          .messages
      ) {
        currentAgentConversations[
          currentConversationIndices[selectedAgent]
        ].messages = [];
      }

      currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages.push({
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      });
      return newConversations;
    });
  };

  const handleAddAssistantMessage = (message, formType) => {
    setConversationHistories((prevState) => {
      const newConversations = { ...prevState };
      const currentAgentConversations = newConversations[selectedAgent];

      if (
        !currentAgentConversations[currentConversationIndices[selectedAgent]]
          .messages
      ) {
        currentAgentConversations[
          currentConversationIndices[selectedAgent]
        ].messages = [];
      }

      const messageId = formType
        ? `${messageIdRef.current}-ai-${formType}`
        : `${messageIdRef.current}-ai`;

      currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages.push({
        id: messageId,
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      });

      return newConversations;
    });
  };

  const handleAddForm = (formType) => {
    const formId = Date.now();
    const conversationId =
      conversationHistories[selectedAgent]?.[
        currentConversationIndices[selectedAgent]
      ]?.id;
    setConversationHistories((prevState) => {
      const newConversations = { ...prevState };
      const currentAgentConversations = newConversations[selectedAgent];

      if (
        !currentAgentConversations[currentConversationIndices[selectedAgent]]
      ) {
        currentAgentConversations[currentConversationIndices[selectedAgent]] = {
          messages: [],
        };
      }

      currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages.push({
        id: formId,
        type: "form",
        formType,
        conversationId,
      });

      return newConversations;
    });
    return conversationId;
  };

  const handleRemoveForm = (formId) => {
    setConversationHistories((prevState) => {
      const newConversations = { ...prevState };
      const currentAgentConversations = newConversations[selectedAgent];

      currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages = currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages.filter((message) => message.id !== formId);

      return newConversations;
    });
  };

  const handleTextAreaChange = (e) => {
    setUserInput(e.target.value);
    setTextAreaHeight(`${e.target.scrollHeight}px`);
  };

  const handleScrollToBottom = (smooth) => {
    latestMessageRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  const handleCheckScroll = () => {
    const container = chatContainerRef.current;
    const atBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 5;
    setIsAtBottom(atBottom);
    setIsOverflowed(container.scrollHeight > container.clientHeight);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [userInput, activeTab, selectedAgent]);

  useEffect(() => {
    const filtered = subCategories.filter(
      (subCategory) => subCategory.category === currentTicketCategory
    );
    setFilteredSubCategories(filtered);
  }, [currentTicketCategory, subCategories]);

  useEffect(() => {
    setUserInput(promptAssistantInput);
  }, [promptAssistantInput]);

  useEffect(() => {
    handleScrollToBottom(true);
  }, [conversationHistories]);

  useEffect(() => {
    handleScrollToBottom();
  }, [currentConversationIndices[selectedAgent]]);

  useEffect(() => {
    if (activeTab === "chat") {
      handleScrollToBottom();
    }
  }, [activeTab]);

  return (
    <div
      onClick={() => {
        openChatHistory && handleOpenChatHistory(false);
        openChatAssistant && handleOpenChatAssistant(false);
      }}
      className={`relative flex flex-col h-full w-full  ${
        (openChatHistory && "lg:opacity-100 opacity-5") ||
        (openChatAssistant && "lg:opacity-100 opacity-5")
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      {!isAtBottom && isOverflowed && (
        <button
          onClick={handleScrollToBottom}
          className="dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600"
        >
          <HiOutlineArrowSmallDown className="m-1" size={18} />
        </button>
      )}
      <div
        className="flex-grow overflow-auto no-scrollbar"
        ref={chatContainerRef}
        onScroll={handleCheckScroll}
      >
        {conversationHistories[selectedAgent]?.[
          currentConversationIndices[selectedAgent]
        ]?.messages?.map((item, index, arr) => {
          return (
            <div
              key={item.id}
              className={`px-4 py-4 text-md w-full  ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
              ref={index === arr.length - 1 ? latestMessageRef : null}
            >
              <div className="flex items-start max-w-[600px] mx-auto gap-4">
                <span>
                  {item.role === "user" ? (
                    <AiOutlineUser size={20} />
                  ) : (
                    <AiOutlineRobot size={20} />
                  )}
                </span>

                <div className="flex-grow min-w-[0]">
                  <Switch
                    item={item}
                    itemId={item.id}
                    loading={loading}
                    categories={categories}
                    handleEmailSelection={handleEmailSelection}
                    availableEmailIds={availableEmailIds}
                    selectedEmailIndex={selectedEmailIndex}
                    currentEmailId={currentEmailId}
                    setCurrentEmailId={setCurrentEmailId}
                    currentEmailSubject={currentEmailSubject}
                    setCurrentEmailSubject={setCurrentEmailSubject}
                    currentEmailBody={currentEmailBody}
                    setCurrentEmailBody={setCurrentEmailBody}
                    currentContactEmailIds={currentContactEmailIds}
                    setCurrentContactEmailIds={setCurrentContactEmailIds}
                    currentContactGivenName={currentContactGivenName}
                    setCurrentContactGivenName={setCurrentContactGivenName}
                    currentContactFamilyName={currentContactFamilyName}
                    setCurrentContactFamilyName={setCurrentContactFamilyName}
                    currentContactMobileNumber={currentContactMobileNumber}
                    setCurrentContactMobileNumber={
                      setCurrentContactMobileNumber
                    }
                    currentTicketTitle={currentTicketTitle}
                    setCurrentTicketTitle={setCurrentTicketTitle}
                    currentTicketDescription={currentTicketDescription}
                    setCurrentTicketDescription={setCurrentTicketDescription}
                    currentTicketCategory={currentTicketCategory}
                    setCurrentTicketCategory={setCurrentTicketCategory}
                    currentTicketSubCategory={currentTicketSubCategory}
                    setCurrentTicketSubCategory={setCurrentTicketSubCategory}
                    filteredSubCategories={filteredSubCategories}
                    currentTicketName={currentTicketName}
                    setCurrentTicketName={setCurrentTicketName}
                    currentTicketEmailId={currentTicketEmailId}
                    setCurrentTicketEmailId={setCurrentTicketEmailId}
                    currentTicketPhoneNumber={currentTicketPhoneNumber}
                    setCurrentTicketPhoneNumber={setCurrentTicketPhoneNumber}
                    currentTicketNewFirstName={currentTicketNewFirstName}
                    setCurrentTicketNewFirstName={setCurrentTicketNewFirstName}
                    currentTicketNewLastName={currentTicketNewLastName}
                    setCurrentTicketNewLastName={setCurrentTicketNewLastName}
                    currentTicketNewEmailId={currentTicketNewEmailId}
                    setCurrentTicketNewEmailId={setCurrentTicketNewEmailId}
                    currentTicketNewPhoneNumber={currentTicketNewPhoneNumber}
                    setCurrentTicketNewPhoneNumber={
                      setCurrentTicketNewPhoneNumber
                    }
                    currentTicketLicenseId={currentTicketLicenseId}
                    setCurrentTicketLicenseId={setCurrentTicketLicenseId}
                    currentEventSummary={currentEventSummary}
                    setCurrentEventSummary={setCurrentEventSummary}
                    currentEventDescription={currentEventDescription}
                    setCurrentEventDescription={setCurrentEventDescription}
                    currentEventStartTime={currentEventStartTime}
                    setCurrentEventStartTime={setCurrentEventStartTime}
                    currentEventEndTime={currentEventEndTime}
                    setCurrentEventEndTime={setCurrentEventEndTime}
                    currentTaskName={currentTaskName}
                    setCurrentTaskName={setCurrentTaskName}
                    handleEmailConfirmation={handleEmailConfirmation}
                    handleContactConfirmation={handleContactConfirmation}
                    handleTicketConfirmation={handleTicketConfirmation}
                    handleScheduleConfirmation={handleScheduleConfirmation}
                    handleTaskConfirmation={handleTaskConfirmation}
                  />
                </div>
                <span>
                  {item.role === "assistant" && (
                    <div className="flex gap-1">
                      <FiThumbsUp
                        onClick={() => handleSubmitFeedback(item.id, false)}
                        size={15}
                        className={`${
                          feedback[item.id] === false ? "text-green-200" : ""
                        } cursor-pointer select-none`}
                      />
                      <FiThumbsDown
                        onClick={() => handleSubmitFeedback(item.id, true)}
                        size={15}
                        className={`${
                          feedback[item.id] === true ? "text-red-200" : ""
                        } cursor-pointer select-none`}
                      />
                    </div>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2">
        {isServerError ? (
          <p className="text-red-600 text-xs">Server Error, try again please</p>
        ) : isFeedbackSubmitted ? (
          <p className="text-yellow-500 text-xs">
            Your feedback has been submitted
          </p>
        ) : (
          <FaSpinner
            className={`${
              isWaiting ? "opacity-100" : "opacity-0"
            } animate-spin`}
          />
        )}
      </div>

      <div className="relative flex items-center px-4 py-2">
        <textarea
          ref={inputRef}
          onChange={handleTextAreaChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendUserMessage(userInput);
            }
          }}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="dark:bg-black bg-white border outline-blue-500 w-full p-4 pr-24 resize-none no-scrollbar"
          style={{
            height: textAreaHeight,
            maxHeight: "200px",
          }}
          disabled={isFormOpen[handleGetConversationId()?.conversationId]}
        />

        <div className="flex items-center gap-3 absolute right-24 pr-2 flex items-center bottom-0 top-0">
          <BsImageFill
            onClick={() => handleImageGenerator(userInput)}
            size={23}
            className={`${
              userInput !== ""
                ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
          <BsFillSendFill
            size={25}
            onClick={() => handleSendUserMessage(userInput)}
            className={`${
              userInput !== ""
                ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
        </div>
        <div className="flex items-center gap-1 pl-2">
          <BsFillStopFill
            onClick={handleAbortRequest}
            size={35}
            className="hover:text-blue-500 cursor-pointer"
          />
          <BsFillMicFill
            onClick={handleTriggerSpeech}
            className={`hover:text-blue-500 ${
              isListening ? "text-blue-500" : null
            } cursor-pointer`}
            size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInteraction;
