(() => {
  "use strict";
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      toggle.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.textContent = "☰";
    }));
  }

  const form = document.getElementById("feedbackForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const note = document.getElementById("formNote");
      if (!form.reportValidity()) {
        if (note) {
          note.textContent = "Please complete the required fields before continuing.";
          note.classList.add("error");
        }
        return;
      }
      const data = new FormData(form);
      const message = [
        "Hello Supreme Events,",
        "",
        "Website message: " + String(data.get("feedbackType") || ""),
        "Name: " + String(data.get("visitorName") || "").trim(),
        "Contact: " + (String(data.get("visitorContact") || "").trim() || "Not provided"),
        "",
        "Message:",
        String(data.get("visitorMessage") || "").trim()
      ].join("\\n");
      const url = "https://wa.me/2348063440543?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener,noreferrer");
      if (note) {
        note.classList.remove("error");
        note.textContent = "WhatsApp has been opened with your message prepared. Please press Send in WhatsApp to deliver it.";
      }
    });
  }
})();