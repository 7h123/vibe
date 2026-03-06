import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import SocialIcons from './SocialIcons';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-obsidian pt-[60px] pb-8 px-5">
            <div className="flex flex-col gap-10 md:grid md:grid-cols-4 max-w-7xl mx-auto">

                {/* Brand */}
                <div>
                    <div className="flex flex-col w-fit mb-4">
                        <span className="font-display font-bold text-[22px] text-cream tracking-[0.25em] leading-none">{t('brand.nova')}</span>
                        <span className="font-body text-[9px] text-gold tracking-[0.4em] block -mt-[2px]">{t('brand.design')}</span>
                    </div>
                    <p className="font-body text-[12px] font-[400] text-cream/90 mb-5">{t('brand.tagline')}</p>
                    <SocialIcons />
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-3">
                    <span className="font-body text-[10px] text-gold font-[500] tracking-wider uppercase mb-1">{t('footer.navigation')}</span>
                    <Link to="/" className="font-body text-[13px] font-[500] text-cream/90">{t('nav.accueil')}</Link>
                    <Link to="/catalogue" className="font-body text-[13px] font-[500] text-cream/90">{t('nav.catalogue')}</Link>
                    <Link to="/a-propos" className="font-body text-[13px] font-[500] text-cream/90">{t('nav.apropos')}</Link>
                    <Link to="/sur-mesure" className="font-body text-[13px] font-[500] text-cream/90">{t('nav.surMesure')}</Link>
                    <Link to="/contact" className="font-body text-[13px] font-[500] text-cream/90">{t('nav.contact')}</Link>
                </div>

                {/* Collections */}
                <div className="flex flex-col gap-3">
                    <span className="font-body text-[10px] text-gold font-[500] tracking-wider uppercase mb-1">{t('footer.collections')}</span>
                    <Link to="/catalogue?type=marbre" className="font-body text-[13px] font-[500] text-cream/90">{t('footer.marbreEtPierre')}</Link>
                    <Link to="/catalogue?type=decoration" className="font-body text-[13px] font-[500] text-cream/90">{t('footer.decoration')}</Link>
                    <Link to="/catalogue?category=tables" className="font-body text-[13px] font-[500] text-cream/90">{t('footer.tables')}</Link>
                    <Link to="/catalogue?category=consoles" className="font-body text-[13px] font-[500] text-cream/90">{t('footer.consoles')}</Link>
                    <Link to="/catalogue?category=vasques" className="font-body text-[13px] font-[500] text-cream/90">{t('footer.vasques')}</Link>
                </div>

                {/* Contact info */}
                <div className="flex flex-col mb-10 xl:mb-0 w-full xl:w-1/4">
                    <h4 className="font-display text-[16px] font-[500] text-gold mb-6">{t('footer.contact')}</h4>
                    <span className="font-body text-[13px] font-[400] text-cream/90 flex items-center mb-2">
                        <MapPin size={14} className="text-gold mr-2 shrink-0" /> {t('footer.maroc')}
                    </span>
                    <span className="font-body text-[13px] font-[400] text-cream/90 flex items-center mb-2">
                        <Phone size={14} className="text-gold mr-2 shrink-0" /> {t('footer.telephone')}
                    </span>
                    <span className="font-body text-[13px] font-[400] text-cream/90 flex items-center mb-2">
                        <Instagram size={14} className="text-gold mr-2 shrink-0" /> {t('footer.instagram')}
                    </span>
                </div>
            </div>

            <div className="mt-10 border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
                <span className="font-body font-[500] text-[11px] text-cream/90">{t('footer.copyright')}</span>
                <span className="font-body font-[500] text-[11px] text-cream/90">{t('footer.madeInMaroc')}</span>
            </div>
        </footer>
    );
}
