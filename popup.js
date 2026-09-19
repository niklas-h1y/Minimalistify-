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
      /* 1. Globaler Farbentzug: Garantiert TIEFSCHWARZER Hintergrund für ALLES */
      html, body, div, form, header, nav, main {
        background: #121212 !important;
        color: #ffffff !important;
        box-shadow: none !important;
        text-shadow: none !important;
        background-image: none !important;
      }
      
      /* 2. Text-Elemente rigoros weiß und lesbar machen */
      p, h1, h2, h3, h4, h5, h6, span, a, li, b, strong, em, input, textarea {
        color: #ffffff !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        background: transparent !important;
      }
      
      /* Links sauber unterstreichen und leicht bläulich färben */
      a {
        text-decoration: underline !important;
        color: #8ab4f8 !important;
      }
      
      /* 3. Strukturierte Trennlinien und dunkelgraue Boxen für Feeds & Suchergebnisse */
      article, section, [role="main"], .g, .card, .post {
        background: #1e1e1e !important;
        border: 1px solid #333333 !important;
        border-radius: 12px !important;
        padding: 16px !important;
        margin-bottom: 16px !important;
      }
      
      /* Knöpfe und Eingabefelder sauber umranden */
      button, input, select {
        border: 1px solid #555555 !important;
        border-radius: 8px !important;
        background: #252525 !important;
        color: #ffffff !important;
        padding: 6px 12px !important;
      }
      
      /* 4. Medien und störende Layout-Kreise komplett verstecken */
      img, video, iframe, svg, canvas, audio {
        display: none !important;
      }
      
      /* 5. Zentriertes, sauberes Lese-Layout */
      body {
        max-width: 680px !important;
        margin: 0 auto !important;
        padding: 20px !important;
        line-height: 1.6 !important;
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
