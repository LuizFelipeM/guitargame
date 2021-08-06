import React, { useState } from 'react'
import logo from './logo.svg';
import waApi from './wa-api';
import './App.css';

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
  const [value, setValue] = useState(5);
  const [result, setResult] = useState<number>();

  return (
    <div className="App">
      <p>
        The factorial of
        <input value={value} onChange={evt => setValue(Number(evt.target.value))} />
        is {result}
      </p>
      <button onClick={async () => setResult((await waApi).exports.factorial(value))}>
        Calculate
      </button>
    </div>
  );
}


export default App;
