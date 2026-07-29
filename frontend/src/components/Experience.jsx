const Experience = ({ items }) => {
  if (!items) return null;

  return (
    <section id="experience" className="section-rule max-w-5xl mx-auto px-6 py-24">
      <p className="eyebrow mb-3">career log</p>
      <h2 className="font-display text-3xl sm:text-4xl mb-12">Experience</h2>

      {items.length === 0 ? (
        <p className="text-slate font-mono text-sm">No experience added yet.</p>
      ) : (
        <ol className="space-y-10">
          {items.map((e) => (
            <li key={e._id} className="grid sm:grid-cols-[140px_1fr] gap-3 sm:gap-8">
              <div className="font-mono text-xs text-teal uppercase tracking-wide">
                {e.startDate} — {e.endDate}
              </div>
              <div>
                <h3 className="font-display text-xl">{e.role}</h3>
                <p className="font-mono text-sm text-amber mb-2">
                  {e.company}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.description && (
                  <p className="text-slate text-sm leading-relaxed mb-2">{e.description}</p>
                )}
                {e.highlights?.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-slate/90 space-y-1">
                    {e.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default Experience;
