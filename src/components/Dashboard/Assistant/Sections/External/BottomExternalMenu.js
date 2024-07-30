"use client";
import { BsFilterLeft, BsSearch, BsThreeDotsVertical } from "react-icons/bs";

const BottomExternalMenu = () => {
  return (
    
      <div className="absolute bottom-0 w-full flex items-center gap-2 bg-white p-2">
        <BsFilterLeft size={25} />
        <BsSearch size={15} />
        <BsThreeDotsVertical size={20} />
      </div>
  
  );
};

export default BottomExternalMenu;
