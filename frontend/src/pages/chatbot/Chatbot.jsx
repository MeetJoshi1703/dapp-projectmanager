import React, { useState } from 'react';

const Chatbot = () => {
  const [inputText, setInputText] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendTextToServer = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chaingpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setServerResponse(data.processedText);
      setInputText('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTextToServer();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextToServer();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="h-80 overflow-y-auto flex flex-col justify-end p-4 text-black">
          <div className="flex justify-end mb-2">
            {loading ? (
              <div className="px-4 py-2 bg-blue-500 text-white rounded-lg">Loading...</div>
            ) : (
              <pre className="px-4 py-2 bg-gray-200 text-black rounded-lg whitespace-pre-wrap">{serverResponse}</pre>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border-t border-gray-200">
          <div className="flex items-center p-4">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter text here..."
              className="flex-1 p-2 resize-none focus:outline-none border border-gray-300 rounded-lg"
            />
            <button type="submit" className=" p-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
