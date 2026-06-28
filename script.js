const keys = Object.keys(CONFIG.social);

/* 🔁 Build slides automatically */
const slides = keys.map(key => ({
  name: key,
  title: CONFIG.social[key].label,
  subtitle: CONFIG.social[key].subtitle
}));

let index = 0;

/* 🌈 THEME COLORS */
function setTheme(key) {
  const widget = document.getElementById("widget");

  const color = CONFIG.social[key].color;

  widget.style.background = `linear-gradient(135deg, ${color}, #0b0b0b)`;
}

/* 📺 LOAD SLIDE */
function loadSlide(i) {
  const slide = slides[i];
  const data = CONFIG.social[slide.name];

  document.getElementById("title").innerText = slide.title;
  document.getElementById("subtitle").innerText = slide.subtitle;

  setTheme(slide.name);

  const qr = document.getElementById("qrcode");
  qr.innerHTML = "";

  QRCode.toCanvas(data.url, { width: 140 }, function (err, canvas) {
    if (!err) qr.appendChild(canvas);
  });

  /* animation reset */
  const box = document.getElementById("slide");
  box.classList.remove("fade");
  void box.offsetWidth;
  box.classList.add("fade");
}

/* 🔁 ROTATE */
function nextSlide() {
  index = (index + 1) % slides.length;
  loadSlide(index);
}

/* START */
loadSlide(index);
setInterval(nextSlide, 9000);
