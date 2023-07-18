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
            value={currentTaskName}
            onChange={(e) => setCurrentTaskName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="bg-green-300 rounded-md px-3 py-2 text-white"
          disabled={loading.taskForm}
          onClick={() => handleTaskConfirmation(true, itemId)}
        >
          {loading.taskForm ? "Creating Task..." : "Create Task"}
        </button>
        <button
          className="bg-red-300 rounded-md px-3 py-2 text-white"
          onClick={() => handleTaskConfirmation(false, itemId)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
