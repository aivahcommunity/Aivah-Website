import { useEffect, useState, useMemo, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Letter ──────────────────────────────────────────────────────────────────

const Letter = memo(function Letter({
    char,
    letterDuration,
}: {
    char: string
    letterDuration: number
}) {
    return (
        <motion.span
            // No preserve-3d — it breaks background-clip gradient on children
            variants={{
                initial: { rotateX: 90, y: 20, opacity: 0, filter: "blur(8px)" },
                animate: {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { duration: letterDuration, ease: [0.2, 0.65, 0.3, 0.9] },
                },
                exit: {
                    rotateX: -90,
                    y: -20,
                    opacity: 0,
                    filter: "blur(8px)",
                    transition: { duration: letterDuration * 0.67, ease: "easeIn" },
                },
            }}
            style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #1CA7C7, #8E44FF, #FF4FD8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
        >
            {char}
        </motion.span>
    )
})

// ─── Word ─────────────────────────────────────────────────────────────────────

const Word = memo(function Word({
    text,
    staggerDelay,
    letterDuration,
    textClassName,
}: {
    text: string
    staggerDelay: number
    letterDuration: number
    textClassName?: string
}) {
    const letters = useMemo(() => text.split(""), [text])

    return (
        <motion.div
            className={cn(
                "flex gap-[0.05em] font-bold uppercase tracking-widest",
                textClassName
            )}
            style={{ perspective: "1200px" }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    transition: { staggerChildren: staggerDelay },
                },
                exit: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 },
                },
            }}
        >
            {letters.map((char, i) => (
                <Letter key={`${char}-${i}`} char={char} letterDuration={letterDuration} />
            ))}
        </motion.div>
    )
})

// ─── Intro ────────────────────────────────────────────────────────────────────

interface IntroProps {
    onDone: () => void
}

export function Intro({ onDone }: IntroProps) {
    // Phase:
    //   "in"   – "AIVAH" animates in
    //   "hold" – brief pause while fully visible
    //   "out"  – overlay fades out → calls onDone
    const [phase, setPhase] = useState<"in" | "hold" | "out">("in")

    useEffect(() => {
        // 5 letters × 0.12s stagger + 0.7s duration ≈ 1.3s — add a bit of buffer
        const t = setTimeout(() => setPhase("hold"), 1500)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        if (phase !== "hold") return
        const t = setTimeout(() => setPhase("out"), 900)
        return () => clearTimeout(t)
    }, [phase])

    return (
        <AnimatePresence onExitComplete={onDone}>
            {phase !== "out" && (
                <motion.div
                    key="intro-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0F172A]"
                >
                    {/* Ambient orbs */}
                    <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 600,
                            height: 600,
                            background: "radial-gradient(circle, #1CA7C7 0%, transparent 70%)",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            filter: "blur(80px)",
                            opacity: 0.2,
                        }}
                    />
                    <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 400,
                            height: 400,
                            background: "radial-gradient(circle, #8E44FF 0%, transparent 70%)",
                            top: "40%",
                            left: "55%",
                            transform: "translate(-50%, -50%)",
                            filter: "blur(100px)",
                            opacity: 0.15,
                        }}
                    />

                    {/* "AIVAH" word */}
                    <Word
                        key={phase}
                        text="AIVAH"
                        staggerDelay={phase === "in" ? 0.12 : 0}
                        letterDuration={phase === "in" ? 0.7 : 0.01}
                        textClassName="text-[clamp(2.5rem,8vw,6rem)] font-aerospace"
                    />

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="mt-4 text-sm md:text-base text-center tracking-[0.2em] md:tracking-[0.4em] uppercase text-white/50 font-light px-4"
                    >
                        Community · Innovation · Culture
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Intro

