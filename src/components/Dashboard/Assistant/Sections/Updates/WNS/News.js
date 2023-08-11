/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const News = ({ wns, handleNewsUpdate }) => {
  const {
    initialNews: { articles },
  } = wns;

  const [userNewsInput, setUserNewsInput] = useState("");

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
            className="dark:shadow-white/40 dark:shadow-md flex flex-col gap-1 border shadow-black/20 shadow-md p-2 rounded"
          >
            <div className="flex flex-col">
              <h2 className="truncate font-bold">
                {article.title || "No title available"}
              </h2>
              <h3>{article.author || "No author available"}</h3>
              <img
                src={article.urlToImage || "/image_not_available.png"}
                alt=""
              />
              <p className="line-clamp-3 text-sm">
                {article.content || "No content available"}
              </p>
              <a href={article.url} target="_blank" className="dark:text-purple-500 text-purple-700">Read more...</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
