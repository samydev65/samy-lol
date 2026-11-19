import ContactForm from "../../components/ContactForm";
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

      <h2>Send me a message</h2>
      <p>Fill this in and it lands straight in my inbox. Leave your e-mail so I can write back.</p>
      <ContactForm />
    </>
  );
}
