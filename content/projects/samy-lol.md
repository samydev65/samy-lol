---
title: samy.lol
---
**samy.lol** is my personal website, the one you're reading right now. It's where I keep my projects, videos and blog, laid out like an encyclopedia article.

## Overview

I wanted a site that was fast, easy to read and a little different from the usual portfolio template. The encyclopedia layout gives every page the same simple structure: a title, an infobox, a table of contents and sections.

## Features

- Encyclopedia-style layout with a light and dark mode
- A pixel-art character of me that blinks (try hovering over it)
- Sidebar search across every page, project and blog post
- A "Random article" button, just like the real thing
- A blog written in simple text files
- Videos that load automatically from my YouTube channel
- An edit history page that pulls my latest changes from GitHub
- A contact form that e-mails me, limited to one message per visitor per day
- A guest visitor counter that never stores anyone's IP address

## How it works

The pages are built with **Next.js** and **React**. Most of the site is generated ahead of time, so it loads instantly. The dynamic parts, the contact form and the visitor counter, run as small server functions on **Vercel**.

Blog posts and project write-ups are plain Markdown files, so adding a new one is just adding a text file. The GitHub and YouTube sections fetch fresh data every hour.

## Privacy

The site doesn't use tracking cookies. Visitor IP addresses are turned into one-way scrambled codes before anything is saved, which is enough to count visitors and stop spam without knowing who anyone is.

## Source

The full source code is on [GitHub](https://github.com/samydev65/samy-lol).
