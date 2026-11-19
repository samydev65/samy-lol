import Comments from "../../components/Comments";

export const metadata = { title: "Talk" };

export default function Talk() {
  return (
    <>
      <h1>Talk:Sammy</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>
        This is the talk page for samy.lol. Leave a comment about the site, a project or a video.
        Each visitor can post one comment.
      </p>
      <Comments />
    </>
  );
}
