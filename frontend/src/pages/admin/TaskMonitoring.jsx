import { useEffect, useState } from "react";
import { getAllTasks, deleteAnyTask } from "../../services/adminService";

function TaskMonitoring() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) return;

  try {
    await deleteAnyTask(id);
    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Task Monitoring
      </h1>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Created By</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="p-4">{task.title}</td>

                <td className="p-4">{task.description}</td>

                <td className="p-4">{task.createdBy?.name}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskMonitoring;
