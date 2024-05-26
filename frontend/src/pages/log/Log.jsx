import React, { useState } from 'react';

const Log = () => {
  const [input, setInput] = useState('');
  const [displayedInputs, setDisplayedInputs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setDisplayedInputs((prevInputs) => [...prevInputs, input]); // Append the new input to the array
      setInput(''); // Reset the input field after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Input Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          name='string'
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your input"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Submitted Inputs:</h3>
        <ul>
          {displayedInputs && displayedInputs.map((inputValue, index) => (
            <li key={index}>{inputValue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Log;
