const TaskForm = ({
  currentTaskName,
  setCurrentTaskName,
  loading,
  handleTaskConfirmation,
  itemId,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Task Name</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentTaskName || ""}
            onChange={(e) => setCurrentTaskName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="border border-white/30 bg-blue-800 px-3 py-1 text-white"
          disabled={loading.taskForm}
          onClick={() => handleTaskConfirmation(true, itemId)}
        >
          {loading.taskForm ? "Creating Task..." : "Create Task"}
        </button>
        <button
          className="dark:text-white dark:border-white/30 border border-blue-800 px-3 py-1 text-blue-800"
          onClick={() => handleTaskConfirmation(false, itemId)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
