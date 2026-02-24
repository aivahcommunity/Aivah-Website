import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Events from '@/sections/Events'
import Team from '@/sections/Team'
import Gallery from '@/sections/Gallery'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import Intro from '@/components/Intro'

const App: React.FC = () => {
    const [introComplete, setIntroComplete] = useState(false)

    return (
        <>
            {/* Intro overlay — stays on top until done */}
            <Intro onDone={() => setIntroComplete(true)} />

            {/* Main site revealed after intro */}
            <AnimatePresence>
                {introComplete && (
                    <motion.div
                        key="main-app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="min-h-screen bg-navy text-white relative"
                    >
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
                        <SpeedInsights />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default App
