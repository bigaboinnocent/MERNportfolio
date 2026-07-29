const Hero = ({ about }) => {
  if (!about) return null;

  return (
    <section id="top" className="max-w-5xl mx-auto px-6 pt-40 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <span
          className={`w-2 h-2 rounded-full ${
            about.availableForWork ? "bg-amber animate-pulse" : "bg-slate"
          }`}
        />
        <span className="eyebrow">
          {about.availableForWork ? "status: available for work" : "status: not currently available"}
        </span>
      </div>

      <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] mb-6">
        {about.name}
      </h1>

      <p className="font-mono text-teal text-sm sm:text-base mb-8">
        {about.role} — {about.tagline}
      </p>

      <p className="max-w-2xl text-slate leading-relaxed mb-10">{about.bio}</p>

      <div className="flex flex-wrap gap-3">
        {about.resumeUrl && (
          <a
            href={about.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-amber text-ink font-mono text-xs uppercase tracking-wide rounded hover:bg-amber/90 transition-colors"
          >
            View resume
          </a>
        )}
        <a
          href="#contact"
          className="px-5 py-2.5 border border-slate/40 font-mono text-xs uppercase tracking-wide rounded hover:border-amber hover:text-amber transition-colors"
        >
          Get in touch
        </a>
      </div>

      {about.skills?.length > 0 && (
        <div className="mt-14 flex flex-wrap gap-2">
          {about.skills.map((s) => (
            <span
              key={s}
              className="font-mono text-xs px-3 py-1 rounded-full border border-slate/25 text-slate"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
