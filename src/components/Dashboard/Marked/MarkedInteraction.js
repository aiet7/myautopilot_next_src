import { useEffect } from "react";
import { marked } from "marked";
import { encode } from "html-entities";

import Prism from "prismjs";
import "../../../utils/marked/languages";
import useConversationStore from "../../../utils/store/interaction/conversations/conversationsStore.js";
import useRefStore from "@/utils/store/marked/ref/refStore";
import useMarkedStore from "@/utils/store/marked/markedStore";

import { BiEdit, BiNotepad } from "react-icons/bi";
import { BsLayoutSplit } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useNotesStore from "@/utils/store/assistant/sections/notes/notesStore";

import { Tooltip as ReactTooltip } from "react-tooltip";
import Tooltip from "rc-tooltip";

const MarkedInteraction = ({ id, markdown }) => {
  const { handleUpdateEditedResponse } = useConversationStore();
  const { feedback, handleSubmitFeedback } = useInteractionStore();
  const { handleAddNote } = useNotesStore();
  const { copyRef, textAreaRef } = useRefStore();
  const {
    content,
    isEditing,
    editingMessageId,
    setContent,
    setIsEditing,
    handleEdit,
  } = useMarkedStore();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  useEffect(() => {
    if (copyRef.current) {
      copyRef.current.querySelectorAll(".copy-code").forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          const code = element.getAttribute("data-code");

          if (!navigator.clipboard) {
            var textarea = document.createElement("textarea");
            textarea.textContent = code;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
              document.execCommand("copy");
              element.innerText = "Copied!";
              setTimeout(() => {
                element.innerText = "Copy Code";
              }, 2000);
            } catch (err) {
              console.error("Fallback: Oops, unable to copy", err);
            }
            document.body.removeChild(textarea);
            return;
          }

          navigator.clipboard
            .writeText(code)
            .then(() => {
              element.innerText = "Copied!";
              setTimeout(() => {
                element.innerText = "Copy Code";
              }, 2000);
            })
            .catch((err) => console.error("Could not copy text: ", err));
        });
      });
    }
  }, [markdown]);

  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    const codeToCopy = encode(code.trim());

    if (!Prism.languages[language]) {
      language = "plaintext";
    }

    const highlightedCode = Prism.highlight(
      code,
      Prism.languages[language],
      language
    );

    return `<pre class="rounded-md my-2"><div class="dark:bg-white/30 bg-black/60 rounded-tl-md rounded-tr-md flex justify-between items-center px-4 py-2 text-white"><p>${language}</p><p class="copy-code cursor-pointer" data-code="${codeToCopy}">Copy Code</p></div><div class="bg-black/80 rounded-br-md rounded-bl-md overflow-y-auto  p-4 scrollbar-thin"><code class="language-${language} text-sm">${highlightedCode}</code></div></pre>`;
  };

  renderer.list = (body, ordered, start) => {
    if (ordered) {
      return `<ol start="${start}" class="flex flex-col gap-2 list-decimal pl-4">${body}</ol>`;
    } else {
      return `<ul class="flex flex-col gap-2 list-disc pl-4">${body}</ul>`;
    }
  };

  // renderer.listitem = (text) => {
  //   return `<li class="hover:bg-black/20 cursor-pointer rounded">${text}</li>`;
  // };

  renderer.link = (href, title, text) => {
    return `<a class="dark:text-purple-400 text-purple-800" href="${href}" title="${title}" target="_blank" rel="noopener">${text}</a>`;
  };

  renderer.table = (header, body) => {
    return `<table class="table-auto w-full divide-y divide-gray-200">\n<thead>\n${header}\n</thead>\n<tbody class="divide-y divide-gray-200">\n${body}\n</tbody>\n</table>`;
  };

  renderer.tablerow = (content) => {
    return `<tr class="">${content}</tr>`;
  };

  renderer.tablecell = (content, flags) => {
    const type = flags.header ? "th" : "td";
    const classes = flags.header
      ? "dark:bg-white/20 text-white pl-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border bg-black/50"
      : "dark:text-white text-black pl-2 whitespace-pre-wrap  text-xs text-gray-500 border text-left";
    return `<${type} class="${classes}">\n${content}\n</${type}>`;
  };

  marked.setOptions({ renderer, gfm: true });

  if (isEditing && editingMessageId === id) {
    return (
      <div className="flex flex-col items-start gap-2 w-full">
        <textarea
          ref={textAreaRef}
          className="p-2 w-full block scrollbar-thin"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleUpdateEditedResponse(id, content);
              setIsEditing(false);
            }}
            className="bg-blue-800 text-white px-2 py-1 rounded"
          >
            Save
          </button>
          <button
            className="bg-blue-800 text-white px-2 py-1 rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div ref={copyRef}>
        <div
          className="flex flex-col gap-2"
          dangerouslySetInnerHTML={{
            __html: marked(markdown, { headerIds: false, mangle: false }),
          }}
        />
        {id.endsWith("-ai") ? (
          <div className="dark:text-blue-500 flex items-center justify-between pt-2 text-blue-800 max-w-[450px]">
            <div className="flex items-center gap-2">
              <BiEdit
                data-tooltip-id="Edit"
                size={30}
                className="dark:border-white/20 cursor-pointer border border-black/10 p-1 rounded outline-none"
                onClick={() => handleEdit(id, markdown)}
              />
              {/* <ReactTooltip
                place="top"
                content="Edit"
                id="Edit"
                className="z-[99]"
                closeOnScroll={true}
              /> */}

              <GiSettingsKnobs
                data-tooltip-id="Elaborate/Summarize"
                size={30}
                className="dark:border-white/20 cursor-pointer border border-black/10 p-1 rounded outline-none"
              />
              {/* <ReactTooltip
                place="top"
                content="Elaborate/Summarize"
                id="Elaborate/Summarize"
                className="z-[99]"
                closeOnScroll={true}
              /> */}
            </div>
            <div className="flex items-center gap-2">
              <BsLayoutSplit
                data-tooltip-id="View ChatGPT Responses"
                size={30}
                className="dark:border-white/20 cursor-pointer border border-black/10 p-1 rounded outline-none"
              />
              {/* <ReactTooltip
                place="top"
                content="View ChatGPT Responses"
                id="View ChatGPT Responses"
                className="z-[99]"
                closeOnScroll={true}
              /> */}
              <BiNotepad
                data-tooltip-id="Add To Notes"
                onClick={() => handleAddNote(markdown)}
                size={30}
                className="dark:border-white/20 cursor-pointer border border-black/10 p-1 rounded outline-none"
              />
              {/* <ReactTooltip
                place="top"
                content="Add To Notes"
                id="Add To Notes"
                className="z-[99]"
                closeOnScroll={true}
              /> */}
              <FiThumbsUp
                data-tooltip-id="Positive Feedback"
                onClick={() => handleSubmitFeedback(id, false)}
                className={`${
                  feedback[id] === false ? "text-green-200" : ""
                } dark:border-white/20 cursor-pointer border border-black/10 p-1 rounded outline-none`}
                size={30}
              />
              {/* <ReactTooltip
                place="top"
                content="Positive Feedback"
                id="Positive Feedback"
                className="z-[99]"
                closeOnScroll={true}
              /> */}
              <FiThumbsDown
                data-tooltip-id="Negative Feedback"
                onClick={() => handleSubmitFeedback(id, true)}
                className={`${
                  feedback[id] === true ? "text-red-200" : ""
                } dark:border-white/20 cursor-pointer border border-black/10 p-1 rounded outline-none`}
                size={30}
              />
              {/* <ReactTooltip
                place="top"
                content="Negative Feedback"
                id="Negative Feedback"
                className="z-[99]"
                closeOnScroll={true}
              /> */}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default MarkedInteraction;
