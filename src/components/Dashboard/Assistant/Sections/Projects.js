"use client";

import useProjectsStore from "@/utils/store/assistant/sections/projects/projectsStore";
import { useEffect } from "react";

import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Projects = () => {
  const {
    projects,
    showProjectIndex,
    setShowProjectIndex,
    initializeProjects,
  } = useProjectsStore();

  useEffect(() => {
    initializeProjects();
  }, []);


  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Projects</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {projects.map((project, index) => {
            const {
              agreement,
              company,
              contact,
              description,
              location,
              manager,
              status,
              estimatedEnd,
            } = project;
            return (
              <div
                key={index}
                className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
              >
                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Status:</span>{" "}
                  {status?.name || "N/A"}
                </p>
                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Company:</span>{" "}
                  {company?.name || "N/A"}
                </p>

                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Agreement:</span>{" "}
                  {agreement?.name || "N/A"}
                </p>
                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Contact:</span>{" "}
                  {contact?.name || "N/A"}
                </p>
                <p>
                  <span className="font-bold">Manager:</span>{" "}
                  {manager?.name || "N/A"}
                </p>
                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Location:</span>{" "}
                  {location?.name || "N/A"}
                </p>

                {showProjectIndex === index && (
                  <>
                    <p className="break-words whitespace-pre-wrap">
                      <span className="font-bold">Description:</span>{" "}
                      {description || "N/A"}
                    </p>
                    <p className="break-words whitespace-pre-wrap">
                      <span className="font-bold">Estimated Completion:</span>{" "}
                      {new Date(estimatedEnd).toLocaleDateString() || "N/A"}
                    </p>
                  </>
                )}
                {showProjectIndex === index ? (
                  <MdOutlineArrowDropUp
                    size={30}
                    className="self-center cursor-pointer"
                    onClick={() => setShowProjectIndex(null)}
                  />
                ) : (
                  <MdOutlineArrowDropDown
                    size={30}
                    className="self-center cursor-pointer"
                    onClick={() => setShowProjectIndex(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
