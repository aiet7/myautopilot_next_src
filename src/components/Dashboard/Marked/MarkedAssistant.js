import { useEffect } from "react";
import { marked } from "marked";

import useAssistantStore from "../../../utils/store/assistant/assistantStore.js";
import useRefStore from "@/utils/store/marked/ref/refStore.js";

const MarkedAssistant = ({ markdown }) => {
  
  const { listRef } = useRefStore();
  const { activeAssistantButton, handlePromptAssistantInput } =
    useAssistantStore();

  useEffect(() => {
    if (listRef.current && activeAssistantButton === "Engineer") {
      listRef.current.querySelectorAll(".list-item").forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();

          handlePromptAssistantInput(element.textContent);
        });
      });
    }
  }, [handlePromptAssistantInput, markdown]);

  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    return `<pre class="rounded-md my-2"><div class="dark:bg-white/30 bg-black/60 rounded-tl-md rounded-tr-md p-2 text-white">${language}</div><div class="bg-black/80 rounded-br-md rounded-bl-md overflow-y-auto  p-4 scrollbar-thin"><code class="language-${language} text-sm">${code}</code></div></pre>`;
  };

  renderer.list = (body, ordered, start) => {
    if (ordered) {
      return `<ol start="${start}" class="flex flex-col gap-4 
      ${
        activeAssistantButton !== "Engineer" && "list-decimal px-4"
      }">${body}</ol>`;
    } else {
      return `<ul class="flex flex-col gap-4
      ${activeAssistantButton !== "Engineer" && "list-disc px-4"}
      ">${body}</ul>`;
    }
  };

  renderer.listitem = (text) => {
    return `<li class="${
      activeAssistantButton === "Engineer" &&
      "dark:bg-white/20 dark:hover:bg-white/40 hover:bg-black/20 bg-black/5 px-2 py-1 rounded-md list-item cursor-pointer"
    }">${text}</li>`;
  };

  marked.setOptions({ renderer, gfm: true });

  return (
    <div
      ref={listRef}
      className="text-sm flex flex-col gap-2 whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { headerIds: false, mangle: false }),
      }}
    />
  );
};

export default MarkedAssistant;
