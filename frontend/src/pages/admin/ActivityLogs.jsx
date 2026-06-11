import { useEffect, useState } from "react";
import { getLogs } from "../../services/adminService";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Activity Logs
      </h1>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Action</th>
              <th className="text-left p-4">Task</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                className="border-t"
              >
                <td className="p-4">
                  {log.userName || "N/A"}
                </td>

                <td className="p-4">
                  {log.action}
                </td>

                <td className="p-4">
                  {log.taskTitle || "-"}
                </td>

                <td className="p-4">
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityLogs;