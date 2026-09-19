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
      /* 1. Globaler Farbentzug ohne Box-Explosion */
      html, body {
        background: #ffffff !important;
        color: #000000 !important;
      }
      
      /* Nur Text- und Struktur-Elemente filtern, nicht JEDES Element */
      p, h1, h2, h3, h4, h5, h6, span, a, li, button, input {
        color: #000000 !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        background: transparent !important;
      }
      
      /* 2. Strukturierte Hauptboxen sauber abrunden, ohne Verschachtelungs-Schleife */
      article, section, main, .post, .card, li {
        background: #ffffff !important;
        border: 1px solid #000000 !important;
        border-radius: 10px !important;
        padding: 16px !important;
        margin-bottom: 16px !important;
      }
      
      /* 3. Medien komplett verstecken */
      img, video, iframe, svg, canvas, audio {
        display: none !important;
      }
      
      /* 4. Zentriertes, sauberes eBook-Layout */
      body {
        max-width: 650px !important;
        margin: 0 auto !important;
        padding: 40px 20px !important;
        line-height: 1.7 !important;
      }
    `
  };

  async function applyStyle(modeName) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const oldStyle = document.getElementById('minimalist-extension-style');
        if (oldStyle) oldStyle.remove();
      }
    });

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
