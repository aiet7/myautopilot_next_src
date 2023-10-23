"use client";

import { useEffect, useState } from "react";

const Roles = ({}) => {
  const [search, setSearch] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);

  const roles = Array.from({ length: 20 }, (_, idx) => {
    const permissionCount = Math.floor(Math.random() * 31);
    const summary = `${permissionCount} permission ${
      permissionCount === 1 ? "entry" : "entries"
    }`;

    return {
      id: idx,
      name: `Person ${idx + 1}`,
      summary: summary,
    };
  });

  useEffect(() => {
    const results = roles.filter((role) =>
      role.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRoles(results);
  }, [search]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="dark:border-b-white/20 border-b px-6 py-4">
        <h1 className="text-2xl">Roles</h1>
      </div>
      <div className="dark:shadow-white/40 dark:border-white/20 my-12 mx-6 p-4 border shadow flex flex-col overflow-hidden">
        <div className="flex flex-col gap-2 ">
          <p className="dark:text-white/60 text-sm text-black/40">
            Create roles and assign permissions
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
          <div className="dark:text-white/50 dark:border-b-white/20  grid grid-cols-3 border-b px-2 pb-4 font-bold text-black/50">
            <p></p>
            <p>Name</p>
            <p>Summary</p>
          </div>
          {filteredRoles.map((role, index) => {
            return (
              <div
                key={index}
                className="dark:border-b-white/20 grid grid-cols-3 p-2 border-b "
              >
                <div className="flex flex-col items-start gap-2 sm:flex-row ">
                  <button className="hover:underline text-blue-500">
                    Edit
                  </button>
                  <button className="hover:underline text-blue-500">
                    Delete
                  </button>
                  <button className="hover:underline text-blue-500">
                    Clone
                  </button>
                </div>
                <p className="truncate">{role.name}</p>
                <p className="truncate">{role.summary}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roles;
