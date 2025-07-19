import { useState, useEffect } from 'react';

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

export default function YourWishlist() {
  const [place, setPlace] = useState('');
  const [note, setNote] = useState('');
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('travelWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('travelWishlist', JSON.stringify(destinations));
  }, [destinations]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!place) return;

    const isDuplicate = destinations.some((d) => d.name === place);
    if (isDuplicate) {
      alert("You already added that state!");
      return;
    }

    const newDestination = {
      name: place,
      note: note.trim(),
      visited: false,
    };

    setDestinations([...destinations, newDestination]);
    setPlace("");
    setNote("");
  };

  const toggleVisited = (index) => {
    const updated = [...destinations];
    updated[index].visited = !updated[index].visited;
    setDestinations(updated);
  };

  const removePlace = (index) => {
    const updated = destinations.filter((_, i) => i !== index);
    setDestinations(updated);
  };

  const visitedCount = destinations.filter(d => d.visited).length;

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Mini Travel Wishlist for U.S.</h1>
      <p>
        Visited: <strong>{visitedCount}</strong> / {destinations.length}
      </p>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            style={{ flex: '1 1 200px', padding: '10px' }}
        >
            <option value="">Select a State</option>
            {usStates.map((state) => (
                <option key={state} value={state}>{state}</option>
            ))}
        </select>

        <input
            type="text"
            placeholder="Optional description"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ flex: '1 1 200px', padding: '10px' }}
        />

        <button type="submit" style={{ padding: '10px' }}>Add</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {destinations.map((dest, index) => (
          <div
            key={index}
            style={{
              backgroundColor: dest.visited ? '#e0ffe0' : '#fff',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>{dest.name}</h3>
            <p>{dest.note}</p>
            <button onClick={() => toggleVisited(index)} style={{ marginRight: '10px' }}>
              {dest.visited ? 'Unvisit' : 'Mark as Visited'}
            </button>
            <button onClick={() => removePlace(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
