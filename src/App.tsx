import React from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Events from '@/sections/Events'
import Team from '@/sections/Team'
import Gallery from '@/sections/Gallery'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

import CursorGlow from '@/components/ui/CursorGlow'

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-navy text-white relative">
            <CursorGlow />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Events />
                <Team />
                <Gallery />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
