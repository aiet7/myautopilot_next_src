export const parseList = (content) => {
  const items = content.split(/\d+\. /).filter(Boolean);

  if (items.length > 1) {
    return (
      <ol className="flex flex-col gap-1">
        {items.map((item, index) => (
          <li key={index}>
            {index + 1}. {item}
          </li>
        ))}
      </ol>
    );
  } else {
    return <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content }}></div>;
  }
};
