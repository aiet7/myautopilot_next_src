import useDocStore from "@/utils/store/doc/docStore";
import useUiStore from "@/utils/store/ui/uiStore";

const DocumentForm = () => {
  const { openDocs, handleHistoryMenu } = useUiStore();
  const { tempDocs, currentDocIndex, inputValues, setInputValues } =
    useDocStore();
  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1024) {
          openDocs && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openDocs && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      <div className="flex-grow  overflow-auto no-scrollbar px-2">
        <h1 className="text-5xl text-center pt-4">
          {tempDocs[currentDocIndex]?.title} Policy
        </h1>
        <p className="py-10  max-w-[600px] mx-auto text-xl">
          {tempDocs[currentDocIndex]?.guide}
        </p>

        {tempDocs[currentDocIndex]?.fields.map((doc, index) => {
          const { inputField, label } = doc;
          return (
            <div key={index} className="text-md w-full">
              <div className="flex items-start h-full max-w-[600px] mx-auto gap-4">
                <div className="flex flex-grow min-w-[0]">
                  <div className="flex flex-col  w-full">
                    <p className="text-2xl font-bold">{label}</p>
                    <input
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
        <div className="max-w-[600px] mx-auto py-2">
          <button className="bg-blue-800 text-white px-4 py-2">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
