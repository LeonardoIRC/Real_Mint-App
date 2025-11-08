import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>RealMintGPT</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edite <code>src/App.jsx</code> e salve para testar HMR
          </p>
        </div>
      </header>
    </div>
  )
}

export default App

