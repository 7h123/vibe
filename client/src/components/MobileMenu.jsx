import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-obsidian z-[60] flex flex-col items-center justify-center transition-opacity duration-300">
            <button
                onClick={onClose}
                className="absolute top-6 right-5 text-gold text-3xl"
            >
                &times;
            </button>

            <nav className="flex flex-col items-center gap-10 w-full px-8">
                <Link to="/" onClick={onClose} className="font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                    Accueil
                </Link>
                <Link to="/catalogue" onClick={onClose} className="font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                    Catalogue
                </Link>
                <Link to="/a-propos" onClick={onClose} className="font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                    À Propos
                </Link>
                <Link to="/sur-mesure" onClick={onClose} className="font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                    Sur Mesure
                </Link>
                <Link to="/contact" onClick={onClose} className="font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                    Contact
                </Link>
            </nav>
        </div>
    );
}
