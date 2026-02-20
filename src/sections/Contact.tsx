'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Send, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedButton from '@/components/ui/AnimatedButton'
import SocialFlipButton from '@/components/ui/SocialFlipButton'
import {
    FaGithub,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
} from 'react-icons/fa'

const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [focused, setFocused] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    const inputClass = (field: string) =>
        `w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder-white/30 transition-all duration-300 outline-none ${focused === field
            ? 'border-teal-500/70 shadow-[0_0_20px_rgba(28,167,199,0.2)] bg-white/8'
            : 'border-white/10 hover:border-white/20'
        }`

    return (
        <section id="contact" className="relative bg-navy overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb w-[400px] h-[400px] bg-teal-500 bottom-[-100px] left-[-100px] opacity-10" />
                <div className="orb w-[300px] h-[300px] bg-purple-500 top-[10%] right-[-80px] opacity-10" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-padding max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    badge="Get Involved"
                    title="Join the"
                    highlight="Conversation"
                    subtitle="Have a question, idea, or just want to say hi? We'd love to hear from you. The Aivah community is always open."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >

                        <div className="p-5 rounded-2xl glass border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-teal-500/20">
                                    <Mail size={16} className="text-teal-400" />
                                </div>
                                <span className="text-white/60 text-sm font-medium">Official Email</span>
                            </div>
                            <a href="mailto:aivahcommunity@gmail.com" className="text-teal-400 font-semibold hover:text-teal-300 transition-colors">
                                aivahcommunity@gmail.com
                            </a>
                        </div>

                        {/* Socials */}
                        <div>
                            <h4 className="text-white/50 text-sm font-medium mb-4 uppercase tracking-widest">Follow Us</h4>
                            <SocialFlipButton
                                items={[
                                    { letter: 'A', icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/aivah___/' },
                                    { letter: 'I', icon: <FaTwitter />, label: 'Twitter / X', href: 'https://x.com/Aivah___' },
                                    { letter: 'V', icon: <FaEnvelope />, label: 'Email', href: 'mailto:aivahcommunity@gmail.com' },
                                    { letter: 'A', icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/aivahcommunity' },
                                    { letter: 'H', icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
                                ]}
                                className="justify-start"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="p-8 rounded-3xl glass border border-white/10">
                            <h3 className="font-display text-xl font-bold text-white mb-6">Send a Message</h3>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h4 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h4>
                                    <p className="text-white/50">We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-white/40 text-xs font-medium mb-1.5 block uppercase tracking-wide">Name</label>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                required
                                                value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                onFocus={() => setFocused('name')}
                                                onBlur={() => setFocused(null)}
                                                className={inputClass('name')}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-white/40 text-xs font-medium mb-1.5 block uppercase tracking-wide">Email</label>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                required
                                                value={form.email}
                                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                onFocus={() => setFocused('email')}
                                                onBlur={() => setFocused(null)}
                                                className={inputClass('email')}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-white/40 text-xs font-medium mb-1.5 block uppercase tracking-wide">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="What's this about?"
                                            value={form.subject}
                                            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                            onFocus={() => setFocused('subject')}
                                            onBlur={() => setFocused(null)}
                                            className={inputClass('subject')}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-white/40 text-xs font-medium mb-1.5 block uppercase tracking-wide">Message</label>
                                        <textarea
                                            rows={5}
                                            placeholder="Tell us what's on your mind..."
                                            required
                                            value={form.message}
                                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                            onFocus={() => setFocused('message')}
                                            onBlur={() => setFocused(null)}
                                            className={`${inputClass('message')} resize-none`}
                                        />
                                    </div>

                                    <AnimatedButton
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:shadow-[0_0_30px_rgba(255,79,216,0.5)] justify-center"
                                    >
                                        <Send size={16} />
                                        Send Message
                                    </AnimatedButton>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
