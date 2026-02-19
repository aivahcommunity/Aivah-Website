import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

const CursorGlow: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    // Smooth spring animation for position - "watery" delay
    const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Track velocity to effect size dynamically
    const velocityX = useVelocity(x);
    const velocityY = useVelocity(y);
    const velocity = useTransform<number, number>([velocityX, velocityY], ([latestX, latestY]) => {
        return Math.sqrt(latestX * latestX + latestY * latestY);
    });

    // Scale fluctuates based on movement speed (water ripple effect)
    const scaleVelocity = useTransform(velocity, [0, 1000], [1, 1.5]);

    // Dynamic opacity: subtler when still, brighter when moving
    // We'll combine this with the hover state in the render
    const opacityVelocity = useTransform(velocity, [0, 1000], [0.6, 0.9]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 200); // Center the 400px glow
            mouseY.set(e.clientY - 200);

            // Check if hovering over an interactive element
            const target = e.target as HTMLElement;
            // Expanded list of interactive elements/classes
            const isInteractive = target.closest('button, a, input, textarea, .cursor-glow-target, [role="button"], .card, .glow-card') !== null;
            setIsHovering(isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x,
                y,
                scale: isHovering ? scaleVelocity : 0.5, // Shrink when not hovering
                opacity: isHovering ? opacityVelocity : 0, // Hide when not hovering
                position: 'fixed',
                top: 0,
                left: 0,
                width: 400,
                height: 400,
                borderRadius: '50%',
                // Dense, rich gradient for "water" feel
                background: 'radial-gradient(circle, rgba(28, 167, 199, 0.5) 0%, rgba(142, 68, 255, 0.3) 25%, rgba(28, 167, 199, 0.1) 50%, rgba(0, 0, 0, 0) 70%)',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen', // Blends nicely with dark background
                filter: 'blur(20px)', // Softens edges for liquid look
            }}
            transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
        />
    );
};

export default CursorGlow;
