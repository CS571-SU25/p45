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
      bgImage: "",
    };

    setDestinations([...destinations, newDestination]);
    setPlace("");
    setNote("");
  };

  const toggleVisited = (name) => {
    const updated = destinations.map(d =>
      d.name === name ? { ...d, visited: !d.visited } : d
    );
    setDestinations(updated);
  };

  const removePlace = (name) => {
    const updated = destinations.filter(d => d.name !== name);
    setDestinations(updated);
  };

  const handleImageUpload = (name, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = destinations.map(d =>
        d.name === name ? { ...d, bgImage: reader.result } : d
      );
      setDestinations(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e, name) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      const updated = destinations.map(d =>
        d.name === name ? { ...d, bgImage: '' } : d
      );
      setDestinations(updated);
    }
  };

  const visitedCount = destinations.filter(d => d.visited).length;

  const [sortBy, setSortBy] = useState('default');

    const sortedDestinations = [...destinations].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'visited') return (a.visited === b.visited) ? 0 : a.visited ? 1 : -1;
      return 0;
    });// Default order

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
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
      

      <div style={{ marginBottom: '10px' }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: '10px' }}>
          <option value="default">Given Order</option>
          <option value="name">Name (A-Z)</option>
          <option value="visited">Visited Status</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        {sortedDestinations.map((dest, index) => (
          <div
            key={dest.name}
            onContextMenu={(e) => handleRemoveImage(e, dest.name)}
            style={{
              position: 'relative',
              backgroundImage: `url(${dest.bgImage || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: '#fff',
              padding: '15px',
              borderRadius: '10px',
              height: '200px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'context-menu'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '10px',
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3>{dest.name}</h3>
              <p>{dest.note}</p>
              {!dest.bgImage && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(dest.name, e.target.files[0])}
                  style={{ marginTop: '8px' }}
                />
              )}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <button onClick={() => toggleVisited(dest.name)} style={{ marginRight: '10px' }}>
                {dest.visited ? 'Unvisit' : 'Mark as Visited'}
              </button>
              <button onClick={() => removePlace(dest.name)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
