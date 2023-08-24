/* eslint-disable @next/next/no-img-element */
"use client";

import useUpdatesStore from "@/utils/store/assistant/sections/updates/updatesStore";

const News = ({  }) => {
  const { wns, userNewsInput, setUserNewsInput, handleNewsUpdate } = useUpdatesStore();
  const {
    initialNews: { articles },
  } = wns;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <input
          value={userNewsInput}
          className="p-1"
          placeholder="New York, Florida etc..."
          onChange={(e) => setUserNewsInput(e.target.value)}
        />
        <button
          onClick={() => handleNewsUpdate(userNewsInput)}
          className="p-1 bg-blue-800 text-white"
        >
          Search
        </button>
      </div>
      {articles?.map((article, index) => {
        return (
          <div
            key={index}
            className="dark:shadow-white/40 dark:shadow-md flex flex-col  border shadow-black/20 shadow-md  rounded"
          >
            <img
              src={article.urlToImage || "/image_not_available.png"}
              alt=""
            />
            <div className="flex flex-col gap-1 p-2">
              <h2 className="truncate font-bold">
                {article.title || "No title available"}
              </h2>
              <h3>{article.author || "No author available"}</h3>

              <p className="line-clamp-3 text-sm">
                {article.content || "No content available"}
              </p>
              <a
                href={article.url}
                target="_blank"
                className="dark:text-purple-500 text-purple-700"
              >
                Read more...
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
