import { marked } from "marked";

const MarkedTroubleshoot = ({ markdown }) => {
  const renderer = new marked.Renderer();
  renderer.list = (body, ordered, start) => {
    if (ordered) {
      return `<ol start="${start}" class="flex flex-col gap-2 list-decimal pl-4">${body}</ol>`;
    } else {
      return `<ul class="flex flex-col gap-2 list-disc pl-4">${body}</ul>`;
    }
  };

  marked.setOptions({ renderer, gfm: true });

  return (
    <div
      className="flex flex-col gap-2"
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { headerIds: false, mangle: false }),
      }}
    />
  );
};

export default MarkedTroubleshoot;
