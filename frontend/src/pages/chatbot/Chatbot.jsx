import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners'; // Use a spinner for loading
import img from './chainfgpt-icon-ultraDetailed.png';
import mascot from './03-cgpt-mascot.png';
import mascot1 from './01-cgpt-mascot.png'
import './chatbot.css'
const Chatbot = () => {
  const [inputText, setInputText] = useState('');
  const [serverResponse, setServerResponse] = useState([
    { text: "Hi There !", type: 'user' },
    { text: "Hello, how can I assist you today?", type: 'bot' },
    { text: "Feel free to ask me anything!", type: 'bot' }
  ]);
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
      setServerResponse((prevResponses) => [...prevResponses, { text: inputText, type: 'user' }, { text: data.processedText, type: 'bot' }]);
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
    <>
      <div className="flex flex-col h-screen gap-10">
        <div className="text-center mt-4 mb-4">
          <h2 className="inline-block mr-2">Powered by chaingpt</h2>
          <img src={img} style={{ width: '5%', display: 'inline-block' }} alt="chaingpt logo" />
        </div>

        <div className="bg-gray-100 rounded-3xl h-4/6 w-8/12 flex flex-col max-w-lg mx-auto">
          <div className="bg-blue-500 p-4 text-white rounded-t-3xl flex justify-between items-center">

            <span>Chat Bot</span>
            <div className="relative inline-block text-left">
              <div id="dropdown-content" className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H12M15 21H12M12 21V18M12 18H19C20.1046 18 21 17.1046 21 16V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V16C3 17.1046 3.89543 18 5 18H12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>Appearance
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 ">
            <div className="flex flex-col space-y-4">
              {serverResponse.map((response, index) => (
                <div key={index} className={`flex ${response.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg p-2 ${response.type === 'user' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                    <pre className="whitespace-pre-wrap">{response.text}</pre>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-center items-center h-full">
                  <ClipLoader size={50} color={"#3b82f6"} />
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex items-center">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter text here..."
              className="flex-1 p-2 resize-none focus:outline-none border border-gray-300 rounded-lg"
              rows="2"
            />
            <button type="submit" className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
              Submit
            </button>
          </form>
        </div>
        {/* className="absolute bottom-0 right-0 mb-4 mr-4" */}
        <div className="image-container absolute -bottom-10 right-20 mb-4 mr-4">
        <img src={mascot} alt="CGPT mascot"  />
          {/* <img src={mascot1} alt="CGPT Mascot" /> */}
        <div className="trail"></div>
        </div>

      </div>
    </>
  );
};

export default Chatbot;
