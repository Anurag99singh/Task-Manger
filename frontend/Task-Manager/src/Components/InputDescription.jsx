import React from "react";

function InputDescription({ setTitle, setDescription, addTask }) {
  return (
    <div className="flex flex-col gap-3">
      <input
        className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-orange-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600  transition duration-300 "
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}

export default InputDescription;
