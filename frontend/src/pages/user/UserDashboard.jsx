import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../services/taskService";

function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  const { user, logout } = useContext(AuthContext);
  console.log(user)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateTask(id, {
        status: "Completed",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(formData);

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Task Dashboard
            </h1>

            <p className="text-slate-500 mt-1">Welcome back, {user?.name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-gray-500 text-sm">Total Tasks</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-gray-500 text-sm">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {tasks.filter((task) => task.status === "Completed").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-gray-500 text-sm">Pending</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {tasks.filter((task) => task.status === "Pending").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Create New Task</h2>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              Create Task
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">My Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4">Title</th>
                    <th className="text-left py-4">Description</th>
                    <th className="text-left py-4">Status</th>
                    <th className="text-left py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-b hover:bg-slate-50">
                      <td className="py-4">{task.title}</td>

                      <td className="py-4">{task.description}</td>

                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleComplete(task._id)}
                            disabled={task.status === "Completed"}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg text-sm"
                          >
                            Complete
                          </button>

                          <button
                            onClick={() => handleDelete(task._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
