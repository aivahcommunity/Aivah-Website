// refined for vite

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    FaTwitter,
    FaInstagram,
    FaEnvelope,
} from "react-icons/fa";

export interface SocialItem {
    letter: string;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}

interface SocialFlipButtonProps {
    items?: SocialItem[];
    className?: string;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}

const defaultItems: SocialItem[] = [
    { letter: "A", icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/aivah___/" },
    { letter: "I", icon: <FaTwitter />, label: "Twitter / X", href: "https://x.com/Aivah___" },
    { letter: "V", icon: <FaEnvelope />, label: "Email", href: "mailto:aivahcommunity@gmail.com" },
    { letter: "A", icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/aivah___/" },
    { letter: "H", icon: <FaTwitter />, label: "Twitter / X", href: "https://x.com/Aivah___" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    setTooltipIndex,
    tooltipIndex,
    itemClassName,
    frontClassName,
    backClassName,
}: {
    item: SocialItem;
    index: number;
    isHovered: boolean;
    setTooltipIndex: (val: number | null) => void;
    tooltipIndex: number | null;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}) => {
    const isExternal = item.href && !item.href.startsWith("mailto:");

    const inner = (
        <>
            <AnimatePresence>
                {isHovered && tooltipIndex === index && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl"
                    >
                        {item.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-neutral-900" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.08,
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front – Letter */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-white/10 text-lg font-bold text-white shadow-sm border border-white/15",
                        frontClassName
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {item.letter}
                </div>

                {/* Back – Icon */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-purple-500 text-lg text-white",
                        backClassName
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.icon}
                </div>
            </motion.div>
        </>
    );

    const sharedClass = cn("relative h-10 w-10 cursor-pointer", itemClassName);

    if (item.href) {
        return (
            <a
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={sharedClass}
                style={{ perspective: "1000px" }}
                onMouseEnter={() => setTooltipIndex(index)}
                onMouseLeave={() => setTooltipIndex(null)}
            >
                {inner}
            </a>
        );
    }

    return (
        <div
            className={sharedClass}
            style={{ perspective: "1000px" }}
            onClick={item.onClick}
            onMouseEnter={() => setTooltipIndex(index)}
            onMouseLeave={() => setTooltipIndex(null)}
        >
            {inner}
        </div>
    );

};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName,
}: SocialFlipButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div
                className="group relative flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-4 shadow-sm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setTooltipIndex(null);
                }}
            >
                {/* Animated border lines */}
                <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-teal-400/60 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        setTooltipIndex={setTooltipIndex}
                        tooltipIndex={tooltipIndex}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName}
                    />
                ))}
            </div>
        </div>
    );
}
