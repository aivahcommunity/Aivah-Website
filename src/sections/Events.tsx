'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Zap, Code, Palette, Coffee, BookOpen, X } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowCard from '@/components/ui/GlowCard'
import { TextRoll } from '@/components/ui/TextRoll'

export type AivahEvent = {
    id: number
    category?: string
    title: string
    desc: string
    date: string
    time: string
    status: 'upcoming' | 'past'
    tag: string
    tagColor: string
    gradient: string
    image?: string
    registrationLink?: string
    detailedInfo?: {
        whatsNewImage?: string
        posterImage?: string
        chiefGuests?: { name: string; role: string; image: string }[]
        workshops?: { title: string; image: string; link: string; resourceLink: string; resourceName: string }[]
    }
}

const categories = [
    { id: 'all', label: 'All Events', icon: Zap },
    { id: 'workshop', label: 'Workshop', icon: BookOpen },
    { id: 'meetup', label: 'Meetup', icon: Coffee },
]

export const events: AivahEvent[] = [
    {
        id: 1,
        title: 'Zenix',
        desc: '2-Days Placement Stimulation Drive including Techinical Events and Non-Techinical Events',
        date: 'Feb 27-28, 2026',
        time: '9:15 AM',
        status: 'upcoming',
        tag: 'Community Event',
        tagColor: 'from-pink-500 to-purple-500',
        gradient: 'from-teal-500/20 to-purple-500/20',
        registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdNJDObFszUlWLF3oC7jlGDcm3-8zXDiLJkbn9gXu_ViybZhw/viewform',
    },
    {
        id: 2,
        category: 'meetup',
        title: 'Community Meetup',
        desc: 'Building connections and sharing ideas with like-minded tech enthusiasts.',
        date: 'Aug 2024',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/events/SnapInsta.to_622385850_18049713992704934_5397815038147057952_n.jpg.jpeg',
    },
    {
        id: 3,
        category: 'design',
        title: 'Design Thinking Sprint',
        desc: 'Rapid prototyping and user-centric design methodologies in action.',
        date: 'Jul 2024',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/events/SnapInsta.to_620733783_18020491451803413_4338217546077967320_n.jpg.jpeg',
    }, {
        id: 4,
        category: 'workshop',
        title: 'Devops Workshop',
        desc: 'Learn the fundamentals of DevOps and how to use it to improve your software development process.',
        date: 'Jan 2026',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/events/SnapInsta.to_620733783_18020491451803413_4338217546077967320_n.jpg.jpeg',
    }, {
        id: 5,
        category: 'Meet-Up',
        title: 'Zenith',
        desc: 'Zenith, hosted by the AIVAH Community, is a platform where creators, innovators, and visionaries unite to share insights and foster collaborations.',
        date: 'Nov 2024',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/2024 team/zenith/zenith.jpg',
        detailedInfo: {
            whatsNewImage: '/2024 team/zenith/zenith.jpg',
            posterImage: '/2024 team/zenith/zenith.jpg',
            chiefGuests: [
                { name: 'Eshwarbolegar', role: 'Fitness Influencer', image: '/2024 team/zenith/Eshwarbolegar.jpg' },
                { name: 'Code with Swaroop', role: 'Tech Influencer', image: '/2024 team/zenith/swaroop.jpg' },
                { name: 'Gowrav Reddy', role: 'Entrepreneur', image: '/2024 team/zenith/Gowravreddy.jpg' },
            ]
        }
    }, {
        id: 7,
        category: 'workshop',
        title: 'Devigo',
        desc: 'DEVIGO— Develop, Innovate, Go—is dedicated to empowering creators and thinkers to turn ideas into reality.',
        date: 'Jan 2026',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/2024 team/devigo/devigo poster.jpg',
        detailedInfo: {
            posterImage: '/2024 team/devigo/devigo poster.jpg',
            workshops: [
                {
                    title: 'DSA using C',
                    image: '/2024 team/devigo/DSA.jpg',
                    link: 'https://forms.gle/fgtEaxhaUVVE1AvX9',
                    resourceLink: 'https://drive.google.com/drive/folders/1Vj5r2pY7pCWfolF7BGDLEwpSebLoSYnu',
                    resourceName: 'DSA using C'
                },
                {
                    title: 'Prompt Engineering',
                    image: '/2024 team/devigo/prompt.jpg',
                    link: 'https://forms.gle/fgtEaxhaUVVE1AvX9',
                    resourceLink: 'https://drive.google.com/drive/folders/1O9mJIsr1Ygq0h6qDcijRG4paWzvkXHwE',
                    resourceName: 'Prompt Engineering'
                },
                {
                    title: 'Devops & AWS',
                    image: '/2024 team/devigo/AWS.jpg',
                    link: 'https://forms.gle/fgtEaxhaUVVE1AvX9',
                    resourceLink: 'https://drive.google.com/drive/folders/15Qtacqo3O6EFa3TstB6bVpGw3l3SksjY',
                    resourceName: 'Devops & AWS'
                }
            ]
        }
    }
]

const EventCard: React.FC<{ event: AivahEvent; index: number; onClick: () => void }> = ({ event, index, onClick }) => (
    <motion.div
        layout
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        className={event.detailedInfo ? "cursor-pointer" : ""}
    >
        <GlowCard
            glowColor={event.status === 'upcoming' ? 'teal' : 'purple'}
            className={`p-6 h-full flex flex-col relative overflow-hidden ${event.status === 'past' ? 'group' : ''}`}
        >
            {/* Background Image for Past Events */}
            {event.image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                </div>
            )}

            {/* Content Container (z-10 to stay above image) */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Tag */}
                <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${event.tagColor} text-white shadow-lg`}>
                        {event.tag}
                    </span>
                    {event.status === 'upcoming' && (
                        <span className="flex items-center gap-1.5 text-xs text-teal-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                            Upcoming
                        </span>
                    )}
                </div>

                {/* Gradient accent */}
                <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${event.gradient.replace('/20', '')} mb-4`} />

                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:gradient-text transition-all">
                    {event.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5 flex-1">{event.desc}</p>

                {/* Meta */}
                <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Calendar size={13} className="text-teal-400" />
                    <span>{event.date}</span>
                    {event.time && <><Clock size={13} className="text-purple-400 ml-2" /><span>{event.time}</span></>}
                </div>


                {event.status === 'upcoming' && (
                    <motion.a
                        href={event.registrationLink || '#'}
                        target={event.registrationLink ? '_blank' : undefined}
                        rel={event.registrationLink ? 'noopener noreferrer' : undefined}
                        initial="initial"
                        whileHover="hovered"
                        variants={{ hovered: { scale: 1.02 } }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2
                     bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-300
                     hover:from-teal-500/30 hover:to-purple-500/30 hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(255,79,216,0.3)]
                     transition-all duration-300"
                    >
                        <TextRoll>Register Now</TextRoll> <ArrowRight size={14} />
                    </motion.a>
                )}
            </div>
        </GlowCard>
    </motion.div >
)

const Events: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [selectedEvent, setSelectedEvent] = useState<AivahEvent | null>(null)

    const filtered = activeCategory === 'all'
        ? events
        : events.filter(e => e.category === activeCategory)

    const upcoming = filtered.filter(e => e.status === 'upcoming')
    const past = filtered.filter(e => e.status === 'past')

    return (
        <section id="events" className="relative bg-navy overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="orb w-[400px] h-[400px] bg-purple-500 top-[10%] right-[-100px] opacity-8" style={{ animationDelay: '1s' }} />
                <div className="orb w-[300px] h-[300px] bg-teal-500 bottom-[10%] left-[-80px] opacity-8" style={{ animationDelay: '3s' }} />
            </div>

            <div className="section-padding max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    badge="Community Activities"
                    title="Events That"
                    highlight="Ignite Growth"
                    subtitle="From hackathons to workshops, every Aivah event is designed to push your limits, expand your network, and accelerate your journey."
                />

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            initial="initial"
                            whileHover="hovered"
                            variants={{ hovered: { scale: 1.05 } }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-[0_0_20px_rgba(28,167,199,0.4)]'
                                : 'glass-light text-white/60 hover:text-white hover:border-teal-500/30'
                                }`}
                        >
                            <cat.icon size={15} />
                            <TextRoll>{cat.label}</TextRoll>
                        </motion.button>
                    ))}
                </div>

                {/* Upcoming Events */}
                {upcoming.length > 0 && (
                    <div className="mb-16">
                        <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                            Upcoming Events
                        </h3>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {upcoming.map((event, i) => (
                                    <EventCard key={event.id} event={event} index={i} onClick={() => event.detailedInfo && setSelectedEvent(event)} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}

                {/* Past Events */}
                {past.length > 0 && (
                    <div>
                        <h3 className="font-display text-2xl font-bold text-white/60 mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-white/30" />
                            Past Events
                        </h3>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {past.map((event, i) => (
                                    <EventCard key={event.id} event={event} index={i} onClick={() => event.detailedInfo && setSelectedEvent(event)} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Modal for Event Details */}
            <AnimatePresence>
                {selectedEvent && selectedEvent.detailedInfo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0a1020]/95 backdrop-blur-md"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-navy border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-10 shadow-2xl custom-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[9999]"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">{selectedEvent.title}</h2>
                            <p className="text-lg text-white/70 mb-8">{selectedEvent.desc}</p>

                            {selectedEvent.detailedInfo.posterImage && (
                                <div className="mb-10">
                                    <img src={selectedEvent.detailedInfo.posterImage} alt={`${selectedEvent.title} Poster`} className="w-full md:w-3/4 lg:w-2/3 mx-auto rounded-xl shadow-lg border border-white/10" />
                                </div>
                            )}

                            {selectedEvent.detailedInfo.chiefGuests && (
                                <div>
                                    <h3 className="text-2xl font-semibold text-white mb-4 text-center">Chief Guests</h3>
                                    <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
                                        We are thrilled to introduce influential speakers who will inspire and engage as we explore the future of technology together.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {selectedEvent.detailedInfo.chiefGuests.map((guest, idx) => (
                                            <div key={idx} className="text-center p-4 rounded-xl glass border border-white/10 hover:bg-white/5 transition-colors">
                                                <img src={guest.image} alt={guest.name} className="w-full h-56 object-cover rounded-lg shadow-md mb-4" />
                                                <h4 className="text-xl font-bold text-white mb-1">{guest.name}</h4>
                                                <p className="text-teal-400 text-sm font-semibold">{guest.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedEvent.detailedInfo.workshops && (
                                <div className="mt-12 mb-8">
                                    <h3 className="text-3xl font-display font-semibold text-white mb-4 text-center">Hackathons & Workshops</h3>
                                    <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
                                        Hackathons are events where programmers, designers, and developers collaborate intensively to solve problems. Check out our resources and exams below!
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {selectedEvent.detailedInfo.workshops.map((workshop, idx) => (
                                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors flex flex-col items-center">
                                                <a href={workshop.link} target="_blank" rel="noopener noreferrer" className="w-full block overflow-hidden rounded-lg mb-4">
                                                    <img src={workshop.image} alt={workshop.title} className="w-full h-48 object-cover object-top hover:scale-110 transition-transform duration-700" />
                                                </a>
                                                <h4 className="text-xl font-bold text-white mb-2 text-center">{workshop.title}</h4>
                                                <p className="text-white/60 text-sm mb-6 text-center">
                                                    Resource - <a href={workshop.resourceLink} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline underline-offset-4">{workshop.resourceName}</a>
                                                </p>
                                                <a href={workshop.link} target="_blank" rel="noopener noreferrer" className="mt-auto w-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/40 hover:to-cyan-500/40 border border-teal-500/50 text-teal-300 py-2.5 px-4 rounded-xl text-center transition-all text-sm font-semibold shadow-lg shadow-teal-500/10">
                                                    Exam Link {idx + 1}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Events
