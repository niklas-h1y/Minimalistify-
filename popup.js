document.addEventListener('DOMContentLoaded', () => {
  const modes = {
    mild: `
      /* 1. Moderne Schriftart erzwingen */
      * {
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      }
      
      /* 2. Abgerundete Ecken für alle sichtbaren Elemente */
      div, section, article, main, button, input, select, textarea, img, canvas {
        border-radius: 14px !important;
      }
      
      /* 3. Hintergrundbilder und Schatten für visuelle Ruhe entfernen */
      body, div, article, section, p {
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      
      /* 4. Sidebars und typische Ablenkungen ausblenden */
      aside, footer, .sidebar, .ads, #sidebar, [role="complementary"] {
        display: none !important;
      }
    `,
    hard: `
      /* 1. Jedes Element verliert seine ursprüngliche Farbe und wird reines Schwarz-Weiß */
      * {
        background-color: #000000 !important;
        background-image: none !important;
        color: #ffffff !important;
        border-color: #ffffff !important;
        box-shadow: none !important;
        text-shadow: none !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
      }
      
      /* 2. Struktur-Boxen bekommen eine saubere weiße Outline */
      article, section, [role="main"], .g, .card, .post {
        border: 1px solid #ffffff !important;
        border-radius: 12px !important;
        padding: 16px !important;
        margin-bottom: 16px !important;
      }
      
      /* Formular-Elemente und Buttons umranden */
      button, input, select, textarea, [role="button"] {
        border: 1px solid #ffffff !important;
        border-radius: 8px !important;
        background-color: #000000 !important;
        color: #ffffff !important;
        padding: 6px 12px !important;
      }
      
      /* Links weiß halten, aber deutlich unterstreichen */
      a {
        color: #ffffff !important;
        text-decoration: underline !important;
      }
      
      /* 3. Medien, Icons und komplexe Grafikpfade komplett unsichtbar machen */
      img, video, iframe, svg, canvas, audio, g, path {
        display: none !important;
      }
      
      /* 4. Zentriertes eBook-Lese-Layout */
      body {
        max-width: 680px !important;
        margin: 0 auto !important;
        padding: 20px !important;
        line-height: 1.6 !important;
        background-color: #000000 !important;
      }
    `
  };

  async function applyStyle(modeName) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    // Alten Style entfernen
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const oldStyle = document.getElementById('minimalist-extension-style');
        if (oldStyle) oldStyle.remove();
      }
    });

    // Neuen Style injizieren
    if (modeName !== 'reset') {
      const cssToInject = modes[modeName];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (css) => {
          const styleEl = document.createElement('style');
          styleEl.id = 'minimalist-extension-style';
          styleEl.textContent = css;
          document.head.appendChild(styleEl);
        },
        args: [cssToInject]
      });
    }
  }

  document.getElementById('btn-mild').addEventListener('click', () => applyStyle('mild'));
  document.getElementById('btn-hard').addEventListener('click', () => applyStyle('hard'));
  document.getElementById('btn-reset').addEventListener('click', () => applyStyle('reset'));
});
