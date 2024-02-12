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
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Branding</h1>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex flex-col text-xl overflow-hidden">
          <div className="flex flex-col gap-7 text-xl overflow-hidden">
            <div className="flex flex-col overflow-hidden px-4">
              <div className="flex flex-col items-start py-4 gap-1">
                <h2 className="text-lg font-bold">Add your own unique style</h2>
                <p className="text-sm">Add your own logo, brand colors, images and your subdomain.  You can change this whenever you want.</p>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
