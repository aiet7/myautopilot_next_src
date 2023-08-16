import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import { encode } from "html-entities";

import Prism from "prismjs";
import "./languages.js";

export const MarkedChatInteraction = ({
  id,
  markdown,
  handleUpdateEditedResponse,
}) => {
  const copyRef = useRef(null);
  const textAreaRef = useRef(null);

  const [content, setContent] = useState(markdown);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);

  const handleEdit = (id) => {
    setIsEditing(true);
    setEditingMessageId(id);
    setContent(markdown);
  };

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

    return `<pre class="rounded-md my-2"><div class="dark:bg-white/30 bg-black/60 rounded-tl-md rounded-tr-md flex justify-between items-center px-4 py-2 text-white"><p>${language}</p><p class="copy-code cursor-pointer" data-code="${codeToCopy}">Copy Code</p></div><div class="bg-black/80 rounded-br-md rounded-bl-md overflow-y-auto p-4 scrollbar-thin"><code class="language-${language} text-sm">${highlightedCode}</code></div></pre>`;
  };

  renderer.list = (body, ordered, start) => {
    if (ordered) {
      return `<ol start="${start}" class="flex flex-col gap-2 list-decimal pl-4">${body}</ol>`;
    } else {
      return `<ul class="flex flex-col gap-2 list-disc pl-4">${body}</ul>`;
    }
  };

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
      <div ref={copyRef} className="flex flex-col items-start gap-2">
        <div
          className="flex flex-col gap-2 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: marked(markdown, { headerIds: false, mangle: false }),
          }}
        />
        {id.endsWith("-ai") && (
          <button
            className="bg-blue-800 text-white px-2 rounded"
            onClick={() => handleEdit(id)}
          >
            Edit
          </button>
        )}
      </div>
    );
  }
};

export const MarkedChatAssistant = ({
  markdown,
  handlePromptAssistantInput,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll(".list-item").forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();

          handlePromptAssistantInput(element.textContent);
        });
      });
    }
  }, [handlePromptAssistantInput, markdown]);

  const renderer = new marked.Renderer();

  renderer.list = (body, ordered, start) => {
    if (ordered) {
      return `<ol start="${start}" class="flex flex-col gap-4">${body}</ol>`;
    } else {
      return `<ul class="flex flex-col gap-4">${body}</ul>`;
    }
  };

  renderer.listitem = (text) => {
    return `<li class="dark:bg-white/20 bg-black/5 px-2 py-1 rounded-md list-item cursor-pointer">${text}</li>`;
  };

  marked.setOptions({ renderer, gfm: true });

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 whitespace-pre-wrap"
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { headerIds: false, mangle: false }),
      }}
    />
  );
};
