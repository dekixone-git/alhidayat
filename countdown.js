const hari = document.querySelector(".hari");
const jam = document.querySelector(".jam");
const menit = document.querySelector(".menit");
const detik = document.querySelector(".detik");

function addZero(n) {
  return n < 10 ? "0" + n : n;
}

// Buat tanggal target di zona waktu WIB (GMT+7)
const targetDate = new Date(Date.UTC(2026, 0, 11, 2, 0, 0)); 
// Penjelasan: 09:00 WIB = 02:00 UTC (selisih 7 jam)

// Interval
let x = setInterval(() => {
  // Waktu sekarang dalam UTC supaya konsisten
  const now = new Date().getTime();

  const distance = targetDate.getTime() - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  hari.innerHTML = addZero(days);
  jam.innerHTML = addZero(hours);
  menit.innerHTML = addZero(minutes);
  detik.innerHTML = addZero(seconds);

  if (distance < 0) {
    clearInterval(x);
    hari.innerHTML = "00";
    jam.innerHTML = "00";
    menit.innerHTML = "00";
    detik.innerHTML = "00";
  }
}, 1000);