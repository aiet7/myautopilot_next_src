"use client";

import { useEffect, useState } from "react";

const Internal = ({}) => {
  const [search, setSearch] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  const people = Array.from({ length: 50 }, (_, idx) => ({
    id: idx,
    name: `Person ${idx + 1}`,
    role: idx % 2 === 0 ? "Admin" : "User",
    displayName: `person${idx + 1}_123`,
  }));

  useEffect(() => {
    const results = people.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPeople(results);
  }, [search]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="dark:border-b-white/20 border-b px-6 py-4">
        <h1 className="text-2xl">Internal</h1>
      </div>
      <div className="dark:shadow-white/40 dark:border-white/20 my-12 mx-6 p-4 border shadow flex flex-col  overflow-hidden">
        <div className="flex flex-col gap-2">
          <p className="dark:text-white/60 text-sm text-black/40">
            Users, passwords, and roles stored within this application
          </p>
          <div className="flex items-center gap-2 ">
            <button className="dark:border-white/20 hover:bg-blue-500 border bg-blue-800 text-white py-1 px-3">
              Create User
            </button>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dark:border-white/20 p-1 border mr-2"
            />
          </div>
        </div>

        <div className="py-8 flex flex-col overflow-auto scrollbar-thin flex-grow text-sm">
          <div className="dark:text-white/50 dark:border-b-white/20  grid grid-cols-4 border-b px-2 pb-4 font-bold text-black/50">
            <p></p>
            <p>Name</p>
            <p>Role(s)</p>
            <p>Display Name</p>
          </div>
          {filteredPeople.map((person, index) => {
            return (
              <div
                key={index}
                className="dark:border-b-white/20 grid grid-cols-4 p-2 border-b "
              >
                <div className="flex gap-2">
                  <button className="hover:underline text-blue-500">Edit</button>
                  <button className="hover:underline text-blue-500">Delete</button>
                </div>
                <p className="truncate">{person.name}</p>
                <p className="truncate">{person.role}</p>
                <p className="truncate">{person.displayName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Internal;
