import useDocStore from "@/utils/store/doc/docStore";
import useUiStore from "@/utils/store/ui/uiStore";

const Documents = ({}) => {
  const { hoverTab, openDocs } = useUiStore();
  const { tempDocs, currentDocIndex, handleDocSelected } = useDocStore();

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 ${
        hoverTab === "docs" &&
        "bubble-docs h-full shadow-lg shadow-blue-500 min-w-[350px]"
      } ${
        openDocs ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px] "
      }  dark:bg-[#111111] bg-[#f6f8fc] p-4 flex flex-col transition-transform duration-300 ease-in-out transform `}
    >
      <button className="w-full p-4 bg-blue-800 text-white">+ New Doc</button>
      <div className="overflow-y-auto h-full scrollbar-thin">
        {tempDocs.map((doc, index) => {
          const { title } = doc;
          return (
            <div key={index} className="flex flex-col items-start my-2">
              <div
                onClick={() => handleDocSelected(index)}
                className={`${`${
                  currentDocIndex === index &&
                  "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
              >
                <div className="flex items-center justify-between px-2 w-full">
                  <div className="flex items-center gap-4">
                    <p>{title} Policy</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Documents;
