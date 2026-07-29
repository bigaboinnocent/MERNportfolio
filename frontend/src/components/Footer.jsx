const Footer = ({ about }) => {
  const socials = about?.socials || {};
  const entries = Object.entries(socials).filter(([, v]) => v);

  return (
    <footer className="section-rule max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-slate">
        © {new Date().getFullYear()} {about?.name || ""}
      </p>
      <div className="flex gap-5">
        {entries.map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-amber transition-colors"
          >
            {key}
          </a>
        ))}
        <a
          href="/admin/login"
          className="font-mono text-xs uppercase tracking-wide text-slate/40 hover:text-amber transition-colors"
        >
          admin
        </a>
      </div>
    </footer>
  );
};

export default Footer;
