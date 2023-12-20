import { useState } from 'react'

import './App.scss'
import MainLayout from './Components/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
<MainLayout/>

  </>
  )
}

export default App
