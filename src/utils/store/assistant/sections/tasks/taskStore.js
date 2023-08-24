import { create } from "zustand";
import useUserStore from "../../../user/userStore";
import { handleGetTasks } from "../../../../api/serverProps";

const useTasksStore = create((set, get) => ({
  tasks: [],
  activeTaskButton: "In Progress",
  userTaskNameInput: "",

  initializeTasks: async () => {
    const userStore = useUserStore.getState();
    if (userStore.user) {
      const tasks = await handleGetTasks(userStore.user.id);
      set({ tasks });
    }
  },

  setActiveTaskButton: (button) => set({ activeTaskButton: button }),

  setUserTaskNameInput: (inputValue) => set({ userTaskNameInput: inputValue }),

  setTasks: (initialTasks) => set({ tasks: initialTasks }),

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  handleUpdateTaskCompletion: (taskId, completed) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: completed } : task
      ),
    })),

  handleDeleteTask: async (taskId) => {
    const currentTasks = get().tasks;
    const taskToDelete = currentTasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteTask?taskId=${taskToDelete.id}`
        );
        if (response.ok) {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  handleAddTask: async (userTaskNameInput) => {
    const userStore = useUserStore.getState();
    if (get().userTaskNameInput.trim() !== "") {
      try {
        const taskResponse = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/addTask`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userStore.user.id,
              taskName: userTaskNameInput,
            }),
          }
        );

        if (taskResponse.status === 200) {
          const newTask = await taskResponse.json();
          get().addTask(newTask);
        }
      } catch (e) {
        console.error(e);
      }
      set({ userTaskNameInput: "" });
    }
  },

  handleToggleTaskCompletion: async (taskId, completed) => {
    let url = completed
      ? `https://etech7-wf-etech7-db-service.azuremicroservices.io/completedTask?taskId=${taskId}`
      : `https://etech7-wf-etech7-db-service.azuremicroservices.io/notCompletedTask?taskId=${taskId}`;

    try {
      const taskResponse = await fetch(url);
      if (taskResponse.status === 200) {
        get().handleUpdateTaskCompletion(taskId, completed);
      }
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useTasksStore;
