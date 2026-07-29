import { useState } from "react";
import api from "../api/axios.js";

const initial = { name: "", email: "", message: "" };

const ContactForm = ({ email }) => {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm(initial);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-rule max-w-5xl mx-auto px-6 py-24">
      <p className="eyebrow mb-3">say hello</p>
      <h2 className="font-display text-3xl sm:text-4xl mb-4">Contact</h2>
      {email && (
        <p className="text-slate text-sm mb-10">
          Prefer email? Reach me directly at{" "}
          <a href={`mailto:${email}`} className="text-amber hover:underline">
            {email}
          </a>
          .
        </p>
      )}

      <form onSubmit={onSubmit} className="max-w-xl space-y-5">
        <div>
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-slate">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={onChange}
            className="w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-slate">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className="w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-slate">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={onChange}
            className="w-full mt-1 bg-transparent border border-slate/30 rounded px-4 py-2.5 focus:border-amber outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 bg-amber text-ink font-mono text-xs uppercase tracking-wide rounded hover:bg-amber/90 transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        {status === "sent" && (
          <p className="text-teal text-sm font-mono">Message received. I'll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm font-mono">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
};

export default ContactForm;
