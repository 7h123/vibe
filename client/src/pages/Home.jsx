import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import Marquee from '../components/Marquee';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FAQSection from '../components/FAQSection';
import MagneticButton from '../components/MagneticButton';
import TextScramble from '../components/TextScramble';

const useCountUp = (target, duration, inView) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, target, duration]);
    return count;
};

const splitWords = (text, baseDelay) =>
    text.split(' ').map((word, i) => (
        <motion.span
            key={i}
            initial={{ opacity: 0, y: 32, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
                duration: 0.75,
                delay: baseDelay + (i * 0.13),
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{
                display: 'inline-block',
                marginRight: '0.25em',
                transformOrigin: 'bottom center'
            }}
        >
            {word}
        </motion.span>
    ));

export default function Home() {
    const { t } = useTranslation();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 400]);

    useEffect(() => {
        getProducts({ featured: true })
            .then(res => {
                const data = res.data;
                setFeaturedProducts(Array.isArray(data) ? data : data.products || []);
            })
            .catch(() => { })
            .finally(() => setLoading(false));

        getCategories()
            .then(res => {
                const data = res.data;
                const list = Array.isArray(data) ? data : (data.categories || data.data || []);
                setCategories(list.slice(0, 3));
            })
            .catch(() => { });
    }, []);

    const instagramPosts = [
        { id: 1, src: '/images/instagram/ig-1-travertine-dining-table.jpg', alt: 'Table travertin ovale — NOVA DESIGN' },
        { id: 2, src: '/images/instagram/ig-2-marble-vasque.jpg', alt: 'Vasque marbre brut — NOVA DESIGN' },
        { id: 3, src: '/images/instagram/ig-3-travertine-coffee-table-fluted.jpg', alt: 'Table travertin cannelé — NOVA DESIGN' },
        { id: 4, src: '/images/instagram/ig-4-grey-marble-dining-table.jpg', alt: 'Table marbre gris — NOVA DESIGN' },
        { id: 5, src: '/images/instagram/ig-5-travertine-round-tables.jpg', alt: 'Tables rondes travertin — NOVA DESIGN' },
        { id: 6, src: '/images/instagram/ig-7-carrara-cube-table.jpg', alt: 'Table cube Carrare — NOVA DESIGN' },
    ];

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
    const qCount = useCountUp(128, 2, statsInView);
    const pCountUrl = useCountUp(99, 2, statsInView);

    return (
        <div className="w-full overflow-hidden bg-[var(--bg-primary)]">
            {/* HERO */}
            <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        src="/images/hero-artisan-atelier-cinematic.png"
                        fetchPriority="high"
                        decoding="sync"
                        alt="Artisan marocain polissant du marbre"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.2) 70%, rgba(10,10,10,0.35) 100%)'
                    }} />
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
                    }} />
                </motion.div>

                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl" style={{ perspective: '1000px' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-4"
                        style={{ color: '#C8A96E' }}
                    >
                        {t('home.heroTag')}
                    </motion.span>

                    <h1 className="font-display text-[48px] sm:text-[64px] xl:text-[80px] font-semibold text-white leading-[0.95] tracking-[0.02em] mb-1">
                        {splitWords(t('home.heroTitle1'), 0.4)}
                    </h1>

                    <h2 className="font-display text-[42px] sm:text-[58px] xl:text-[72px] italic font-medium leading-[0.95] mb-8" style={{ color: '#C8A96E' }}>
                        {splitWords(t('home.heroTitle2'), 0.7)}
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85, duration: 1 }}
                        className="font-body text-[13px] sm:text-[15px] font-normal text-white/80 leading-[1.8] mb-10 max-w-xl"
                    >
                        {t('home.heroDesc')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <MagneticButton>
                            <Link to="/catalogue" className="btn-luxury btn-luxury-primary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center min-w-[200px] bg-white text-black hover:bg-[#C8A96E]">
                                {t('buttons.voirCollection')}
                            </Link>
                        </MagneticButton>
                        <MagneticButton>
                            <Link to="/sur-mesure" className="btn-luxury btn-luxury-secondary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-7 flex items-center justify-center min-w-[200px] border border-white/30 text-white hover:bg-white/10">
                                {t('buttons.surMesure')}
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
                    <span className="font-body text-[9px] text-white/50 tracking-[0.2em] uppercase">
                        {t('home.decouvrir') || 'DÉCOUVRIR'}
                    </span>
                    <motion.div
                        animate={{ scaleY: [0, 1, 1, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] }}
                        style={{ transformOrigin: 'top center' }}
                        className="w-[1px] h-12 bg-white/50"
                    />
                </div>
            </section>

            {/* SPLIT */}
            <section className="w-full flex flex-col md:flex-row" style={{ minHeight: '520px' }}>
                <Link to="/catalogue?type=decoration" className="relative w-full md:w-1/2 min-h-[500px] overflow-hidden group block">
                    <motion.div
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1616048056617-93b94a339009?w=1200&q=85)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-12 flex flex-col items-start z-10">
                        <span className="font-body text-[10px] tracking-[0.2em] font-medium uppercase mb-3 text-[#C8A96E]">
                            {t('home.decoration.tag')}
                        </span>
                        <div className="gold-separator mb-4" />
                        <h2 className="font-display text-[36px] xl:text-[44px] font-semibold text-white leading-none mb-2">{t('home.decoration.title')}</h2>
                        <p className="font-body text-[14px] font-normal text-white/85 mb-6">{t('home.decoration.desc')}</p>
                        <span className="btn-luxury bg-white/10 backdrop-blur-sm border border-white/25 text-white font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                            {t('buttons.decouvrir')} →
                        </span>
                    </div>
                </Link>
                <Link to="/catalogue?type=marbre" className="relative w-full md:w-1/2 min-h-[500px] overflow-hidden group block">
                    <img
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85"
                        alt="Marbre"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-12 flex flex-col items-start z-10">
                        <span className="font-body text-[10px] tracking-[0.2em] font-medium uppercase mb-3 text-[#C8A96E]">
                            {t('home.marble.tag')}
                        </span>
                        <div className="gold-separator mb-4" />
                        <h2 className="font-display text-[36px] xl:text-[44px] font-semibold text-white leading-none mb-2">{t('home.marble.title')}</h2>
                        <p className="font-body text-[14px] font-normal text-white/85 mb-6">{t('home.marble.desc')}</p>
                        <span className="btn-luxury bg-white/10 backdrop-blur-sm border border-white/25 text-white font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                            {t('buttons.decouvrir')} →
                        </span>
                    </div>
                </Link>
            </section>

            <Marquee />

            {/* FEATURED PRODUCTS */}
            <section className="bg-[var(--bg-secondary)] py-[80px] px-5 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-3 text-[#C8A96E]">
                            {t('home.selection.tag')}
                        </span>
                        <div className="flex justify-between items-end mb-3">
                            <h2 className="font-display text-[36px] xl:text-[42px] text-[var(--text-primary)] leading-none">{t('home.selection.title')}</h2>
                            <Link to="/catalogue" className="font-body text-[11px] tracking-[0.1em] mb-1 text-[#C8A96E] hover:opacity-70 transition-opacity">
                                {t('buttons.voirTout')}
                            </Link>
                        </div>
                        <div className="gold-separator mb-10" />
                    </motion.div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px 0px' }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {featuredProducts.map((p) => (
                                <motion.div
                                    key={p._id}
                                    variants={{
                                        hidden: { opacity: 0, y: 40 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    <ProductCard product={p} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="bg-[var(--bg-primary)] py-[80px] px-5 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-3 text-[#C8A96E]">
                            {t('home.collections.tag')}
                        </span>
                        <div className="flex justify-between items-end mb-3">
                            <h2 className="font-display text-[36px] xl:text-[42px] text-[var(--text-primary)] leading-none">{t('home.collections.title')}</h2>
                            <Link to="/catalogue" className="font-body text-[11px] tracking-[0.1em] mb-1 text-[#C8A96E] hover:opacity-70 transition-opacity">
                                {t('buttons.voirTout')}
                            </Link>
                        </div>
                        <div className="gold-separator mb-10" />
                    </motion.div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px 0px' }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
                            }}
                            className="grid grid-cols-2 xl:grid-cols-3 gap-3"
                        >
                            {categories.map((c) => (
                                <motion.div
                                    key={c._id}
                                    variants={{
                                        hidden: { opacity: 0, y: 40 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                                    }}
                                >
                                    <CategoryCard category={c} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ABOUT */}
            <section style={{ background: '#F5F2ED' }} className="py-[80px] xl:py-[100px] px-5 xl:px-20 overflow-hidden grain-overlay">
                <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 xl:gap-20 items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full xl:w-[55%] relative overflow-hidden group"
                        style={{ minHeight: '580px', borderRadius: '2px' }}
                    >
                        <img
                            src="/images/about-artisan-marble.png"
                            alt="Artisan marocain"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                            style={{ position: 'absolute', inset: 0 }}
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full xl:w-[45%] xl:pt-8"
                    >
                        <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-5 text-[#C8A96E]">
                            {t('home.about.tag')}
                        </span>
                        <div className="gold-separator mb-7" />
                        <h2 className="font-display text-[38px] xl:text-[48px] leading-[1.05] mb-1 text-[#1a1a0e]">
                            {t('home.about.title1')}
                        </h2>
                        <h2 className="font-display italic font-medium text-[36px] xl:text-[44px] leading-[1.05] mb-8 text-[#C8A96E]">
                            {t('home.about.title2')}
                        </h2>
                        <p className="font-sans text-[14px] xl:text-[15px] font-normal leading-[1.9] mb-10 text-[#555]">
                            {t('home.about.desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3" ref={statsRef}>
                            <div className="flex flex-col">
                                <span className="font-sans font-bold text-2xl text-[#1a1a08]">{qCount}Q</span>
                                <TextScramble text="Pièces/An" className="font-mono text-[9px] uppercase tracking-widest text-[#8B7355]" />
                            </div>
                            <span className="w-px h-8 bg-black/10 hidden sm:block mx-4" />
                            <div className="flex flex-col">
                                <span className="font-sans font-bold text-2xl text-[#1a1a08]">{pCountUrl}.9%</span>
                                <TextScramble text="Satisfaction" className="font-mono text-[9px] uppercase tracking-widest text-[#8B7355]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* VISUAL BRIDGE */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full h-[350px] xl:h-[450px] overflow-hidden relative"
            >
                <img
                    src="/images/section-bridge.webp"
                    alt="NOVA DESIGN Ateliers"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                    loading="lazy"
                    decoding="async"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.05) 50%, rgba(10,10,10,0.15) 100%)' }} />
            </motion.section>

            {/* INSTAGRAM */}
            <section className="bg-[var(--bg-secondary)] py-[80px] px-5 text-center">
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase block mb-3 text-[#C8A96E]">
                        {t('home.instagram.tag')}
                    </span>
                    <h2 className="font-display text-[28px] xl:text-[32px] text-[var(--text-primary)] mb-2">
                        {t('home.instagram.title')}
                    </h2>
                    <p className="font-body text-[13px] text-[var(--text-secondary)] mb-10 leading-relaxed">
                        {t('home.instagram.desc')}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-3 gap-1 max-w-[720px] mx-auto"
                >
                    {instagramPosts.map((post) => (
                        <motion.a
                            key={post.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.96 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                            }}
                            href="https://instagram.com/novadesign.maa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block overflow-hidden relative group"
                            style={{ aspectRatio: '1 / 1' }}
                        >
                            <img
                                src={post.src}
                                alt={post.alt}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="font-body text-[10px] text-white tracking-[0.2em] uppercase">VOIR →</span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.a
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    href="https://instagram.com/novadesign.maa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 font-body text-[10px] tracking-[0.2em] uppercase pb-0.5 hover:text-[var(--text-primary)] transition-colors duration-200"
                    style={{ color: '#C8A96E', borderBottom: '1px solid #C8A96E' }}
                >
                    {t('buttons.voirInstagram')} →
                </motion.a>
            </section>

            <FAQSection />

            {/* CTA */}
            <section className="w-full" style={{ background: 'linear-gradient(135deg, #C8A96E 0%, #A68560 50%, #C8A96E 100%)', minHeight: '240px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex flex-col items-center justify-center px-6 py-16 text-center"
                >
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(26,26,14,0.6)' }}>NOVA DESIGN</span>
                    <h2 className="font-display text-[30px] xl:text-[36px] font-medium mb-3 text-[#1a1a0e]">
                        {t('home.cta.title')}
                    </h2>
                    <p className="font-body text-[13px] font-normal mb-8" style={{ color: 'rgba(26,26,14,0.8)' }}>
                        {t('home.cta.desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <MagneticButton>
                            <a
                                href="https://wa.me/212649668465"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-luxury font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center gap-3 bg-[#1a1a0e] text-[#f5f0e8] hover:bg-black"
                            >
                                {t('buttons.envoyerMessage')}
                            </a>
                        </MagneticButton>
                        <MagneticButton>
                            <Link
                                to="/catalogue"
                                className="btn-luxury font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-7 flex items-center justify-center border border-[#1a1a0e]/40 text-[#1a1a0e] hover:bg-[#1a1a0e]/5"
                            >
                                {t('buttons.voirCollection')}
                            </Link>
                        </MagneticButton>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
