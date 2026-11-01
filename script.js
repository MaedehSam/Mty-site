// Twinkling star background
const sky = document.getElementById('sky');
for (let i = 0; i < 70; i++) {
  const s = document.createElement('i');
  const size = Math.random() * 2.5 + 1;
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*4}s;opacity:${0.4+Math.random()*0.6}`;
  sky.appendChild(s);
}
