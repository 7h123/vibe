import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import SocialIcons from './SocialIcons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-obsidian pt-[80px] pb-8 px-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/stone-texture.webp')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col gap-10 md:grid md:grid-cols-4 max-w-7xl mx-auto relative z-10"
            >

                {/* Brand */}
                <motion.div variants={itemVariants}>
                    <div className="flex flex-col w-fit mb-4">
                        <span className="font-display font-bold text-[22px] text-cream tracking-[0.25em] leading-none">{t('brand.nova')}</span>
                        <span className="font-body text-[9px] text-[#C8A96E] tracking-[0.4em] block -mt-[2px]">{t('brand.design')}</span>
                    </div>
                    <p className="font-body text-[12px] font-[400] text-cream/70 mb-6 max-w-[200px] leading-relaxed">{t('brand.tagline')}</p>
                    <SocialIcons />
                </motion.div>

                {/* Navigation */}
                <motion.div variants={itemVariants} className="flex flex-col gap-4">
                    <span className="font-body text-[10px] text-[#C8A96E] font-[500] tracking-widest uppercase mb-2">{t('footer.navigation')}</span>
                    <Link to="/" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('nav.accueil')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/catalogue" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('nav.catalogue')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/a-propos" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('nav.apropos')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/sur-mesure" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('nav.surMesure')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/contact" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('nav.contact')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </motion.div>

                {/* Collections */}
                <motion.div variants={itemVariants} className="flex flex-col gap-4">
                    <span className="font-body text-[10px] text-[#C8A96E] font-[500] tracking-widest uppercase mb-2">{t('footer.collections')}</span>
                    <Link to="/catalogue?type=marbre" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('footer.marbreEtPierre')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/catalogue?type=decoration" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('footer.decoration')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/catalogue?category=tables" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('footer.tables')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/catalogue?category=consoles" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('footer.consoles')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/catalogue?category=vasques" className="font-body text-[13px] text-cream/70 hover:text-cream transition-colors w-fit relative group">
                        {t('footer.vasques')}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </motion.div>

                {/* Contact info */}
                <motion.div variants={itemVariants} className="flex flex-col mb-10 xl:mb-0 w-full xl:w-1/4">
                    <span className="font-body text-[10px] text-[#C8A96E] font-[500] tracking-widest uppercase mb-6">{t('footer.contact')}</span>
                    <span className="font-body text-[13px] font-[400] text-cream/70 flex items-start mb-3 cursor-default">
                        <MapPin size={16} className="text-[#C8A96E] mr-3 shrink-0 mt-[2px]" />
                        <span className="leading-relaxed hover:text-cream transition-colors">Route de l'Oasis,<br />Casablanca, {t('footer.maroc')}</span>
                    </span>
                    <a href="https://wa.me/212649668465" className="font-body text-[13px] font-[400] text-cream/70 flex items-center mb-3 group hover:text-cream transition-colors">
                        <Phone size={16} className="text-[#C8A96E] mr-3 shrink-0" />
                        <span className="relative">
                            +212 649-668465
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </a>
                    <a href="https://instagram.com/novadesign.maa" className="font-body text-[13px] font-[400] text-cream/70 flex items-center mb-3 group hover:text-cream transition-colors">
                        <Instagram size={16} className="text-[#C8A96E] mr-3 shrink-0" />
                        <span className="relative">
                            @novadesign.maa
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto relative z-10"
            >
                <div className="flex gap-4 items-center">
                    <span className="font-body font-[500] text-[11px] text-cream/50 tracking-wider">© {new Date().getFullYear()} NOVA DESIGN</span>
                    <span className="w-1 h-1 rounded-full bg-[#C8A96E]"></span>
                    <span className="font-body font-[500] text-[11px] text-cream/50 tracking-wider uppercase">{t('footer.copyright')}</span>
                </div>
                <span className="font-body font-[500] text-[11px] text-cream/40 tracking-wider uppercase mt-4 md:mt-0 pb-1 border-b border-transparent hover:border-cream/20 transition-colors cursor-default">{t('footer.madeInMaroc')}</span>
            </motion.div>
        </footer>
    );
}
