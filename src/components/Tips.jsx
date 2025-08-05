import { useState, useEffect } from 'react';

export default function Tips() {
  const [tips, setTips] = useState(() => {
    const saved = localStorage.getItem('userTips');
    return saved ? JSON.parse(saved) : [
      { state: "California", tip: "Visit the coast early — traffic builds fast." },
      { state: "New York", tip: "Use public transit — it is faster and cheaper." },
      { state: "Colorado", tip: "Altitude is real — drink water and take breaks." },
      { state: "Florida", tip: "Bring sunscreen, even in winter." },
      { state: "Texas", tip: "Cities are far apart — plan your driving time." },
      { state: "Hawaii", tip: "Respect local culture and natural areas." }
    ];
  });

  const [state, setState] = useState('');
  const [tip, setTip] = useState('');

  useEffect(() => {
    localStorage.setItem('userTips', JSON.stringify(tips));
  }, [tips]);

  const addTip = (e) => {
    e.preventDefault();
    if (!state || !tip.trim()) return;
    setTips([...tips, { state, tip: tip.trim() }]);
    setState('');
    setTip('');
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>Travel Tips by State ✈️</h2>

      <form onSubmit={addTip} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
          style={{ padding: '10px' }}
        />
        <textarea
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          placeholder="Your tip..."
          required
          style={{ padding: '10px', minHeight: '60px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Add Tip</button>
      </form>

      <ul>
        {tips.map((t, i) => (
          <li key={i}><strong>{t.state}:</strong> {t.tip}</li>
        ))}
      </ul>
    </div>
  );
}
