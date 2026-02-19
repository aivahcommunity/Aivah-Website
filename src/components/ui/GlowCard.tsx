'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowCardProps {
    children: React.ReactNode
    className?: string
    glowColor?: 'teal' | 'purple' | 'pink'
    hover?: boolean
}

const glowColors = {
    teal: 'hover:shadow-[0_0_30px_rgba(28,167,199,0.4)] hover:border-teal-500/50',
    purple: 'hover:shadow-[0_0_30px_rgba(142,68,255,0.4)] hover:border-purple-500/50',
    pink: 'hover:shadow-[0_0_30px_rgba(255,79,216,0.5)] hover:border-pink-500/50',
}

const GlowCard: React.FC<GlowCardProps> = ({
    children,
    className,
    glowColor = 'teal',
    hover = true,
}) => {
    return (
        <motion.div
            whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
                'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm',
                'transition-all duration-300',
                'cursor-glow-target',
                hover && glowColors[glowColor],
                className
            )}
        >
            {children}
        </motion.div>
    )
}

export default GlowCard
