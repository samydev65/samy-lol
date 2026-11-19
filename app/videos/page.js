import { SOCIALS, YOUTUBE_CHANNEL_ID } from "../../lib/site";

export const metadata = { title: "Videos", description: "Walkthroughs and demos of my projects." };
export const revalidate = 3600; // check YouTube for new uploads every hour

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

// Newest uploads from the channel's public feed (no API key needed).
async function getVideos() {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 12).map(([, e]) => ({
      id: e.match(/<yt:videoId>([^<]+)/)?.[1],
      title: decode(e.match(/<title>([^<]*)/)?.[1] ?? "Untitled"),
      date: e.match(/<published>([^<]+)/)?.[1]?.slice(0, 10),
    })).filter((v) => v.id);
  } catch {
    return null;
  }
}

const channelUrl = SOCIALS.find(([l]) => l === "YouTube")?.[1];

export default async function Videos() {
  const videos = await getVideos();
  const list = videos?.length ? videos : null;

  return (
    <>
      <h1>Videos</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>
        Walkthroughs and demos of my projects. New uploads on my{" "}
        <a href={channelUrl} target="_blank" rel="noopener noreferrer">YouTube channel</a> show up here
        automatically.
      </p>

      <div className="gallery">
        {list
          ? list.map((v) => (
              <div className="gallerybox" key={v.id}>
                <div className="frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="gallerytext">
                  {v.title}
                  {v.date && <span className="muted"> · {v.date}</span>}
                </div>
              </div>
            ))
          : [1, 2, 3].map((n) => (
              <div className="gallerybox" key={n}>
                <div className="frame">No video yet</div>
                <div className="gallerytext">Coming soon</div>
              </div>
            ))}
      </div>
    </>
  );
}
