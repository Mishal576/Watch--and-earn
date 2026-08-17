const SUPABASE_URL = "https://ccozqqfewgufacjvtfdo.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

async function loadVideos() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/videos?select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load videos");
    }

    const videos = await response.json();

    console.log("Videos:", videos);

    const container =
      document.querySelector("#videos") ||
      document.querySelector(".videos");

    if (!container) {
      console.log("Video container not found");
      return;
    }

    container.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "video-card";

      card.innerHTML = `
        <h3>${video.title}</h3>
        <p>Reward: $${video.reward}</p>
        <a href="${video.url}" target="_blank">
          Watch Video
        </a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
  }
}

loadVideos();
