'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Zap, Shield, TrendingUp, BookOpen, Globe } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const values = [
    { icon: BookOpen, title: 'Knowledge Sharing & Learning', desc: 'Community collaborates to exchange ideas, discuss and explore knowledge in the fields of IT and AIML.', color: 'text-teal-400' },
    { icon: TrendingUp, title: 'Professional Development', desc: 'We emphasize networking opportunities along with professional growth and help members enhance their skills.', color: 'text-purple-400' },
    { icon: Lightbulb, title: 'Innovation & Research', desc: 'We promote innovation and research in IT and AIML, encouraging members to explore novel ideas in their specific field.', color: 'text-yellow-400' },
    { icon: Shield, title: 'Ethical & Responsible AI', desc: 'We engage in discussions, workshops and initiatives that raise awareness and promote the responsible development of AI systems.', color: 'text-pink-400' },
    { icon: Zap, title: 'Progressive Hackathons', desc: 'Our hackathon reports track all your progress and results, linked directly to your profile — a key advantage for every member.', color: 'text-orange-400' },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const About: React.FC = () => {
    return (
        <section id="about" className="relative bg-navy overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500" />

            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb w-[400px] h-[400px] bg-teal-500 top-[10%] right-[-100px] opacity-5" />
                <div className="orb w-[300px] h-[300px] bg-purple-500 bottom-[10%] left-[-80px] opacity-5" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-padding max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    badge="Our Story"
                    title="More Than a Club."
                    highlight="A Movement."
                    subtitle="Aivah was born from a simple belief: every student deserves a community that pushes them to build, create, and lead."
                />

                {/* Split layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Left: Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30">
                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                                <span className="text-teal-400 text-xs font-semibold tracking-wide uppercase">Est. 2024</span>
                            </div>

                            <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                                Why We Built{' '}
                                <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">Aivah</span>
                            </h3>


                            <p className="text-white/50 leading-relaxed">
                                Founded by the Department of Information Technology & B-Tech AIML, Aivah is the home for every curious, driven student on campus who wants to build, learn, and lead.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                {[
                                    { label: 'Vision', text: "MRDU's most impactful student tech community" },
                                    { label: 'Mission', text: 'Empower every student to build, connect & lead' },
                                ].map((item) => (
                                    <div key={item.label} className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/20">
                                        <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-1">{item.label}</span>
                                        <span className="text-white/60 text-sm leading-snug">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: About the community */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* University badge */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/20 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                    <Globe size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-teal-400 font-semibold uppercase tracking-widest">Home Campus</p>
                                    <p className="text-white font-bold text-sm leading-tight">Malla Reddy Deemed to be University</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                    <Zap size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest">By</p>
                                    <p className="text-white font-bold text-sm leading-tight">Department of IT , B.Tech AIML & CS-IT</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { num: '150+', label: 'Members' },
                                { num: '5+', label: 'Events' },
                            ].map((s) => (
                                <div key={s.label} className="text-center p-5 rounded-xl bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-white/10">
                                    <div className="font-display text-3xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">{s.num}</div>
                                    <div className="text-white/40 text-xs mt-1 uppercase tracking-wide">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl font-bold text-white text-center mb-10"
                    >
                        Our Core <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">Values</span>
                    </motion.h3>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {values.map((val) => (
                            <motion.div
                                key={val.title}
                                variants={itemVariants}
                                whileHover={{ y: -4, scale: 1.01 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(28,167,199,0.15)] transition-all duration-300 group"
                            >
                                <div className="mb-4 p-3 rounded-xl inline-flex bg-gradient-to-br from-teal-500/10 to-purple-500/10 group-hover:from-teal-500/20 group-hover:to-purple-500/20 transition-all">
                                    <val.icon size={22} className={val.color} />
                                </div>
                                <h4 className="font-display font-bold text-white text-lg mb-2">{val.title}</h4>
                                <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
