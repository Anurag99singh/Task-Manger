import { useState, useEffect } from "react";
import axios from "axios";
import TaskManager from "./Components/TaskManager";
import InputDescription from "./Components/InputDescription";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:5000/tasks", {
        title,
        description,
        completed: false,
      })
      .then((res) => setTasks([...tasks, res.data]));
  };

  const updateTask = (id) => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
      })
      .then((res) => {
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        setEditingTask(null);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)));
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-[#adcbaa] rounded-lg shadow-md">
      <TaskManager />
      <InputDescription
        setTitle={setTitle}
        setDescription={setDescription}
        addTask={addTask}
      />

      <ul className="mt-5 space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-3 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 border-l-4 border-blue-500  "
          >
            {editingTask === task._id ? (
              <div className="flex flex-col gap-2">
                <input
                  className="border p-2 rounded-md"
                  defaultValue={task.title}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <input
                  className="border p-2 rounded-md"
                  defaultValue={task.description}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={() => updateTask(task._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
            )}
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={() => setEditingTask(task._id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
