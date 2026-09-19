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
      /* 1. Radikaler, absolut lückenloser Tiefschwarz-Modus für ALLE Container */
      *, html, body, div, form, header, nav, main, article, section, blockquote {
        background-color: #121212 !important;
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
        border-color: #333333 !important;
      }
      
      /* 2. Knallharter Text-Kontrast: Alles wird reinweiß */
      p, h1, h2, h3, h4, h5, h6, span, a, li, b, strong, em, input, textarea, dt, dd {
        color: #ffffff !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        background-color: transparent !important;
      }
      
      /* Links sauber kennzeichnen */
      a {
        text-decoration: underline !important;
        color: #8ab4f8 !important;
      }
      
      /* 3. Schicke, einheitliche Rahmen um die Google-Suchergebnisse & Hauptblöcke */
      .g, .card, .post, [role="main"] {
        border: 1px solid #333333 !important;
        border-radius: 12px !important;
        padding: 16px !important;
        margin-bottom: 16px !important;
        background-color: #121212 !important;
      }
      
      /* Knöpfe und Eingabefelder anpassen */
      button, input, select, [role="button"] {
        border: 1px solid #555555 !important;
        border-radius: 8px !important;
        background-color: #252525 !important;
        color: #ffffff !important;
        padding: 6px 12px !important;
      }
      
      /* 4. Medien, störende Icons und Trenn-Kreise komplett eliminieren */
      img, video, iframe, svg, canvas, audio, g, path {
        display: none !important;
      }
      
      /* 5. Perfekt zentriertes eBook-Lese-Layout */
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
