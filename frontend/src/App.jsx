import { useEffect, useState } from 'react'
import { fetchHello, fetchTime } from './services/api';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [count, setCount] = useState(0)

  const [message, setMessage] = useState('');

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchTime().then(res => res.json()).then(data => {
      setCurrentTime(data.currentTime * 1000);
    });

    fetchHello().then(msg => setMessage(msg.message));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Flask + React App Test</h1>
      <p className="lead">{message}</p>
      <p>The current time is {new Date(currentTime).toLocaleString()}.</p>
    </div>
  );

  /*return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
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
  )
  */
}

export default App
