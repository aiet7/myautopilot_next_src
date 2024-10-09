"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useUserStore from "@/utils/store/user/userStore";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

const CreateAssistant = () => {
  const { user } = useUserStore();

  const {
    formError,
    loadingAssistant,
    assistantInputs,
    setCreateAssistantMode,
    setAssistantInputs,
    setAssistantObjectives,
    setAssistantRemoveObjectives,
    setAssistantObjectiveInputs,
    handleSaveAssistant,
  } = useConversationStore();

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex flex-col gap-2">
        <IoMdArrowRoundBack
          onClick={() => setCreateAssistantMode(false)}
          className="cursor-pointer  self-end"
          size={30}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex  flex-col overflow-y-auto max-h-[700px] scrollbar-thin ">
          <div>
            <span className="font-bold">Agent Name</span>
            <input
              value={assistantInputs?.agentName || ""}
              onChange={(e) => setAssistantInputs("agentName", e.target.value)}
              className={`h-[50px] px-4 w-full border ${
                formError?.agentName ? "border-red-500" : "border-transparent"
              }`}
            />
          </div>
          <div>
            <span className="font-bold">Role</span>
            <textarea
              value={assistantInputs?.role || ""}
              onChange={(e) => setAssistantInputs("role", e.target.value)}
              className={`w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded border ${
                formError?.role ? "border-red-500" : "border-transparent"
              }`}
            />
          </div>
          <div>
            <span className="font-bold">Description</span>
            <textarea
              value={assistantInputs?.description || ""}
              onChange={(e) =>
                setAssistantInputs("description", e.target.value)
              }
              className={`w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded border ${
                formError?.description ? "border-red-500" : "border-transparent"
              }`}
            />
          </div>
          <div>
            <span className="font-bold">Objectives</span>
            {assistantInputs?.objectives?.map((objective, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  className={`h-[50px] px-4 w-full border ${
                    formError?.objectives
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                  value={objective}
                  onChange={(e) =>
                    setAssistantObjectiveInputs(index, e.target.value)
                  }
                />
                <button
                  onClick={setAssistantObjectives}
                  className="hover:bg-[#FFFFFF] hover:text-[#465E89] transition ease-in  bg-[#465E89] flex items-center justify-center w-14 h-12 text-2xl font-bold  text-white rounded"
                >
                  +
                </button>
                {assistantInputs?.objectives?.length > 1 && (
                  <button
                    onClick={setAssistantRemoveObjectives}
                    className="hover:bg-[#FFFFFF] hover:text-[#465E89] transition ease-in  bg-red-500 flex items-center justify-center w-14 h-12 text-2xl font-bold  text-white rounded"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 py-2  text-lg lg:p-0">
        <button
          onClick={() => handleSaveAssistant(user?.mspCustomDomain, user?.id)}
          className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full"
        >
          {loadingAssistant ? (
            <span className="flex items-center gap-2 justify-center">
              Creating Assistant <FaSpinner className="animate-spin" />
            </span>
          ) : (
            "Save Assistant"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateAssistant;
