// refined for vite
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Info, Calendar, Users, Image, Mail, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: Info },
    { label: 'Events', href: '#events', icon: Calendar },
    { label: 'Team', href: '#team', icon: Users },
    { label: 'Gallery', href: '#gallery', icon: Image },
    { label: 'Contact', href: '#contact', icon: Mail },
]

const Navbar: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home')
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40)
            const sections = navItems.map(l => l.href.replace('#', ''))
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(id)
                    break
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        setMobileOpen(false)
        document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <ScrollProgress />

            <motion.header
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
                    scrolled
                        ? 'border-b border-white/10'
                        : 'border-b border-transparent'
                )}
                style={{
                    background: scrolled
                        ? 'rgba(8, 15, 35, 0.85)'
                        : 'rgba(8, 15, 35, 0.5)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                }}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
                        className="flex items-center gap-2.5 flex-shrink-0"
                        whileHover={{ scale: 1.04 }}
                    >
                        <img src="/aivah-logo.png" alt="Aivah" className="h-12 w-12 rounded-full object-cover" />
                        <span className="font-bold text-2xl gradient-text tracking-widest">AIVAH</span>
                    </motion.a>

                    {/* Desktop nav — spread across remaining space */}
                    <nav className="hidden md:flex items-center justify-end flex-1 gap-1 ml-8">
                        {navItems.map((item, index) => {
                            const Icon = item.icon
                            const isActive = activeSection === item.href.replace('#', '')
                            const isHovered = hoveredIndex === index

                            return (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl cursor-pointer min-w-[64px]"
                                    whileTap={{ scale: 0.93 }}
                                    animate={{
                                        y: isHovered ? -2 : 0,
                                        backgroundColor: isActive
                                            ? 'rgba(28,167,199,0.12)'
                                            : isHovered
                                                ? 'rgba(255,255,255,0.06)'
                                                : 'rgba(0,0,0,0)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                                >
                                    <motion.div
                                        animate={{ scale: isHovered ? 1.15 : 1 }}
                                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                                    >
                                        <Icon
                                            size={18}
                                            strokeWidth={2}
                                            className={cn(
                                                'transition-colors duration-200',
                                                isActive ? 'text-teal-400' : isHovered ? 'text-white' : 'text-white/50'
                                            )}
                                        />
                                    </motion.div>
                                    <span className={cn(
                                        'text-[10px] font-medium tracking-wide transition-colors duration-200',
                                        isActive ? 'text-teal-400' : isHovered ? 'text-white/90' : 'text-white/40'
                                    )}>
                                        {item.label}
                                    </span>

                                    {/* Active underline */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-teal-400"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.a>
                            )
                        })}
                    </nav>

                    {/* Mobile hamburger */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-3 right-3 z-40 rounded-2xl border border-white/10 px-3 py-3 md:hidden"
                        style={{
                            background: 'rgba(8, 15, 35, 0.95)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                    >
                        <div className="flex flex-col gap-1">
                            {navItems.map((item, i) => {
                                const Icon = item.icon
                                const isActive = activeSection === item.href.replace('#', '')
                                return (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                                            isActive ? 'text-teal-400 bg-teal-500/10' : 'text-white/60 hover:text-white hover:bg-white/5'
                                        )}
                                    >
                                        <Icon size={17} strokeWidth={2} />
                                        {item.label}
                                    </motion.a>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

const ScrollProgress: React.FC = () => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
            <div className="h-full bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500" style={{ width: `${progress}%`, transition: 'width 0.1s' }} />
        </div>
    )
}

export default Navbar
