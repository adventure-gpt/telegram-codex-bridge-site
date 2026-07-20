# Telegram Codex Bridge Site

- Architecture: interactive frontend Vite site with plain HTML, CSS, and JavaScript.
- Hosting: Cloudflare Pages project `telegram-codex-bridge`; output directory `dist`.
- No Pages Functions, D1, authentication, PWA, analytics, cookies, or external runtime assets.
- The cumulative installer counter reads the public GitHub releases API directly in the browser, sums only `TelegramCodexBridgeSetup.exe` assets from published releases, and shows a non-blocking unavailable state if GitHub cannot be reached. It must not become a local-storage counter or require a token.
- Audience: Windows Codex Desktop users who want private Telegram access to one chosen task.
- Primary job: download the Windows installer and complete the safe BotFather/pair/link sequence.
- Visual direction: a cool daylight signal-routing diagram using Windows-native typography, Telegram blue, steel, and one warm signal color. The animated packet crossing the bridge is the single signature element.
- Public installer source: the latest GitHub release from `adventure-gpt/telegram-codex-bridge`.
- The unsigned installer caveat and Full Access behavior must remain visible near the download/setup flow.
- Run `npm run build`, preview through Wrangler Pages, and visually verify mobile and desktop before deployment.
