import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserStatus,
  deleteUser,
} from "../../services/adminService";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (
    id,
    currentStatus
  ) => {
    try {
      await updateUserStatus(
        id,
        currentStatus === "Active"
          ? "Inactive"
          : "Active"
      );

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await deleteUser(id);
    fetchUsers();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        User Management
      </h1>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">
                Name
              </th>
              <th className="text-left p-4">
                Email
              </th>
              <th className="text-left p-4">
                Status
              </th>
              <th className="text-left p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        user._id,
                        user.status
                      )
                    }
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                  >
                    Toggle Status
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded-lg"
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

export default UserManagement;