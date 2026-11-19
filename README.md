<p align="center">
  <img src="app/icon.png" width="96" height="96" alt="samy.lol pixel-art logo" />
</p>

<h1 align="center">samy.lol</h1>

<p align="center">
  My personal homepage, styled like an encyclopedia article.<br />
  <a href="https://samy.lol"><b>Visit samy.lol →</b></a>
</p>

---

## About

**[samy.lol](https://samy.lol)** is where I put my projects, videos and notes. I'm into
computer engineering, so I built it myself and laid it out like a classic encyclopedia page: a
sidebar, an article with an infobox and a table of contents, and a contact form that sends
messages straight to my inbox.

## Features

- **Encyclopedia-style layout:** serif headings, infobox, contents box and tables, built for
  wide screens and still usable on phones.
- **Pixel-art portrait:** the profile picture and browser icon are a hand-made 32×40 sprite,
  drawn as text in [`scripts/draw-sprite.mjs`](scripts/draw-sprite.mjs).
- **Projects and videos:** a project table and a video gallery that are easy to add to.
- **Contact form:** messages are e-mailed to me with the sender's address as the reply-to,
  limited to one per visitor per day with basic spam protection.
- **Guest visitor counter:** a small badge that counts unique visitors.
- **Privacy-friendly:** visitor IP addresses are never stored. They are turned into one-way
  hashes, only to rate-limit the contact form and avoid double counting.

## Built with

- [Next.js](https://nextjs.org) and [React](https://react.dev)
- Plain CSS
- [Upstash Redis](https://upstash.com) for the visitor count and rate limiting
- [Resend](https://resend.com) for contact-form e-mail
- Hosted on [Vercel](https://vercel.com)

## Running it locally

You need [Node.js](https://nodejs.org) (LTS).

```bash
git clone https://github.com/samydev65/samy-lol.git
cd samy-lol
npm install
npm run dev
```

Then open http://localhost:3000. Without a database connected, visits are saved to a local file
(`.data/store.json`) that is not committed. Without an e-mail key, contact messages are
printed in the terminal instead of sent.

## Project layout

| Folder | What's inside |
|---|---|
| `app/` | Pages (home, about, projects, videos, contact) and API routes |
| `components/` | Shared pieces: sidebar navigation, tabs, infobox, contact form, visitor badge |
| `lib/` | Site links and the storage code for visits and rate limiting |
| `scripts/` | The pixel-art sprite drawer and a helper for pushing changes |
| `public/` | Images |

## Links

- Website: **[samy.lol](https://samy.lol)**
- GitHub: **[@samydev65](https://github.com/samydev65)**
- YouTube: **[@samydev65](https://www.youtube.com/@samydev65)**
