import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const load = () => api.get("/contact").then(({ data }) => setMessages(data));

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    await load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    await load();
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow mb-1">inbox</p>
        <h2 className="font-display text-2xl">Messages</h2>
      </div>

      {messages.length === 0 && <p className="font-mono text-sm text-slate">No messages yet.</p>}

      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`border rounded-lg p-4 ${m.read ? "border-slate/20" : "border-amber/50"}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-display">{m.name}</p>
              <p className="font-mono text-[11px] text-slate">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="font-mono text-xs text-teal mb-2">{m.email}</p>
            <p className="text-sm text-slate/90 leading-relaxed mb-3">{m.message}</p>
            <div className="flex gap-4 font-mono text-xs uppercase">
              {!m.read && (
                <button onClick={() => markRead(m._id)} className="text-teal hover:underline">
                  Mark read
                </button>
              )}
              <button onClick={() => remove(m._id)} className="text-red-400 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
