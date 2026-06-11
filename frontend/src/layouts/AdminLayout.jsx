import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">{user?.name}</p>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/tasks"
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/admin/logs"
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Activity Logs
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-slate-100"
              }`
            }
          >
            Analytics
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 text-white py-3 rounded-lg"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
