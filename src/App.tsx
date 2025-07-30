import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar2 from './components/Navbar2'
import Header62 from './components/Header62'
import Gallery15 from './components/Gallery15'
import Banner15 from './components/Banner15'
import Pricing23 from './components/Pricing23'
import Stats55 from './components/Stats55'
import Layout238 from './components/Layout238'
import Layout299 from './components/Layout299'
import Testimonial22 from './components/Testimonial22'
import { Footer11 } from './components/Footer11'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar2 />
      <Header62 />
      <Gallery15 />
      <Banner15 />
      <Pricing23 />
      <Stats55 />
      <Layout238 />
      <Layout299 />
      <Testimonial22 />
      <Footer11 />
    </>
  )
}

export default App
