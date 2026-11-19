import { EMAIL, SOCIALS } from "../../lib/site";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <h1>Contact</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>Want to reach me about a project, a collab or the site? Here&apos;s where to find me.</p>

      <table className="wikitable">
        <tbody>
          <tr><th>E-mail</th><td><a href={`mailto:${EMAIL}`}>{EMAIL}</a></td></tr>
          {SOCIALS.map(([label, href, text]) => (
            <tr key={label}><th>{label}</th><td><a href={href} rel="noopener noreferrer" target="_blank">{text}</a></td></tr>
          ))}
        </tbody>
      </table>

      <h2>Send a message</h2>
      {/* No server needed: this opens the visitor's e-mail app with the message filled in. */}
      <form className="form" action={`mailto:${EMAIL}`} method="post" encType="text/plain">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" />
        <label htmlFor="msg">Message</label>
        <textarea id="msg" name="message" />
        <button className="button" type="submit">Send</button>
      </form>
    </>
  );
}
