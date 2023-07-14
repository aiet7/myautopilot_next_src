import { useEffect, useRef } from "react";
import { marked } from "marked";
import { encode } from "html-entities";

import Prism from "prismjs";
import "./languages.js";

export const MarkedChatInteraction = ({ markdown, context }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll(".copy-code").forEach((element) => {
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
      return `<ol start="${start}" class="flex flex-col gap-2 list-decimal pl-4">${body}</ol>`;
    } else {
      return `<ul class="flex flex-col gap-2 list-disc pl-4">${body}</ul>`;
    }
  };

  renderer.listitem = (text) => {
    return `<li class="dark:bg-white/20 bg-black/5 px-2 py-1 rounded-md mx-2 list-item cursor-pointer">${text}</li>`;
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
