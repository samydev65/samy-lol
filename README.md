# samy.lol

Personal homepage in an encyclopedia style, built with Next.js.

## Run it on your computer (Windows)

1. Install **Node.js LTS** from https://nodejs.org (click the big LTS button, run the installer, keep the defaults).
2. Open **Command Prompt** or **PowerShell** and go into the project folder:
   ```
   cd path\to\samy-lol
   ```
3. Install the packages (only needed once):
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open http://localhost:3000 in your browser. Edits you save show up instantly.

Stop the server with `Ctrl + C`.

## Where to edit stuff

| What | File |
|---|---|
| E-mail and social links | `lib/site.js` |
| Talk page intro | `app/talk/page.js` |
| Home page text and updates | `app/page.js` (`NEWS`) |
| Projects | `app/projects/data.js` (`PROJECTS`) |
| Videos (YouTube IDs) | `app/videos/page.js` (`VIDEOS`) |
| About text and skills | `app/about/page.js` |
| Infobox rows | `app/page.js` and `app/about/page.js` (`<Infobox rows=...>`) |
| Colors, fonts, layout | `app/globals.css` |

## Your portrait

`public/me.png` is a pixel-art character drawn in `scripts/draw-sprite.mjs`. Each text row is a
row of pixels and each letter is a color from `PALETTE` (hair, skin, eyes, camo shirt...).
Change letters or colors, then rebuild the image:

```
node scripts/draw-sprite.mjs
```

## Visitor counter and comments

The bottom-left badge counts unique visitors, and the Talk page lets each visitor leave
**one** comment. Both go by IP address, but IPs are never saved: each one is turned into a
one-way hash first.

- **On your computer** everything is saved to `.data/store.json` (git ignores it). Delete
  that file to reset.
- **Online (Vercel)** it needs a free database:
  1. In your Vercel project, open **Storage → Create → Upstash (Redis)** and connect it to the
     project. That adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` settings automatically.
  2. In **Settings → Environment Variables**, add `IP_SALT` set to any long random text.
  3. Redeploy.

To delete a comment, open the database in the Upstash console and edit the `comments` list.

## Send changes to GitHub

This folder is already a git repo pointed at `github.com/samydev65/samy-lol`. After you make
changes, run:

```
npm run ship
```

or with your own description of what changed:

```
npm run ship -- "Added a new video"
```

That saves everything and pushes it to GitHub. If Vercel is connected to the repo, the live
site updates by itself a minute later.

## Put it online at samy.lol

1. Run `npm run ship` to push this folder to GitHub.
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, and import the repo. Vercel detects Next.js automatically.
3. In the project's **Settings → Domains**, add `samy.lol` and follow the DNS instructions it shows for wherever you bought the domain.
