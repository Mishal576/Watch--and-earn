
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
