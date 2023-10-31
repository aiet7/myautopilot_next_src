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

        <div className="px-4 pb-4 block overflow-auto scrollbar-thin text-sm max-h-full max-w-full">
          <table className="min-w-full text-black/50 table-fixed">
            <thead className="sticky top-0 bg-white">
              <tr className="text-left">
                <th className="p-2 "></th>
                <th className="p-2">Name</th>
                <th className="p-2"> Summary</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role, index) => {
                return (
                  <tr key={index} className="dark:border-b-white/20 border-b">
                    <td className="p-2">
                      <div className="flex gap-2">
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
                    </td>
                    <td className="p-2 truncate">{role.name}</td>
                    <td className="p-2 truncate">{role.summary}</td>
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

export default Roles;
