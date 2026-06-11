import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";

function Analytics() {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2">
          Overview of users and task performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">
            Total Users
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {analytics.totalUsers}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold text-indigo-600 mt-3">
            {analytics.totalTasks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">
            Completed Tasks
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            {analytics.completedTasks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">
            Pending Tasks
          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-3">
            {analytics.pendingTasks}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">
          Task Completion Rate
        </h2>

        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${
                analytics.totalTasks
                  ? (analytics.completedTasks /
                      analytics.totalTasks) *
                    100
                  : 0
              }%`,
            }}
          />
        </div>

        <p className="mt-4 text-slate-600">
          {analytics.totalTasks
            ? (
                (analytics.completedTasks /
                  analytics.totalTasks) *
                100
              ).toFixed(1)
            : 0}
          % Tasks Completed
        </p>
      </div>
    </div>
  );
}

export default Analytics;