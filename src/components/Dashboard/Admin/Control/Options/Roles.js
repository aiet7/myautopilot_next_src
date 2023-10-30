"use client";

import { useEffect, useState } from "react";

const Roles = ({}) => {
  const [search, setSearch] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);

  const roleNames = ["Super Admin", "Admin", "User"];

  const roles = roleNames.map((name, idx) => {
    const permissionCount = Math.floor(Math.random() * 31);
    const summary = `${permissionCount} permission ${
      permissionCount === 1 ? "entry" : "entries"
    }`;

    return {
      id: idx,
      name: name,
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
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Roles</h1>
      </div>
      <div className="dark:shadow-white/40 dark:border-white/20 overflow-hidden  flex flex-col lg:dark:shadow-white/40 lg:border lg:shadow lg:my-12 lg:mx-4">
        <div className="flex flex-col gap-2 p-4">
          <p className="dark:text-white/60 text-sm text-black/40">
            Create roles and assign permissions
          </p>
          <div className="flex items-center gap-2 ">
            <button className="dark:border-white/20 hover:bg-blue-500 border bg-blue-800 text-white py-1 px-3">
              Create Role
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
        <div className="p-4 flex flex-col overflow-auto scrollbar-thin flex-grow text-sm">
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
                <div className="flex  items-start gap-2 ">
                  <button className="hover:underline text-blue-500">
                    Edit
                  </button>
                  <button className="hover:underline text-blue-500">
                    Clone
                  </button>
                  <button className="hover:underline text-blue-500">
                    Delete
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
