"use client";

import { useEffect } from "react";
import useTasksStore from "../../../../utils/store/assistant/sections/tasks/taskStore";
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineMinus,
} from "react-icons/ai";

const Tasks = ({}) => {
  const {
    tasks,
    userTaskNameInput,
    activeTaskButton,
    setUserTaskNameInput,
    setActiveTaskButton,
    handleAddTask,
    handleToggleTaskCompletion,
    handleDeleteTask,
    initializeTasks,
  } = useTasksStore();

  useEffect(() => {
    initializeTasks();
  }, []);

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Tasks</h3>
      <div className="flex flex-col gap-1 w-full">
        <textarea
          value={userTaskNameInput}
          onChange={(e) => setUserTaskNameInput(e.target.value)}
          className="px-2 py-1 scrollbar-thin min-h-[100px] max-h-[200px]"
          placeholder="Task"
        />
        <button
          onClick={() => handleAddTask(userTaskNameInput)}
          className="flex items-center justify-center gap-1 bg-blue-800 py-2 text-white font-bold"
        >
          <AiOutlinePlus size={25} />
          Add Task
        </button>
      </div>
      <div className="dark:border-white/20 flex  items-center border rounded">
        <button
          onClick={() => setActiveTaskButton("In Progress")}
          className={`${
            activeTaskButton === "In Progress" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTaskButton("Complete")}
          className={`${
            activeTaskButton === "Complete" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Complete
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {tasks
            .filter(
              (task) =>
                (activeTaskButton === "In Progress" && !task.completed) ||
                (activeTaskButton === "Complete" && task.completed)
            )
            .map((task, index) => {
              const { id, taskName, timeStamp } = task;
              return (
                <div
                  key={index}
                  className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
                >
                  <div className="flex justify-between">
                    <p className="break-words whitespace-pre-wrap">
                      {taskName}
                    </p>
                    <div className="flex gap-2">
                      {!task.completed ? (
                        <AiOutlineCheck
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleToggleTaskCompletion(id, true)}
                        />
                      ) : (
                        <AiOutlineMinus
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleToggleTaskCompletion(id, false)}
                        />
                      )}
                      <AiOutlineDelete
                        size={20}
                        className="cursor-pointer"
                        onClick={() => handleDeleteTask(id)}
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
