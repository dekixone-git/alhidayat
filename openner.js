document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("open-message");
  const body = document.querySelector("body");
  const openner = document.querySelector("#openner");
  const receiver = document.querySelector("#receiver");
  const music = document.querySelector("audio");
  const musicIcon = document.querySelector(".music-icon");

  // Set nama tamu (default: Tamu Undangan)
  const params = new URLSearchParams(window.location.search);
  const rawName = params.get("to");
  const displayName = rawName && rawName.trim() ? rawName.trim() : "Tamu Undangan";

  if (receiver) receiver.textContent = displayName;

  // Music toggle
  if (musicIcon && music) {
    musicIcon.addEventListener("click", () => {
      if (musicIcon.classList.contains("disabled")) {
        musicIcon.classList.remove("disabled");
        music.play();
      } else {
        musicIcon.classList.add("disabled");
        music.pause();
      }
    });
  }

  // Open button
  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      body?.classList.remove("overflow-hidden");
      if (openner) {
        openner.style.transform = "translateY(-100vh)";
        setTimeout(() => openner.remove(), 500);
      }
      music?.play();
    });
  }
});
