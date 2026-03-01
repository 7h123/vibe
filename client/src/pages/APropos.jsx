import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import SocialIcons from '../components/SocialIcons';

export default function APropos() {
    useScrollReveal();

    return (
        <div className="w-full overflow-hidden">

            {/* SECTION 1 — HERO */}
            <section className="relative w-full h-[300px] flex items-end pt-[64px]">
                <img
                    src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1600&q=85"
                    alt="À propos — NOVA DESIGN"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 px-6 xl:px-20 pb-10 max-w-7xl mx-auto w-full">
                    <h1 className="font-display text-[42px] font-[600] text-white leading-none mb-2">À propos</h1>
                    <p className="font-body text-[14px] font-[400] text-white/90">Notre histoire & nos valeurs</p>
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
                        <span className="font-body text-[10px] text-gold tracking-[0.2em] font-[500] uppercase block mb-4">NOTRE HISTOIRE</span>
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
                            Implantée à Casablanca, Nova Design a bâti une relation de confiance solide avec sa clientèle. De la commande à la livraison, nous vous accompagnons à chaque étape avec sérieux et expertise.
                        </p>

                        <h3 className="font-serif text-[20px] text-gold mb-3">L'Expertise à votre Écoute</h3>
                        <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.8]">
                            Notre gérant, spécialiste reconnu dans le domaine des marbres et pierres naturelles, est à votre disposition pour vous conseiller et vous guider vers les meilleures solutions pour votre projet.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3 — STATS BAR */}
            <section className="bg-[#141414] py-16 px-6 xl:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-2 xl:grid-cols-4 gap-4" data-reveal>
                    {[
                        { value: '+500', label: 'PROJETS RÉALISÉS' },
                        { value: '15+', label: "ANS D'EXPÉRIENCE" },
                        { value: '30+', label: 'TYPES DE MARBRE' },
                        { value: '100%', label: 'SATISFACTION CLIENT' },
                    ].map((stat, i) => (
                        <div key={i} className="border border-gold/30 p-8 text-center">
                            <span className="font-serif text-[40px] text-gold leading-none block mb-2">{stat.value}</span>
                            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/90">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4 — NOTRE ÉQUIPE */}
            <section className="bg-[#0d0d0d] py-16 xl:py-24 px-6 xl:px-20 text-center">
                <div className="max-w-7xl mx-auto" data-reveal>
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
                </div>
            </section>

            {/* SECTION 5 — CTA BANNER */}
            <section className="bg-[#0d0d0d] py-16 px-6 xl:px-20">
                <div className="max-w-3xl mx-auto border border-gold/30 p-10 xl:p-16 text-center" data-reveal>
                    <h2 className="font-serif text-[28px] text-white mb-3">Prêt à sublimer votre espace ?</h2>
                    <p className="font-body text-[14px] font-[400] text-white/90 leading-[1.7] mb-8">
                        Contactez-nous dès aujourd'hui pour un devis personnalisé ou visitez notre showroom à Casablanca.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/catalogue" className="border border-gold text-gold font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center hover:bg-gold hover:text-dark transition-colors">
                            Découvrir notre catalogue
                        </Link>
                        <Link to="/contact" className="bg-gold text-dark font-body text-[11px] font-medium tracking-[0.2em] uppercase h-12 px-8 flex items-center justify-center hover:bg-gold/80 transition-colors">
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
