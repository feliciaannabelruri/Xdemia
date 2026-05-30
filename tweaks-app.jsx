// tweaks-app.jsx — drives the vanilla Xdemia page via CSS variables + body classes
const { useEffect } = React;

const ACCENTS = {
  'Brand teal':   { teal: '#088898', deep: '#066a76', ink: '#05525c' },
  'Emerald':      { teal: '#2aa37a', deep: '#1f8a66', ink: '#176b4f' },
  'Ocean blue':   { teal: '#1f7ae0', deep: '#1862b8', ink: '#134d91' },
  'Deep petrol':  { teal: '#0a6b76', deep: '#08545d', ink: '#053b41' },
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
    root.setProperty('--teal-ink', a.ink);
    const [r,g,b] = hexToRgb(a.teal);
    root.setProperty('--teal-rgb', `${r},${g},${b}`);
  }, [t.accent]);

  useEffect(() => {
    const duo = t.portrait === 'Teal duotone';
    document.querySelectorAll('.hero-slide img, .quote-bg img').forEach(im => {
      im.style.filter = duo
        ? 'grayscale(100%) contrast(1.05) brightness(.9) sepia(.4) hue-rotate(135deg) saturate(2.2)'
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
