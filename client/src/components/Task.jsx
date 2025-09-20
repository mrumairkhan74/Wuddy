import React, { useState } from 'react'
import { IoTrash } from "react-icons/io5";

const Task = () => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design new logo", tag: "important", color: "red", time: "5:00 PM" },
    { id: 2, title: "Meeting", tag: "work", color: "purple", time: "5:00 PM" },
    { id: 5, title: "Get Together", tag: "enjoy", color: "red", time: " 5:00 PM" },
  ]);

  const [newTask, setNewTask] = useState({ title: "", tag: "", time: "" });

  const colorMap = {
    red: { bg: "bg-red-500", border: "border-red-500" },
    blue: { bg: "bg-blue-500", border: "border-blue-500" },
    purple: { bg: "bg-purple-500", border: "border-purple-500" },
    green: { bg: "bg-green-500", border: "border-green-500" },
    yellow: { bg: "bg-yellow-500", border: "border-yellow-500" },
  };



  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.title,
        tag: newTask.tag || "general",
        color: newTask.color || "blue",
        time: newTask.time || "No deadline"
      }
    ]);
    setNewTask({ title: "", tag: "", time: "" });
    setIsTaskOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };



  return (
    <>
      {/* Task Sidebar (desktop only) */}
      <div className="w-[300px] p-4 bg-[#206059] rounded-md m-2 ">
        <div className="flex justify-between items-center px-4 py-2 mb-2">
          <h4 className="md:text-xl font-[Poppins] text-[#EBF2FD]">Today Task</h4>
          <button
            className="text-xl font-[Poppins] bg-white rounded-md px-2"
            onClick={() => setIsTaskOpen(!isTaskOpen)}
          >
            +
          </button>
        </div>

        {/* Task list */}
        {
          tasks.length === 0 ? (
            <p className="text-[#EBF2FD] text-center mt-4">No tasks for today!</p>
          ) : (
            <div className="flex flex-col item-center max-h-[300px] justify-between overflow-y-auto">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between bg-white mb-2 p-2 rounded-md"
                >
                  <div className={`flex-col border-l-2 ${colorMap[task.color]?.border || "border-gray-500"}`}>
                    <h4 className="text-md font-[Poppins] text-[#206059] ml-2">
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <p
                        className={`${colorMap[task.color]?.bg || "bg-gray-500"} text-[#EBF2FD] px-2 py-1 mx-2 rounded-md text-[9px]`}
                      >
                        {task.tag}
                      </p>
                      <p className="text-[10px] text-gray-500">Today {task.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete bg-red-500 hover:bg-red-700 p-2 rounded-md text-[#EBF2FD] cursor-pointer"
                  >
                    <IoTrash />
                  </button>
                </div>
              ))}
            </div>
          )
        }
      </div>

      {/* Add Task Modal */}
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
              <input
                type="text"
                placeholder="Tag (e.g. work, urgent)"
                value={newTask.tag}
                onChange={(e) =>
                  setNewTask({ ...newTask, tag: e.target.value })
                }
                className="border p-2 rounded-md outline-[#206059]"
              />
              <input
                type="text"
                placeholder="Deadline (e.g. Today, 6:00 PM)"
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
