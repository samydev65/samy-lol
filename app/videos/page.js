export const metadata = { title: "Videos" };

// ===== EDIT YOUR VIDEOS HERE =====
// youtubeId is the part after "watch?v=" in a YouTube link.
// Leave it "" to show a placeholder.
const VIDEOS = [
  { title: "Coming soon", youtubeId: "" },
  { title: "Coming soon", youtubeId: "" },
  { title: "Coming soon", youtubeId: "" },
];

export default function Videos() {
  return (
    <>
      <h1>Videos</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>Walkthroughs and demos of my projects. New videos show up here when I post them.</p>

      <div className="gallery">
        {VIDEOS.map((v, i) => (
          <div className="gallerybox" key={i}>
            <div className="frame">
              {v.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                "No video yet"
              )}
            </div>
            <div className="gallerytext">{v.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}
