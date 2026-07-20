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

const downloadCount = document.querySelector("[data-download-count]");

if (downloadCount) {
  const value = downloadCount.querySelector("[data-download-count-value]");
  const label = downloadCount.querySelector("[data-download-count-label]");

  try {
    const response = await fetch(
      "https://api.github.com/repos/adventure-gpt/telegram-codex-bridge/releases?per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: AbortSignal.timeout(7_000),
      },
    );
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

    const releases = await response.json();
    const installerAssets = releases.flatMap((release) => release.assets ?? [])
      .filter((asset) => asset.name === "TelegramCodexBridgeSetup.exe");
    if (!installerAssets.length) throw new Error("No published installer assets were found");

    const total = installerAssets.reduce((sum, asset) => sum + Number(asset.download_count ?? 0), 0);
    if (!Number.isSafeInteger(total) || total < 0) throw new Error("GitHub returned an invalid download count");

    value.textContent = new Intl.NumberFormat("en-US").format(total);
    label.textContent = `installer download${total === 1 ? "" : "s"} across all releases`;
    downloadCount.dataset.state = "ready";
  } catch {
    value.textContent = "—";
    label.textContent = "Live download count temporarily unavailable";
    downloadCount.dataset.state = "error";
  }
}
