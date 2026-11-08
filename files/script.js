/* =====================================================================
   script.js  = the small "brain" of the site. It does 7 jobs:
   1. puts the icons (cat, cross, rose...) into every page
   2. builds the top menu + footer on every page (so you edit them HERE once)
   3. draws twinkling stars and sometimes a shooting star
   4. makes a sparkle trail behind the mouse
   5. fades sections in as you scroll
   6. types the changing words on the home page
   7. runs the music player and the quote slider on the Shrine page
   ===================================================================== */

/* ---- EDIT THESE ---- */
const NAME   = "Mqadeh";
const EMAIL  = "you@example.com";
const GITHUB = "https://github.com/YOUR-USERNAME";
const PAGES  = [["index.html","Home"],["about.html","About"],["work.html","Work"],["journal.html","Journal"],["shrine.html","Shrine"]];

document.documentElement.classList.add("js");
const body = document.body;

/* 1. ICONS: every <svg><use href="#cat"/></svg> on the pages points to one of these */
body.insertAdjacentHTML("afterbegin", `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="spark" viewBox="0 0 24 24"><path d="M12 0Q13 11 24 12Q13 13 12 24Q11 13 0 12Q11 11 12 0Z"/></symbol>
  <symbol id="cross" viewBox="0 0 24 32"><path d="M10 0h4v9h8v4h-8v19h-4V13H2V9h8z"/></symbol>
  <symbol id="rose" viewBox="0 0 32 32"><circle cx="16" cy="13" r="9" fill="currentColor"/><path d="M16 6c-4 0-6 4-3 6s6 0 5-3M11 15c3 4 9 3 10-2" fill="none" stroke="#05070f" stroke-width="1.6" stroke-linecap="round"/><path d="M16 22v9M16 27c-4 0-6-2-7-4 3 0 6 1 7 4zM16 25c3-3 6-3 8-2-1 3-4 4-8 2z" fill="#8fa8ff"/></symbol>
  <symbol id="church" viewBox="0 0 32 32"><path d="M16 1v5M14 3h4M16 6l-6 7v17h12V13zM4 18l6-3v15H4zM28 18l-6-3v15h6z" fill="currentColor"/><path d="M14 30v-6a2 2 0 014 0v6z" fill="#05070f"/></symbol>
  <symbol id="cat" viewBox="0 0 100 100">
    <path d="M17 42L21 9l25 19z" fill="#fff" stroke="#05070f" stroke-width="3" stroke-linejoin="round"/>
    <path d="M83 42L79 9 54 28z" fill="#05070f" stroke="#05070f" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="50" cy="60" rx="37" ry="31" fill="#fff" stroke="#05070f" stroke-width="3"/>
    <path d="M14 54Q14 34 38 36Q48 44 40 62Q28 74 16 64Z" fill="#05070f"/>
    <circle cx="33" cy="55" r="5.5" fill="#cfe0ff"/><circle cx="31.5" cy="53" r="1.8" fill="#fff"/>
    <circle cx="66" cy="55" r="5.5" fill="#05070f"/><circle cx="64.5" cy="53" r="1.8" fill="#fff"/>
    <path d="M46 63l4 4 4-4z" fill="#8fa8ff"/><path d="M50 67v3M50 70q-4 4-8 1M50 70q4 4 8 1" fill="none" stroke="#05070f" stroke-width="2" stroke-linecap="round"/>
    <circle cx="26" cy="68" r="4" fill="#8fa8ff" opacity=".5"/><circle cx="74" cy="68" r="4" fill="#8fa8ff" opacity=".5"/>
    <path d="M10 66l-8-2M10 71l-8 3M90 66l8-2M90 71l8 3" stroke="#05070f" stroke-width="2" stroke-linecap="round"/>
  </symbol>
</svg><div id="sky" aria-hidden="true"></div>
<header class="nav">
  <a class="brand" href="index.html"><svg class="ic"><use href="#cat"/></svg>${NAME}</a>
  <button class="burger" type="button" aria-label="Menu">Menu</button>
  <nav class="links">${PAGES.map(([u,t]) => `<a href="${u}" class="${body.dataset.page+".html"===u?"here":""}">${t}</a>`).join("")}</nav>
</header>`);

/* 2. FOOTER */
body.insertAdjacentHTML("beforeend", `
<footer class="foot"><svg class="cross"><use href="#cross"/></svg><h2>Say hi</h2>
  <p><a href="mailto:${EMAIL}">${EMAIL}</a></p><p><a href="${GITHUB}">${GITHUB.replace("https://","")}</a></p>
  <small>Made with HTML, CSS and a lot of blue © 2026</small></footer>`);
document.querySelector(".burger").onclick = () => document.querySelector(".links").classList.toggle("open");

/* 3. STARS: 80 tiny dots in random places + a shooting star every 7 seconds */
const sky = document.getElementById("sky");
for (let i = 0; i < 80; i++) {
  const s = document.createElement("i"), size = Math.random()*2.5 + 1;
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*4}s`;
  sky.appendChild(s);
}
setInterval(() => {
  const s = document.createElement("div"); s.className = "shoot";
  s.style.cssText = `left:${Math.random()*60}%;top:${Math.random()*40}%`;
  sky.appendChild(s); setTimeout(() => s.remove(), 1500);
}, 7000);

/* 4. SPARKLE TRAIL (only on computers with a mouse) */
if (matchMedia("(hover:hover)").matches) {
  let last = 0;
  addEventListener("mousemove", e => {
    if (Date.now() - last < 60) return; last = Date.now();
    const t = document.createElement("span"); t.className = "trail"; t.textContent = "✦";
    t.style.left = e.clientX + "px"; t.style.top = e.clientY + "px";
    body.appendChild(t); setTimeout(() => t.remove(), 800);
  });
}

/* 5. SCROLL REVEAL: anything with class="reveal" fades in when you scroll to it */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.15});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* missing pictures: remove the broken image so the starry box shows instead */
document.querySelectorAll(".ph img").forEach(img => {
  const gone = () => img.remove();
  img.addEventListener("error", gone);
  if (img.complete && !img.naturalWidth) gone();
});

/* 6. TYPING EFFECT (home page): <span data-type="word1|word2|word3"> */
const typer = document.querySelector("[data-type]");
if (typer) {
  const words = typer.dataset.type.split("|"); let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    typer.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 90);
  })();
}

/* 7a. MUSIC PLAYER (Shrine page) */
const pl = document.querySelector(".player");
if (pl) {
  const audio = pl.querySelector("audio"), btn = pl.querySelector(".play"), fill = pl.querySelector(".bar i");
  pl.querySelector(".pl-title").textContent = pl.dataset.title;
  pl.querySelector(".pl-artist").textContent = pl.dataset.artist;
  btn.onclick = () => audio.paused ? audio.play() : audio.pause();
  audio.onplay  = () => { pl.classList.add("playing");    btn.textContent = "Pause"; };
  audio.onpause = () => { pl.classList.remove("playing"); btn.textContent = "Play"; };
  audio.ontimeupdate = () => fill.style.width = (audio.currentTime / audio.duration * 100 || 0) + "%";
}

/* 7b. QUOTE SLIDER: shows one .q at a time, changes every 9 seconds or on button click */
const qs = document.querySelectorAll(".q");
if (qs.length) {
  let n = 0;
  const show = () => { qs.forEach(q => q.classList.remove("on")); qs[n].classList.add("on"); };
  const next = () => { n = (n + 1) % qs.length; show(); };
  document.querySelector(".next").onclick = next;
  setInterval(next, 9000);
}
