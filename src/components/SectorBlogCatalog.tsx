import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Clock, Calendar, Tag, ChevronRight } from 'lucide-react';
import { blogPosts, type BlogPost } from '../data/blogPosts';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    sectorName: string | null;
}

const SectorBlogCatalog = ({ isOpen, onClose, sectorName }: Props) => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter posts based on selected sector
    const filteredPosts = sectorName
        ? blogPosts.filter(post => post.sectorId === sectorName)
        : [];

    // Reset selected post when modal closes or opens
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setSelectedPost(null), 300);
        }
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0B]/80 backdrop-blur-xl p-4 md:p-8"
                >
                    {/* Close Background Area */}
                    <div className="absolute inset-0" onClick={onClose} />

                    {/* Main Container */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#111113] border border-white/10 rounded-[24px] overflow-hidden flex flex-col shadow-2xl z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#111113]/80 backdrop-blur-md sticky top-0 z-20">
                            <div className="flex items-center gap-4">
                                <AnimatePresence mode="popLayout">
                                    {selectedPost && (
                                        <motion.button
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            onClick={() => setSelectedPost(null)}
                                            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-white font-['Kode_Mono'] uppercase">
                                        {sectorName}
                                    </h2>
                                    <p className="text-sm text-[#C5A059]">
                                        {selectedPost ? 'Lecture d\'Article' : 'Catalogue de Cas d\'Usage & Articles'}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide" ref={containerRef}>
                            <AnimatePresence mode="wait">
                                {!selectedPost ? (
                                    /* Catalog Grid View */
                                    <motion.div
                                        key="catalog"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    >
                                        {filteredPosts.length > 0 ? (
                                            <AnimatePresence>
                                                {filteredPosts.map((post, i) => (
                                                    <motion.div
                                                        layoutId={`post-${post.id}`}
                                                        key={post.id}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                                        onClick={() => setSelectedPost(post)}
                                                        className="group cursor-pointer relative rounded-2xl bg-[#1A1A1D] border border-white/5 overflow-hidden hover:border-[#C5A059]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] h-full flex flex-col"
                                                        whileHover={{ y: -5 }}
                                                    >
                                                        <motion.div className="h-48 overflow-hidden relative" layoutId={`image-${post.id}`}>
                                                            <img
                                                                src={post.imageUrl}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1D] to-transparent opacity-80" />
                                                            <div className="absolute bottom-4 left-4 flex gap-2">
                                                                <span className="bg-[#C5A059]/90 text-black text-xs font-bold px-2 py-1 rounded backdrop-blur-md">
                                                                    {post.readTime}
                                                                </span>
                                                            </div>
                                                        </motion.div>

                                                        <motion.div className="p-6 flex-1 flex flex-col" layoutId={`content-${post.id}`}>
                                                            <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#C5A059] transition-colors">
                                                                {post.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-1">
                                                                {post.brief}
                                                            </p>

                                                            <div className="flex items-center justify-between mt-auto">
                                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {post.date}
                                                                </span>
                                                                <div className="text-[#C5A059] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                                                    Lire Plus <ChevronRight className="w-4 h-4" />
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        ) : (
                                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-50">
                                                <Tag className="w-12 h-12 text-[#C5A059] mb-4" />
                                                <h3 className="text-xl text-white font-medium mb-2">Bientôt Disponible</h3>
                                                <p className="text-gray-400">Des articles pointus pour ce secteur sont en cours de rédaction.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    /* Detail View */
                                    <motion.div
                                        key="detail"
                                        className="bg-[#111113] min-h-full"
                                    >
                                        <motion.div
                                            layoutId={`post-${selectedPost?.id}`}
                                            className="relative h-[40vh] md:h-[50vh] w-full"
                                        >
                                            <motion.img
                                                layoutId={`image-${selectedPost?.id}`}
                                                src={selectedPost?.imageUrl}
                                                alt={selectedPost?.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/60 to-transparent" />

                                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="flex flex-wrap gap-2 mb-4"
                                                >
                                                    {selectedPost?.tags?.map(tag => (
                                                        <span key={tag} className="bg-white/10 text-white border border-white/20 text-sm px-3 py-1 rounded-full backdrop-blur-md">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </motion.div>
                                                <motion.h1
                                                    layoutId={`content-${selectedPost?.id}-title`} // Added specific layoutId to prevent full block jump
                                                    className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight mb-4"
                                                >
                                                    {selectedPost?.title}
                                                </motion.h1>

                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="flex items-center gap-6 text-sm text-gray-300"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-[#C5A059]" />
                                                        {selectedPost?.readTime}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-[#C5A059]" />
                                                        {selectedPost?.date}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        <div className="max-w-4xl mx-auto p-6 md:p-12">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                            >
                                                <p className="text-xl text-[#C5A059] font-medium mb-8 leading-relaxed">
                                                    {selectedPost?.brief}
                                                </p>

                                                <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
                                                    {/* Simulated Markdown / Paragraphs rendering */}
                                                    {selectedPost?.content?.split('\n\n').map((paragraph, idx) => (
                                                        <p key={idx} className="leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>

                                                {/* CTA at the end of the post */}
                                                <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1D] to-[#252528] border border-white/10 text-center">
                                                    <h4 className="text-2xl font-bold text-white mb-4">Prêt à transformer votre entreprise ?</h4>
                                                    <p className="text-gray-400 mb-6">Contactez nos experts pour une consultation gratuite sur l'implémentation de l'IA dans votre secteur.</p>
                                                    <button className="bg-[#C5A059] text-black font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all">
                                                        Demander un Audit
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SectorBlogCatalog;
