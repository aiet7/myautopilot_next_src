import useBrandingStore from "@/utils/store/admin/control/branding/brandingStore";
import Image from "next/image";
import CompactPicker from "react-color/lib/Compact";

const Branding = () => {
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
    <div className="w-full h-full flex flex-col ">
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Branding</h1>
      </div>
      <div className="dark:shadow-white/40 dark:border-white/20 overflow-hidden flex flex-col lg:dark:shadow-white/40 lg:border lg:shadow lg:my-12 lg:mx-4 ">
        <div className="flex flex-col gap-6 overflow-auto scrollbar-thin">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-lg border-b">Logo Branding</h2>
            <div className="flex flex-col gap-20 md:flex-row">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold">Current Logo: </p>
                <div className="border h-44 flex items-center justify-center md:w-72 lg:w-96">
                  <Image
                    alt="Your Logo"
                    src="/images/etech7_logo.webp"
                    width={150}
                    height={150}
                    priority={true}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold">Upload Logo: </p>
                <div className="border  h-44 flex items-center justify-center md:w-72 lg:w-96">
                  <p className="dark:text-white/40 text-black/20">
                    Upload Logo
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-lg border-b">Application Branding</h2>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col">
                <p className="text-sm">Primary Color</p>
                <div className="relative flex">
                  <div
                    style={{ backgroundColor: primaryColor.color }}
                    className="w-9 h-9 border"
                  />
                  <input
                    type="text"
                    className="px-2 py-1 outline-none border"
                    value={primaryColor.color}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    onClick={() => handleShowColorPicker("primaryColor")}
                  />
                  {primaryColor.showColorPicker && (
                    <div className="absolute top-7 z-[99] p-2">
                      <CompactPicker
                        color={primaryColor.color}
                        onChangeComplete={(color) => setPrimaryColor(color.hex)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Primary Button Color</p>
                <div className="relative flex">
                  <div
                    style={{ backgroundColor: primaryButtonColor.color }}
                    className="w-9 h-9 border"
                  />
                  <input
                    type="text"
                    className="px-2 py-1 outline-none border"
                    value={primaryButtonColor.color}
                    onChange={(e) => setPrimaryButtonColor(e.target.value)}
                    onClick={() => handleShowColorPicker("primaryButtonColor")}
                  />
                  {primaryButtonColor.showColorPicker && (
                    <div className="absolute top-7 z-[99] p-2">
                      <CompactPicker
                        color={primaryButtonColor.color}
                        onChangeComplete={(color) =>
                          setPrimaryButtonColor(color.hex)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Secondary Button Color</p>
                <div className="relative flex">
                  <div
                    style={{ backgroundColor: secondaryButtonColor.color }}
                    className="w-9 h-9 border"
                  />
                  <input
                    type="text"
                    className="px-2 py-1 outline-none border"
                    value={secondaryButtonColor.color}
                    onChange={(e) => setSecondaryButtonColor(e.target.value)}
                    onClick={() =>
                      handleShowColorPicker("secondaryButtonColor")
                    }
                  />
                  {secondaryButtonColor.showColorPicker && (
                    <div className="absolute top-7 z-[99] p-2">
                      <CompactPicker
                        color={secondaryButtonColor.color}
                        onChangeComplete={(color) =>
                          setSecondaryButtonColor(color.hex)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
