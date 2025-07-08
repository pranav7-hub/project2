import React, { useState } from 'react';
import Welcome from './Welcome';
import Button from './Button';
import UserCard from './UserCard';
import Weather from './Weather';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SimpleForm from './SimpleForm';

function App() {
  const items = ['Milk', 'Bread', 'Eggs'];
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <div>
        <h2>✅ Todo List</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a task"
        />
        <button onClick={addTask}>Add</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.text}
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
      <h1>Welcome to My App</h1>
      <SimpleForm />
    </div>

      <div>
        <h1>🌍 My Weather App</h1>
        <Weather />
      </div>

      <div>
        <h1>👋 Main App</h1>
        <Welcome />
      </div>

      <div>
        <h2>🛒 My Shopping List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h1>User Info</h1>
        <UserCard
          name="Pranav"
          email="pranavganesh2019@gmail.com"
          location="Bangalore"
        />
        <UserCard
          name="Ganesh"
          email="ganesh.krish2021@gmail.com"
          location="New Delhi"
        />
      </div>

      <div>
        <h1>Hello from App!</h1>
        <Button />
      </div>

      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
