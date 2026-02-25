'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { TextRoll } from '@/components/ui/TextRoll'

type Member = {
    name: string
    role: string
    dept: string
    avatar: string
}

const combinedPhotos: Record<string, string[]> = {
    '2023': [
        '/2023 team/SnapInsta.to_440652129_807954387366522_6654470013083947613_n.jpg',
        '/2023 team/SnapInsta.to_440656371_814252910558739_5125221242916162226_n.jpg',
        '/2023 team/SnapInsta.to_440660165_1838386093251729_2962630681208598365_n.jpg',
        '/2023 team/SnapInsta.to_440666034_953939853106903_9147263138721894239_n.jpg',
        '/2023 team/SnapInsta.to_440683623_1552960145247430_1078725235573752211_n.jpg'
    ],
    '2024': [
        '/2024 team/1.jpg',
        '/2024 team/2.jpg',
        '/2024 team/3.jpg',
        '/2024 team/4.jpg',
        '/2024 team/5.jpg',
        '/2024 team/6.jpg',
        '/2024 team/7.jpg',
        '/2024 team/8.jpg',
        '/2024 team/9.jpg',
        '/2024 team/10.jpg',
        '/2024 team/11.jpg',
        '/2024 team/12.jpg',
        '/2024 team/13.jpg'
    ],
    '2026': [
        '/2025 team/1president.jpg.jpeg',
        '/2025 team/2vicepresidents.jpeg',
        '/2025 team/3secretaries.jpeg',
        '/2025 team/4executive-board.jpeg',
        '/2025 team/4treasuries.jpeg',
        '2025 team/5pr.jpg.jpeg',
        '/2025 team/5event organizers.jpeg',
        '/2025 team/6Designers.jpg.jpeg',
        '/2025 team/7technical.jpeg',
        '/2025 team/documentation.jpeg',
        '/2025 team/zinterns.jpeg',
    ]
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
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)


    const photos = combinedPhotos[activeYear] || []
    const items = [...photos]
    const itemCount = items.length
    const activeItem = items[activeIndex]
    const isPhotoActive = typeof activeItem === 'string'

    // Auto-play — pauses on hover
    useEffect(() => {
        if (paused || itemCount === 0) return
        const id = setInterval(() => {
            setDirection(1)
            setActiveIndex((prev) => (prev + 1) % itemCount)
            setSlideKey((k) => k + 1)
        }, 3000)
        return () => clearInterval(id)
    }, [itemCount, activeYear, paused])

    const handleNext = () => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % itemCount)
        setSlideKey((k) => k + 1)
    }

    const handlePrev = () => {
        setDirection(-1)
        setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
        setSlideKey((k) => k + 1)
    }

    const handleYearChange = (year: string) => {
        setActiveYear(year)
        setActiveIndex(0)
        setDirection(1)
    }

    const deptStyle = !isPhotoActive && activeItem ? (deptColors[(activeItem as Member).dept] || deptColors['Tech']) : ''
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
                                initial="initial"
                                whileHover="hovered"
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
                                <span className="relative z-10">
                                    <TextRoll>{year === '2026' ? '2025-26' : year}</TextRoll>
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Card stack + info panel */}
                <div
                    className="flex flex-col items-center justify-center gap-10"
                    style={{ perspective: '1400px' }}
                >
                    {/* Stacked card deck — hover pauses auto-play */}
                    <div
                        className={`relative flex-shrink-0 transition-all duration-500 ease-in-out ${isPhotoActive ? 'w-full max-w-sm sm:max-w-md h-64 sm:h-80' : 'w-52 h-64'}`}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <AnimatePresence custom={direction}>
                            {items.map((item, index) => {
                                const isActive = index === activeIndex
                                const offset = index - activeIndex
                                const rot = rotations[index % rotations.length]
                                const isItemPhoto = typeof item === 'string'

                                if (isItemPhoto) {
                                    const photo = item as string;
                                    return (
                                        <motion.div
                                            key={`${activeYear}-photo-${index}`}
                                            className="absolute inset-0 w-full h-full rounded-2xl border border-white/15 shadow-2xl overflow-hidden cursor-zoom-in"
                                            onClick={() => setSelectedPhoto(photo)}
                                            style={{ backgroundColor: '#0c1628' }}
                                            initial={{
                                                x: offset * 30,
                                                y: Math.abs(offset) * 10,
                                                z: -200 * Math.abs(offset),
                                                scale: 0.9 - Math.abs(offset) * 0.05,
                                                rotateZ: rot,
                                                opacity: isActive ? 1 : Math.abs(offset) > 3 ? 0 : 0.4,
                                                zIndex: 10 - Math.abs(offset),
                                            }}
                                            animate={isActive ? {
                                                x: [offset * 30, direction === 1 ? -250 : 250, 0],
                                                y: [Math.abs(offset) * 10, 0, 0],
                                                z: [-300, 200, 300],
                                                scale: [0.9, 1.05, 1],
                                                rotateZ: [rot, direction === 1 ? -6 : 6, 0],
                                                opacity: 1,
                                                zIndex: 100,
                                            } : {
                                                x: offset * 30,
                                                y: Math.abs(offset) * 10,
                                                z: -200 * Math.abs(offset),
                                                rotateZ: rot,
                                                scale: 0.9 - Math.abs(offset) * 0.05,
                                                opacity: Math.abs(offset) > 3 ? 0 : 0.4,
                                                zIndex: 10 - Math.abs(offset),
                                            }}
                                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <img src={photo} alt={`${activeYear} Team  ${index + 1}`} className="w-full h-full object-contain bg-[#0c1628]" />
                                        </motion.div>
                                    )
                                } else {
                                    const member = item as Member;
                                    const gradI = index % avatarGradients.length

                                    return (
                                        <motion.div
                                            key={`${activeYear}-member-${index}`}
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
                                }
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Info panel */}
                    <div className="flex flex-col items-center text-center gap-5 max-w-md w-full">
                        {/* Counter */}
                        <p className="font-mono text-sm text-white/40">
                            {activeIndex + 1} / {itemCount}
                        </p>

                        {/* Active member details — slideKey forces re-mount on every change */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeYear}-${activeIndex}-${slideKey}`}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -25 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col items-center gap-3"
                            >
                                {!isPhotoActive && activeItem ? (
                                    <>
                                        {(activeItem as Member).role === 'President' && (
                                            <span className="inline-flex w-fit px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-black tracking-wide">
                                                👑 President
                                            </span>
                                        )}
                                        <h3 className="font-display text-3xl font-bold text-white leading-tight">
                                            {(activeItem as Member).name}
                                        </h3>
                                        <p className="text-white/50 text-base">{(activeItem as Member).role}</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="font-display text-3xl font-bold text-white leading-tight">
                                            {activeYear} Team
                                        </h3>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-3 mt-2">
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

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPhoto(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center pointer-events-none"
                        >
                            <img
                                src={selectedPhoto}
                                alt="Team Photo Preview"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                            />
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto z-[110]"
                            >
                                <X size={24} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Team
