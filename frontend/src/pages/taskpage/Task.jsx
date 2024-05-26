import React, { useState, useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';

const Task = () => {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);

  const [txn,setTxn]= useState("");

  const initialTasks = [
    { id: 1, name: 'Complete project report', deadline: '2024-06-01', completed: false },
    { id: 2, name: 'Finish the new feature implementation', deadline: '2024-06-05', completed: false },
    { id: 3, name: 'Review and merge pull requests', deadline: '2024-06-07', completed: false },
    { id: 4, name: 'Prepare for the client presentation', deadline: '2024-06-10', completed: false },
    { id: 5, name: 'HTL 3.0 Done and Dusted ', deadline: '2024-06-12', completed: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const handleComplete = async (id) => {
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeAddress: walletAddress // Sending walletAddress as employeeAddress
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      setTxn(result.txn); // Set the transaction hash in the state

      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: true } : task
      ));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h6>{txn}</h6>
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-md">
            <div>
              <h2 className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.name}</h2>
              <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>Deadline: {task.deadline}</p>
            </div>
            <button 
              className={`px-4 py-2 rounded ${task.completed ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`} 
              onClick={() => handleComplete(task.id)}
              disabled={task.completed}
            >
              {task.completed ? 'Completed' : 'Mark as Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
