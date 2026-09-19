# 𝐌𝐢𝐧𝐢𝐦𝐚ល𝐢𝐬𝐭𝐢𝐟𝐲

A radical, ultra-lightweight browser extension that strips away web clutter and transforms websites into a beautiful, high-contrast, two-color interface with a single click. Engineered for maximum reading focus, absolute visual clarity, and perfect compatibility with high-speed scrolling extensions.

## ✨ Core Features

- **Mild Mode (Clean & Round):** Modernizes the layout. Forces a clean typography stack (`Inter`/`System-UI`), applies elegant **rounded corners (14px)** to elements, and strips away distracting sidebars, footers, and native ads.
- **Hardcore Mode (Ultra-Contrast Mono):** Powered by mathematical browser filter logic (`grayscale` + extreme `contrast`). It eliminates millions of web colors and shades, leaving only two absolute contrasts: **pure white and true black**.
- **Vector-Sharp Fonts:** Because the contrast filter forces pixels to be either 100% black or 100% white, text remains **razor-sharp with zero blurring or gray anti-aliasing artifacts**, even when zoomed in at 1000%+.
- **100% Layout Compatible:** Unlike traditional themes that forcefully override CSS properties and break page geometry, 𝐌𝐢𝐧𝐢𝐦𝐚𝐥𝐢𝐬𝐭𝐢𝐟𝐲 uses native GPU-accelerated graphic filters. This leaves the mathematical structure of the DOM completely intact, making it fully compatible with extreme content-culling or auto-scrolling extensions.
- **Instant Reset:** Restores the website's original styles immediately without requiring a page reload.

---

## 📂 Project Structure

Minimalistify is engineered to be as lightweight as possible, consisting of only **3 core files**:
- `manifest.json` - Handles extension configuration and permissions.
- `popup.html` - A clean, dark-themed user interface.
- `popup.js` - The core engine executing the mathematical filter injection.

---

## 🚀 Quick Setup & Installation

Since this extension is open-source, you can easily load it manually on your computer or your smartphone.

### 📱 Installing on Mobile (Android)
To use this on your phone, you need a browser that supports extension loading, such as **Kiwi Browser** or **Mises Browser**.
1. Tap the green **Code** button at the top of this repository and select **Download ZIP**.
2. Open **Kiwi Browser** and type **`kiwi://extensions`** in the address bar.
3. Toggle **Developer mode** on (top-right corner).
4. Tap the **`+ (from .zip/.crx/.user.js)`** button, open your file manager, and select the downloaded ZIP file.

### 💻 Installing on Desktop (PC / Mac)
Works on Chrome, Brave, Edge, or any Chromium-based desktop browser.
1. Download this repository as a **ZIP** and extract it into a folder on your computer.
2. Open your browser and navigate to **`chrome://extensions/`**.
3. Enable **Developer mode** (top-right corner).
4. Click the **Load unpacked** button (top-left corner) and select the extracted folder containing the `manifest.json`.

---

## 🧪 Testing the Extremes
Open a heavy text site like Wikipedia or Google Search and switch to **Hardcore Mode**. Zoom in all the way onto a single letter—you will see a mathematically perfect, razor-sharp edge without a single trace of gray or pixel blur!

## 📄 License
MIT License - Feel free to fork, hack, and push the limits of minimalism!
