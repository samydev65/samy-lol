// Saves all your changes and sends them to GitHub in one step.
//
//   npm run ship                        -> commit message "Update site (date and time)"
//   npm run ship -- "Added a new video" -> your own commit message
//
// If Vercel is connected to the GitHub repo, every ship also updates the live site.
import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

const message =
  process.argv.slice(2).join(" ").trim() ||
  `Update site (${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })})`;

try {
  git("add", "-A");
  if (!git("status", "--porcelain")) {
    console.log("Nothing changed since the last ship.");
  } else {
    git("commit", "-m", message);
    console.log(`Saved: ${message}`);
  }
  console.log("Pushing to GitHub...");
  execFileSync("git", ["push", "-u", "origin", "main"], { stdio: "inherit" });
  console.log("Done! Your code is on GitHub.");
} catch {
  console.error("\nShip failed. Read the message above. If it says the repository wasn't found,");
  console.error("create the empty samy-lol repo on github.com/new first.");
  process.exit(1);
}
