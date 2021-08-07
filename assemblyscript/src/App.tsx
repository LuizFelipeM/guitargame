import React, { useState } from 'react'
// import logo from './logo.svg';
import waApi from './wa-api';
import './App.css';
import { useEffect } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const test = async () => (await waApi).scramble('String de teste')

  const [value, setValue] = useState(5);
  const [result, setResult] = useState<number>();
  const [t, setT] = useState<string | number>('')

  useEffect(() => {
    (async () => setT(await test()))()
  }, [])

  return (
    <div className="App">
      <p>
        The factorial of
        <input value={value} onChange={evt => setValue(Number(evt.target.value))} />
        is {result}
      </p>
      <p>
        {t}
      </p>
      <button onClick={async () => setResult((await waApi).factorial(value))}>
        Calculate
      </button>
    </div>
  );
}


export default App;
