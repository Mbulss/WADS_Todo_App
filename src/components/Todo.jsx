import React, { useState } from "react";

const Todo = ({ todo, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || "");
  const [editedDueTime, setEditedDueTime] = useState(todo.dueTime || "");
  const [editError, setEditError] = useState("");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setShowDeleteConfirm(true);
  };

  const confirmDeletion = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const handleSave = () => {
    if (editedText.trim() === "") {
      setEditError("Task text cannot be empty");
      return;
    }
    if (!editedDueDate) {
      setEditError("Due date cannot be empty");
      return;
    }
    if (!editedDueTime) {
      setEditError("Due time cannot be empty");
      return;
    }
    setEditError("");
    onEdit(todo.id, editedText, editedPriority, editedDueDate, editedDueTime);
    setIsEditing(false);
  };

  // Set the color based on priority
  let priorityColor = "";
  switch (todo.priority) {
    case "High":
      priorityColor = "text-red-500";
      break;
    case "Medium":
      priorityColor = "text-yellow-500";
      break;
    case "Low":
      priorityColor = "text-green-500";
      break;
    default:
      priorityColor = "text-gray-500";
  }

  return (
    <div className="bg-gray-50 border-2 border-gray-100 rounded-xl p-4 mb-2 transition-all duration-200 hover:shadow-lg relative">
      <div className="flex items-start gap-4">
        {/* Render checkbox only if not editing */}
        {!isEditing && (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id, todo.completed)}
            className="h-5 w-5 mt-1 rounded focus:ring-primary focus:ring-2 text-primary border-gray-300"
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col">
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="mb-2 px-3 py-2 rounded border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200"
              />
              <div className="flex flex-wrap gap-2">
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                  className="px-2 py-2 rounded border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <input
                  type="date"
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                  className="px-2 py-2 rounded border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200"
                />
                <input
                  type="time"
                  value={editedDueTime}
                  onChange={(e) => setEditedDueTime(e.target.value)}
                  className="px-2 py-2 rounded border border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200"
                />
              </div>
              {editError && (
                <div className="text-red-500 mt-1 text-sm">{editError}</div>
              )}
            </div>
          ) : (
            <span
              className={`block text-lg ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
          )}

          {/* Due Date/Time Info (only when not editing) */}
          {!isEditing && todo.dueDate && todo.dueTime && (
            <div className="mt-1 text-sm text-gray-600">
              Due: {new Date(todo.dueDate).toLocaleDateString()} at{" "}
              {todo.dueTime}
            </div>
          )}
        </div>

        {/* Right-Side Container: Priority above the 3-dot menu or Save button */}
        <div className="flex flex-col items-end gap-2">
          {!isEditing && (
            <span className={`font-bold ${priorityColor}`}>
              {todo.priority}
            </span>
          )}

          {isEditing ? (
            <button
              onClick={handleSave}
              className="h-10 px-4 rounded-lg text-sm font-semibold bg-secondary text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all duration-200"
            >
              Save
            </button>
          ) : (
            <>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                {/* 3-dot icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zM12 13.125a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zM12 19.5a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25z"
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-4 top-14 z-10 w-24 bg-white border border-gray-200 rounded shadow-lg">
                  <button
                    onClick={handleEditClick}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletion}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
