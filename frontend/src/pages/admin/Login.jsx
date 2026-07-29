import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow mb-3">restricted area</p>
        <h1 className="font-display text-3xl mb-8">Admin login</h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-slate">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none"
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-slate">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-mono">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-2.5 bg-amber text-ink font-mono text-xs uppercase tracking-wide rounded hover:bg-amber/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-slate/60 text-xs font-mono mt-6">
          Use the ADMIN_EMAIL / ADMIN_PASSWORD you set in backend/.env
        </p>
      </div>
    </div>
  );
};

export default Login;
