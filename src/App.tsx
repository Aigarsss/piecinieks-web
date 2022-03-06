import { useState } from 'react'
import Test from "./Components/Test/Test";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Test />
        <div className="test">
            test2
        </div>
    </div>
  )
}

export default App
