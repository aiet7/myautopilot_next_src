"use client";

import { useEffect, useState } from "react";

const Companies = () => {
  const [search, setSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const owners = [
    "John Doe",
    "Jane Smith",
    "Sam Brown",
    "Anna Johnson",
    "Paul White",
  ];
  const cities = ["New York", "London", "Paris", "Tokyo", "Sydney"];
  const countries = ["USA", "UK", "France", "Japan", "Australia"];
  const industries = ["Tech", "Finance", "Healthcare", "Real Estate", "Media"];

  const companies = Array.from({ length: 50 }, (_, idx) => ({
    id: idx,
    name: `Company ${idx + 1}`,
    owner: owners[Math.floor(Math.random() * owners.length)],
    createdDate: new Date(
      2020 + Math.floor(Math.random() * 3),
      Math.floor(Math.random() * 12)
    ).toDateString(),
    phoneNumber: `+1 (800) 123-45${Math.floor(Math.random() * 10)}${Math.floor(
      Math.random() * 10
    )}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    country: countries[Math.floor(Math.random() * countries.length)],
    industry: industries[Math.floor(Math.random() * industries.length)],
  }));

  useEffect(() => {
    const results = companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCompanies(results);
  }, [search]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Companies</h1>
      </div>
      <div className="dark:shadow-white/40 dark:border-white/20 overflow-hidden flex flex-col lg:dark:shadow-white/40 lg:border lg:shadow lg:my-12 lg:mx-4">
        <div className="flex flex-col gap-2 p-4">
          <p className="dark:text-white/60 text-sm text-black/40">
            All companies currently under MSP
          </p>
          <div className="flex items-center gap-2">
            <button className="dark:border-white/20 hover:bg-blue-500 border bg-blue-800 text-white py-1 px-3">
              Create Company
            </button>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              className="dark:border-white/20 p-1 border mr-2"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow text-sm overflow-auto scrollbar-thin">
          <div className="dark:text-white/50 dark:border-b-white/20  grid grid-cols-8 border-b px-2 pb-4 font-bold text-black/50">
            <p></p>
            <p className="truncate">Company Name</p>
            <p className="truncate">Company Owner</p>
            <p className="truncate">Create Date</p>
            <p className="truncate">Phone Number</p>
            <p className="truncate">City</p>
            <p className="truncate">Country/Region</p>
            <p className="truncate">Industry</p>
          </div>
          {filteredCompanies.map((company, index) => {
            return (
              <div
                key={index}
                className="dark:border-b-white/20 grid grid-cols-8 p-2 border-b"
              >
                <input type="checkbox" />
                <p className="truncate">{company.name}</p>
                <p className="truncate">{company.owner}</p>
                <p className="truncate"> {company.createdDate}</p>
                <p className="truncate">{company.phoneNumber}</p>

                <p className="truncate">{company.city}</p>
                <p className="truncate">{company.country}</p>
                <p className="truncate">{company.industry}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Companies;
