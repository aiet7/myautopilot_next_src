"use client";

import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore";
import { BsStars } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

const DocumentGuide = () => {
  const { isDocUploading, handleUploadDocument } = useDocConversationsStore();

  return (
    <div className="flex flex-col items-center p-4 text-md h-full max-w-[700px] mx-auto justify-between">
      <div className="dark:border-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold mb-4">
        <BsStars size={15} />
        <span>GPT-3.5</span>
      </div>

      <div className="flex flex-col justify-center flex-grow gap-2">
        <div className="flex flex-col">
          <p className="font-bold">
            Add a document to start conversating with our bot about the uploaded
            content.
          </p>
          <p className="dark:text-white/40 text-sm text-black/40">
            Please note: We currently only accept PDFs, but we&apos;re actively
            working on supporting more file formats.
          </p>
        </div>

        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={async (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              await handleUploadDocument(file);
            }
          }}
          className="dark:hover:bg-white/20 hover:bg-black/20 dark:text-white/40 border text-center p-20 rounded-2xl cursor-pointer text-3xl text-black/40"
        >
          <input
            className="hidden"
            key={Date.now()}
            type="file"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                await handleUploadDocument(file);
              }
            }}
          />
          {isDocUploading ? (
            <div className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Uploading
            </div>
          ) : (
            "+ Add Document"
          )}
        </label>
      </div>
    </div>
  );
};

export default DocumentGuide;
