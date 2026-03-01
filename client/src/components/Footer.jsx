import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram } from 'lucide-react';
import SocialIcons from './SocialIcons';

export default function Footer() {
    return (
        <footer className="bg-obsidian pt-[60px] pb-8 px-5">
            <div className="flex flex-col gap-10 md:grid md:grid-cols-4 max-w-7xl mx-auto">

                {/* Brand */}
                <div>
                    <div className="flex flex-col w-fit mb-4">
                        <span className="font-display font-bold text-[22px] text-cream tracking-[0.25em] leading-none">NOVA</span>
                        <span className="font-body text-[9px] text-gold tracking-[0.4em] block -mt-[2px]">DESIGN</span>
                    </div>
                    <p className="font-body text-[12px] font-[400] text-cream/90 mb-5">Mobilier en marbre et travertin façonné à la main au Maroc.</p>
                    <SocialIcons />
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-3">
                    <span className="font-body text-[10px] text-gold font-[500] tracking-wider uppercase mb-1">Navigation</span>
                    <Link to="/" className="font-body text-[13px] font-[500] text-cream/90">Accueil</Link>
                    <Link to="/catalogue" className="font-body text-[13px] font-[500] text-cream/90">Catalogue</Link>
                    <Link to="/a-propos" className="font-body text-[13px] font-[500] text-cream/90">À Propos</Link>
                    <Link to="/sur-mesure" className="font-body text-[13px] font-[500] text-cream/90">Sur Mesure</Link>
                    <Link to="/contact" className="font-body text-[13px] font-[500] text-cream/90">Contact</Link>
                </div>

                {/* Collections */}
                <div className="flex flex-col gap-3">
                    <span className="font-body text-[10px] text-gold font-[500] tracking-wider uppercase mb-1">Collections</span>
                    <Link to="/catalogue?type=marbre" className="font-body text-[13px] font-[500] text-cream/90">Marbre & Pierre</Link>
                    <Link to="/catalogue?type=decoration" className="font-body text-[13px] font-[500] text-cream/90">Décoration</Link>
                    <Link to="/catalogue?category=tables" className="font-body text-[13px] font-[500] text-cream/90">Tables</Link>
                    <Link to="/catalogue?category=consoles" className="font-body text-[13px] font-[500] text-cream/90">Consoles</Link>
                    <Link to="/catalogue?category=vasques" className="font-body text-[13px] font-[500] text-cream/90">Vasques</Link>
                </div>

                {/* Contact info */}
                <div className="flex flex-col mb-10 xl:mb-0 w-full xl:w-1/4">
                    <h4 className="font-display text-[16px] font-[500] text-gold mb-6">Contact</h4>
                    <span className="font-body text-[13px] font-[400] text-cream/90 flex items-center mb-2">
                        <MapPin size={14} className="text-gold mr-2 shrink-0" /> Casablanca, Maroc
                    </span>
                    <span className="font-body text-[13px] font-[400] text-cream/90 flex items-center mb-2">
                        <Phone size={14} className="text-gold mr-2 shrink-0" /> 0649668465
                    </span>
                    <span className="font-body text-[13px] font-[400] text-cream/90 flex items-center mb-2">
                        <Instagram size={14} className="text-gold mr-2 shrink-0" /> @novadesign.maa
                    </span>
                </div>
            </div>

            <div className="mt-10 border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
                <span className="font-body font-[500] text-[11px] text-cream/90">© 2026 NOVA DESIGN</span>
                <span className="font-body font-[500] text-[11px] text-cream/90">Fait au Maroc</span>
            </div>
        </footer>
    );
}
