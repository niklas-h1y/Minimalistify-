document.addEventListener('DOMContentLoaded', () => {
  const modes = {
    mild: `
      /* 1. Schöne, moderne und hochgradig lesbare Schriftart erzwingen */
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      }
      
      /* 2. Abgerundete Ecken für alle Container, Buttons, Inputs und Bilder */
      div, section, article, main, button, input, select, textarea, img, canvas {
        border-radius: 12px !important;
      }
      
      /* 3. Entferne störende Hintergrundbilder und Schatten für mehr Ruhe */
      body, div, article, section, p {
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      
      /* 4. Blende typische Werbe- und Ablenkungs-Container aus */
      aside, footer, .sidebar, .ads, #sidebar, [role="complementary"] {
        display: none !important;
      }
    `,
    hard: `
      /* Brutaler Minimalismus, aber mit modernem Touch */
      * {
        background: #ffffff !important;
        color: #000000 !important;
        border-color: #000000 !important;
        background-image: none !important;
        /* Schicke serifenlose Schrift statt der alten Schreibmaschinen-Schrift */
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        box-shadow: none !important;
        text-shadow: none !important;
        animation: none !important;
        transition: none !important;
      }
      
      /* Abgerundete Ecken für die Textblöcke und Rahmen im Hardcore-Modus */
      div, section, article, button, input {
        border-radius: 8px !important;
        border: 1px solid #000000 !important;
        padding: 10px !important;
        margin-bottom: 10px !important;
      }
      
      /* Verstecke alle Bilder, Videos und ablenkenden Medien */
      img, video, iframe, svg, canvas {
        display: none !important;
      }
      
      /* Halte den Haupttext perfekt zentriert und lesbar wie in einem cleanen eBook */
      body {
        max-width: 650px !important;
        margin: 0 auto !important;
        padding: 40px 20px !important;
        line-height: 1.7 !important;
        background: #ffffff !important;
      }
    `
  };

  async function applyStyle(modeName) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    // Alten injizierten Style entfernen
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const oldStyle = document.getElementById('minimalist-extension-style');
        if (oldStyle) oldStyle.remove();
      }
    });

    // Neuen Style injizieren, wenn es kein Reset ist
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
