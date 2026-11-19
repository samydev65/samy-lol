import Comments from "../../components/Comments";

export const metadata = { title: "Talk" };

export default function Talk() {
  return (
    <>
      <h1>Talk:Sammy</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>
        Got thoughts on the site, a project or a video? Leave me a comment. Everyone gets one, so
        make it count.
      </p>
      <Comments />
    </>
  );
}
