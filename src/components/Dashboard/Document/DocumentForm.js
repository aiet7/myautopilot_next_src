import useDocumentStore from "@/utils/store/assistant/sections/document/documentStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useEffect } from "react";

const DocumentForm = () => {
  const { user } = useUserStore();
  const { openAssistant, handleAssistantMenu } = useUiStore();
  const {
    blobLink,
    tempDocs,
    currentDocIndex,
    inputValues,
    setInputValues,
    handleSubmitDoc,
  } = useDocumentStore();

  useEffect(() => {
    if (user) {
      setInputValues("companyName", user.companyName || "");
      setInputValues("name", `${user.firstName} ${user.lastName}` || "");
      setInputValues("email", user.email || "");
      setInputValues("date", new Date().toISOString().split("T")[0]);
    }
  }, [user, currentDocIndex]);
  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1024) {
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAssistant && "lg:opacity-100 opacity-5 xl:mr-[350px]"
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      <div className="flex-grow overflow-auto no-scrollbar px-2">
        <h1 className="text-5xl text-center pt-4">
          {tempDocs[currentDocIndex]?.title} Policy
        </h1>
        <p className="py-10 max-w-[600px] mx-auto text-xl">
          {tempDocs[currentDocIndex]?.guide}
        </p>

        {tempDocs[currentDocIndex]?.fields.map((doc, index) => {
          const { inputField, label } = doc;
          return (
            <div key={index} className="text-md w-full">
              <div className="flex items-start  h-full max-w-[600px] mx-auto gap-4">
                <div className="flex flex-grow min-w-[0]">
                  <div className="flex flex-col w-full">
                    <p className="text-2xl font-bold">{label}</p>
                    <input
                      type={inputField === "date" ? "datetime-local" : "text"}
                      value={inputValues[inputField] || ""}
                      className="border p-4"
                      onChange={(e) =>
                        setInputValues(inputField, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col  gap-2 items-start max-w-[600px] mx-auto py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleSubmitDoc(tempDocs[currentDocIndex]?.title, inputValues)
              }
              className="w-[100px] bg-blue-800 text-white px-4 py-2"
            >
              Submit
            </button>

            {blobLink && (
              <a
                href={blobLink}
                download={`${tempDocs[currentDocIndex]?.title}_Etech7.docx`}
                className="flex items-center "
              >
                <span className="bg-blue-800 text-white px-4 py-2">
                  Download
                </span>
                <AiOutlineArrowDown
                  size={40}
                  className="bg-blue-600 text-white p-3"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
