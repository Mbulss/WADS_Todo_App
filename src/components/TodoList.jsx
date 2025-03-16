import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Todo from "./Todo";
import { useAuth } from "../contexts/AuthContext";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newDueDate, setNewDueDate] = useState("");
  const [newDueTime, setNewDueTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const q = query(
          collection(db, "todos"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const todosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [user]);

  // Assign numeric values so High < Medium < Low
  function priorityValue(priority) {
    switch (priority) {
      case "High":
        return 1;
      case "Medium":
        return 2;
      case "Low":
        return 3;
      default:
        return 99;
    }
  }

  // Filter tasks by Completed/Pending
  function applyFilter(list) {
    if (filter === "Completed") {
      return list.filter((todo) => todo.completed);
    } else if (filter === "Pending") {
      return list.filter((todo) => !todo.completed);
    }
    return list; // 'All'
  }

  // Always sort by priority: High > Medium > Low
  function applyPrioritySort(list) {
    const sorted = [...list];
    sorted.sort((a, b) => {
      return priorityValue(a.priority) - priorityValue(b.priority);
    });
    return sorted;
  }

  const filtered = applyFilter(todos);
  const finalTodos = applyPrioritySort(filtered);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields for new task
    if (!newTodo.trim()) {
      setError("Task cannot be empty");
      return;
    }
    if (!newDueDate) {
      setError("Due date cannot be empty");
      return;
    }
    if (!newDueTime) {
      setError("Due time cannot be empty");
      return;
    }
    setError("");

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: newTodo,
        completed: false,
        timestamp: new Date(),
        userId: user.uid,
        priority: newPriority,
        dueDate: newDueDate,
        dueTime: newDueTime,
      });

      setTodos([
        ...todos,
        {
          id: docRef.id,
          text: newTodo,
          completed: false,
          userId: user.uid,
          priority: newPriority,
          dueDate: newDueDate,
          dueTime: newDueTime,
        },
      ]);
      setNewTodo("");
      setNewPriority("Medium");
      setNewDueDate("");
      setNewDueTime("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Remove confirmation from here since it's now handled in Todo.jsx
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = async (id, newText, newPriority, newDueDate, newDueTime) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        text: newText,
        priority: newPriority,
        dueDate: newDueDate,
        dueTime: newDueTime,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                text: newText,
                priority: newPriority,
                dueDate: newDueDate,
                dueTime: newDueTime,
              }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, { completed: !currentStatus });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling complete status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-800 to-purple-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Add New Task Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Task */}
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">Task</label>
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter task..."
                    className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200 w-full"
                  />
                </div>
                {/* Priority */}
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200 w-full"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                {/* Due Date */}
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200 w-full"
                  />
                </div>
                {/* Due Time */}
                <div className="flex flex-col">
                  <label className="font-bold text-gray-700 mb-1">Due Time</label>
                  <input
                    type="time"
                    value={newDueTime}
                    onChange={(e) => setNewDueTime(e.target.value)}
                    className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 transition-colors duration-200 w-full"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 h-12 w-full bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-lg"
              >
                Add Task
              </button>
            </form>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label htmlFor="filter" className="font-semibold">
                  Filter:
                </label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              {finalTodos.length === 0 ? (
                todos.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      You don't have a Todo list yet. Add one above!
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No tasks match your filter.
                    </p>
                  </div>
                )
              ) : (
                finalTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onToggleComplete={handleToggleComplete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
