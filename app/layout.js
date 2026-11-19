import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import Nav from "../components/Nav";
import Tabs from "../components/Tabs";
import Search from "../components/Search";
import RandomLink from "../components/RandomLink";
import Konami from "../components/Konami";
import VisitorBadge from "../components/VisitorBadge";
import { getSearchIndex } from "../lib/content";
import { EMAIL, SOCIALS, LAST_EDITED, SITE_URL } from "../lib/site";
import "./globals.css";

const DESCRIPTION = "My personal homepage: projects, videos and notes on computer engineering, cloud and AI.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "samy.lol", template: "%s – samy.lol" },
  description: DESCRIPTION,
  openGraph: { siteName: "samy.lol", type: "website", url: "/", title: "samy.lol", description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: "samy.lol", description: DESCRIPTION },
};

// Runs before the page paints so dark mode doesn't flash white first.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  const index = getSearchIndex();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <div className="wiki">
          <aside className="sidebar">
            <Link href="/" className="brand" aria-label="samy.lol home">
              <span className="brand-mark">S</span>
              <span className="brand-name">samy.lol</span>
              <span className="brand-tag">The personal homepage</span>
            </Link>

            <Search index={index} />

            <div className="portal">
              <h3>Navigation</h3>
              <Nav />
              <ul><li><RandomLink hrefs={index.map((i) => i.href)} /></li></ul>
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
                <Link href="/about">About samy.lol</Link> · <Link href="/history">Edit history</Link> ·{" "}
                <Link href="/contact">Contact</Link>
              </p>
            </footer>
          </div>
        </div>
        <VisitorBadge />
        <Konami />
        <Analytics />
      </body>
    </html>
  );
}
