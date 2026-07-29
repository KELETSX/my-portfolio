const btn = document.getElementById("toggle-mode");
btn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  btn.textContent = document.body.classList.contains("light") ? "🌙 Dark Mode" : "☀️ Light Mode";
});
