'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Instagram, Youtube, ArrowUpRight } from 'lucide-react'

const footerLinks = {
    Community: [
        { label: 'About Us', href: '#about' },
        { label: 'Events', href: '#events' },
        { label: 'Team', href: '#team' },
        { label: 'Gallery', href: '#gallery' },
    ],
    Connect: [
        { label: 'Join Community', href: '#contact' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'Partner With Us', href: '#contact' },
    ],
    Legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Code of Conduct', href: '#' },
    ],
}

const socials = [
    { icon: Github, href: 'https://github.com/aivahcommunity', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/Aivah___', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/aivah___/', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
]

const Footer: React.FC = () => {
    const scrollToSection = (href: string) => {
        if (href.startsWith('#') && href.length > 1) {
            document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer className="relative bg-[#080e1a] overflow-hidden">
            {/* Top gradient border */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

            {/* Subtle background orb */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-5"
                        >
                            <div className="flex items-center gap-3">
                                <img src="/aivah-logo.png" alt="Aivah" className="h-10 w-10 rounded-full object-cover" />
                                <span className="font-display font-bold text-2xl gradient-text">AIVAH</span>
                            </div>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                                Where Builders, Creators & Dreamers Converge. India's next-gen college community for ambitious students.
                            </p>

                            {/* Social icons */}
                            <div className="flex items-center gap-2">
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href !== '#' ? s.href : undefined}
                                        target={s.href !== '#' ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        title={s.label}
                                        className="p-2.5 rounded-xl border border-white/10 text-white/30 hover:text-teal-400 hover:border-teal-500/30 hover:bg-teal-500/10 transition-all duration-200"
                                    >
                                        <s.icon size={16} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links], gi) => (
                        <motion.div
                            key={group}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: gi * 0.1 }}
                        >
                            <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">{group}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                if (link.href.startsWith('#')) {
                                                    e.preventDefault()
                                                    scrollToSection(link.href)
                                                }
                                            }}
                                            className="text-white/35 text-sm hover:text-teal-400 transition-colors duration-200 flex items-center gap-1 group"
                                        >
                                            {link.label}
                                            {link.href === '#' && (
                                                <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/25 text-xs">
                        © {new Date().getFullYear()} Aivah Community. Built with ❤️ by students, for students.
                    </p>
                    <a
                        href="mailto:aivahcommunity@gmail.com"
                        className="text-white/30 text-xs hover:text-teal-400 transition-colors duration-200"
                    >
                        aivahcommunity@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
