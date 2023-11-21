import { MdConstruction } from "react-icons/md";

const Document = ({}) => {
  return (
    <div className="flex-grow flex flex-col  overflow-hidden">
      <div className="dark:text-white/20 flex flex-col items-center text-black/20">
        <MdConstruction size={50} />
        <p className="text-2xl text-center">Currently Under Maintenance</p>
      </div>
      {/* <div className="flex items-center text-sm">
        <button className="w-full bg-blue-800 text-white py-1  border">
          Prompt
        </button>
        <button className="w-full py-1  border">Prime</button>
        <button className="w-full py-1  border">Workflows</button>
      </div> */}
    </div>
  );
};

export default Document;
