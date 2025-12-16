
  const scriptURL = "https://script.google.com/macros/s/AKfycbwT_3kkzVrea8Fmy7XiaJP2zjAYxytLbY6PPfZ_P3FBvYuuiTDcOSyZ3YN0fJUxjvR3/exec"; // URL Anda
  const form = document.forms["titip-pesan"];
  const btnKirim = document.querySelector(".btn-kirim");
  const btnLoading = document.querySelector(".btn-loading");
  const myAlert = document.querySelector(".alert-warning"); // jika ada
  const container = document.querySelector("#message-box");  // wajib ada

  fetchMessage();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    btnKirim.classList.add("d-none");
    btnLoading.classList.remove("d-none");

    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: new FormData(form),
    })
    .then(() => {
      form.reset();
      btnKirim.classList.remove("d-none");
      btnLoading.classList.add("d-none");

      if (myAlert) {
        myAlert.classList.remove("d-none");
        setTimeout(() => myAlert.classList.add("d-none"), 3000);
      }

      setTimeout(fetchMessage, 600);
    })
    .catch((err) => {
      btnKirim.classList.remove("d-none");
      btnLoading.classList.add("d-none");
      console.error("POST error:", err);
    });
  });

  function fetchMessage() {
    if (!container) return;

    container.innerHTML = `<p class="text-warning mt-4">Memuat...</p>`;

    const old = document.getElementById("jsonp-loader");
    if (old) old.remove();

    window.handleMessages = (data) => maker(data);

    const s = document.createElement("script");
    s.id = "jsonp-loader";
    s.src = `${scriptURL}?callback=handleMessages&t=${Date.now()}`;
    s.onerror = () => (container.innerHTML = `<p class="text-danger">Gagal memuat pesan.</p>`);
    document.body.appendChild(s);
  }

  function maker(data) {
  // Validasi data
  if (!Array.isArray(data)) {
    container.innerHTML = `
      <div class="message-panel">
        <p class="text-danger mb-0">Data tidak valid.</p>
      </div>`;
    return;
  }

  // Empty state
  if (data.length === 0) {
    container.innerHTML = `
      <div class="message-panel">
        <p class="text-muted mb-0">Belum ada pesan.</p>
      </div>`;
    return;
  }

  // Render terbaru di atas
  const reversed = [...data].reverse();

  let content = `<div class="message-panel"><div class="row justify-content-center">`;

  reversed.forEach((m) => {
    const nama = escapeHtml(m?.nama ?? "");
    const pesan = escapeHtml(m?.pesan ?? "");
    const waktu = formatTimeSafe(m?.timestamp);

    content += `
      <div class="col-lg-7 col-md-10 col-12 mb-3">
        <div class="bubble-message bubble-full d-flex align-items-start gap-3">
          
          <div class="user-photo">
            <img src="assets/img/user-icon.svg" width="45" alt="user" />
          </div>

          <div class="bubble-content flex-grow-1">
            <div class="d-flex justify-content-between align-items-start gap-3">
              <p class="fw-bolder mb-1">${nama || "Tamu"}</p>
              <span class="bubble-time">${waktu}</span>
            </div>
            <p class="mb-0">${pesan}</p>
          </div>

        </div>
      </div>`;
  });

  content += `</div></div>`;
  container.innerHTML = content;
}



  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

function formatTimeSafe(ts) {
  if (!ts) return "";

  // Apps Script kadang mengirim Date object (akan jadi string) / ISO / format lain
  const d = new Date(ts);
  if (isNaN(d.getTime())) return "";

  // Contoh output: "16 Des 2025, 11.48"
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(":", "."); // opsional: jam 11.48
}

