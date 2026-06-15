
const starsEl = document.getElementById('stars');
const colors = ['#00ffff', '#ff00cc', '#ffee00', '#00ff88', '#cc00ff', '#ffffff'];
for (let i = 0; i < 80; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 3 + 1;
  s.style.cssText = `
    width:${size}px; height:${size}px;
    top:${Math.random() * 100}%;
    left:${Math.random() * 100}%;
    background:${colors[Math.floor(Math.random() * colors.length)]};
    --d:${(Math.random() * 2 + 1).toFixed(1)}s;
    animation-delay:${(Math.random() * 2).toFixed(1)}s;
  `;
  starsEl.appendChild(s);
}

const numbersEl = document.getElementById('numbers');
const radius = 112; // distância do centro

for (let i = 1; i <= 12; i++) {
  const angleDeg = (i * 30) - 90; // 12 no topo
  const angleRad = angleDeg * Math.PI / 180;
  const x = 50 + (radius / 2.92) * Math.cos(angleRad); // % relativo ao tamanho
  const y = 50 + (radius / 2.92) * Math.sin(angleRad);

  const span = document.createElement('span');
  span.className = 'num';
  span.textContent = i;

  // Cores alternadas para cada número
  const numColors = ['#00ffff', '#ff00cc', '#ffee00', '#00ff88', '#cc00ff', '#ff6600'];
  const c = numColors[(i - 1) % numColors.length];
  span.style.color = c;
  span.style.textShadow = `0 0 8px ${c}, 0 0 16px ${c}`;
  span.style.left = x + '%';
  span.style.top = y + '%';
  span.style.transform = 'translate(-50%, -50%)';

  numbersEl.appendChild(span);
}


const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  const sDeg = (s + ms / 1000) * 6;
  const mDeg = (m + (s + ms / 1000) / 60) * 6;
  const hDeg = (h + m / 60) * 30;

  document.getElementById('second').style.transform = `rotate(${sDeg}deg)`;
  document.getElementById('minute').style.transform = `rotate(${mDeg}deg)`;
  document.getElementById('hour').style.transform = `rotate(${hDeg}deg)`;

  document.getElementById('time-digital').textContent =
    `${pad(now.getHours())}:${pad(m)}:${pad(s)}`;

  document.getElementById('date-label').textContent =
    `${dias[now.getDay()]} · ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
}

tick();
setInterval(tick, 50);