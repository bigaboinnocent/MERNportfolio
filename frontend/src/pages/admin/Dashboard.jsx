import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const tabs = [
  { to: "/admin/about", label: "About" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/education", label: "Education" },
  { to: "/admin/messages", label: "Messages" },
];

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate/20 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="eyebrow">dashboard</p>
          <h1 className="font-display text-xl">Manage your portfolio</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer" className="font-mono text-xs text-slate hover:text-amber">
            View site ↗
          </a>
          <button
            onClick={onLogout}
            className="font-mono text-xs uppercase tracking-wide border border-slate/30 rounded px-3 py-1.5 hover:border-amber hover:text-amber transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row">
        <nav className="sm:w-48 shrink-0 border-b sm:border-b-0 sm:border-r border-slate/20 px-4 py-4 sm:py-8">
          <ul className="flex sm:flex-col gap-1 flex-wrap">
            {tabs.map((t) => (
              <li key={t.to}>
                <NavLink
                  to={t.to}
                  className={({ isActive }) =>
                    `block font-mono text-xs uppercase tracking-wide px-3 py-2 rounded transition-colors ${
                      isActive ? "bg-amber text-ink" : "text-slate hover:text-amber"
                    }`
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 px-6 py-8 max-w-3xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
