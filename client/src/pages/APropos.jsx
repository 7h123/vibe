import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import SocialIcons from '../components/SocialIcons';

export default function APropos() {
    useScrollReveal();

    const storyRef = useRef(null);
    const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
    const teamRef = useRef(null);
    const teamInView = useInView(teamRef, { once: true, margin: '-80px' });
    const ctaRef = useRef(null);
    const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

    return (
        <div className="w-full overflow-hidden">

            {/* SECTION 1 — HERO */}
            <section className="relative w-full h-[300px] flex items-end pt-[64px] overflow-hidden">
                <motion.img
                    src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1600&q=85"
                    alt="À propos — NOVA DESIGN"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 px-6 xl:px-20 pb-10 max-w-7xl mx-auto w-full">
                    <motion.h1
                        className="font-display text-[42px] font-[600] text-white leading-none mb-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >À propos</motion.h1>
                    <motion.p
                        className="font-body text-[14px] font-[400] text-white/90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >Notre histoire & nos valeurs</motion.p>
                </div>
            </section>

            {/* SECTION 2 — NOTRE HISTOIRE */}
            <section className="bg-[#0d0d0d] py-16 xl:py-24 px-6 xl:px-20" ref={storyRef}>
                <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12 xl:gap-20">

                    {/* LEFT — Photo Grid */}
                    <motion.div
                        className="w-full xl:w-1/2"
                        initial={{ x: -40, opacity: 0 }}
                        animate={storyInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85" alt="Atelier marbre" className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
                            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=85" alt="Artisan travail" className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
                        </div>
                        <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=85" alt="Pierre naturelle" className="w-full h-[260px] object-cover rounded-lg mt-3" loading="lazy" />
                    </motion.div>

                    {/* RIGHT — Text */}
                    <motion.div
                        className="w-full xl:w-1/2"
                        initial={{ x: 40, opacity: 0 }}
                        animate={storyInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase block mb-4">NOTRE HISTOIRE</span>
                        <div className="w-8 h-[1px] bg-gold mb-3"></div>
                        <h2 className="font-serif text-[32px] text-white leading-tight mb-1">À propos de nous</h2>
                        <h2 className="font-serif italic font-[500] text-[32px] text-gold leading-tight mb-4">et de nos valeurs</h2>
                        <div className="w-12 h-[1px] bg-gold mb-8"></div>

                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] mb-8">
                            Bienvenue chez Nova Design, votre spécialiste du marbre et de la pierre naturelle au Maroc. Avec plus de 15 ans d'expérience, nous créons des pièces uniques façonnées à la main qui subliment chaque intérieur.
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">Votre projet, Notre passion</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] mb-8">
                            Chaque pièce Nova Design est le fruit d'une sélection rigoureuse des plus belles pierres naturelles. Nos artisans façonnent chaque élément avec précision pour vous garantir un résultat intemporel.
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">Un Partenaire de Confiance</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] mb-8">
                            Nova Design a bâti une relation de confiance solide avec sa clientèle. De la commande à la livraison, nous vous accompagnons à chaque étape avec sérieux et expertise.
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">L'Expertise à votre Écoute</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8]">
                            Notre gérant, spécialiste reconnu dans le domaine des marbres et pierres naturelles, est à votre disposition pour vous conseiller et vous guider vers les meilleures solutions pour votre projet.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 — STATS BAR */}
            <section className="bg-[#141414] py-16 px-6 xl:px-20" ref={statsRef}>
                <motion.div
                    className="max-w-7xl mx-auto grid grid-cols-2 xl:grid-cols-4 gap-4"
                    initial="hidden"
                    animate={statsInView ? 'visible' : 'hidden'}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {[
                        { value: '+500', label: 'PROJETS RÉALISÉS' },
                        { value: '15+', label: "ANS D'EXPÉRIENCE" },
                        { value: '30+', label: 'TYPES DE MARBRE' },
                        { value: '100%', label: 'SATISFACTION CLIENT' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="border border-gold/30 p-8 text-center"
                            variants={{
                                hidden: { opacity: 0, scale: 0.7 },
                                visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
                            }}
                        >
                            <span className="font-serif text-[40px] text-gold leading-none block mb-2">{stat.value}</span>
                            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/90">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* SECTION 4 — NOTRE ÉQUIPE */}
            <section className="bg-[#0d0d0d] py-16 xl:py-24 px-6 xl:px-20 text-center" ref={teamRef}>
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase block mb-4">NOTRE ÉQUIPE</span>
                    <h2 className="font-serif text-[32px] text-white leading-tight mb-4">Le Gérant de Nova Design</h2>
                    <div className="w-12 h-[1px] bg-gold mx-auto mb-10"></div>

                    {/* Portrait */}
                    <div className="w-[160px] h-[160px] rounded-full mx-auto mb-6 p-[3px] bg-gradient-to-br from-gold to-gold/60">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85"
                            alt="Mohammed El Smiya"
                            className="w-full h-full rounded-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <h3 className="font-serif text-[22px] font-bold text-white mb-1">Mohammed El Smiya</h3>
                    <p className="font-body text-[13px] text-gold mb-6">Président & Fondateur de NOVA DESIGN</p>

                    <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8] max-w-[500px] mx-auto mb-8">
                        Passionné par la pierre naturelle depuis plus de quinze ans, il a fondé Nova Design avec la conviction que chaque espace mérite les plus belles matières. Son expertise et sa rigueur sont au cœur de chaque projet.
                    </p>

                    <SocialIcons />
                </motion.div>
            </section>

            {/* SECTION 5 — CTA BANNER */}
            <section className="bg-[#0d0d0d] py-16 px-6 xl:px-20" ref={ctaRef}>
                <motion.div
                    className="max-w-3xl mx-auto border border-gold/30 p-10 xl:p-16 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-serif text-[28px] text-white mb-3">Prêt à sublimer votre espace ?</h2>
                    <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.7] mb-8">
                        Contactez-nous dès aujourd'hui pour un devis personnalisé ou visitez notre showroom.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/catalogue" className="border border-gold text-gold font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center hover:bg-gold/10 transition-all duration-250 cursor-pointer select-none active:scale-[0.97]">
                            Découvrir notre catalogue
                        </Link>
                        <Link to="/contact" className="bg-gold text-dark font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center hover:bg-[#B8975E] transition-all duration-250 cursor-pointer select-none active:scale-[0.97]">
                            Nous contacter
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
