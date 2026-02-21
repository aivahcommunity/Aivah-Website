'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Zap, Code, Palette, Coffee, BookOpen } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowCard from '@/components/ui/GlowCard'
import { TextRoll } from '@/components/ui/TextRoll'

const categories = [
    { id: 'all', label: 'All Events', icon: Zap },
    { id: 'workshop', label: 'Workshop', icon: BookOpen },
    { id: 'meetup', label: 'Meetup', icon: Coffee },
]

export const events = [
    {
        id: 1,
        title: 'Zenix',
        desc: '2-Days Placement Stimulation Drive including Techinical Events',
        date: 'Mar 5-6, 2026',
        time: '9:00 AM',
        status: 'upcoming',
        tag: 'Community Event',
        tagColor: 'from-pink-500 to-purple-500',
        gradient: 'from-teal-500/20 to-purple-500/20',
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
        desc: 'Influencers Meet-Up',
        date: 'Nov 2024',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/events/Zenith.jpeg',
    }, {
        id: 7,
        category: 'workshop',
        title: 'Devigo',
        desc: 'AWS,Prompt Engineering and DSA Workshop',
        date: 'Jan 2026',
        time: '',
        status: 'past',
        tag: 'Completed',
        tagColor: 'from-slate-500 to-slate-600',
        gradient: 'from-slate-500/10 to-slate-600/10',
        image: '/events/devigo.jpeg',
    }
]

const EventCard: React.FC<{ event: typeof events[0] & { image?: string }; index: number }> = ({ event, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
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
                    <motion.button
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
                    </motion.button>
                )}
            </div>
        </GlowCard>
    </motion.div >
)

const Events: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all')

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
                                    <EventCard key={event.id} event={event} index={i} />
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
                                    <EventCard key={event.id} event={event} index={i} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Events
