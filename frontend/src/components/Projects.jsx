const Projects = ({ projects }) => {
  if (!projects) return null;

  return (
    <section id="projects" className="section-rule max-w-5xl mx-auto px-6 py-24">
      <p className="eyebrow mb-3">selected work</p>
      <h2 className="font-display text-3xl sm:text-4xl mb-12">Projects</h2>

      {projects.length === 0 ? (
        <p className="text-slate font-mono text-sm">No projects added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p._id}
              className="bg-paper text-ink rounded-lg p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
            >
              <div>
                {p.featured && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-teal">
                    featured
                  </span>
                )}
                <h3 className="font-display text-xl mt-1 mb-2">{p.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed mb-4">{p.description}</p>
                {p.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-ink/5 text-ink/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-4 font-mono text-xs uppercase tracking-wide">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-teal hover:underline">
                    Live ↗
                  </a>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-ink/60 hover:underline">
                    Code ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
