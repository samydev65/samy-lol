import fs from "node:fs";
import path from "node:path";

// Your portrait lives at public/me.png (drawn by scripts/draw-sprite.mjs).
const PHOTO = "/me.png";
const hasPhoto = () => fs.existsSync(path.join(process.cwd(), "public", PHOTO));

// rows: [[label, value], ...]  — a row with only a label becomes a section header.
export default function Infobox({ title, caption, rows }) {
  return (
    <table className="infobox">
      <tbody>
        <tr><th colSpan={2} className="infobox-title">{title}</th></tr>
        <tr>
          <td colSpan={2} className="infobox-image">
            {hasPhoto() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={PHOTO} alt={caption} width={256} height={320} />
            ) : (
              <div className="photo-placeholder">Photo coming soon</div>
            )}
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
