import Link from "next/link";
import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import VisitorBadge from "../components/VisitorBadge";
import { EMAIL, SOCIALS, LAST_EDITED } from "../lib/site";
import "./globals.css";

export const metadata = {
  title: { default: "samy.lol", template: "%s – samy.lol" },
  description: "My projects, videos and notes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="wiki">
          <aside className="sidebar">
            <Link href="/" className="brand" aria-label="samy.lol home">
              <span className="brand-mark">S</span>
              <span className="brand-name">samy.lol</span>
              <span className="brand-tag">The personal homepage</span>
            </Link>

            <div className="portal">
              <h3>Navigation</h3>
              <Nav />
            </div>

            <div className="portal">
              <h3>Elsewhere</h3>
              <ul>
                {SOCIALS.map(([label, href]) => (
                  <li key={label}><a href={href} rel="noopener noreferrer" target="_blank">{label}</a></li>
                ))}
                <li><a href={`mailto:${EMAIL}`}>E-mail</a></li>
              </ul>
            </div>
          </aside>

          <div className="main">
            <Tabs />
            <main className="content">{children}</main>
            <footer className="footer">
              <p>This page was last edited on {LAST_EDITED}.</p>
              <p>
                Text is available for reading, linking and sharing. ·{" "}
                <Link href="/about">About samy.lol</Link> · <Link href="/contact">Contact</Link>
              </p>
            </footer>
          </div>
        </div>
        <VisitorBadge />
      </body>
    </html>
  );
}
