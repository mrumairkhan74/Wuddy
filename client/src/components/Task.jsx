// Task.jsx
import React, { useState, useEffect } from "react";
import { IoTrash } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { createTasks, getTasks, deleteTasks } from "../features/taskSlice";

const Task = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);

  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", tag: "", time: "" });

  // Enum-based color map
  const tagColorMap = {
    urgent: { bg: "bg-red-900", border: "border-red-900" },
    work: { bg: "bg-green-500", border: "border-green-500" },
    meeting: { bg: "bg-blue-500", border: "border-blue-500" },
    important: { bg: "bg-red-500", border: "border-red-500" },
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      title: newTask.title,
      tag: newTask.tag || "work", // default tag if none selected
      time: newTask.time || "No deadline",
    };

    dispatch(createTasks(task)); // async thunk
    setNewTask({ title: "", tag: "", time: "" });
    setIsTaskOpen(false);
  };

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])
  const handleDelete = (id) => {
    dispatch(deleteTasks(id));
  };

  // Close modal with ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsTaskOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <div className="md:w-[300px] p-4 bg-[#206059] rounded-md m-2 ">
        <div className="flex justify-between items-center px-4 py-2 mb-2">
          <h4 className="md:text-xl text-2xl tracking-wide font-[Poppins] text-[#EBF2FD]">Today Task</h4>
          <button
            className="text-xl font-[Poppins] bg-white rounded-md px-2"
            onClick={() => setIsTaskOpen(!isTaskOpen)}
          >
            +
          </button>
        </div>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {tasks.length === 0 ? (
          <p className="text-[#EBF2FD] text-center mt-4">No tasks for today!</p>
        ) : (
          <div className="flex flex-col item-center max-h-[300px] justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
            {tasks.map((task) => (
              <div
                key={task._id || task.id}
                className="flex items-center justify-between bg-white mb-2 p-2 rounded-md"
              >
                <div
                  className={`flex-col border-l-2 ${tagColorMap[task.tag]?.border || "border-gray-500"
                    }`}
                >
                  <h4 className="text-md font-[Poppins] text-[#206059] ml-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p
                      className={`${tagColorMap[task.tag]?.bg || "bg-gray-500"
                        } text-[#EBF2FD] px-2 py-1 mx-2 rounded-md text-[9px]`}
                    >
                      {task.tag}
                    </p>
                    <p className="text-[10px] text-gray-500">Today {task.time}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="delete bg-red-500 hover:bg-red-700 p-2 rounded-md text-[#EBF2FD] cursor-pointer"
                >
                  <IoTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isTaskOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="w-[400px] bg-white rounded-md p-6">
            <h3 className="text-lg font-bold mb-4 text-[#206059]">Add Task</h3>
            <form onSubmit={addTask} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="border p-2 rounded-md outline-[#206059]"
                required
              />

              {/* Enum tags dropdown */}
              <select
                value={newTask.tag}
                onChange={(e) =>
                  setNewTask({ ...newTask, tag: e.target.value })
                }
                className="border p-2 rounded-md outline-[#206059]"
              >
                <option value="">Select Tag</option>
                <option value="urgent">Urgent</option>
                <option value="work">Work</option>
                <option value="meeting">Meeting</option>
                <option value="important">Important</option>
              </select>

              <input
                type="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewTask({ ...newTask, time: e.target.value })
                }
                className="border p-2 rounded-md outline-[#206059]"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTaskOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#206059] text-[#EBF2FD] hover:bg-[#206059]/90"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
