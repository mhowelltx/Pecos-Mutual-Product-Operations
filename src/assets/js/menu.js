// Mobile menu toggle. The only script besides search.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".site-menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.textContent = open ? "Menu" : "Close";
    nav.classList.toggle("is-open", !open);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      toggle.click();
      toggle.focus();
    }
  });
});
