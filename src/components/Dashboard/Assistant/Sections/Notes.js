"use client";

const Notes = () => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Notes</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin"></div>
    </div>
  );
};

export default Notes;
