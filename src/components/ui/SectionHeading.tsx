// refined for vite

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
    badge?: string
    title: string
    highlight?: string
    subtitle?: string
    center?: boolean
    className?: string
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
    badge,
    title,
    highlight,
    subtitle,
    center = true,
    className,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn('mb-16', center && 'text-center', className)}
        >
            {badge && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4
                     bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 text-teal-400"
                >
                    {badge}
                </motion.span>
            )}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                {title}{' '}
                {highlight && (
                    <span className="gradient-text">{highlight}</span>
                )}
            </h2>
            {subtitle && (
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}

export default SectionHeading
