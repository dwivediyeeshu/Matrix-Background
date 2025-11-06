document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  // Set initial canvas size
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "01<>$#@";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  // Glow settings
  ctx.shadowBlur = 8;
  ctx.shadowColor = getComputedStyle(document.body).getPropertyValue("--accent");

  function drawMatrix() {
    // Fade old frame with translucent black
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--accent");
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, y * fontSize);

      // Reset drop to top occasionally
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  setInterval(drawMatrix, 40);

  // Handle window resizing
  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });
});
