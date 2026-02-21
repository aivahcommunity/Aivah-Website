'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

type Member = {
    name: string
    role: string
    dept: string
    avatar: string
}

const teamData: Record<string, Member[]> = {
    '2023':[
        { name: 'N Anvitha Rao', role: 'President', dept: 'Tech', avatar: 'NA' },
    ],

    '2024': [
        { name: 'Chaitanya', role: 'President', dept: 'Tech', avatar: 'C' },
    ],
    '2026': [
        { name: 'G. Akshitha', role: 'President', dept: 'Tech', avatar: 'GA' },
        { name: 'B. Pranay', role: 'Vice President', dept: 'Community', avatar: 'BP' },
        { name: 'Ch. Jahnavi', role: 'Vice President', dept: 'Community', avatar: 'CJ' },
        { name: 'K. Omguru Sai', role: 'Secretary', dept: 'Ops', avatar: 'KO' },
        { name: 'B. Shamith Raju', role: 'Secretary', dept: 'Ops', avatar: 'BS' },
        { name: 'G. Uday', role: 'Secretary', dept: 'Ops', avatar: 'GU' },
        { name: 'G. Manjunada', role: 'Treasurer', dept: 'Ops', avatar: 'GM' },
        { name: 'V. Sri Venkateshwar Rao', role: 'Treasurer', dept: 'Ops', avatar: 'VS' },
        { name: 'S. Rakesh', role: 'Public Relations', dept: 'Marketing', avatar: 'SR' },
        { name: 'B. Moksha', role: 'Public Relations', dept: 'Marketing', avatar: 'BM' },
        { name: 'M. Sricharana', role: 'Public Relations', dept: 'Marketing', avatar: 'MS' },
        { name: 'E. Poojitha', role: 'Public Relations', dept: 'Marketing', avatar: 'EP' },
        { name: 'M. Akhil Reddy', role: 'Executive Board', dept: 'Community', avatar: 'MA' },
        { name: 'S. Ananda Vardhan', role: 'Executive Board', dept: 'Community', avatar: 'SA' },
        { name: 'J. Sai Keerthi', role: 'Executive Board', dept: 'Community', avatar: 'JK' },
        { name: 'G. Likhitha', role: 'Executive Board', dept: 'Community', avatar: 'GL' },
        { name: 'V. Suresh', role: 'Technical', dept: 'Tech', avatar: 'VS' },
        { name: 'G. Sai Reddy', role: 'Technical', dept: 'Tech', avatar: 'GS' },
        { name: 'H. Puttraj', role: 'Technical', dept: 'Tech', avatar: 'HP' },
        { name: 'D. Sathwik', role: 'Technical', dept: 'Tech', avatar: 'DS' },
        { name: 'Md. Junedh', role: 'Technical', dept: 'Tech', avatar: 'MJ' },
        { name: 'B. Rohith', role: 'Technical', dept: 'Tech', avatar: 'BR' },
        { name: 'A. Madhu Priya', role: 'Technical', dept: 'Tech', avatar: 'AM' },
        { name: 'P. Doleshwar', role: 'Technical', dept: 'Tech', avatar: 'PD' },
        { name: 'P. Peterson', role: 'Design', dept: 'Design', avatar: 'PP' },
        { name: 'A. Arun', role: 'Design', dept: 'Design', avatar: 'AA' },
        { name: 'N. Narenraj', role: 'Design', dept: 'Design', avatar: 'NN' },
        { name: 'K. Navya Sree', role: 'Design', dept: 'Design', avatar: 'KN' },
        { name: 'B. Haricharan', role: 'Design', dept: 'Design', avatar: 'BH' },
        { name: 'Ch. Vaishnavi', role: 'Design', dept: 'Design', avatar: 'CV' },
        { name: 'M. Sai Charan', role: 'Design', dept: 'Design', avatar: 'MC' },
        { name: 'K. Lasya', role: 'Design', dept: 'Design', avatar: 'KL' },
        { name: 'K. Ganesh', role: 'Documentation', dept: 'Ops', avatar: 'KG' },
        { name: 'T. ManiSharan', role: 'Documentation', dept: 'Ops', avatar: 'TM' },
        { name: 'E. Sai Snigdha', role: 'Documentation', dept: 'Ops', avatar: 'ES' },
        { name: 'M. Supriya', role: 'Documentation', dept: 'Ops', avatar: 'MS' },
        { name: 'L. Rahul', role: 'Event Organization', dept: 'Ops', avatar: 'LR' },
        { name: 'P. Sai Divya', role: 'Event Organization', dept: 'Ops', avatar: 'PS' },
        { name: 'D. ChandraShekar', role: 'Event Organization', dept: 'Ops', avatar: 'DC' },
        { name: 'A. Lohith', role: 'Event Organization', dept: 'Ops', avatar: 'AL' },
        { name: 'T. Easha', role: 'Event Organization', dept: 'Ops', avatar: 'TE' },
        { name: 'G. Tejaswini', role: 'Event Organization', dept: 'Ops', avatar: 'GT' },
        { name: 'G. Avinash', role: 'Event Organization', dept: 'Ops', avatar: 'GA' },
        { name: 'J. Deepika', role: 'Event Organization', dept: 'Ops', avatar: 'JD' },
    ],
}

const years = ['2023', '2024', '2026']

const deptColors: Record<string, string> = {
    Tech: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400',
    Design: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
    Community: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400',
    Marketing: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-400',
    Ops: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
}

const avatarGradients = [
    'from-teal-500 to-cyan-500',
    'from-purple-500 to-violet-500',
    'from-pink-500 to-rose-500',
    'from-orange-500 to-yellow-500',
    'from-green-500 to-emerald-500',
    'from-blue-500 to-indigo-500',
]

const rotations = [4, -2, -9, 7, 3, -5, 8, -3]

const Team: React.FC = () => {
    const [activeYear, setActiveYear] = useState('2026')
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [paused, setPaused] = useState(false)
    const [slideKey, setSlideKey] = useState(0)

    const members = teamData[activeYear]
    const activeItem = members[activeIndex]

    // Auto-play — pauses on hover
    useEffect(() => {
        if (paused) return
        const id = setInterval(() => {
            setDirection(1)
            setActiveIndex((prev) => (prev + 1) % members.length)
            setSlideKey((k) => k + 1)
        }, 3000)
        return () => clearInterval(id)
    }, [members.length, activeYear, paused])

    const handleNext = () => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % members.length)
        setSlideKey((k) => k + 1)
    }

    const handlePrev = () => {
        setDirection(-1)
        setActiveIndex((prev) => (prev - 1 + members.length) % members.length)
        setSlideKey((k) => k + 1)
    }

    const handleYearChange = (year: string) => {
        setActiveYear(year)
        setActiveIndex(0)
        setDirection(1)
    }

    const deptStyle = deptColors[activeItem.dept] || deptColors['Tech']
    const gradIdx = activeIndex % avatarGradients.length

    return (
        <section id="team" className="relative bg-navy overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb w-[500px] h-[500px] bg-purple-500 top-[-100px] left-[-150px] opacity-8" />
                <div className="orb w-[300px] h-[300px] bg-pink-500 bottom-[5%] right-[-80px] opacity-8" style={{ animationDelay: '3s' }} />
            </div>

            <div className="section-padding max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    badge="The People"
                    title="Meet the"
                    highlight="Team"
                    subtitle="The passionate students behind Aivah at Malla Reddy Deemed to be University."
                />

                {/* Year Tabs */}
                <div className="flex justify-center mb-14">
                    <div className="flex items-center gap-1 p-1.5 rounded-2xl glass border border-white/10">
                        {years.map((year) => (
                            <motion.button
                                key={year}
                                onClick={() => handleYearChange(year)}
                                whileTap={{ scale: 0.97 }}
                                className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeYear === year ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {activeYear === year && (
                                    <motion.div
                                        layoutId="year-tab"
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{year === '2026' ? '2025-26' : year}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Card stack + info panel */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16"
                    style={{ perspective: '1400px' }}
                >
                    {/* Stacked card deck — hover pauses auto-play */}
                    <div
                        className="relative w-52 h-64 flex-shrink-0"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <AnimatePresence custom={direction}>
                            {members.map((member, index) => {
                                const isActive = index === activeIndex
                                const offset = index - activeIndex
                                const rot = rotations[index % rotations.length]
                                const gradI = index % avatarGradients.length

                                return (
                                    <motion.div
                                        key={`${activeYear}-${index}`}
                                        className="absolute inset-0 w-full h-full rounded-2xl border border-white/15 shadow-2xl flex flex-col items-center justify-center gap-3 p-5"
                                        style={{ backgroundColor: '#0c1628' }}
                                        initial={{
                                            x: offset * 15,
                                            y: Math.abs(offset) * 6,
                                            z: -150 * Math.abs(offset),
                                            scale: 0.85 - Math.abs(offset) * 0.04,
                                            rotateZ: rot,
                                            opacity: isActive ? 1 : Math.abs(offset) > 3 ? 0 : 0.55,
                                            zIndex: 10 - Math.abs(offset),
                                        }}
                                        animate={isActive ? {
                                            x: [offset * 15, direction === 1 ? -200 : 200, 0],
                                            y: [Math.abs(offset) * 6, 0, 0],
                                            z: [-200, 150, 250],
                                            scale: [0.85, 1.05, 1],
                                            rotateZ: [rot, direction === 1 ? -5 : 5, 0],
                                            opacity: 1,
                                            zIndex: 100,
                                        } : {
                                            x: offset * 15,
                                            y: Math.abs(offset) * 6,
                                            z: -150 * Math.abs(offset),
                                            rotateZ: rot,
                                            scale: 0.85 - Math.abs(offset) * 0.04,
                                            opacity: Math.abs(offset) > 3 ? 0 : 0.55,
                                            zIndex: 10 - Math.abs(offset),
                                        }}
                                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-white text-xl bg-gradient-to-br ${avatarGradients[gradI]}`}>
                                            {member.avatar}
                                        </div>
                                        {isActive && (
                                            <div className="text-center">
                                                <p className="text-white font-bold text-sm leading-tight">{member.name}</p>
                                                <p className="text-white/50 text-xs mt-0.5">{member.role}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Info panel */}
                    <div className="flex flex-col gap-6 max-w-xs w-full">
                        {/* Counter */}
                        <p className="font-mono text-sm text-white/40 text-right">
                            {activeIndex + 1} / {members.length}
                        </p>

                        {/* Active member details — slideKey forces re-mount on every change */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeYear}-${activeIndex}-${slideKey}`}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -25 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col gap-3"
                            >
                                {activeItem.role === 'President' && (
                                    <span className="inline-flex w-fit px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-black tracking-wide">
                                        👑 President
                                    </span>
                                )}
                                <h3 className="font-display text-3xl font-bold text-white leading-tight">
                                    {activeItem.name}
                                </h3>
                                <p className="text-white/50 text-base">{activeItem.role}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center gap-3 mt-2">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.08 }}
                                onClick={handlePrev}
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-teal-500/20 hover:border-teal-500/40 text-white transition-all"
                            >
                                <ArrowLeft size={16} />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.08 }}
                                onClick={handleNext}
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-teal-500/20 hover:border-teal-500/40 text-white transition-all"
                            >
                                <ArrowRight size={16} />
                            </motion.button>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team
