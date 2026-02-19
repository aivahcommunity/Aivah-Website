'use client'

import React from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & {
    children?: React.ReactNode
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    children = 'Browse Components',
    className = '',
    variant = 'primary',
    size = 'md',
    whileTap = { scale: 0.97 },
    transition = {
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: 'spring',
            stiffness: 10,
            damping: 5,
            mass: 0.1,
        },
    },
    ...rest
}) => {
    const sizeClasses = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
    }

    const variantClasses = {
        primary: 'bg-gradient-to-r from-teal-500 to-purple-500 text-white border-0 [--shine:rgba(255,255,255,.8)]',
        outline: 'bg-transparent border border-teal-500/50 text-teal-400 [--shine:rgba(28,167,199,.8)]',
        ghost: 'bg-white/5 border border-white/10 text-white [--shine:rgba(255,255,255,.6)]',
    }

    return (
        <motion.button
            {...(rest as MotionProps)}
            whileTap={whileTap}
            transition={transition}
            className={cn(
                'rounded-xl relative overflow-hidden font-medium cursor-pointer',
                'transition-all duration-300',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
        >
            {/* Shimmer text mask */}
            <motion.span
                className="tracking-wide h-full w-full flex items-center justify-center relative z-10 gap-2"
                initial={false}
                animate={{}}
                style={{
                    maskImage: 'none',
                }}
            >
                {children}
            </motion.span>

            {/* Shimmer border sweep */}
            <motion.span
                className="block absolute inset-0 rounded-xl"
                style={{
                    background: 'linear-gradient(-75deg, transparent 30%, var(--shine, rgba(255,255,255,0.6)) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                }}
                initial={{ backgroundPosition: '100% 0', opacity: 0 }}
                animate={{ backgroundPosition: ['100% 0', '0% 0'], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />
        </motion.button>
    )
}

export default AnimatedButton
