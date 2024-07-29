"use client";

import useDownloadsStore from "@/utils/store/assistant/sections/external/downloads/downloadStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Downloads = () => {
  const { user } = useUserStore();
  const {
    successMessage,
    tools,
    toolToUpload,
    isDocUploading,
    selectedTool,
    setSelectedTool,
    setToolToUpload,
    handleUploadTools,
    initializeMSPTools,
  } = useDownloadsStore();

  useEffect(() => {
    initializeMSPTools();
  }, []);

  const selectedToolDownload = tools?.find((tool) => tool.id === selectedTool);

  return (
    <div className="flex-grow flex flex-col   overflow-hidden w-full">
      <div className="flex-grow overflow-y-auto scrollbar-thin ">
        <div className="flex flex-grow flex-col ">
          <div className="flex flex-col gap-6 ">
            <div>
              <p className="text-2xl">Manage Your Tools</p>
              <p className="dark:text-white/60 text-lg text-black/60">
                Access and download the specific tools you need
              </p>
            </div>
            <select
              className="p-2 rounded border cursor-pointer"
              onChange={(e) => {
                setSelectedTool(e.target.value);
              }}
              value={selectedTool}
            >
              <option value="" disabled selected>
                Select a Tool
              </option>
              {tools?.map((tool) => {
                const { id, fileUrl, fileName } = tool;
                return (
                  <option key={id} value={id}>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                      {fileName}
                    </a>
                  </option>
                );
              })}
            </select>
            {selectedTool && (
              <div className="">
                <p className="dark:text-white/60 text-black/60">
                  {selectedToolDownload?.description}
                </p>
                <a
                  href={selectedToolDownload?.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 px-3 w-full">
                    Download
                  </button>
                </a>
              </div>
            )}
            <div className="flex flex-col overflow-hidden gap-4">
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  if (e.dataTransfer.files.length > 0) {
                    setToolToUpload("file", e.dataTransfer.files[0]);
                  }
                }}
                className=" dark:hover:bg-white/20 hover:bg-black/20 dark:text-white/40 dark:bg-gray-800 font-bold   bg-blue-200 border-t text-center py-20 px-2 rounded-t cursor-pointer  text-black/40"
              >
                <input
                  className="hidden"
                  key={Date.now()}
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setToolToUpload("file", e.target.files[0]);
                    }
                  }}
                />
                {isDocUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Uploading
                  </div>
                ) : (
                  <div className="truncate">
                    {toolToUpload?.file ? (
                      <span className="">{toolToUpload?.file?.name}</span>
                    ) : (
                      <span>+ Add Tool</span>
                    )}
                  </div>
                )}
              </label>
              <textarea
                value={toolToUpload.descriptions}
                placeholder="Add Tool Description Here..."
                maxLength={100}
                className="max-h-[200px] border min-h-[100px]  outline-blue-500 w-full p-2"
                onChange={(e) => setToolToUpload("description", e.target.value)}
              />
              <button
                onClick={() => handleUploadTools(user?.mspCustomDomain)}
                className="hover:bg-blue-500 bg-blue-800 text-white py-2 px-3 w-full rounded-b"
              >
                Upload
              </button>
            </div>
            {successMessage && (
              <p className="font-semibold">Tool Upload Successfull!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
