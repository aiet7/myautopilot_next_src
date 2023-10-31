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
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Internal</h1>
      </div>
      <div className="dark:shadow-white/40 dark:border-white/20 overflow-hidden flex flex-col lg:dark:shadow-white/40 lg:border lg:shadow lg:my-12 lg:mx-4">
        <div className="flex flex-col gap-2 p-4">
          <p className="dark:text-white/60 text-sm text-black/40">
            Users, passwords, and roles stored within this application
          </p>
          <div className="flex items-center gap-2">
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

        <div className="px-4 pb-4 block overflow-auto scrollbar-thin text-sm max-h-full max-w-full">
          <table className="min-w-full text-black/50 table-fixed ">
            <thead className="sticky top-0 bg-white">
              <tr className="text-left">
                <th className="p-2 "></th>
                <th className="p-2 ">Name</th>
                <th className="p-2">Role(s)</th>
                <th className="p-2">Display Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map((person, index) => {
                return (
                  <tr key={index} className="dark:border-b-white/20 border-b">
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button className="hover:underline text-blue-500">
                          Edit
                        </button>
                        <button className="hover:underline text-blue-500">
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="p-2 truncate">{person.name}</td>
                    <td className="p-2 truncate">{person.role}</td>
                    <td className="p-2 truncate">{person.displayName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Internal;
