const Education = ({ items }) => {
  if (!items) return null;

  return (
    <section id="education" className="section-rule max-w-5xl mx-auto px-6 py-24">
      <p className="eyebrow mb-3">academic record</p>
      <h2 className="font-display text-3xl sm:text-4xl mb-12">Education</h2>

      {items.length === 0 ? (
        <p className="text-slate font-mono text-sm">No education added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((ed) => (
            <div key={ed._id} className="border border-slate/20 rounded-lg p-6">
              <p className="font-mono text-xs text-teal uppercase tracking-wide mb-2">
                {ed.startDate} — {ed.endDate || "Present"}
              </p>
              <h3 className="font-display text-lg mb-1">{ed.institution}</h3>
              <p className="text-sm text-slate">
                {ed.degree}
                {ed.fieldOfStudy ? `, ${ed.fieldOfStudy}` : ""}
              </p>
              {ed.grade && <p className="text-xs text-slate/70 mt-1">{ed.grade}</p>}
              {ed.description && (
                <p className="text-sm text-slate/90 mt-3 leading-relaxed">{ed.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Education;
