import { useEffect } from "react";
import { marked } from "marked";
import { encode } from "html-entities";

import Prism from "prismjs";
import "../../../utils/marked/languages";
import useRefStore from "@/utils/store/marked/ref/refStore";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";

const MarkedInteraction = ({ id, elements, markdown }) => {
  const { userChatButtonsSelected, setUserChatButtonsSelected } =
    useInteractionStore();

  const { copyRef } = useRefStore();
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

    return `<pre class=" rounded-md my-2"><div class="dark:bg-white/30 bg-black/60 rounded-tl-md rounded-tr-md flex justify-between items-center px-4 py-2 text-white"><p>${language}</p><p class="copy-code cursor-pointer" data-code="${codeToCopy}">Copy Code</p></div><div class="bg-black/80 rounded-br-md rounded-bl-md overflow-y-auto p-4 scrollbar-thin"><code class="language-${language} text-sm">${highlightedCode}</code></div></pre>`;
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
  const explanations = elements?.filter((item) => item.type === "Explanation");
  const guidanceItems = elements?.filter((item) => item.type === "Guidance");
  const questionItems = elements?.filter(
    (item) => item.type === "Question" && item.options?.length
  );

  return (
    <div ref={copyRef}>
      <div className="flex flex-col gap-2">
        <div
          className="flex flex-col gap-2"
          dangerouslySetInnerHTML={{
            __html: marked(markdown, { headerIds: false, mangle: false }),
          }}
        />

        {explanations?.length > 0 && (
          <div className="p-4 flex flex-col gap-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="font-bold text-lg">Explanation</p>
            {explanations?.map((item, index) => (
              <p key={index}>{item.content}</p>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-6">
          {questionItems?.length > 0 && (
            <div className="flex flex-col gap-3 w-full">
              <p className="font-bold text-lg">Questions</p>
              {questionItems?.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="font-bold text-md">{item.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-[300px] rounded-md border py-5 ${
                          userChatButtonsSelected[item.content] === option
                            ? "dark:bg-white/40 bg-black/20"
                            : "dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                        }`}
                        onClick={() => {
                          setUserChatButtonsSelected(item.content, option);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {guidanceItems?.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              <p className="font-bold text-lg">
                Recommendations From Vision For You
              </p>
              {guidanceItems?.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p
                    onClick={() => {
                      setUserChatButtonsSelected(item.content, " ");
                    }}
                    className={`cursor-pointer w-[300px] px-4 text-left rounded-md border py-5 ${
                      userChatButtonsSelected[item.content] === " "
                        ? "dark:bg-white/40 bg-black/20"
                        : "dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                    }`}
                  >
                    {item.content}
                  </p>
                  {item.options && (
                    <div className="flex flex-wrap gap-2">
                      {item.options.map((option, index) => (
                        <button
                          key={index}
                          className="w-[200px] rounded-md border py-5 dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                          onClick={() => {
                            setUserChatButtonsSelected(item.content, option);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkedInteraction;
