import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Marquee from '../components/Marquee';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
    useScrollReveal();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const featuredRef = useRef(null);
    const featuredInView = useInView(featuredRef, { once: true, margin: '-80px' });
    const categoriesRef = useRef(null);
    const categoriesInView = useInView(categoriesRef, { once: true, margin: '-80px' });
    const aboutRef = useRef(null);
    const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' });
    const instagramRef = useRef(null);
    const instagramInView = useInView(instagramRef, { once: true, margin: '-80px' });
    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

    useEffect(() => {
        getProducts({ featured: true })
            .then(res => {
                const data = res.data;
                setFeaturedProducts(Array.isArray(data) ? data : data.products || []);
            })
            .catch(err => console.error('Products fetch error:', err))
            .finally(() => setLoading(false));

        getCategories()
            .then(res => {
                const data = res.data;
                console.log('Categories raw response:', data);
                const list = Array.isArray(data) ? data : (data.categories || data.data || []);
                console.log('Categories processed list:', list);
                setCategories(list.slice(0, 3));
            })
            .catch(err => {
                console.error('Categories fetch error:', err);
                // Try to log more details if available
                if (err.response) console.error('Error detail:', err.response.data);
            });
    }, []);

    const instagramPosts = [
        { id: 1, src: '/images/instagram/ig-1-travertine-dining-table.jpg', alt: 'Table travertin ovale — NOVA DESIGN' },
        { id: 2, src: '/images/instagram/ig-2-marble-vasque.jpg', alt: 'Vasque marbre brut — NOVA DESIGN' },
        { id: 3, src: '/images/instagram/ig-3-travertine-coffee-table-fluted.jpg', alt: 'Table travertin cannelé — NOVA DESIGN' },
        { id: 4, src: '/images/instagram/ig-4-grey-marble-dining-table.jpg', alt: 'Table marbre gris — NOVA DESIGN' },
        { id: 5, src: '/images/instagram/ig-5-travertine-round-tables.jpg', alt: 'Tables rondes travertin — NOVA DESIGN' },
        { id: 6, src: '/images/instagram/ig-7-carrara-cube-table.jpg', alt: 'Table cube Carrare — NOVA DESIGN' },
    ];

    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <section className="relative w-full h-[100vh] flex flex-col xl:flex-row pt-[64px] xl:pt-0">
                <motion.div
                    className="w-full h-[55vh] xl:w-[60%] xl:h-[100vh] relative overflow-hidden"
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="hero-image-container absolute inset-0">
                        <img
                            src="/images/hero.webp"
                            loading="eager"
                            fetchPriority="high"
                            decoding="sync"
                            alt="Intérieur luxueux Nova Design"
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover', objectPosition: 'center 20%',
                                transform: 'translate3d(0,0,0)'
                            }}
                        />
                        <div className="hero-overlay-gradient" />
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                            background: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.15) 100%)'
                        }}></div>
                    </div>
                </motion.div>

                <div className="w-full h-[45vh] xl:w-[40%] xl:h-full bg-bg-primary px-6 py-8 pb-12 xl:py-0 flex flex-col justify-center relative" style={{ zIndex: 2 }}>
                    <motion.span
                        className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        ARTISAN DU MARBRE · MAROC
                    </motion.span>
                    <div className="w-8 h-[1px] bg-gold mb-5"></div>

                    <h1 className="font-display text-[48px] xl:text-[56px] font-[600] text-dark leading-none mb-0">
                        {['Chaque', 'Pièce,'].map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.3em]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                    <h2 className="font-display text-[48px] italic font-[500] text-gold leading-none mb-5">
                        {['Une', 'Histoire.'].map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.3em]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>

                    <motion.p
                        className="font-body text-[14px] font-[400] text-text-sec leading-[1.7] mb-8 max-w-[320px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Mobilier en marbre et travertin façonné à la main au Maroc.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 mb-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to="/catalogue" className="bg-dark text-bg-primary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center w-full sm:w-auto hover:bg-gold hover:text-obsidian transition-colors duration-250 cursor-pointer select-none active:scale-[0.97]">
                            VOIR LA COLLECTION
                        </Link>
                        <Link to="/sur-mesure" className="border border-gold text-gold font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-5 flex items-center justify-center w-full sm:w-auto hover:bg-gold/10 transition-colors duration-250 cursor-pointer select-none active:scale-[0.97]">
                            SUR MESURE
                        </Link>
                    </motion.div>

                    <div className="hidden xl:flex absolute bottom-8 right-10 flex-col items-center z-10">
                        <span className="font-body text-[9px] text-gold tracking-widest uppercase mb-2">DÉCOUVRIR</span>
                        <motion.div
                            className="w-[1px] h-10 bg-gold origin-top"
                            animate={{ scaleY: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </div>
            </section>

            {/* Split Section — Décoration & Marbre */}
            <section className="w-full flex flex-col md:flex-row" style={{ minHeight: '500px' }}>
                {/* Card 1 — Décoration Artisanale */}
                <Link to="/catalogue?type=decoration" className="relative w-full md:w-1/2 min-h-[500px] overflow-hidden group block">
                    <div
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1616048056617-93b94a339009?w=1200&q=85)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-12 flex flex-col items-start z-10">
                        <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase mb-3">FAIT MAIN · MAROC</span>
                        <h2 className="font-display text-[36px] xl:text-[44px] font-[600] text-white leading-none mb-2">Décoration Artisanale</h2>
                        <p className="font-body text-[14px] font-[400] text-white/90 mb-6">Bougeoirs, vases, plateaux & objets uniques</p>
                        <span className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center">
                            Découvrir →
                        </span>
                    </div>
                </Link>

                {/* Card 2 — Marbre & Pierre */}
                <Link to="/catalogue?type=marbre" className="relative w-full md:w-1/2 min-h-[500px] overflow-hidden group block">
                    <img
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85"
                        alt="Marbre & Pierre — NOVA DESIGN"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-12 flex flex-col items-start z-10">
                        <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase mb-3">ARTISAN DU MARBRE · MAROC</span>
                        <h2 className="font-display text-[36px] xl:text-[44px] font-[600] text-white leading-none mb-2">Marbre & Pierre</h2>
                        <p className="font-body text-[14px] font-[400] text-white/90 mb-6">Tables, consoles, vasques & sur mesure</p>
                        <span className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center">
                            Découvrir →
                        </span>
                    </div>
                </Link>
            </section>

            {/* Marquee */}
            <Marquee />

            {/* Featured Products */}
            <section className="bg-bg-secondary py-[60px] px-5 xl:px-20" ref={featuredRef}>
                <div className="max-w-7xl mx-auto">
                    <motion.span
                        className="font-body text-[10px] text-gold uppercase tracking-wider block mb-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >SÉLECTION</motion.span>
                    <motion.div
                        className="flex justify-between items-end mb-5 xl:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="font-display text-[32px] text-dark leading-none">Pièces Maîtresses</h2>
                        <Link to="/catalogue" className="font-body text-[11px] text-gold mb-1">Voir tout &rarr;</Link>
                    </motion.div>
                    <div className="w-full h-[1px] bg-gold/20 mb-8"></div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                            initial="hidden"
                            animate={featuredInView ? 'visible' : 'hidden'}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {featuredProducts.map(p => (
                                <motion.div
                                    key={p._id}
                                    variants={{
                                        hidden: { opacity: 0, y: 32 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    <ProductCard product={p} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Categories */}
            <section className="bg-bg-primary py-[60px] px-5 xl:px-20" ref={categoriesRef}>
                <div className="max-w-7xl mx-auto">
                    <motion.span
                        className="font-body text-[10px] text-gold uppercase tracking-wider block mb-2"
                        initial={{ opacity: 0, y: 12 }}
                        animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >COLLECTIONS</motion.span>
                    <motion.div
                        className="flex justify-between items-end mb-5 xl:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="font-display text-[32px] text-dark leading-none">Nos Collections</h2>
                        <Link to="/catalogue" className="font-body text-[11px] text-gold mb-1">Voir tout &rarr;</Link>
                    </motion.div>
                    <div className="w-full h-[1px] bg-gold/20 mb-8"></div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <motion.div
                            className="grid grid-cols-2 xl:grid-cols-3 gap-3"
                            initial="hidden"
                            animate={categoriesInView ? 'visible' : 'hidden'}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {categories.map(c => (
                                <motion.div
                                    key={c._id}
                                    variants={{
                                        hidden: { opacity: 0, y: 32 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    <CategoryCard category={c} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* About (Pierre d'Exception aesthetic) */}
            <section className="bg-obsidian py-[60px] px-5 xl:px-20" ref={aboutRef}>
                <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 xl:gap-20 items-center">
                    <motion.div
                        className="w-full xl:w-1/2 grid grid-cols-2 gap-1"
                        initial={{ x: -40, opacity: 0 }}
                        animate={aboutInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {[
                            { src: '/images/products/ig-3-travertine-coffee-table-fluted.jpg', alt: 'Table basse travertin — atelier NOVA DESIGN' },
                            { src: '/images/products/ig-5-travertine-round-tables.jpg', alt: 'Tables gigognes travertin — NOVA DESIGN' },
                            { src: '/images/products/ig-7-carrara-cube-table.jpg', alt: 'Table cube marbre Carrare — NOVA DESIGN' },
                            { src: '/images/products/ig-2-marble-vasque.jpg', alt: 'Vasque marbre brut — NOVA DESIGN' }
                        ].map((img, i) => (
                            <div key={i} className="aspect-square bg-surface overflow-hidden">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    width={800}
                                    height={800}
                                    onError={(e) => {
                                        e.target.parentElement.style.background = '#2a2522'
                                    }}
                                />
                            </div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="w-full xl:w-1/2 pt-10 xl:pt-0"
                        initial={{ x: 40, opacity: 0 }}
                        animate={aboutInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="font-body text-[10px] text-gold uppercase tracking-wider block mb-4">NOTRE HISTOIRE</span>
                        <h2 className="font-serif text-[32px] text-cream leading-tight mb-1">
                            L'Art de la Pierre,
                        </h2>
                        <h2 className="font-serif italic font-[500] text-[32px] text-gold leading-tight mb-6">
                            Transmis de Main en Main
                        </h2>
                        <p className="font-sans text-[14px] font-[400] text-cream/90 leading-[1.8] mb-8">
                            Chaque bloc de marbre ou de travertin que nous sélectionnons porte en lui des millions d'années d'histoire géologique. Notre mission est de révéler la beauté unique de cette matière brute, façonnée par les mains expertes de nos artisans marocains.
                        </p>
                        <Link to="/sur-mesure" className="inline-flex h-11 px-7 items-center justify-center border border-cream/40 text-cream font-body text-[11px] font-medium tracking-[0.2em] uppercase hover:border-gold/50 hover:text-gold transition-all duration-250 cursor-pointer select-none active:scale-[0.97]">
                            NOTRE HISTOIRE &rarr;
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Visual Bridge Section */}
            <section className="w-full h-[400px] overflow-hidden relative" data-reveal>
                <img
                    src="/images/section-bridge.webp"
                    alt="NOVA DESIGN Ateliers"
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-dark/10"></div>
            </section>

            {/* ─── SECTION 6 — INSTAGRAM ─── */}
            <section className="bg-bg-secondary py-16 px-5 text-center" ref={instagramRef}>

                {/* Header */}
                <motion.p
                    className="font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={instagramInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    SUIVEZ-NOUS
                </motion.p>
                <motion.h2
                    className="font-display text-[28px] text-dark mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={instagramInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    @novadesign.maa
                </motion.h2>
                <motion.p
                    className="font-body text-[13px] text-text-sec mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={instagramInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Découvrez nos créations au quotidien
                </motion.p>

                {/* Instagram Grid — 7 photos, show 6 on mobile / all 7 on wider screens */}
                <div className="grid grid-cols-3 gap-1 max-w-[680px] mx-auto">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href="https://instagram.com/novadesign.maa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block overflow-hidden"
                            style={{ aspectRatio: '1 / 1' }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={instagramInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.06 }}
                        >
                            <img
                                src={post.src}
                                alt={post.alt}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                onError={(e) => {
                                    e.target.parentElement.style.background = '#E8D5A3'
                                    e.target.style.display = 'none'
                                }}
                            />
                        </motion.a>
                    ))}
                </div>

                {/* CTA Button */}
                <a
                    href="https://instagram.com/novadesign.maa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 font-body text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-0.5 hover:opacity-70 transition-opacity duration-200"
                >
                    VOIR SUR INSTAGRAM →
                </a>

            </section>

            {/* WhatsApp CTA */}
            <section className="h-[200px] w-full" style={{ background: 'linear-gradient(135deg, #C8A96E 0%, #B8975E 100%)' }} ref={ctaRef}>
                <div className="h-full flex flex-col items-center justify-center px-6 text-center">
                    <motion.h2
                        className="font-display text-[28px] font-[500] text-dark mb-2"
                        initial={{ opacity: 0, y: 24 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >Un projet sur mesure ?</motion.h2>
                    <motion.p
                        className="font-body text-[13px] font-[400] text-dark/90 mb-6"
                        initial={{ opacity: 0, y: 24 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >Nous concevons la pièce de vos rêves.</motion.p>
                    <motion.a
                        href="https://wa.me/212649668465" target="_blank" rel="noreferrer"
                        className="bg-dark text-bg-primary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center gap-3 hover:bg-gold hover:text-obsidian transition-colors duration-250 cursor-pointer select-none active:scale-[0.97]"
                        initial={{ opacity: 0, y: 16 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        ENVOYER UN MESSAGE
                    </motion.a>
                </div>
            </section>
        </div>
    );
}
