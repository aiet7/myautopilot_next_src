"use client";

import useAutotaskStore from "@/utils/store/admin/control/integrations/PSA/autotaskStore";
import { AiOutlineClose } from "react-icons/ai";

const Configuration = () => {
  const { setCloseConfiguration } = useAutotaskStore();
  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 flex items-center justify-center ">
      <div className="flex flex-col items-end bg-white w-full h-full p-4  text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={setCloseConfiguration}
        />
      </div>
    </div>
  );
};

export default Configuration;
