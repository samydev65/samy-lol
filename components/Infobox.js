import Sprite from "./Sprite";

// Wikipedia-style info box.
// rows: [[label, value], ...]  — a row with only a label becomes a section header.
// image: what to show at the top (defaults to my pixel-art sprite).
export default function Infobox({ title, caption, rows, image }) {
  return (
    <table className="infobox">
      <tbody>
        <tr><th colSpan={2} className="infobox-title">{title}</th></tr>
        <tr>
          <td colSpan={2} className="infobox-image">
            {image ?? <Sprite />}
            {caption && <div className="infobox-caption">{caption}</div>}
          </td>
        </tr>
        {rows.map(([k, v]) =>
          v === undefined ? (
            <tr key={k}><th colSpan={2} className="infobox-header">{k}</th></tr>
          ) : (
            <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
          )
        )}
      </tbody>
    </table>
  );
}
