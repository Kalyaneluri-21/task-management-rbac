import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Admin Dashboard
      </h1>

      <p className="text-slate-500 mb-8">
        Monitor users and tasks
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {analytics.totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {analytics.totalTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">
            Completed Tasks
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {analytics.completedTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-gray-500 text-sm">
            Pending Tasks
          </h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {analytics.pendingTasks}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;