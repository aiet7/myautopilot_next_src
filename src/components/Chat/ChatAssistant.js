"use client";

import { AiOutlineArrowRight } from "react-icons/ai";

const ChatAssistant = ({ openChatAssistant }) => {
  const prompts = [
    {
      title: "To send an email, prompt our chatbot with:",
      examples: [
        '"compose an email ..."',
        '"create an email to..."',
        '"send this email to..."',
      ],
    },
    {
      title: "To schedule an event, prompt our chatbot with:",
      examples: [
        '"set an event with..."',
        '"create a meeting with..."',
        '"schedule an event..."',
      ],
    },
    {
      title: "To add a contact, prompt our chatbot with:",
      examples: [
        '"Add [name] to my contacts..."',
        '"Create a new contact..."',
        '"I want a new contact to be added..."',
      ],
    },
  ];
  return (
    <div
      className={`px-4 py-6 bg-gray-100 dark:bg-black dark:shadow-white shadow-lg shadow-black/50 absolute z-[995] top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform ${
        openChatAssistant
          ? "translate-x-0 w-[300px]"
          : "translate-x-[600px] w-[300px]"
      } lg:relative lg:translate-x-0 lg:w-[300px] lg:static`}
    >
      <h2 className="text-2xl font-bold mb-4">Intent Prompts Guide</h2>
      <p className=" mb-6">
        Try different combinations of words and watch our chatbot understand
        exactly what you want.
      </p>
      {prompts.map((prompt, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{prompt.title}</h3>
          <ul className="list-disc ml-5">
            {prompt.examples.map((example, i) => (
              <li key={i} className=" mb-1">
                <AiOutlineArrowRight className="inline mr-1" />
                {example}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChatAssistant;
