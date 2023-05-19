"use client";

import { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import { BsFillMicFill, BsFillStopFill, BsFillSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import { parseList } from "../../utils/detectContentType.js";
import { categories, subCategories } from "../../utils/ticketCreation.js";

const ChatInteraction = ({
  openChatHistory,
  openChatAssistant,
  currentConversationIndex,
  conversationHistory,
  setConversationHistory,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const [formVisibility, setFormVisibility] = useState({});
  const [confirmationMessages, setConfirmationMessages] = useState({
    emailForm: "",
    eventForm: "",
    contactForm: "",
    ticketForm: "",
  });

  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState("");

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

  const handleSendUserMessage = async () => {
    if (userInput.trim() !== "") {
      handleAddUserMessage(userInput);
      setIsWaiting(true);
      setUserInput("");
      try {
        const encodedMessage = encodeURIComponent(userInput);
        const response = await fetch(
          `http://localhost:8081/jarvis4?text=${encodedMessage}`
        );
        if (response.status === 200) {
          const responseBody = await response.json();

          handleProcessResponse(
            responseBody.intent,
            responseBody.mailEntities,
            responseBody.message
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    }
  };

  const handleEmailSelection = (email, emailIndex) => {
    setSelectedEmailIndex(emailIndex);
    setSelectedEmailId(email);
  };

  const handleEmailConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      try {
        const encodedEmailId = encodeURIComponent(selectedEmailId);
        const encodedSubject = encodeURIComponent(currentEmailSubject);
        const encodedBody = encodeURIComponent(currentEmailBody);

        const emailResponse = await fetch(
          `http://localhost:8082/graph?mailId=${encodedEmailId}&subject=${encodedSubject}&body=${encodedBody}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (emailResponse.status === 200) {
          console.log("email sent");
          setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("email cancelled");
      setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
    }
  };

  const handleContactConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
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
          `http://localhost:8082/addContact?givenName=${encodedContactGivenName}&surName=${encodedContactSurname}&emailId=${encodedContactEmailId}&mobileNumber=${encodedContactMobileNumber}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (contactResponse.status === 200) {
          console.log("added");
          setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("not added");
      setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
    }
  };

  const handleScheduleConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      try {
        const scheduleResponse = await fetch(
          `http://localhost:8082/scheduleEvent`,
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
          console.log("scheduled");
          setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("not scheduled");
      setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
    }
  };

  const handleTicketConfirmation = async (isConfirmed, formId) => {
    if (isConfirmed) {
      try {
        const ticketResponse = await fetch(
          "http://localhost:8084/createTicket",
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
          console.log(ticketResponse);
          setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
          setConfirmationMessages((prevState) => ({
            ...prevState,
            [formId]: `Ticket Created! Title: ${currentTicketTitle}, Description: ${currentTicketDescription}, Category: ${currentTicketCategory}, Subcategory: ${currentTicketSubCategory}, Name: ${currentTicketName}, Email: ${currentTicketEmailId}, Phone: ${currentTicketPhoneNumber}.`,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("ticket cancelled");
      setFormVisibility((prevState) => ({ ...prevState, [formId]: false }));
    }
  };

  const handleProcessResponse = (intent, mailEntities, message) => {
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
        handleGetEventsProcess(message);
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

  const handleGetEventsProcess = (message) => {
    console.log(message);
  };

  const handleDefaultActionProcess = (message) => {
    handleAddAssistantMessage(message);
  };

  const handleAddUserMessage = (message) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];
      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = [];
      }
      newConversationHistory[currentConversationIndex].push({
        id: Date.now(),
        content: message,
        role: "user",
      });
      return newConversationHistory;
    });
  };

  const handleAddAssistantMessage = (message) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];
      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = [];
      }
      newConversationHistory[currentConversationIndex].push({
        id: Date.now(),
        content: message,
        role: "assistant",
      });
      return newConversationHistory;
    });
  };

  const handleAddForm = (formType) => {
    const formId = Date.now();
    setFormVisibility((prevState) => ({ ...prevState, [formId]: true }));
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];
      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = [];
      }
      newConversationHistory[currentConversationIndex].push({
        id: formId,
        type: "form",
        formType,
      });
      return newConversationHistory;
    });
  };

  const handleToggleForm = (formId) => {
    setFormVisibility((prevState) => ({
      ...prevState,
      [formId]: !prevState[formId],
    }));
  };

  useEffect(() => {
    const filtered = subCategories.filter(
      (subCategory) => subCategory.category === currentTicketCategory
    );
    setFilteredSubCategories(filtered);
  }, [currentTicketCategory, subCategories]);

  return (
    <div
      className={`flex flex-col h-full w-full  ${
        (openChatHistory && "opacity-5") || (openChatAssistant && "opacity-5")
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      <div className=" flex-grow overflow-auto no-scrollbar ">
        {conversationHistory[currentConversationIndex]?.map((item, index) => {
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
                        if (!formVisibility[item.id]) {
                          return (
                            <button
                              className="bg-blue-300 rounded-md px-3 py-2 text-white"
                              onClick={() => handleToggleForm(item.id)}
                            >
                              Show form
                            </button>
                          );
                        }
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
                                      value={selectedEmailId}
                                      onChange={(e) =>
                                        setSelectedEmailId(e.target.value)
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
                                    onClick={() => {
                                      handleEmailConfirmation(true, item.id);
                                    }}
                                  >
                                    Send Email
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
                                    <span className="font-bold">Last Name</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={currentContactSurname}
                                      onChange={(e) =>
                                        setCurrentContactSurname(e.target.value)
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
                                    onClick={() =>
                                      handleContactConfirmation(true)
                                    }
                                  >
                                    Add Contact
                                  </button>
                                  <button
                                    className="bg-red-300 rounded-md px-3 py-2 text-white"
                                    onClick={() =>
                                      handleContactConfirmation(false)
                                    }
                                  >
                                    Cancel
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
                                    onClick={() => {
                                      handleEmailConfirmation(true, item.id);
                                    }}
                                  >
                                    Send Email
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
                                    <span className="font-bold">Last Name</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={currentContactSurname}
                                      onChange={(e) =>
                                        setCurrentContactSurname(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold">Email</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4 "
                                      value={currentContactEmailId}
                                      onChange={(e) =>
                                        setCurrentContactEmailId(e.target.value)
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
                                    onClick={() =>
                                      handleContactConfirmation(true, item.id)
                                    }
                                  >
                                    Add Contact
                                  </button>
                                  <button
                                    className="bg-red-300 rounded-md px-3 py-2 text-white"
                                    onClick={() =>
                                      handleContactConfirmation(false, item.id)
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
                                    <span className="font-bold">Category</span>

                                    <select
                                      value={currentTicketCategory}
                                      onChange={(e) =>
                                        setCurrentTicketCategory(e.target.value)
                                      }
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                    >
                                      <option value="">
                                        Select a category
                                      </option>
                                      {categories.map((category, index) => (
                                        <option key={index} value={category.id}>
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
                                        setCurrentTicketEmailId(e.target.value)
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
                                    onClick={() => {
                                      handleTicketConfirmation(true, item.id);
                                    }}
                                  >
                                    Create Ticket
                                  </button>
                                  <button
                                    className="bg-red-300 rounded-md px-3 py-2 text-white"
                                    onClick={() => {
                                      handleTicketConfirmation(false, item.id);
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
                                  <span>{confirmationMessages[item.id]}</span>
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
                                        setCurrentEventStartTime(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold">End Time</span>
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
                                    <span className="font-bold">Location</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={currentEventLocation}
                                      onChange={(e) =>
                                        setCurrentEventLocation(e.target.value)
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
                                    onClick={() => {
                                      handleScheduleConfirmation(true, item.id);
                                    }}
                                  >
                                    Schedule Event
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
        })}
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
              handleSendUserMessage();
            }
          }}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="border outline-blue-500 w-full px-4 h-[50px]"
        />
        <BsFillSendFill
          size={25}
          onClick={handleSendUserMessage}
          className="cursor-pointer"
        />
        <BsFillMicFill size={25} className="cursor-pointer" />
        <BsFillStopFill size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatInteraction;
