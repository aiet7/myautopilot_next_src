import useBrandingStore from "@/utils/store/admin/control/branding/brandingStore";
import Image from "next/image";
import CompactPicker from "react-color/lib/Compact";
import useUiStore from "@/utils/store/ui/uiStore";

const Branding = () => {
  const { openAdmin, handleHistoryMenu } = useUiStore();

  const {
    primaryColor,
    primaryButtonColor,
    secondaryButtonColor,
    setPrimaryColor,
    setPrimaryButtonColor,
    setSecondaryButtonColor,
    handleShowColorPicker,
  } = useBrandingStore();

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Branding</h1>
      </div>
      <div className="flex flex-col  h-full overflow-hidden pb-4">
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-col gap-7  overflow-hidden">
            <div className="flex flex-col overflow-hidden px-4">
              <div className="flex flex-col items-start py-4 gap-1">
                <h2 className="text-xl font-bold">Add your own unique style</h2>
                <p className="">
                  Add your own logo, brand colors, images and your subdomain.
                  You can change this whenever you want.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Brand logo</p>
                <input type="file" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]  bg-[#465E89] text-white self-end text-white rounded-lg py-2 px-10 font-bold m-2">
        Save
      </button>
    </div>
  );
};

export default Branding;
