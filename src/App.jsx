import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Booking from './pages/Booking'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery"  element={<Gallery />}  />
          <Route path="/booking"  element={<Booking />}  />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
