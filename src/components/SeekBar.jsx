import React, { useState } from 'react';

const SeekBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Inline styles for the container and elements
  const containerStyle = {
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  const seekBarStyle = {
    width: '100%',
    height: '15px',
    appearance: 'none',
    outline: 'none',
    background: `linear-gradient(
      to right,
      rgb(230, 230, 230) 0%,
      rgb(79, 79, 79) ${value}%,
      rgb(230, 230, 230) ${value}%,
      rgb(79, 79, 79) ${value + 10}%,
      rgb(230, 230, 230) ${value + 10}%,
      rgb(79, 79, 79) ${value + 20}%,
      rgb(230, 230, 230) ${value + 20}%,
      rgb(79, 79, 79) ${value + 30}%,
      rgb(230, 230, 230) ${value + 30}%,
      rgb(79, 79, 79) ${value + 40}%,
      rgb(230, 230, 230) ${value + 40}%,
      rgb(79, 79, 79) ${value + 50}%,
      rgb(230, 230, 230) ${value + 50}%,
      rgb(79, 79, 79) ${value + 60}%,
      rgb(230, 230, 230) ${value + 60}%,
      rgb(79, 79, 79) ${value + 70}%,
      rgb(230, 230, 230) ${value + 70}%,
      rgb(79, 79, 79) ${value + 80}%,
      rgb(230, 230, 230) ${value + 80}%,
      rgb(79, 79, 79) ${value + 90}%,
      rgb(230, 230, 230) ${value + 90}%,
      rgb(79, 79, 79) 100%
    )`,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  };

  const thumbStyle = {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: '#333',
    cursor: 'pointer',
    borderRadius: '50%',
  };

  const labelsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '16px',
    color: '#4b4b4b',
  };

  const labelStyle = {
    width: '8.33%',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={handleChange}
        style={seekBarStyle}
      />
      <div style={labelsStyle}>
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} style={labelStyle}>
            {i * 2}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeekBar;