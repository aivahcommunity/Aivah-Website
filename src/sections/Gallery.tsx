'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, Play } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const galleryItems = [
    { id: 1, image: '/SnapInsta.to_626449047_18120209317604984_4116415488877845886_n.jpg.jpeg' },
    { id: 2, image: '/SnapInsta.to_622554748_18058556678654715_6849341843728398170_n.jpg.jpeg' },
    { id: 3, image: '/SnapInsta.to_622385850_18049713992704934_5397815038147057952_n.jpg.jpeg' },
    { id: 4, image: '/SnapInsta.to_620733783_18020491451803413_4338217546077967320_n.jpg.jpeg' },
    { id: 5, image: '/SnapInsta.to_467758834_415247398186051_3884891473104196582_n.jpg.jpeg' },
    { id: 6, image: '/SnapInsta.to_467651537_3050423725095875_5270985256847503316_n.jpg.jpeg' },
    { id: 7, image: '/SnapInsta.to_467648989_445246474982094_7131533571752737006_n.jpg.jpeg' },
    { id: 8, image: '/SnapInsta.to_360033570_1296817264266919_2273054520135410229_n.jpg.jpeg' },
    { id: 9, image: '/SnapInsta.to_359975870_2248685108658943_5292081547263360414_n.jpg.jpeg' },
    { id: 10, image: '/SnapInsta.to_359958219_621194976774728_711694628333189276_n.jpg.jpeg' },
    { id: 11, image: '/SnapInsta.to_359802359_591294703129630_8143985486278478038_n.jpg.jpeg' },
    { id: 12, image: '/SnapInsta.to_359756374_190503917073575_4440910184094150261_n.jpg.jpeg' },
    { id: 13, image: '/SnapInsta.to_359709142_1227982097883755_3166832820061738022_n.jpg.jpeg' },
    { id: 14, image: '/SnapInsta.to_359682640_235531279409434_6677246366915816111_n.jpg.jpeg' },
    { id: 15, image: '/SnapInsta.to_359554294_605081071776410_3729259349196332126_n.jpg.jpeg' },
    { id: 16, image: '/SnapInsta.to_359370518_293817619723080_3180655956759504199_n.jpg.jpeg' },
    { id: 17, image: '/SnapInsta.to_610897935_17973170165992058_7388712593659648829_n.jpg' },
    { id: 18, image: '/SnapInsta.to_610885035_17973170267992058_5964344157894214946_n.jpg' },
    { id: 19, image: '/SnapInsta.to_610548734_17973170252992058_4499195614938485338_n.jpg' },
    { id: 20, image: '/SnapInsta.to_610191902_17973170237992058_1433113765648449624_n.jpg' },
    { id: 21, image: '/SnapInsta.to_610113476_17973170207992058_6671781981514856100_n.jpg' },
    { id: 22, image: '/SnapInsta.to_609863487_17973170180992058_2880240776676507284_n.jpg' },
    { id: 23, image: '/SnapInsta.to_609383581_17973170114992058_9156367133931295188_n.jpg' },
    { id: 24, image: '/Zenith.jpeg' },
    { id: 25, image: '/devigo.jpeg' },
    { id: 26, image: '/WhatsApp Image 2026-02-23 at 3.07.02 PM.jpeg' },
    { id: 27, image: '/WhatsApp Image 2026-02-23 at 3.07.15 PM.jpeg' },
    {id:28,image:'/WhatsApp Image 2026-02-24 at 6.20.25 PM.jpeg'},
    {id:29,image:'/WhatsApp Image 2026-02-24 at 6.20.26 PM.jpeg'},
    {id:30,image:'zenix.jpeg'},
    {id:31,image:'31.jpeg'},
    {id:32,image:'32.jpeg'},
    {id:33,image:'33.jpeg'},
    {id:34,image:'34.jpeg'},
    {id:35,image:'35.jpeg'},
    {id:36,image:'36.jpeg'}


]

const GalleryItem: React.FC<{ item: typeof galleryItems[0]; onClick: (item: typeof galleryItems[0]) => void }> = ({ item, onClick }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={() => onClick(item)}
            className="relative rounded-2xl overflow-hidden cursor-pointer h-[280px] w-[220px] shrink-0 mx-2 text-clip"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.01 }}
        >
            {/* Image Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={item.image}
                    alt="Gallery Image"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
            </div>

            {/* Hover overlay with minimal icon */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-black/20 backdrop-blur-[2px]"
            >
                <div className="p-3 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
                    <ZoomIn size={24} className="text-white" />
                </div>
            </motion.div>
        </motion.div>
    )
}

const MarqueeRow: React.FC<{ items: typeof galleryItems; direction?: 'left' | 'right'; onItemClick: (item: typeof galleryItems[0]) => void }> = ({ items, direction = 'left', onItemClick }) => {
    return (
        <div className="relative flex overflow-hidden w-full py-4 group pause-on-hover">
            <div
                className={`flex gap-4 ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
            >
                {[...items, ...items, ...items].map((item, index) => (
                    <GalleryItem key={`${item.id}-${index}`} item={item} onClick={onItemClick} />
                ))}
            </div>
        </div>
    )
}

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

    // Split items for two rows to create variety
    const half = Math.ceil(galleryItems.length / 2)
    const firstRow = galleryItems.slice(0, half)
    const secondRow = galleryItems.slice(half)

    return (
        <section id="gallery" className="relative bg-[#0a1020] overflow-hidden py-24">
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <SectionHeading
                    badge="Memories"
                    title="Our Community"
                    highlight="In Action"
                    subtitle="Every event, every workshop, every late-night hackathon — these are the moments that define Aivah."
                />
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-6 relative z-10">
                {/* Gradient fades on sides */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a1020] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a1020] to-transparent z-20 pointer-events-none" />

                <MarqueeRow items={galleryItems} direction="left" onItemClick={setSelectedImage} />
                <MarqueeRow items={[...secondRow, ...firstRow]} direction="right" onItemClick={setSelectedImage} />
            </div>

            {/* Video CTA */}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 c ursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center pointer-events-none"
                        >
                            <img
                                src={selectedImage.image}
                                alt="Gallery Preview"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Gallery
