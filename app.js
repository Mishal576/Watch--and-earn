
const SUPABASE_URL = "https://ccozqqfewgufacjvtfdo.supabase.co";
const SUPABASE_KEY = "sb_publishable_yO2rmPc3pKAX7omKIarZCw_M8R7Ej8G";

let currentUser = null;

// ===============================
// SUPABASE REQUEST
// ===============================

async function supabaseRequest(endpoint, options = {}) {

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${endpoint}`,
    {
      ...options,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.status === 204
    ? null
    : response.json();
}


// ===============================
// LOAD VIDEOS
// ===============================

async function loadVideos() {

  try {

    const videos = await supabaseRequest(
      "videos?select=*&order=id.desc"
    );

    const container =
      document.getElementById("videos");

    if (!container) return;

    container.innerHTML = "";

    videos.forEach(video => {

      const card =
        document.createElement("div");

      card.className = "video-card";

      card.innerHTML = `
        <h3>${video.title}</h3>

        <p>
          Reward: $${Number(video.reward).toFixed(2)}
        </p>

        <a
          href="${video.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="watchBtn"
        >
          Watch Video
        </a>
      `;

      container.appendChild(card);

    });

  } catch (error) {

    console.error(
      "Video loading error:",
      error
    );

  }
}


// ===============================
// LOGIN / SIGNUP BOX
// ===============================

const loginBtn =
  document.getElementById("loginBtn");

const authBox =
  document.getElementById("authBox");

if (loginBtn && authBox) {

  loginBtn.addEventListener(
    "click",
    function () {

      authBox.style.display = "block";

      authBox.scrollIntoView({
        behavior: "smooth"
      });

    }
  );

}


// ===============================
// SIGN UP
// ===============================

const signupBtn =
  document.getElementById("signupBtn");

if (signupBtn) {

  signupBtn.addEventListener(
    "click",
    async function () {

      const email =
        document.getElementById(
          "emailInput"
        ).value.trim();

      const password =
        document.getElementById(
          "passwordInput"
        ).value;

      const message =
        document.getElementById(
          "authMessage"
        );

      if (!email || !password) {

        message.textContent =
          "Email aur password enter karo.";

        return;
      }

      try {

        const response =
          await fetch(
            `${SUPABASE_URL}/auth/v1/signup`,
            {
              method: "POST",

              headers: {
                apikey: SUPABASE_KEY,
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                email: email,
                password: password
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.msg ||
            data.message ||
            "Signup failed"
          );

        }

        message.textContent =
          "Account created successfully! ✅";

      } catch (error) {

        console.error(error);

        message.textContent =
          error.message;

      }

    }
  );

}


// ===============================
// LOGIN
// ===============================

const emailLoginBtn =
  document.getElementById(
    "emailLoginBtn"
  );

if (emailLoginBtn) {

  emailLoginBtn.addEventListener(
    "click",
    async function () {

      const email =
        document.getElementById(
          "emailInput"
        ).value.trim();

      const password =
        document.getElementById(
          "passwordInput"
        ).value;

      const message =
        document.getElementById(
          "authMessage"
        );

      if (!email || !password) {

        message.textContent =
          "Email aur password enter karo.";

        return;
      }

      try {

        const response =
          await fetch(
            `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
            {
              method: "POST",

              headers: {
                apikey: SUPABASE_KEY,
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                email: email,
                password: password
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.error_description ||
            data.msg ||
            "Login failed"
          );

        }

        currentUser = data.user;

        localStorage.setItem(
          "watchEarnUser",
          JSON.stringify(currentUser)
        );

        message.textContent =
          "Login successful! ✅";

        loginBtn.textContent =
          "Logged In";

        await createProfile();

      } catch (error) {

        console.error(error);

        message.textContent =
          error.message;

      }

    }
  );

}


// ===============================
// CREATE PROFILE
// ===============================

async function createProfile() {

  if (!currentUser) return;

  try {

    const existing =
      await supabaseRequest(
        `profiles?user_id=eq.${currentUser.id}&select=*`
      );

    if (existing.length === 0) {

      await supabaseRequest(
        "profiles",
        {
          method: "POST",

          body: JSON.stringify({
            user_id: currentUser.id,
            Points: 0
          })
        }
      );

    }

  } catch (error) {

    console.error(
      "Profile error:",
      error
    );

  }

}


// ===============================
// START WEBSITE
// ===============================

loadVideos();
