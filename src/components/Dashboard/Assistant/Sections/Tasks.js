"use client";

import { AiOutlineDelete } from "react-icons/ai";

const Tasks = ({ tasks, handleDeleteTask }) => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Tasks</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {tasks.map((task, index) => {
            const { taskName, timeStamp } = task;
            return (
              <div
                key={index}
                className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
              >
                <div className="flex justify-between">
                  <p className="break-words whitespace-pre-wrap">{taskName}</p>
                  <div className="flex">
                    <AiOutlineDelete
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleDeleteTask(index)}
                    />
                  </div>
                </div>
                <p>{new Date(timeStamp).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
