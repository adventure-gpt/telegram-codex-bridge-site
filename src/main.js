import "./styles.css";

const toast = document.querySelector(".copy-toast");
let toastTimer;

for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      toast.textContent = "Prompt copied to clipboard.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(button.previousElementSibling);
      selection.removeAllRanges();
      selection.addRange(range);
      toast.textContent = "Select the highlighted prompt and copy it.";
    }
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      if (button.textContent === "Copied") button.textContent = "Copy prompt";
    }, 2400);
  });
}
for (const link of document.querySelectorAll("a[href^='#']")) {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
  });
}
