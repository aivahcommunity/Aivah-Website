'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Users, Calendar, Building2, Sparkles } from 'lucide-react'
import AnimatedButton from '@/components/ui/AnimatedButton'
import FlipText from '@/components/ui/FlipText'
import PerspectiveGrid from '@/components/ui/PerspectiveGrid'
import { events } from './Events'
const stats = [
    { label: 'Members', value: 150, suffix: '+', icon: Users },
    { label: 'Events', value: 5, suffix: '+', icon: Calendar },
]

function useCountUp(target: number, duration = 2000, start = false) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!start) return
        let startTime: number | null = null
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [target, duration, start])
    return count
}

const StatCard: React.FC<{ label: string; value: number; suffix: string; icon: React.ElementType; delay: number; started: boolean }> = ({
    label, value, suffix, icon: Icon, delay, started
}) => {
    const count = useCountUp(value, 2000, started)
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="pointer-events-auto flex flex-col items-center gap-2 px-8 py-6 rounded-2xl glass-light border border-white/10
                 hover:border-teal-500/30 transition-all duration-300 group"
        >
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 group-hover:from-teal-500/30 group-hover:to-purple-500/30 transition-all">
                <Icon size={20} className="text-teal-400" />
            </div>
            <span className="font-display text-4xl font-bold gradient-text">
                {count}{suffix}
            </span>
            <span className="text-white/50 text-sm font-medium tracking-wide uppercase">{label}</span>
        </motion.div>
    )
}

const Hero: React.FC = () => {
    const statsRef = useRef<HTMLDivElement>(null)
    const [statsStarted, setStatsStarted] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

    const upcomingEvent = events.find(e => {
        if (e.status !== 'upcoming') return false;

        // Parse dates like "Mar 5-6, 2026" to "Mar 5, 2026" and check against current date
        const dateMatch = e.date.match(/([a-zA-Z]+)\s+(\d+)(?:-\d+)?(?:,\s*(\d{4}))?/);
        if (dateMatch) {
            const [, month, day, year] = dateMatch;
            const eventYear = year || new Date().getFullYear();
            const startDate = new Date(`${month} ${day}, ${eventYear} 00:00:00`);
            return new Date() < startDate;
        }

        // Fallback for normal dates
        const date = new Date(e.date);
        if (!isNaN(date.getTime())) {
            return new Date() < date;
        }

        return true;
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsStarted(true) },
            { threshold: 0.3 }
        )
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02)
        mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02)
    }

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy"
            onMouseMove={handleMouseMove}
        >
            {/* Perspective grid background */}
            <div className="absolute inset-0 z-0">
                <PerspectiveGrid gridSize={35} fadeRadius={72} />
            </div>

            {/* Animated background orbs */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="orb w-[600px] h-[600px] bg-teal-500 top-[-200px] left-[-200px] opacity-10" />
                <div className="orb w-[500px] h-[500px] bg-purple-500 bottom-[-150px] right-[-150px] opacity-10 animation-delay-2000" style={{ animationDelay: '2s' }} />
                <div className="orb w-[300px] h-[300px] bg-pink-500 top-[40%] left-[60%] opacity-8" style={{ animationDelay: '4s' }} />
            </motion.div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(28,167,199,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(28,167,199,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 pointer-events-none max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                     bg-gradient-to-r from-teal-500/15 to-purple-500/15 border border-teal-500/30"
                >
                    <Sparkles size={14} className="text-pink-400 animate-pulse" />
                    <span className="text-sm font-medium text-teal-300 tracking-wide">Aivah Community</span>
                    <Sparkles size={14} className="text-pink-400 animate-pulse" />
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-6"
                >
                    Where{' '}
                    <FlipText className="text-teal-400" duration={5} delay={0} loop={false}>Builders,</FlipText>
                    <br />
                    <FlipText className="text-purple-400" duration={5} delay={1} loop={false}>Creators</FlipText>
                    {' '}&{' '}
                    <FlipText className="text-pink-400" duration={5} delay={2} loop={false}>Dreamers</FlipText>
                    <br />
                    <span className="text-white/80 text-4xl sm:text-5xl md:text-6xl">Converge.</span>
                </motion.h1>

                {/* Mission */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Aivah is more than a community — it's a movement. We connect ambitious students across colleges to build, learn, and lead together.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="pointer-events-auto flex items-center justify-center mb-20"
                >
                    <AnimatedButton
                        variant="outline"
                        size="lg"
                        className="border-white/20 text-white hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(255,79,216,0.3)] min-w-[200px]"
                        onClick={() => scrollToSection('events')}
                    >
                        Explore Events
                        <ArrowRight size={18} />
                    </AnimatedButton>
                </motion.div>

                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                    {stats.map((stat, i) => (
                        <StatCard
                            key={stat.label}
                            {...stat}
                            delay={0.9 + i * 0.1}
                            started={statsStarted}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >

                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[1px] h-8 bg-gradient-to-b from-teal-500 to-transparent"
                />
            </motion.div>

            {/* Upcoming Event Announcement */}
            {upcomingEvent && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.6, type: 'spring' }}
                    className="absolute z-20 top-24 right-4 md:top-32 md:right-8 pointer-events-none"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        onClick={() => scrollToSection('events')}
                        className="relative group cursor-pointer pointer-events-auto"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative flex items-center gap-3 bg-navy/80 backdrop-blur-md border border-white/10 p-3 pr-4 rounded-2xl hover:border-teal-500/30 transition-all">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="text-teal-400 w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-wider font-bold text-teal-400 mb-0.5 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                                    Upcoming Event
                                </div>
                                <h4 className="text-white font-display font-medium text-sm line-clamp-1 pr-2">{upcomingEvent.title}</h4>
                            </div>
                            <div className="ml-1 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all shrink-0">
                                <ArrowRight size={14} className="text-white/40 group-hover:text-teal-400" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    )
}

export default Hero
