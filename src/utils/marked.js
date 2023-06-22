import { useEffect, useRef } from "react";
import { marked } from "marked";
import { encode } from "html-entities";

export const MarkedWithCopy = ({ markdown }) => {
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
    return `<pre class="rounded-md my-2"><div class="dark:bg-white/30 bg-black/60 rounded-tl-md rounded-tr-md flex justify-between items-center bg-white/20 px-4 py-2 text-white"><p>Code</p><p class="copy-code cursor-pointer" data-code="${codeToCopy}">Copy Code</p></div><div class="dark:bg-white/90 bg-black/80 overflow-y-auto p-4"><code class="dark:text-black text-sm text-white">${code}</code></div></pre>`;
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

  marked.setOptions({ renderer });

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
