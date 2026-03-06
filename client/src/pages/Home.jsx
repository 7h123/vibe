import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import Marquee from '../components/Marquee';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FAQSection from '../components/FAQSection';

export default function Home() {
    useScrollReveal();
    const { t } = useTranslation();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="w-full overflow-hidden">

            {/* ═══════════════════════════════════════════
                HERO — Full-Screen Cinematic Immersive
                ═══════════════════════════════════════════ */}
            <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="hero-image-container absolute inset-0">
                    <img
                        src="/images/hero-artisan-atelier-cinematic.png"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        alt="Artisan marocain polissant du marbre dans un atelier traditionnel — NOVA DESIGN"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                    />
                    {/* Cinematic dark gradient overlay */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.2) 70%, rgba(10,10,10,0.35) 100%)'
                    }} />
                    {/* Vignette */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
                    }} />
                </div>

                {/* Hero Content — Centered */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
                    {/* Tag */}
                    <span
                        className="hero-entrance font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-4"
                        style={{ '--hero-delay': '0.3s', color: '#C8A96E' }}
                    >
                        {t('home.heroTag')}
                    </span>

                    {/* Golden Line */}
                    <div className="hero-line-draw mb-6" style={{ '--hero-delay': '0.6s' }} />

                    {/* Title */}
                    <h1
                        className="hero-entrance font-display text-[52px] sm:text-[64px] xl:text-[80px] font-semibold text-white leading-[0.95] tracking-[0.02em] mb-1"
                        style={{ '--hero-delay': '0.5s' }}
                    >
                        {t('home.heroTitle1')}
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className="hero-entrance font-display text-[48px] sm:text-[58px] xl:text-[72px] italic font-medium leading-[0.95] mb-8"
                        style={{ '--hero-delay': '0.7s', color: '#C8A96E' }}
                    >
                        {t('home.heroTitle2')}
                    </h2>

                    {/* Description */}
                    <p
                        className="hero-entrance font-body text-[13px] sm:text-[15px] font-normal text-white/80 leading-[1.8] mb-10 max-w-md"
                        style={{ '--hero-delay': '1s' }}
                    >
                        {t('home.heroDesc')}
                    </p>

                    {/* Buttons */}
                    <div
                        className="hero-entrance flex flex-col sm:flex-row items-center gap-4"
                        style={{ '--hero-delay': '1.3s' }}
                    >
                        <Link
                            to="/catalogue"
                            className="btn-luxury btn-luxury-primary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center min-w-[200px]"
                        >
                            {t('buttons.voirCollection')}
                        </Link>
                        <Link
                            to="/sur-mesure"
                            className="btn-luxury btn-luxury-secondary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-7 flex items-center justify-center min-w-[200px]"
                        >
                            {t('buttons.surMesure')}
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <span className="font-body text-[9px] text-white/50 tracking-[0.2em] uppercase">
                        {t('home.decouvrir') || 'DÉCOUVRIR'}
                    </span>
                    <div className="hero-scroll-line w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SPLIT — Décoration & Marbre
                ═══════════════════════════════════════════ */}
            <section className="w-full flex flex-col md:flex-row" style={{ minHeight: '520px' }}>
                {/* Décoration Artisanale */}
                <Link to="/catalogue?type=decoration" className="relative w-full md:w-1/2 min-h-[500px] overflow-hidden group block">
                    <div
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1616048056617-93b94a339009?w=1200&q=85)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-12 flex flex-col items-start z-10">
                        <span className="font-body text-[10px] tracking-[0.2em] font-medium uppercase mb-3" style={{ color: '#C8A96E' }}>{t('home.decoration.tag')}</span>
                        <div className="gold-separator mb-4" />
                        <h2 className="font-display text-[36px] xl:text-[44px] font-semibold text-white leading-none mb-2">{t('home.decoration.title')}</h2>
                        <p className="font-body text-[14px] font-normal text-white/85 mb-6">{t('home.decoration.desc')}</p>
                        <span className="btn-luxury bg-white/10 backdrop-blur-sm border border-white/25 text-white font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center">
                            {t('buttons.decouvrir')} →
                        </span>
                    </div>
                </Link>

                {/* Marbre & Pierre */}
                <Link to="/catalogue?type=marbre" className="relative w-full md:w-1/2 min-h-[500px] overflow-hidden group block">
                    <img
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85"
                        alt="Marbre & Pierre — NOVA DESIGN"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-8 xl:p-12 flex flex-col items-start z-10">
                        <span className="font-body text-[10px] tracking-[0.2em] font-medium uppercase mb-3" style={{ color: '#C8A96E' }}>{t('home.marble.tag')}</span>
                        <div className="gold-separator mb-4" />
                        <h2 className="font-display text-[36px] xl:text-[44px] font-semibold text-white leading-none mb-2">{t('home.marble.title')}</h2>
                        <p className="font-body text-[14px] font-normal text-white/85 mb-6">{t('home.marble.desc')}</p>
                        <span className="btn-luxury bg-white/10 backdrop-blur-sm border border-white/25 text-white font-body text-[11px] font-medium tracking-[0.2em] uppercase h-11 px-6 flex items-center justify-center">
                            {t('buttons.decouvrir')} →
                        </span>
                    </div>
                </Link>
            </section>

            {/* Marquee */}
            <Marquee />

            {/* ═══════════════════════════════════════════
                FEATURED PRODUCTS — Premium Cards
                ═══════════════════════════════════════════ */}
            <section className="bg-bg-secondary py-[80px] px-5 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-3" data-reveal style={{ color: '#C8A96E' }}>
                        {t('home.selection.tag')}
                    </span>
                    <div className="flex justify-between items-end mb-3" data-reveal>
                        <h2 className="font-display text-[36px] xl:text-[42px] text-dark leading-none">{t('home.selection.title')}</h2>
                        <Link to="/catalogue" className="font-body text-[11px] tracking-[0.1em] mb-1" style={{ color: '#C8A96E' }}>{t('buttons.voirTout')}</Link>
                    </div>
                    <div className="gold-separator mb-10" data-reveal />

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                CATEGORIES
                ═══════════════════════════════════════════ */}
            <section className="bg-bg-primary py-[80px] px-5 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-3" data-reveal style={{ color: '#C8A96E' }}>
                        {t('home.collections.tag')}
                    </span>
                    <div className="flex justify-between items-end mb-3" data-reveal>
                        <h2 className="font-display text-[36px] xl:text-[42px] text-dark leading-none">{t('home.collections.title')}</h2>
                        <Link to="/catalogue" className="font-body text-[11px] tracking-[0.1em] mb-1" style={{ color: '#C8A96E' }}>{t('buttons.voirTout')}</Link>
                    </div>
                    <div className="gold-separator mb-10" data-reveal />

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                            {categories.map(c => <CategoryCard key={c._id} category={c} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                ABOUT — "Chaque Pièce. Une Histoire."
                Asymmetric editorial layout
                ═══════════════════════════════════════════ */}
            <section style={{ background: '#F5F2ED' }} className="py-[80px] xl:py-[100px] px-5 xl:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 xl:gap-20 items-center">
                    {/* Image — 55% width, editorial offset */}
                    <div
                        className="w-full xl:w-[55%] relative overflow-hidden group"
                        style={{ minHeight: '580px', borderRadius: '2px' }}
                        data-reveal
                    >
                        <img
                            src="/images/about-artisan-marble.png"
                            alt="Artisan marocain polissant une dalle de marbre — NOVA DESIGN"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            style={{ position: 'absolute', inset: 0 }}
                            loading="lazy"
                            decoding="async"
                            width={1200}
                            height={1600}
                            onError={(e) => {
                                e.target.parentElement.style.background = '#e8e4dc'
                            }}
                        />
                        {/* Bottom gradient for text readability on mobile */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'linear-gradient(to top, rgba(245,242,237,0.2) 0%, transparent 30%)'
                        }} />
                    </div>

                    {/* Text — 45% width */}
                    <div className="w-full xl:w-[45%] xl:pt-8" data-reveal>
                        <span className="font-body text-[10px] uppercase tracking-[0.2em] block mb-5" style={{ color: '#C8A96E' }}>
                            {t('home.about.tag')}
                        </span>
                        <div className="gold-separator mb-7" />
                        <h2 className="font-display text-[38px] xl:text-[48px] leading-[1.05] mb-1" style={{ color: '#1a1a0e' }}>
                            {t('home.about.title1')}
                        </h2>
                        <h2 className="font-display italic font-medium text-[36px] xl:text-[44px] leading-[1.05] mb-8" style={{ color: '#C8A96E' }}>
                            {t('home.about.title2')}
                        </h2>
                        <p className="font-sans text-[14px] xl:text-[15px] font-normal leading-[1.9] mb-10" style={{ color: '#555' }}>
                            {t('home.about.desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <Link
                                to="/catalogue"
                                className="btn-luxury btn-luxury-primary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-7 flex items-center justify-center"
                            >
                                {t('buttons.voirCollection')}
                            </Link>
                            <Link
                                to="/sur-mesure"
                                className="btn-luxury btn-luxury-secondary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-6 flex items-center justify-center"
                            >
                                {t('buttons.surMesure')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                VISUAL BRIDGE
                ═══════════════════════════════════════════ */}
            <section className="w-full h-[350px] xl:h-[450px] overflow-hidden relative" data-reveal>
                <img
                    src="/images/section-bridge.webp"
                    alt="NOVA DESIGN Ateliers"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                    loading="lazy"
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.05) 50%, rgba(10,10,10,0.15) 100%)'
                }} />
            </section>

            {/* ═══════════════════════════════════════════
                INSTAGRAM
                ═══════════════════════════════════════════ */}
            <section className="bg-bg-secondary py-[80px] px-5 text-center">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase block mb-3" data-reveal style={{ color: '#C8A96E' }}>
                    {t('home.instagram.tag')}
                </span>
                <h2 className="font-display text-[28px] xl:text-[32px] text-dark mb-2" data-reveal>
                    {t('home.instagram.title')}
                </h2>
                <p className="font-body text-[13px] text-text-sec mb-10 leading-relaxed" data-reveal>
                    {t('home.instagram.desc')}
                </p>

                <div className="grid grid-cols-3 gap-1 max-w-[720px] mx-auto" data-reveal>
                    {instagramPosts.map((post) => (
                        <a
                            key={post.id}
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
                                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                onError={(e) => {
                                    e.target.parentElement.style.background = '#E8D5A3'
                                    e.target.style.display = 'none'
                                }}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                                <span className="font-body text-[10px] text-white tracking-[0.2em] uppercase">VOIR →</span>
                            </div>
                        </a>
                    ))}
                </div>

                <a
                    href="https://instagram.com/novadesign.maa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 font-body text-[10px] tracking-[0.2em] uppercase pb-0.5 hover:opacity-70 transition-opacity duration-200"
                    style={{ color: '#C8A96E', borderBottom: '1px solid #C8A96E' }}
                    data-reveal
                >
                    {t('buttons.voirInstagram')} →
                </a>
            </section>

            {/* FAQ */}
            <FAQSection />

            {/* ═══════════════════════════════════════════
                CTA FINAL — Luxe
                ═══════════════════════════════════════════ */}
            <section
                className="w-full"
                style={{
                    background: 'linear-gradient(135deg, #C8A96E 0%, #A68560 50%, #C8A96E 100%)',
                    minHeight: '240px'
                }}
            >
                <div className="h-full flex flex-col items-center justify-center px-6 py-16 text-center" data-reveal>
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(26,26,14,0.6)' }}>NOVA DESIGN</span>
                    <h2 className="font-display text-[30px] xl:text-[36px] font-medium mb-3" style={{ color: '#1a1a0e' }}>
                        {t('home.cta.title')}
                    </h2>
                    <p className="font-body text-[13px] font-normal mb-8" style={{ color: 'rgba(26,26,14,0.8)' }}>
                        {t('home.cta.desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a
                            href="https://wa.me/212649668465"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-luxury font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center gap-3"
                            style={{ background: '#1a1a0e', color: '#f5f0e8' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {t('buttons.envoyerMessage')}
                        </a>
                        <Link
                            to="/catalogue"
                            className="btn-luxury font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-7 flex items-center justify-center"
                            style={{ background: 'transparent', color: '#1a1a0e', border: '1px solid rgba(26,26,14,0.4)' }}
                        >
                            {t('buttons.voirCollection')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
