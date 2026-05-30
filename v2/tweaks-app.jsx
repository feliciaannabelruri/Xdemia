// tweaks-app.jsx — drives the vanilla Xdemia page via CSS variables + body classes
const { useEffect } = React;

const ACCENTS = {
  'Brand teal':   { teal: '#0aa3b4', deep: '#088898' },
  'Deep petrol':  { teal: '#0a8fa0', deep: '#0a6b76' },
  'Cyan':         { teal: '#1bc6d6', deep: '#10a3b0' },
  'Academic gold':{ teal: '#c9a24a', deep: '#a8842f' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "Brand teal",
  "portrait": "Monochrome",
  "headlineCase": "Title case",
  "motion": true
}/*EDITMODE-END*/;

function hexToRgb(h){const n=parseInt(h.slice(1),16);return [(n>>16)&255,(n>>8)&255,n&255];}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement.style;
    const a = ACCENTS[t.accent] || ACCENTS['Brand teal'];
    root.setProperty('--teal', a.teal);
    root.setProperty('--teal-deep', a.deep);
    const [r,g,b] = hexToRgb(a.teal);
    root.setProperty('--teal-rgb', `${r},${g},${b}`);
  }, [t.accent]);

  useEffect(() => {
    const duo = t.portrait === 'Teal duotone';
    document.querySelectorAll('.hero-slide img, .quote-bg img').forEach(im => {
      im.style.filter = duo
        ? 'grayscale(100%) contrast(1.05) brightness(.78) sepia(.45) hue-rotate(135deg) saturate(2.2)'
        : '';
    });
  }, [t.portrait]);

  useEffect(() => {
    document.body.classList.toggle('uppercase-heads', t.headlineCase === 'Uppercase');
  }, [t.headlineCase]);

  useEffect(() => {
    document.body.classList.toggle('no-motion', !t.motion);
  }, [t.motion]);

  return (
    <TweaksPanel>
      <TweakSection label="Identity" />
      <TweakColor label="Accent" value={(ACCENTS[t.accent]||ACCENTS['Brand teal']).teal}
        options={Object.values(ACCENTS).map(a=>a.teal)}
        onChange={(v) => {
          const key = Object.keys(ACCENTS).find(k => ACCENTS[k].teal === v) || 'Brand teal';
          setTweak('accent', key);
        }} />
      <TweakSection label="Portraits" />
      <TweakRadio label="Treatment" value={t.portrait}
        options={['Monochrome', 'Teal duotone']}
        onChange={(v) => setTweak('portrait', v)} />
      <TweakSection label="Typography" />
      <TweakRadio label="Headlines" value={t.headlineCase}
        options={['Title case', 'Uppercase']}
        onChange={(v) => setTweak('headlineCase', v)} />
      <TweakSection label="Atmosphere" />
      <TweakToggle label="Motion" value={t.motion} onChange={(v) => setTweak('motion', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
