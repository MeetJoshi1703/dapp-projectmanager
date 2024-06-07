import React, { useState } from 'react';

const Log = () => {
  const [input, setInput] = useState('');
  const [displayedInputs, setDisplayedInputs] = useState([]);
  const [transactionResult, setTransactionResult] = useState('');

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
      setTransactionResult(data);

      setDisplayedInputs((prevInputs) => [...prevInputs, input]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Input Form</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          name="string"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your input"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Submitted Inputs:</h3>
        <ul>{displayedInputs.map((inputValue, index) => <li key={index} className="mb-1">{inputValue}</li>)}</ul>
      </div>
      {transactionResult && (
        <div className="mt-4 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Transaction Result:</h3>
          <table className="w-80% mx-auto table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Key</th>
                <th className="border border-gray-300 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(transactionResult).map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-gray-300 px-4 py-2">{key}</td>
                  <td className="border border-gray-300 px-4 py-2">{JSON.stringify(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Log;
