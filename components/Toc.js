// Wikipedia-style "Contents" box. items: [[id, label], ...]
export default function Toc({ items }) {
  return (
    <nav className="toc" aria-label="Contents">
      <div className="toc-title">Contents</div>
      <ol>
        {items.map(([id, label]) => (
          <li key={id}><a href={`#${id}`}>{label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
