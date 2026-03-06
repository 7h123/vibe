import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import SocialIcons from '../components/SocialIcons';

export default function APropos() {
    useScrollReveal();
    const { t } = useTranslation();

    return (
        <div className="w-full overflow-hidden">

            {/* SECTION 1 — HERO VIDÉO CINÉMATIQUE */}
            <section className="relative w-full h-[85vh] min-h-[500px] flex items-center overflow-hidden">
                {/* Video Background */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/Marble_Coffee_Table_Craftsman.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{ objectPosition: 'center center' }}
                />
                {/* Cinematic Overlay */}
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.4) 100%)'
                }} />
                {/* Vignette */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)'
                }} />

                {/* Typography Overlays */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center" style={{ padding: '0 50px' }}>
                    {/* Label Primaire — NOTRE HISTOIRE */}
                    <span
                        className="hero-entrance block"
                        style={{
                            '--hero-delay': '0.4s',
                            color: '#d4af37',
                            fontSize: '11px',
                            fontFamily: "'Tenor Sans', sans-serif",
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '16px',
                            fontWeight: 500
                        }}
                    >
                        NOTRE HISTOIRE
                    </span>

                    {/* Titre Principal — À propos */}
                    <h1
                        className="hero-entrance"
                        style={{
                            '--hero-delay': '0.7s',
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '72px',
                            fontWeight: 400,
                            color: '#ffffff',
                            lineHeight: 1,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            margin: 0
                        }}
                    >
                        À propos
                    </h1>
                </div>

                {/* Scroll Indicator — Bottom Right */}
                <div
                    className="about-scroll-indicator absolute z-10 flex flex-col items-center"
                    style={{
                        right: '60px',
                        bottom: '40px'
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 4 12 10 18 4" />
                        <polyline points="6 12 12 18 18 12" />
                    </svg>
                </div>
            </section>

            {/* SECTION 2 — NOTRE HISTOIRE */}
            <section className="bg-[#0d0d0d] py-16 xl:py-24 px-6 xl:px-20">
                <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12 xl:gap-20">

                    {/* LEFT — Photo Grid */}
                    <div className="w-full xl:w-1/2" data-reveal>
                        <div className="grid grid-cols-2 gap-3">
                            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85" alt="Atelier marbre" className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
                            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=85" alt="Artisan travail" className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=85" alt="Pierre naturelle" className="w-full h-[260px] object-cover rounded-lg mt-3" loading="lazy" />
                    </div>

                    {/* RIGHT — Text */}
                    <div className="w-full xl:w-1/2" data-reveal>
                        <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase block mb-4">{t('apropos.story.tag')}</span>
                        <h2 className="font-serif text-[32px] text-white leading-tight mb-1">{t('apropos.story.title1')}</h2>
                        <h2 className="font-serif italic font-[500] text-[32px] text-gold leading-tight mb-4">{t('apropos.story.title2')}</h2>
                        <div className="w-12 h-[1px] bg-gold mb-8"></div>

                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] mb-8">
                            {t('apropos.story.welcome')}
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">{t('apropos.sections.passion.title')}</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] mb-8">
                            {t('apropos.sections.passion.desc')}
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">{t('apropos.sections.partner.title')}</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] mb-8">
                            {t('apropos.sections.partner.desc')}
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">{t('apropos.sections.expertise.title')}</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8]">
                            {t('apropos.sections.expertise.desc')}
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — STATS BAR */}
            <section className="bg-[#141414] py-16 px-6 xl:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-2 xl:grid-cols-4 gap-4" data-reveal>
                    {[
                        { value: '+500', label: t('apropos.stats.projects') },
                        { value: '15+', label: t('apropos.stats.experience') },
                        { value: '30+', label: t('apropos.stats.marbleTypes') },
                        { value: '100%', label: t('apropos.stats.satisfaction') },
                    ].map((stat, i) => (
                        <div key={i} className="border border-gold/30 p-8 text-center hover:border-gold/60 transition-colors duration-300">
                            <span className="font-serif text-[40px] text-gold leading-none block mb-2">{stat.value}</span>
                            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/90">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4 — NOTRE ÉQUIPE */}
            <section className="bg-[#0d0d0d] py-16 xl:py-24 px-6 xl:px-20 text-center">
                <div className="max-w-7xl mx-auto" data-reveal>
                    <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase block mb-4">{t('apropos.team.tag')}</span>
                    <h2 className="font-serif text-[32px] text-white leading-tight mb-4">{t('apropos.team.title')}</h2>
                    <div className="w-12 h-[1px] bg-gold mx-auto mb-10"></div>

                    {/* Portrait */}
                    <div className="w-[160px] h-[160px] rounded-full mx-auto mb-6 p-[3px] bg-gradient-to-br from-gold to-gold/60">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85"
                            alt={t('apropos.team.name')}
                            className="w-full h-full rounded-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <h3 className="font-serif text-[22px] font-bold text-white mb-1">{t('apropos.team.name')}</h3>
                    <p className="font-body text-[13px] text-gold mb-6">{t('apropos.team.position')}</p>

                    <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] max-w-[500px] mx-auto mb-8">
                        {t('apropos.team.bio')}
                    </p>

                    <SocialIcons />
                </div>
            </section>

            {/* SECTION 5 — CTA BANNER */}
            <section className="bg-[#0d0d0d] py-16 px-6 xl:px-20">
                <div className="max-w-3xl mx-auto border border-gold/30 p-10 xl:p-16 text-center" data-reveal>
                    <h2 className="font-serif text-[28px] text-white mb-3">{t('apropos.cta.title')}</h2>
                    <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.7] mb-8">
                        {t('apropos.cta.desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/catalogue" className="btn-luxury btn-luxury-secondary font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center" style={{ color: '#d4af5a', borderColor: '#d4af5a' }}>
                                {t('buttons.decouvrir')}
                            </Link>
                            <Link to="/contact" className="btn-luxury font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center hover:opacity-90 transition-opacity" style={{ background: '#d4af5a', color: '#1a1a0e' }}>
                                {t('buttons.contacter')}
                            </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
